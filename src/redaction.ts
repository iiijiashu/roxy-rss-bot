import fs from "node:fs";
import path from "node:path";

export const REDACTED_CREDENTIAL = "[REDACTED_CREDENTIAL]";
const CREDENTIAL_SHAPE = /(?<![A-Za-z0-9])sk-(?:(?:proj|svcacct)-)?[A-Za-z0-9_]{20,}(?=$|[^A-Za-z0-9_-])/gu;

export function redactCredentialShapes(value: string): string {
  return value.replace(CREDENTIAL_SHAPE, REDACTED_CREDENTIAL);
}

export function containsCredentialShape(value: string): boolean {
  return /(?<![A-Za-z0-9])sk-(?:(?:proj|svcacct)-)?[A-Za-z0-9_]{20,}(?=$|[^A-Za-z0-9_-])/u.test(value);
}

export function serializeJsonForPersistence(value: unknown): string {
  return `${redactCredentialShapes(JSON.stringify(value, null, 2))}\n`;
}

export function sanitizeTextFileAtomic(filePath: string): number {
  const raw = fs.readFileSync(filePath, "utf-8");
  const matches = raw.match(CREDENTIAL_SHAPE)?.length ?? 0;
  if (matches === 0) return 0;
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryPath, redactCredentialShapes(raw), "utf-8");
  fs.renameSync(temporaryPath, filePath);
  return matches;
}

export function sanitizeJsonFileAtomic(filePath: string): number {
  JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return sanitizeTextFileAtomic(filePath);
}

export function credentialShapedTextFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const matches: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(filePath);
        continue;
      }
      if (!entry.isFile() || !/\.(?:html?|json|md|txt|xml)$/iu.test(entry.name)) continue;
      if (containsCredentialShape(fs.readFileSync(filePath, "utf-8"))) {
        matches.push(path.relative(root, filePath).replaceAll("\\", "/"));
      }
    }
  };
  visit(root);
  return matches.sort();
}
