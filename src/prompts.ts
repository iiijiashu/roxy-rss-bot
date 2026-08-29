/**
 * LLM prompt builders and item formatting.
 */

import type { RepoConfig, GitHubItem, GitHubRelease } from "./github.ts";
import type { Lang } from "./i18n.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoDigest {
  config: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  summary: string;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatItem(item: GitHubItem, lang: Lang = "zh"): string {
  const labels = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  const t =
    lang === "en"
      ? {
          author: "Author",
          created: "Created",
          updated: "Updated",
          comments: "Lifetime comments",
          url: "URL",
          summary: "Summary",
        }
      : {
          author: "作者",
          created: "创建",
          updated: "更新",
          comments: "累计评论",
          url: "链接",
          summary: "摘要",
        };
  // Extract "owner/repo" from html_url to avoid full GitHub URLs that trigger cross-references
  const repoSlug = item.html_url.replace(/^https:\/\/github\.com\//, "").replace(/\/(issues|pull)\/\d+$/, "");
  const itemKind = item.html_url.includes("/pull/") ? "PR" : "Issue";
  const refStr = `${repoSlug} ${itemKind} #${item.number}`;
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  ${t.author}: ${item.user.login} | ${t.created}: ${item.created_at.slice(0, 10)} | ${t.updated}: ${item.updated_at.slice(0, 10)} | ${t.comments}: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  ${t.url}: ${refStr}`,
    `  ${t.summary}: ${body}${ellipsis}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Sampling helpers (shared)
// ---------------------------------------------------------------------------

const CLI_ISSUE_LIMIT = 30;
const CLI_PR_LIMIT = 20;

/** Sort by observable recent activity, never by lifetime comment totals. */
export function topN(items: GitHubItem[], n: number): GitHubItem[] {
  return [...items]
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at) || b.number - a.number)
    .slice(0, n);
}

export function sampleNote(total: number, sampled: number, lang: Lang = "zh"): string {
  if (lang === "en") {
    return total > sampled
      ? `(Observed ${total} API items; showing ${sampled} most recently updated; totals may be API-capped)`
      : `(Total: ${total} items)`;
  }
  return total > sampled
    ? `（API 观测到 ${total} 条，以下展示最近更新的 ${sampled} 条；总数可能受 API 分页上限影响）`
    : `（API 观测到 ${total} 条；不把该数值解释为精确的“24 小时新增量”）`;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

export function buildCliPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  lang: Lang = "zh",
): string {
  const sampledIssues = topN(issues, CLI_ISSUE_LIMIT);
  const sampledPrs = topN(prs, CLI_PR_LIMIT);

  const issuesText =
    sampledIssues.map((i) => formatItem(i, lang)).join("\n") || (lang === "en" ? "None" : "无");
  const prsText = sampledPrs.map((p) => formatItem(p, lang)).join("\n") || (lang === "en" ? "None" : "无");
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : lang === "en"
      ? "None"
      : "无";

  const issueNote = sampleNote(issues.length, sampledIssues.length, lang);
  const prNote = sampleNote(prs.length, sampledPrs.length, lang);

  if (lang === "en") {
    return `You are a technical analyst focused on AI developer tools. Based on the following GitHub data, generate the ${cfg.name} community digest for ${dateStr}.

# Data source: github.com/${cfg.repo}

## Latest Releases (last 24h)
${releasesText}

## Latest Issues (updated in last 24h)${issueNote}
${issuesText}

## Latest Pull Requests (updated in last 24h)${prNote}
${prsText}

---

Generate a structured English digest with the following sections:

1. **Today's Highlights** - 2-3 sentences summarizing the most important updates
2. **Releases** - If new versions exist, summarize changes; omit if none
3. **Noteworthy Issues** - Pick up to 10 Issues and explain why the issue description itself matters. Do not infer community reaction; comment bodies are not provided and comment counts are lifetime totals.
4. **Key PR Progress** - Pick 10 important PRs, describe features or fixes
5. **Issue Themes** - Group explicit themes visible in issue titles/descriptions only. Do not claim popularity from lifetime comment totals.
6. **Evidence Limits** - State that comment bodies and 24h comment/reaction deltas are unavailable in this legacy prompt, so sentiment and community consensus cannot be assessed.

Style: concise and professional, suited for technical developers. Include GitHub links for each item.
`;
  }

  return `你是一位专注于 AI 开发工具的技术分析师。请根据以下 GitHub 数据，生成 ${dateStr} 的 ${cfg.name} 社区动态日报。

# 数据来源: github.com/${cfg.repo}

## 最新 Releases（过去24小时）
${releasesText}

## 最新 Issues（过去24小时内更新）${issueNote}
${issuesText}

## 最新 Pull Requests（过去24小时内更新）${prNote}
${prsText}

---

请生成一份结构清晰的中文日报，包含以下部分：

1. **今日速览** - 用2-3句话概括今天最重要的动态
2. **版本发布** - 如有新版本，总结更新内容；无则省略
3. **值得关注的 Issues** - 最多挑选 10 个 Issue，只根据标题和 Issue 正文说明为什么重要。输入没有评论正文，累计评论数也不是 24h 热度，因此不得推断社区反应。
4. **重要 PR 进展** - 挑选 10 个重要的 PR，说明功能或修复内容
5. **Issue 主题** - 只归纳标题和 Issue 正文明示的主题，不得用累计评论数声称“最热门/需求最高”
6. **证据边界** - 明确说明当前输入没有评论正文和 24h 评论/Reaction 增量，不能分析社区情绪、共识或满意度

语言要求：简洁专业，适合技术开发者阅读。每个条目附上 GitHub 链接。
`;
}

const PEER_ISSUE_LIMIT = 30;
const PEER_PR_LIMIT = 20;

export function buildPeerPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  issueLimit = PEER_ISSUE_LIMIT,
  prLimit = PEER_PR_LIMIT,
  lang: Lang = "zh",
): string {
  const totalIssues = issues.length;
  const totalPrs = prs.length;

  const sampledIssues = topN(issues, issueLimit);
  const sampledPrs = topN(prs, prLimit);

  const noneStr = lang === "en" ? "None" : "无";
  const issuesText = sampledIssues.map((i) => formatItem(i, lang)).join("\n") || noneStr;
  const prsText = sampledPrs.map((p) => formatItem(p, lang)).join("\n") || noneStr;
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : noneStr;

  const openIssues = issues.filter((i) => i.state === "open").length;
  const closedIssues = issues.filter((i) => i.state === "closed").length;
  const openPrs = prs.filter((p) => p.state === "open").length;
  const closedPrs = prs.filter((p) => p.state === "closed").length;

  const issueSampleNote = sampleNote(totalIssues, sampledIssues.length, lang);
  const prSampleNote = sampleNote(totalPrs, sampledPrs.length, lang);

  if (lang === "en") {
    return `You are an analyst of AI agent and personal AI assistant open-source projects. Based on the following GitHub data from ${cfg.name} (github.com/${cfg.repo}), generate a project digest for ${dateStr}.

# Data Overview (API-observed sample; do not present these as exact global counts when pagination may be capped)
- Issues returned from the recent-activity query: ${totalIssues} (open: ${openIssues}, closed: ${closedIssues})
- PRs returned from the recent-activity query: ${totalPrs} (open: ${openPrs}, closed: ${closedPrs}; closed is NOT equivalent to merged)
- New releases: ${releases.length}

## Latest Releases
${releasesText}

## Latest Issues ${issueSampleNote}
${issuesText}

## Latest Pull Requests ${prSampleNote}
${prsText}

---

Generate a structured English ${cfg.name} project digest with the following sections:

1. **Today's Overview** - 3-5 sentences summarizing only concrete releases/PRs/issues in the supplied sample; do not turn sampled counts into a full-project activity ranking
2. **Releases** - If new versions exist, detail changes, breaking changes, migration notes; omit if none
3. **Verified Project Changes** - Describe only supplied PR state and body evidence. A closed PR is not merged unless merged_at proves it.
4. **Recent Issues / PRs** - Select items from the observable recent sample. Lifetime comments/reactions are context only, not 24h heat.
5. **Bugs & Stability** - Bugs, crashes, regressions reported today, ranked by severity, note if fix PRs exist
6. **Feature Requests** - Describe explicit requests visible in issue titles/bodies. Do not predict roadmap inclusion without maintainer/milestone evidence.
7. **Evidence Limits** - Comment bodies are not provided. Do not claim community sentiment, satisfaction, consensus, or "what users say in comments".
8. **Evidence Limits** - State sample, pagination, missing-comment-body, and state limitations that constrain interpretation

Style: objective and data-driven. Include GitHub links for each item; do not score project health or infer maintainer intent.
`;
  }

  return `你是一位 AI 智能体与个人 AI 助手领域开源项目分析师。请根据以下来自 ${cfg.name} (github.com/${cfg.repo}) 的 GitHub 数据，生成 ${dateStr} 的项目动态日报。

# 数据概览（API 观测样本；分页可能截断时不得把这些数字写成全量精确计数）
- 最近活动查询返回 Issues：${totalIssues} 条（open: ${openIssues}，closed: ${closedIssues}）
- 最近活动查询返回 PR：${totalPrs} 条（open: ${openPrs}，closed: ${closedPrs}；closed 不等于 merged）
- 新版本发布：${releases.length} 个

## 最新 Releases
${releasesText}

## 最新 Issues ${issueSampleNote}
${issuesText}

## 最新 Pull Requests ${prSampleNote}
${prsText}

---

请生成一份结构清晰的 ${cfg.name} 项目日报，包含以下部分：

1. **今日速览** - 用3-5句话概括输入中明确出现的 release/PR/Issue，不得把采样条数升级成项目整体活跃度排名
2. **版本发布** - 如有新版本，详细说明更新内容、破坏性变更、迁移注意事项；无则省略
3. **已验证项目变化** - 只按 PR 状态和正文证据描述变化；closed 不等于 merged，除非 merged_at 明确证明
4. **近期 Issues / PRs** - 从可观测的近期样本挑选重要条目。累计评论/Reaction 只能作为历史上下文，不能当 24h 热度。
5. **Bug 与稳定性** - 今日报告的 Bug、崩溃、回归问题，按严重程度排列，标注是否已有 fix PR
6. **功能请求** - 只描述 Issue 标题/正文明确提出的需求；没有 maintainer/milestone/roadmap 证据时不得预测下一版本
7. **证据边界** - 输入没有评论正文，不得声称社区情绪、满意度、共识，或编造“评论里用户怎么说”
8. **证据边界** - 明确说明采样、分页、缺少评论正文和状态语义对结论的限制

语言要求：客观专业，数据驱动，不评估项目健康度、不推断维护者意图。每个条目附上 GitHub 链接。
`;
}

export function buildPeersComparisonPrompt(
  openclawDigest: RepoDigest,
  peerDigests: RepoDigest[],
  dateStr: string,
  lang: Lang = "zh",
): string {
  const noActivityStr =
    lang === "en"
      ? "No qualifying item was returned by this bounded API sample; this is not evidence of no project activity."
      : "本次有界 API 样本未返回合格条目；这不等于项目没有活动。";

  const openclawSection =
    lang === "en"
      ? `## OpenClaw (core reference, github.com/${openclawDigest.config.repo})\n${openclawDigest.summary}`
      : `## OpenClaw（核心参照，github.com/${openclawDigest.config.repo}）\n${openclawDigest.summary}`;

  const peerSections = peerDigests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior analyst of the AI agent and personal AI assistant open-source ecosystem. The following are ${dateStr} community digest summaries for each project.

${openclawSection}

---

${peerSections}

---

Generate an evidence-scoped cross-project comparison in English:

1. **Coverage Matrix** - Which projects have qualifying releases/Issues/PRs in the supplied bounded sample, with explicit gaps and caps
2. **Verified Changes** - Concrete changes supported by release notes, PR bodies/states, or Issue bodies; closed is not merged
3. **Repeated Explicit Themes** - Themes present in at least two supplied project records, naming those records
4. **Documented Technical Differences** - Only differences explicitly supported by supplied descriptions; omit unsupported dimensions
5. **Evidence Limits** - Missing comment bodies, cumulative counters, sampling, and pagination limits

Do not rank activity, community size, momentum, maturity, project health, leadership, or strategy. Do not infer sentiment or trends from counters or missing data.
Style: concise, professional, and traceable to supplied records.
`;
  }

  return `你是一位专注于 AI 智能体与个人 AI 助手开源生态的资深技术分析师。以下是 ${dateStr} 各开源项目的社区动态摘要。

${openclawSection}

---

${peerSections}

---

请生成一份受证据约束的横向对比：

1. **覆盖矩阵** - 列出各项目在有界样本中是否存在合格 release/Issue/PR，并标明缺口与分页上限
2. **已验证变化** - 只写 release notes、PR 正文/状态或 Issue 正文明示的变化；closed 不等于 merged
3. **重复出现的明确主题** - 至少两个项目记录明确出现时才归纳，并注明对应记录
4. **有文档依据的技术差异** - 只比较输入明确支持的维度，不足则省略
5. **证据边界** - 说明缺少评论正文、累计计数、采样和分页限制

不得比较活跃度、社区规模、热度、成熟度、项目健康度、领先地位或战略；不得用计数或缺失数据推断情绪与趋势。
语言要求：简洁专业，每项结论可追溯到输入记录。
`;
}

export function buildSkillsPrompt(
  prs: GitHubItem[],
  issues: GitHubItem[],
  dateStr: string,
  lang: Lang = "zh",
): string {
  const topPrs = topN(prs, 20);
  const topIssues = topN(issues, 15);

  const noneStr = lang === "en" ? "None" : "无";
  const prsText = topPrs.map((p) => formatItem(p, lang)).join("\n") || noneStr;
  const issuesText = topIssues.map((i) => formatItem(i, lang)).join("\n") || noneStr;

  if (lang === "en") {
    return `You are a technical analyst focused on the Claude Code ecosystem. The following data is a bounded, recently updated sample from github.com/anthropics/skills (official Claude Code Skills repository), observed as of ${dateStr}.

## Repository Context
anthropics/skills is the official Claude Code Skills collection. Each PR typically represents a new or improved Skill. The community proposes new Skills and reports issues via Issues; PRs represent actual Skill submissions.

## Recently Updated Pull Request Sample (${prs.length} returned, showing ${topPrs.length})
${prsText}

## Recently Updated Issue Sample (${issues.length} returned, showing ${topIssues.length})
${issuesText}

---

Generate a Claude Code Skills evidence digest in English:

1. **Verified Skill Submissions** - Describe functionality and current state from PR title/body/state only
2. **Explicit Issue Requests** - Group only requests directly stated in Issue titles/bodies, citing the records
3. **Pending Submissions** - List open PRs without predicting merge likelihood or timing
4. **Evidence Limits** - Comment bodies are absent and comment totals are cumulative; do not infer popularity, attention, consensus, or demand rankings

Style: concise and professional; include GitHub links for each item and omit unsupported claims.
`;
  }

  return `你是一位专注于 Claude Code 生态的技术分析师。以下是 github.com/anthropics/skills（Claude Code Skills 官方仓库）最近更新条目的有界样本，观测截止 ${dateStr}。

## 仓库说明
anthropics/skills 是 Claude Code 官方 Skills 集合仓库，每个 PR 通常对应一个新增或改进的 Skill。社区通过 Issues 提出新 Skill 需求或反馈问题，PR 则代表实际提交的 Skill。

## 最近更新的 Pull Request 样本（返回 ${prs.length} 条，展示 ${topPrs.length} 条）
${prsText}

## 最近更新的 Issue 样本（返回 ${issues.length} 条，展示 ${topIssues.length} 条）
${issuesText}

---

请生成一份受证据约束的 Claude Code Skills 摘要：

1. **已验证 Skill 提交** - 只按 PR 标题、正文和状态描述功能与当前状态
2. **Issue 明示需求** - 只归纳 Issue 标题/正文直接提出的请求，并标明对应记录
3. **待处理提交** - 列出 open PR，不预测合并概率或时间
4. **证据边界** - 输入没有评论正文，评论数是累计值；不得推断受欢迎程度、关注度、共识或需求排名

语言要求：简洁专业，每个条目附上 GitHub 链接，省略证据不足的结论。
`;
}

export function buildComparisonPrompt(digests: RepoDigest[], dateStr: string, lang: Lang = "zh"): string {
  const noActivityStr =
    lang === "en"
      ? "No qualifying item was returned by this bounded API sample; this is not evidence of no tool activity."
      : "本次有界 API 样本未返回合格条目；这不等于工具没有活动。";

  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior technical analyst of the AI developer tools ecosystem. The following are ${dateStr} community digest summaries for each major AI CLI tool:

${sections}

---

Generate an evidence-scoped cross-tool comparison in English:

1. **Coverage Matrix** - Which tools have qualifying releases/Issues/PRs in the supplied bounded sample, with gaps and API caps
2. **Verified Changes** - Concrete release, PR, and Issue changes supported by supplied records
3. **Repeated Explicit Themes** - Themes directly present in at least two tool records, naming those records
4. **Documented Technical Differences** - Compare only dimensions explicitly supported by the supplied summaries
5. **Evidence Limits** - Missing comment bodies, cumulative counters, sampling, and pagination limits

Do not rank activity, community size, momentum, maturity, health, leadership, or strategy. Do not infer sentiment or trends from counters or missing data.
Style: concise, professional, and traceable to supplied records.
`;
  }

  return `你是一位专注于 AI 开发工具生态的资深技术分析师。以下是 ${dateStr} 各主流 AI CLI 工具的社区动态摘要：

${sections}

---

请生成一份受证据约束的横向对比：

1. **覆盖矩阵** - 列出各工具在有界样本中是否存在合格 release/Issue/PR，并标明缺口与 API 上限
2. **已验证变化** - 只写输入记录明确支持的 release、PR 和 Issue 变化
3. **重复出现的明确主题** - 至少两个工具记录直接出现时才归纳，并注明对应记录
4. **有文档依据的技术差异** - 只比较输入摘要明确支持的维度
5. **证据边界** - 说明缺少评论正文、累计计数、采样和分页限制

不得比较活跃度、社区规模、热度、成熟度、健康度、领先地位或战略；不得用计数或缺失数据推断情绪与趋势。
语言要求：简洁专业，每项结论可追溯到输入记录。
`;
}
