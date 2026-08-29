import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

describe("daily startup environment", () => {
  it("loads .env before initializing the daily pipeline", () => {
    const workingDirectory = mkdtempSync(path.join(tmpdir(), "agents-radar-env-"));
    const dailyModuleUrl = pathToFileURL(path.resolve("src/daily.ts")).href;
    const tsxLoaderUrl = import.meta.resolve("tsx");

    try {
      writeFileSync(path.join(workingDirectory, ".env"), "DAILY_ENV_PROBE=loaded-from-dotenv\n", "utf-8");

      const script = [
        `await import(${JSON.stringify(dailyModuleUrl)});`,
        'console.log(`DOTENV_PROBE=${JSON.stringify(process.env["DAILY_ENV_PROBE"] ?? null)}`);',
      ].join("\n");
      const childEnvironment: NodeJS.ProcessEnv = {
        ...process.env,
        ANTHROPIC_API_KEY: "test-only",
        LLM_PROVIDER: "anthropic",
      };
      delete childEnvironment.DAILY_ENV_PROBE;
      const result = spawnSync(
        process.execPath,
        ["--import", tsxLoaderUrl, "--input-type=module", "--eval", script],
        {
          cwd: workingDirectory,
          encoding: "utf-8",
          env: childEnvironment,
        },
      );

      expect(result.status, result.stderr).toBe(0);
      expect(result.stdout).toContain('DOTENV_PROBE="loaded-from-dotenv"');
    } finally {
      rmSync(workingDirectory, { force: true, recursive: true });
    }
  }, 15_000);
});
