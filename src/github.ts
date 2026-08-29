/**
 * GitHub API types and fetch helpers.
 * Reads GITHUB_TOKEN and DIGEST_REPO from environment at call time.
 */

import { fetchWithTimeout } from "./http.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoConfig {
  /** Short identifier used for filenames */
  id: string;
  /** GitHub owner/repo slug */
  repo: string;
  /** Human-readable display name */
  name: string;
  /**
   * Fetch multiple pages until items older than `since` are reached.
   * Use for high-volume repos with many daily updates.
   */
  paginated?: boolean;
}

export interface GitHubUser {
  login: string;
}

export interface GitHubLabel {
  name: string;
}

export interface GitHubReactions {
  "+1": number;
}

export interface GitHubItem {
  number: number;
  title: string;
  state: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
  merged_at?: string | null;
  comments: number;
  reactions?: GitHubReactions;
  body?: string | null;
  html_url: string;
  pull_request?: unknown;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body?: string | null;
  published_at: string;
  html_url?: string;
}

export interface RepoFetch {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  /** False when the repository API fetch failed; absent means successful legacy data. */
  fetchSuccess?: boolean;
  /** True when a configured API traversal limit was reached before the time window ended. */
  truncated?: boolean;
}

export type GitHubActivity = "created" | "merged" | "closed" | "engagement_delta";

/** Select the timestamp that actually proves the classified GitHub activity. */
export function githubActivityTimestamp(item: GitHubItem, activity: GitHubActivity): string {
  if (activity === "created") return item.created_at;
  if (activity === "merged") return item.merged_at ?? item.updated_at;
  if (activity === "closed") return item.closed_at ?? item.updated_at;
  return item.updated_at;
}

export interface GitHubItemsResult {
  items: GitHubItem[];
  truncated: boolean;
  pagesFetched: number;
}

export interface GitHubReleasesResult {
  releases: GitHubRelease[];
  truncated: boolean;
  pagesFetched: number;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

/** Maximum pages to fetch for paginated repos (100 items/page). */
const MAX_PAGES = 5;
export const MAX_RECENT_ITEMS = MAX_PAGES * 100;

function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env["GITHUB_TOKEN"] ?? ""}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubGet<T>(url: string, params: Record<string, string> = {}): Promise<T> {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const resp = await fetchWithTimeout(u.toString(), { headers: headers() });
  if (!resp.ok) throw new Error(`GitHub API error ${resp.status} (${url}): ${await resp.text()}`);
  return resp.json() as Promise<T>;
}

async function fetchItemPage(
  repo: string,
  itemType: "issues" | "pulls",
  since: Date,
  page: number,
): Promise<GitHubItem[]> {
  const params: Record<string, string> = {
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: "100",
    page: String(page),
  };
  // /pulls does not support `since`; filter client-side instead
  if (itemType === "issues") params["since"] = since.toISOString();

  const items = await githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/${itemType}`, params);
  return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * Fetch items updated since `since`.
 * Paginated repos: keeps fetching until a page ends before `since` or MAX_PAGES reached.
 * Regular repos: single page of 50.
 */
export async function fetchRecentItems(
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItem[]> {
  return (await fetchRecentItemsWithMeta(cfg, itemType, since)).items;
}

export async function fetchRecentItemsWithMeta(
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItemsResult> {
  if (!cfg.paginated) {
    const params: Record<string, string> = {
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: "50",
    };
    if (itemType === "issues") params["since"] = since.toISOString();
    const items = await githubGet<GitHubItem[]>(
      `https://api.github.com/repos/${cfg.repo}/${itemType}`,
      params,
    );
    return {
      items: itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items,
      truncated: items.length >= 50,
      pagesFetched: 1,
    };
  }

  const all: GitHubItem[] = [];
  let pagesFetched = 0;
  let truncated = false;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchItemPage(cfg.repo, itemType, since, page);
    pagesFetched = page;
    if (items.length === 0) break;
    all.push(...items);
    const last = items[items.length - 1];
    if (last && new Date(last.updated_at) < since) break;
    if (items.length < 100) break;
    if (page === MAX_PAGES) truncated = true;
  }
  return { items: all, truncated, pagesFetched };
}

export async function fetchRecentReleases(repo: string, since: Date): Promise<GitHubRelease[]> {
  return (await fetchRecentReleasesWithMeta(repo, since)).releases;
}

export async function fetchRecentReleasesWithMeta(repo: string, since: Date): Promise<GitHubReleasesResult> {
  const releases: GitHubRelease[] = [];
  let pagesFetched = 0;
  let truncated = false;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await githubGet<GitHubRelease[]>(`https://api.github.com/repos/${repo}/releases`, {
      per_page: "100",
      page: String(page),
    });
    pagesFetched = page;
    if (batch.length === 0) break;
    releases.push(
      ...batch.filter(
        (release) =>
          typeof release.published_at === "string" &&
          Number.isFinite(Date.parse(release.published_at)) &&
          Date.parse(release.published_at) >= since.getTime(),
      ),
    );
    // GitHub's release ordering is not a trustworthy published_at boundary:
    // a long-lived draft can be published after newer-created releases. Stay
    // bounded, but do not stop merely because one page contains an old release.
    if (batch.length < 100) break;
    if (page === MAX_PAGES) truncated = true;
  }
  return { releases, truncated, pagesFetched };
}

export async function ensureLabel(name: string, color: string): Promise<void> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const resp = await fetchWithTimeout(`https://api.github.com/repos/${digestRepo}/labels`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
}

/**
 * Fetch trending skills data from a skills repo (e.g. anthropics/skills).
 * PRs sorted by popularity (comment count); issues sorted by comments.
 * No `since` filter — we want all-time hot items, not just the last 24 h.
 */
export async function fetchSkillsData(repo: string): Promise<{ prs: GitHubItem[]; issues: GitHubItem[] }> {
  const [prs, issuesRaw] = await Promise.all([
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/pulls`, {
      state: "open",
      sort: "popularity",
      direction: "desc",
      per_page: "50",
    }),
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/issues`, {
      state: "all",
      sort: "comments",
      direction: "desc",
      per_page: "50",
    }),
  ]);
  return { prs, issues: issuesRaw.filter((i) => !i.pull_request) };
}

const GITHUB_ISSUE_BODY_LIMIT = 65536;
const TRUNCATION_NOTICE = "\n\n---\n> ⚠️ 内容超过 GitHub Issue 上限，完整报告见提交的 Markdown 文件。";
const MAX_EXISTING_ISSUE_LOOKUP_PAGES = 20;

interface ExistingIssue {
  number: number;
  title: string;
  html_url: string;
  pull_request?: unknown;
}

/** GitHub label colors by label name. Default: "0075ca". */
const LABEL_COLORS: Record<string, string> = {
  openclaw: "e11d48",
  trending: "f9a825",
  hn: "ff6600",
  ph: "da552f",
  weekly: "7c3aed",
  monthly: "0d9488",
  "digest-en": "1d76db",
  "openclaw-en": "f472b6",
  "web-en": "6366f1",
  "trending-en": "fbbf24",
  "hn-en": "fb923c",
  "ph-en": "e8854a",
  arxiv: "b31b1b",
  "arxiv-en": "d44a4a",
  hf: "ff9d00",
  "hf-en": "ffb84d",
  community: "2563eb",
  "community-en": "60a5fa",
};

/**
 * Break GitHub URLs in issue body to prevent cross-repository references.
 * Inserts a zero-width space in "github.com" so GitHub's auto-linker
 * won't create "mentioned this issue" notifications on external repos.
 */
function neutralizeGitHubRefs(text: string): string {
  return (
    text
      // Prevent "mentioned this issue" cross-references
      .replace(/https:\/\/github\.com\//g, "https://github\u200B.com/")
      // Prevent @mention notifications — insert zero-width space after @
      .replace(/@([a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38})/g, "@\u200B$1")
  );
}

async function findExistingIssueByTitle(
  digestRepo: string,
  title: string,
): Promise<ExistingIssue | undefined> {
  for (let page = 1; page <= MAX_EXISTING_ISSUE_LOOKUP_PAGES; page++) {
    const issues = await githubGet<ExistingIssue[]>(`https://api.github.com/repos/${digestRepo}/issues`, {
      state: "all",
      sort: "created",
      direction: "desc",
      per_page: "100",
      page: String(page),
    });
    const existing = issues.find((issue) => issue.title === title && !issue.pull_request);
    if (existing) return existing;
    if (issues.length < 100) return undefined;
  }
  throw new Error(
    `Issue idempotency lookup exceeded ${MAX_EXISTING_ISSUE_LOOKUP_PAGES * 100} entries; refusing to create a possible duplicate`,
  );
}

/**
 * Close open issues created more than `days` days ago.
 * Uses pagination to handle large backlogs. Returns the number of issues closed.
 */
export async function closeStaleIssues(days: number): Promise<number> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return 0;
  const cutoff = new Date(Date.now() - days * 86_400_000);
  let closed = 0;

  // Always re-fetch page 1: closing issues shifts pagination, so incrementing
  // pages would skip items.
  while (true) {
    const issues = await githubGet<{ number: number; created_at: string }[]>(
      `https://api.github.com/repos/${digestRepo}/issues`,
      { state: "open", sort: "created", direction: "asc", per_page: "100" },
    );
    if (issues.length === 0) break;

    const stale = issues.filter((i) => new Date(i.created_at) < cutoff);
    if (stale.length === 0) break;

    await Promise.all(
      stale.map(async (i) => {
        const resp = await fetchWithTimeout(`https://api.github.com/repos/${digestRepo}/issues/${i.number}`, {
          method: "PATCH",
          headers: { ...headers(), "Content-Type": "application/json" },
          body: JSON.stringify({ state: "closed" }),
        });
        if (!resp.ok) console.error(`[github] Failed to close #${i.number}: ${resp.status}`);
      }),
    );
    closed += stale.length;
  }
  return closed;
}

export async function createGitHubIssue(title: string, body: string, label: string): Promise<string> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) throw new Error("DIGEST_REPO is required to publish GitHub issues");
  body = neutralizeGitHubRefs(body);
  if (body.length > GITHUB_ISSUE_BODY_LIMIT) {
    body = body.slice(0, GITHUB_ISSUE_BODY_LIMIT - TRUNCATION_NOTICE.length) + TRUNCATION_NOTICE;
  }

  const existing = await findExistingIssueByTitle(digestRepo, title);
  await ensureLabel(label, LABEL_COLORS[label] ?? "0075ca");
  const endpoint = existing
    ? `https://api.github.com/repos/${digestRepo}/issues/${existing.number}`
    : `https://api.github.com/repos/${digestRepo}/issues`;
  const resp = await fetchWithTimeout(endpoint, {
    method: existing ? "PATCH" : "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(
      existing ? { body, labels: [label], state: "open" } : { title, body, labels: [label] },
    ),
  });
  if (!resp.ok) {
    throw new Error(`Failed to ${existing ? "update" : "create"} issue: ${await resp.text()}`);
  }
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
}
