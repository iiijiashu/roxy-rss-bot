import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  DAILY_SELECTION_POLICY,
  MAX_DAILY_DEVELOPMENTS,
  MIN_DAILY_DEVELOPMENTS,
  groupEvidence,
  selectTopEvents,
  type EvidenceRecord,
  type QualityReport,
} from "./evidence.ts";
import {
  EVALUATION_NORMALIZATION_CODES,
  FORMAL_EVALUATION_CLEAN_RUNS,
  MAX_EVALUATION_REPLACEMENT_RUNS,
  MAX_EVALUATION_SYNTHESIS_ATTEMPTS,
  MAX_QUALITY_REPAIR_ATTEMPTS_PER_RUN,
  MAX_TOTAL_QUALITY_REPAIR_ATTEMPTS,
  MIN_FORMAL_FIRST_PASS_RUNS,
  isEvaluationRepairNormalization,
} from "./evaluation-policy.ts";
import { canonicalOutputSha256, synthesisStructureSha256 } from "./evaluation-hash.ts";
import {
  VALID_PROVIDER_NAMES,
  createProvider,
  type LlmProvider,
  type LlmProviderDiagnostics,
  type ProviderName,
} from "./providers/index.ts";
import { classifyFailure } from "./run-status.ts";
import { serializeJsonForPersistence } from "./redaction.ts";
import {
  MAX_SYNTHESIS_EVENTS_PER_TASK,
  synthesizeInChunksWithQualityGate,
  type SynthesisAttemptOutcome,
} from "./synthesis.ts";

const DEFAULT_REPLAY_RUNS = FORMAL_EVALUATION_CLEAN_RUNS;
const MAX_REPLAY_RUNS = 5;
const DEFAULT_MAX_REPLACEMENT_RUNS = 0;
const MAX_RUN_DELAY_MS = 300_000;
const MAX_RECOVERABLE_PROVIDER_FAILURES = 2;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;
const RECOVERABLE_PROVIDER_FAILURE_CODES = new Set([
  "empty_response",
  "invalid_envelope",
  "invalid_json",
  "omitted_task",
  "output_limit",
  "rate_limit",
  "server_error",
  "timeout",
  "transport",
]);
type RecoverableProviderFailureCode =
  | "empty_response"
  | "invalid_envelope"
  | "invalid_json"
  | "omitted_task"
  | "output_limit"
  | "rate_limit"
  | "server_error"
  | "timeout"
  | "transport";
type ReplacementReason = "provider_recovered" | RecoverableProviderFailureCode;
interface ReplayEvidenceArtifact {
  schemaVersion: 2;
  records: EvidenceRecord[];
  selectedEventIds: string[];
  selection: {
    previousNoveltyKeys: string[];
  };
}

interface SafeAttempt {
  chunk: number;
  attempt: number;
  state: "ok" | "degraded";
  reason?: "quality_gate_failed" | "request_or_parse_failed";
  failedChecks?: string[];
  developmentCount?: number;
  eligibleEventCount?: number;
  mechanicalTokenShapes?: string[];
  lexicalTokens?: string[];
  untranslatedActionTokens?: string[];
  inferenceLabels?: string[];
  editorialLabels?: string[];
  normalizationsApplied?: string[];
  code?: string;
}

interface SafeDiagnostics extends LlmProviderDiagnostics {
  diagnosticsAvailable: true;
  diagnosticsValid: boolean;
}

interface UnavailableDiagnostics {
  provider: string;
  diagnosticsAvailable: false;
  diagnosticsValid: false;
}

export interface DailyEvaluationRun {
  run: number;
  qualityPassed: boolean;
  firstPass: boolean;
  qualityRepairAttempts: number;
  providerClean: boolean;
  providerRecovered: boolean;
  passed: boolean;
  countedForAcceptance: boolean;
  replacementReason?: ReplacementReason;
  outputSha256?: string;
  structureSha256?: string;
  code?: string;
  attempts: SafeAttempt[];
  failedChecks: string[];
  developmentCount: number;
  deterministicNormalizations: string[];
  diagnostics: SafeDiagnostics | UnavailableDiagnostics;
}

export interface DailyEvaluationReport {
  schemaVersion: 3;
  date: string;
  evidenceSha256: string;
  runDelayMs: number;
  targetCleanRuns: number;
  maxReplacementRuns: number;
  runsExecuted: number;
  cleanRunsCollected: number;
  replacementsUsed: number;
  passRate: number;
  passed: boolean;
  acceptance: {
    selectionIdentical: boolean;
    selectionCountInRange: boolean;
    requiredProvider: string | null;
    providerMatched: boolean;
    outputsIdentical: boolean;
    structureIdentical: boolean;
    cleanRuns: boolean;
    acceptableRuns: boolean;
    recoveredRuns: number;
    firstPassRuns: number;
    normalizedRuns: number;
    boundedQualityRepairs: boolean;
    boundedSynthesisAttempts: boolean;
    atLeastOneFirstPass: boolean;
    totalQualityRepairAttempts: number;
    health: "healthy" | "degraded";
  };
  selection: {
    originalCount: number;
    recomputedCount: number;
    identical: boolean;
    addedEventIds: string[];
    removedEventIds: string[];
  };
  runs: DailyEvaluationRun[];
}

export interface DailyEvaluationOptions {
  date: string;
  runs?: number;
  maxReplacementRuns?: number;
  rootDir?: string;
  requiredProvider?: string;
  providerFactory?: () => LlmProvider;
  runDelayMs?: number;
  waitForDelay?: (delayMs: number) => Promise<void>;
}

export interface DailyEvaluationArgs {
  date: string;
  runs: number;
  maxReplacementRuns: number;
  runDelayMs: number;
  provider?: ProviderName;
}

function validDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function assertOptions(
  date: string,
  runs: number,
  runDelayMs = 0,
  maxReplacementRuns = DEFAULT_MAX_REPLACEMENT_RUNS,
): void {
  if (!validDate(date)) throw new Error("Evaluation date must use a valid YYYY-MM-DD value");
  if (!Number.isSafeInteger(runs) || runs < 1 || runs > MAX_REPLAY_RUNS) {
    throw new Error(`Evaluation runs must be an integer from 1 to ${MAX_REPLAY_RUNS}`);
  }
  if (!Number.isSafeInteger(runDelayMs) || runDelayMs < 0 || runDelayMs > MAX_RUN_DELAY_MS) {
    throw new Error(`Evaluation run delay must be an integer from 0 to ${MAX_RUN_DELAY_MS}`);
  }
  if (
    !Number.isSafeInteger(maxReplacementRuns) ||
    maxReplacementRuns < 0 ||
    maxReplacementRuns > MAX_EVALUATION_REPLACEMENT_RUNS
  ) {
    throw new Error(
      `Evaluation replacement runs must be an integer from 0 to ${MAX_EVALUATION_REPLACEMENT_RUNS}`,
    );
  }
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function normalizedRequiredProvider(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const provider = value.trim().toLowerCase();
  if (!provider) throw new Error("Required evaluation provider must not be empty");
  return provider;
}

function readEvidenceArtifact(filePath: string): { artifact: ReplayEvidenceArtifact; raw: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Replay evidence must be a JSON object");
  }
  const candidate = parsed as Partial<ReplayEvidenceArtifact>;
  if (
    candidate.schemaVersion !== 2 ||
    !Array.isArray(candidate.records) ||
    !Array.isArray(candidate.selectedEventIds) ||
    !candidate.selection ||
    !Array.isArray(candidate.selection.previousNoveltyKeys)
  ) {
    throw new Error("Replay evidence has an invalid schema");
  }
  if (
    candidate.selectedEventIds.some((value) => typeof value !== "string") ||
    candidate.selection.previousNoveltyKeys.some((value) => typeof value !== "string")
  ) {
    throw new Error("Replay evidence contains invalid selection identifiers");
  }
  return { artifact: candidate as ReplayEvidenceArtifact, raw };
}

function remapNormalizations(chunk: number, labels: readonly string[]): string[] {
  return labels
    .flatMap((label) => {
      const match = label.match(/^(\d+):([a-z_]+)$/u);
      if (!match || !EVALUATION_NORMALIZATION_CODES.has(match[2]!)) return [];
      const localIndex = Number(match[1]);
      if (
        !Number.isSafeInteger(localIndex) ||
        localIndex < 0 ||
        localIndex >= MAX_SYNTHESIS_EVENTS_PER_TASK
      ) {
        return [];
      }
      const globalIndex = (chunk - 1) * MAX_SYNTHESIS_EVENTS_PER_TASK + localIndex;
      return [`${globalIndex}:${match[2]}`];
    })
    .slice(0, 32);
}

function safeAttempt(chunk: number, outcome: SynthesisAttemptOutcome): SafeAttempt {
  if (outcome.state === "ok") {
    return {
      chunk,
      attempt: outcome.attempt,
      state: "ok",
      normalizationsApplied: remapNormalizations(chunk, outcome.normalizationsApplied),
    };
  }
  if (outcome.reason === "quality_gate_failed") {
    return {
      chunk,
      attempt: outcome.attempt,
      state: "degraded",
      reason: outcome.reason,
      failedChecks: [...outcome.failedChecks].sort(),
      developmentCount: outcome.developmentCount,
      eligibleEventCount: outcome.eligibleEventCount,
      mechanicalTokenShapes: [...outcome.mechanicalTokenShapes],
      lexicalTokens: [...outcome.lexicalTokens],
      ...(outcome.untranslatedActionTokens
        ? { untranslatedActionTokens: [...outcome.untranslatedActionTokens] }
        : {}),
      inferenceLabels: [...outcome.inferenceLabels],
      editorialLabels: [...outcome.editorialLabels],
      normalizationsApplied: remapNormalizations(chunk, outcome.normalizationsApplied),
    };
  }
  return {
    chunk,
    attempt: outcome.attempt,
    state: "degraded",
    reason: outcome.reason,
    code: classifyFailure(outcome.error),
  };
}

function safeDiagnostics(provider: LlmProvider): SafeDiagnostics | UnavailableDiagnostics {
  let diagnostics: LlmProviderDiagnostics | undefined;
  try {
    diagnostics = provider.getDiagnostics?.();
  } catch {
    diagnostics = undefined;
  }
  if (!diagnostics) {
    return { provider: provider.name, diagnosticsAvailable: false, diagnosticsValid: false };
  }
  const raw = diagnostics as unknown as Record<string, unknown>;
  const counterNames = ["requests", "retryRequests", "tasksResolved", "tasksRetried", "tasksFailed"] as const;
  const countersValid = counterNames.every(
    (name) => Number.isSafeInteger(raw[name]) && Number(raw[name]) >= 0,
  );
  const safeCounter = (name: (typeof counterNames)[number]): number =>
    Number.isSafeInteger(raw[name]) && Number(raw[name]) >= 0 ? Number(raw[name]) : 0;
  const rawErrors = raw["errors"];
  const errorEntries =
    rawErrors && typeof rawErrors === "object" && !Array.isArray(rawErrors)
      ? Object.entries(rawErrors as Record<string, unknown>)
      : [];
  const errorsValid =
    rawErrors !== null &&
    typeof rawErrors === "object" &&
    !Array.isArray(rawErrors) &&
    errorEntries.every(
      ([code, count]) =>
        /^[a-z][a-z0-9_-]{1,63}$/u.test(code) && Number.isSafeInteger(count) && Number(count) >= 0,
    );
  return {
    provider: provider.name,
    requests: safeCounter("requests"),
    retryRequests: safeCounter("retryRequests"),
    tasksResolved: safeCounter("tasksResolved"),
    tasksRetried: safeCounter("tasksRetried"),
    tasksFailed: safeCounter("tasksFailed"),
    errors: Object.fromEntries(
      errorEntries
        .filter(
          ([code, count]) =>
            /^[a-z][a-z0-9_-]{1,63}$/u.test(code) && Number.isSafeInteger(count) && Number(count) >= 0,
        )
        .map(([code, count]) => [code, Number(count)] as const)
        .sort(([left], [right]) => left.localeCompare(right)),
    ),
    diagnosticsAvailable: true,
    diagnosticsValid: countersValid && errorsValid,
  };
}

function failedChecks(quality: QualityReport): string[] {
  return quality.checks
    .filter((check) => !check.passed)
    .map((check) => check.name)
    .sort();
}

function runNormalizations(attempts: SafeAttempt[]): string[] {
  return [...new Set(attempts.flatMap((attempt) => attempt.normalizationsApplied ?? []))].sort();
}

function attemptIncludesSemanticRepair(attempt: SafeAttempt): boolean {
  return (attempt.normalizationsApplied ?? []).some(isEvaluationRepairNormalization);
}

function qualityRepairAttemptCount(attempts: SafeAttempt[]): number {
  return attempts.filter(
    (attempt) => attempt.reason === "quality_gate_failed" || attemptIncludesSemanticRepair(attempt),
  ).length;
}

function cleanDiagnostics(
  diagnostics: SafeDiagnostics | UnavailableDiagnostics,
  expectedAttempts: number,
): boolean {
  return (
    diagnostics.diagnosticsAvailable &&
    diagnostics.diagnosticsValid &&
    diagnostics.requests === expectedAttempts &&
    diagnostics.tasksResolved === expectedAttempts &&
    diagnostics.retryRequests === 0 &&
    diagnostics.tasksRetried === 0 &&
    diagnostics.tasksFailed === 0 &&
    Object.values(diagnostics.errors).every((count) => count === 0)
  );
}

function recoverableDiagnostics(
  diagnostics: SafeDiagnostics | UnavailableDiagnostics,
  attempts: SafeAttempt[],
): boolean {
  const failedAttempts = attempts.filter((attempt) => attempt.reason === "request_or_parse_failed");
  if (
    failedAttempts.length < 1 ||
    failedAttempts.length > MAX_RECOVERABLE_PROVIDER_FAILURES ||
    failedAttempts.some((attempt) => !attempt.code || !RECOVERABLE_PROVIDER_FAILURE_CODES.has(attempt.code))
  ) {
    return false;
  }
  if (!diagnostics.diagnosticsAvailable || !diagnostics.diagnosticsValid) return false;
  const errorEntries = Object.entries(diagnostics.errors).filter(([, count]) => count > 0);
  const errorCount = errorEntries.reduce((total, [, count]) => total + count, 0);
  const attemptCodes = failedAttempts.map((attempt) => attempt.code!).sort();
  const diagnosticCodes = errorEntries.flatMap(([code, count]) => Array(count).fill(code)).sort();
  return (
    diagnostics.requests === attempts.length &&
    diagnostics.tasksResolved === attempts.length - failedAttempts.length &&
    diagnostics.retryRequests === 0 &&
    diagnostics.tasksRetried === 0 &&
    diagnostics.tasksFailed === failedAttempts.length &&
    errorCount === failedAttempts.length &&
    errorEntries.every(([code]) => RECOVERABLE_PROVIDER_FAILURE_CODES.has(code)) &&
    JSON.stringify(attemptCodes) === JSON.stringify(diagnosticCodes)
  );
}

function failedRunReplacementReason(
  code: string,
  diagnostics: SafeDiagnostics | UnavailableDiagnostics,
  attempts: SafeAttempt[],
): RecoverableProviderFailureCode | undefined {
  if (
    !RECOVERABLE_PROVIDER_FAILURE_CODES.has(code) ||
    attempts.some((attempt) => attempt.reason === "quality_gate_failed") ||
    !diagnostics.diagnosticsAvailable ||
    !diagnostics.diagnosticsValid
  ) {
    return undefined;
  }
  const failedAttempts = attempts.filter((attempt) => attempt.reason === "request_or_parse_failed");
  if (
    failedAttempts.length < 1 ||
    failedAttempts.at(-1)?.code !== code ||
    failedAttempts.some((attempt) => !attempt.code || !RECOVERABLE_PROVIDER_FAILURE_CODES.has(attempt.code))
  ) {
    return undefined;
  }
  const errorEntries = Object.entries(diagnostics.errors).filter(([, count]) => count > 0);
  const attemptCodes = failedAttempts.map((attempt) => attempt.code!).sort();
  const diagnosticCodes = errorEntries.flatMap(([errorCode, count]) => Array(count).fill(errorCode)).sort();
  if (
    diagnostics.requests !== attempts.length ||
    diagnostics.tasksResolved !== attempts.length - failedAttempts.length ||
    diagnostics.retryRequests !== 0 ||
    diagnostics.tasksRetried !== 0 ||
    diagnostics.tasksFailed !== failedAttempts.length ||
    JSON.stringify(attemptCodes) !== JSON.stringify(diagnosticCodes)
  ) {
    return undefined;
  }
  return code as RecoverableProviderFailureCode;
}

function writeJsonAtomic(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryPath, serializeJsonForPersistence(value), "utf-8");
  fs.renameSync(temporaryPath, filePath);
}

export async function evaluateDailyReplay(options: DailyEvaluationOptions): Promise<DailyEvaluationReport> {
  const targetCleanRuns = options.runs ?? DEFAULT_REPLAY_RUNS;
  const maxReplacementRuns = options.maxReplacementRuns ?? DEFAULT_MAX_REPLACEMENT_RUNS;
  const runDelayMs = options.runDelayMs ?? 0;
  assertOptions(options.date, targetCleanRuns, runDelayMs, maxReplacementRuns);
  const rootDir = path.resolve(options.rootDir ?? process.cwd());
  const digestDir = path.join(rootDir, "digests", options.date);
  const evidencePath = path.join(digestDir, "evidence.json");
  const { artifact, raw } = readEvidenceArtifact(evidencePath);
  const events = groupEvidence(artifact.records);
  const selected = selectTopEvents(events, {
    previousKeys: new Set(artifact.selection.previousNoveltyKeys),
    ...DAILY_SELECTION_POLICY,
  });
  if (selected.length === 0) throw new Error("Replay evidence has no selectable current events");

  const originalIds = artifact.selectedEventIds;
  const recomputedIds = selected.map((event) => event.id);
  const originalSet = new Set(originalIds);
  const recomputedSet = new Set(recomputedIds);
  const selectionIdentical = JSON.stringify(originalIds) === JSON.stringify(recomputedIds);
  const selectionCountInRange =
    recomputedIds.length >= MIN_DAILY_DEVELOPMENTS && recomputedIds.length <= MAX_DAILY_DEVELOPMENTS;
  const requiredProvider = normalizedRequiredProvider(options.requiredProvider);
  const results: DailyEvaluationRun[] = [];
  const providerFactory = options.providerFactory ?? (() => createProvider());
  const waitForDelay = options.waitForDelay ?? wait;
  let cleanRunsCollected = 0;
  let replacementsUsed = 0;
  let acceptedStructureSha256: string | undefined;
  let stopEvaluation = false;

  for (
    let run = 1;
    run <= targetCleanRuns + maxReplacementRuns && cleanRunsCollected < targetCleanRuns && !stopEvaluation;
    run++
  ) {
    if (results.length > 0 && runDelayMs > 0) {
      console.log(
        `[evaluation] pacing run=${run}/${targetCleanRuns + maxReplacementRuns} delay_ms=${runDelayMs}`,
      );
      await waitForDelay(runDelayMs);
    }
    const provider = providerFactory();
    const attempts: SafeAttempt[] = [];
    try {
      const result = await synthesizeInChunksWithQualityGate(selected, artifact.records, {
        invoke: (prompt, maxTokens) => provider.call(prompt, maxTokens, { responseFormat: "json_object" }),
        parse: (response) => JSON.parse(response) as unknown,
        onAttempt: (chunk, outcome) => attempts.push(safeAttempt(chunk, outcome)),
        maxTotalAttempts: MAX_EVALUATION_SYNTHESIS_ATTEMPTS,
      });
      const runFailedChecks = failedChecks(result.quality);
      const diagnostics = safeDiagnostics(provider);
      const qualityPassed = result.quality.passed;
      const deterministicNormalizations = runNormalizations(attempts);
      const firstPass = attempts.every(
        (attempt) => attempt.state === "ok" && !attemptIncludesSemanticRepair(attempt),
      );
      const qualityRepairAttempts = qualityRepairAttemptCount(attempts);
      const providerClean =
        attempts.every((attempt) => attempt.reason !== "request_or_parse_failed") &&
        cleanDiagnostics(diagnostics, attempts.length);
      const providerRecovered = !providerClean && recoverableDiagnostics(diagnostics, attempts);
      const qualityRepairsBounded = qualityRepairAttempts <= MAX_QUALITY_REPAIR_ATTEMPTS_PER_RUN;
      const passed =
        qualityPassed &&
        (providerClean || providerRecovered) &&
        qualityRepairsBounded &&
        attempts.length <= MAX_EVALUATION_SYNTHESIS_ATTEMPTS;
      const runStructureSha256 = synthesisStructureSha256(result.synthesis);
      const providerMatches =
        requiredProvider === undefined || provider.name.trim().toLowerCase() === requiredProvider;
      const structureMatches =
        acceptedStructureSha256 === undefined || runStructureSha256 === acceptedStructureSha256;
      const countedForAcceptance = passed && providerClean && providerMatches && structureMatches;
      const eligibleReplacementReason =
        !countedForAcceptance && passed && providerRecovered && providerMatches && structureMatches
          ? ("provider_recovered" as const)
          : undefined;
      const canUseReplacement =
        eligibleReplacementReason !== undefined && replacementsUsed < maxReplacementRuns;
      results.push({
        run,
        qualityPassed,
        firstPass,
        qualityRepairAttempts,
        providerClean,
        providerRecovered,
        passed,
        countedForAcceptance,
        ...(canUseReplacement ? { replacementReason: eligibleReplacementReason } : {}),
        outputSha256: canonicalOutputSha256(result.synthesis),
        structureSha256: runStructureSha256,
        attempts,
        failedChecks: runFailedChecks,
        developmentCount: result.quality.developmentCount,
        deterministicNormalizations,
        diagnostics,
      });
      if (countedForAcceptance) {
        acceptedStructureSha256 ??= runStructureSha256;
        cleanRunsCollected++;
      } else if (canUseReplacement) {
        replacementsUsed++;
      } else {
        stopEvaluation = true;
      }
    } catch (error) {
      const code = classifyFailure(error);
      const diagnostics = safeDiagnostics(provider);
      const replacementReason = failedRunReplacementReason(code, diagnostics, attempts);
      const canUseReplacement = replacementReason !== undefined && replacementsUsed < maxReplacementRuns;
      results.push({
        run,
        qualityPassed: false,
        firstPass: false,
        qualityRepairAttempts: qualityRepairAttemptCount(attempts),
        providerClean: false,
        providerRecovered: false,
        passed: false,
        countedForAcceptance: false,
        ...(canUseReplacement ? { replacementReason } : {}),
        code,
        attempts,
        failedChecks: [],
        developmentCount: 0,
        deterministicNormalizations: runNormalizations(attempts),
        diagnostics,
      });
      if (canUseReplacement) {
        replacementsUsed++;
      } else {
        stopEvaluation = true;
      }
    }
  }

  const countedRuns = results.filter((result) => result.countedForAcceptance);
  const providerMatched =
    requiredProvider === undefined ||
    results.every((result) => result.diagnostics.provider.toLowerCase() === requiredProvider);
  const outputFingerprints = countedRuns.flatMap((result) =>
    result.outputSha256 === undefined ? [] : [result.outputSha256],
  );
  const outputsIdentical =
    outputFingerprints.length === targetCleanRuns && new Set(outputFingerprints).size === 1;
  const structureFingerprints = countedRuns.flatMap((result) =>
    result.structureSha256 === undefined ? [] : [result.structureSha256],
  );
  const structureIdentical =
    structureFingerprints.length === targetCleanRuns && new Set(structureFingerprints).size === 1;
  const cleanRuns =
    cleanRunsCollected === targetCleanRuns &&
    countedRuns.every((result) => result.qualityPassed && result.providerClean && result.passed);
  const acceptableRuns =
    results.length === cleanRunsCollected + replacementsUsed &&
    results.every((result) => result.countedForAcceptance || result.replacementReason !== undefined);
  const recoveredRuns = results.filter((result) => result.replacementReason === "provider_recovered").length;
  const firstPassRuns = countedRuns.filter((result) => result.firstPass && result.passed).length;
  const normalizedRuns = results.filter(
    (result) => result.countedForAcceptance && result.deterministicNormalizations.length > 0,
  ).length;
  const totalQualityRepairAttempts = results.reduce(
    (total, result) => total + result.qualityRepairAttempts,
    0,
  );
  const boundedQualityRepairs =
    results.every((result) => result.qualityRepairAttempts <= MAX_QUALITY_REPAIR_ATTEMPTS_PER_RUN) &&
    totalQualityRepairAttempts <= MAX_TOTAL_QUALITY_REPAIR_ATTEMPTS;
  const boundedSynthesisAttempts = results.every(
    (result) => result.attempts.length <= MAX_EVALUATION_SYNTHESIS_ATTEMPTS,
  );
  const atLeastOneFirstPass =
    targetCleanRuns < FORMAL_EVALUATION_CLEAN_RUNS || firstPassRuns >= MIN_FORMAL_FIRST_PASS_RUNS;
  const report: DailyEvaluationReport = {
    schemaVersion: 3,
    date: options.date,
    evidenceSha256: crypto.createHash("sha256").update(raw).digest("hex"),
    runDelayMs,
    targetCleanRuns,
    maxReplacementRuns,
    runsExecuted: results.length,
    cleanRunsCollected,
    replacementsUsed,
    passRate: cleanRunsCollected / targetCleanRuns,
    passed:
      cleanRunsCollected === targetCleanRuns &&
      acceptableRuns &&
      boundedQualityRepairs &&
      boundedSynthesisAttempts &&
      atLeastOneFirstPass &&
      structureIdentical &&
      selectionIdentical &&
      selectionCountInRange &&
      providerMatched,
    acceptance: {
      selectionIdentical,
      selectionCountInRange,
      requiredProvider: requiredProvider ?? null,
      providerMatched,
      outputsIdentical,
      structureIdentical,
      cleanRuns,
      acceptableRuns,
      recoveredRuns,
      firstPassRuns,
      normalizedRuns,
      boundedQualityRepairs,
      boundedSynthesisAttempts,
      atLeastOneFirstPass,
      totalQualityRepairAttempts,
      health: replacementsUsed > 0 ? "degraded" : "healthy",
    },
    selection: {
      originalCount: originalIds.length,
      recomputedCount: recomputedIds.length,
      identical: selectionIdentical,
      addedEventIds: recomputedIds.filter((eventId) => !originalSet.has(eventId)),
      removedEventIds: originalIds.filter((eventId) => !recomputedSet.has(eventId)),
    },
    runs: results,
  };
  writeJsonAtomic(path.join(digestDir, "evaluation-report.json"), report);
  return report;
}

export function parseEvaluationArgs(args: string[]): DailyEvaluationArgs {
  let date = "";
  let runs = DEFAULT_REPLAY_RUNS;
  let maxReplacementRuns = DEFAULT_MAX_REPLACEMENT_RUNS;
  let runDelayMs = 0;
  let provider: ProviderName | undefined;

  for (let index = 0; index < args.length; index++) {
    const value = args[index]!;
    if (value === "--runs") {
      runs = Number(args[++index]);
      continue;
    }
    if (value === "--provider") {
      const candidate = args[++index]?.trim().toLowerCase();
      if (!candidate || !VALID_PROVIDER_NAMES.includes(candidate as ProviderName)) {
        throw new Error(`Evaluation provider must be one of: ${VALID_PROVIDER_NAMES.join(", ")}`);
      }
      provider = candidate as ProviderName;
      continue;
    }
    if (value === "--max-replacement-runs") {
      maxReplacementRuns = Number(args[++index]);
      continue;
    }
    if (value === "--run-delay-ms") {
      runDelayMs = Number(args[++index]);
      continue;
    }
    if (value.startsWith("--") || date) throw new Error(`Unexpected evaluation argument: ${value}`);
    date = value;
  }

  assertOptions(date, runs, runDelayMs, maxReplacementRuns);
  return provider
    ? { date, runs, maxReplacementRuns, runDelayMs, provider }
    : { date, runs, maxReplacementRuns, runDelayMs };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { date, runs, maxReplacementRuns, runDelayMs, provider } = parseEvaluationArgs(process.argv.slice(2));
  evaluateDailyReplay({
    date,
    runs,
    maxReplacementRuns,
    runDelayMs,
    requiredProvider: provider,
    providerFactory: provider ? () => createProvider(provider) : undefined,
  })
    .then((report) => {
      console.log(
        `[evaluation] date=${report.date} clean_runs=${report.cleanRunsCollected}/${report.targetCleanRuns} ` +
          `replacements=${report.replacementsUsed}/${report.maxReplacementRuns} ` +
          `selection_identical=${report.selection.identical} ` +
          `selection_count_in_range=${report.acceptance.selectionCountInRange} ` +
          `provider_matched=${report.acceptance.providerMatched}`,
      );
      if (!report.passed) process.exitCode = 1;
    })
    .catch((error) => {
      console.error(`[evaluation] fatal: ${classifyFailure(error)}`);
      process.exitCode = 1;
    });
}
