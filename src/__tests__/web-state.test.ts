import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadWebState } from "../web.ts";

describe("published web state compatibility", () => {
  afterEach(() => vi.restoreAllMocks());

  it("restores accepted and metadata-only URLs without suppressing unfinished fetches", () => {
    const urls = {
      "https://example.com/accepted": { status: "accepted", sitemapLastmod: "2026-08-29" },
      "https://example.com/metadata": { status: "metadata_only" },
      "https://example.com/pending": { status: "discovered" },
      "https://example.com/retry": { status: "retryable_failed" },
    };
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({ anthropic: { lastChecked: "old", urls } }));
    const state = loadWebState();
    expect(state.anthropic.seenUrls).toEqual({
      "https://example.com/accepted": "2026-08-29",
      "https://example.com/metadata": "seen",
    });
    expect(state.anthropic.lastChecked).toBe("old");
    expect(state.anthropic).toHaveProperty("urls", urls);
    expect(state.openai.seenUrls).toEqual({});
  });

  it("preserves current-format seen URLs", () => {
    const seenUrls = { "https://example.com/current": "2026-09-17" };
    vi.spyOn(fs, "readFileSync").mockReturnValue(
      JSON.stringify({ openai: { lastChecked: "now", seenUrls } }),
    );
    expect(loadWebState().openai.seenUrls).toEqual(seenUrls);
  });

  it("initializes missing or null site state", () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({ anthropic: null }));
    expect(loadWebState()).toEqual({
      anthropic: { lastChecked: "", seenUrls: {} },
      openai: { lastChecked: "", seenUrls: {} },
    });
  });
});
