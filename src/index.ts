/**
 * agents-radar: daily digest for AI CLI tools and OpenClaw.
 *
 * Env vars:
 *   LLM_PROVIDER        - "anthropic" | "openai" | "agnes" | "openrouter" | "deepseek"
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 *
 * Provider-specific env vars — see src/providers/ for full list.
 */

import fs from "node:fs";
import path from "node:path";
import {
  type GitHubItem,
  type RepoFetch,
  fetchRecentItems,
  fetchRecentReleases,
  fetchSkillsData,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildCliPrompt,
  buildPeerPrompt,
  buildComparisonPrompt,
  buildPeersComparisonPrompt,
  buildSkillsPrompt,
} from "./prompts.ts";
import { buildTrendingPrompt, buildHighlightsPrompt, type ReportHighlights } from "./prompts-data.ts";
import {
  callLlm,
  parseLlmJson,
  assertReportHighlights,
  saveFile,
  autoGenFooter,
  getLlmDiagnostics,
  LLM_TOKENS_TRENDING,
} from "./report.ts";
import { buildCliReportContent, buildOpenclawReportContent } from "./report-builders.ts";
import {
  saveWebReport,
  saveTrendingReport,
  saveHnReport,
  savePhReport,
  saveArxivReport,
  saveHfReport,
  saveCommunityReport,
} from "./report-savers.ts";
import { loadWebState, saveWebState, fetchSiteContent, type WebFetchResult, type WebState } from "./web.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { fetchHnData, type HnData } from "./hn.ts";
import { fetchPhData, type PhData } from "./ph.ts";
import { fetchArxivData, type ArxivData } from "./arxiv.ts";
import { fetchHfData, type HfData } from "./hf.ts";
import { fetchDevtoData, type DevtoData } from "./devto.ts";
import { fetchLobstersData, type LobstersData } from "./lobsters.ts";
import { loadConfig } from "./config.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { type Lang, MSG, ISSUE_LABELS, CLI_ISSUE_TITLE, OPENCLAW_ISSUE_TITLE } from "./i18n.ts";
import { PublicationStatus, classifyFailure } from "./run-status.ts";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

const {
  cliRepos: CLI_REPOS,
  skillsRepo: CLAUDE_SKILLS_REPO,
  openclaw: OPENCLAW,
  openclawPeers: OPENCLAW_PEERS,
} = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch
// ---------------------------------------------------------------------------

async function fetchAllData(
  since: Date,
  webState: WebState,
): Promise<{
  fetched: RepoFetch[];
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[]; fetchSuccess: boolean };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
  phData: PhData;
  arxivData: ArxivData;
  hfData: HfData;
  devtoData: DevtoData;
  lobstersData: LobstersData;
}> {
  const allConfigs = [...CLI_REPOS, OPENCLAW, ...OPENCLAW_PEERS];
  console.log(
    `  Tracking: ${allConfigs.map((r) => r.id).join(", ")}, claude-code-skills, web, hn, ph, arxiv, hf, devto, lobsters`,
  );

  const [
    fetched,
    skillsData,
    webResults,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  ] = await Promise.all([
    Promise.all(
      allConfigs.map(async (cfg) => {
        try {
          const [issuesRaw, prs, releases] = await Promise.all([
            fetchRecentItems(cfg, "issues", since),
            fetchRecentItems(cfg, "pulls", since),
            fetchRecentReleases(cfg.repo, since),
          ]);
          const issues = issuesRaw.filter((i) => !i.pull_request);
          console.log(
            `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`,
          );
          return { cfg, issues, prs, releases, fetchSuccess: true };
        } catch (err) {
          console.error(`  [${cfg.id}] fetch failed: ${err}`);
          return { cfg, issues: [], prs: [], releases: [], fetchSuccess: false };
        }
      }),
    ),
    fetchSkillsData(CLAUDE_SKILLS_REPO)
      .then((d) => {
        console.log(`  [claude-code-skills] prs: ${d.prs.length}, issues: ${d.issues.length}`);
        return { ...d, fetchSuccess: true };
      })
      .catch((err) => {
        console.error(`  [claude-code-skills] fetch failed: ${err}`);
        return { prs: [] as GitHubItem[], issues: [] as GitHubItem[], fetchSuccess: false };
      }),
    Promise.all([
      fetchSiteContent("anthropic", webState).catch((err): WebFetchResult => {
        console.error(`  [web/anthropic] fetch failed: ${err}`);
        return {
          site: "anthropic",
          siteName: "Anthropic (Claude)",
          fetchSuccess: false,
          isFirstRun: false,
          newItems: [],
          totalDiscovered: 0,
        };
      }),
      fetchSiteContent("openai", webState).catch((err): WebFetchResult => {
        console.error(`  [web/openai] fetch failed: ${err}`);
        return {
          site: "openai",
          siteName: "OpenAI",
          fetchSuccess: false,
          isFirstRun: false,
          newItems: [],
          totalDiscovered: 0,
        };
      }),
    ]),
    fetchTrendingData().catch(
      (): TrendingData => ({
        trendingRepos: [],
        searchRepos: [],
        trendingFetchSuccess: false,
      }),
    ),
    fetchHnData().catch((): HnData => ({ stories: [], fetchSuccess: false })),
    fetchPhData().catch((): PhData => ({ products: [], fetchSuccess: false })),
    fetchArxivData().catch((): ArxivData => ({ papers: [], fetchSuccess: false })),
    fetchHfData().catch((): HfData => ({ models: [], fetchSuccess: false })),
    fetchDevtoData().catch((): DevtoData => ({ articles: [], fetchSuccess: false })),
    fetchLobstersData().catch((): LobstersData => ({ stories: [], fetchSuccess: false })),
  ]);

  return {
    fetched,
    skillsData,
    webResults,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

/** Call LLM with logging and error fallback. */
async function summarize(
  id: string,
  prompt: string,
  failMsg: string,
  status: PublicationStatus,
  component: string,
  maxTokens?: number,
): Promise<string> {
  console.log(`  [${id}] Calling LLM for summary...`);
  try {
    const result = await callLlm(prompt, maxTokens);
    status.record(component, "ok");
    return result;
  } catch (err) {
    const code = classifyFailure(err);
    status.record(component, "degraded", code);
    console.error(`  [${id}] LLM call failed classification=${code}: ${err}`);
    return failMsg;
  }
}

/** Summarize a repo's activity, returning a RepoDigest. Skips LLM if no data. */
async function summarizeRepo(
  { cfg, issues, prs, releases }: RepoFetch,
  prompt: string,
  noActivityMsg: string,
  failMsg: string,
  status: PublicationStatus,
  component: string,
): Promise<RepoDigest> {
  if (!issues.length && !prs.length && !releases.length) {
    console.log(`  [${cfg.id}] No activity, skipping LLM call`);
    status.record(component, "skipped", "no_activity");
    return { config: cfg, issues, prs, releases, summary: noActivityMsg };
  }
  const summary = await summarize(cfg.id, prompt, failMsg, status, component);
  return { config: cfg, issues, prs, releases, summary };
}

async function generateSummaries(
  fetchedCli: RepoFetch[],
  fetchedOpenclaw: RepoFetch,
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  fetchedPeers: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
  status: PublicationStatus,
  lang: Lang = "zh",
): Promise<{
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
}> {
  const noActivity = MSG.noActivity[lang];
  const fail = MSG.summaryFailed[lang];

  const [cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary] = await Promise.all([
    Promise.all(
      fetchedCli.map((f) =>
        summarizeRepo(
          f,
          buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, lang),
          noActivity,
          fail,
          status,
          `summary/${f.cfg.id}/${lang}`,
        ),
      ),
    ),
    summarizeRepo(
      fetchedOpenclaw,
      buildPeerPrompt(
        fetchedOpenclaw.cfg,
        fetchedOpenclaw.issues,
        fetchedOpenclaw.prs,
        fetchedOpenclaw.releases,
        dateStr,
        50,
        30,
        lang,
      ),
      noActivity,
      fail,
      status,
      `summary/${fetchedOpenclaw.cfg.id}/${lang}`,
    ).then((d) => d.summary),
    summarize(
      "claude-code-skills",
      buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, lang),
      MSG.skillsFailed[lang],
      status,
      `summary/claude-code-skills/${lang}`,
    ),
    Promise.all(
      fetchedPeers.map((f) =>
        summarizeRepo(
          f,
          buildPeerPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, undefined, undefined, lang),
          noActivity,
          fail,
          status,
          `summary/${f.cfg.id}/${lang}`,
        ),
      ),
    ),
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) {
        return MSG.trendingNoData[lang];
      }
      return summarize(
        "trending",
        buildTrendingPrompt(trendingData, dateStr, lang),
        MSG.trendingFailed[lang],
        status,
        `summary/trending/${lang}`,
        LLM_TOKENS_TRENDING,
      );
    })(),
  ]);

  return { cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary };
}

async function callLlmWithFallback(
  status: PublicationStatus,
  component: string,
  prompt: string,
  fallback: string,
): Promise<string> {
  try {
    const result = await callLlm(prompt);
    status.record(component, "ok");
    return result;
  } catch (err) {
    const code = classifyFailure(err);
    status.record(component, "degraded", code);
    console.error(`  [${component}] LLM call failed classification=${code}; using fallback: ${err}`);
    return fallback;
  }
}

function comparisonFallback(lang: Lang, subject: "tools" | "agents"): string {
  if (lang === "zh") {
    return subject === "tools"
      ? "> ⚠️ 今日横向对比生成失败。各工具的独立摘要和原始链接仍保留，可继续阅读。"
      : "> ⚠️ 今日 Agent 生态横向对比生成失败。各项目的独立摘要和原始链接仍保留。";
  }
  return subject === "tools"
    ? "> ⚠️ Today's cross-tool comparison is unavailable. Individual summaries and source links are preserved."
    : "> ⚠️ Today's agent-ecosystem comparison is unavailable. Individual summaries and source links are preserved.";
}

function digestHasUsableEvidence(digest: RepoDigest): boolean {
  const hasActivity = digest.issues.length > 0 || digest.prs.length > 0 || digest.releases.length > 0;
  if (!hasActivity) return false;
  return !/摘要生成失败|Summary generation failed|unavailable|无法完成|No activity/i.test(digest.summary);
}

async function comparisonWithCoverageGate(
  status: PublicationStatus,
  component: string,
  digests: RepoDigest[],
  promptFactory: () => string,
  fallback: string,
): Promise<string> {
  const covered = digests.filter(digestHasUsableEvidence).length;
  if (covered < 2) {
    status.record(component, "skipped", "coverage_insufficient");
    console.log(`  [${component}] skipped: comparison coverage ${covered}/2`);
    return "";
  }
  return callLlmWithFallback(status, component, promptFactory(), fallback);
}

function deterministicHighlights(reports: Record<string, string>, lang: Lang): ReportHighlights {
  const result: ReportHighlights = {};
  for (const [reportId, markdown] of Object.entries(reports)) {
    const title =
      markdown
        .split("\n")
        .map((line) => line.trim())
        .find((line) => /^#\s+/.test(line))
        ?.replace(/^#\s+/, "") ?? reportId;
    result[reportId] = [
      lang === "zh"
        ? `${title}：自动亮点提取暂时降级，请查看完整报告。`
        : `${title}: automatic highlight extraction degraded; see the full report.`,
    ];
  }
  return result;
}

function reportExists(dateStr: string, fileName: string): boolean {
  return fs.existsSync(path.join("digests", dateStr, fileName));
}

function annotateDegradedCoreReports(dateStr: string, status: PublicationStatus): void {
  const degraded = status.toJSON().components.filter((component) => component.state === "degraded");
  if (degraded.length === 0) return;

  const files: Array<{ fileName: string; lang: Lang }> = [
    { fileName: "ai-cli.md", lang: "zh" },
    { fileName: "ai-agents.md", lang: "zh" },
    { fileName: "ai-cli-en.md", lang: "en" },
    { fileName: "ai-agents-en.md", lang: "en" },
  ];
  for (const { fileName, lang } of files) {
    const filePath = path.join("digests", dateStr, fileName);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf-8");
    if (content.includes("<!-- roxy-degraded -->")) continue;
    const banner =
      lang === "zh"
        ? `<!-- roxy-degraded -->\n> ⚠️ **本期为降级发布**：${degraded.length} 个组件未完整完成；已保留可验证内容与原始链接。详情见 \`run-status.json\`。`
        : `<!-- roxy-degraded -->\n> ⚠️ **Degraded publication**: ${degraded.length} component(s) did not complete; verified content and source links were preserved. See \`run-status.json\`.`;
    const newline = content.indexOf("\n");
    const annotated =
      newline >= 0
        ? `${content.slice(0, newline)}\n\n${banner}\n${content.slice(newline + 1)}`
        : `${banner}\n\n${content}`;
    fs.writeFileSync(filePath, annotated, "utf-8");
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  const providerName = process.env["LLM_PROVIDER"] ?? "anthropic";
  const publicationStatus = new PublicationStatus(dateStr, providerName);
  console.log(`[${now.toISOString()}] Starting digest | provider: ${providerName}`);

  // 1. Fetch all data in parallel
  const webState = loadWebState();
  const {
    fetched,
    skillsData,
    webResults,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  } = await fetchAllData(since, webState);

  for (const repo of fetched) {
    publicationStatus.record(
      `fetch/github/${repo.cfg.id}`,
      repo.fetchSuccess === false ? "degraded" : "ok",
      repo.fetchSuccess === false ? "source_fetch_failed" : undefined,
    );
  }
  publicationStatus.record(
    "fetch/github/claude-code-skills",
    skillsData.fetchSuccess ? "ok" : "degraded",
    skillsData.fetchSuccess ? undefined : "source_fetch_failed",
  );
  for (const result of webResults) {
    publicationStatus.record(
      `fetch/web/${result.site}`,
      result.fetchSuccess === false ? "degraded" : "ok",
      result.fetchSuccess === false ? "source_fetch_failed" : undefined,
    );
  }
  publicationStatus.record(
    "fetch/trending",
    trendingData.trendingFetchSuccess || trendingData.searchRepos.length > 0 ? "ok" : "degraded",
    trendingData.trendingFetchSuccess || trendingData.searchRepos.length > 0
      ? undefined
      : "source_fetch_failed",
  );
  publicationStatus.record(
    "fetch/hn",
    hnData.fetchSuccess ? "ok" : "degraded",
    hnData.fetchSuccess ? undefined : "source_fetch_failed",
  );
  publicationStatus.record(
    "fetch/ph",
    phData.fetchSuccess ? "ok" : process.env["PRODUCTHUNT_TOKEN"] ? "degraded" : "skipped",
    phData.fetchSuccess
      ? undefined
      : process.env["PRODUCTHUNT_TOKEN"]
        ? "source_fetch_failed"
        : "not_configured",
  );
  publicationStatus.record(
    "fetch/arxiv",
    arxivData.fetchSuccess ? "ok" : "skipped",
    arxivData.fetchSuccess ? undefined : "no_recent_items",
  );
  publicationStatus.record(
    "fetch/hf",
    hfData.fetchSuccess ? "ok" : "degraded",
    hfData.fetchSuccess ? undefined : "source_fetch_failed",
  );
  publicationStatus.record(
    "fetch/devto",
    devtoData.fetchSuccess ? "ok" : "degraded",
    devtoData.fetchSuccess ? undefined : "source_fetch_failed",
  );
  publicationStatus.record(
    "fetch/lobsters",
    lobstersData.fetchSuccess ? "ok" : "degraded",
    lobstersData.fetchSuccess ? undefined : "source_fetch_failed",
  );

  const peerIds = new Set(OPENCLAW_PEERS.map((p) => p.id));
  const fetchedCli = fetched.filter((f) => f.cfg.id !== OPENCLAW.id && !peerIds.has(f.cfg.id));
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));

  // 2. Generate per-repo LLM summaries in parallel (zh + en simultaneously)
  console.log("  Generating summaries in ZH and EN in parallel...");
  const [zhSummaries, enSummaries] = await Promise.all([
    generateSummaries(
      fetchedCli,
      fetchedOpenclaw,
      skillsData,
      fetchedPeers,
      trendingData,
      dateStr,
      publicationStatus,
      "zh",
    ),
    generateSummaries(
      fetchedCli,
      fetchedOpenclaw,
      skillsData,
      fetchedPeers,
      trendingData,
      dateStr,
      publicationStatus,
      "en",
    ),
  ]);

  // 3. Generate comparisons and independent source reports together. Agnes
  // batches these concurrent logical tasks into one provider request.
  console.log("  Generating comparative analyses and source reports (ZH + EN)...");
  const summariesByLang = { zh: zhSummaries, en: enSummaries };

  const makeOpenclawDigest = (lang: Lang): RepoDigest => ({
    config: OPENCLAW,
    issues: fetchedOpenclaw.issues,
    prs: fetchedOpenclaw.prs,
    releases: fetchedOpenclaw.releases,
    summary: summariesByLang[lang].openclawSummary,
  });

  const comparisonPromise = Promise.all([
    comparisonWithCoverageGate(
      publicationStatus,
      "comparison/tools/zh",
      zhSummaries.cliDigests,
      () => buildComparisonPrompt(zhSummaries.cliDigests, dateStr, "zh"),
      comparisonFallback("zh", "tools"),
    ),
    comparisonWithCoverageGate(
      publicationStatus,
      "comparison/agents/zh",
      [makeOpenclawDigest("zh"), ...zhSummaries.peerDigests],
      () => buildPeersComparisonPrompt(makeOpenclawDigest("zh"), zhSummaries.peerDigests, dateStr, "zh"),
      comparisonFallback("zh", "agents"),
    ),
    comparisonWithCoverageGate(
      publicationStatus,
      "comparison/tools/en",
      enSummaries.cliDigests,
      () => buildComparisonPrompt(enSummaries.cliDigests, dateStr, "en"),
      comparisonFallback("en", "tools"),
    ),
    comparisonWithCoverageGate(
      publicationStatus,
      "comparison/agents/en",
      [makeOpenclawDigest("en"), ...enSummaries.peerDigests],
      () => buildPeersComparisonPrompt(makeOpenclawDigest("en"), enSummaries.peerDigests, dateStr, "en"),
      comparisonFallback("en", "agents"),
    ),
  ]);

  const hasWebContent = webResults.some((result) => result.newItems.length > 0);
  const hasTrendingData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  const sourceReportJobs: Array<{
    component: string;
    fileName: string;
    expected: boolean;
    run: () => Promise<void>;
  }> = [
    {
      component: "report/web/zh",
      fileName: "ai-web.md",
      expected: hasWebContent,
      run: () => saveWebReport(webResults, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    },
    {
      component: "report/web/en",
      fileName: "ai-web-en.md",
      expected: hasWebContent,
      run: () => saveWebReport(webResults, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    },
    {
      component: "report/trending/zh",
      fileName: "ai-trending.md",
      expected: hasTrendingData,
      run: () =>
        saveTrendingReport(
          trendingData,
          zhSummaries.trendingSummary,
          utcStr,
          dateStr,
          digestRepo,
          autoGenFooter("zh"),
          "zh",
        ),
    },
    {
      component: "report/trending/en",
      fileName: "ai-trending-en.md",
      expected: hasTrendingData,
      run: () =>
        saveTrendingReport(
          trendingData,
          enSummaries.trendingSummary,
          utcStr,
          dateStr,
          digestRepo,
          autoGenFooter("en"),
          "en",
        ),
    },
    {
      component: "report/hn/zh",
      fileName: "ai-hn.md",
      expected: hnData.fetchSuccess,
      run: () => saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    },
    {
      component: "report/hn/en",
      fileName: "ai-hn-en.md",
      expected: hnData.fetchSuccess,
      run: () => saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    },
    {
      component: "report/ph/zh",
      fileName: "ai-ph.md",
      expected: phData.fetchSuccess,
      run: () => savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    },
    {
      component: "report/ph/en",
      fileName: "ai-ph-en.md",
      expected: phData.fetchSuccess,
      run: () => savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    },
    {
      component: "report/arxiv/zh",
      fileName: "ai-arxiv.md",
      expected: arxivData.fetchSuccess,
      run: () => saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    },
    {
      component: "report/arxiv/en",
      fileName: "ai-arxiv-en.md",
      expected: arxivData.fetchSuccess,
      run: () => saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    },
    {
      component: "report/hf/zh",
      fileName: "ai-hf.md",
      expected: hfData.fetchSuccess,
      run: () => saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    },
    {
      component: "report/hf/en",
      fileName: "ai-hf-en.md",
      expected: hfData.fetchSuccess,
      run: () => saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    },
    {
      component: "report/community/zh",
      fileName: "ai-community.md",
      expected: devtoData.fetchSuccess || lobstersData.fetchSuccess,
      run: () =>
        saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    },
    {
      component: "report/community/en",
      fileName: "ai-community-en.md",
      expected: devtoData.fetchSuccess || lobstersData.fetchSuccess,
      run: () =>
        saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    },
  ];

  const sourceReportsPromise = Promise.allSettled(sourceReportJobs.map((job) => job.run()));
  const [comparisons, sourceReportResults] = await Promise.all([comparisonPromise, sourceReportsPromise]);
  for (const [index, result] of sourceReportResults.entries()) {
    const job = sourceReportJobs[index]!;
    if (result.status === "rejected") {
      const code = classifyFailure(result.reason);
      publicationStatus.record(job.component, "degraded", code);
      console.error(`  [${job.component}] saver failed classification=${code}: ${result.reason}`);
    } else if (!job.expected) {
      publicationStatus.record(job.component, "skipped", "no_data");
    } else if (reportExists(dateStr, job.fileName)) {
      publicationStatus.record(job.component, "ok");
    } else {
      publicationStatus.record(job.component, "degraded", "missing_report");
    }
  }
  const webReportsReady =
    !hasWebContent || (reportExists(dateStr, "ai-web.md") && reportExists(dateStr, "ai-web-en.md"));
  if (webReportsReady) {
    saveWebState(webState);
    publicationStatus.record("state/web", "ok");
    console.log("  [web] State committed after both language reports completed.");
  } else {
    publicationStatus.record("state/web", "degraded", "reports_incomplete");
    console.warn("  [web] State not committed; discovered content will be retried on the next run.");
  }
  const [zhComparison, zhPeersComparison, enComparison, enPeersComparison] = comparisons;

  const comparisonByLang = { zh: zhComparison, en: enComparison };
  const peersComparisonByLang = { zh: zhPeersComparison, en: enPeersComparison };

  // 4. Build + save the reports that depend on comparison output.
  const cliContent: Record<Lang, string> = {} as Record<Lang, string>;
  const openclawContent: Record<Lang, string> = {} as Record<Lang, string>;

  for (const lang of ["zh", "en"] as const) {
    const s = summariesByLang[lang];
    const ft = autoGenFooter(lang);
    const suffix = lang === "en" ? "-en" : "";

    cliContent[lang] = buildCliReportContent(
      s.cliDigests,
      s.skillsSummary,
      comparisonByLang[lang],
      utcStr,
      dateStr,
      ft,
      CLAUDE_SKILLS_REPO,
      lang,
    );
    openclawContent[lang] = buildOpenclawReportContent(
      fetchedOpenclaw,
      s.peerDigests,
      s.openclawSummary,
      peersComparisonByLang[lang],
      utcStr,
      dateStr,
      ft,
      OPENCLAW,
      OPENCLAW_PEERS,
      lang,
    );

    console.log(`  Saved ${saveFile(cliContent[lang], dateStr, `ai-cli${suffix}.md`)}`);
    console.log(`  Saved ${saveFile(openclawContent[lang], dateStr, `ai-agents${suffix}.md`)}`);
    publicationStatus.record(`report/core/cli/${lang}`, "ok");
    publicationStatus.record(`report/core/agents/${lang}`, "ok");
  }

  // 5. Generate highlights for Telegram notification
  const readReport = (name: string): string | undefined => {
    const p = path.join("digests", dateStr, name);
    return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : undefined;
  };

  const zhReports: Record<string, string> = { "ai-cli": cliContent.zh, "ai-agents": openclawContent.zh };
  const enReports: Record<string, string> = { "ai-cli": cliContent.en, "ai-agents": openclawContent.en };
  for (const [id, zhFile, enFile] of [
    ["ai-trending", "ai-trending.md", "ai-trending-en.md"],
    ["ai-web", "ai-web.md", "ai-web-en.md"],
    ["ai-hn", "ai-hn.md", "ai-hn-en.md"],
    ["ai-ph", "ai-ph.md", "ai-ph-en.md"],
    ["ai-arxiv", "ai-arxiv.md", "ai-arxiv-en.md"],
    ["ai-hf", "ai-hf.md", "ai-hf-en.md"],
    ["ai-community", "ai-community.md", "ai-community-en.md"],
  ] as const) {
    const zh = readReport(zhFile);
    const en = readReport(enFile);
    if (zh) zhReports[id] = zh;
    if (en) enReports[id] = en;
  }

  console.log("  Generating highlights for Telegram...");
  const highlights: Record<Lang, ReportHighlights> = { zh: {}, en: {} };
  // Generate + parse one language, retrying once. The LLM occasionally emits
  // slightly malformed JSON that repairJson can't fix (seen 2026-07-13: zh
  // failed with "Expected ',' or ']' after array element"); a fresh generation
  // usually returns valid JSON. Each language runs independently so a failure
  // in one never wipes the other.
  const genHighlights = async (reports: Record<string, string>, lang: Lang): Promise<ReportHighlights> => {
    let finalCode = "unknown_error";
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const parsed = parseLlmJson<unknown>(await callLlm(buildHighlightsPrompt(reports, lang), 2048));
        assertReportHighlights(parsed, lang);
        publicationStatus.record(`highlights/${lang}`, "ok");
        return parsed;
      } catch (err) {
        finalCode = classifyFailure(err);
        const tag = attempt < 2 ? "retrying" : "giving up";
        console.error(
          `  [highlights] ${lang} attempt ${attempt} failed classification=${finalCode} (${tag}): ${err}`,
        );
      }
    }
    publicationStatus.record(`highlights/${lang}`, "degraded", finalCode);
    return deterministicHighlights(reports, lang);
  };
  const [zhRes, enRes] = await Promise.all([genHighlights(zhReports, "zh"), genHighlights(enReports, "en")]);
  highlights.zh = zhRes;
  highlights.en = enRes;

  const highlightsPath = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${highlightsPath}`);

  // 6. Create GitHub issues for CLI + OpenClaw (zh + en)
  if (digestRepo) {
    for (const lang of ["zh", "en"] as const) {
      try {
        const cliUrl = await createGitHubIssue(
          CLI_ISSUE_TITLE(dateStr, lang),
          cliContent[lang],
          ISSUE_LABELS.cli[lang],
        );
        publicationStatus.record(`issue/cli/${lang}`, "ok");
        console.log(`  Published CLI issue (${lang}): ${cliUrl}`);
      } catch (err) {
        const code = classifyFailure(err);
        publicationStatus.record(`issue/cli/${lang}`, "degraded", code);
        console.error(`  [issue/cli/${lang}] publication failed classification=${code}: ${err}`);
      }

      try {
        const ocUrl = await createGitHubIssue(
          OPENCLAW_ISSUE_TITLE(dateStr, lang),
          openclawContent[lang],
          ISSUE_LABELS.openclaw[lang],
        );
        publicationStatus.record(`issue/agents/${lang}`, "ok");
        console.log(`  Published OpenClaw issue (${lang}): ${ocUrl}`);
      } catch (err) {
        const code = classifyFailure(err);
        publicationStatus.record(`issue/agents/${lang}`, "degraded", code);
        console.error(`  [issue/agents/${lang}] publication failed classification=${code}: ${err}`);
      }
    }
  } else {
    for (const lang of ["zh", "en"] as const) {
      publicationStatus.record(`issue/cli/${lang}`, "skipped", "not_configured");
      publicationStatus.record(`issue/agents/${lang}`, "skipped", "not_configured");
    }
  }

  annotateDegradedCoreReports(dateStr, publicationStatus);
  const statusPath = publicationStatus.save();
  console.log(`  Saved ${statusPath}`);
  publicationStatus.logSummary(getLlmDiagnostics());
  console.log("Done!");
}

main().catch((err) => {
  console.error(`[fatal] classification=${classifyFailure(err)}`, err);
  process.exit(1);
});
