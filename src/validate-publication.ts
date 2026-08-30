import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  DAILY_SELECTION_POLICY,
  MAX_DAILY_DEVELOPMENTS,
  MIN_DAILY_DEVELOPMENTS,
  evidenceDateForDisplay,
  groupEvidence,
  renderChineseDigest,
  selectTopEvents,
  validateSynthesis,
  type EvidenceRecord,
  type EventSelectionPolicy,
  type EventCandidate,
} from "./evidence.ts";
import { toCstDateStr } from "./date.ts";
import { feedContentFromMarkdown } from "./generate-manifest.ts";
import {
  FORMAL_EVALUATION_CLEAN_RUNS,
  MAX_EVALUATION_REPLACEMENT_RUNS,
  MAX_EVALUATION_SYNTHESIS_ATTEMPTS,
  MAX_QUALITY_REPAIR_ATTEMPTS_PER_RUN,
  MAX_TOTAL_QUALITY_REPAIR_ATTEMPTS,
  MIN_FORMAL_FIRST_PASS_RUNS,
} from "./evaluation-policy.ts";
import { synthesisStructureSha256 } from "./evaluation-hash.ts";
import { credentialShapedTextFiles } from "./redaction.ts";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAILY_REPORT = "digest";
const CURRENT_FRESHNESS = new Set([
  "newly_published",
  "materially_updated",
  "new_activity",
  "observed_signal",
]);
const ALL_FRESHNESS = new Set([...CURRENT_FRESHNESS, "historical", "metadata_only"]);
const AUTHORITIES = new Set(["primary", "primary-community", "secondary", "community-index"]);
const VISIBILITIES = new Set(["full_text", "official_summary", "metadata_only", "structured_api"]);
const CATEGORIES = new Set(["model", "agent", "tool", "infrastructure", "open_source", "paper", "research"]);
const FRESHNESS_WINDOW_MS = 72 * 60 * 60 * 1000;
const RECOVERABLE_EVALUATION_FAILURE_CODES = new Set([
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

interface QualityShape {
  schemaVersion: number;
  passed: boolean;
  status: string;
  eligibleEventCount: number;
  developmentCount: number;
  duplicateRatio: number;
  checks: Array<{ name: string; passed: boolean; detail: string }>;
  violations: string[];
}

interface EvidenceRecordShape {
  id: string;
  sourceType: string;
  sourceName: string;
  authority: string;
  url: string;
  title: string;
  content: string;
  category: string;
  freshness: string;
  visibility: string;
  confidence: number;
  observedAt: string;
  publishedAt?: string;
  updatedAt?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

interface EvidenceEventShape {
  id: string;
  key: string;
  noveltyKey: string;
  title: string;
  category: string;
  primarySourceId: string;
  sourceIds: string[];
  score: number;
  scoreBreakdown: Record<string, number>;
  publishedAt?: string;
  updatedAt?: string;
}

interface EvidenceShape {
  schemaVersion: number;
  observedAt: string;
  records: EvidenceRecordShape[];
  events: EvidenceEventShape[];
  selectedEventIds: string[];
  selection: {
    previousNoveltyKeys: string[];
    policy: EventSelectionPolicy;
  };
}

interface DigestDevelopmentShape {
  event_id: string;
  title: string;
  summary: string;
  why_it_matters: string;
  source_ids: string[];
}

interface DigestShape {
  schemaVersion: number;
  date: string;
  observedAt: string;
  developments: DigestDevelopmentShape[];
}

interface HighlightsShape {
  schemaVersion: number;
  date: string;
  zh: { digest: string[] };
  en: Record<string, never>;
}

interface LlmDiagnosticsShape {
  provider: string;
  requests?: number;
  retryRequests?: number;
  tasksResolved?: number;
  tasksRetried?: number;
  tasksFailed?: number;
  errors?: Record<string, number>;
}

interface EvaluationShape {
  schemaVersion: number;
  date: string;
  evidenceSha256: string;
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
    structureIdentical: boolean;
    cleanRuns: boolean;
    acceptableRuns: boolean;
    recoveredRuns: number;
    firstPassRuns: number;
    boundedQualityRepairs: boolean;
    boundedSynthesisAttempts: boolean;
    atLeastOneFirstPass: boolean;
    totalQualityRepairAttempts: number;
    health: "healthy" | "degraded";
  };
  selection: { identical: boolean; addedEventIds: string[]; removedEventIds: string[] };
  runs: Array<{
    run: number;
    qualityPassed: boolean;
    firstPass: boolean;
    qualityRepairAttempts: number;
    providerClean: boolean;
    providerRecovered: boolean;
    passed: boolean;
    countedForAcceptance: boolean;
    replacementReason?: string;
    code?: string;
    structureSha256?: string;
    developmentCount: number;
    attempts: Array<{ reason?: string; code?: string }>;
    diagnostics: {
      provider: string;
      diagnosticsAvailable?: boolean;
      diagnosticsValid?: boolean;
      requests?: number;
      retryRequests?: number;
      tasksResolved?: number;
      tasksRetried?: number;
      tasksFailed?: number;
      errors?: Record<string, number>;
    };
  }>;
}

interface ReplayProvenanceShape {
  schemaVersion: number;
  date: string;
  selectionIdentical: boolean;
  applied: boolean;
  outputEvidenceSha256: string;
}

function evaluationDiagnosticsReconcile(
  run: EvaluationShape["runs"][number],
  failedAttempts: Array<{ code?: string }>,
): boolean {
  const diagnostics = run.diagnostics;
  if (
    diagnostics.diagnosticsAvailable !== true ||
    diagnostics.diagnosticsValid !== true ||
    !Number.isInteger(diagnostics.requests) ||
    diagnostics.requests! < 1 ||
    diagnostics.retryRequests !== 0 ||
    diagnostics.tasksRetried !== 0 ||
    !Number.isInteger(diagnostics.tasksResolved) ||
    !Number.isInteger(diagnostics.tasksFailed) ||
    !diagnostics.errors ||
    typeof diagnostics.errors !== "object" ||
    Array.isArray(diagnostics.errors)
  ) {
    return false;
  }
  const errorCodes = Object.entries(diagnostics.errors)
    .flatMap(([code, count]) =>
      Number.isInteger(count) && count >= 0 ? Array(count).fill(code) : ["invalid_diagnostic_count"],
    )
    .sort();
  const failedCodes = failedAttempts.map((attempt) => attempt.code ?? "").sort();
  return (
    diagnostics.requests === run.attempts.length &&
    diagnostics.tasksResolved === run.attempts.length - failedAttempts.length &&
    diagnostics.tasksFailed === failedAttempts.length &&
    JSON.stringify(errorCodes) === JSON.stringify(failedCodes)
  );
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

function markdownSectionForEvent(markdown: string, eventId: string): string | undefined {
  const marker = `<!-- event=${eventId} `;
  const markerIndex = markdown.indexOf(marker);
  if (markerIndex < 0) return undefined;
  if (markdown.indexOf(marker, markerIndex + marker.length) >= 0) return undefined;
  const headingIndex = markdown.lastIndexOf("\n## ", markerIndex);
  if (headingIndex < 0) return undefined;
  return markdown.slice(headingIndex + 1, markerIndex + marker.length);
}

export function validatePublication(date: string, root = "."): PublicationValidation {
  if (!DATE_RE.test(date)) throw new Error(`invalid digest date: ${date}`);

  const errors: string[] = [];
  const credentialFiles = credentialShapedTextFiles(path.join(root, "digests"));
  if (credentialFiles.length > 0) {
    errors.push(`credential-shaped text remains in publishable digests: ${credentialFiles.join(", ")}`);
  }
  const coreReports = [DAILY_REPORT];
  const reportPath = path.posix.join("digests", date, `${DAILY_REPORT}.md`);
  let markdown = "";
  try {
    markdown = readRequired(root, reportPath);
    if (markdown.trim().length < 300) throw new Error(`daily digest is implausibly short: ${reportPath}`);
    if (!markdown.includes(date)) throw new Error(`daily digest does not contain its date: ${reportPath}`);
    if (!/[\u3400-\u9fff]/u.test(markdown)) throw new Error("daily digest has no Chinese content");
    if (/摘要生成失败|Summary generation failed|自动亮点提取暂时降级/u.test(markdown)) {
      throw new Error("daily digest contains a failure/degraded placeholder");
    }
  } catch (error) {
    errors.push(String(error));
  }

  let status: "ok" | "degraded" = "degraded";
  let diagnosticsProvider: string | undefined;
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

  try {
    const diagnostics = parseRequiredJson<LlmDiagnosticsShape>(
      root,
      path.posix.join("digests", date, "llm-diagnostics.json"),
    );
    if (!diagnostics || typeof diagnostics.provider !== "string" || !diagnostics.provider.trim()) {
      throw new Error("llm-diagnostics.json has an invalid provider");
    }
    diagnosticsProvider = diagnostics.provider.trim().toLowerCase();
    for (const value of [
      diagnostics.requests,
      diagnostics.retryRequests,
      diagnostics.tasksResolved,
      diagnostics.tasksRetried,
      diagnostics.tasksFailed,
    ]) {
      if (value !== undefined && (!Number.isInteger(value) || value < 0)) {
        throw new Error("llm-diagnostics.json contains an invalid counter");
      }
    }
    if (
      diagnostics.errors !== undefined &&
      (!diagnostics.errors ||
        typeof diagnostics.errors !== "object" ||
        Array.isArray(diagnostics.errors) ||
        Object.values(diagnostics.errors).some((value) => !Number.isInteger(value) || value < 0))
    ) {
      throw new Error("llm-diagnostics.json contains an invalid error counter");
    }
  } catch (error) {
    errors.push(String(error));
  }

  let quality: QualityShape | undefined;
  try {
    quality = parseRequiredJson<QualityShape>(root, path.posix.join("digests", date, "quality-report.json"));
    const requiredChecks = new Set([
      "schema",
      "development_count",
      "evidence_coverage",
      "chinese_only",
      "unsupported_inference",
      "lifecycle_language",
      "editorial_style",
      "mechanical_grounding",
      "lexical_grounding",
      "duplicate_ratio",
      "freshness_validity",
    ]);
    if (
      quality.schemaVersion !== 1 ||
      quality.passed !== true ||
      quality.status !== "pass" ||
      !Array.isArray(quality.checks) ||
      !Array.isArray(quality.violations) ||
      quality.violations.length > 0 ||
      quality.checks.some((check) => check.passed !== true)
    ) {
      throw new Error("quality-report.json did not pass all checks");
    }
    const checkNames = new Set(quality.checks.map((check) => check.name));
    if ([...requiredChecks].some((name) => !checkNames.has(name))) {
      throw new Error("quality-report.json is missing a required semantic check");
    }
    if (
      !Number.isInteger(quality.developmentCount) ||
      quality.developmentCount < MIN_DAILY_DEVELOPMENTS ||
      quality.developmentCount > MAX_DAILY_DEVELOPMENTS
    ) {
      throw new Error(
        `quality-report.json developmentCount must be within ${MIN_DAILY_DEVELOPMENTS}..${MAX_DAILY_DEVELOPMENTS}`,
      );
    }
    if (quality.eligibleEventCount !== quality.developmentCount) {
      throw new Error("quality-report.json must synthesize every selected eligible event exactly once");
    }
    if (!Number.isFinite(quality.duplicateRatio) || quality.duplicateRatio !== 0) {
      throw new Error("quality-report.json contains duplicate developments");
    }
  } catch (error) {
    errors.push(String(error));
  }

  let digest: DigestShape | undefined;
  try {
    digest = parseRequiredJson<DigestShape>(root, path.posix.join("digests", date, "digest.json"));
    if (
      digest.schemaVersion !== 1 ||
      digest.date !== date ||
      !Number.isFinite(Date.parse(digest.observedAt)) ||
      !Array.isArray(digest.developments)
    ) {
      throw new Error("digest.json has an invalid schema or date");
    }
    if (toCstDateStr(new Date(digest.observedAt)) !== date) {
      throw new Error("digest.json observedAt does not fall within its China Standard date");
    }
    if (quality && digest.developments.length !== quality.developmentCount) {
      throw new Error("digest.json development count does not match quality-report.json");
    }
    const eventIds = new Set<string>();
    for (const [index, development] of digest.developments.entries()) {
      if (
        !development ||
        typeof development.event_id !== "string" ||
        !development.event_id.trim() ||
        typeof development.title !== "string" ||
        !development.title.trim() ||
        typeof development.summary !== "string" ||
        !development.summary.trim() ||
        typeof development.why_it_matters !== "string" ||
        !development.why_it_matters.trim() ||
        !Array.isArray(development.source_ids) ||
        development.source_ids.length === 0 ||
        development.source_ids.some((sourceId) => typeof sourceId !== "string" || !sourceId.trim())
      ) {
        throw new Error(`digest.json development ${index} has an invalid schema`);
      }
      if (eventIds.has(development.event_id))
        throw new Error(`digest.json repeats event ${development.event_id}`);
      eventIds.add(development.event_id);
      if (new Set(development.source_ids).size !== development.source_ids.length) {
        throw new Error(`digest.json development ${development.event_id} repeats a source ID`);
      }
      if (
        ![development.title, development.summary, development.why_it_matters].every((value) =>
          /[\u3400-\u9fff]/u.test(value),
        )
      ) {
        throw new Error(`digest.json development ${development.event_id} is not Chinese`);
      }
    }
  } catch (error) {
    errors.push(String(error));
  }

  let highlightLanguages: string[] = [];
  try {
    const highlights = parseRequiredJson<HighlightsShape>(
      root,
      path.posix.join("digests", date, "highlights.json"),
    );
    const titles = highlights.zh?.digest;
    if (
      highlights.schemaVersion !== 1 ||
      highlights.date !== date ||
      !Array.isArray(titles) ||
      titles.length < 1 ||
      titles.length > 5 ||
      titles.some((title) => typeof title !== "string" || !/[\u3400-\u9fff]/u.test(title)) ||
      !highlights.en ||
      Object.keys(highlights.en).length !== 0
    ) {
      throw new Error("highlights.json must contain only 1..5 Chinese digest highlights");
    }
    if (digest && titles.some((title, index) => title !== digest!.developments[index]?.title)) {
      throw new Error("highlights.json does not match the leading digest developments");
    }
    highlightLanguages = ["zh"];
  } catch (error) {
    errors.push(String(error));
  }

  try {
    const evidenceRelativePath = path.posix.join("digests", date, "evidence.json");
    const evidenceRaw = readRequired(root, evidenceRelativePath);
    const evidenceSha256 = crypto.createHash("sha256").update(evidenceRaw).digest("hex");
    const evaluation = parseRequiredJson<EvaluationShape>(
      root,
      path.posix.join("digests", date, "evaluation-report.json"),
    );
    if (
      evaluation.schemaVersion !== 3 ||
      evaluation.date !== date ||
      evaluation.passed !== true ||
      !evaluation.acceptance ||
      !evaluation.selection ||
      !Array.isArray(evaluation.runs)
    ) {
      throw new Error("evaluation-report.json has an invalid or failing schema");
    }
    if (evaluation.evidenceSha256 !== evidenceSha256) {
      throw new Error("evaluation-report.json evidence hash does not match evidence.json");
    }
    if (
      evaluation.targetCleanRuns !== FORMAL_EVALUATION_CLEAN_RUNS ||
      !Number.isInteger(evaluation.maxReplacementRuns) ||
      evaluation.maxReplacementRuns < 0 ||
      evaluation.maxReplacementRuns > MAX_EVALUATION_REPLACEMENT_RUNS ||
      !Number.isInteger(evaluation.runsExecuted) ||
      evaluation.runsExecuted < FORMAL_EVALUATION_CLEAN_RUNS ||
      evaluation.runsExecuted > FORMAL_EVALUATION_CLEAN_RUNS + evaluation.maxReplacementRuns ||
      evaluation.runsExecuted !== evaluation.runs.length ||
      evaluation.cleanRunsCollected !== FORMAL_EVALUATION_CLEAN_RUNS ||
      !Number.isInteger(evaluation.replacementsUsed) ||
      evaluation.replacementsUsed < 0 ||
      evaluation.replacementsUsed > evaluation.maxReplacementRuns ||
      evaluation.replacementsUsed !== evaluation.runsExecuted - evaluation.cleanRunsCollected ||
      evaluation.passRate !== 1 ||
      evaluation.runs.filter((run) => run.countedForAcceptance === true).length !==
        FORMAL_EVALUATION_CLEAN_RUNS
    ) {
      throw new Error("evaluation-report.json requires exactly 3 counted clean runs and 0..2 replacements");
    }
    const requiredProvider = evaluation.acceptance.requiredProvider?.trim().toLowerCase();
    if (!requiredProvider || !diagnosticsProvider || requiredProvider !== diagnosticsProvider) {
      throw new Error("evaluation-report.json must pin the production provider");
    }
    const countedRuns = evaluation.runs.filter((run) => run.countedForAcceptance === true);
    const replacementRuns = evaluation.runs.filter((run) => run.countedForAcceptance !== true);
    if (!digest || synthesisStructureSha256(digest) !== countedRuns[0]?.structureSha256) {
      throw new Error("evaluation-report.json does not match the published digest structure");
    }
    const cleanRunInvalid = countedRuns.some(
      (run) =>
        run.qualityPassed !== true ||
        run.providerClean !== true ||
        run.providerRecovered !== false ||
        run.passed !== true ||
        run.replacementReason !== undefined ||
        !Array.isArray(run.attempts) ||
        !evaluationDiagnosticsReconcile(run, []) ||
        !Number.isInteger(run.developmentCount) ||
        run.developmentCount < MIN_DAILY_DEVELOPMENTS ||
        run.developmentCount > MAX_DAILY_DEVELOPMENTS ||
        !/^[a-f0-9]{64}$/u.test(run.structureSha256 ?? ""),
    );
    const replacementRunInvalid = replacementRuns.some((run) => {
      if (run.replacementReason === "provider_recovered") {
        const failedAttempts = Array.isArray(run.attempts)
          ? run.attempts.filter((attempt) => attempt.reason === "request_or_parse_failed")
          : [];
        return (
          run.qualityPassed !== true ||
          run.providerClean !== false ||
          run.providerRecovered !== true ||
          run.passed !== true ||
          failedAttempts.length < 1 ||
          failedAttempts.length > 2 ||
          failedAttempts.some(
            (attempt) => !attempt.code || !RECOVERABLE_EVALUATION_FAILURE_CODES.has(attempt.code),
          ) ||
          !evaluationDiagnosticsReconcile(run, failedAttempts) ||
          !Number.isInteger(run.developmentCount) ||
          run.developmentCount < MIN_DAILY_DEVELOPMENTS ||
          run.developmentCount > MAX_DAILY_DEVELOPMENTS
        );
      }
      if (
        !run.replacementReason ||
        !RECOVERABLE_EVALUATION_FAILURE_CODES.has(run.replacementReason) ||
        run.code !== run.replacementReason ||
        run.qualityPassed !== false ||
        run.providerClean !== false ||
        run.providerRecovered !== false ||
        run.passed !== false ||
        !Array.isArray(run.attempts) ||
        run.attempts.some((attempt) => attempt.reason === "quality_gate_failed")
      ) {
        return true;
      }
      const failedAttempts = run.attempts.filter((attempt) => attempt.reason === "request_or_parse_failed");
      return (
        failedAttempts.length < 1 ||
        failedAttempts.at(-1)?.code !== run.replacementReason ||
        failedAttempts.some(
          (attempt) => !attempt.code || !RECOVERABLE_EVALUATION_FAILURE_CODES.has(attempt.code),
        ) ||
        !evaluationDiagnosticsReconcile(run, failedAttempts)
      );
    });
    if (
      cleanRunInvalid ||
      replacementRunInvalid ||
      replacementRuns.length !== evaluation.replacementsUsed ||
      evaluation.acceptance.recoveredRuns !==
        replacementRuns.filter((run) => run.replacementReason === "provider_recovered").length ||
      new Set(countedRuns.map((run) => run.structureSha256)).size !== 1
    ) {
      throw new Error("evaluation-report.json requires strictly classified replacement runs");
    }
    if (
      evaluation.acceptance.selectionIdentical !== true ||
      evaluation.acceptance.selectionCountInRange !== true ||
      evaluation.acceptance.providerMatched !== true ||
      evaluation.acceptance.structureIdentical !== true ||
      evaluation.acceptance.cleanRuns !== true ||
      evaluation.acceptance.acceptableRuns !== true ||
      evaluation.acceptance.boundedQualityRepairs !== true ||
      evaluation.acceptance.boundedSynthesisAttempts !== true ||
      evaluation.acceptance.atLeastOneFirstPass !== true ||
      evaluation.acceptance.firstPassRuns < MIN_FORMAL_FIRST_PASS_RUNS ||
      evaluation.acceptance.firstPassRuns !== countedRuns.filter((run) => run.firstPass === true).length ||
      evaluation.acceptance.totalQualityRepairAttempts !==
        evaluation.runs.reduce((total, run) => total + run.qualityRepairAttempts, 0) ||
      evaluation.acceptance.totalQualityRepairAttempts > MAX_TOTAL_QUALITY_REPAIR_ATTEMPTS ||
      evaluation.acceptance.health !== (evaluation.replacementsUsed > 0 ? "degraded" : "healthy") ||
      evaluation.runs.some(
        (run) =>
          !Array.isArray(run.attempts) ||
          run.attempts.length > MAX_EVALUATION_SYNTHESIS_ATTEMPTS ||
          !Number.isInteger(run.qualityRepairAttempts) ||
          run.qualityRepairAttempts < 0 ||
          run.qualityRepairAttempts > MAX_QUALITY_REPAIR_ATTEMPTS_PER_RUN ||
          run.qualityRepairAttempts !==
            run.attempts.filter((attempt) => attempt.reason === "quality_gate_failed").length,
      ) ||
      evaluation.selection.identical !== true ||
      evaluation.selection.addedEventIds.length !== 0 ||
      evaluation.selection.removedEventIds.length !== 0 ||
      evaluation.runs.some(
        (run, index) =>
          run.run !== index + 1 || run.diagnostics?.provider?.trim().toLowerCase() !== requiredProvider,
      )
    ) {
      throw new Error("evaluation-report.json did not satisfy the production acceptance policy");
    }

    const provenancePath = path.join(root, "digests", date, "replay-provenance.json");
    if (fs.existsSync(provenancePath)) {
      const provenance = parseRequiredJson<ReplayProvenanceShape>(
        root,
        path.posix.join("digests", date, "replay-provenance.json"),
      );
      if (
        provenance.schemaVersion !== 2 ||
        provenance.date !== date ||
        provenance.selectionIdentical !== true ||
        provenance.applied !== true ||
        provenance.outputEvidenceSha256 !== evidenceSha256
      ) {
        throw new Error("replay-provenance.json does not match the applied evidence snapshot");
      }
    }
  } catch (error) {
    errors.push(String(error));
  }

  try {
    const evidence = parseRequiredJson<EvidenceShape>(
      root,
      path.posix.join("digests", date, "evidence.json"),
    );
    if (
      evidence.schemaVersion !== 2 ||
      !Number.isFinite(Date.parse(evidence.observedAt)) ||
      !Array.isArray(evidence.records) ||
      !Array.isArray(evidence.events) ||
      !Array.isArray(evidence.selectedEventIds) ||
      !evidence.selection ||
      !Array.isArray(evidence.selection.previousNoveltyKeys) ||
      !evidence.selection.policy
    ) {
      throw new Error("evidence.json has an invalid schema");
    }
    const previousNoveltyKeys = evidence.selection.previousNoveltyKeys;
    if (
      previousNoveltyKeys.some((key) => typeof key !== "string" || !key.trim()) ||
      new Set(previousNoveltyKeys).size !== previousNoveltyKeys.length ||
      previousNoveltyKeys.some(
        (key, index) => index > 0 && previousNoveltyKeys[index - 1]!.localeCompare(key) > 0,
      )
    ) {
      throw new Error("evidence.json has invalid previous novelty keys");
    }
    const policy = evidence.selection.policy;
    const expectedPolicyEntries = Object.entries(DAILY_SELECTION_POLICY).sort(([left], [right]) =>
      left.localeCompare(right),
    );
    const actualPolicyEntries = Object.entries(policy).sort(([left], [right]) => left.localeCompare(right));
    if (
      actualPolicyEntries.length !== expectedPolicyEntries.length ||
      actualPolicyEntries.some(
        ([key, value], index) =>
          key !== expectedPolicyEntries[index]?.[0] || value !== expectedPolicyEntries[index]?.[1],
      )
    ) {
      throw new Error("evidence.json selection policy does not match the publication policy");
    }
    if (digest && evidence.observedAt !== digest.observedAt) {
      throw new Error("evidence.json observedAt does not match digest.json");
    }
    if (quality && evidence.selectedEventIds.length !== quality.eligibleEventCount) {
      throw new Error("evidence.json selected event count does not match quality-report.json");
    }
    if (evidence.selectedEventIds.some((eventId) => typeof eventId !== "string" || !eventId.trim())) {
      throw new Error("evidence.json contains an invalid selected event ID");
    }
    if (new Set(evidence.selectedEventIds).size !== evidence.selectedEventIds.length) {
      throw new Error("evidence.json repeats a selected event ID");
    }
    for (const record of evidence.records) {
      if (
        !record ||
        typeof record.id !== "string" ||
        !record.id.trim() ||
        typeof record.sourceType !== "string" ||
        !record.sourceType.trim() ||
        typeof record.sourceName !== "string" ||
        !record.sourceName.trim() ||
        typeof record.url !== "string" ||
        typeof record.title !== "string" ||
        !record.title.trim() ||
        typeof record.content !== "string" ||
        !CATEGORIES.has(record.category) ||
        !AUTHORITIES.has(record.authority) ||
        !ALL_FRESHNESS.has(record.freshness) ||
        !VISIBILITIES.has(record.visibility) ||
        !Number.isFinite(record.confidence) ||
        record.confidence < 0 ||
        record.confidence > 1 ||
        typeof record.observedAt !== "string" ||
        !Number.isFinite(Date.parse(record.observedAt))
      ) {
        throw new Error("evidence.json contains an invalid record schema");
      }
      if ((record.visibility === "metadata_only") !== (record.freshness === "metadata_only")) {
        throw new Error(`evidence source ${record.id} has inconsistent metadata-only semantics`);
      }
      if (
        record.metadata !== undefined &&
        (!record.metadata ||
          typeof record.metadata !== "object" ||
          Array.isArray(record.metadata) ||
          Object.values(record.metadata).some(
            (value) => value !== null && !["string", "number", "boolean"].includes(typeof value),
          ))
      ) {
        throw new Error(`evidence source ${record.id} has invalid metadata`);
      }
      let parsed: URL;
      try {
        parsed = new URL(record.url);
      } catch {
        throw new Error(`evidence source ${record.id} has an invalid URL`);
      }
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        throw new Error(`evidence source ${record.id} has a non-http URL`);
      }
      if (parsed.username || parsed.password) {
        throw new Error(`evidence source ${record.id} URL contains credentials`);
      }
      const observedTime = Date.parse(record.observedAt);
      if (digest && observedTime > Date.parse(digest.observedAt) + 5 * 60_000) {
        throw new Error(`evidence source ${record.id} was observed after the digest`);
      }
      for (const timestamp of [record.publishedAt, record.updatedAt]) {
        if (timestamp && !Number.isFinite(Date.parse(timestamp))) {
          throw new Error(`evidence source ${record.id} has an invalid timestamp`);
        }
        if (timestamp && Date.parse(timestamp) > observedTime + 5 * 60_000) {
          throw new Error(`evidence source ${record.id} has a future timestamp`);
        }
      }
      const freshnessAnchor =
        record.freshness === "newly_published"
          ? record.publishedAt
          : record.freshness === "materially_updated"
            ? record.updatedAt
            : record.freshness === "new_activity"
              ? (record.updatedAt ?? record.publishedAt)
              : undefined;
      if (
        (record.freshness === "newly_published" ||
          record.freshness === "materially_updated" ||
          record.freshness === "new_activity") &&
        (!freshnessAnchor || observedTime - Date.parse(freshnessAnchor) > FRESHNESS_WINDOW_MS)
      ) {
        throw new Error(`evidence source ${record.id} has stale or missing ${record.freshness} evidence`);
      }
      if (
        record.freshness === "materially_updated" &&
        record.publishedAt &&
        (!record.updatedAt || Date.parse(record.updatedAt) <= Date.parse(record.publishedAt))
      ) {
        throw new Error(`evidence source ${record.id} has no distinct material update timestamp`);
      }
    }
    const scoreKeys = [
      "authority",
      "confidence",
      "duplicatePenalty",
      "freshness",
      "relevance",
      "signalNoise",
      "significance",
      "usefulness",
    ];
    for (const event of evidence.events) {
      const actualScoreKeys = event?.scoreBreakdown ? Object.keys(event.scoreBreakdown).sort() : [];
      if (
        !event ||
        typeof event.id !== "string" ||
        !event.id.trim() ||
        typeof event.key !== "string" ||
        !event.key.trim() ||
        typeof event.noveltyKey !== "string" ||
        !event.noveltyKey.trim() ||
        typeof event.title !== "string" ||
        !event.title.trim() ||
        !CATEGORIES.has(event.category) ||
        typeof event.primarySourceId !== "string" ||
        !event.primarySourceId.trim() ||
        !Array.isArray(event.sourceIds) ||
        event.sourceIds.length === 0 ||
        event.sourceIds.some((sourceId) => typeof sourceId !== "string" || !sourceId.trim()) ||
        new Set(event.sourceIds).size !== event.sourceIds.length ||
        !Number.isFinite(event.score) ||
        !event.scoreBreakdown ||
        typeof event.scoreBreakdown !== "object" ||
        Array.isArray(event.scoreBreakdown) ||
        Object.values(event.scoreBreakdown).some((value) => !Number.isFinite(value)) ||
        actualScoreKeys.length !== scoreKeys.length ||
        actualScoreKeys.some((key, index) => key !== scoreKeys[index]) ||
        Object.values(event.scoreBreakdown).reduce((sum, value) => sum + value, 0) !== event.score
      ) {
        throw new Error("evidence.json contains an invalid event schema");
      }
    }
    if (new Set(evidence.records.map((record) => record.id)).size !== evidence.records.length) {
      throw new Error("evidence.json contains duplicate record IDs");
    }
    if (new Set(evidence.events.map((event) => event.id)).size !== evidence.events.length) {
      throw new Error("evidence.json contains duplicate event IDs");
    }
    const recomputedEvents = groupEvidence(evidence.records as unknown as EvidenceRecord[]);
    if (JSON.stringify(recomputedEvents) !== JSON.stringify(evidence.events)) {
      throw new Error("evidence.json events do not match deterministic grouping and scoring");
    }
    const recomputedSelectedEventIds = selectTopEvents(recomputedEvents, {
      previousKeys: new Set(previousNoveltyKeys),
      ...DAILY_SELECTION_POLICY,
    }).map((event) => event.id);
    if (JSON.stringify(recomputedSelectedEventIds) !== JSON.stringify(evidence.selectedEventIds)) {
      throw new Error("evidence.json selectedEventIds do not match deterministic selection");
    }
    const records = new Map(evidence.records.map((record) => [record.id, record]));
    const events = new Map(evidence.events.map((event) => [event.id, event]));
    const selectedIds = new Set(evidence.selectedEventIds);
    if (digest) {
      const digestIds = new Set(digest.developments.map((development) => development.event_id));
      if (
        digestIds.size !== selectedIds.size ||
        [...selectedIds].some((eventId) => !digestIds.has(eventId))
      ) {
        throw new Error("digest.json events do not exactly match evidence.json selectedEventIds");
      }
    }
    for (const eventId of evidence.selectedEventIds) {
      const event = events.get(eventId);
      if (
        !event ||
        typeof event.primarySourceId !== "string" ||
        !Array.isArray(event.sourceIds) ||
        event.sourceIds.length === 0 ||
        !event.sourceIds.includes(event.primarySourceId)
      ) {
        throw new Error(`selected event ${eventId} is missing sourceIds`);
      }
      const sources = event.sourceIds
        .map((sourceId) => records.get(sourceId))
        .filter(Boolean) as EvidenceRecordShape[];
      if (sources.length !== event.sourceIds.length)
        throw new Error(`selected event ${eventId} references an unknown source`);
      const primarySource = records.get(event.primarySourceId);
      if (
        !primarySource ||
        (primarySource.authority !== "primary" && primarySource.authority !== "primary-community")
      ) {
        throw new Error(`selected event ${eventId} lacks a primary-authority source`);
      }
      if (!CURRENT_FRESHNESS.has(primarySource.freshness) || primarySource.visibility === "metadata_only") {
        throw new Error(`selected event ${eventId} lacks current non-metadata evidence`);
      }

      const development = digest?.developments.find((candidate) => candidate.event_id === eventId);
      if (development) {
        if (development.source_ids.some((sourceId) => !event.sourceIds.includes(sourceId))) {
          throw new Error(`digest development ${eventId} references evidence outside its event`);
        }
        const resolvedSelectedSources = development.source_ids.map((sourceId) => records.get(sourceId));
        if (resolvedSelectedSources.some((source) => !source)) {
          throw new Error(`digest development ${eventId} references an unknown source`);
        }
        const selectedSources = resolvedSelectedSources as EvidenceRecordShape[];
        if (
          !selectedSources.some(
            (source) =>
              (source.authority === "primary" || source.authority === "primary-community") &&
              CURRENT_FRESHNESS.has(source.freshness) &&
              source.visibility !== "metadata_only",
          )
        ) {
          throw new Error(`digest development ${eventId} omits primary authority evidence`);
        }
        const section = markdownSectionForEvent(markdown, eventId);
        if (!section) {
          throw new Error(`digest.md is missing event marker ${eventId}`);
        }
        for (const value of [development.title, development.summary, development.why_it_matters]) {
          if (!section.includes(value))
            throw new Error(`digest.md content does not match digest.json for ${eventId}`);
        }
        for (const source of selectedSources) {
          const evidenceDate = evidenceDateForDisplay(source as EvidenceRecord);
          if (
            !section.includes(`[${source.sourceName}]`) ||
            !section.includes(`(${source.url})`) ||
            !section.includes(evidenceDate)
          ) {
            throw new Error(`digest.md is missing evidence URL for ${source.id}`);
          }
        }
      }
    }
    if (digest) {
      const selectedEvents = evidence.selectedEventIds.map((eventId) => events.get(eventId));
      if (selectedEvents.some((event) => !event)) {
        throw new Error("evidence.json selectedEventIds contains an unknown event");
      }
      const recomputed = validateSynthesis(
        { developments: digest.developments },
        selectedEvents as unknown as EventCandidate[],
        evidence.records as unknown as EvidenceRecord[],
      );
      if (!recomputed.passed) {
        throw new Error(`independent semantic validation failed: ${recomputed.violations.join("; ")}`);
      }
      const expectedMarkdown = renderChineseDigest(
        date,
        digest.developments,
        selectedEvents as unknown as EventCandidate[],
        evidence.records as unknown as EvidenceRecord[],
      );
      if (markdown !== expectedMarkdown) {
        throw new Error("digest.md does not match the deterministic renderer");
      }
      if (
        quality &&
        (quality.eligibleEventCount !== recomputed.eligibleEventCount ||
          quality.developmentCount !== recomputed.developmentCount ||
          quality.duplicateRatio !== recomputed.duplicateRatio)
      ) {
        throw new Error("quality-report.json does not match independently recomputed quality");
      }
    }
  } catch (error) {
    errors.push(String(error));
  }

  try {
    const manifest = parseRequiredJson<ManifestShape>(root, "manifest.json");
    if (!Number.isFinite(Date.parse(manifest.generated)) || !Array.isArray(manifest.dates)) {
      throw new Error("manifest.json has an invalid schema");
    }
    const matchingEntries = manifest.dates.filter((candidate) => candidate.date === date);
    if (matchingEntries.length !== 1) throw new Error(`manifest.json must contain ${date} exactly once`);
    const entry = matchingEntries[0]!;
    if (entry.reports.length !== 1 || entry.reports[0] !== DAILY_REPORT) {
      throw new Error(`manifest.json must expose only ${date}/${DAILY_REPORT} for evidence-first dates`);
    }
  } catch (error) {
    errors.push(String(error));
  }

  try {
    const feed = readRequired(root, "feed.xml");
    const currentDateReports = new Set(
      [
        ...feed.matchAll(
          new RegExp(`<(?:link|guid)(?:\\s[^>]*)?>\\s*[^<]*#${date}/([a-z0-9-]+)\\s*</(?:link|guid)>`, "g"),
        ),
      ].map((match) => match[1]!),
    );
    if (!currentDateReports.has(DAILY_REPORT)) throw new Error(`feed.xml is missing ${date}/${DAILY_REPORT}`);
    if ([...currentDateReports].some((report) => report !== DAILY_REPORT)) {
      throw new Error("feed.xml exposes legacy per-source reports for an evidence-first date");
    }
    const matchingItems = (feed.match(/<item>[\s\S]*?<\/item>/gu) ?? []).filter((item) =>
      new RegExp(`#${date}/${DAILY_REPORT}(?:\\s|<)`, "u").test(item),
    );
    if (matchingItems.length !== 1) {
      throw new Error(`feed.xml must contain exactly one item for ${date}/${DAILY_REPORT}`);
    }
    const expectedContent = feedContentFromMarkdown(markdown);
    const item = matchingItems[0]!;
    if (
      !item.includes(`<description>${expectedContent.summary}</description>`) ||
      !item.includes(`<content:encoded>${expectedContent.fullHtml}</content:encoded>`)
    ) {
      throw new Error("feed.xml content does not match digest.md");
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
