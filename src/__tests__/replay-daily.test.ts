import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DAILY_SELECTION_POLICY, groupEvidence, selectTopEvents, type EvidenceRecord } from "../evidence.ts";
import type { LlmProvider } from "../providers/index.ts";
import { replayDaily } from "../replay-daily.ts";

const DATE = "2026-08-30";
const roots: string[] = [];
const names = ["Atlas", "Beacon", "Cipher", "Delta", "Ember", "Flux", "Grove", "Helix", "Ion", "Juno"];
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
];
const features = [
  "Isolation Runtime",
  "Audit Pipeline",
  "Key Rotation",
  "Task Replay",
  "Sandbox Executor",
  "Streaming Transport",
  "State Storage",
  "Model Router",
  "Call Tracing",
  "Failure Recovery",
];

function records(count = names.length): EvidenceRecord[] {
  const publishedAt = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const observedAt = new Date().toISOString();
  return names.slice(0, count).map((name, index) => ({
    id: `S${index + 1}`,
    sourceType: "official_web",
    sourceName: `${name} Official`,
    authority: "primary",
    url: `https://example.com/${name.toLowerCase()}`,
    title: `${name} ${features[index]}`,
    publishedAt,
    observedAt,
    content: `${name} releases a production agent API with runtime security for ${actions[index]}.`,
    category: "agent",
    freshness: "newly_published",
    visibility: "full_text",
    confidence: 0.98,
  }));
}

function writeInput(rootDir: string, inputRecords: EvidenceRecord[], preserveSelection = false): string {
  const inputDir = path.join(rootDir, "backup");
  fs.mkdirSync(inputDir, { recursive: true });
  const events = groupEvidence(inputRecords);
  const inputPath = path.join(inputDir, "evidence.json");
  fs.writeFileSync(
    inputPath,
    `${JSON.stringify(
      {
        schemaVersion: 2,
        observedAt: inputRecords[0]!.observedAt,
        records: inputRecords,
        events,
        selectedEventIds: preserveSelection
          ? selectTopEvents(events, {
              previousKeys: new Set(),
              ...DAILY_SELECTION_POLICY,
            }).map((event) => event.id)
          : inputRecords.map((_, index) => `event:${String(index).padStart(16, "0")}`),
        selection: { previousNoveltyKeys: [], policy: DAILY_SELECTION_POLICY },
      },
      null,
      2,
    )}\n`,
    "utf-8",
  );
  return inputPath;
}

function providerFor(inputRecords: EvidenceRecord[]): LlmProvider {
  const selected = selectTopEvents(groupEvidence(inputRecords), {
    previousKeys: new Set(),
    ...DAILY_SELECTION_POLICY,
  });
  const byEvent = new Map(
    selected.map((event) => [
      event.id,
      inputRecords.findIndex((record) => record.id === event.primarySourceId),
    ]),
  );
  let requests = 0;
  return {
    name: "test",
    async call(prompt) {
      requests++;
      const eventIds = [...prompt.matchAll(/"event_id":"(event:[0-9a-f]{16})"/gu)].map((match) => match[1]!);
      return JSON.stringify({
        developments: eventIds.map((eventId) => {
          const index = byEvent.get(eventId)!;
          return {
            event_id: eventId,
            title: `${names[index]} 发布${actions[index]}`,
            summary: `${names[index]} 发布生产级智能体 API，并加强运行时安全。`,
            why_it_matters: `这会影响${actions[index]}场景的接口设计。`,
          };
        }),
      });
    },
    getDiagnostics: () => ({
      provider: "test",
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

describe("frozen daily replay", () => {
  it("applies an explicitly accepted selection change and updates production state", async () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-replay-production-test-"));
    roots.push(rootDir);
    const inputRecords = records();
    const inputPath = writeInput(rootDir, inputRecords);
    fs.mkdirSync(path.join(rootDir, "digests"), { recursive: true });
    fs.writeFileSync(
      path.join(rootDir, "digests", "event-state.json"),
      '{"schemaVersion":2,"events":{}}\n',
      "utf-8",
    );

    const result = await replayDaily({
      date: DATE,
      inputPath,
      rootDir,
      apply: true,
      acceptSelectionChange: true,
      providerFactory: () => providerFor(inputRecords),
    });

    expect(result).toMatchObject({ date: DATE, developmentCount: 10, selectionIdentical: false });
    const digestDir = path.join(rootDir, "digests", DATE);
    const quality = JSON.parse(fs.readFileSync(path.join(digestDir, "quality-report.json"), "utf-8")) as {
      passed: boolean;
    };
    const provenance = JSON.parse(
      fs.readFileSync(path.join(digestDir, "replay-provenance.json"), "utf-8"),
    ) as { mode: string; recordCount: number; selectedEventCount: number };
    const eventState = JSON.parse(
      fs.readFileSync(path.join(rootDir, "digests", "event-state.json"), "utf-8"),
    ) as { events: Record<string, unknown> };
    expect(quality.passed).toBe(true);
    expect(provenance).toMatchObject({ mode: "frozen_evidence", recordCount: 10, selectedEventCount: 10 });
    expect(Object.keys(eventState.events)).toHaveLength(10);
    expect(fs.readFileSync(path.join(digestDir, "digest.md"), "utf-8")).toContain("Atlas");
  });

  it("fails closed before provider use when deterministic selection drifts", async () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-replay-production-test-"));
    roots.push(rootDir);
    const inputRecords = records();
    const inputPath = writeInput(rootDir, inputRecords);
    const digestDir = path.join(rootDir, "digests", DATE);
    fs.mkdirSync(digestDir, { recursive: true });
    const digestPath = path.join(digestDir, "digest.md");
    fs.writeFileSync(digestPath, "PRESERVE_EXISTING_DIGEST", "utf-8");
    const providerFactory = vi.fn(() => providerFor(inputRecords));

    await expect(replayDaily({ date: DATE, inputPath, rootDir, providerFactory })).rejects.toThrow(
      /selection changed/u,
    );

    expect(providerFactory).not.toHaveBeenCalled();
    expect(fs.readFileSync(digestPath, "utf-8")).toBe("PRESERVE_EXISTING_DIGEST");
  });

  it("writes a matching replay to an isolated directory without changing global state", async () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-replay-production-test-"));
    roots.push(rootDir);
    const inputRecords = records();
    const inputPath = writeInput(rootDir, inputRecords, true);
    const eventStatePath = path.join(rootDir, "digests", "event-state.json");
    fs.mkdirSync(path.dirname(eventStatePath), { recursive: true });
    fs.writeFileSync(eventStatePath, '{"schemaVersion":2,"events":{}}\n', "utf-8");

    const result = await replayDaily({
      date: DATE,
      inputPath,
      rootDir,
      providerFactory: () => providerFor(inputRecords),
    });

    expect(result).toMatchObject({ applied: false, selectionIdentical: true });
    expect(result.outputDir).toContain(path.join("replay-output", DATE));
    expect(fs.existsSync(path.join(result.outputDir, "digest.md"))).toBe(true);
    expect(fs.readFileSync(eventStatePath, "utf-8")).toBe('{"schemaVersion":2,"events":{}}\n');
    expect(fs.existsSync(path.join(rootDir, "digests", DATE, "digest.md"))).toBe(false);
  });

  it("fails closed before provider use when the frozen input cannot meet the daily floor", async () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-replay-production-test-"));
    roots.push(rootDir);
    const inputRecords = records(1);
    const inputPath = writeInput(rootDir, inputRecords);
    const digestDir = path.join(rootDir, "digests", DATE);
    fs.mkdirSync(digestDir, { recursive: true });
    const digestPath = path.join(digestDir, "digest.md");
    fs.writeFileSync(digestPath, "PRESERVE_EXISTING_DIGEST", "utf-8");
    const providerFactory = vi.fn(() => providerFor(inputRecords));

    await expect(replayDaily({ date: DATE, inputPath, rootDir, providerFactory })).rejects.toThrow(
      /must contain 10..20 events/u,
    );

    expect(providerFactory).not.toHaveBeenCalled();
    expect(fs.readFileSync(digestPath, "utf-8")).toBe("PRESERVE_EXISTING_DIGEST");
  });
});
