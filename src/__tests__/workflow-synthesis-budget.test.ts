import { readFileSync } from "node:fs";
import path from "node:path";
import { load } from "js-yaml";
import { describe, expect, it, vi } from "vitest";
import { groupEvidence, type EvidenceRecord, type SynthesizedDevelopment } from "../evidence.ts";
import { synthesizeWithQualityGate } from "../synthesis.ts";

interface WorkflowStep {
  name?: string;
  env?: Record<string, unknown>;
}

interface WorkflowDocument {
  jobs?: {
    digest?: {
      steps?: WorkflowStep[];
    };
  };
}

function synthesisFixture(): {
  records: EvidenceRecord[];
  developments: SynthesizedDevelopment[];
} {
  const records: EvidenceRecord[] = [
    {
      id: "S1",
      sourceType: "official_web",
      sourceName: "Official",
      authority: "primary",
      url: "https://example.com/model-release",
      title: "Introducing Example Model",
      publishedAt: "2026-08-29T00:00:00.000Z",
      observedAt: "2026-08-29T01:00:00.000Z",
      content: "Example Model adds a new agent API and lower inference latency.",
      category: "model",
      freshness: "newly_published",
      visibility: "full_text",
      confidence: 0.98,
    },
  ];
  const events = groupEvidence(records);
  const developments: SynthesizedDevelopment[] = [
    {
      event_id: events[0]!.id,
      title: "Example Model 发布新的智能体 API",
      summary: "Example Model 增加新的智能体 API，并降低推理延迟。",
      why_it_matters: "这会影响智能体应用的接口设计和在线推理效率。",
      source_ids: [records[0]!.id],
    },
  ];
  return { records, developments };
}

describe("daily workflow synthesis budget", () => {
  it("matches the maximum reachable logical synthesis attempts", async () => {
    const { records, developments } = synthesisFixture();
    const events = groupEvidence(records);
    const invalidSchema = { ...developments[0] } as Partial<SynthesizedDevelopment>;
    delete invalidSchema.why_it_matters;
    const responses = [
      "not valid json",
      JSON.stringify({ developments: [invalidSchema] }),
      JSON.stringify({ developments }),
    ];
    const invoke = vi.fn(async () => responses.shift()!);

    await expect(
      synthesizeWithQualityGate("BASE_PROMPT", events, records, {
        invoke,
        parse: (raw) => JSON.parse(raw) as unknown,
      }),
    ).resolves.toMatchObject({ quality: { status: "pass" } });

    const workflowPath = path.resolve(".github/workflows/daily-digest.yml");
    const workflow = load(readFileSync(workflowPath, "utf-8")) as WorkflowDocument;
    const generateStep = workflow.jobs?.digest?.steps?.find(
      (step) => step.name === "Generate evidence-first Chinese digest",
    );
    const configuredBudget = Number(generateStep?.env?.["LLM_CALL_BUDGET"]);

    expect(configuredBudget).toBe(invoke.mock.calls.length);
  });
});
