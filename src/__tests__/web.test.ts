import { afterEach, describe, expect, it, vi } from "vitest";
import {
  parseSitemapUrls,
  parseSitemapIndexUrls,
  isSitemapIndex,
  extractTitle,
  extractText,
  urlCategory,
  titleFromUrl,
  emptyState,
  extractPageDates,
  parseRssItems,
  parseWebState,
  classifyWebFreshness,
  fetchSiteContent,
  isAllowedSiteUrl,
  sanitizeDiscoveredUrls,
  shouldFetchUrl,
} from "../web.ts";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

// ---------------------------------------------------------------------------
// parseSitemapUrls
// ---------------------------------------------------------------------------

describe("parseSitemapUrls", () => {
  it("parses urls with loc and lastmod", () => {
    const xml = `
      <urlset>
        <url>
          <loc>https://example.com/page1</loc>
          <lastmod>2026-03-09</lastmod>
        </url>
        <url>
          <loc>https://example.com/page2</loc>
          <lastmod>2026-03-08</lastmod>
        </url>
      </urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ loc: "https://example.com/page1", lastmod: "2026-03-09" });
    expect(result[1]).toEqual({ loc: "https://example.com/page2", lastmod: "2026-03-08" });
  });

  it("handles urls without lastmod", () => {
    const xml = `<urlset><url><loc>https://example.com/page</loc></url></urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ loc: "https://example.com/page", lastmod: undefined });
  });

  it("returns empty array for empty XML", () => {
    expect(parseSitemapUrls("")).toEqual([]);
    expect(parseSitemapUrls("<urlset></urlset>")).toEqual([]);
  });

  it("handles whitespace in loc/lastmod", () => {
    const xml = `<urlset><url><loc>  https://example.com/page  </loc><lastmod>  2026-03-09  </lastmod></url></urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result[0]!.loc).toBe("https://example.com/page");
    expect(result[0]!.lastmod).toBe("2026-03-09");
  });
});

// ---------------------------------------------------------------------------
// isSitemapIndex
// ---------------------------------------------------------------------------

describe("isSitemapIndex", () => {
  it("detects sitemapindex tag", () => {
    expect(isSitemapIndex('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')).toBe(true);
    expect(isSitemapIndex("<sitemapindex>")).toBe(true);
  });

  it("returns false for regular sitemap", () => {
    expect(isSitemapIndex('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')).toBe(false);
  });

  it("extracts nested sitemap URLs and decodes XML entities", () => {
    const xml = `<sitemapindex><sitemap><loc>https://example.com/news.xml?lang=en&amp;page=1</loc></sitemap><sitemap><loc>https://example.com/research.xml</loc></sitemap></sitemapindex>`;
    expect(parseSitemapIndexUrls(xml)).toEqual([
      "https://example.com/news.xml?lang=en&page=1",
      "https://example.com/research.xml",
    ]);
  });
});

// ---------------------------------------------------------------------------
// extractTitle
// ---------------------------------------------------------------------------

describe("extractTitle", () => {
  it("extracts og:title (property first)", () => {
    const html = `<meta property="og:title" content="My Title">`;
    expect(extractTitle(html)).toBe("My Title");
  });

  it("extracts og:title (content first)", () => {
    const html = `<meta content="My Title" property="og:title">`;
    expect(extractTitle(html)).toBe("My Title");
  });

  it("falls back to <title> tag", () => {
    const html = `<html><head><title>Page Title</title></head></html>`;
    expect(extractTitle(html)).toBe("Page Title");
  });

  it("prefers og:title over <title>", () => {
    const html = `<meta property="og:title" content="OG Title"><title>Fallback Title</title>`;
    expect(extractTitle(html)).toBe("OG Title");
  });

  it("returns empty string when no title found", () => {
    expect(extractTitle("<html><body></body></html>")).toBe("");
  });

  it("trims whitespace", () => {
    const html = `<title>  Spaced Title  </title>`;
    expect(extractTitle(html)).toBe("Spaced Title");
  });
});

// ---------------------------------------------------------------------------
// extractText
// ---------------------------------------------------------------------------

describe("extractText", () => {
  it("extracts text from <main> content", () => {
    const html = `<html><nav>Nav</nav><main><p>Main content</p></main><footer>Foot</footer></html>`;
    expect(extractText(html)).toBe("Main content");
  });

  it("falls back to <article> if no <main>", () => {
    const html = `<html><article><p>Article content</p></article></html>`;
    expect(extractText(html)).toBe("Article content");
  });

  it("strips script and style tags", () => {
    const html = `<main><script>alert('x')</script><style>.a{}</style><p>Clean</p></main>`;
    expect(extractText(html)).toBe("Clean");
  });

  it("decodes HTML entities", () => {
    const html = `<main>&amp; &lt; &gt; &quot; &#39; &nbsp;</main>`;
    const result = extractText(html);
    expect(result).toContain("&");
    expect(result).toContain("<");
    expect(result).toContain(">");
    expect(result).toContain('"');
    expect(result).toContain("'");
  });

  it("collapses whitespace", () => {
    const html = `<main><p>  Multiple   spaces   and\n\nnewlines  </p></main>`;
    expect(extractText(html)).toBe("Multiple spaces and newlines");
  });

  it("truncates to MAX_CONTENT_LENGTH (1500 chars)", () => {
    const html = `<main>${"A".repeat(2000)}</main>`;
    expect(extractText(html)).toHaveLength(1500);
  });
});

describe("trusted web dates", () => {
  it("accepts only exact first-party HTTPS hosts", () => {
    expect(isAllowedSiteUrl("openai", "https://openai.com/news/item")).toBe(true);
    expect(isAllowedSiteUrl("anthropic", "https://www.anthropic.com/research/item")).toBe(true);
    expect(isAllowedSiteUrl("openai", "http://openai.com/news/item")).toBe(false);
    expect(isAllowedSiteUrl("openai", "https://openai.com.evil.test/news/item")).toBe(false);
    expect(isAllowedSiteUrl("anthropic", "https://127.0.0.1/news/item")).toBe(false);
    expect(isAllowedSiteUrl("anthropic", "https://anthropic.com:444/news/item")).toBe(false);
  });

  it("drops off-host sitemap entries and deterministically deduplicates allowed URLs", () => {
    expect(
      sanitizeDiscoveredUrls("openai", [
        { loc: "https://openai.com/news/item", lastmod: "2026-08-28" },
        { loc: "https://evil.test/news/item", lastmod: "2026-08-30" },
        { loc: "https://openai.com/news/item", lastmod: "2026-08-29" },
      ]),
    ).toEqual([{ loc: "https://openai.com/news/item", lastmod: "2026-08-29" }]);
  });

  it("refuses to follow a first-party redirect to an off-host URL", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(null, { status: 302, headers: { location: "https://evil.test/sitemap.xml" } }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchSiteContent("anthropic", emptyState())).rejects.toThrow("Disallowed anthropic URL");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("extracts publication/update dates from JSON-LD instead of sitemap metadata", () => {
    const html = `<script type="application/ld+json">{"@type":"Article","datePublished":"2026-08-28T10:00:00Z","dateModified":"2026-08-29T09:00:00Z"}</script>`;
    expect(extractPageDates(html)).toEqual({
      publishedAt: "2026-08-28T10:00:00.000Z",
      updatedAt: "2026-08-29T09:00:00.000Z",
    });
  });

  it("parses first-party RSS publication dates and summaries", () => {
    const rss = `<rss><channel><item><title><![CDATA[New model]]></title><description><![CDATA[<p>Official summary.</p>]]></description><link>https://example.com/new-model</link><category>Product</category><pubDate>Fri, 28 Aug 2026 10:00:00 GMT</pubDate></item></channel></rss>`;
    expect(parseRssItems(rss)).toEqual([
      {
        url: "https://example.com/new-model",
        title: "New model",
        description: "Official summary.",
        category: "Product",
        publishedAt: "2026-08-28T10:00:00.000Z",
      },
    ]);
  });

  it("classifies old newly discovered pages as historical even if observed today", () => {
    expect(classifyWebFreshness("2025-02-10T00:00:00.000Z", undefined, "2026-08-29T00:00:00.000Z")).toBe(
      "newly_discovered_historical",
    );
    expect(classifyWebFreshness("2026-08-28T00:00:00.000Z", undefined, "2026-08-29T00:00:00.000Z")).toBe(
      "newly_published",
    );
  });

  it("does not treat a first observation of dateModified as a material update", () => {
    expect(classifyWebFreshness(undefined, "2026-08-29T09:00:00.000Z", "2026-08-29T10:00:00.000Z")).toBe(
      "newly_discovered_historical",
    );
    expect(
      classifyWebFreshness(undefined, "2026-08-29T09:00:00.000Z", "2026-08-29T10:00:00.000Z", {
        status: "accepted",
        updatedAt: "2026-08-28T09:00:00.000Z",
      }),
    ).toBe("materially_updated");
  });

  it("rejects a future first-party timestamp as current evidence", () => {
    expect(classifyWebFreshness("2026-08-30T00:00:00.000Z", undefined, "2026-08-29T00:00:00.000Z")).toBe(
      "newly_discovered_historical",
    );
  });

  it("allows authoritative RSS to recover a URL previously seen only as sitemap metadata", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-29T10:00:00.000Z"));
    const url = "https://openai.com/index/recovered";
    const state = emptyState();
    state.openai.urls[url] = { status: "metadata_only", sitemapLastmod: "2026-08-29" };
    const rss = `<rss><channel><item><title>Recovered release</title><description>Official model release summary.</description><link>${url}</link><category>Product</category><pubDate>Sat, 29 Aug 2026 09:00:00 GMT</pubDate></item></channel></rss>`;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(rss, { status: 200 })));

    const result = await fetchSiteContent("openai", state);
    expect(result.fetchSuccess).toBe(true);
    expect(result.newItems).toHaveLength(1);
    expect(result.newItems[0]).toMatchObject({
      url,
      freshness: "newly_published",
      visibility: "official_summary",
    });
    expect(state.openai.urls[url]?.status).toBe("accepted");
  });

  it("keeps a future-dated RSS item retryable and admits it only after its publication time", async () => {
    vi.useFakeTimers();
    const url = "https://openai.com/index/future-release";
    const state = emptyState();
    const rss = `<rss><channel><item><title>Future release</title><description>Official release summary.</description><link>${url}</link><category>Product</category><pubDate>Sun, 30 Aug 2026 01:00:00 GMT</pubDate></item></channel></rss>`;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async () => new Response(rss, { status: 200 })),
    );

    vi.setSystemTime(new Date("2026-08-29T10:00:00.000Z"));
    const before = await fetchSiteContent("openai", state);
    expect(before.fetchSuccess).toBe(false);
    expect(before.newItems).toEqual([]);
    expect(state.openai.urls[url]?.status).toBe("retryable_failed");

    vi.setSystemTime(new Date("2026-08-30T02:00:00.000Z"));
    const after = await fetchSiteContent("openai", state);
    expect(after.fetchSuccess).toBe(true);
    expect(after.newItems).toHaveLength(1);
    expect(after.newItems[0]?.freshness).toBe("newly_published");
    expect(state.openai.urls[url]?.status).toBe("accepted");
  });

  it("keeps a future-dated page retryable and admits it after the page timestamp", async () => {
    vi.useFakeTimers();
    const url = "https://www.anthropic.com/news/future-release";
    const sitemap = `<urlset><url><loc>${url}</loc><lastmod>2026-08-29</lastmod></url></urlset>`;
    const page = `<html><head><title>Future release</title><script type="application/ld+json">{"@type":"Article","datePublished":"2026-08-30T01:00:00Z"}</script></head><main>Official agent API release.</main></html>`;
    const state = emptyState();
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockImplementation(
          async (input: string | URL | Request) =>
            new Response(String(input).endsWith("/sitemap.xml") ? sitemap : page, { status: 200 }),
        ),
    );

    vi.setSystemTime(new Date("2026-08-29T10:00:00.000Z"));
    const beforePromise = fetchSiteContent("anthropic", state);
    await vi.advanceTimersByTimeAsync(300);
    const before = await beforePromise;
    expect(before.fetchSuccess).toBe(false);
    expect(before.newItems).toEqual([]);
    expect(state.anthropic.urls[url]?.status).toBe("retryable_failed");

    vi.setSystemTime(new Date("2026-08-30T02:00:00.000Z"));
    const afterPromise = fetchSiteContent("anthropic", state);
    await vi.advanceTimersByTimeAsync(300);
    const after = await afterPromise;
    expect(after.fetchSuccess).toBe(true);
    expect(after.newItems).toHaveLength(1);
    expect(after.newItems[0]).toMatchObject({ url, freshness: "newly_published", visibility: "full_text" });
    expect(state.anthropic.urls[url]?.status).toBe("accepted");
  });

  it("fetches article pages with bounded concurrency and preserves sitemap order", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-29T10:00:00.000Z"));
    const urls = Array.from(
      { length: 6 },
      (_, index) => `https://www.anthropic.com/news/release-${index + 1}`,
    );
    const sitemap = `<urlset>${urls
      .map((url) => `<url><loc>${url}</loc><lastmod>2026-08-29</lastmod></url>`)
      .join("")}</urlset>`;
    const pageResolvers: Array<() => void> = [];
    let active = 0;
    let maximumActive = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async (input: string | URL | Request) => {
        if (String(input).endsWith("/sitemap.xml")) return new Response(sitemap, { status: 200 });
        return new Promise<Response>((resolve) => {
          active++;
          maximumActive = Math.max(maximumActive, active);
          pageResolvers.push(() => {
            active--;
            resolve(
              new Response(
                `<html><head><title>${String(input)}</title><script type="application/ld+json">{"@type":"Article","datePublished":"2026-08-29T09:00:00Z"}</script></head><main>Official release.</main></html>`,
                { status: 200 },
              ),
            );
          });
        });
      }),
    );

    const pending = fetchSiteContent("anthropic", emptyState());
    await vi.advanceTimersByTimeAsync(600);
    expect(pageResolvers).toHaveLength(3);
    expect(maximumActive).toBe(3);

    pageResolvers.splice(0, 3).forEach((resolve) => resolve());
    await vi.advanceTimersByTimeAsync(900);
    expect(pageResolvers).toHaveLength(3);
    pageResolvers.splice(0, 3).forEach((resolve) => resolve());
    await vi.runAllTimersAsync();

    const result = await pending;
    expect(maximumActive).toBe(3);
    expect(result.newItems.map((item) => item.url)).toEqual(urls);
  });

  it("cancels a chunked response as soon as its body exceeds the byte cap", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array(5 * 1024 * 1024 + 1));
      },
      cancel() {
        cancelled = true;
      },
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, { status: 200 })));

    await expect(fetchSiteContent("anthropic", emptyState())).rejects.toThrow("Response body exceeds limit");
    expect(cancelled).toBe(true);
  });

  it("cancels a response whose declared content length exceeds the byte cap", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      cancel() {
        cancelled = true;
      },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(body, {
          status: 200,
          headers: { "content-length": String(5 * 1024 * 1024 + 1) },
        }),
      ),
    );

    await expect(fetchSiteContent("anthropic", emptyState())).rejects.toThrow("Response body exceeds limit");
    expect(cancelled).toBe(true);
  });

  it("applies a deadline while reading a response body after headers arrive", async () => {
    vi.useFakeTimers();
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      cancel() {
        cancelled = true;
      },
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, { status: 200 })));

    const result = fetchSiteContent("anthropic", emptyState());
    const rejection = expect(result).rejects.toThrow("HTTP response body timed out after 10000ms");
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(10_000);
    await rejection;
    await Promise.resolve();
    expect(cancelled).toBe(true);
  });

  it("keeps failed/skipped URLs retryable and treats lastmod only as a refetch hint", () => {
    expect(shouldFetchUrl({ status: "retryable_failed" }, "2026-08-29", false)).toBe(true);
    expect(shouldFetchUrl({ status: "discovered" }, "2026-08-29", false)).toBe(true);
    expect(shouldFetchUrl({ status: "accepted", sitemapLastmod: "2026-08-28" }, "2026-08-29", false)).toBe(
      true,
    );
    expect(
      shouldFetchUrl({ status: "metadata_only", sitemapLastmod: "2026-08-28" }, "2026-08-29", true),
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// urlCategory
// ---------------------------------------------------------------------------

describe("urlCategory", () => {
  it("returns first path segment", () => {
    expect(urlCategory("https://anthropic.com/news/some-article")).toBe("news");
    expect(urlCategory("https://openai.com/research/gpt-5")).toBe("research");
  });

  it("returns 'article' for root URLs", () => {
    expect(urlCategory("https://example.com/")).toBe("article");
    expect(urlCategory("https://example.com")).toBe("article");
  });

  it("returns 'article' for invalid URLs", () => {
    expect(urlCategory("not a url")).toBe("article");
  });
});

// ---------------------------------------------------------------------------
// titleFromUrl
// ---------------------------------------------------------------------------

describe("titleFromUrl", () => {
  it("converts slug to title case", () => {
    expect(titleFromUrl("https://example.com/blog/my-great-article")).toBe("My Great Article");
  });

  it("handles single-segment paths", () => {
    expect(titleFromUrl("https://example.com/about")).toBe("About");
  });

  it("returns URL for invalid input", () => {
    expect(titleFromUrl("not-a-url")).toBe("not-a-url");
  });
});

// ---------------------------------------------------------------------------
// emptyState
// ---------------------------------------------------------------------------

describe("emptyState", () => {
  it("returns valid empty state structure", () => {
    const state = emptyState();
    expect(state).toEqual({
      anthropic: { lastChecked: "", urls: {} },
      openai: { lastChecked: "", urls: {} },
    });
  });

  it("returns a new object each time", () => {
    const a = emptyState();
    const b = emptyState();
    expect(a).not.toBe(b);
    a.anthropic.lastChecked = "modified";
    expect(b.anthropic.lastChecked).toBe("");
  });

  it("migrates valid legacy state but rejects corrupt or off-host persisted entries", () => {
    expect(
      parseWebState({
        anthropic: {
          lastChecked: "2026-08-29T00:00:00.000Z",
          seenUrls: { "https://www.anthropic.com/news/item": "2026-08-28" },
        },
        openai: {},
      }).anthropic.urls["https://www.anthropic.com/news/item"],
    ).toMatchObject({ status: "accepted", sitemapLastmod: "2026-08-28" });
    expect(() =>
      parseWebState({
        anthropic: { urls: { "https://evil.test/item": { status: "accepted" } } },
        openai: {},
      }),
    ).toThrow("Invalid persisted web URL state");
    expect(() =>
      parseWebState({
        anthropic: { urls: { "https://www.anthropic.com/news/item": { status: "unknown" } } },
        openai: {},
      }),
    ).toThrow("Invalid persisted web URL status");
  });
});
