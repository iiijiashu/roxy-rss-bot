import { describe, expect, it } from "vitest";
import {
  canonicalUrl,
  groupEvidence,
  MAX_DAILY_DEVELOPMENTS,
  renderChineseDigest,
  selectTopEvents,
  titleSimilarity,
  validateSynthesis,
  type EvidenceRecord,
  type EventCandidate,
  type SynthesizedDevelopment,
} from "../evidence.ts";

function evidence(overrides: Partial<EvidenceRecord> = {}): EvidenceRecord {
  return {
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
    ...overrides,
  };
}

function development(event: EventCandidate, sourceIds = [event.primarySourceId]): SynthesizedDevelopment {
  return {
    event_id: event.id,
    title: "Example Model 发布新的智能体 API",
    summary: "Example Model 增加了新的智能体 API，并降低了推理延迟。",
    why_it_matters: "这会直接影响智能体应用的接口设计与在线推理效率。",
    source_ids: sourceIds,
  };
}

describe("evidence grouping and selection", () => {
  it("merges community corroboration into an official event but never creates a community-only fact", () => {
    const records = [
      evidence(),
      evidence({
        id: "HN1",
        sourceType: "hn_story",
        sourceName: "Hacker News",
        authority: "community-index",
        title: "Developers discuss the lower-latency Example v2.1 rollout",
        url: "https://news.ycombinator.com/item?id=1",
        content: "Primary source: https://example.com/model-release",
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 0.5,
        metadata: { score: 500, comment_count: 100, comment_bodies_available: false },
      }),
      evidence({
        id: "HN2",
        sourceType: "hn_story",
        sourceName: "Hacker News",
        authority: "community-index",
        url: "https://unmatched.example/other",
        title: "Unmatched discussion",
        content: "",
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 0.5,
      }),
    ];

    const events = groupEvidence(records);
    expect(events).toHaveLength(1);
    expect(events[0]!.primarySourceId).toBe("S1");
    expect(events[0]!.sourceIds).toEqual(expect.arrayContaining(["S1", "HN1"]));
    expect(events[0]!.sourceIds).not.toContain("HN2");
  });

  it("excludes metadata-only, historical, stale, and future-dated records from standalone ranking", () => {
    const records = [
      evidence({ id: "M1", freshness: "metadata_only", visibility: "metadata_only", content: "" }),
      evidence({ id: "H1", url: "https://example.com/old", freshness: "historical" }),
      evidence({ id: "S1", url: "https://example.com/stale", publishedAt: "2026-08-20T00:00:00.000Z" }),
      evidence({ id: "F1", url: "https://example.com/future", publishedAt: "2026-08-30T00:00:00.000Z" }),
    ];
    expect(groupEvidence(records)).toEqual([]);
  });

  it("allows only a bounded clock skew and requires a real forward material-update timestamp", () => {
    expect(groupEvidence([evidence({ publishedAt: "2026-08-29T01:04:00.000Z" })])).toHaveLength(1);
    expect(groupEvidence([evidence({ publishedAt: "2026-08-29T01:06:00.000Z" })])).toEqual([]);
    expect(
      groupEvidence([
        evidence({
          publishedAt: "2026-08-29T00:30:00.000Z",
          updatedAt: "2026-08-29T00:20:00.000Z",
          freshness: "materially_updated",
        }),
      ]),
    ).toEqual([]);
  });

  it("suppresses only the exact previously published novelty key", () => {
    const original = groupEvidence([evidence()])[0]!;
    expect(
      selectTopEvents([original], { previousKeys: new Set([original.noveltyKey]), minimumScore: 0 }),
    ).toEqual([]);

    const updated = groupEvidence([
      evidence({
        updatedAt: "2026-08-29T00:30:00.000Z",
        freshness: "materially_updated",
        metadata: { content_hash: "v2" },
      }),
    ])[0]!;
    expect(updated.key).toBe(original.key);
    expect(updated.noveltyKey).not.toBe(original.noveltyKey);
    expect(
      selectTopEvents([updated], { previousKeys: new Set([original.noveltyKey]), minimumScore: 0 }),
    ).toEqual([updated]);
  });

  it("prefers the primary source even when a community source has higher confidence", () => {
    const events = groupEvidence([
      evidence({ id: "OFFICIAL", confidence: 0.8 }),
      evidence({
        id: "COMMUNITY",
        authority: "primary-community",
        sourceName: "Launch index",
        confidence: 1,
      }),
    ]);
    expect(events).toHaveLength(1);
    expect(events[0]!.primarySourceId).toBe("OFFICIAL");
    expect(events[0]!.sourceIds[0]).toBe("OFFICIAL");
  });

  it("caps papers and research independently", () => {
    const names = ["Atlas", "Beacon", "Cinder", "Delta", "Ember", "Fjord"];
    const records = [
      ...names.map((name, index) =>
        evidence({
          id: `P${index}`,
          url: `https://arxiv.org/abs/2608.${1000 + index}`,
          title: `${name} evaluates sparse inference ${index}.0`,
          content: `${name} provides a benchmark, evaluation, system details, and code.`,
          category: "paper",
          sourceType: "paper",
        }),
      ),
      ...names.map((name, index) =>
        evidence({
          id: `R${index}`,
          url: `https://research.example/${name.toLowerCase()}`,
          title: `${name} studies context routing ${index}.1`,
          content: `${name} reports a research evaluation for context routing.`,
          category: "research",
          sourceType: "research",
        }),
      ),
    ];
    const selected = selectTopEvents(groupEvidence(records), {
      minimumScore: 0,
      maxEvents: 100,
      maxPapers: 3,
      maxResearch: 2,
    });
    expect(selected).toHaveLength(5);
    expect(selected.filter((event) => event.category === "paper")).toHaveLength(3);
    expect(selected.filter((event) => event.category === "research")).toHaveLength(2);
  });

  it("does not merge different products merely because they share a release template and version", () => {
    const events = groupEvidence([
      evidence({ id: "A", url: "https://example.com/atlas", title: "Atlas ships agent runtime 2.1" }),
      evidence({ id: "B", url: "https://example.com/beacon", title: "Beacon ships agent runtime 2.1" }),
    ]);
    expect(events).toHaveLength(2);
  });

  it("merges title variants only when they share a product and version identity", () => {
    const events = groupEvidence([
      evidence({ id: "A", url: "https://example.com/gpt-release", title: "OpenAI launches GPT-5.6" }),
      evidence({ id: "B", url: "https://example.net/gpt-news", title: "GPT 5.6 now available for agents" }),
    ]);
    expect(events).toHaveLength(1);
  });

  it("clamps the final result to twenty even when a caller asks for more", () => {
    const records = Array.from({ length: 25 }, (_, index) =>
      evidence({
        id: `T${index}`,
        url: `https://tools.example/project-${index}`,
        title: `Project-${index} ships runtime ${index}.2`,
        content: `Project-${index} releases an agent runtime API.`,
        category: "tool",
      }),
    );
    expect(selectTopEvents(groupEvidence(records), { minimumScore: 0, maxEvents: 100 })).toHaveLength(
      MAX_DAILY_DEVELOPMENTS,
    );
  });

  it("does not let a pile of secondary/community records outrank a strong official event", () => {
    const strong = evidence({
      id: "STRONG",
      url: "https://example.com/major",
      title: "Major agent runtime API release",
      content:
        "General availability release with a new SDK, benchmark, lower latency, and higher throughput.",
      category: "infrastructure",
    });
    const weak = evidence({
      id: "WEAK",
      url: "https://example.com/typo",
      title: "Minor documentation wording",
      content: "A typo was corrected.",
      category: "tool",
    });
    const noise = Array.from({ length: 30 }, (_, index) =>
      evidence({
        id: `NOISE${index}`,
        authority: index % 2 ? "secondary" : "community-index",
        sourceName: "Community index",
        url: weak.url,
        title: weak.title,
        content: "",
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 1,
      }),
    );
    const selected = selectTopEvents(groupEvidence([weak, ...noise, strong]), { minimumScore: 0 });
    expect(selected[0]!.primarySourceId).toBe("STRONG");
    expect(selected.some((event) => event.primarySourceId === "WEAK")).toBe(false);
  });
});

describe("synthesis quality gate", () => {
  function oneEvent(record = evidence()): { records: EvidenceRecord[]; events: EventCandidate[] } {
    const records = [record];
    return { records, events: groupEvidence(records) };
  }

  it("accepts grounded Chinese synthesis backed by the selected primary source", () => {
    const { records, events } = oneEvent(
      evidence({
        title: "Example Model 2.1 release",
        content: "Version 2.1 improves latency by 30%, closes Issue #42, and shipped on 2026-08-29.",
      }),
    );
    const result = development(events[0]!);
    result.title = "Example Model 2.1 正式发布";
    result.summary = "该版本将延迟降低 30%，并关闭了 Issue #42，发布日期为 2026-08-29。";
    const quality = validateSynthesis({ developments: [result] }, events, records);
    expect(quality.passed).toBe(true);
    expect(quality.violations).toEqual([]);
  });

  it("rejects sentiment, ranking, roadmap speculation, and invented mechanical facts", () => {
    const { records, events } = oneEvent();
    const result = development(events[0]!);
    result.title = "Example Model 9.9 发布";
    result.summary = "社区普遍认可这一变化，Example 已经引领议题，相关 Issue #999 也证明了这一点。";
    result.why_it_matters = "下一版本很可能继续扩大领先优势。";
    const quality = validateSynthesis({ developments: [result] }, events, records);
    expect(quality.status).toBe("fail");
    expect(quality.violations.join("\n")).toMatch(/unsupported inference/);
    expect(quality.violations.join("\n")).toMatch(/unsupported mechanical token/);
  });

  it("rejects extra fields, empty values, and duplicate source IDs as a strict schema failure", () => {
    const { records, events } = oneEvent();
    const malformed = { ...development(events[0]!), summary: "", source_ids: ["S1", "S1"], extra: true };
    const quality = validateSynthesis({ developments: [malformed], extra: true }, events, records);
    expect(quality.checks.find((check) => check.name === "schema")?.passed).toBe(false);
    expect(quality.status).toBe("fail");
  });

  it("rejects reordered developments and markup-bearing synthesis fields", () => {
    const records = [
      evidence({ id: "S1", url: "https://example.com/one" }),
      evidence({ id: "S2", url: "https://example.com/two", title: "Agent API release two" }),
    ];
    const events = selectTopEvents(groupEvidence(records), { minimumScore: 0 });
    const first = development(events[0]!);
    const second = development(events[1]!);
    expect(validateSynthesis({ developments: [second, first] }, events, records).passed).toBe(false);
    first.summary = "官方说明包含 <script>不可信标记</script>。";
    expect(validateSynthesis({ developments: [first, second] }, events, records).passed).toBe(false);
  });

  it("grounds mechanical claims only in the source IDs actually cited", () => {
    const official = evidence();
    const corroboration = evidence({
      id: "HN1",
      authority: "community-index",
      sourceName: "Hacker News",
      url: "https://news.ycombinator.com/item?id=999",
      content: "Primary source: https://example.com/model-release Issue #999",
      freshness: "observed_signal",
      visibility: "structured_api",
    });
    const records = [official, corroboration];
    const events = groupEvidence(records);
    const result = development(events[0]!);
    result.summary = "官方材料确认 Issue #999 已完成。";
    const quality = validateSynthesis({ developments: [result] }, events, records);
    expect(quality.violations.join("\n")).toMatch(/unsupported mechanical token #999/);
  });

  it("rejects an invented plain integer even when it has no unit suffix", () => {
    const { records, events } = oneEvent();
    const result = development(events[0]!);
    result.summary = "官方材料确认共有 42 个兼容接口。";
    const quality = validateSynthesis({ developments: [result] }, events, records);
    expect(quality.violations.join("\n")).toMatch(/unsupported mechanical token 42/);
  });

  it("rejects invented numbers next to Chinese text without spaces", () => {
    const { records, events } = oneEvent();
    const result = development(events[0]!);
    result.summary = "官方材料确认共有42个兼容接口，延迟降低30%。";
    const quality = validateSynthesis({ developments: [result] }, events, records);
    expect(quality.violations.join("\n")).toMatch(/unsupported mechanical token 42个/);
    expect(quality.violations.join("\n")).toMatch(/unsupported mechanical token 30%/);
  });

  it("renders the exact source, URL, date semantics, and event/source markers", () => {
    const { records, events } = oneEvent();
    const rendered = renderChineseDigest("2026-08-29", [development(events[0]!)], events, records);
    expect(rendered).toContain("[Official](https://example.com/model-release) · 发布 2026-08-29");
    expect(rendered).toContain(`event=${events[0]!.id}`);
    expect(rendered).toContain("source_ids=S1");
  });

  it("renders activity and observed signals with their actual date semantics", () => {
    const updated = evidence({
      updatedAt: "2026-08-29T00:30:00.000Z",
      freshness: "new_activity",
    });
    const updatedEvents = groupEvidence([updated]);
    expect(
      renderChineseDigest("2026-08-29", [development(updatedEvents[0]!)], updatedEvents, [updated]),
    ).toContain("· 更新 2026-08-29");

    const observed = evidence({ publishedAt: undefined, freshness: "observed_signal" });
    const observedEvents = groupEvidence([observed]);
    expect(
      renderChineseDigest("2026-08-29", [development(observedEvents[0]!)], observedEvents, [observed]),
    ).toContain("· 观测 2026-08-29");
  });
});

describe("normalization invariants", () => {
  it.each([
    "HTTP://WWW.Example.com/path/?utm_source=x#frag",
    "https://example.com/path?ref=feed",
    " https://EXAMPLE.com/ ",
    "not a url",
  ])("canonicalUrl is idempotent for %s", (value) => {
    expect(canonicalUrl(canonicalUrl(value))).toBe(canonicalUrl(value));
  });

  it.each([
    ["Example Model 2.1 release", "Example 2.1 is released"],
    ["新的智能体接口正式发布", "智能体接口发布说明"],
    ["Unrelated alpha", "Different beta"],
  ])("title similarity is symmetric", (left, right) => {
    expect(titleSimilarity(left, right)).toBe(titleSimilarity(right, left));
  });

  it("recognizes overlapping Chinese titles even when whole-token strings differ", () => {
    expect(titleSimilarity("新的智能体接口正式发布", "智能体接口发布说明")).toBeGreaterThan(0.5);
  });
});
