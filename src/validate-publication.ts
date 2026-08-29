import fs from "node:fs";
import path from "node:path";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const CORE_REPORTS = ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"] as const;

interface ManifestEntry {
  date: string;
  reports: string[];
}

interface ManifestShape {
  generated: string;
  dates: ManifestEntry[];
}

interface StatusShape {
  schemaVersion: number;
  date: string;
  status: string;
  components: unknown[];
}

export interface PublicationValidation {
  date: string;
  status: "ok" | "degraded";
  coreReports: string[];
  highlightLanguages: string[];
}

function readRequired(root: string, relativePath: string): string {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) throw new Error(`missing required file: ${relativePath}`);
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.trim()) throw new Error(`required file is empty: ${relativePath}`);
  return content;
}

function parseRequiredJson<T>(root: string, relativePath: string): T {
  const raw = readRequired(root, relativePath);
  try {
    return JSON.parse(raw) as T;
  } catch (cause) {
    throw new Error(`invalid JSON in ${relativePath}`, { cause });
  }
}

function validateHighlights(value: unknown): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("highlights.json must contain an object");
  }
  const languages: string[] = [];
  for (const lang of ["zh", "en"] as const) {
    const reports = (value as Record<string, unknown>)[lang];
    if (!reports || typeof reports !== "object" || Array.isArray(reports)) {
      throw new Error(`highlights.json is missing ${lang} report highlights`);
    }
    const entries = Object.entries(reports);
    if (entries.length === 0) throw new Error(`highlights.json ${lang} highlights are empty`);
    for (const [reportId, highlights] of entries) {
      if (!/^ai-[a-z0-9-]+$/.test(reportId) || !Array.isArray(highlights) || highlights.length === 0) {
        throw new Error(`highlights.json ${lang}/${reportId} has an invalid shape`);
      }
      if (highlights.some((item) => typeof item !== "string" || item.trim().length === 0)) {
        throw new Error(`highlights.json ${lang}/${reportId} contains an empty item`);
      }
    }
    languages.push(lang);
  }
  return languages;
}

export function validatePublication(date: string, root = "."): PublicationValidation {
  if (!DATE_RE.test(date)) throw new Error(`invalid digest date: ${date}`);

  const errors: string[] = [];
  const coreReports: string[] = [];
  for (const report of CORE_REPORTS) {
    const relativePath = path.posix.join("digests", date, `${report}.md`);
    try {
      const content = readRequired(root, relativePath);
      if (content.trim().length < 100) throw new Error(`core report is implausibly short: ${relativePath}`);
      if (!content.includes(date)) throw new Error(`core report does not contain its date: ${relativePath}`);
      coreReports.push(report);
    } catch (error) {
      errors.push(String(error));
    }
  }

  let status: "ok" | "degraded" = "degraded";
  try {
    const value = parseRequiredJson<StatusShape>(root, path.posix.join("digests", date, "run-status.json"));
    if (value.schemaVersion !== 1 || value.date !== date || !Array.isArray(value.components)) {
      throw new Error("run-status.json has an invalid schema or date");
    }
    if (value.status !== "ok" && value.status !== "degraded") {
      throw new Error("run-status.json has an invalid status");
    }
    status = value.status;
  } catch (error) {
    errors.push(String(error));
  }

  let highlightLanguages: string[] = [];
  try {
    const highlights = parseRequiredJson<unknown>(root, path.posix.join("digests", date, "highlights.json"));
    highlightLanguages = validateHighlights(highlights);
  } catch (error) {
    errors.push(String(error));
  }

  try {
    const manifest = parseRequiredJson<ManifestShape>(root, "manifest.json");
    if (!Number.isFinite(Date.parse(manifest.generated)) || !Array.isArray(manifest.dates)) {
      throw new Error("manifest.json has an invalid schema");
    }
    const entry = manifest.dates.find((candidate) => candidate.date === date);
    if (!entry) throw new Error(`manifest.json does not contain ${date}`);
    for (const report of CORE_REPORTS) {
      if (!entry.reports.includes(report)) throw new Error(`manifest.json is missing ${date}/${report}`);
    }
  } catch (error) {
    errors.push(String(error));
  }

  try {
    const feed = readRequired(root, "feed.xml");
    for (const report of CORE_REPORTS) {
      if (!feed.includes(`#${date}/${report}`)) throw new Error(`feed.xml is missing ${date}/${report}`);
    }
  } catch (error) {
    errors.push(String(error));
  }

  if (errors.length > 0) {
    throw new Error(`publication validation failed:\n- ${errors.join("\n- ")}`);
  }

  return { date, status, coreReports, highlightLanguages };
}

const isDirectRun =
  process.argv[1]?.endsWith("validate-publication.ts") ||
  process.argv[1]?.endsWith("validate-publication.js");
if (isDirectRun) {
  try {
    const date =
      process.argv.slice(2).find((argument) => argument !== "--") ?? process.env["DIGEST_DATE"] ?? "";
    const result = validatePublication(date);
    console.log(`[publication-validation] ${JSON.stringify(result)}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
