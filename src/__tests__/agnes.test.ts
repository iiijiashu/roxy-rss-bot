import { beforeEach, describe, expect, it, vi } from "vitest";
import { AgnesProvider } from "../providers/agnes.ts";

vi.mock("openai", () => {
  const create = vi.fn();
  class MockOpenAI {
    chat = { completions: { create } };
  }
  return {
    default: MockOpenAI,
    __mockCreate: create,
  };
});

async function getCreateMock() {
  const mod = await import("openai");
  return (mod as unknown as { __mockCreate: ReturnType<typeof vi.fn> }).__mockCreate;
}

interface SubmittedTask {
  id: string;
  prompt: string;
  maxTokens: number;
}

function submittedTasks(call: unknown[]): SubmittedTask[] {
  const request = call[0] as { messages: Array<{ role: string; content: string }> };
  const user = request.messages.find((message) => message.role === "user");
  return JSON.parse(user?.content ?? "{}").tasks as SubmittedTask[];
}

describe("AgnesProvider batching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
      messages: Array<{ role: string; content: string }>;
    };
    expect(request.model).toBe("agnes-2.5-flash");
    expect(request.max_tokens).toBe(300);
    expect(request.messages[0]?.role).toBe("system");
    expect(request.messages[0]?.content).toContain("untrusted public source data");
    expect(submittedTasks(create.mock.calls[0] ?? [])).toEqual([
      expect.objectContaining({ prompt: "first", maxTokens: 100 }),
      expect.objectContaining({ prompt: "second", maxTokens: 200 }),
    ]);
  });

  it("serializes object content for callers that requested JSON", async () => {
    const create = await getCreateMock();
    create.mockImplementationOnce(async (...args: unknown[]) => {
      const [task] = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({ results: [{ id: task?.id, content: { headline: "important" } }] }),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    await expect(provider.call("json task", 100)).resolves.toBe('{"headline":"important"}');
  });

  it("rejects only an omitted task while preserving returned task results", async () => {
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

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    const results = await Promise.allSettled([provider.call("first", 100), provider.call("second", 100)]);

    expect(results[0]).toEqual({ status: "fulfilled", value: "first result" });
    expect(results[1]).toMatchObject({ status: "rejected" });
  });

  it("enforces the real provider-request budget", async () => {
    const create = await getCreateMock();
    create.mockImplementation(async (...args: unknown[]) => {
      const tasks = submittedTasks(args);
      return {
        choices: [
          {
            message: {
              content: JSON.stringify({ results: tasks.map((task) => ({ id: task.id, content: "ok" })) }),
            },
          },
        ],
      };
    });

    const provider = new AgnesProvider({ apiKey: "test", batchWindowMs: 1, requestBudget: 1 });
    await expect(provider.call("first phase", 100)).resolves.toBe("ok");
    await expect(provider.call("second phase", 100)).rejects.toThrow(
      "AGNES_REQUEST_BUDGET exhausted after 1 provider requests",
    );
    expect(create).toHaveBeenCalledTimes(1);
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
