import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PublicationStatus, classifyFailure } from "../run-status.ts";

const roots: string[] = [];

afterEach(() => {
  vi.restoreAllMocks();
  for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

describe("PublicationStatus", () => {
  it("keeps the most severe outcome for a component", () => {
    const status = new PublicationStatus("2026-08-29", "agnes");
    status.record("summary/a", "ok");
    status.record("summary/a", "degraded", "timeout");
    status.record("summary/a", "ok");
    expect(status.toJSON()).toMatchObject({
      status: "degraded",
      components: [{ component: "summary/a", state: "degraded", code: "timeout" }],
    });
  });

  it("writes deterministic JSON without a volatile timestamp", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "roxy-status-"));
    roots.push(root);
    const previous = process.cwd();
    process.chdir(root);
    try {
      const status = new PublicationStatus("2026-08-29", "agnes");
      status.record("report/core", "ok");
      const first = status.save();
      const content = fs.readFileSync(first, "utf-8");
      status.save();
      expect(fs.readFileSync(first, "utf-8")).toBe(content);
      expect(content).not.toContain("generatedAt");
    } finally {
      process.chdir(previous);
    }
  });
});

describe("classifyFailure", () => {
  it.each([
    [Object.assign(new Error("Request timed out"), { name: "APIConnectionTimeoutError" }), "timeout"],
    [new Error("batch response omitted task T2"), "omitted_task"],
    [new Error("Unexpected token in JSON"), "invalid_json"],
    [Object.assign(new Error("too many requests"), { status: 429 }), "rate_limit"],
  ])("classifies %s", (error, expected) => {
    expect(classifyFailure(error)).toBe(expected);
  });
});
