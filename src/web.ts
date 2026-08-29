/**
 * Web content fetching for AI company news/blog/research.
 *
 * Strategy:
 *   - Prefer first-party RSS when it exposes trustworthy publication dates.
 *   - Use sitemap lastmod only as a re-fetch hint, never as a publication timestamp.
 *   - Verify page-level dates/content before treating a URL as current news.
 *   - Track each URL through discovered/fetched/accepted/retryable-failed state.
 *
 * State is persisted in digests/web-state.json (committed to git by the Actions workflow).
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { sleep } from "./date.ts";
import { fetchWithTimeout } from "./http.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WebFreshness =
  | "newly_published"
  | "materially_updated"
  | "newly_discovered_historical"
  | "metadata_only";

export type WebVisibility = "full_text" | "official_summary" | "metadata_only";

export type WebUrlStatus =
  | "discovered"
  | "fetched"
  | "parsed"
  | "accepted"
  | "metadata_only"
  | "retryable_failed"
  | "permanently_ignored";

export interface WebPageItem {
  url: string;
  title: string;
  /** Crawl observation time. This is never a publication date. */
  observedAt: string;
  /** Sitemap mutation hint. This is never a publication date. */
  sitemapLastmod?: string;
  /** Date extracted from first-party page/RSS evidence. */
  publishedAt?: string;
  /** Date extracted from first-party page/RSS evidence. */
  updatedAt?: string;
  content: string;
  site: "anthropic" | "openai";
  category: string;
  freshness: WebFreshness;
  visibility: WebVisibility;
  contentHash?: string;
}

export interface WebUrlState {
  status: WebUrlStatus;
  sitemapLastmod?: string;
  publishedAt?: string;
  updatedAt?: string;
  contentHash?: string;
  lastAttemptAt?: string;
  lastSuccessAt?: string;
}

interface SiteState {
  lastChecked: string;
  /** Per-URL ingestion lifecycle. Failed/skipped URLs remain retryable. */
  urls: Record<string, WebUrlState>;
}

export interface WebState {
  anthropic: SiteState;
  openai: SiteState;
}

export interface WebFetchResult {
  site: "anthropic" | "openai";
  siteName: string;
  /** False only when discovery itself failed; omitted in older fixtures means success. */
  fetchSuccess?: boolean;
  isFirstRun: boolean;
  newItems: WebPageItem[];
  /** Total URLs discovered in sitemap (for context in the report) */
  totalDiscovered: number;
}

// ---------------------------------------------------------------------------
// Site config
// ---------------------------------------------------------------------------

interface SiteConfig {
  name: string;
  /** Exact HTTPS hosts allowed for discovery, redirects, and article URLs. */
  allowedHosts: string[];
  /** For single sitemaps: URL to fetch */
  sitemapUrl: string;
  /** For single sitemaps: only keep URLs starting with these path prefixes */
  prefixes?: string[];
  /** For sitemap indexes: named sub-sitemaps to fetch */
  subSitemapNames?: string[];
  /** URL template for sub-sitemaps; {name} is replaced with each sub-sitemap name */
  subSitemapTemplate?: string;
  /** Skip fetching article pages; derive title from URL slug instead. Use when the
   *  site blocks bot requests (e.g. Cloudflare WAF on datacenter IPs). */
  metadataOnly?: boolean;
  /** Prefer a first-party RSS feed when available. RSS dates are publication evidence. */
  rssUrl?: string;
}

const SITE_CONFIGS: Record<"anthropic" | "openai", SiteConfig> = {
  anthropic: {
    name: "Anthropic (Claude)",
    allowedHosts: ["anthropic.com", "www.anthropic.com"],
    sitemapUrl: "https://www.anthropic.com/sitemap.xml",
    prefixes: ["/news/", "/research/", "/engineering/", "/learn/"],
  },
  openai: {
    name: "OpenAI",
    allowedHosts: ["openai.com", "www.openai.com"],
    sitemapUrl: "https://openai.com/sitemap.xml",
    rssUrl: "https://openai.com/news/rss.xml",
    // Fetch only content-focused sub-sitemaps; skip app-category and i18n sitemaps
    subSitemapNames: [
      "research",
      "publication",
      "release",
      "company",
      "engineering",
      "milestone",
      "learn-guides",
      "safety",
      "product",
    ],
    subSitemapTemplate: "https://openai.com/sitemap.xml/{name}/",
    // Article pages can return 403 from datacenter IPs (Cloudflare WAF).
    // The first-party RSS feed is preferred; sitemap entries are metadata-only fallback.
    metadataOnly: true,
  },
};

/** Max article/metadata candidates processed per site and run. */
const MAX_CONTENT_FETCH_PER_RUN = 25;
/** Characters of page text forwarded to the LLM per article. */
const MAX_CONTENT_LENGTH = 1_500;
/** Polite delay between individual page GETs (ms). */
const FETCH_DELAY_MS = 300;
/** Per-page/sitemap timeout (ms). */
const FETCH_TIMEOUT_MS = 10_000;
/** Large first-party feeds can be slower than individual pages. */
const RSS_FETCH_TIMEOUT_MS = 30_000;
/** A first-party publication/update date within this window is considered current. */
const FRESHNESS_WINDOW_MS = 72 * 60 * 60 * 1000;
const MAX_TIMESTAMP_SKEW_MS = 5 * 60 * 1000;
const MAX_PAGE_BYTES = 5 * 1024 * 1024;
const MAX_FEED_BYTES = 15 * 1024 * 1024;
const MAX_REDIRECTS = 3;

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

const WEB_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0; +https://github.com/search?q=agents-radar)",
  Accept: "text/html,application/xml,text/xml,*/*",
  "Accept-Language": "en-US,en;q=0.9",
};

export function isAllowedSiteUrl(site: "anthropic" | "openai", raw: string): boolean {
  try {
    const url = new URL(raw);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      SITE_CONFIGS[site].allowedHosts.includes(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

export function sanitizeDiscoveredUrls(
  site: "anthropic" | "openai",
  entries: Array<{ loc: string; lastmod?: string }>,
): Array<{ loc: string; lastmod?: string }> {
  const byUrl = new Map<string, { loc: string; lastmod?: string }>();
  for (const entry of entries) {
    if (!isAllowedSiteUrl(site, entry.loc)) continue;
    const previous = byUrl.get(entry.loc);
    if (!previous || (entry.lastmod ?? "") > (previous.lastmod ?? "")) byUrl.set(entry.loc, entry);
  }
  return [...byUrl.values()];
}

async function readLimitedResponseBody(
  response: Response,
  maxBytes: number,
  timeoutMs: number,
): Promise<string> {
  const declaredLength = response.headers.get("content-length");
  if (declaredLength !== null) {
    const declaredBytes = Number(declaredLength);
    if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) {
      await response.body?.cancel("Response body exceeds limit").catch(() => undefined);
      throw new Error("Response body exceeds limit");
    }
  }
  if (!response.body) return "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const chunks: string[] = [];
  let receivedBytes = 0;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const bodyTimeout = new Promise<never>((_resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      const error = new Error(`HTTP response body timed out after ${timeoutMs}ms`);
      error.name = "HTTPTimeoutError";
      reject(error);
      void reader.cancel(error).catch(() => undefined);
    }, timeoutMs);
  });

  const consume = async (): Promise<string> => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedBytes += value.byteLength;
      if (receivedBytes > maxBytes) {
        await reader.cancel("Response body exceeds limit").catch(() => undefined);
        throw new Error("Response body exceeds limit");
      }
      chunks.push(decoder.decode(value, { stream: true }));
    }
    chunks.push(decoder.decode());
    return chunks.join("");
  };

  try {
    return await Promise.race([consume(), bodyTimeout]);
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
    try {
      reader.releaseLock();
    } catch {
      // A timed-out read can retain the lock until cancellation settles.
    }
  }
}

async function siteGet(
  site: "anthropic" | "openai",
  initialUrl: string,
  timeoutMs: number,
  maxBytes: number,
): Promise<string> {
  let currentUrl = initialUrl;
  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount++) {
    if (!isAllowedSiteUrl(site, currentUrl)) throw new Error(`Disallowed ${site} URL`);
    const response = await fetchWithTimeout(
      currentUrl,
      { headers: WEB_HEADERS, redirect: "manual" },
      timeoutMs,
    );
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel().catch(() => undefined);
      if (!location || redirectCount === MAX_REDIRECTS) throw new Error("Invalid or excessive redirect");
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (response.url && !isAllowedSiteUrl(site, response.url))
      throw new Error(`Disallowed ${site} response URL`);
    return readLimitedResponseBody(response, maxBytes, timeoutMs);
  }
  throw new Error("Redirect limit exceeded");
}

async function httpGet(site: "anthropic" | "openai", url: string): Promise<string> {
  return siteGet(site, url, FETCH_TIMEOUT_MS, MAX_PAGE_BYTES);
}

async function rssGet(site: "anthropic" | "openai", url: string): Promise<string> {
  return siteGet(site, url, RSS_FETCH_TIMEOUT_MS, MAX_FEED_BYTES);
}

// ---------------------------------------------------------------------------
// Sitemap parsing (plain-text XML; no DOM needed)
// ---------------------------------------------------------------------------

export function parseSitemapUrls(xml: string): Array<{ loc: string; lastmod?: string }> {
  const results: Array<{ loc: string; lastmod?: string }> = [];
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
    const rawLoc = block.match(/<loc>\s*(.*?)\s*<\/loc>/)?.[1];
    const rawLastmod = block.match(/<lastmod>\s*(.*?)\s*<\/lastmod>/)?.[1];
    if (rawLoc)
      results.push({
        loc: decodeXmlText(rawLoc),
        lastmod: rawLastmod ? decodeXmlText(rawLastmod) : undefined,
      });
  }
  return results;
}

export function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex[\s>]/.test(xml);
}

export function parseSitemapIndexUrls(xml: string): string[] {
  const urls: string[] = [];
  for (const block of xml.match(/<sitemap>[\s\S]*?<\/sitemap>/g) ?? []) {
    const rawLoc = block.match(/<loc>\s*(.*?)\s*<\/loc>/)?.[1];
    if (rawLoc) urls.push(decodeXmlText(rawLoc));
  }
  return urls;
}

// ---------------------------------------------------------------------------
// HTML content extraction
// ---------------------------------------------------------------------------

export function extractTitle(html: string): string {
  return (
    // Prefer OpenGraph title for cleaner strings
    (
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,200})["']/i)?.[1] ??
      html.match(/<meta[^>]+content=["']([^"']{1,200})["'][^>]+property=["']og:title["']/i)?.[1] ??
      html.match(/<title[^>]*>([^<]{1,200})<\/title>/i)?.[1] ??
      ""
    ).trim()
  );
}

export function extractText(html: string): string {
  // Prefer <main> or <article> to avoid nav/header/footer boilerplate
  const source =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ??
    html;

  return source
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_CONTENT_LENGTH);
}

function decodeXmlText(value: string): string {
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function normalizedIsoDate(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : undefined;
}

function collectJsonLdDates(value: unknown, result: { publishedAt?: string; updatedAt?: string }): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) collectJsonLdDates(item, result);
    return;
  }
  const record = value as Record<string, unknown>;
  result.publishedAt ??= normalizedIsoDate(record["datePublished"]);
  result.updatedAt ??= normalizedIsoDate(record["dateModified"]);
  for (const nested of Object.values(record)) {
    if ((!result.publishedAt || !result.updatedAt) && nested && typeof nested === "object") {
      collectJsonLdDates(nested, result);
    }
  }
}

/** Extract first-party publication/modification timestamps from page metadata. */
export function extractPageDates(html: string): { publishedAt?: string; updatedAt?: string } {
  const result: { publishedAt?: string; updatedAt?: string } = {};
  for (const match of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      collectJsonLdDates(JSON.parse(match[1]!.trim()), result);
    } catch {
      // Malformed JSON-LD is ignored; explicit meta/time tags are still attempted below.
    }
    if (result.publishedAt && result.updatedAt) break;
  }

  const metaContent = (key: string): string | undefined => {
    const propertyFirst = html.match(
      new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    )?.[1];
    const contentFirst = html.match(
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`, "i"),
    )?.[1];
    return propertyFirst ?? contentFirst;
  };

  result.publishedAt ??=
    normalizedIsoDate(metaContent("article:published_time")) ??
    normalizedIsoDate(metaContent("datePublished")) ??
    normalizedIsoDate(metaContent("date"));
  result.updatedAt ??=
    normalizedIsoDate(metaContent("article:modified_time")) ?? normalizedIsoDate(metaContent("dateModified"));

  if (!result.publishedAt) {
    const datetime = html.match(/<time[^>]+datetime=["']([^"']+)["'][^>]*>/i)?.[1];
    result.publishedAt = normalizedIsoDate(datetime);
  }
  return result;
}

export interface RssItem {
  url: string;
  title: string;
  description: string;
  category: string;
  publishedAt?: string;
}

/** Parse the small subset of RSS 2.0 used by first-party OpenAI news feeds. */
export function parseRssItems(xml: string): RssItem[] {
  const items: RssItem[] = [];
  for (const block of xml.match(/<item>[\s\S]*?<\/item>/g) ?? []) {
    const rawTitle = block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const rawDescription = block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ?? "";
    const rawLink = block.match(/<link>\s*([^<]+?)\s*<\/link>/i)?.[1] ?? "";
    const rawCategory = block.match(/<category>([\s\S]*?)<\/category>/i)?.[1] ?? "";
    const rawPubDate = block.match(/<pubDate>\s*([^<]+?)\s*<\/pubDate>/i)?.[1] ?? "";
    const url = decodeXmlText(rawLink);
    if (!url) continue;
    items.push({
      url,
      title: decodeXmlText(rawTitle),
      description: extractText(`<main>${decodeXmlText(rawDescription)}</main>`),
      category: decodeXmlText(rawCategory) || urlCategory(url),
      publishedAt: normalizedIsoDate(decodeXmlText(rawPubDate)),
    });
  }
  return items;
}

function contentHash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function isFreshDate(value: string | undefined, observedAt: string): boolean {
  if (!value) return false;
  const timestamp = Date.parse(value);
  const observed = Date.parse(observedAt);
  return (
    Number.isFinite(timestamp) &&
    Number.isFinite(observed) &&
    timestamp <= observed + MAX_TIMESTAMP_SKEW_MS &&
    observed - timestamp <= FRESHNESS_WINDOW_MS
  );
}

export function classifyWebFreshness(
  publishedAt: string | undefined,
  updatedAt: string | undefined,
  observedAt: string,
  previous?: WebUrlState,
): WebFreshness {
  if (
    previous &&
    isFreshDate(updatedAt, observedAt) &&
    updatedAt !== publishedAt &&
    updatedAt !== previous.updatedAt
  ) {
    return "materially_updated";
  }
  if (!previous && isFreshDate(publishedAt, observedAt)) return "newly_published";
  if (
    previous &&
    publishedAt &&
    publishedAt !== previous.publishedAt &&
    isFreshDate(publishedAt, observedAt)
  ) {
    return "newly_published";
  }
  return "newly_discovered_historical";
}

export function shouldFetchUrl(
  previous: WebUrlState | undefined,
  sitemapLastmod: string | undefined,
  metadataOnly: boolean,
): boolean {
  if (!previous) return true;
  if (previous.status === "retryable_failed" || previous.status === "discovered") return true;
  return !metadataOnly && Boolean(sitemapLastmod && sitemapLastmod !== previous.sitemapLastmod);
}

export function urlCategory(url: string): string {
  try {
    return new URL(url).pathname.split("/").filter(Boolean)[0] ?? "article";
  } catch {
    return "article";
  }
}

/** Derive a human-readable title from the last URL path segment. */
export function titleFromUrl(url: string): string {
  try {
    const slug = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return url;
  }
}

// ---------------------------------------------------------------------------
// URL discovery
// ---------------------------------------------------------------------------

async function discoverUrls(
  site: "anthropic" | "openai",
): Promise<{ urls: Array<{ loc: string; lastmod?: string }>; failures: number }> {
  const cfg = SITE_CONFIGS[site];
  const results: Array<{ loc: string; lastmod?: string }> = [];
  let failures = 0;

  if (cfg.subSitemapNames && cfg.subSitemapTemplate) {
    // Sitemap index: fetch each named sub-sitemap
    for (const name of cfg.subSitemapNames) {
      const subUrl = cfg.subSitemapTemplate.replace("{name}", name);
      try {
        const xml = await httpGet(site, subUrl);
        results.push(...parseSitemapUrls(xml));
        await sleep(100);
      } catch (err) {
        failures++;
        console.error(`  [web/${site}] sub-sitemap "${name}" failed: ${err}`);
      }
    }
  } else {
    // Single sitemap
    const xml = await httpGet(site, cfg.sitemapUrl);
    const all: Array<{ loc: string; lastmod?: string }> = [];
    if (isSitemapIndex(xml)) {
      const nestedSitemaps = parseSitemapIndexUrls(xml);
      for (const nestedUrl of nestedSitemaps.slice(0, 20)) {
        if (!isAllowedSiteUrl(site, nestedUrl)) {
          failures++;
          continue;
        }
        try {
          all.push(...parseSitemapUrls(await httpGet(site, nestedUrl)));
        } catch (error) {
          failures++;
          console.error(`  [web/${site}] nested sitemap failed (${nestedUrl}): ${error}`);
        }
      }
      if (nestedSitemaps.length > 20) failures++;
    } else {
      all.push(...parseSitemapUrls(xml));
    }

    const prefixes = cfg.prefixes ?? [];
    results.push(
      ...all.filter(({ loc }) => {
        try {
          return isAllowedSiteUrl(site, loc) && prefixes.some((p) => new URL(loc).pathname.startsWith(p));
        } catch {
          return false;
        }
      }),
    );
  }

  const safeUrls = sanitizeDiscoveredUrls(site, results);
  failures += results.length - results.filter(({ loc }) => isAllowedSiteUrl(site, loc)).length;
  return { urls: safeUrls, failures };
}

// ---------------------------------------------------------------------------
// State persistence
// ---------------------------------------------------------------------------

const STATE_FILE = path.join("digests", "web-state.json");
const WEB_URL_STATUSES = new Set<WebUrlStatus>([
  "discovered",
  "fetched",
  "parsed",
  "accepted",
  "metadata_only",
  "retryable_failed",
  "permanently_ignored",
]);

export function emptyState(): WebState {
  return {
    anthropic: { lastChecked: "", urls: {} },
    openai: { lastChecked: "", urls: {} },
  };
}

export function parseWebState(raw: unknown): WebState {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Invalid persisted web state root");
  }
  const root = raw as Record<string, unknown>;
  const migrated = emptyState();
  for (const site of ["anthropic", "openai"] as const) {
    const rawSource = root[site] ?? {};
    if (!rawSource || typeof rawSource !== "object" || Array.isArray(rawSource)) {
      throw new Error(`Invalid persisted web state for ${site}`);
    }
    const source = rawSource as { lastChecked?: unknown; urls?: unknown; seenUrls?: unknown };
    if (source.lastChecked !== undefined && typeof source.lastChecked !== "string") {
      throw new Error(`Invalid lastChecked in persisted web state for ${site}`);
    }
    migrated[site].lastChecked = source.lastChecked ?? "";
    if (migrated[site].lastChecked && !Number.isFinite(Date.parse(migrated[site].lastChecked))) {
      throw new Error(`Invalid lastChecked timestamp in persisted web state for ${site}`);
    }
    if (source.urls !== undefined) {
      if (!source.urls || typeof source.urls !== "object" || Array.isArray(source.urls)) {
        throw new Error(`Invalid URL map in persisted web state for ${site}`);
      }
      for (const [url, rawEntry] of Object.entries(source.urls as Record<string, unknown>)) {
        if (
          !isAllowedSiteUrl(site, url) ||
          !rawEntry ||
          typeof rawEntry !== "object" ||
          Array.isArray(rawEntry)
        ) {
          throw new Error(`Invalid persisted web URL state for ${site}: ${url}`);
        }
        const entry = rawEntry as Record<string, unknown>;
        if (typeof entry["status"] !== "string" || !WEB_URL_STATUSES.has(entry["status"] as WebUrlStatus)) {
          throw new Error(`Invalid persisted web URL status for ${site}: ${url}`);
        }
        for (const field of [
          "sitemapLastmod",
          "publishedAt",
          "updatedAt",
          "contentHash",
          "lastAttemptAt",
          "lastSuccessAt",
        ]) {
          if (entry[field] !== undefined && typeof entry[field] !== "string") {
            throw new Error(`Invalid ${field} in persisted web state for ${site}: ${url}`);
          }
        }
        for (const field of ["publishedAt", "updatedAt", "lastAttemptAt", "lastSuccessAt"]) {
          if (entry[field] && !Number.isFinite(Date.parse(entry[field] as string))) {
            throw new Error(`Invalid ${field} timestamp in persisted web state for ${site}: ${url}`);
          }
        }
        migrated[site].urls[url] = entry as unknown as WebUrlState;
      }
      continue;
    }
    // Schema v1 migration: old `seenUrls[url] = sitemapLastmod` records are
    // treated as already-ingested bootstrap history. This prevents a one-off
    // refetch storm while all new/failed URLs use the granular v2 lifecycle.
    if (source.seenUrls !== undefined) {
      if (!source.seenUrls || typeof source.seenUrls !== "object" || Array.isArray(source.seenUrls)) {
        throw new Error(`Invalid legacy URL map in persisted web state for ${site}`);
      }
      for (const [url, legacyLastmod] of Object.entries(source.seenUrls as Record<string, unknown>)) {
        if (!isAllowedSiteUrl(site, url) || (typeof legacyLastmod !== "string" && legacyLastmod !== null)) {
          throw new Error(`Invalid legacy persisted web URL state for ${site}: ${url}`);
        }
        migrated[site].urls[url] = {
          status: site === "openai" ? "metadata_only" : "accepted",
          ...(typeof legacyLastmod === "string" && legacyLastmod !== "seen"
            ? { sitemapLastmod: legacyLastmod }
            : {}),
        };
      }
    }
  }
  return migrated;
}

export function loadWebState(): WebState {
  if (!fs.existsSync(STATE_FILE)) return emptyState();
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as unknown;
  } catch (cause) {
    throw new Error(`Invalid persisted JSON state: ${STATE_FILE}`, { cause });
  }
  return parseWebState(raw);
}

export function saveWebState(state: WebState): void {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  const tempPath = `${STATE_FILE}.${process.pid}.tmp`;
  const ordered: WebState = {
    anthropic: {
      ...state.anthropic,
      urls: Object.fromEntries(
        Object.entries(state.anthropic.urls).sort(([left], [right]) => left.localeCompare(right)),
      ),
    },
    openai: {
      ...state.openai,
      urls: Object.fromEntries(
        Object.entries(state.openai.urls).sort(([left], [right]) => left.localeCompare(right)),
      ),
    },
  };
  fs.writeFileSync(tempPath, `${JSON.stringify(ordered, null, 2)}\n`, "utf-8");
  fs.renameSync(tempPath, STATE_FILE);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

async function fetchRssContent(
  site: "anthropic" | "openai",
  cfg: SiteConfig,
  siteState: SiteState,
  observedAt: string,
): Promise<{ items: WebPageItem[]; totalDiscovered: number; invalidItems: number }> {
  if (!cfg.rssUrl) return { items: [], totalDiscovered: 0, invalidItems: 0 };
  const xml = await rssGet(site, cfg.rssUrl);
  const rssItems = parseRssItems(xml);
  if (rssItems.length === 0) {
    throw new Error(`First-party RSS for ${site} contained no parseable items`);
  }
  const items: WebPageItem[] = [];
  let invalidItems = 0;

  for (const item of rssItems) {
    if (!isAllowedSiteUrl(site, item.url)) {
      invalidItems++;
      continue;
    }
    const previous = siteState.urls[item.url];
    const hash = contentHash(`${item.title}\n${item.description}`);
    if (!item.publishedAt) {
      siteState.urls[item.url] = {
        status: "metadata_only",
        contentHash: hash,
        lastAttemptAt: observedAt,
        lastSuccessAt: observedAt,
      };
      invalidItems++;
      continue;
    }
    const publishedTime = item.publishedAt ? Date.parse(item.publishedAt) : Number.NaN;
    if (Number.isFinite(publishedTime) && publishedTime > Date.parse(observedAt) + MAX_TIMESTAMP_SKEW_MS) {
      // Do not let a clock-skewed/future publication timestamp poison this URL as
      // accepted. Keeping it retryable lets a later run admit it once time catches up.
      siteState.urls[item.url] = {
        ...(previous ?? {}),
        status: "retryable_failed",
        lastAttemptAt: observedAt,
      };
      invalidItems++;
      continue;
    }
    const freshness = classifyWebFreshness(item.publishedAt, undefined, observedAt, previous);
    const alreadyAccepted =
      previous?.status === "accepted" &&
      previous.publishedAt === item.publishedAt &&
      previous.contentHash === hash;
    siteState.urls[item.url] = {
      status: "accepted",
      publishedAt: item.publishedAt,
      contentHash: hash,
      lastAttemptAt: observedAt,
      lastSuccessAt: observedAt,
    };
    // RSS has an authoritative publication date and summary. Existing entries
    // are not re-emitted merely because the feed was fetched again.
    if (alreadyAccepted || freshness !== "newly_published") continue;
    items.push({
      url: item.url,
      title: item.title,
      observedAt,
      publishedAt: item.publishedAt,
      content: item.description,
      site,
      category: item.category,
      freshness,
      visibility: "official_summary",
      contentHash: hash,
    });
  }
  return { items, totalDiscovered: rssItems.length, invalidItems };
}

export async function fetchSiteContent(
  site: "anthropic" | "openai",
  state: WebState,
): Promise<WebFetchResult> {
  const cfg = SITE_CONFIGS[site];
  const siteState = state[site];
  const isFirstRun = Object.keys(siteState.urls).length === 0;
  const observedAt = new Date().toISOString();
  let preferredFeedFailed = false;

  if (cfg.rssUrl) {
    try {
      console.log(`  [web/${site}] Fetching first-party RSS feed...`);
      const rss = await fetchRssContent(site, cfg, siteState, observedAt);
      siteState.lastChecked = observedAt;
      console.log(
        `  [web/${site}] RSS: ${rss.totalDiscovered} items, ${rss.items.length} current, ${rss.invalidItems} invalid`,
      );
      return {
        site,
        siteName: cfg.name,
        fetchSuccess: rss.invalidItems === 0,
        isFirstRun,
        newItems: rss.items,
        totalDiscovered: rss.totalDiscovered,
      };
    } catch (error) {
      preferredFeedFailed = true;
      console.error(`  [web/${site}] first-party RSS failed; falling back to sitemap visibility: ${error}`);
    }
  }

  console.log(`  [web/${site}] Discovering URLs from sitemap...`);
  const discovery = await discoverUrls(site);
  const allDiscovered = discovery.urls;
  if (allDiscovered.length === 0) throw new Error(`No URLs discovered for ${site}`);
  console.log(`  [web/${site}] Discovered ${allDiscovered.length} URLs`);

  // Newest first
  allDiscovered.sort((a, b) => {
    if (!a.lastmod && !b.lastmod) return 0;
    if (!a.lastmod) return 1;
    if (!b.lastmod) return -1;
    return b.lastmod.localeCompare(a.lastmod);
  });

  // sitemap lastmod is only a refetch hint. It is never a publication timestamp.
  const newUrls = allDiscovered.filter(({ loc, lastmod }) => {
    return shouldFetchUrl(siteState.urls[loc], lastmod, Boolean(cfg.metadataOnly));
  });

  // Keep every run bounded. Remaining candidates retain `discovered` state and
  // are processed on later runs instead of causing an unbounded second crawl.
  const toFetch = newUrls.slice(0, MAX_CONTENT_FETCH_PER_RUN);

  console.log(
    `  [web/${site}] ${isFirstRun ? "First run" : "Incremental"}: ` +
      `${newUrls.length} candidate URLs, fetching content for ${toFetch.length}`,
  );

  // Items from metadata-only fallback are visibility signals only. Downstream
  // evidence ranking must not treat them as company activity or publication.
  const items: WebPageItem[] = [];
  let processingFailures = 0;
  if (cfg.metadataOnly) {
    for (const { loc, lastmod } of toFetch) {
      siteState.urls[loc] = {
        status: "metadata_only",
        ...(lastmod ? { sitemapLastmod: lastmod } : {}),
        lastAttemptAt: observedAt,
        lastSuccessAt: observedAt,
      };
      items.push({
        url: loc,
        title: titleFromUrl(loc),
        observedAt,
        ...(lastmod ? { sitemapLastmod: lastmod } : {}),
        content: "",
        site,
        category: urlCategory(loc),
        freshness: "metadata_only",
        visibility: "metadata_only",
      });
    }
  } else {
    // Fetch page content sequentially with a polite delay
    for (const { loc, lastmod } of toFetch) {
      const previous = siteState.urls[loc];
      siteState.urls[loc] = {
        ...(previous ?? { status: "discovered" as const }),
        status: "fetched",
        ...(lastmod ? { sitemapLastmod: lastmod } : {}),
        lastAttemptAt: observedAt,
      };
      try {
        const html = await httpGet(site, loc);
        const title = extractTitle(html) || titleFromUrl(loc);
        const content = extractText(html);
        const dates = extractPageDates(html);
        const hash = contentHash(`${title}\n${content}`);
        const observedTime = Date.parse(observedAt);
        const hasFutureTimestamp = [dates.publishedAt, dates.updatedAt].some(
          (timestamp) => timestamp && Date.parse(timestamp) > observedTime + MAX_TIMESTAMP_SKEW_MS,
        );
        if (hasFutureTimestamp) {
          siteState.urls[loc] = {
            ...(previous ?? {}),
            status: "retryable_failed",
            ...(lastmod ? { sitemapLastmod: lastmod } : {}),
            lastAttemptAt: observedAt,
          };
          processingFailures++;
          console.error(`  [web/${site}] Future page timestamp; retaining retryable state for ${loc}`);
          continue;
        }
        const freshness = classifyWebFreshness(dates.publishedAt, dates.updatedAt, observedAt, previous);
        siteState.urls[loc] = {
          status: "accepted",
          ...(lastmod ? { sitemapLastmod: lastmod } : {}),
          ...(dates.publishedAt ? { publishedAt: dates.publishedAt } : {}),
          ...(dates.updatedAt ? { updatedAt: dates.updatedAt } : {}),
          contentHash: hash,
          lastAttemptAt: observedAt,
          lastSuccessAt: observedAt,
        };
        // A sitemap-only timestamp change with identical content is not news.
        if (previous?.contentHash === hash) continue;
        // Pages without a trustworthy recent page-level date are ingested into
        // state but excluded from current-news output.
        if (freshness === "newly_discovered_historical") continue;
        items.push({
          url: loc,
          title,
          observedAt,
          ...(lastmod ? { sitemapLastmod: lastmod } : {}),
          ...(dates.publishedAt ? { publishedAt: dates.publishedAt } : {}),
          ...(dates.updatedAt ? { updatedAt: dates.updatedAt } : {}),
          content,
          site,
          category: urlCategory(loc),
          freshness,
          visibility: "full_text",
          contentHash: hash,
        });
      } catch (err) {
        siteState.urls[loc] = {
          ...(previous ?? {}),
          status: "retryable_failed",
          ...(lastmod ? { sitemapLastmod: lastmod } : {}),
          lastAttemptAt: observedAt,
        };
        processingFailures++;
        console.error(`  [web/${site}] Failed to fetch ${loc}: ${err}`);
      } finally {
        await sleep(FETCH_DELAY_MS);
      }
    }
  }

  // Preserve unfetched first-run candidates as explicitly discovered so they
  // are not silently poisoned as seen. Existing migrated history is untouched.
  for (const { loc, lastmod } of newUrls.slice(toFetch.length)) {
    if (siteState.urls[loc]) continue;
    siteState.urls[loc] = {
      status: "discovered",
      ...(lastmod ? { sitemapLastmod: lastmod } : {}),
      lastAttemptAt: observedAt,
    };
  }
  siteState.lastChecked = observedAt;

  return {
    site,
    siteName: cfg.name,
    fetchSuccess: !preferredFeedFailed && discovery.failures === 0 && processingFailures === 0,
    isFirstRun,
    newItems: items,
    totalDiscovered: allDiscovered.length,
  };
}
