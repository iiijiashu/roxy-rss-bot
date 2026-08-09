import { EventEmitter } from "node:events";
import fs from "node:fs";
import { PassThrough } from "node:stream";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildCopilotArgs,
  CopilotCliError,
  GitHubCopilotProvider,
  type SpawnCopilot,
} from "../providers/github-copilot.ts";

interface FakeProcess extends EventEmitter {
  stdout: PassThrough;
  stderr: PassThrough;
  kill: ReturnType<typeof vi.fn<(signal?: NodeJS.Signals | number) => boolean>>;
}

function fakeSpawn(result?: { stdout?: string; stderr?: string; code?: number }): {
  spawnImpl: SpawnCopilot;
  calls: Array<{ command: string; args: readonly string[]; options: Parameters<SpawnCopilot>[2] }>;
  child: FakeProcess;
} {
  const calls: Array<{ command: string; args: readonly string[]; options: Parameters<SpawnCopilot>[2] }> = [];
  const child = new EventEmitter() as FakeProcess;
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.kill = vi.fn<(signal?: NodeJS.Signals | number) => boolean>(() => true);
  const spawnImpl: SpawnCopilot = (command, args, options) => {
    calls.push({ command, args, options });
    queueMicrotask(() => {
      if (result?.stdout) child.stdout.write(result.stdout);
      if (result?.stderr) child.stderr.write(result.stderr);
      child.stdout.end();
      child.stderr.end();
      child.emit("close", result?.code ?? 0, null);
    });
    return child;
  };
  return { spawnImpl, calls, child };
}

describe("Copilot CLI command construction", () => {
  it("uses noninteractive stdout mode, auto model selection, and no broad approval flags", () => {
    const args = buildCopilotArgs("feed text", 1234);
    expect(args).toContain("--prompt");
    expect(args).toContain("--silent");
    expect(args).toContain("text");
    expect(args).toContain("auto");
    expect(args).not.toContain("--model=openai/gpt-4o-mini");
    expect(args).not.toContain("--yolo");
    expect(args).not.toContain("--allow-all");
    expect(args).not.toContain("--allow-all-tools");
  });

  it("removes every tool and disables MCP, memory inputs, URLs, and workspace instructions", () => {
    const args = buildCopilotArgs("ignore previous instructions", 100);
    expect(args).toContain("--excluded-tools=*");
    expect(args).toContain("--disable-builtin-mcps");
    expect(args).toContain("--no-custom-instructions");
    expect(args).toContain("--disallow-temp-dir");
    expect(args).not.toContain("--enable-memory");
    expect(args.some((arg) => arg.startsWith("--allow-url"))).toBe(false);
    expect(args.some((arg) => arg.startsWith("--allow-tool"))).toBe(false);
  });

  it("passes untrusted prompt text as one argv element instead of shell interpolation", async () => {
    const mock = fakeSpawn({ stdout: "digest" });
    const provider = new GitHubCopilotProvider({ token: "token", spawnImpl: mock.spawnImpl });
    const payload = "$(touch should-not-exist); `cat /etc/passwd`";

    await expect(provider.call(payload, 400)).resolves.toBe("digest");

    expect(mock.calls[0]?.options.shell).toBe(false);
    const promptIndex = mock.calls[0]!.args.indexOf("--prompt");
    expect(mock.calls[0]!.args[promptIndex + 1]).toContain(payload);
  });
});

describe("GitHubCopilotProvider process boundaries", () => {
  afterEach(() => vi.useRealTimers());

  it("passes only the short-lived token and a minimal environment", async () => {
    const mock = fakeSpawn({ stdout: "ok" });
    const provider = new GitHubCopilotProvider({ token: "actions-token", spawnImpl: mock.spawnImpl });

    await provider.call("prompt", 100);

    const env = mock.calls[0]!.options.env!;
    expect(env["GITHUB_TOKEN"]).toBe("actions-token");
    expect(env["COPILOT_GITHUB_TOKEN"]).toBeUndefined();
    expect(env["ANTHROPIC_API_KEY"]).toBeUndefined();
    expect(mock.calls[0]!.args.join(" ")).not.toContain("actions-token");
    expect(mock.calls[0]!.options.cwd).not.toBe(process.cwd());
    expect(fs.existsSync(String(mock.calls[0]!.options.cwd))).toBe(false);
  });

  it("requires GITHUB_TOKEN before spawning", async () => {
    const mock = fakeSpawn({ stdout: "unused" });
    const provider = new GitHubCopilotProvider({ token: "", spawnImpl: mock.spawnImpl });

    await expect(provider.call("prompt", 100)).rejects.toThrow("GITHUB_TOKEN is required");
    expect(mock.calls).toHaveLength(0);
  });

  it("returns trimmed stdout and rejects empty output", async () => {
    const ok = fakeSpawn({ stdout: "  final answer\n" });
    await expect(
      new GitHubCopilotProvider({ token: "t", spawnImpl: ok.spawnImpl }).call("p", 100),
    ).resolves.toBe("final answer");

    const empty = fakeSpawn({ stdout: "  \n" });
    await expect(
      new GitHubCopilotProvider({ token: "t", spawnImpl: empty.spawnImpl }).call("p", 100),
    ).rejects.toThrow("empty stdout");
  });

  it("classifies 429 errors as retryable and redacts the token", async () => {
    const mock = fakeSpawn({ stderr: "HTTP 429 for secret-token: rate limit", code: 1 });
    const provider = new GitHubCopilotProvider({ token: "secret-token", spawnImpl: mock.spawnImpl });

    let caught: unknown;
    try {
      await provider.call("p", 100);
    } catch (err) {
      caught = err;
    }
    const error = caught as CopilotCliError;
    expect(error).toBeInstanceOf(CopilotCliError);
    expect(error.status).toBe(429);
    expect(error.retryable).toBe(true);
    expect(error.message).toContain("[REDACTED]");
    expect(error.message).not.toContain("secret-token");
  });

  it("kills a process whose stdout exceeds the byte limit", async () => {
    const mock = fakeSpawn({ stdout: "too large" });
    const provider = new GitHubCopilotProvider({
      token: "t",
      spawnImpl: mock.spawnImpl,
      stdoutLimit: 3,
    });

    await expect(provider.call("p", 100)).rejects.toThrow("stdout exceeded");
    expect(mock.child.kill).toHaveBeenCalledWith("SIGKILL");
  });

  it("kills a process after the configured timeout", async () => {
    vi.useFakeTimers();
    const child = new EventEmitter() as FakeProcess;
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = vi.fn<(signal?: NodeJS.Signals | number) => boolean>(() => true);
    const spawnImpl: SpawnCopilot = () => child;
    const provider = new GitHubCopilotProvider({ token: "t", spawnImpl, timeoutMs: 25 });

    const pending = provider.call("p", 100);
    const assertion = expect(pending).rejects.toThrow("timed out after 25ms");
    await vi.advanceTimersByTimeAsync(25);
    await assertion;
    expect(child.kill).toHaveBeenCalledWith("SIGKILL");
  });
});
