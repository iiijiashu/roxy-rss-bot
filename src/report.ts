/**
 * LLM invocation, file I/O, and GitHub issue creation helpers.
 */

import fs from "node:fs";
import path from "node:path";
import { type Lang, FOOTER } from "./i18n.ts";
import { sleep } from "./date.ts";

// ---------------------------------------------------------------------------
// LLM token budget constants
// ---------------------------------------------------------------------------

export const LLM_TOKENS_DEFAULT = 4096;
export const LLM_TOKENS_TRENDING = 6144;
/** Table-formatted listing reports (HN, PH, ArXiv, HF, Community) need extra
 *  headroom for the multi-row tables plus 2-sentence summaries. */
export const LLM_TOKENS_LISTING = 6144;
export const LLM_TOKENS_WEB = 8192;
export const LLM_TOKENS_ROLLUP = 8192;
import { type LlmProvider, createProvider } from "./providers/index.ts";

const provider: LlmProvider = createProvider();

// ---------------------------------------------------------------------------
// Concurrency limiter — prevents rate-limit (429) errors when many LLM calls
// are fired in parallel. At most LLM_CONCURRENCY requests are in-flight at
// any given time; the rest queue and run as slots free up.
// ---------------------------------------------------------------------------

function configuredPositiveInteger(name: string, fallback?: number): number | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  if (!/^[1-9]\d*$/.test(raw)) throw new Error(`${name} must be a positive integer`);
  const value = Number(raw);
  if (!Number.isSafeInteger(value)) throw new Error(`${name} must be a safe integer`);
  return value;
}

const LLM_CONCURRENCY = configuredPositiveInteger("LLM_CONCURRENCY", 5)!;
let llmSlots = LLM_CONCURRENCY;
const llmQueue: Array<() => void> = [];
let llmCallAttempts = 0;

function acquireSlot(): Promise<void> {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
}

function releaseSlot(): void {
  const next = llmQueue.shift();
  if (next) {
    next();
  } else {
    llmSlots++;
  }
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 5_000; // 5 s, 10 s, 20 s

export function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

function consumeCallBudget(): void {
  const budget = configuredPositiveInteger("LLM_CALL_BUDGET");
  if (budget !== undefined && llmCallAttempts >= budget) {
    throw new Error(`LLM_CALL_BUDGET exhausted after ${llmCallAttempts} provider attempts`);
  }
  llmCallAttempts++;
}

/** Test-only reset for the module-scoped per-process call budget. */
export function resetLlmCallBudgetForTests(): void {
  llmCallAttempts = 0;
}

function configuredMaxTokens(requested: number): number {
  const rawLimit = process.env["LLM_MAX_TOKENS"]?.trim();
  if (!rawLimit) return requested;
  if (!/^[1-9]\d*$/.test(rawLimit)) {
    throw new Error("LLM_MAX_TOKENS must be a positive integer");
  }
  const limit = Number(rawLimit);
  if (!Number.isSafeInteger(limit)) {
    throw new Error("LLM_MAX_TOKENS must be a safe integer");
  }
  return Math.min(requested, limit);
}

export async function callLlm(prompt: string, maxTokens = LLM_TOKENS_DEFAULT): Promise<string> {
  const effectiveMaxTokens = configuredMaxTokens(maxTokens);
  for (let attempt = 0; ; attempt++) {
    consumeCallBudget();
    await acquireSlot();
    let released = false;
    try {
      return await provider.call(prompt, effectiveMaxTokens);
    } catch (err) {
      if (attempt < MAX_RETRIES && is429(err)) {
        releaseSlot();
        released = true;
        const wait = RETRY_BASE_MS * 2 ** attempt;
        console.error(`[llm] 429 — retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
}

// Matches ASCII control characters U+0000–U+001F. Built from a string so no
// literal control character appears in the source (keeps it readable + lint-clean).
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F]", "g");

/**
 * Parse JSON returned by an LLM. Strips markdown code fences and replaces raw
 * control characters with spaces before parsing. The model occasionally emits
 * an unescaped control character (e.g. a bare newline) inside a string literal,
 * which is illegal in JSON and makes `JSON.parse` throw "Bad control character
 * in string literal". Control chars outside strings are only insignificant
 * whitespace, so replacing them is safe either way.
 *
 * If the strict parse still fails, the payload is repaired once (drop any prose
 * wrapper around the JSON, strip trailing commas) and retried — a single stray
 * character (e.g. a trailing comma before `}`) used to wipe an entire language's
 * highlights.json.
 */
export function parseLlmJson<T = unknown>(raw: string): T {
  const cleaned = raw
    .replace(/```json?\n?/g, "")
    .replace(/```/g, "")
    .replace(CONTROL_CHARS, " ")
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    const repaired = repairJson(cleaned);
    if (repaired !== cleaned) return JSON.parse(repaired) as T;
    throw err;
  }
}

/**
 * Validate the runtime shape and requested language of notification highlights.
 * A syntactically valid JSON response is not sufficient: batched models can
 * occasionally copy the English sibling task into the Chinese result. Rejecting
 * that response lets the existing retry issue a dedicated Chinese-only request.
 */
export function assertReportHighlights(
  value: unknown,
  lang: Lang,
): asserts value is Record<string, string[]> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Highlights response must be a JSON object");
  }

  const entries = Object.entries(value);
  if (entries.length === 0) throw new Error("Highlights response was empty");

  const items: string[] = [];
  for (const [reportId, highlights] of entries) {
    if (!/^ai-[a-z0-9-]+$/.test(reportId) || !Array.isArray(highlights) || highlights.length === 0) {
      throw new Error("Highlights response had an invalid report entry");
    }
    for (const highlight of highlights) {
      if (typeof highlight !== "string" || highlight.trim().length === 0) {
        throw new Error("Highlights response contained an invalid item");
      }
      items.push(highlight);
    }
  }

  if (lang === "zh" && items.some((highlight) => !/[\u3400-\u9fff]/u.test(highlight))) {
    throw new Error("Chinese highlights response contained an untranslated item");
  }
}

/**
 * Best-effort repair of common LLM JSON defects: narrow to the outermost
 * object/array (dropping surrounding prose) and remove trailing commas before a
 * closing brace or bracket. Returns the input unchanged when nothing applies.
 */
function repairJson(s: string): string {
  const first = s.search(/[{[]/);
  const lastBrace = s.lastIndexOf("}");
  const lastBracket = s.lastIndexOf("]");
  const last = Math.max(lastBrace, lastBracket);
  const narrowed = first >= 0 && last > first ? s.slice(first, last + 1) : s;
  return narrowed.replace(/,(\s*[}\]])/g, "$1");
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

export function autoGenFooter(lang: Lang = "zh"): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return `\n\n---\n*${FOOTER.autoGen[lang]} [agents-radar](https://github.com/${digestRepo})${lang === "en" ? "." : " 自动生成。"}*`;
}
