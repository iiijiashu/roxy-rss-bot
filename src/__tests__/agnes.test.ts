import { beforeEach, describe, expect, it, vi } from "vitest";
import { AgnesProvider } from "../providers/agnes.ts";

vi.mock("openai", () => {
  const create = vi.fn();
  const construct = vi.fn();
  class MockOpenAI {
    constructor(options: unknown) {
      construct(options);
    }

    chat = { completions: { create } };
  }
  return {
    default: MockOpenAI,
    __mockCreate: create,
    __mockConstruct: construct,
  };
});

async function getCreateMock() {
  const mod = await import("openai");
  return (mod as unknown as { __mockCreate: ReturnType<typeof vi.fn> }).__mockCreate;
}

async function getConstructMock() {
  const mod = await import("openai");
  return (mod as unknown as { __mockConstruct: ReturnType<typeof vi.fn> }).__mockConstruct;
}

interface SubmittedTask {
  id: string;
  prompt: string;
  maxTokens: number;
}

function submittedUserContent(call: unknown[]): string {
  const request = call[0] as { messages: Array<{ role: string; content: string }> };
  const user = request.messages.find((message) => message.role === "user");
  return user?.content ?? "";
}

function maybeSubmittedTasks(call: unknown[]): SubmittedTask[] | undefined {
  try {
    const parsed = JSON.parse(submittedUserContent(call)) as { tasks?: unknown };
    return Array.isArray(parsed.tasks) ? (parsed.tasks as SubmittedTask[]) : undefined;
  } catch {
    return undefined;
  }
}

function submittedTasks(call: unknown[]): SubmittedTask[] {
  const tasks = maybeSubmittedTasks(call);
  if (!tasks) throw new Error("Expected a batch request");
  return tasks;
}

describe("AgnesProvider batching", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("coalesces concurrent logical tasks into one provider request", async () => {
    const create = await getCreateMock();
    create.mockImplementationOnce(async (...args: unknown[]) => {
      const tasks = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({
                results: tasks.map((task) => ({ id: task.id, content: `done:${task.prompt}` })),
              }),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    const [first, second] = await Promise.all([provider.call("first", 100), provider.call("second", 200)]);

    expect(first).toBe("done:first");
    expect(second).toBe("done:second");
    expect(create).toHaveBeenCalledTimes(1);
    const request = create.mock.calls[0]?.[0] as {
      model: string;
      max_tokens: number;
      temperature: number;
      messages: Array<{ role: string; content: string }>;
    };
    expect(request.model).toBe("agnes-2.5-flash");
    expect(request.max_tokens).toBe(300);
    expect(request.temperature).toBe(0);
    expect(request).toMatchObject({ response_format: { type: "json_object" } });
    expect(request.messages[0]?.role).toBe("system");
    expect(request.messages[0]?.content).toContain("untrusted public source data");
    expect(submittedTasks(create.mock.calls[0] ?? [])).toEqual([
      expect.objectContaining({ prompt: "first", maxTokens: 100 }),
      expect.objectContaining({ prompt: "second", maxTokens: 200 }),
    ]);
  });

  it("uses the direct OpenAI-compatible response for a single logical task", async () => {
    const create = await getCreateMock();
    create.mockResolvedValueOnce({
      choices: [{ message: { content: '{"developments":[]}' } }],
    });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      maxBatchTasks: 1,
      requestBudget: 1,
      maxTaskAttempts: 1,
    });
    await expect(provider.call("return strict JSON", 100, { responseFormat: "json_object" })).resolves.toBe(
      '{"developments":[]}',
    );

    const request = create.mock.calls[0]?.[0] as {
      messages: Array<{ role: string; content: string }>;
      response_format?: { type: string };
    };
    expect(request.response_format).toEqual({ type: "json_object" });
    expect(request.messages[0]?.content).toContain("untrusted public source data");
    expect(request.messages[1]).toEqual({ role: "user", content: "return strict JSON" });
  });

  it("keeps text-mode single tasks free of JSON response constraints", async () => {
    const create = await getCreateMock();
    create.mockResolvedValueOnce({ choices: [{ message: { content: "plain text" } }] });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      maxBatchTasks: 1,
      requestBudget: 1,
      maxTaskAttempts: 1,
    });
    await expect(provider.call("return prose", 100)).resolves.toBe("plain text");

    expect(create.mock.calls[0]?.[0]).not.toHaveProperty("response_format");
  });

  it("uses bounded local defaults for requests, retries, attempts, and timeout", async () => {
    const create = await getCreateMock();
    const construct = await getConstructMock();
    create.mockResolvedValue({ choices: [{ message: { content: "ok" } }] });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, maxBatchTasks: 1 });
    for (let index = 0; index < 36; index++) {
      await expect(provider.call(`task-${index}`, 100)).resolves.toBe("ok");
    }
    await expect(provider.call("over-budget", 100)).rejects.toThrow(
      /AGNES request budget exhausted \(requests=36\/36/u,
    );

    expect(create).toHaveBeenCalledTimes(36);
    expect(construct).toHaveBeenLastCalledWith(expect.objectContaining({ maxRetries: 0, timeout: 120_000 }));

    create.mockReset();
    create.mockResolvedValue({
      choices: [{ finish_reason: "length", message: { content: "truncated" } }],
    });
    const noProviderRetry = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, maxBatchTasks: 1 });
    await expect(noProviderRetry.call("structured", 100)).rejects.toThrow(
      "Agnes stopped because the output token limit was reached",
    );
    expect(create).toHaveBeenCalledTimes(1);
  });

  it("classifies a token-limited response and retries instead of returning truncated JSON", async () => {
    const create = await getCreateMock();
    create
      .mockResolvedValueOnce({
        choices: [{ finish_reason: "length", message: { content: '{"developments":[' } }],
      })
      .mockResolvedValueOnce({
        choices: [{ finish_reason: "stop", message: { content: '{"developments":[]}' } }],
      });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      requestBudget: 2,
      retryBudget: 1,
      maxTaskAttempts: 2,
      retryBaseMs: 1,
    });

    await expect(provider.call("return strict JSON", 100)).resolves.toBe('{"developments":[]}');
    expect(create).toHaveBeenCalledTimes(2);
    expect(provider.getDiagnostics()).toMatchObject({
      requests: 2,
      retryRequests: 1,
      tasksRetried: 1,
      errors: { output_limit: 1 },
    });
  });

  it("serializes object content for callers that requested JSON", async () => {
    const create = await getCreateMock();
    create.mockImplementationOnce(async (...args: unknown[]) => {
      const tasks = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({
                results: tasks.map((task) => ({
                  id: task.id,
                  content: { headline: task.prompt },
                })),
              }),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    await expect(
      Promise.all([provider.call("important", 100), provider.call("secondary", 100)]),
    ).resolves.toEqual(['{"headline":"important"}', '{"headline":"secondary"}']);
  });

  it("retries only an omitted task while preserving returned task results", async () => {
    const create = await getCreateMock();
    create.mockImplementationOnce(async (...args: unknown[]) => {
      const [first] = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({ results: [{ id: first?.id, content: "first result" }] }),
            },
          },
        ],
      };
    });
    create.mockImplementationOnce(async (...args: unknown[]) => ({
      choices: [{ message: { content: `retried:${submittedUserContent(args)}` } }],
    }));

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      requestBudget: 2,
      retryBudget: 1,
      maxTaskAttempts: 2,
      retryBaseMs: 1,
    });
    const results = await Promise.all([provider.call("first", 100), provider.call("second", 100)]);

    expect(results).toEqual(["first result", "retried:second"]);
    expect(create).toHaveBeenCalledTimes(2);
    expect(submittedUserContent(create.mock.calls[1] ?? [])).toBe("second");
    expect(provider.getDiagnostics()).toMatchObject({
      requests: 2,
      retryRequests: 1,
      tasksResolved: 2,
      tasksRetried: 1,
      tasksFailed: 0,
      errors: { omitted_task: 1 },
    });
  });

  it("enforces the real provider-request budget", async () => {
    const create = await getCreateMock();
    create.mockResolvedValue({ choices: [{ message: { content: "ok" } }] });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    await expect(provider.call("first phase", 100)).resolves.toBe("ok");
    await expect(provider.call("second phase", 100)).rejects.toThrow("AGNES request budget exhausted");
    expect(create).toHaveBeenCalledTimes(1);
  });

  it("partitions by task count and aggregate output budget", async () => {
    const create = await getCreateMock();
    create.mockImplementation(async (...args: unknown[]) => {
      const tasks = maybeSubmittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: tasks
                ? JSON.stringify({
                    results: tasks.map((task) => ({ id: task.id, content: task.prompt })),
                  })
                : submittedUserContent(args),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 50,
      maxBatchTasks: 4,
      maxBatchOutputTokens: 16_000,
      requestBudget: 3,
      maxInFlight: 2,
    });
    const results = await Promise.all(
      Array.from({ length: 9 }, (_, index) => provider.call(`task-${index + 1}`, 4_000)),
    );

    expect(results).toHaveLength(9);
    expect(create).toHaveBeenCalledTimes(3);
    expect(create.mock.calls.map((call) => maybeSubmittedTasks(call)?.length ?? 1).sort()).toEqual([1, 4, 4]);
    for (const call of create.mock.calls) {
      const request = call[0] as { max_tokens: number };
      expect(request.max_tokens).toBeLessThanOrEqual(16_000);
    }
  });

  it("bisects a timed-out batch and recovers within the retry budget", async () => {
    const create = await getCreateMock();
    const timeout = new Error("Request timed out");
    timeout.name = "APIConnectionTimeoutError";
    create.mockRejectedValueOnce(timeout);
    create.mockImplementation(async (...args: unknown[]) => {
      const tasks = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({
                results: tasks.map((task) => ({ id: task.id, content: `ok:${task.prompt}` })),
              }),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      maxBatchTasks: 4,
      requestBudget: 3,
      retryBudget: 2,
      maxTaskAttempts: 2,
      maxInFlight: 2,
      retryBaseMs: 1,
    });
    await expect(
      Promise.all(["a", "b", "c", "d"].map((prompt) => provider.call(prompt, 100))),
    ).resolves.toEqual(["ok:a", "ok:b", "ok:c", "ok:d"]);
    expect(create).toHaveBeenCalledTimes(3);
    expect(
      create.mock.calls
        .slice(1)
        .map((call) => submittedTasks(call).length)
        .sort(),
    ).toEqual([2, 2]);
    expect(provider.getDiagnostics()).toMatchObject({
      requests: 3,
      retryRequests: 2,
      tasksRetried: 4,
      tasksFailed: 0,
      errors: { timeout: 1 },
    });
  });

  it("bisects an unrecoverable invalid-JSON batch and regenerates the tasks", async () => {
    const create = await getCreateMock();
    create.mockResolvedValueOnce({ choices: [{ message: { content: "{ definitely not valid JSON" } }] });
    create.mockImplementation(async (...args: unknown[]) => {
      const tasks = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({
                results: tasks.map((task) => ({ id: task.id, content: `regenerated:${task.prompt}` })),
              }),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      maxBatchTasks: 4,
      requestBudget: 3,
      retryBudget: 2,
      maxTaskAttempts: 2,
      retryBaseMs: 1,
    });
    await expect(
      Promise.all(["a", "b", "c", "d"].map((prompt) => provider.call(prompt, 100))),
    ).resolves.toEqual(["regenerated:a", "regenerated:b", "regenerated:c", "regenerated:d"]);
    expect(create).toHaveBeenCalledTimes(3);
    expect(provider.getDiagnostics()).toMatchObject({ errors: { invalid_json: 1 }, tasksFailed: 0 });
  });

  it("repairs raw control characters and trailing commas in an otherwise valid envelope", async () => {
    const create = await getCreateMock();
    create.mockImplementationOnce(async (...args: unknown[]) => {
      const [first, second] = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: `{"results":[{"id":"${first?.id}","content":"line one\nline two",},{"id":"${second?.id}","content":"other",}],}`,
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    await expect(Promise.all([provider.call("repair", 100), provider.call("other", 100)])).resolves.toEqual([
      "line one\nline two",
      "other",
    ]);
  });

  it("bounds physical concurrency independently from logical concurrency", async () => {
    const create = await getCreateMock();
    let active = 0;
    let maximumActive = 0;
    create.mockImplementation(async () => {
      active++;
      maximumActive = Math.max(maximumActive, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active--;
      return { choices: [{ message: { content: "ok" } }] };
    });

    const provider = new AgnesProvider({
      apiKey: "test",
      batchWindowMs: 1,
      maxBatchTasks: 1,
      requestBudget: 6,
      maxInFlight: 2,
    });
    await Promise.all(Array.from({ length: 6 }, (_, index) => provider.call(`task-${index}`, 100)));
    expect(maximumActive).toBe(2);
  });

  it("fails closed when the API key is unavailable", () => {
    const previous = process.env["AGNES_API_KEY"];
    delete process.env["AGNES_API_KEY"];
    try {
      expect(() => new AgnesProvider()).toThrow("AGNES_API_KEY is required");
    } finally {
      if (previous === undefined) delete process.env["AGNES_API_KEY"];
      else process.env["AGNES_API_KEY"] = previous;
    }
  });

  it("rejects API keys containing control characters", () => {
    expect(() => new AgnesProvider({ apiKey: "test\nkey" })).toThrow("AGNES_API_KEY is invalid");
  });
});
