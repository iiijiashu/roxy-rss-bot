import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  DAILY_SELECTION_POLICY,
  groupEvidence,
  renderChineseDigest,
  selectTopEvents,
  validateSynthesis,
  type EvidenceRecord,
} from "../evidence.ts";
import { validatePublication } from "../validate-publication.ts";
import { feedContentFromMarkdown } from "../generate-manifest.ts";
import { synthesisStructureSha256 } from "../evaluation-hash.ts";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

function writeJson(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function fixture(count = 10, status: "ok" | "degraded" = "degraded"): { root: string; date: string } {
  const date = "2026-08-29";
  const observedAt = "2026-08-29T08:00:00.000Z";
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "roxy-publication-"));
  roots.push(root);
  const digestDir = path.join(root, "digests", date);
  fs.mkdirSync(digestDir, { recursive: true });
  const labels = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
    "Iota",
    "Kappa",
    "Lambda",
    "Mu",
    "Nu",
    "Xi",
    "Omicron",
    "Pi",
    "Rho",
    "Sigma",
    "Tau",
    "Upsilon",
    "Phi",
  ];
  const topics = [
    "模型接口发布",
    "智能体编排改进",
    "缓存机制更新",
    "推理服务优化",
    "上下文路由调整",
    "开发工具上线",
    "安全修复公告",
    "评测框架开放",
    "数据管道重构",
    "内存管理增强",
    "插件系统更新",
    "检索流程改进",
    "代码代理升级",
    "并发控制修复",
    "部署接口调整",
    "观测能力增强",
    "沙箱边界收紧",
    "多模态处理更新",
    "任务调度优化",
    "错误恢复改进",
    "协议兼容修复",
  ];

  const records: EvidenceRecord[] = Array.from({ length: count }, (_, index) => ({
    id: `S${index}`,
    sourceType: "official_web",
    sourceName: `官方来源 ${index}`,
    authority: "primary",
    url: `https://example.test/release-${index}`,
    title: `${labels[index]} official release`,
    content: `${labels[index]} provides a verified agent API release. ${topics[index]}`,
    category: "tool",
    freshness: "newly_published",
    visibility: "full_text",
    confidence: 0.99,
    observedAt,
    publishedAt: "2026-08-29T01:00:00.000Z",
  }));
  const events = groupEvidence(records);
  const selected = selectTopEvents(events, { maxEvents: count });
  const developments = selected.map((event) => {
    const record = records.find((candidate) => candidate.id === event.primarySourceId)!;
    const label = record.title.split(" ")[0]!;
    const topic = topics[Number(record.id.slice(1))]!;
    return {
      event_id: event.id,
      title: `${label} ${topic}`,
      summary: "官方材料确认了这项新的技术变化。",
      why_it_matters: `这会影响开发者在${topic}中的接口选择与工程实现。`,
      source_ids: [event.primarySourceId],
    };
  });
  const quality = validateSynthesis({ developments }, selected, records);
  fs.writeFileSync(
    path.join(digestDir, "digest.md"),
    renderChineseDigest(date, developments, selected, records),
  );
  writeJson(path.join(digestDir, "digest.json"), {
    schemaVersion: 1,
    date,
    observedAt,
    developments,
  });
  const evidencePath = path.join(digestDir, "evidence.json");
  writeJson(evidencePath, {
    schemaVersion: 2,
    observedAt,
    records,
    events,
    selectedEventIds: selected.map((event) => event.id),
    selection: {
      previousNoveltyKeys: [],
      policy: DAILY_SELECTION_POLICY,
    },
  });
  writeJson(path.join(digestDir, "quality-report.json"), quality);
  writeJson(path.join(digestDir, "run-status.json"), {
    schemaVersion: 1,
    date,
    status,
    components: status === "degraded" ? [{ component: "source/optional", state: "degraded" }] : [],
  });
  writeJson(path.join(digestDir, "llm-diagnostics.json"), {
    provider: "agnes",
    requests: 1,
    retryRequests: 0,
    tasksResolved: 1,
    tasksRetried: 0,
    tasksFailed: 0,
    errors: {},
  });
  writeJson(path.join(digestDir, "evaluation-report.json"), {
    schemaVersion: 3,
    date,
    evidenceSha256: crypto.createHash("sha256").update(fs.readFileSync(evidencePath)).digest("hex"),
    runDelayMs: 0,
    targetCleanRuns: 3,
    maxReplacementRuns: 2,
    runsExecuted: 3,
    cleanRunsCollected: 3,
    replacementsUsed: 0,
    passRate: 1,
    passed: true,
    acceptance: {
      selectionIdentical: true,
      selectionCountInRange: true,
      requiredProvider: "agnes",
      providerMatched: true,
      outputsIdentical: false,
      structureIdentical: true,
      cleanRuns: true,
      acceptableRuns: true,
      recoveredRuns: 0,
      firstPassRuns: 3,
      normalizedRuns: 0,
      boundedQualityRepairs: true,
      boundedSynthesisAttempts: true,
      atLeastOneFirstPass: true,
      totalQualityRepairAttempts: 0,
      health: "healthy",
    },
    selection: {
      originalCount: count,
      recomputedCount: count,
      identical: true,
      addedEventIds: [],
      removedEventIds: [],
    },
    runs: Array.from({ length: 3 }, (_, index) => ({
      run: index + 1,
      qualityPassed: true,
      firstPass: true,
      qualityRepairAttempts: 0,
      providerClean: true,
      providerRecovered: false,
      passed: true,
      countedForAcceptance: true,
      structureSha256: synthesisStructureSha256({ developments }),
      developmentCount: count,
      attempts: [{ chunk: 1, attempt: 1, state: "ok" }],
      failedChecks: [],
      deterministicNormalizations: [],
      diagnostics: {
        provider: "agnes",
        diagnosticsAvailable: true,
        diagnosticsValid: true,
        requests: 1,
        retryRequests: 0,
        tasksResolved: 1,
        tasksRetried: 0,
        tasksFailed: 0,
        errors: {},
      },
    })),
  });
  writeJson(path.join(digestDir, "highlights.json"), {
    schemaVersion: 1,
    date,
    zh: { digest: developments.slice(0, 5).map((development) => development.title) },
    en: {},
  });
  writeJson(path.join(root, "manifest.json"), {
    generated: `${date}T00:00:00.000Z`,
    dates: [{ date, reports: ["digest"] }],
  });
  const feedContent = feedContentFromMarkdown(fs.readFileSync(path.join(digestDir, "digest.md"), "utf-8"));
  fs.writeFileSync(
    path.join(root, "feed.xml"),
    `<item><link>https://example.test/#${date}/digest</link><description>${feedContent.summary}</description><content:encoded>${feedContent.fullHtml}</content:encoded></item>\n`,
  );
  return { root, date };
}

describe("validatePublication", () => {
  it("accepts a fact-valid publication with partial source degradation", () => {
    const { root, date } = fixture(10, "degraded");
    expect(validatePublication(date, root)).toEqual({
      date,
      status: "degraded",
      coreReports: ["digest"],
      highlightLanguages: ["zh"],
    });
  });

  it("rejects credential-shaped text anywhere under the publishable digests directory", () => {
    const { root, date } = fixture();
    const credential = `sk-${"A1_b".repeat(8)}`;
    writeJson(path.join(root, "digests", date, "input-state.json"), {
      externalContent: `untrusted example ${credential}`,
    });

    expect(() => validatePublication(date, root)).toThrow(
      "credential-shaped text remains in publishable digests",
    );
  });

  it("rejects fewer than ten developments instead of padding a weak digest", () => {
    const { root, date } = fixture(9);
    expect(() => validatePublication(date, root)).toThrow("developmentCount must be within 10..20");
  });

  it.each([
    "digest.json",
    "highlights.json",
    "evidence.json",
    "quality-report.json",
    "run-status.json",
    "llm-diagnostics.json",
    "evaluation-report.json",
  ])("rejects a missing %s artifact", (fileName) => {
    const { root, date } = fixture();
    fs.rmSync(path.join(root, "digests", date, fileName));
    expect(() => validatePublication(date, root)).toThrow("missing required file");
  });

  it("rejects an evaluation report for a different evidence snapshot", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{ evidenceSha256: string }>(filePath);
    report.evidenceSha256 = "0".repeat(64);
    writeJson(filePath, report);
    expect(() => validatePublication(date, root)).toThrow("does not match evidence.json");
  });

  it("rejects fewer than three counted clean evaluation runs", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      targetCleanRuns: number;
      runsExecuted: number;
      cleanRunsCollected: number;
      passRate: number;
      runs: unknown[];
    }>(filePath);
    report.targetCleanRuns = 1;
    report.runsExecuted = 1;
    report.cleanRunsCollected = 1;
    report.passRate = 1;
    report.runs = report.runs.slice(0, 1);
    writeJson(filePath, report);
    expect(() => validatePublication(date, root)).toThrow("exactly 3 counted clean runs");
  });

  it("accepts two strictly classified provider replacements around three clean runs", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      runsExecuted: number;
      replacementsUsed: number;
      acceptance: { recoveredRuns: number };
      runs: Array<Record<string, unknown>>;
    }>(filePath);
    const clean = report.runs;
    report.runs = [
      {
        ...clean[0],
        run: 1,
        qualityPassed: false,
        providerClean: false,
        providerRecovered: false,
        firstPass: false,
        passed: false,
        countedForAcceptance: false,
        replacementReason: "empty_response",
        code: "empty_response",
        developmentCount: 0,
        attempts: [
          {
            chunk: 1,
            attempt: 1,
            state: "degraded",
            reason: "request_or_parse_failed",
            code: "empty_response",
          },
        ],
        diagnostics: {
          provider: "agnes",
          diagnosticsAvailable: true,
          diagnosticsValid: true,
          requests: 1,
          retryRequests: 0,
          tasksResolved: 0,
          tasksRetried: 0,
          tasksFailed: 1,
          errors: { empty_response: 1 },
        },
      },
      { ...clean[0], run: 2 },
      {
        ...clean[1],
        run: 3,
        providerClean: false,
        providerRecovered: true,
        firstPass: false,
        countedForAcceptance: false,
        replacementReason: "provider_recovered",
        attempts: [
          {
            chunk: 1,
            attempt: 1,
            state: "degraded",
            reason: "request_or_parse_failed",
            code: "output_limit",
          },
          { chunk: 1, attempt: 2, state: "ok" },
        ],
        diagnostics: {
          provider: "agnes",
          diagnosticsAvailable: true,
          diagnosticsValid: true,
          requests: 2,
          retryRequests: 0,
          tasksResolved: 1,
          tasksRetried: 0,
          tasksFailed: 1,
          errors: { output_limit: 1 },
        },
      },
      { ...clean[1], run: 4 },
      { ...clean[2], run: 5 },
    ];
    report.runsExecuted = 5;
    report.replacementsUsed = 2;
    report.acceptance.recoveredRuns = 1;
    (report.acceptance as Record<string, unknown>)["health"] = "degraded";
    writeJson(filePath, report);

    expect(validatePublication(date, root).coreReports).toEqual(["digest"]);
  });

  it("rejects an unclassified or forged replacement run", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      runsExecuted: number;
      replacementsUsed: number;
      runs: Array<Record<string, unknown>>;
    }>(filePath);
    report.runs = [
      {
        ...report.runs[0],
        run: 1,
        countedForAcceptance: false,
        replacementReason: "unknown_failure",
      },
      { ...report.runs[0], run: 2 },
      { ...report.runs[1], run: 3 },
      { ...report.runs[2], run: 4 },
    ];
    report.runsExecuted = 4;
    report.replacementsUsed = 1;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("strictly classified replacement runs");
  });

  it("rejects a recoverable replacement whose provider diagnostics do not reconcile", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      runsExecuted: number;
      replacementsUsed: number;
      runs: Array<Record<string, unknown>>;
    }>(filePath);
    report.runs = [
      {
        ...report.runs[0],
        run: 1,
        qualityPassed: false,
        providerClean: false,
        providerRecovered: false,
        passed: false,
        countedForAcceptance: false,
        replacementReason: "empty_response",
        code: "empty_response",
        developmentCount: 0,
        attempts: [
          {
            chunk: 1,
            attempt: 1,
            state: "degraded",
            reason: "request_or_parse_failed",
            code: "empty_response",
          },
        ],
      },
      { ...report.runs[0], run: 2 },
      { ...report.runs[1], run: 3 },
      { ...report.runs[2], run: 4 },
    ];
    report.runsExecuted = 4;
    report.replacementsUsed = 1;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("strictly classified replacement runs");
  });

  it("recomputes the bounded-attempt gate instead of trusting its aggregate flag", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      runs: Array<{
        attempts: unknown[];
        diagnostics: { requests: number; tasksResolved: number };
      }>;
    }>(filePath);
    report.runs[0]!.attempts = Array.from({ length: 25 }, (_, index) => ({
      chunk: index + 1,
      attempt: 1,
      state: "ok",
    }));
    report.runs[0]!.diagnostics.requests = 25;
    report.runs[0]!.diagnostics.tasksResolved = 25;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("production acceptance policy");
  });

  it("rejects a formal evaluation without any first-pass clean run", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      acceptance: { firstPassRuns: number; atLeastOneFirstPass: boolean };
      runs: Array<{ firstPass: boolean }>;
    }>(filePath);
    report.runs.forEach((run) => {
      run.firstPass = false;
    });
    report.acceptance.firstPassRuns = 0;
    report.acceptance.atLeastOneFirstPass = false;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("production acceptance policy");
  });

  it("rejects a report that marks stored-answer replacement as first-pass", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      runs: Array<{
        attempts: Array<{ state: string; normalizationsApplied?: string[] }>;
      }>;
    }>(filePath);
    const firstOkAttempt = report.runs[0]!.attempts.find((attempt) => attempt.state === "ok");
    expect(firstOkAttempt).toBeDefined();
    firstOkAttempt!.normalizationsApplied = ["0:canonical_fields"];
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("stored-answer normalization");
  });

  it("rejects an ok attempt that also claims a quality-gate failure", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      acceptance: { totalQualityRepairAttempts: number };
      runs: Array<{
        qualityRepairAttempts: number;
        attempts: Array<{ state: string; reason?: string }>;
      }>;
    }>(filePath);
    report.runs[0]!.attempts[0]!.reason = "quality_gate_failed";
    report.runs[0]!.qualityRepairAttempts = 1;
    report.acceptance.totalQualityRepairAttempts = 1;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("strictly classified evaluation attempts");
  });

  it("rejects a counted clean run that contains a provider-failure attempt", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      acceptance: { firstPassRuns: number };
      runs: Array<{
        firstPass: boolean;
        attempts: Array<{ state: string; reason?: string; code?: string }>;
      }>;
    }>(filePath);
    const attempt = report.runs[0]!.attempts[0]!;
    attempt.state = "degraded";
    attempt.reason = "request_or_parse_failed";
    attempt.code = "transport";
    report.runs[0]!.firstPass = false;
    report.acceptance.firstPassRuns = 2;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("strictly classified replacement runs");
  });

  it("recomputes punctuation normalization aggregates from attempts", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      acceptance: {
        firstPassRuns: number;
        normalizedRuns: number;
        totalQualityRepairAttempts: number;
      };
      runs: Array<{
        firstPass: boolean;
        qualityRepairAttempts: number;
        deterministicNormalizations: string[];
        attempts: Array<{ state: string; normalizationsApplied?: string[] }>;
      }>;
    }>(filePath);
    report.runs[0]!.attempts[0]!.normalizationsApplied = ["0:summary_punctuation"];
    report.runs[0]!.firstPass = false;
    report.runs[0]!.qualityRepairAttempts = 1;
    report.acceptance.firstPassRuns = 2;
    report.acceptance.totalQualityRepairAttempts = 1;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("normalization aggregates");

    report.runs[0]!.deterministicNormalizations = ["0:summary_punctuation"];
    report.acceptance.normalizedRuns = 1;
    writeJson(filePath, report);
    expect(() => validatePublication(date, root)).not.toThrow();
  });

  it("accepts evaluator-compatible deduplicated and sorted normalization aggregates", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      acceptance: {
        firstPassRuns: number;
        normalizedRuns: number;
        totalQualityRepairAttempts: number;
      };
      runs: Array<{
        firstPass: boolean;
        qualityRepairAttempts: number;
        deterministicNormalizations: string[];
        attempts: Array<Record<string, unknown>>;
        diagnostics: { requests: number; tasksResolved: number };
      }>;
    }>(filePath);
    report.runs[0]!.attempts = [
      {
        chunk: 1,
        attempt: 1,
        state: "degraded",
        reason: "quality_gate_failed",
        normalizationsApplied: ["2:summary_punctuation"],
      },
      {
        chunk: 1,
        attempt: 2,
        state: "ok",
        normalizationsApplied: ["10:summary_punctuation", "2:summary_punctuation"],
      },
    ];
    report.runs[0]!.firstPass = false;
    report.runs[0]!.qualityRepairAttempts = 2;
    report.runs[0]!.deterministicNormalizations = ["10:summary_punctuation", "2:summary_punctuation"];
    report.runs[0]!.diagnostics.requests = 2;
    report.runs[0]!.diagnostics.tasksResolved = 2;
    report.acceptance.firstPassRuns = 2;
    report.acceptance.normalizedRuns = 1;
    report.acceptance.totalQualityRepairAttempts = 2;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).not.toThrow();
  });

  it("recomputes the per-run quality-repair limit instead of trusting the aggregate flag", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{
      acceptance: { boundedQualityRepairs: boolean; totalQualityRepairAttempts: number };
      runs: Array<{
        qualityRepairAttempts: number;
        attempts: Array<Record<string, unknown>>;
        diagnostics: { requests: number; tasksResolved: number };
      }>;
    }>(filePath);
    report.runs[0]!.qualityRepairAttempts = 3;
    report.runs[0]!.attempts = [
      { chunk: 1, attempt: 1, state: "degraded", reason: "quality_gate_failed" },
      { chunk: 1, attempt: 2, state: "degraded", reason: "quality_gate_failed" },
      { chunk: 1, attempt: 3, state: "degraded", reason: "quality_gate_failed" },
      { chunk: 1, attempt: 4, state: "ok" },
    ];
    report.runs[0]!.diagnostics.requests = 4;
    report.runs[0]!.diagnostics.tasksResolved = 4;
    report.acceptance.boundedQualityRepairs = true;
    report.acceptance.totalQualityRepairAttempts = 3;
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("production acceptance policy");
  });

  it("binds the evaluated structure fingerprint to the published digest", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{ runs: Array<{ structureSha256: string }> }>(filePath);
    report.runs.forEach((run) => {
      run.structureSha256 = "b".repeat(64);
    });
    writeJson(filePath, report);

    expect(() => validatePublication(date, root)).toThrow("published digest structure");
  });

  it("rejects an evaluation that did not pin the production provider", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evaluation-report.json");
    const report = readJson<{ acceptance: { requiredProvider: string | null } }>(filePath);
    report.acceptance.requiredProvider = null;
    writeJson(filePath, report);
    expect(() => validatePublication(date, root)).toThrow("must pin the production provider");
  });

  it("rejects a quality report that omits a semantic gate", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "quality-report.json");
    const quality = readJson<{ checks: Array<{ name: string; passed: boolean; detail: string }> }>(filePath);
    quality.checks = quality.checks.filter((check) => check.name !== "unsupported_inference");
    writeJson(filePath, quality);
    expect(() => validatePublication(date, root)).toThrow("missing a required semantic check");
  });

  it("recomputes semantic quality instead of trusting a passing quality-report.json", () => {
    const { root, date } = fixture();
    const digestPath = path.join(root, "digests", date, "digest.json");
    const digest = readJson<{ developments: Array<{ title: string }> }>(digestPath);
    const originalTitle = digest.developments[0]!.title;
    digest.developments[0]!.title = "Alpha 9.9 已验证技术进展";
    writeJson(digestPath, digest);
    const markdownPath = path.join(root, "digests", date, "digest.md");
    fs.writeFileSync(
      markdownPath,
      fs.readFileSync(markdownPath, "utf-8").replace(originalTitle, digest.developments[0]!.title),
    );
    expect(() => validatePublication(date, root)).toThrow("independent semantic validation failed");
  });

  it("recomputes deterministic selection instead of trusting a lower-ranked selected set", () => {
    const { root, date } = fixture(21);
    const filePath = path.join(root, "digests", date, "evidence.json");
    const evidence = readJson<{
      events: Array<{ id: string }>;
      selectedEventIds: string[];
    }>(filePath);
    const unselected = evidence.events.find((event) => !evidence.selectedEventIds.includes(event.id));
    expect(unselected).toBeDefined();
    evidence.selectedEventIds[evidence.selectedEventIds.length - 1] = unselected!.id;
    writeJson(filePath, evidence);
    expect(() => validatePublication(date, root)).toThrow("do not match deterministic selection");
  });

  it("rejects a selected event already present in the persisted novelty snapshot", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evidence.json");
    const evidence = readJson<{
      events: Array<{ noveltyKey: string }>;
      selection: { previousNoveltyKeys: string[] };
    }>(filePath);
    evidence.selection.previousNoveltyKeys = [evidence.events[0]!.noveltyKey];
    writeJson(filePath, evidence);
    expect(() => validatePublication(date, root)).toThrow("do not match deterministic selection");
  });

  it("rejects a selected event without primary-authority evidence", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evidence.json");
    const evidence = readJson<{ records: Array<{ id: string; authority: string }> }>(filePath);
    evidence.records[0]!.authority = "secondary";
    writeJson(filePath, evidence);
    expect(() => validatePublication(date, root)).toThrow("deterministic grouping and scoring");
  });

  it("rejects digest source IDs that do not resolve inside the selected event", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "digest.json");
    const digest = readJson<{ developments: Array<{ source_ids: string[] }> }>(filePath);
    digest.developments[0]!.source_ids = ["S1"];
    writeJson(filePath, digest);
    expect(() => validatePublication(date, root)).toThrow("references evidence outside its event");
  });

  it("rejects Markdown that omits a selected evidence URL", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "digest.md");
    fs.writeFileSync(
      filePath,
      fs.readFileSync(filePath, "utf-8").replace("(https://example.test/release-0)", ""),
    );
    expect(() => validatePublication(date, root)).toThrow("digest.md is missing evidence URL");
  });

  it("rejects Markdown content copied under the wrong event marker", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "digest.md");
    const markdown = fs.readFileSync(filePath, "utf-8");
    fs.writeFileSync(
      filePath,
      markdown.replace("官方材料确认了这项新的技术变化。", "这段内容与结构化摘要不一致。"),
    );
    expect(() => validatePublication(date, root)).toThrow("content does not match digest.json");
  });

  it("rejects extra Markdown that was not produced by the deterministic renderer", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "digest.md");
    fs.appendFileSync(filePath, "\n未经结构化产物支持的附加内容。\n");
    expect(() => validatePublication(date, root)).toThrow("does not match the deterministic renderer");
  });

  it("rejects a digest observation outside its China Standard date", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "digest.json");
    const digest = readJson<{ observedAt: string }>(filePath);
    digest.observedAt = "2026-08-28T08:00:00.000Z";
    writeJson(filePath, digest);
    expect(() => validatePublication(date, root)).toThrow("does not fall within its China Standard date");
  });

  it("rejects evidence observed after the digest boundary", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evidence.json");
    const evidence = readJson<{ records: Array<{ observedAt: string }> }>(filePath);
    evidence.records[0]!.observedAt = "2026-08-29T09:00:00.000Z";
    writeJson(filePath, evidence);
    expect(() => validatePublication(date, root)).toThrow("was observed after the digest");
  });

  it("rejects old material labeled as newly published", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "digests", date, "evidence.json");
    const evidence = readJson<{ records: Array<{ publishedAt: string }> }>(filePath);
    evidence.records[0]!.publishedAt = "2026-08-20T01:00:00.000Z";
    writeJson(filePath, evidence);
    expect(() => validatePublication(date, root)).toThrow("stale or missing newly_published evidence");
  });

  it("rejects a manifest that exposes legacy reports for an evidence-first date", () => {
    const { root, date } = fixture();
    writeJson(path.join(root, "manifest.json"), {
      generated: `${date}T00:00:00.000Z`,
      dates: [{ date, reports: ["ai-cli"] }],
    });
    expect(() => validatePublication(date, root)).toThrow(/must expose only|missing .*digest/);
  });

  it("rejects duplicate manifest entries for the evidence-first date", () => {
    const { root, date } = fixture();
    writeJson(path.join(root, "manifest.json"), {
      generated: `${date}T00:00:00.000Z`,
      dates: [
        { date, reports: ["digest"] },
        { date, reports: ["ai-hn"] },
      ],
    });
    expect(() => validatePublication(date, root)).toThrow(`must contain ${date} exactly once`);
  });

  it("rejects any legacy report in the feed for an evidence-first date", () => {
    const { root, date } = fixture();
    fs.writeFileSync(
      path.join(root, "feed.xml"),
      `<link>https://example.test/#${date}/digest</link>\n<link>https://example.test/#${date}/ai-hn</link>\n`,
    );
    expect(() => validatePublication(date, root)).toThrow("feed.xml exposes legacy per-source reports");
  });

  it("rejects a feed item whose body silently degraded to its title", () => {
    const { root, date } = fixture();
    const filePath = path.join(root, "feed.xml");
    const feed = fs.readFileSync(filePath, "utf-8");
    fs.writeFileSync(
      filePath,
      feed.replace(
        /<content:encoded>[\s\S]*?<\/content:encoded>/u,
        "<content:encoded><![CDATA[Roxy AI Daily]]></content:encoded>",
      ),
    );
    expect(() => validatePublication(date, root)).toThrow("feed.xml content does not match digest.md");
  });
});
