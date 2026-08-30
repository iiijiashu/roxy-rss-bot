import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { DAILY_SELECTION_POLICY, groupEvidence, selectTopEvents, type EvidenceRecord } from "../evidence.ts";
import { evaluateDailyReplay, parseEvaluationArgs, type DailyEvaluationReport } from "../evaluate-daily.ts";
import type { LlmProvider } from "../providers/index.ts";

const DATE = "2026-08-30";
const roots: string[] = [];
const FEATURES = [
  "星桥接口",
  "月尘缓存",
  "向量检索",
  "编排协议",
  "延迟分析",
  "上下文路由",
  "工具网关",
  "任务队列",
  "状态存储",
  "调用追踪",
];

function record(index = 1): EvidenceRecord {
  const product = `ExampleModel${index}`;
  return {
    id: `S${index}`,
    sourceType: "official_web",
    sourceName: "Example Official",
    authority: "primary",
    url: `https://example.com/model-release-${index}`,
    title: `Introducing ${product}`,
    publishedAt: "2026-08-30T00:00:00.000Z",
    observedAt: "2026-08-30T01:00:00.000Z",
    content: `${product} adds a new agent API and lowers inference latency. ${FEATURES[index - 1]}`,
    category: "model",
    freshness: "newly_published",
    visibility: "full_text",
    confidence: 0.98,
  };
}

function fixture(
  originalSelection?: string[],
  recordCount = 10,
  customRecords?: EvidenceRecord[],
): {
  rootDir: string;
  eventIds: string[];
  reportPath: string;
} {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-replay-test-"));
  roots.push(rootDir);
  const records = customRecords ?? Array.from({ length: recordCount }, (_, index) => record(index + 1));
  const events = groupEvidence(records);
  const selectedEventIds = selectTopEvents(events, {
    previousKeys: new Set(),
    ...DAILY_SELECTION_POLICY,
  }).map((event) => event.id);
  const digestDir = path.join(rootDir, "digests", DATE);
  fs.mkdirSync(digestDir, { recursive: true });
  fs.writeFileSync(
    path.join(digestDir, "evidence.json"),
    `${JSON.stringify(
      {
        schemaVersion: 2,
        observedAt: "2026-08-30T01:00:00.000Z",
        records,
        events,
        selectedEventIds: originalSelection ?? selectedEventIds,
        selection: { previousNoveltyKeys: [], policy: DAILY_SELECTION_POLICY },
      },
      null,
      2,
    )}\n`,
    "utf-8",
  );
  return {
    rootDir,
    eventIds: selectedEventIds,
    reportPath: path.join(digestDir, "evaluation-report.json"),
  };
}

function successfulProvider(name = "test", reason = "工程接入方式"): LlmProvider {
  let requests = 0;
  return {
    name,
    async call(prompt) {
      requests++;
      const payload = JSON.parse(prompt.match(/EVENTS:\n(\[[^\n]+\])/u)?.[1] ?? "[]") as Array<{
        event_id: string;
        evidence: Array<{ title: string }>;
      }>;
      return JSON.stringify({
        developments: payload.map((event) => {
          const product = event.evidence[0]!.title.replace("Introducing ", "");
          const productIndex = Number(product.replace("ExampleModel", "")) - 1;
          const feature = FEATURES[productIndex]!;
          return {
            event_id: event.event_id,
            title: `${product} 推出${feature}`,
            summary: `${product} 新增${feature}，并降低推理延迟。`,
            why_it_matters: `${feature}会改变该产品的${reason}。`,
          };
        }),
      });
    },
    getDiagnostics: () => ({
      provider: name,
      requests,
      retryRequests: 0,
      tasksResolved: requests,
      tasksRetried: 0,
      tasksFailed: 0,
      errors: {},
    }),
  };
}

function qualityRecoveringProvider(qualityFailures: number, name = "agnes"): LlmProvider {
  const base = successfulProvider(name);
  let requests = 0;
  let failuresRemaining = qualityFailures;
  return {
    name,
    async call(prompt, maxTokens, options) {
      requests++;
      const raw = await base.call(prompt, maxTokens, options);
      if (failuresRemaining <= 0) return raw;
      failuresRemaining--;
      const parsed = JSON.parse(raw) as { developments: Array<Record<string, string>> };
      parsed.developments[0]!.why_it_matters = "智能体应用的工程接入方式。";
      return JSON.stringify(parsed);
    },
    getDiagnostics: () => ({
      provider: name,
      requests,
      retryRequests: 0,
      tasksResolved: requests,
      tasksRetried: 0,
      tasksFailed: 0,
      errors: {},
    }),
  };
}

afterEach(() => {
  for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

describe("daily frozen-evidence evaluation", () => {
  it("runs every replay with a fresh provider and writes a passing aggregate report", async () => {
    const { rootDir, reportPath } = fixture();
    let providersCreated = 0;

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 3,
      maxReplacementRuns: 2,
      rootDir,
      requiredProvider: "agnes",
      providerFactory: () => {
        providersCreated++;
        return successfulProvider("agnes");
      },
    });

    expect(providersCreated).toBe(3);
    expect(report).toMatchObject({
      schemaVersion: 3,
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
        outputsIdentical: true,
        structureIdentical: true,
        cleanRuns: true,
        acceptableRuns: true,
        recoveredRuns: 0,
        firstPassRuns: 3,
        boundedQualityRepairs: true,
      },
      selection: { identical: true, originalCount: 10, recomputedCount: 10 },
    });
    expect(
      report.runs.every(
        (run) =>
          run.qualityPassed &&
          run.passed &&
          run.countedForAcceptance &&
          run.replacementReason === undefined &&
          run.developmentCount === 10 &&
          /^[a-f0-9]{64}$/u.test(run.structureSha256 ?? "") &&
          /^[a-f0-9]{64}$/u.test(run.outputSha256 ?? ""),
      ),
    ).toBe(true);
    expect(JSON.parse(fs.readFileSync(reportPath, "utf-8")) as DailyEvaluationReport).toEqual(report);
  });

  it("paces formal multi-run evaluations between fresh providers", async () => {
    const { rootDir } = fixture();
    const delays: number[] = [];

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 3,
      runDelayMs: 90_000,
      rootDir,
      providerFactory: () => successfulProvider("agnes"),
      waitForDelay: async (delayMs) => {
        delays.push(delayMs);
      },
    });

    expect(delays).toEqual([90_000, 90_000]);
    expect(report.runDelayMs).toBe(90_000);
    expect(report.passed).toBe(true);
  });

  it("accepts structurally identical quality-passing runs while reporting wording differences", async () => {
    const { rootDir, reportPath } = fixture();
    const reasons = ["工程接入方式", "工程集成方式", "工程维护方式"];
    let providerIndex = 0;

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 3,
      rootDir,
      providerFactory: () => successfulProvider("agnes", reasons[providerIndex++]!),
    });

    expect(report.runs.every((run) => run.qualityPassed)).toBe(true);
    expect(report.acceptance.outputsIdentical).toBe(false);
    expect(report.acceptance.structureIdentical).toBe(true);
    expect(report.passed).toBe(true);
    expect(new Set(report.runs.map((run) => run.outputSha256)).size).toBe(3);
    const persisted = fs.readFileSync(reportPath, "utf-8");
    expect(persisted).not.toContain("工程接入方式");
    expect(persisted).not.toContain("工程集成方式");
    expect(persisted).not.toContain("工程维护方式");
  });

  it("treats JSON object key order as irrelevant when comparing successful outputs", async () => {
    const { rootDir } = fixture();
    let providerIndex = 0;

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 2,
      rootDir,
      providerFactory: () => {
        const provider = successfulProvider("agnes");
        providerIndex++;
        if (providerIndex === 1) return provider;
        return {
          ...provider,
          async call(prompt, maxTokens, options) {
            const parsed = JSON.parse(await provider.call(prompt, maxTokens, options)) as {
              developments: Array<Record<string, string>>;
            };
            return JSON.stringify({
              developments: parsed.developments.map((development) => ({
                why_it_matters: development["why_it_matters"],
                summary: development["summary"],
                title: development["title"],
                event_id: development["event_id"],
              })),
            });
          },
        };
      },
    });

    expect(report.acceptance.outputsIdentical).toBe(true);
    expect(report.passed).toBe(true);
  });

  it("accepts a bounded quality recovery while reporting that it was not first-pass", async () => {
    const { rootDir } = fixture();
    const provider = successfulProvider("agnes");
    let request = 0;
    const recoveringProvider: LlmProvider = {
      ...provider,
      async call(prompt, maxTokens, options) {
        request++;
        if (request === 1) return JSON.stringify({ developments: [] });
        return provider.call(prompt, maxTokens, options);
      },
      getDiagnostics: () => ({
        provider: "agnes",
        requests: request,
        retryRequests: 0,
        tasksResolved: request,
        tasksRetried: 0,
        tasksFailed: 0,
        errors: {},
      }),
    };

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => recoveringProvider,
    });

    expect(report.runs[0]).toMatchObject({
      qualityPassed: true,
      firstPass: false,
      qualityRepairAttempts: 1,
      providerClean: true,
      providerRecovered: false,
      passed: true,
    });
    expect(report.runs[0]!.attempts.some((attempt) => attempt.state === "degraded")).toBe(true);
    expect(report.acceptance).toMatchObject({
      cleanRuns: true,
      acceptableRuns: true,
      recoveredRuns: 0,
      firstPassRuns: 0,
      boundedQualityRepairs: true,
    });
    expect(report.passed).toBe(true);
  });

  it("counts punctuation normalization as a repair instead of first-pass output", async () => {
    const { rootDir } = fixture();
    const baseProvider = successfulProvider("agnes");
    const punctuationProvider: LlmProvider = {
      ...baseProvider,
      async call(prompt, maxTokens, options) {
        const parsed = JSON.parse(await baseProvider.call(prompt, maxTokens, options)) as {
          developments: Array<Record<string, string>>;
        };
        const first = parsed.developments.find((development) =>
          development["title"]?.startsWith("ExampleModel1 "),
        );
        if (first) first["summary"] = first["summary"]!.replace("，", "；");
        return JSON.stringify(parsed);
      },
    };

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => punctuationProvider,
    });

    expect(report.runs[0]).toMatchObject({
      qualityPassed: true,
      firstPass: false,
      qualityRepairAttempts: 1,
      deterministicNormalizations: expect.arrayContaining([
        expect.stringMatching(/^\d+:summary_punctuation$/u),
      ]),
      passed: true,
    });
    expect(report.acceptance).toMatchObject({
      firstPassRuns: 0,
      normalizedRuns: 1,
      totalQualityRepairAttempts: 1,
    });
  });

  it("does not count a quality-valid run that exceeds the formal repair cap", async () => {
    const { rootDir } = fixture();

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => qualityRecoveringProvider(3),
    });

    expect(report.runs[0]).toMatchObject({
      qualityPassed: true,
      qualityRepairAttempts: 3,
      passed: false,
      countedForAcceptance: false,
    });
    expect(report.cleanRunsCollected).toBe(0);
    expect(report.acceptance.boundedQualityRepairs).toBe(false);
    expect(report.passed).toBe(false);
  });

  it("requires at least one first-pass result across a formal three-run evaluation", async () => {
    const { rootDir } = fixture();

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 3,
      rootDir,
      providerFactory: () => qualityRecoveringProvider(1),
    });

    expect(report.cleanRunsCollected).toBe(3);
    expect(report.acceptance.firstPassRuns).toBe(0);
    expect(report.acceptance.boundedQualityRepairs).toBe(true);
    expect(report.passed).toBe(false);
  });

  it("does not silently normalize invalid UI terminology into a clean run", async () => {
    const { rootDir } = fixture();
    const baseProvider = successfulProvider("agnes");
    const normalizingProvider: LlmProvider = {
      ...baseProvider,
      async call(prompt, maxTokens, options) {
        const parsed = JSON.parse(await baseProvider.call(prompt, maxTokens, options)) as {
          developments: Array<Record<string, string>>;
        };
        parsed.developments[0]!.summary = parsed.developments[0]!.summary!.replace("新增", "@mention 支持");
        return JSON.stringify(parsed);
      },
    };

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => normalizingProvider,
    });

    expect(report.runs[0]).toMatchObject({
      passed: false,
      firstPass: false,
      deterministicNormalizations: [],
    });
    expect(report.cleanRunsCollected).toBe(0);
    expect(report.acceptance.normalizedRuns).toBe(0);
  });

  it("does not replace a failed semantic field with a stored canonical answer", async () => {
    const permissionRecord: EvidenceRecord = {
      ...record(1),
      id: "github:openclaw/openclaw:pr:132675:merged",
      sourceType: "github_pr",
      sourceName: "GitHub",
      authority: "primary-community",
      url: "https://github.com/openclaw/openclaw/pull/132675",
      title: "OpenClaw: fix(agents): preserve tightening exec overrides on moded sessions",
      updatedAt: "2026-08-30T00:30:00.000Z",
      content:
        "Per-turn /exec tightening now composes with an existing session permission mode through resolveSessionPermissionExecPolicy and feeds actual agent tool execution.",
      category: "agent",
      freshness: "new_activity",
      visibility: "structured_api",
      metadata: { repo: "openclaw/openclaw", kind: "pr", activity: "merged", state: "closed" },
    };
    const { rootDir } = fixture(undefined, 1, [permissionRecord]);
    let requests = 0;
    const provider: LlmProvider = {
      name: "agnes",
      async call(prompt) {
        requests++;
        const payload = JSON.parse(prompt.match(/EVENTS:\n(\[[^\n]+\])/u)?.[1] ?? "[]") as Array<{
          event_id: string;
        }>;
        return JSON.stringify({
          developments: [
            {
              event_id: payload[0]!.event_id,
              title: "OpenClaw 修复会话命令执行权限收紧",
              summary: "OpenClaw 合并权限策略并解决处理偏差，同时修复与修正命令执行约束。",
              why_it_matters: "这会影响已设置权限模式会话的单轮命令执行约束。",
            },
          ],
        });
      },
      getDiagnostics: () => ({
        provider: "agnes",
        requests,
        retryRequests: 0,
        tasksResolved: requests,
        tasksRetried: 0,
        tasksFailed: 0,
        errors: {},
      }),
    };

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => provider,
    });

    expect(report.runs[0]).toMatchObject({
      qualityPassed: false,
      firstPass: false,
      qualityRepairAttempts: 3,
      deterministicNormalizations: [],
    });
    expect(report.cleanRunsCollected).toBe(0);
    expect(report.acceptance.normalizedRuns).toBe(0);
  });

  it("does not replace an invalid lifecycle field with a stored canonical answer", async () => {
    const issueRecord: EvidenceRecord = {
      ...record(1),
      id: "github:anthropics/claude-code:issue:90602:created",
      sourceType: "github_issue",
      sourceName: "GitHub",
      authority: "primary-community",
      url: "https://github.com/anthropics/claude-code/issues/90602",
      title:
        "Claude Code: Cowork personal GitHub marketplace never updates, clone fails and runtime stays stale",
      content:
        "Reopen this bug, it still exists: https://github.com/anthropics/claude-code/issues/69683. " +
        "Reopen this bug, it still exists. Reopen this bug, it still exists. Is this a regression? No.",
      category: "model",
      freshness: "new_activity",
      visibility: "structured_api",
      metadata: {
        repo: "anthropics/claude-code",
        kind: "issue",
        issue_or_pr_number: 90602,
        activity: "created",
        state: "open",
      },
    };
    const { rootDir } = fixture(undefined, 1, [issueRecord]);
    let requests = 0;
    const provider: LlmProvider = {
      name: "agnes",
      async call(prompt) {
        requests++;
        const payload = JSON.parse(prompt.match(/EVENTS:\n(\[[^\n]+\])/u)?.[1] ?? "[]") as Array<{
          event_id: string;
        }>;
        return JSON.stringify({
          developments: [
            {
              event_id: payload[0]!.event_id,
              title: "用户反馈 Cowork 个人市场无法更新",
              summary: "用户报告 Cowork 个人 GitHub 市场克隆静默失败，运行时仍提供陈旧版本。",
              why_it_matters: "开发者无法获取个人市场的最新插件版本。",
            },
          ],
        });
      },
      getDiagnostics: () => ({
        provider: "agnes",
        requests,
        retryRequests: 0,
        tasksResolved: requests,
        tasksRetried: 0,
        tasksFailed: 0,
        errors: {},
      }),
    };

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => provider,
    });

    expect(report.runs[0]).toMatchObject({
      qualityPassed: false,
      firstPass: false,
      qualityRepairAttempts: 3,
      deterministicNormalizations: [],
    });
    expect(report.cleanRunsCollected).toBe(0);
    expect(report.acceptance.normalizedRuns).toBe(0);
  });

  it("uses a fully reconciled provider recovery as a replacement and still collects a clean run", async () => {
    const { rootDir } = fixture();
    let providersCreated = 0;

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      maxReplacementRuns: 1,
      rootDir,
      requiredProvider: "agnes",
      providerFactory: () => {
        providersCreated++;
        if (providersCreated > 1) return successfulProvider("agnes");
        const baseProvider = successfulProvider("agnes");
        let requests = 0;
        return {
          name: "agnes",
          async call(prompt, maxTokens, options) {
            requests++;
            if (requests === 1) {
              throw Object.assign(new Error("bounded provider failure"), { code: "output_limit" });
            }
            return baseProvider.call(prompt, maxTokens, options);
          },
          getDiagnostics: () => ({
            provider: "agnes",
            requests,
            retryRequests: 0,
            tasksResolved: requests - 1,
            tasksRetried: 0,
            tasksFailed: 1,
            errors: { output_limit: 1 },
          }),
        };
      },
    });

    expect(report.runs[0]).toMatchObject({
      qualityPassed: true,
      providerClean: false,
      providerRecovered: true,
      passed: true,
      countedForAcceptance: false,
      replacementReason: "provider_recovered",
    });
    expect(report.runs[1]).toMatchObject({
      qualityPassed: true,
      providerClean: true,
      providerRecovered: false,
      passed: true,
      countedForAcceptance: true,
    });
    expect(report.acceptance).toMatchObject({
      cleanRuns: true,
      acceptableRuns: true,
      recoveredRuns: 1,
    });
    expect(report).toMatchObject({ runsExecuted: 2, cleanRunsCollected: 1, replacementsUsed: 1 });
    expect(report.passed).toBe(true);
  });

  it("spends one replacement on an empty response but never counts it as clean", async () => {
    const { rootDir } = fixture();
    let providersCreated = 0;
    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      maxReplacementRuns: 1,
      rootDir,
      requiredProvider: "agnes",
      providerFactory: () => {
        providersCreated++;
        if (providersCreated > 1) return successfulProvider("agnes");
        let requests = 0;
        return {
          name: "agnes",
          async call() {
            requests++;
            throw Object.assign(new Error("empty response"), { code: "empty_response" });
          },
          getDiagnostics: () => ({
            provider: "agnes",
            requests,
            retryRequests: 0,
            tasksResolved: 0,
            tasksRetried: 0,
            tasksFailed: requests,
            errors: { empty_response: requests },
          }),
        };
      },
    });

    expect(report.runs[0]).toMatchObject({
      passed: false,
      countedForAcceptance: false,
      replacementReason: "empty_response",
      code: "empty_response",
    });
    expect(report.runs[1]).toMatchObject({ countedForAcceptance: true, providerClean: true });
    expect(report).toMatchObject({
      runsExecuted: 2,
      cleanRunsCollected: 1,
      replacementsUsed: 1,
      passed: true,
    });
  });

  it("stops immediately on a quality failure instead of spending a replacement", async () => {
    const { rootDir } = fixture();
    let requests = 0;
    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      maxReplacementRuns: 2,
      rootDir,
      providerFactory: () => ({
        name: "agnes",
        async call() {
          requests++;
          return JSON.stringify({ developments: [] });
        },
        getDiagnostics: () => ({
          provider: "agnes",
          requests,
          retryRequests: 0,
          tasksResolved: requests,
          tasksRetried: 0,
          tasksFailed: 0,
          errors: {},
        }),
      }),
    });

    expect(report.runsExecuted).toBe(1);
    expect(report.replacementsUsed).toBe(0);
    expect(report.cleanRunsCollected).toBe(0);
    expect(report.runs[0]).toMatchObject({ countedForAcceptance: false });
    expect(report.runs[0]!.replacementReason).toBeUndefined();
    expect(report.passed).toBe(false);
  });

  it.each([
    ["retry request", { retryRequests: 1 }],
    ["retried task", { tasksRetried: 1 }],
    ["failed task", { tasksFailed: 1 }],
    ["diagnostic error", { errors: { upstream_timeout: 1 } }],
    ["inconsistent request counters", { requests: 0, tasksResolved: 0 }],
    ["invalid diagnostic error key", { errors: { "UPSTREAM TIMEOUT": 1 } }],
  ])("rejects a quality-valid run with provider diagnostics reporting %s", async (_label, overrides) => {
    const { rootDir } = fixture();
    const provider = successfulProvider("agnes");
    const getBaseDiagnostics = provider.getDiagnostics!;
    provider.getDiagnostics = () => ({ ...getBaseDiagnostics(), ...overrides });

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => provider,
    });

    expect(report.runs[0]).toMatchObject({ qualityPassed: true, passed: false });
    expect(report.acceptance.cleanRuns).toBe(false);
    expect(report.passed).toBe(false);
  });

  it("continues later runs after a failure and never persists the provider error text", async () => {
    const { rootDir, reportPath } = fixture();
    let providerIndex = 0;
    const secretSentinel = "PRIVATE_PROVIDER_OUTPUT_MUST_NOT_PERSIST";

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 2,
      rootDir,
      providerFactory: () => {
        providerIndex++;
        if (providerIndex === 2) return successfulProvider();
        return {
          name: "failing-test",
          call: async () => {
            throw new Error(secretSentinel);
          },
        };
      },
    });

    expect(report).toMatchObject({ runsExecuted: 1, cleanRunsCollected: 0, passRate: 0, passed: false });
    expect(report.runs.map((run) => run.passed)).toEqual([false]);
    expect(fs.readFileSync(reportPath, "utf-8")).not.toContain(secretSentinel);
  });

  it("recomputes selection from records instead of trusting stale selected event IDs", async () => {
    const staleId = "event:0000000000000000";
    const { rootDir, eventIds } = fixture([staleId]);

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => successfulProvider(),
    });

    expect(report.passed).toBe(false);
    expect(report.acceptance.selectionIdentical).toBe(false);
    expect(report.selection).toEqual({
      originalCount: 1,
      recomputedCount: 10,
      identical: false,
      addedEventIds: eventIds,
      removedEventIds: [staleId],
    });
  });

  it("fails the aggregate gate when fewer than ten events are selectable", async () => {
    const { rootDir } = fixture(undefined, 9);

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      providerFactory: () => successfulProvider(),
    });

    expect(report.cleanRunsCollected).toBe(1);
    expect(report.passed).toBe(false);
    expect(report.acceptance.selectionCountInRange).toBe(false);
  });

  it("fails formal Agnes acceptance when the actual provider is not Agnes", async () => {
    const { rootDir } = fixture();

    const report = await evaluateDailyReplay({
      date: DATE,
      runs: 1,
      rootDir,
      requiredProvider: "agnes",
      providerFactory: () => successfulProvider("openai"),
    });

    expect(report.cleanRunsCollected).toBe(0);
    expect(report.passed).toBe(false);
    expect(report.acceptance).toMatchObject({ requiredProvider: "agnes", providerMatched: false });
  });

  it("rejects unsafe dates and unbounded run counts", () => {
    expect(() => parseEvaluationArgs(["../secrets", "--runs", "3"])).toThrow(/valid YYYY-MM-DD/u);
    expect(() => parseEvaluationArgs([DATE, "--runs", "6"])).toThrow(/integer from 1 to 5/u);
    expect(() => parseEvaluationArgs([DATE, "--run-delay-ms", "300001"])).toThrow(
      /integer from 0 to 300000/u,
    );
    expect(() => parseEvaluationArgs([DATE, "--provider", "unknown"])).toThrow(/provider must be one of/u);
    expect(() => parseEvaluationArgs([DATE, "--max-replacement-runs", "3"])).toThrow(
      /replacement runs must be an integer from 0 to 2/u,
    );
    expect(parseEvaluationArgs([DATE, "--runs", "2", "--run-delay-ms", "90000"])).toEqual({
      date: DATE,
      runs: 2,
      maxReplacementRuns: 0,
      runDelayMs: 90_000,
    });
    expect(parseEvaluationArgs([DATE, "--provider", "agnes", "--max-replacement-runs", "2"])).toEqual({
      date: DATE,
      runs: 3,
      maxReplacementRuns: 2,
      runDelayMs: 0,
      provider: "agnes",
    });
  });
});
