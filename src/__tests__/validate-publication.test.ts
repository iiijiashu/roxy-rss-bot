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
    content: `${labels[index]} provides a verified agent API release.`,
    category: "tool",
    freshness: "newly_published",
    visibility: "full_text",
    confidence: 0.99,
    observedAt,
    publishedAt: "2026-08-29T01:00:00.000Z",
  }));
  const events = groupEvidence(records);
  const selected = selectTopEvents(events, { maxEvents: count });
  const developments = selected.map((event, index) => ({
    event_id: event.id,
    title: `${labels[index]} ${topics[index]}`,
    summary: "官方材料确认了这项新的技术变化。",
    why_it_matters: "这会影响开发者的实际接口选择与工程实现。",
    source_ids: [event.primarySourceId],
  }));
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
  writeJson(path.join(digestDir, "evidence.json"), {
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
  fs.writeFileSync(path.join(root, "feed.xml"), `<link>https://example.test/#${date}/digest</link>\n`);
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
  ])("rejects a missing %s artifact", (fileName) => {
    const { root, date } = fixture();
    fs.rmSync(path.join(root, "digests", date, fileName));
    expect(() => validatePublication(date, root)).toThrow("missing required file");
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
});
