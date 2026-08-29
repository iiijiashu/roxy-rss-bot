/**
 * Evidence-first daily pipeline.
 *
 * Sources -> normalized evidence -> freshness verification -> event grouping /
 * dedup -> deterministic ranking -> one structured LLM synthesis -> mechanical
 * quality gate -> deterministic Chinese Markdown rendering.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { fetchArxivData } from "./arxiv.ts";
import { loadConfig } from "./config.ts";
import { toCstDateStr } from "./date.ts";
import { fetchDevtoData } from "./devto.ts";
import {
  buildSynthesisPrompt,
  DAILY_SELECTION_POLICY,
  groupEvidence,
  MAX_DAILY_DEVELOPMENTS,
  MIN_DAILY_DEVELOPMENTS,
  renderChineseDigest,
  selectTopEvents,
  validateSynthesis,
  type EvidenceCategory,
  type EvidenceRecord,
  type QualityReport,
  type SynthesisResult,
} from "./evidence.ts";
import {
  fetchRecentItemsWithMeta,
  fetchRecentReleasesWithMeta,
  githubActivityTimestamp,
  type GitHubActivity,
  type GitHubItem,
  type RepoConfig,
} from "./github.ts";
import { fetchHfData } from "./hf.ts";
import { fetchHnData } from "./hn.ts";
import { fetchLobstersData } from "./lobsters.ts";
import { fetchPhData } from "./ph.ts";
import { callLlm, getLlmDiagnostics, parseLlmJson } from "./report.ts";
import { PublicationStatus, classifyFailure } from "./run-status.ts";
import { fetchTrendingData } from "./trending.ts";
import { fetchSiteContent, loadWebState, saveWebState, type WebPageItem } from "./web.ts";

interface GitHubSnapshotEntry {
  comments: number;
  reactions: number;
  state: string;
  updatedAt: string;
  observedAt: string;
}

interface GitHubState {
  schemaVersion: 1;
  items: Record<string, GitHubSnapshotEntry>;
}

interface EventState {
  schemaVersion: 2;
  events: Record<string, { eventKey: string; lastPublishedAt: string }>;
}

interface DigestArtifact {
  schemaVersion: 1;
  date: string;
  observedAt: string;
  developments: SynthesisResult["developments"];
}

const GITHUB_STATE_FILE = path.join("digests", "github-state.json");
const EVENT_STATE_FILE = path.join("digests", "event-state.json");
const RECENT_WINDOW_MS = 36 * 60 * 60 * 1000;
const MAX_COMPARABLE_SNAPSHOT_AGE_MS = 72 * 60 * 60 * 1000;

function readJson(filePath: string): unknown | undefined {
  if (!fs.existsSync(filePath)) return undefined;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as unknown;
  } catch (cause) {
    throw new Error(`Invalid persisted JSON state: ${filePath}`, { cause });
  }
}

function writeJson(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, "utf-8");
  fs.renameSync(tempPath, filePath);
}

function sortedRecord<T>(value: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)));
}

function saveLlmDiagnostics(digestDir: string): void {
  writeJson(
    path.join(digestDir, "llm-diagnostics.json"),
    getLlmDiagnostics() ?? {
      provider: process.env["LLM_PROVIDER"] ?? "unknown",
      diagnosticsAvailable: false,
    },
  );
}

function loadGitHubState(): GitHubState {
  const value = readJson(GITHUB_STATE_FILE);
  if (value === undefined) return { schemaVersion: 1, items: {} };
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Invalid GitHub state schema: ${GITHUB_STATE_FILE}`);
  }
  const candidate = value as Partial<GitHubState>;
  if (
    candidate.schemaVersion !== 1 ||
    !candidate.items ||
    typeof candidate.items !== "object" ||
    Array.isArray(candidate.items)
  ) {
    throw new Error(`Invalid GitHub state schema: ${GITHUB_STATE_FILE}`);
  }
  for (const [key, entry] of Object.entries(candidate.items)) {
    if (
      !key ||
      !entry ||
      !Number.isInteger(entry.comments) ||
      entry.comments < 0 ||
      !Number.isInteger(entry.reactions) ||
      entry.reactions < 0 ||
      typeof entry.state !== "string" ||
      !entry.state ||
      !Number.isFinite(Date.parse(entry.updatedAt)) ||
      !Number.isFinite(Date.parse(entry.observedAt))
    ) {
      throw new Error(`Invalid GitHub state entry: ${key}`);
    }
  }
  return candidate as GitHubState;
}

function loadEventState(): EventState {
  const value = readJson(EVENT_STATE_FILE);
  if (value === undefined) return { schemaVersion: 2, events: {} };
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Invalid event state schema: ${EVENT_STATE_FILE}`);
  }
  const candidate = value as Partial<EventState>;
  if (
    candidate.schemaVersion !== 2 ||
    !candidate.events ||
    typeof candidate.events !== "object" ||
    Array.isArray(candidate.events)
  ) {
    throw new Error(`Invalid event state schema: ${EVENT_STATE_FILE}`);
  }
  for (const [noveltyKey, entry] of Object.entries(candidate.events)) {
    if (
      !noveltyKey ||
      !entry ||
      typeof entry.eventKey !== "string" ||
      !entry.eventKey ||
      !Number.isFinite(Date.parse(entry.lastPublishedAt))
    ) {
      throw new Error(`Invalid event state entry: ${noveltyKey}`);
    }
  }
  return candidate as EventState;
}

function githubKey(repo: string, item: GitHubItem, kind: "issue" | "pr"): string {
  return `${repo}:${kind}:${item.number}`;
}

function reactionCount(item: GitHubItem): number {
  return item.reactions?.["+1"] ?? 0;
}

function isSince(value: string | null | undefined, since: Date): boolean {
  return Boolean(value && Date.parse(value) >= since.getTime());
}

function comparableSnapshot(
  value: GitHubSnapshotEntry | undefined,
  observedAt: string,
): GitHubSnapshotEntry | undefined {
  if (!value) return undefined;
  const age = Date.parse(observedAt) - Date.parse(value.observedAt);
  return Number.isFinite(age) && age >= 0 && age <= MAX_COMPARABLE_SNAPSHOT_AGE_MS ? value : undefined;
}

function categoryForText(value: string, fallback: EvidenceCategory): EvidenceCategory {
  const text = value.toLowerCase();
  if (/\b(model|gpt|claude|gemini|qwen|llama|glm|kimi|mistral)\b/.test(text)) return "model";
  if (/\b(agent|agentic|codex|claude code|copilot|harness|tool use|mcp)\b/.test(text)) return "agent";
  if (
    /\b(inference|latency|throughput|context|memory|cache|api|serving|runtime|database|gpu|kernel)\b/.test(
      text,
    )
  ) {
    return "infrastructure";
  }
  if (/\b(sdk|cli|framework|developer tool|ide|extension)\b/.test(text)) return "tool";
  return fallback;
}

function webEvidence(item: WebPageItem): EvidenceRecord {
  const content = `${item.title} ${item.content}`;
  const category = categoryForText(content, /research|paper/i.test(item.category) ? "research" : "tool");
  return {
    id: `web:${item.site}:${Buffer.from(item.url).toString("base64url").slice(0, 48)}`,
    sourceType: "official_web",
    sourceName: item.site === "openai" ? "OpenAI 官方" : "Anthropic 官方",
    authority: "primary",
    url: item.url,
    title: item.title,
    ...(item.publishedAt ? { publishedAt: item.publishedAt } : {}),
    ...(item.updatedAt ? { updatedAt: item.updatedAt } : {}),
    observedAt: item.observedAt,
    content: item.content,
    category,
    freshness:
      item.freshness === "metadata_only"
        ? "metadata_only"
        : item.freshness === "newly_discovered_historical"
          ? "historical"
          : item.freshness,
    visibility: item.visibility,
    confidence: item.visibility === "full_text" ? 0.98 : item.visibility === "official_summary" ? 0.95 : 0.25,
    metadata: {
      site: item.site,
      ...(item.sitemapLastmod ? { sitemap_lastmod: item.sitemapLastmod } : {}),
      ...(item.contentHash ? { content_hash: item.contentHash } : {}),
    },
  };
}

function githubItemEvidence(
  cfg: RepoConfig,
  item: GitHubItem,
  kind: "issue" | "pr",
  activity: GitHubActivity,
  observedAt: string,
  previous?: GitHubSnapshotEntry,
): EvidenceRecord {
  const commentsDelta = previous ? Math.max(0, item.comments - previous.comments) : 0;
  const reactionsDelta = previous ? Math.max(0, reactionCount(item) - previous.reactions) : 0;
  const observationIntervalHours = previous
    ? Math.max(0, (Date.parse(observedAt) - Date.parse(previous.observedAt)) / 3_600_000)
    : undefined;
  const category = categoryForText(
    `${cfg.name} ${item.title} ${item.body ?? ""}`,
    kind === "pr" ? "tool" : "agent",
  );
  const activityAt = githubActivityTimestamp(item, activity);
  return {
    id: `github:${cfg.repo}:${kind}:${item.number}:${activity}`,
    sourceType: kind === "pr" ? "github_pr" : "github_issue",
    sourceName: `${cfg.name} GitHub`,
    authority: "primary-community",
    url: item.html_url,
    title: `${cfg.name}: ${item.title}`,
    ...(activity === "created" ? { publishedAt: activityAt } : { updatedAt: activityAt }),
    observedAt,
    content: (item.body ?? "").replace(/\s+/g, " ").trim().slice(0, 2_000),
    category,
    freshness: "new_activity",
    visibility: "structured_api",
    confidence: activity === "merged" ? 0.98 : activity === "created" || activity === "closed" ? 0.92 : 0.8,
    metadata: {
      repo: cfg.repo,
      kind,
      issue_or_pr_number: item.number,
      activity,
      lifetime_comments: item.comments,
      plus_one_reactions: reactionCount(item),
      comments_delta_since_previous_observation: commentsDelta,
      reactions_delta_since_previous_observation: reactionsDelta,
      ...(Number.isFinite(observationIntervalHours)
        ? { observation_interval_hours: Number(observationIntervalHours!.toFixed(2)) }
        : {}),
      comment_bodies_available: false,
      state: item.state,
    },
  };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  const runWorker = async (): Promise<void> => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index]!, index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(Math.max(1, concurrency), items.length) }, runWorker));
  return results;
}

async function collectGitHubEvidence(
  configs: RepoConfig[],
  since: Date,
  observedAt: string,
  previousState: GitHubState,
  nextState: GitHubState,
  status: PublicationStatus,
): Promise<EvidenceRecord[]> {
  const recordsByRepo = await mapWithConcurrency(configs, 4, async (baseCfg) => {
    const records: EvidenceRecord[] = [];
    const cfg = { ...baseCfg, paginated: true };
    const component = `source/github/${cfg.id}`;
    try {
      const [issueResult, prResult, releaseResult] = await Promise.all([
        fetchRecentItemsWithMeta(cfg, "issues", since),
        fetchRecentItemsWithMeta(cfg, "pulls", since),
        fetchRecentReleasesWithMeta(cfg.repo, since),
      ]);
      const issuesRaw = issueResult.items;
      const prs = prResult.items;
      const releases = releaseResult.releases;
      const issues = issuesRaw.filter((item) => !item.pull_request);
      const capped = issueResult.truncated || prResult.truncated || releaseResult.truncated;
      status.record(component, capped ? "degraded" : "ok", capped ? "api_cap_reached" : undefined);

      for (const release of releases) {
        records.push({
          id: `github:${cfg.repo}:release:${release.tag_name}`,
          sourceType: "github_release",
          sourceName: `${cfg.name} Release`,
          authority: "primary",
          url:
            release.html_url ??
            `https://github.com/${cfg.repo}/releases/tag/${encodeURIComponent(release.tag_name)}`,
          title: `${cfg.name} ${release.tag_name}: ${release.name || "Release"}`,
          publishedAt: release.published_at,
          observedAt,
          content: (release.body ?? "").replace(/\s+/g, " ").trim().slice(0, 2_500),
          category: categoryForText(`${cfg.name} ${release.name} ${release.body ?? ""}`, "tool"),
          freshness: "newly_published",
          visibility: "structured_api",
          confidence: 0.99,
          metadata: { repo: cfg.repo, release_tag: release.tag_name },
        });
      }

      for (const issue of issues) {
        const key = githubKey(cfg.repo, issue, "issue");
        const previous = comparableSnapshot(previousState.items[key], observedAt);
        const commentsDelta = previous ? issue.comments - previous.comments : 0;
        const reactionsDelta = previous ? reactionCount(issue) - previous.reactions : 0;
        let activity: GitHubActivity | undefined;
        if (isSince(issue.closed_at, since)) activity = "closed";
        else if (isSince(issue.created_at, since)) activity = "created";
        else if (previous && (commentsDelta > 0 || reactionsDelta > 0)) activity = "engagement_delta";
        if (activity) records.push(githubItemEvidence(cfg, issue, "issue", activity, observedAt, previous));
        nextState.items[key] = {
          comments: issue.comments,
          reactions: reactionCount(issue),
          state: issue.state,
          updatedAt: issue.updated_at,
          observedAt,
        };
      }

      for (const pr of prs) {
        const key = githubKey(cfg.repo, pr, "pr");
        const previous = comparableSnapshot(previousState.items[key], observedAt);
        const commentsDelta = previous ? pr.comments - previous.comments : 0;
        const reactionsDelta = previous ? reactionCount(pr) - previous.reactions : 0;
        let activity: GitHubActivity | undefined;
        if (isSince(pr.merged_at, since)) activity = "merged";
        else if (isSince(pr.created_at, since)) activity = "created";
        else if (isSince(pr.closed_at, since)) activity = "closed";
        else if (previous && (commentsDelta > 0 || reactionsDelta > 0)) activity = "engagement_delta";
        if (activity) records.push(githubItemEvidence(cfg, pr, "pr", activity, observedAt, previous));
        nextState.items[key] = {
          comments: pr.comments,
          reactions: reactionCount(pr),
          state: pr.state,
          updatedAt: pr.updated_at,
          observedAt,
        };
      }
    } catch (error) {
      status.record(component, "degraded", classifyFailure(error));
      console.error(`  [${component}] failed: ${error}`);
    }
    return records;
  });
  return recordsByRepo.flat();
}

export async function runDaily(): Promise<void> {
  const now = new Date();
  const observedAt = now.toISOString();
  const dateStr = toCstDateStr(now);
  const since = new Date(now.getTime() - RECENT_WINDOW_MS);
  const digestDir = path.join("digests", dateStr);
  fs.mkdirSync(digestDir, { recursive: true });

  const status = new PublicationStatus(dateStr, process.env["LLM_PROVIDER"] ?? "unknown");
  const config = loadConfig();
  const webState = loadWebState();
  const previousGitHubState = loadGitHubState();
  const nextGitHubState: GitHubState = { schemaVersion: 1, items: { ...previousGitHubState.items } };
  const eventState = loadEventState();
  const evidence: EvidenceRecord[] = [];

  const [
    anthropicResult,
    openaiResult,
    arxivResult,
    trendingResult,
    hnResult,
    phResult,
    hfResult,
    devtoResult,
    lobstersResult,
  ] = await Promise.allSettled([
    fetchSiteContent("anthropic", webState),
    fetchSiteContent("openai", webState),
    fetchArxivData(),
    fetchTrendingData(),
    fetchHnData(),
    fetchPhData(),
    fetchHfData(),
    fetchDevtoData(),
    fetchLobstersData(),
  ]);

  for (const [site, result] of [
    ["anthropic", anthropicResult],
    ["openai", openaiResult],
  ] as const) {
    const component = `source/web/${site}`;
    if (result.status === "fulfilled") {
      status.record(
        component,
        result.value.fetchSuccess === false ? "degraded" : "ok",
        result.value.fetchSuccess === false ? "source_fetch_failed" : undefined,
      );
      evidence.push(...result.value.newItems.map(webEvidence));
    } else {
      status.record(component, "degraded", classifyFailure(result.reason));
    }
  }

  if (arxivResult.status === "fulfilled") {
    status.record(
      "source/arxiv",
      arxivResult.value.fetchSuccess ? "ok" : "degraded",
      arxivResult.value.fetchSuccess ? undefined : "source_fetch_failed",
    );
    for (const paper of arxivResult.value.papers) {
      evidence.push({
        id: `arxiv:${paper.id.split("/").pop() ?? paper.id}`,
        sourceType: "paper",
        sourceName: "arXiv 原文",
        authority: "primary",
        url: paper.url,
        title: paper.title,
        publishedAt: paper.published,
        updatedAt: paper.updated,
        observedAt,
        content: `${paper.summary} Authors: ${paper.authors.join(", ")}`,
        category: "paper",
        freshness: "newly_published",
        visibility: "structured_api",
        confidence: 0.95,
        metadata: { categories: paper.categories.join(",") },
      });
    }
  } else {
    status.record("source/arxiv", "degraded", classifyFailure(arxivResult.reason));
  }

  if (trendingResult.status === "fulfilled") {
    status.record(
      "source/trending",
      trendingResult.value.trendingFetchSuccess ? "ok" : "degraded",
      trendingResult.value.trendingFetchSuccess ? undefined : "source_fetch_failed",
    );
    for (const repo of trendingResult.value.trendingRepos.filter((item) => item.todayStars >= 100)) {
      evidence.push({
        id: `trending:${repo.fullName}`,
        sourceType: "github_trending",
        sourceName: "GitHub Trending",
        authority: "secondary",
        url: repo.url,
        title: repo.fullName,
        observedAt,
        content: `${repo.description} Language: ${repo.language}. Stars today: ${repo.todayStars}. Total stars: ${repo.totalStars}.`,
        category: categoryForText(`${repo.fullName} ${repo.description}`, "open_source"),
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 0.78,
        metadata: { stars_today: repo.todayStars, total_stars: repo.totalStars, forks: repo.forks },
      });
    }
  } else {
    status.record("source/trending", "degraded", classifyFailure(trendingResult.reason));
  }

  if (hnResult.status === "fulfilled") {
    status.record(
      "source/hn",
      hnResult.value.fetchSuccess ? "ok" : "degraded",
      hnResult.value.fetchSuccess ? undefined : "source_fetch_failed",
    );
    for (const story of hnResult.value.stories) {
      evidence.push({
        id: `hn:${story.id}`,
        sourceType: "hn_story",
        sourceName: "Hacker News",
        authority: "community-index",
        url: story.url,
        title: story.title,
        publishedAt: story.createdAt,
        observedAt,
        content: "",
        category: categoryForText(story.title, "tool"),
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 0.55,
        metadata: {
          hn_url: story.hnUrl,
          score: story.points,
          comment_count: story.comments,
          comment_bodies_available: false,
        },
      });
    }
  } else {
    status.record("source/hn", "degraded", classifyFailure(hnResult.reason));
  }

  if (phResult.status === "fulfilled") {
    status.record(
      "source/product-hunt",
      phResult.value.fetchSuccess ? "ok" : "skipped",
      phResult.value.fetchSuccess ? undefined : "source_unavailable",
    );
    for (const product of phResult.value.products.slice(0, 5)) {
      evidence.push({
        id: `product-hunt:${product.id}`,
        sourceType: "product_hunt_launch",
        sourceName: "Product Hunt",
        authority: "primary-community",
        url: product.url,
        title: `${product.name}: ${product.tagline}`,
        publishedAt: product.createdAt,
        observedAt,
        content: `${product.tagline} Topics: ${product.topics.join(", ")}. Website: ${product.website}`,
        category: categoryForText(`${product.name} ${product.tagline} ${product.topics.join(" ")}`, "tool"),
        freshness: "newly_published",
        visibility: "structured_api",
        confidence: 0.82,
        metadata: {
          votes: product.votesCount,
          lifetime_comments: product.commentsCount,
          comment_bodies_available: false,
        },
      });
    }
  } else {
    status.record("source/product-hunt", "degraded", classifyFailure(phResult.reason));
  }

  if (hfResult.status === "fulfilled") {
    status.record(
      "source/hugging-face",
      hfResult.value.fetchSuccess ? "ok" : "degraded",
      hfResult.value.fetchSuccess ? undefined : "source_fetch_failed",
    );
    for (const model of hfResult.value.models.slice(0, 5)) {
      evidence.push({
        id: `hugging-face:${model.id}`,
        sourceType: "hugging_face_model",
        sourceName: "Hugging Face Hub",
        authority: "primary-community",
        url: model.url,
        title: model.id,
        ...(Number.isFinite(Date.parse(model.lastModified)) ? { updatedAt: model.lastModified } : {}),
        observedAt,
        content: `Pipeline: ${model.pipelineTag}. Tags: ${model.tags.join(", ")}.`,
        category: "model",
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 0.78,
        metadata: { likes: model.likes, downloads: model.downloads, trend_window: "7d" },
      });
    }
  } else {
    status.record("source/hugging-face", "degraded", classifyFailure(hfResult.reason));
  }

  if (devtoResult.status === "fulfilled") {
    status.record(
      "source/devto",
      devtoResult.value.fetchSuccess ? "ok" : "degraded",
      devtoResult.value.fetchSuccess ? undefined : "source_fetch_failed",
    );
    for (const article of devtoResult.value.articles) {
      evidence.push({
        id: `devto:${article.id}`,
        sourceType: "devto_article",
        sourceName: "Dev.to",
        authority: "secondary",
        url: article.url,
        title: article.title,
        publishedAt: article.publishedAt,
        observedAt,
        content: article.description,
        category: categoryForText(
          `${article.title} ${article.description} ${article.tags.join(" ")}`,
          "tool",
        ),
        freshness: "newly_published",
        visibility: "official_summary",
        confidence: 0.65,
        metadata: {
          reactions: article.positiveReactionsCount,
          lifetime_comments: article.commentsCount,
          comment_bodies_available: false,
        },
      });
    }
  } else {
    status.record("source/devto", "degraded", classifyFailure(devtoResult.reason));
  }

  if (lobstersResult.status === "fulfilled") {
    status.record(
      "source/lobsters",
      lobstersResult.value.fetchSuccess ? "ok" : "degraded",
      lobstersResult.value.fetchSuccess ? undefined : "source_fetch_failed",
    );
    for (const story of lobstersResult.value.stories) {
      evidence.push({
        id: `lobsters:${Buffer.from(story.commentsUrl).toString("base64url").slice(0, 32)}`,
        sourceType: "lobsters_story",
        sourceName: "Lobsters",
        authority: "community-index",
        url: story.url,
        title: story.title,
        publishedAt: story.publishedAt,
        observedAt,
        content: "",
        category: categoryForText(`${story.title} ${story.tags.join(" ")}`, "tool"),
        freshness: "observed_signal",
        visibility: "structured_api",
        confidence: 0.55,
        metadata: {
          discussion_url: story.commentsUrl,
          score: story.score,
          comment_count: story.commentCount,
          comment_bodies_available: false,
        },
      });
    }
  } else {
    status.record("source/lobsters", "degraded", classifyFailure(lobstersResult.reason));
  }

  const repoConfigs = [config.cliRepos, [config.openclaw], config.openclawPeers].flat();
  evidence.push(
    ...(await collectGitHubEvidence(
      repoConfigs,
      since,
      observedAt,
      previousGitHubState,
      nextGitHubState,
      status,
    )),
  );

  const events = groupEvidence(evidence);
  const previousKeys = new Set(Object.keys(eventState.events));
  const previousNoveltyKeys = [...previousKeys].sort();
  const selected = selectTopEvents(events, {
    previousKeys: new Set(previousNoveltyKeys),
    ...DAILY_SELECTION_POLICY,
  });
  const enoughEvidence = selected.length >= MIN_DAILY_DEVELOPMENTS;
  status.record(
    "evidence/group-rank",
    enoughEvidence ? "ok" : "degraded",
    enoughEvidence ? undefined : "insufficient_eligible_events",
  );
  console.log(`[evidence] records=${evidence.length} grouped=${events.length} selected=${selected.length}`);

  writeJson(path.join(digestDir, "evidence.json"), {
    schemaVersion: 2,
    observedAt,
    records: evidence,
    events,
    selectedEventIds: selected.map((event) => event.id),
    selection: {
      previousNoveltyKeys,
      policy: DAILY_SELECTION_POLICY,
    },
  });

  if (!enoughEvidence) {
    const quality: QualityReport = {
      schemaVersion: 1,
      passed: false,
      status: "fail",
      eligibleEventCount: selected.length,
      developmentCount: 0,
      duplicateRatio: 0,
      checks: [
        {
          name: "eligible_events",
          passed: false,
          detail: `need ${MIN_DAILY_DEVELOPMENTS}..${MAX_DAILY_DEVELOPMENTS}, found ${selected.length}`,
        },
      ],
      violations: [`fewer than ${MIN_DAILY_DEVELOPMENTS} evidence-qualified current events`],
    };
    writeJson(path.join(digestDir, "quality-report.json"), quality);
    status.record("quality", "degraded", "insufficient_eligible_events");
    saveLlmDiagnostics(digestDir);
    status.save();
    status.logSummary(getLlmDiagnostics());
    throw new Error(
      `Only ${selected.length} evidence-qualified events; refusing to pad the daily digest to ${MIN_DAILY_DEVELOPMENTS}`,
    );
  }

  const basePrompt = buildSynthesisPrompt(selected, evidence);
  let synthesis: SynthesisResult | undefined;
  let quality: QualityReport | undefined;
  let correction = "";
  let lastSynthesisError: unknown;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const component = `synthesis/zh/attempt-${attempt}`;
    try {
      const raw = await callLlm(`${basePrompt}${correction}`, 6_000);
      const candidate = parseLlmJson<SynthesisResult>(raw);
      const candidateQuality = validateSynthesis(candidate, selected, evidence);
      if (candidateQuality.status === "pass") {
        synthesis = candidate;
        quality = candidateQuality;
        status.record(component, "ok");
        break;
      }
      status.record(component, "degraded", "quality_gate_failed");
      lastSynthesisError = new Error(candidateQuality.violations.join("; "));
      correction = `\n\n上一轮输出被机械质量门拒绝。必须修正以下问题后重新输出完整 JSON：\n- ${candidateQuality.violations.join("\n- ")}\n`;
    } catch (error) {
      lastSynthesisError = error;
      status.record(component, "degraded", classifyFailure(error));
      correction =
        "\n\n上一轮不是合法且可验证的严格 JSON。重新输出完整 JSON，不要解释，不要 Markdown fence。\n";
    }
  }

  if (!synthesis || !quality) {
    const failedQuality: QualityReport = {
      schemaVersion: 1,
      passed: false,
      status: "fail",
      eligibleEventCount: selected.length,
      developmentCount: 0,
      duplicateRatio: 0,
      checks: [{ name: "synthesis", passed: false, detail: "two bounded synthesis attempts failed" }],
      violations: [String(lastSynthesisError ?? "unknown synthesis failure")],
    };
    writeJson(path.join(digestDir, "quality-report.json"), failedQuality);
    status.record("quality", "degraded", "quality_gate_failed");
    saveLlmDiagnostics(digestDir);
    status.save();
    status.logSummary(getLlmDiagnostics());
    throw lastSynthesisError ?? new Error("Synthesis failed after two bounded attempts");
  }

  writeJson(path.join(digestDir, "quality-report.json"), quality);

  const markdown = renderChineseDigest(dateStr, synthesis.developments, selected, evidence);
  const digestArtifact: DigestArtifact = {
    schemaVersion: 1,
    date: dateStr,
    observedAt,
    developments: synthesis.developments,
  };
  writeJson(path.join(digestDir, "digest.json"), digestArtifact);
  writeJson(path.join(digestDir, "highlights.json"), {
    schemaVersion: 1,
    date: dateStr,
    zh: { digest: synthesis.developments.slice(0, 5).map((development) => development.title) },
    en: {},
  });
  fs.writeFileSync(path.join(digestDir, "digest.md"), markdown, "utf-8");
  status.record("artifact/digest", "ok");
  status.record("quality", "ok");

  // State is committed only after successful synthesis + quality validation.
  saveWebState(webState);
  const eventRetentionCutoff = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  for (const [key, entry] of Object.entries(nextGitHubState.items)) {
    const lastObserved = Date.parse(entry.observedAt);
    if (!Number.isFinite(lastObserved) || lastObserved < eventRetentionCutoff)
      delete nextGitHubState.items[key];
  }
  nextGitHubState.items = sortedRecord(nextGitHubState.items);
  writeJson(GITHUB_STATE_FILE, nextGitHubState);
  for (const [noveltyKey, entry] of Object.entries(eventState.events)) {
    const lastPublished = Date.parse(entry.lastPublishedAt);
    if (!Number.isFinite(lastPublished) || lastPublished < eventRetentionCutoff)
      delete eventState.events[noveltyKey];
  }
  for (const event of selected) {
    eventState.events[event.noveltyKey] = { eventKey: event.key, lastPublishedAt: observedAt };
  }
  eventState.events = sortedRecord(eventState.events);
  writeJson(EVENT_STATE_FILE, eventState);

  saveLlmDiagnostics(digestDir);
  status.save();
  status.logSummary(getLlmDiagnostics());
  console.log(
    `[daily] wrote ${path.join(digestDir, "digest.md")} with ${synthesis.developments.length} developments`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runDaily().catch((error) => {
    console.error(
      `[daily] fatal: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`,
    );
    process.exitCode = 1;
  });
}
