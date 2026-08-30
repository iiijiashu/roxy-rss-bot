import { readFileSync } from "node:fs";
import path from "node:path";
import { load } from "js-yaml";
import { describe, expect, it, vi } from "vitest";
import { groupEvidence, type EvidenceRecord, type SynthesizedDevelopment } from "../evidence.ts";
import {
  FORMAL_EVALUATION_CLEAN_RUNS,
  MAX_EVALUATION_REPLACEMENT_RUNS,
  MAX_EVALUATION_SYNTHESIS_ATTEMPTS,
} from "../evaluation-policy.ts";
import {
  MAX_SYNTHESIS_EVENTS_PER_TASK,
  MAX_TOTAL_SYNTHESIS_ATTEMPTS,
  synthesizeInChunksWithQualityGate,
} from "../synthesis.ts";

interface WorkflowStep {
  name?: string;
  env?: Record<string, unknown>;
  run?: string;
  uses?: string;
  with?: Record<string, unknown>;
}

interface WorkflowDocument {
  jobs?: {
    digest?: {
      ["timeout-minutes"]?: number;
      steps?: WorkflowStep[];
    };
  };
}

function synthesisFixture(): {
  records: EvidenceRecord[];
  developments: SynthesizedDevelopment[];
} {
  const names = [
    "Atlas",
    "Beacon",
    "Cipher",
    "Delta",
    "Ember",
    "Flux",
    "Grove",
    "Helix",
    "Ion",
    "Juno",
    "Kestrel",
    "Lumen",
    "Mosaic",
    "Nimbus",
    "Orbit",
    "Pulse",
    "Quartz",
    "Relay",
    "Solace",
    "Vertex",
  ];
  const actions = [
    "代理隔离",
    "工具审计",
    "密钥轮换",
    "任务回放",
    "沙箱执行",
    "流式响应",
    "状态存储",
    "模型路由",
    "调用追踪",
    "失败恢复",
    "队列限流",
    "日志脱敏",
    "插件接口",
    "缓存校验",
    "会话续传",
    "延迟指标",
    "输入验证",
    "事件分发",
    "超时控制",
    "版本锁定",
  ];
  const records: EvidenceRecord[] = names.map((name, index) => ({
    id: `S${index + 1}`,
    sourceType: "official_web",
    sourceName: "Official",
    authority: "primary",
    url: `https://example.com/${name.toLowerCase()}`,
    title: `${name} Agent Integration`,
    publishedAt: "2026-08-29T00:00:00.000Z",
    observedAt: "2026-08-29T01:00:00.000Z",
    content: `${name} adds a verified agent integration. ${actions[index]}`,
    category: "model",
    freshness: "newly_published",
    visibility: "full_text",
    confidence: 0.98,
  }));
  const events = records.map((record) => groupEvidence([record])[0]!);
  const developments: SynthesizedDevelopment[] = events.map((event, index) => ({
    event_id: event.id,
    title: `${names[index]} 发布${actions[index]}`,
    summary: `${names[index]} 增加了经过验证的智能体集成。`,
    why_it_matters: `这会影响${actions[index]}场景的接口设计和在线推理效率。`,
    source_ids: [event.primarySourceId],
  }));
  return { records, developments };
}

describe("daily workflow synthesis budget", () => {
  it("matches the maximum reachable logical synthesis attempts", async () => {
    const { records, developments } = synthesisFixture();
    const events = records.map((record) => groupEvidence([record])[0]!);
    let chunkIndex = 0;
    let attempt = 0;
    const invoke = vi.fn(async () => {
      const chunk = developments.slice(
        chunkIndex * MAX_SYNTHESIS_EVENTS_PER_TASK,
        (chunkIndex + 1) * MAX_SYNTHESIS_EVENTS_PER_TASK,
      );
      if (chunkIndex < 6 && attempt === 0) {
        attempt++;
        throw Object.assign(new Error("bounded provider interruption"), { code: "output_limit" });
      }
      const qualityAttempt = attempt++ - (chunkIndex < 6 ? 1 : 0);
      if (qualityAttempt < 2) {
        const editorialChunk = chunk.map((development) => ({ ...development }));
        editorialChunk[0]!.summary = "智能体集成增加隔离执行和审计日志。".repeat(10);
        return JSON.stringify({ developments: editorialChunk });
      }
      chunkIndex++;
      attempt = 0;
      return JSON.stringify({ developments: chunk });
    });

    await expect(
      synthesizeInChunksWithQualityGate(events, records, {
        invoke,
        parse: (raw) => JSON.parse(raw) as unknown,
      }),
    ).resolves.toMatchObject({ quality: { status: "pass" } });
    expect(MAX_TOTAL_SYNTHESIS_ATTEMPTS).toBe(36);
    expect(invoke).toHaveBeenCalledTimes(MAX_TOTAL_SYNTHESIS_ATTEMPTS);

    const workflowPath = path.resolve(".github/workflows/daily-digest.yml");
    const workflow = load(readFileSync(workflowPath, "utf-8")) as WorkflowDocument;
    const generateStep = workflow.jobs?.digest?.steps?.find(
      (step) => step.name === "Generate evidence-first Chinese digest",
    );
    const configuredBudget = Number(generateStep?.env?.["LLM_CALL_BUDGET"]);
    const maxTaskAttempts = Number(generateStep?.env?.["AGNES_MAX_TASK_ATTEMPTS"]);
    const providerRequestBudget = Number(generateStep?.env?.["AGNES_REQUEST_BUDGET"]);
    const providerRetryBudget = Number(generateStep?.env?.["AGNES_RETRY_BUDGET"]);
    const providerTimeoutMs = Number(generateStep?.env?.["AGNES_TIMEOUT_MS"]);
    const jobTimeoutMinutes = Number(workflow.jobs?.digest?.["timeout-minutes"]);
    const runtimeReserveMinutes = 15;

    expect(configuredBudget).toBe(invoke.mock.calls.length);
    expect(providerRequestBudget).toBeGreaterThanOrEqual(configuredBudget * maxTaskAttempts);
    expect(providerRetryBudget).toBeGreaterThanOrEqual(configuredBudget * (maxTaskAttempts - 1));
    expect(providerRequestBudget * providerTimeoutMs).toBeLessThanOrEqual(
      (jobTimeoutMinutes - runtimeReserveMinutes) * 60_000,
    );
  });

  it("runs production generation directly without replaying or caching frozen evidence", () => {
    const workflowPath = path.resolve(".github/workflows/daily-digest.yml");
    const workflow = load(readFileSync(workflowPath, "utf-8")) as WorkflowDocument;
    const steps = workflow.jobs?.digest?.steps ?? [];
    const generateStep = workflow.jobs?.digest?.steps?.find(
      (step) => step.name === "Generate evidence-first Chinese digest",
    );

    expect(steps.map((step) => step.name)).not.toContain("Restore same-day frozen evidence");
    expect(steps.map((step) => step.name)).not.toContain("Prepare same-day frozen evidence");
    expect(steps.map((step) => step.name)).not.toContain("Save same-day frozen evidence");
    expect(steps.some((step) => step.uses?.startsWith("actions/cache/"))).toBe(false);
    expect(generateStep?.run?.trim()).toBe("pnpm start");
  });

  it("collects three clean production evaluations with bounded replacements", () => {
    const workflowPath = path.resolve(".github/workflows/daily-digest.yml");
    const workflow = load(readFileSync(workflowPath, "utf-8")) as WorkflowDocument;
    const evaluateStep = workflow.jobs?.digest?.steps?.find(
      (step) => step.name === "Collect three clean production evaluations",
    );

    expect(evaluateStep?.run).toContain("--runs 3");
    expect(evaluateStep?.run).toContain("--max-replacement-runs 2");
    expect(evaluateStep?.run).toContain("--provider agnes");
    expect(evaluateStep?.run).toContain("--run-delay-ms 120000");
    expect(evaluateStep?.env?.["LLM_CALL_BUDGET"]).toBe(String(MAX_EVALUATION_SYNTHESIS_ATTEMPTS));
    expect(evaluateStep?.env?.["AGNES_REQUEST_BUDGET"]).toBe(String(MAX_EVALUATION_SYNTHESIS_ATTEMPTS));

    const generateStep = workflow.jobs?.digest?.steps?.find(
      (step) => step.name === "Generate evidence-first Chinese digest",
    );
    const maximumProviderRequests =
      MAX_TOTAL_SYNTHESIS_ATTEMPTS +
      (FORMAL_EVALUATION_CLEAN_RUNS + MAX_EVALUATION_REPLACEMENT_RUNS) * MAX_EVALUATION_SYNTHESIS_ATTEMPTS;
    const providerTimeoutMs = Number(generateStep?.env?.["AGNES_TIMEOUT_MS"]);
    const pacingDelayMs = (FORMAL_EVALUATION_CLEAN_RUNS + MAX_EVALUATION_REPLACEMENT_RUNS - 1) * 120_000;
    const jobTimeoutMs = Number(workflow.jobs?.digest?.["timeout-minutes"]) * 60_000;
    const runtimeReserveMs = 40 * 60_000;
    expect(
      maximumProviderRequests * providerTimeoutMs + pacingDelayMs + runtimeReserveMs,
    ).toBeLessThanOrEqual(jobTimeoutMs);
  });
});
