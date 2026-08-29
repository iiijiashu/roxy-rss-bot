import { describe, it, expect } from "vitest";
import { formatItem, topN, sampleNote } from "../prompts.ts";
import type { GitHubItem } from "../github.ts";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function makeItem(overrides: Partial<GitHubItem> = {}): GitHubItem {
  return {
    number: 1,
    title: "Test issue",
    state: "open",
    user: { login: "alice" },
    labels: [],
    created_at: "2026-03-09T00:00:00Z",
    updated_at: "2026-03-09T12:00:00Z",
    comments: 5,
    reactions: { "+1": 3 },
    body: "Some body text",
    html_url: "https://github.com/org/repo/issues/1",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// formatItem
// ---------------------------------------------------------------------------

describe("formatItem", () => {
  it("formats a basic item in Chinese (default)", () => {
    const result = formatItem(makeItem());
    expect(result).toContain("#1 [OPEN]");
    expect(result).toContain("Test issue");
    expect(result).toContain("作者: alice");
    expect(result).toContain("累计评论: 5");
    expect(result).toContain("👍: 3");
    expect(result).toContain("链接: org/repo Issue #1");
    expect(result).toContain("摘要: Some body text");
  });

  it("formats an item in English", () => {
    const result = formatItem(makeItem(), "en");
    expect(result).toContain("Author: alice");
    expect(result).toContain("Lifetime comments: 5");
    expect(result).toContain("URL:");
    expect(result).toContain("Summary: Some body text");
  });

  it("includes labels when present", () => {
    const item = makeItem({ labels: [{ name: "bug" }, { name: "critical" }] });
    const result = formatItem(item);
    expect(result).toContain("[bug, critical]");
  });

  it("shows no label bracket when labels empty", () => {
    const result = formatItem(makeItem({ labels: [] }));
    expect(result).toContain("#1 [OPEN] Test issue");
    expect(result).not.toContain("[]");
  });

  it("truncates body at 300 chars with ellipsis", () => {
    const longBody = "A".repeat(400);
    const result = formatItem(makeItem({ body: longBody }));
    expect(result).toContain("A".repeat(300) + "...");
  });

  it("does not add ellipsis for body <= 300 chars", () => {
    const result = formatItem(makeItem({ body: "Short body" }));
    expect(result).toContain("Short body");
    expect(result).not.toContain("...");
  });

  it("handles null body gracefully", () => {
    const result = formatItem(makeItem({ body: null }));
    expect(result).toContain("摘要: ");
  });

  it("handles missing reactions gracefully", () => {
    const result = formatItem(makeItem({ reactions: undefined }));
    expect(result).toContain("👍: 0");
  });

  it("replaces newlines in body with spaces", () => {
    const result = formatItem(makeItem({ body: "line1\nline2\nline3" }));
    expect(result).toContain("line1 line2 line3");
  });

  it("shows closed state uppercase", () => {
    const result = formatItem(makeItem({ state: "closed" }));
    expect(result).toContain("[CLOSED]");
  });
});

// ---------------------------------------------------------------------------
// topN
// ---------------------------------------------------------------------------

describe("topN", () => {
  it("returns top N items sorted by observable update time", () => {
    const items = [
      makeItem({ number: 1, comments: 2, updated_at: "2026-03-09T09:00:00Z" }),
      makeItem({ number: 2, comments: 10, updated_at: "2026-03-09T12:00:00Z" }),
      makeItem({ number: 3, comments: 5, updated_at: "2026-03-09T10:00:00Z" }),
      makeItem({ number: 4, comments: 8, updated_at: "2026-03-09T11:00:00Z" }),
    ];
    const result = topN(items, 2);
    expect(result).toHaveLength(2);
    expect(result[0]!.number).toBe(2);
    expect(result[1]!.number).toBe(4);
  });

  it("returns all items if n >= items.length", () => {
    const items = [makeItem({ comments: 1 }), makeItem({ comments: 2 })];
    expect(topN(items, 5)).toHaveLength(2);
  });

  it("does not mutate the original array", () => {
    const items = [makeItem({ comments: 1 }), makeItem({ comments: 5 })];
    const original = [...items];
    topN(items, 1);
    expect(items[0]!.comments).toBe(original[0]!.comments);
    expect(items[1]!.comments).toBe(original[1]!.comments);
  });

  it("returns empty array for empty input", () => {
    expect(topN([], 3)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// sampleNote
// ---------------------------------------------------------------------------

describe("sampleNote", () => {
  it("shows sampled note in Chinese when total > sampled", () => {
    const result = sampleNote(100, 30);
    expect(result).toBe("（API 观测到 100 条，以下展示最近更新的 30 条；总数可能受 API 分页上限影响）");
  });

  it("shows total-only note in Chinese when total <= sampled", () => {
    expect(sampleNote(10, 10)).toBe("（API 观测到 10 条；不把该数值解释为精确的“24 小时新增量”）");
    expect(sampleNote(5, 10)).toBe("（API 观测到 5 条；不把该数值解释为精确的“24 小时新增量”）");
  });

  it("shows sampled note in English when total > sampled", () => {
    const result = sampleNote(50, 20, "en");
    expect(result).toBe(
      "(Observed 50 API items; showing 20 most recently updated; totals may be API-capped)",
    );
  });

  it("shows total-only note in English when total <= sampled", () => {
    expect(sampleNote(8, 8, "en")).toBe("(Total: 8 items)");
  });
});
