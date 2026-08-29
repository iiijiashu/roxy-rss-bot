import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { validatePublication } from "../validate-publication.ts";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

function fixture(status: "ok" | "degraded" = "degraded"): { root: string; date: string } {
  const date = "2026-08-29";
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "roxy-publication-"));
  roots.push(root);
  const digestDir = path.join(root, "digests", date);
  fs.mkdirSync(digestDir, { recursive: true });
  const reports = ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"];
  for (const report of reports) {
    fs.writeFileSync(
      path.join(digestDir, `${report}.md`),
      `# ${report} ${date}\n\n${"evidence-backed content ".repeat(10)}\n`,
    );
  }
  fs.writeFileSync(
    path.join(digestDir, "highlights.json"),
    JSON.stringify({ zh: { "ai-cli": ["中文亮点"] }, en: { "ai-cli": ["English highlight"] } }),
  );
  fs.writeFileSync(
    path.join(digestDir, "run-status.json"),
    JSON.stringify({ schemaVersion: 1, date, status, components: [] }),
  );
  fs.writeFileSync(
    path.join(root, "manifest.json"),
    JSON.stringify({ generated: `${date}T00:00:00.000Z`, dates: [{ date, reports }] }),
  );
  fs.writeFileSync(
    path.join(root, "feed.xml"),
    reports.map((report) => `<link>https://example.test/#${date}/${report}</link>`).join("\n"),
  );
  return { root, date };
}

describe("validatePublication", () => {
  it("accepts a complete degraded publication", () => {
    const { root, date } = fixture("degraded");
    expect(validatePublication(date, root)).toEqual({
      date,
      status: "degraded",
      coreReports: ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      highlightLanguages: ["zh", "en"],
    });
  });

  it("rejects a missing core report even when optional reports exist", () => {
    const { root, date } = fixture();
    fs.rmSync(path.join(root, "digests", date, "ai-agents-en.md"));
    expect(() => validatePublication(date, root)).toThrow("missing required file");
  });

  it("rejects a manifest that does not advertise all core reports", () => {
    const { root, date } = fixture();
    fs.writeFileSync(
      path.join(root, "manifest.json"),
      JSON.stringify({ generated: `${date}T00:00:00.000Z`, dates: [{ date, reports: ["ai-cli"] }] }),
    );
    expect(() => validatePublication(date, root)).toThrow("manifest.json is missing");
  });
});
