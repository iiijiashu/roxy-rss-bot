import {
  validateSynthesis,
  type EvidenceRecord,
  type EventCandidate,
  type QualityReport,
  type SynthesisResult,
} from "./evidence.ts";

const MAX_SYNTHESIS_ATTEMPTS = 3;
const SYNTHESIS_MAX_TOKENS = 6_000;
const MAX_SYNTHESIS_PROMPT_BYTES = 160_000;
const MAX_SYNTHESIS_CORRECTION_BYTES = 24_000;
const INVALID_JSON_CORRECTION =
  "\n\n上一轮不是合法且可验证的严格 JSON。重新输出完整 JSON，不要解释，不要 Markdown fence。\n";

export type SynthesisAttemptOutcome =
  | { attempt: number; state: "ok" }
  | { attempt: number; state: "degraded"; reason: "quality_gate_failed" }
  | {
      attempt: number;
      state: "degraded";
      reason: "request_or_parse_failed";
      error: unknown;
    };

interface SynthesisDependencies {
  invoke: (prompt: string, maxTokens: number) => Promise<string>;
  parse: (raw: string) => unknown;
  onAttempt?: (outcome: SynthesisAttemptOutcome) => void;
}

function safeQualityFailureSummary(quality: QualityReport): string {
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  const safeDetails = quality.violations.filter(
    (violation) =>
      /^synthesis root /u.test(violation) ||
      /^development \d+ has an invalid schema:/u.test(violation) ||
      /^development count mismatch:/u.test(violation) ||
      /^duplicate ratio too high:/u.test(violation) ||
      violation === "one or more events lack valid current evidence",
  );
  return [`failed checks: ${failedChecks.join(", ")}`, ...safeDetails].join("; ");
}

function assertByteLimit(value: string, label: string, limit: number): void {
  if (Buffer.byteLength(value, "utf8") > limit) {
    throw new Error(`${label} exceeds the byte limit`);
  }
}

function canUseThirdAttempt(attempt: number, quality: QualityReport, hadRequestFailure: boolean): boolean {
  if (attempt !== 2 || hadRequestFailure) return false;
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  const schemaOnly =
    failedChecks.includes("schema") &&
    failedChecks.every((name) => name === "schema" || name === "development_count");
  const nearComplete = quality.developmentCount >= Math.max(0, quality.eligibleEventCount - 1);
  return schemaOnly && nearComplete;
}

function qualityCorrection(quality: QualityReport, events: EventCandidate[]): string {
  const correction = [
    "",
    "上一轮输出被机械质量门拒绝。必须修正后重新输出完整 JSON。",
    `脱敏诊断：${safeQualityFailureSummary(quality)}`,
    `developments 必须恰好包含 ${events.length} 条，并严格保持以下 event_id 顺序：`,
    JSON.stringify(events.map((event) => event.id)),
    "每条 development 只能包含 event_id、source_ids、summary、title、why_it_matters，所有字段都必须完整。",
    "不要解释，不要 Markdown fence。",
    "",
  ].join("\n");
  assertByteLimit(correction, "Synthesis correction", MAX_SYNTHESIS_CORRECTION_BYTES);
  return correction;
}

export async function synthesizeWithQualityGate(
  basePrompt: string,
  events: EventCandidate[],
  records: EvidenceRecord[],
  dependencies: SynthesisDependencies,
): Promise<{ synthesis: SynthesisResult; quality: QualityReport }> {
  let correction = "";
  let lastError: unknown;
  let hadRequestFailure = false;

  assertByteLimit(basePrompt, "Synthesis base prompt", MAX_SYNTHESIS_PROMPT_BYTES);

  for (let attempt = 1; attempt <= MAX_SYNTHESIS_ATTEMPTS; attempt++) {
    const prompt = `${basePrompt}${correction}`;
    assertByteLimit(prompt, "Synthesis request prompt", MAX_SYNTHESIS_PROMPT_BYTES);

    let raw: string;
    try {
      raw = await dependencies.invoke(prompt, SYNTHESIS_MAX_TOKENS);
    } catch (error) {
      hadRequestFailure = true;
      lastError = error;
      dependencies.onAttempt?.({
        attempt,
        state: "degraded",
        reason: "request_or_parse_failed",
        error,
      });
      if (attempt >= 2) break;
      correction = "";
      continue;
    }

    let candidate: unknown;
    try {
      candidate = dependencies.parse(raw);
    } catch (error) {
      lastError = error;
      dependencies.onAttempt?.({
        attempt,
        state: "degraded",
        reason: "request_or_parse_failed",
        error,
      });
      if (attempt >= 2) break;
      correction = INVALID_JSON_CORRECTION;
      continue;
    }

    const quality = validateSynthesis(candidate, events, records);
    if (quality.status === "pass") {
      dependencies.onAttempt?.({ attempt, state: "ok" });
      return { synthesis: candidate as SynthesisResult, quality };
    }

    dependencies.onAttempt?.({ attempt, state: "degraded", reason: "quality_gate_failed" });
    lastError = new Error(safeQualityFailureSummary(quality));
    if (attempt === 1 || canUseThirdAttempt(attempt, quality, hadRequestFailure)) {
      correction = qualityCorrection(quality, events);
      continue;
    }
    break;
  }

  throw lastError ?? new Error("Synthesis failed after bounded attempts");
}
