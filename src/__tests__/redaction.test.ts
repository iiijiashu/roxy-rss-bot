import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  REDACTED_CREDENTIAL,
  redactCredentialShapes,
  sanitizeTextFileAtomic,
  serializeJsonForPersistence,
} from "../redaction.ts";

const credential = `sk-${"A1_b".repeat(8)}`;

describe("credential-shaped text redaction", () => {
  it("removes credential-shaped strings from nested JSON values and keys", () => {
    const serialized = serializeJsonForPersistence({
      content: `before ${credential} after`,
      nested: [{ [credential]: credential }],
    });

    expect(serialized).not.toContain(credential);
    expect(serialized.split(REDACTED_CREDENTIAL)).toHaveLength(4);
    expect(JSON.parse(serialized)).toEqual({
      content: `before ${REDACTED_CREDENTIAL} after`,
      nested: [{ [REDACTED_CREDENTIAL]: REDACTED_CREDENTIAL }],
    });
  });

  it("is idempotent", () => {
    const once = redactCredentialShapes(`prefix ${credential} suffix`);
    expect(redactCredentialShapes(once)).toBe(once);
  });

  it.each([
    "sk-short",
    "sk-",
    "task-key",
    "openai/codex",
    `musk-${"lawsuit".repeat(4)}`,
    "https://example.com/sk-telecom-supply-chain-risk",
  ])("does not redact a near-neighbor value: %s", (value) => {
    expect(redactCredentialShapes(value)).toBe(value);
  });

  it("keeps ordinary JSON byte-stable apart from the trailing newline", () => {
    const value = { z: [1, true, null], a: "普通文本" };
    expect(serializeJsonForPersistence(value)).toBe(`${JSON.stringify(value, null, 2)}\n`);
  });

  it("atomically sanitizes a Markdown file without parsing it as JSON", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "agents-radar-redaction-"));
    const filePath = path.join(root, "report.md");
    try {
      fs.writeFileSync(filePath, `# Report\n\nExample: ${credential}\n`, "utf-8");
      expect(sanitizeTextFileAtomic(filePath)).toBe(1);
      expect(fs.readFileSync(filePath, "utf-8")).toBe(`# Report\n\nExample: ${REDACTED_CREDENTIAL}\n`);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
