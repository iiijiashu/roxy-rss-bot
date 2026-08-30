/**
 * LLM prompt builders for data-source reports (trending, web, HN)
 * and rollup reports (weekly, monthly).
 *
 * Separated from prompts.ts to keep each module focused.
 */

import type { WebFetchResult } from "./web.ts";
import type { TrendingData } from "./trending.ts";
import type { HnData } from "./hn.ts";
import type { PhData } from "./ph.ts";
import type { ArxivData } from "./arxiv.ts";
import type { HfData } from "./hf.ts";
import type { DevtoData } from "./devto.ts";
import type { LobstersData } from "./lobsters.ts";
import type { Lang } from "./i18n.ts";
export function buildTrendingPrompt(data: TrendingData, dateStr: string, lang: Lang = "zh"): string {
  const trendingSection =
    data.trendingFetchSuccess && data.trendingRepos.length > 0
      ? data.trendingRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.totalStars.toLocaleString()}` +
              (r.todayStars > 0 ? ` (+${r.todayStars} today)` : "") +
              (r.forks > 0 ? ` 🍴${r.forks.toLocaleString()}` : "") +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : lang === "en"
        ? "(Unable to fetch today's GitHub Trending list)"
        : "（未能抓取今日 GitHub Trending 榜单）";

  const searchSection =
    data.searchRepos.length > 0
      ? data.searchRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.stargazersCount.toLocaleString()}` +
              ` [topic:${r.searchQuery}]` +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : lang === "en"
        ? "(No search results)"
        : "（无搜索结果）";

  if (lang === "en") {
    return `You are an evidence-bound analyst of an AI-related GitHub snapshot for ${dateStr}. Filter for AI relevance and describe only what the supplied lists and repository metadata support.

## Data Sources
- **Trending List** (github.com/trending): A ranked snapshot with parser-observed total/today star counters
- **Topic Search** (GitHub Search API, topic tags): Repositories returned by pushed-within-7-days queries; not a popularity or growth ranking

---

## GitHub Today's Trending (${data.trendingRepos.length} repositories)
${trendingSection}

---

## AI Topic Search Results (${data.searchRepos.length} repositories, deduplicated)
${searchSection}

---

Generate a structured AI Open Source Snapshot in English:

**Step 1 (Filter)**: From the above data, select projects clearly related to AI/ML (exclude unrelated general tools, frontend frameworks, games, etc.). Skip non-AI trending repos.

**Step 2 (Categorize)**: Group filtered projects into these categories (a project can belong to multiple; pick the primary one):
- 🔧 AI Infrastructure (frameworks, SDKs, inference engines, dev tools, CLI)
- 🤖 AI Agents / Workflows (agent frameworks, automation, multi-agent systems)
- 📦 AI Applications (specific apps, vertical solutions)
- 🧠 LLMs / Training (model weights, training frameworks, fine-tuning tools)
- 🔍 RAG / Knowledge (vector databases, retrieval-augmented generation, knowledge management)

**Step 3 (Output Report)** with these sections:

1. **Observed Snapshot Highlights** — 3-5 sentences on notable supplied entries, clearly attributing list presence and counters

2. **Observed Projects by Category** — For each category, render a **Markdown table** with exactly these columns:

   | Project | Lang | Stars (total / today) | Summary |
   | :--- | :--- | ---: | :--- |

   - **Project**: repo name as a Markdown link to its GitHub URL
   - **Lang**: primary language (leave blank if unknown)
   - **Stars**: total stars, plus today's new stars in parentheses when available (e.g. "86,392 (+1,851)"); copy the numbers from the input verbatim, do not recompute
   - **Summary**: 2 sentences — what the supplied description says and the exact reason it appears in this snapshot; do not infer momentum
   - List 3-8 projects per category; omit a category's table entirely if no project falls under it

3. **Repeated Metadata Themes** — Themes explicitly repeated across supplied titles/descriptions/tags; do not claim first appearance, growth, sentiment, or causal links to outside events

4. **Developer Reading List** — 3-5 supplied projects worth inspecting, with reasoning limited to their descriptions and exact counters

Hard boundary: list rank and star counters are snapshot metadata, not community sentiment, adoption, growth, or a general ecosystem trend. Style: English, professional and concise; include GitHub links.
`;
  }

  return `你是一位严格受证据约束的分析师。以下是 ${dateStr} 的 GitHub AI 相关列表快照，请筛选 AI 相关性，并只描述列表与仓库元数据明确支持的内容。

## 数据说明
- **Trending 榜单**（github.com/trending）：有排名的快照，含解析器观测到的总量/今日 star 计数
- **主题搜索**（GitHub Search API，topic 标签）：pushed-within-7-days 查询返回的仓库，不代表受欢迎程度或增长排名

---

## GitHub 今日 Trending 榜单（共 ${data.trendingRepos.length} 个仓库）
${trendingSection}

---

## AI 主题搜索结果（共 ${data.searchRepos.length} 个仓库，已去重）
${searchSection}

---

请生成一份结构清晰的《AI 开源列表快照》，要求：

**第一步（过滤）**：从以上数据中筛选出与 AI/ML 明确相关的项目（排除与 AI 无关的通用工具、前端框架、游戏等），对于 Trending 榜单中的非 AI 项目直接略去。

**第二步（分类）**：将筛选后的项目按以下维度分类（一个项目可归入多类，优先归入最主要类别）：
- 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
- 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- 📦 AI 应用（具体应用产品、垂直场景解决方案）
- 🧠 大模型/训练（模型权重、训练框架、微调工具）
- 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

**第三步（输出报告）**，包含以下部分：

1. **快照速览** — 3~5 句话概括输入中的代表性条目，明确归因于榜单出现与计数

2. **各维度可见项目** — 每个维度用 **Markdown 表格**呈现，列固定为：

   | 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
   | :--- | :--- | ---: | :--- |

   - **项目**：仓库名，做成指向其 GitHub 链接的 Markdown 链接
   - **语言**：主要语言（未知则留空）
   - **Stars**：总 star 数，有今日新增则在括号中标注（如 "86,392（+1,851）"）；数字照抄输入，不要重算
   - **简要说明**：2 句话——输入描述说明项目是什么、为何进入本快照；不得推断增长势头
   - 每个维度列 3~8 个项目；某维度下若无项目则整张表省略

3. **重复出现的元数据主题** — 只归纳标题、描述和标签中重复出现的主题；不得声称首次出现、增长、情绪或与外部事件存在因果关系

4. **开发者阅读清单** — 列出 3~5 个输入项目，理由仅来自项目描述与明确计数

硬边界：榜单排名和 star 计数只是快照元数据，不代表社区情绪、采用率、增长或整体生态趋势。语言要求：中文，专业简洁，每个项目附 GitHub 链接。
`;
}

export function buildWebReportPrompt(results: WebFetchResult[], dateStr: string, lang: Lang = "zh"): string {
  const isAnyFirstRun = results.some((r) => r.isFirstRun);

  const siteSections = results
    .map(({ siteName, isFirstRun, newItems, totalDiscovered }) => {
      const mode =
        lang === "en"
          ? isFirstRun
            ? `First observation (${totalDiscovered} discovered entries, ${newItems.length} entries have trusted current evidence)`
            : `Incremental update, ${newItems.length} entries have trusted current evidence`
          : isFirstRun
            ? `首次观测（共发现 ${totalDiscovered} 条记录，其中 ${newItems.length} 条具备可信当前性证据）`
            : `增量更新，共 ${newItems.length} 条具备可信当前性证据`;

      if (newItems.length === 0) {
        const noContent =
          lang === "en" ? `(${mode}, no content to analyze.)` : `（${mode}，暂无可供分析的内容。）`;
        return `## ${siteName}\n\n${noContent}`;
      }

      const categoryLabel = lang === "en" ? "Category" : "分类";
      const publishedLabel = lang === "en" ? "Published" : "发布";
      const updatedLabel = lang === "en" ? "Updated" : "更新";
      const observedLabel = lang === "en" ? "Observed" : "观测";
      const sitemapLabel =
        lang === "en" ? "Sitemap lastmod (refetch hint only)" : "Sitemap lastmod（仅重抓信号）";
      const excerptLabel = lang === "en" ? "Excerpt" : "内容节选";
      const metadataOnlyNote =
        lang === "en"
          ? "(metadata-only visibility signal: no content/date evidence; MUST NOT be used to infer company activity, strategy, or release cadence)"
          : "（仅元数据可见性信号：无正文/发布日期证据；严禁据此推断公司活动、战略或发布强度）";
      const itemsText = newItems
        .map((item) => {
          const lines = [
            `### [${item.title || item.url}](${item.url})`,
            `- ${categoryLabel}: ${item.category} | freshness: ${item.freshness} | visibility: ${item.visibility}`,
            `- ${observedLabel}: ${item.observedAt.slice(0, 10)}`,
          ];
          if (item.publishedAt) lines.push(`- ${publishedLabel}: ${item.publishedAt.slice(0, 10)}`);
          if (item.updatedAt) lines.push(`- ${updatedLabel}: ${item.updatedAt.slice(0, 10)}`);
          if (item.sitemapLastmod) lines.push(`- ${sitemapLabel}: ${item.sitemapLastmod}`);
          if (item.content) {
            lines.push(`- ${excerptLabel}: ${item.content}`);
          } else {
            lines.push(`- ${metadataOnlyNote}`);
          }
          return lines.join("\n");
        })
        .join("\n\n");

      const lp = lang === "en" ? "(" : "（";
      const rp = lang === "en" ? ")" : "）";
      return `## ${siteName}${lp}${mode}${rp}\n\n${itemsText}`;
    })
    .join("\n\n---\n\n");

  const firstRunNote =
    lang === "en"
      ? isAnyFirstRun
        ? "This is the first observation. Only entries explicitly classified as newly_published or materially_updated may be described as current developments. Historical discoveries are not today's news."
        : "This is an incremental update. Only use supplied publication/update evidence; never convert crawler observation or sitemap timestamps into publication claims."
      : isAnyFirstRun
        ? "本次为首次观测。只有明确分类为 newly_published 或 materially_updated 的条目才能描述为当前动态；新发现的历史内容不是今日新闻。"
        : "本次为增量更新。只能使用输入中明确提供的发布/更新时间证据，严禁把抓取时间或 sitemap 时间改写成发布日期。";

  if (lang === "en") {
    return `You are an evidence-bound AI content analyst. Summarize only facts and implications supported by the supplied first-party material.

The following content was crawled on ${dateStr} from Anthropic (claude.com / anthropic.com) and OpenAI (openai.com). ${firstRunNote}

${siteSections}

---

Generate a detailed AI Official Content Tracking Report in English with these sections:

1. **Today's Highlights** — 3-5 sentences on the most important new releases or developments, calling out key highlights

2. **Anthropic / Claude Content Highlights** — Organize important content by category (news / research / engineering / learn, etc.):
   - For each piece, 2-4 sentences extracting core insights, technical details, or business significance
   - Note publication date and original link
   - If first full crawl, trace important milestones chronologically

3. **OpenAI Content Highlights** — Same structure, but only for entries with official_summary or full_text visibility. Metadata-only entries may be listed as crawler visibility gaps and must not be interpreted.

4. **Evidence Limits** — State any coverage limitations. Do not rank companies, infer agenda-setting/following, release velocity, strategy, roadmap, or hidden signals from source visibility or URL slugs.

5. **Notable Verified Details** — Only details explicitly present in supplied first-party content and dates. No prediction or speculation.

${isAnyFirstRun ? "6. **Observed Content Inventory** — First full crawl only: list the supplied categories and counts without inferring company strategy, priorities, or activity beyond the visible sample.\n\n" : ""}Style: English, professional and detailed, suited for AI researchers, product managers, and technical decision-makers. Every item must include official links.
`;
  }

  return `你是一位严格受证据约束的 AI 内容分析师，只总结输入中的第一方材料明确支持的事实与实际意义。

以下是 ${dateStr} 从 Anthropic（claude.com / anthropic.com）和 OpenAI（openai.com）官网抓取的内容，${firstRunNote}

${siteSections}

---

请生成一份详实的《AI 官方内容追踪报告》，包含以下部分：

1. **今日速览** — 3~5 句话概括最重要的新发布或动向，点出核心亮点

2. **Anthropic / Claude 内容精选** — 按分类（news / research / engineering / learn 等）逐条整理重要内容：
   - 每篇用 2~4 句话提炼核心观点、技术细节或业务意义
   - 标注发布日期和原文链接
   - 如首次全量，按时间线梳理重要里程碑

3. **OpenAI 内容精选** — 同上，但只能分析 visibility 为 official_summary 或 full_text 的条目。metadata_only 只能说明抓取器可见性不足，不得进行内容推断。

4. **证据边界** — 明确说明覆盖缺口。严禁基于来源可见性、URL slug 或 sitemap 数量比较公司发布强度、判断谁引领/跟进、推断战略或路线图。

5. **值得关注的已验证细节** — 只写输入中的第一方正文/摘要/发布日期明确支持的细节，不预测、不脑补。

${isAnyFirstRun ? "6. **可见内容清单** — 首次全量独有：只汇总输入样本的内容类别与数量；不得据此推断公司战略、优先级或整体活跃度。\n\n" : ""}语言要求：中文，专业深入，内容详实，适合 AI 领域研究者、产品经理和技术决策者阅读。每个条目必须附上 GitHub/官网链接。
`;
}

export function buildWeeklyPrompt(
  dailyDigests: Record<string, string>,
  weekStr: string,
  lang: Lang = "zh",
): string {
  const digestEntries = Object.entries(dailyDigests)
    .map(([date, content]) => `## ${date}\n\n${content}`)
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a technical analyst focused on the AI open-source ecosystem. The following are daily digest summaries from the past 7 days (${weekStr}) of AI tool community activity. Generate a comprehensive weekly recap.

${digestEntries}

---

Generate an AI Tools Ecosystem Weekly Report with these sections:

1. **Week's Top Stories** - 5-8 most important events, releases, and community developments this week, each with date
2. **CLI Tools Verified Changes** - Dated, source-backed changes for each AI CLI tool (Claude Code, Codex, Gemini CLI, etc.)
3. **AI Agent Ecosystem** - Key developments from OpenClaw and peer projects this week
4. **Repeated Open Source Themes** - Technical themes repeated across dated supplied reports, with those dates cited
5. **HN Visibility Highlights** - Supplied HN story topics and engagement counters; do not infer sentiment, consensus, or controversy without comment text
6. **Official Announcements** - Important content published by Anthropic and OpenAI this week (if any)
7. **Open Questions** - Evidence-backed topics worth monitoring; do not predict releases or events

Hard evidence boundary: cumulative counters are not weekly deltas. Do not rank project activity, infer strategy or community health, or claim a trend unless the supplied dated digests show repeated, comparable evidence.

Style: English, concise and professional, helping technical developers quickly grasp the week's developments.
`;
  }

  return `你是一位专注于 AI 开源生态的技术分析师。以下是过去 7 天（${weekStr}）的 AI 工具社区每日动态摘要，请生成本周综合回顾报告。

${digestEntries}

---

请生成《AI 工具生态周报》，包含以下部分：

1. **本周要闻** - 5-8 条本周最重要的事件、版本发布、社区动向，每条附日期
2. **CLI 工具已验证变化** - 各 AI CLI 工具（Claude Code、Codex、Gemini CLI 等）有日期、可溯源的变化
3. **AI Agent 生态** - OpenClaw 及同赛道项目的本周重要进展
4. **重复出现的开源主题** - 只归纳多个有日期报告重复出现的技术主题，并标明日期
5. **HN 可见话题** - 只汇总输入中的 HN 标题和互动计数；没有评论正文时不得推断情绪、共识或争议
6. **官方动态** - Anthropic 和 OpenAI 本周发布的重要内容（若有）
7. **待观察问题** - 只列出有证据支持、值得继续跟踪的问题，不预测发布或事件

证据边界：累计计数不是本周增量。除非输入包含跨日可比、重复出现的明确证据，否则不得比较项目活跃度、推断战略或社区健康度，也不得声称趋势已经形成。

语言要求：中文，简洁专业，适合技术开发者快速掌握一周动态。
`;
}

export function buildMonthlyPrompt(
  sourceDigests: Record<string, string>,
  monthStr: string,
  lang: Lang = "zh",
): string {
  const digestEntries = Object.entries(sourceDigests)
    .map(([key, content]) => `## ${key}\n\n${content}`)
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a technical analyst focused on the AI open-source ecosystem. The following are ${monthStr} AI tool community digest summaries (${Object.keys(sourceDigests).length} reports total). Generate a comprehensive monthly review.

${digestEntries}

---

Generate an AI Tools Ecosystem Monthly Report with these sections:

1. **Month's Top Stories** - 5-10 most important events and milestones this month, in chronological order
2. **CLI Tools Monthly Evidence** - Major releases and dated verified changes for each key AI CLI tool
3. **AI Agent Ecosystem Monthly Review** - Verified releases and project changes from the supplied reports
4. **Repeated Technical Themes** - Themes that appear in multiple dated reports, with those dates cited
5. **Observed Community Signals** - Supplied counters and discussions, without sentiment or health claims unless comment text and comparable deltas exist
6. **Official Announcements Review** - Facts and stated rationale from Anthropic and OpenAI first-party content
7. **Open Questions** - Evidence-backed questions to monitor, without predicting releases or events

Hard evidence boundary: do not infer strategy, project growth, community health, or month-over-month change from cumulative counters or incomplete coverage. Do not turn crawler visibility into company activity.

Style: English, in-depth analysis, data-driven, suited for monthly retrospectives and strategic decision-making.
`;
  }

  return `你是一位专注于 AI 开源生态的技术分析师。以下是 ${monthStr} 月的 AI 工具社区动态汇总（共 ${Object.keys(sourceDigests).length} 份报告），请生成本月综合回顾报告。

${digestEntries}

---

请生成《AI 工具生态月报》，包含以下部分：

1. **月度要闻** - 本月最重要的 5-10 条事件和里程碑，按时间排列
2. **CLI 工具月度证据** - 各主要 AI CLI 工具有日期的重要版本与已验证变化
3. **AI Agent 生态月报** - 输入报告明确记录的发布与项目变化
4. **重复出现的技术主题** - 只总结多个有日期报告中重复出现的主题，并标明日期
5. **可观察社区信号** - 汇总输入中的计数与讨论；没有评论正文和可比增量时不得判断情绪或健康度
6. **官方动态回顾** - 只写 Anthropic 和 OpenAI 第一方材料明确陈述的事实与理由
7. **待观察问题** - 列出有证据支持、值得继续跟踪的问题，不预测发布或事件

证据边界：不得用累计计数或不完整覆盖推断战略、项目增长、社区健康度或月度变化；不得把抓取可见性解释成公司活跃度。

语言要求：中文，深度分析，数据驱动，适合月度复盘和战略决策参考。
`;
}

// ---------------------------------------------------------------------------
// Highlights prompt — extracts structured highlights from finished reports
// for use in Telegram notifications.
// ---------------------------------------------------------------------------

export interface ReportHighlights {
  [reportId: string]: string[];
}

export function buildHighlightsPrompt(
  reportContents: Record<string, string>,
  lang: Lang = "zh",
  itemsPerReport: number = 6,
): string {
  const sections = Object.entries(reportContents)
    .map(([id, content]) => `## [${id}]\n\n${content.slice(0, 2000)}`)
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a concise news editor. The following are today's AI ecosystem report excerpts, each labeled with a report ID.

${sections}

---

For each report, extract ${itemsPerReport} of the most noteworthy highlights — the kind that would make a reader want to click through. Each highlight should be a single short sentence (under 60 characters).

Return ONLY valid JSON, no markdown fences, no explanation. Format:
{"ai-cli":["highlight 1","highlight 2",...],"ai-agents":["highlight 1","highlight 2",...],...}

Rules:
- Use the exact report IDs from the [brackets] above as keys
- Only include reports that have meaningful content (skip reports with failure messages or no activity)
- ${itemsPerReport} highlights per report, each under 60 characters
- Focus on claims explicitly present in each excerpt: releases, documented features, named projects, or visible discussion topics
- Treat rankings and star/comment totals as snapshot metadata, not popularity, momentum, adoption, or consensus
- Be specific: include project names, version numbers, dates, and links where present; do not invent missing context`;
  }

  return `你是一位简洁的新闻编辑。以下是今日 AI 生态各报告的摘要，每个报告用 ID 标注。

${sections}

---

为每份报告提取 ${itemsPerReport} 条最值得关注的亮点——能让读者产生点击欲望的那种。每条亮点用一句简短的话（不超过 30 个字）。

只返回合法的 JSON，不要 markdown 代码块，不要解释。格式：
{"ai-cli":["亮点1","亮点2",...],"ai-agents":["亮点1","亮点2",...],...}

规则：
- 用上面方括号中的报告 ID 作为 key
- 只包含有实际内容的报告（跳过失败或无活动的报告）
- 每个报告 ${itemsPerReport} 条亮点，每条不超过 30 个字
- 只提取原摘要明示的发布、功能、项目和可见讨论主题
- 排名、star 数和评论总数只是快照元数据，不得改写为热度、增长、采用率或共识
- 要具体：保留原文已有的项目名、版本号、日期和链接，不得补写缺失背景
- 每条亮点必须用中文表述；即使原文（论文标题、模型名、讨论标题等）是英文，也要翻译成中文，仅项目名、模型名、产品名等专有名词可保留英文，不要直接照抄整句英文`;
}

export function buildHnPrompt(data: HnData, dateStr: string, lang: Lang = "zh"): string {
  const storiesText = data.stories
    .map((s, i) =>
      lang === "en"
        ? `${i + 1}. **${s.title}**\n` +
          `   Link: ${s.url}\n` +
          `   Discussion: ${s.hnUrl}\n` +
          `   HN Rank: ${s.hnRank ?? i + 1} | Score: ${s.points} | Comments: ${s.comments} | Author: ${s.author} | Time: ${s.createdAt.slice(0, 16)}`
        : `${i + 1}. **${s.title}**\n` +
          `   链接: ${s.url}\n` +
          `   讨论: ${s.hnUrl}\n` +
          `   HN 排名: ${s.hnRank ?? i + 1} | 分数: ${s.points} | 评论: ${s.comments} | 作者: ${s.author} | 时间: ${s.createdAt.slice(0, 16)}`,
    )
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI industry news analyst. The following are AI-related posts from the current Hacker News topstories feed as of ${dateStr} (ordered by HN rank, ${data.stories.length} total):

---

${storiesText}

---

Generate a structured Hacker News AI Community Digest in English:

1. **Today's Highlights** — 3-5 sentences on the highest-ranked AI-linked stories. Treat score/comment counts only as engagement counters, not sentiment.

2. **Top News & Discussions** — Organized by category, render a **Markdown table** per category with exactly these columns:

   | Title | Score | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Title**: title as a Markdown link to the original article, followed by a " · [HN](discussion-url)" link to the HN thread
   - **Score / Comments**: copy the numbers from the input verbatim
   - **Summary**: 1-2 sentences on what the linked title/source says and why it may be worth reading. Do NOT infer community reaction from score/comment counts.
   - Select the 2-5 most representative items per category; omit a category's table if empty

   Categories:
   - 🔬 Models & Research (new model releases, papers, benchmarks)
   - 🛠️ Tools & Engineering (open-source projects, frameworks, engineering practices)
   - 🏢 Industry News (company news, funding, product launches)
   - 💬 Opinions & Debates (notable Ask HN, Show HN, or hot discussion threads)

3. **Engagement Signal** — 100-200 words describing only observable engagement:
   - Which stories have the highest score/comment counts?
   - Do not claim controversy, consensus, sentiment, or cycle-over-cycle change; comment text and previous-cycle snapshots are not provided.

4. **Worth Deep Reading** — List 2-3 pieces most worth developers/researchers reading in depth, with brief reasoning

Style: English, concise and professional, preserve all original links.
`;
  }

  return `你是 AI 行业资讯分析师。以下是 ${dateStr} 从 Hacker News topstories 抓取的 AI 相关热门帖子（按 HN 排名顺序，共 ${data.stories.length} 条）：

---

${storiesText}

---

请生成一份结构清晰的《Hacker News AI 社区动态日报》，要求：

1. **今日速览** — 3~5 句话，概括 HN 排名靠前的 AI 相关链接。分数和评论数只能作为参与度计数，不能当成情绪证据。

2. **热门新闻与讨论** — 按以下分类整理，每个分类用 **Markdown 表格**呈现，列固定为：

   | 标题 | 分数 | 评论 | 简要说明 |
   | :--- | ---: | ---: | :--- |

   - **标题**：标题做成指向原文的 Markdown 链接，其后附 " · [HN](讨论链接)" 指向 HN 讨论
   - **分数 / 评论**：数字照抄输入，不要重算
   - **简要说明**：1~2 句话——链接标题/来源明确说了什么、为什么可能值得看。严禁根据分数或评论数推断社区反应。
   - 每类选取最具代表性的 2~5 条；某分类为空则整张表省略

   分类：
   - 🔬 模型与研究（新模型发布、论文、基准测试）
   - 🛠️ 工具与工程（开源项目、框架、工程实践）
   - 🏢 产业动态（公司新闻、融资、产品发布）
   - 💬 观点与争议（值得关注的 Ask HN、Show HN 或热议帖子）

3. **参与度信号** — 100~200 字，只描述可观测事实：
   - 哪些条目的分数和评论数最高？
   - 输入没有评论正文和上一周期快照，因此不得声称争议、共识、社区情绪或环比变化。

4. **值得深读** — 列出 2~3 条今日最值得开发者/研究者深入阅读的内容，简述理由

语言要求：中文，简洁专业，保留所有原文链接。
`;
}

export function buildPhPrompt(data: PhData, dateStr: string, lang: Lang = "zh"): string {
  const productsText = data.products
    .map((p, i) =>
      lang === "en"
        ? `${i + 1}. **${p.name}** — ${p.tagline}\n` +
          `   Product Hunt: ${p.url}\n` +
          `   Website: ${p.website}\n` +
          `   Created: ${p.createdAt} | Votes: ${p.votesCount} | Comments: ${p.commentsCount} | Topics: ${p.topics.join(", ")}`
        : `${i + 1}. **${p.name}** — ${p.tagline}\n` +
          `   Product Hunt: ${p.url}\n` +
          `   官网: ${p.website}\n` +
          `   创建: ${p.createdAt} | 投票: ${p.votesCount} | 评论: ${p.commentsCount} | 话题: ${p.topics.join(", ")}`,
    )
    .join("\n\n");

  if (lang === "en") {
    return `You are an evidence-bound analyst. The following are AI-related Product Hunt entries from the collector's configured one-day posting window before ${dateStr} (sorted by the supplied cumulative vote count, ${data.products.length} total):

---

${productsText}

---

Generate a structured Product Hunt AI Products Digest in English:

1. **Observed Launch Window** — 3-5 sentences on representative supplied entries and their explicit taglines/topics

2. **Observed Products** — Organized by category, render a **Markdown table** per category with exactly these columns:

   | Product | Votes | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Product**: product name as a Markdown link to its Product Hunt page, followed by " · [site](website-url)" when a website is available
   - **Votes / Comments**: copy the numbers from the input verbatim
   - **Summary**: 1-2 sentences limited to the supplied tagline, topics, and website metadata; do not invent differentiation
   - Select the most representative products per category; omit a category's table if empty

   Categories:
   - 🤖 AI Agents & Assistants (chatbots, copilots, autonomous agents)
   - 🛠️ Developer Tools (APIs, SDKs, coding tools, dev infrastructure)
   - 📊 AI Applications (vertical products, SaaS tools powered by AI)
   - 🎨 Creative & Content (image/video/text generation, design tools)
   - 🔧 Infrastructure & Models (model serving, fine-tuning, MLOps)

3. **Sample Composition** — Count categories only within the supplied entries and list explicit use cases; do not generalize to a market trend or infer open/closed source without evidence

4. **Worth Inspecting** — 2-3 entries worth opening, with reasoning limited to supplied descriptions

Votes/comments are cumulative counters, not sentiment, adoption, quality, or a current-period delta. Style: English, concise and professional; preserve links.
`;
  }

  return `你是严格受证据约束的分析师。以下是采集器在 ${dateStr} 之前设定的一天发布窗口内取得的 Product Hunt AI 条目（按输入中的累计投票数排序，共 ${data.products.length} 个）：

---

${productsText}

---

请生成一份结构清晰的《Product Hunt AI 产品日报》，要求：

1. **可见发布窗口** — 3~5 句话概括输入中的代表性条目及其明确 tagline/topic

2. **可见产品** — 按以下分类整理，每个分类用 **Markdown 表格**呈现，列固定为：

   | 产品 | 投票 | 评论 | 简要说明 |
   | :--- | ---: | ---: | :--- |

   - **产品**：产品名做成指向 Product Hunt 页面的 Markdown 链接，有官网则其后附 " · [官网](官网链接)"
   - **投票 / 评论**：数字照抄输入，不要重算
   - **简要说明**：1~2 句话，只使用 tagline、topics 与官网元数据，不编造差异化优势
   - 每类选取最具代表性的产品；某分类为空则整张表省略

   分类：
   - 🤖 AI 智能体与助手（聊天机器人、Copilot、自主 Agent）
   - 🛠️ 开发者工具（API、SDK、编程工具、开发基础设施）
   - 📊 AI 应用（垂直场景产品、AI 驱动的 SaaS 工具）
   - 🎨 创意与内容（图像/视频/文本生成、设计工具）
   - 🔧 基础设施与模型（模型服务、微调、MLOps）

3. **样本构成** — 只统计输入条目中的类别并列出明示用例；不得外推市场趋势，缺少证据时不得判断开源/闭源

4. **值得查看** — 列出 2~3 个值得点开的条目，理由限于输入描述

投票/评论是累计计数，不代表情绪、采用率、质量或本期增量。语言要求：中文，简洁专业，保留链接。
`;
}

// ---------------------------------------------------------------------------
// ArXiv prompt
// ---------------------------------------------------------------------------

export function buildArxivPrompt(data: ArxivData, dateStr: string, lang: Lang = "zh"): string {
  const papersText = data.papers
    .map((p, i) => {
      const authors =
        p.authors.length > 3 ? p.authors.slice(0, 3).join(", ") + " et al." : p.authors.join(", ");
      const cats = p.categories.slice(0, 3).join(", ");
      return lang === "en"
        ? `${i + 1}. **${p.title}**\n` +
            `   Link: ${p.url}\n` +
            `   Authors: ${authors} | Categories: ${cats}\n` +
            `   Published: ${p.published.slice(0, 10)}\n` +
            `   Abstract: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`
        : `${i + 1}. **${p.title}**\n` +
            `   链接: ${p.url}\n` +
            `   作者: ${authors} | 分类: ${cats}\n` +
            `   发布: ${p.published.slice(0, 10)}\n` +
            `   摘要: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`;
    })
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI research analyst. The following are recent AI-related papers from ArXiv as of ${dateStr} (${data.papers.length} papers from cs.AI, cs.CL, cs.LG):

---

${papersText}

---

Generate a structured ArXiv AI Research Digest in English:

1. **Submission Snapshot** — 3-5 sentences on themes explicitly present in supplied titles/abstracts; paper claims are not independently validated breakthroughs

2. **Relevant Papers** — Select 8-15 papers by explicit AI relevance and engineering usefulness, organized by theme. Under each theme header, render a **Markdown table** with exactly these columns:

   | Paper | Authors | Summary |
   | :--- | :--- | :--- |

   - **Paper**: title as a Markdown link to its ArXiv URL
   - **Authors**: abbreviated (first 3 + et al.)
   - **Summary**: 2 sentences — what the abstract claims and why a reader may inspect it; attribute unverified results to the paper
   - Omit a theme's table if no paper falls under it

   Themes:
   - 🧠 Large Language Models (architecture, training, alignment, evaluation)
   - 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
   - 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
   - 📊 Applications (domain-specific, multimodal, code generation)

3. **Repeated Submission Themes** — 100-200 words on themes repeated in this bounded category/query sample; do not generalize prevalence or novelty

4. **Worth Deep Reading** — 2-3 papers most worth reading in full, with reasoning

Style: English, concise and professional; preserve links and distinguish paper claims from verified facts.
`;
  }

  return `你是 AI 研究分析师。以下是 ${dateStr} ArXiv 上最新的 AI 相关论文（共 ${data.papers.length} 篇，来自 cs.AI、cs.CL、cs.LG）：

---

${papersText}

---

请生成一份结构清晰的《ArXiv AI 研究日报》，要求：

1. **投稿快照** — 3~5 句话概括标题/摘要中明确出现的主题；论文自述不等于已独立验证的突破

2. **相关论文** — 按明确的 AI 相关性与工程价值选出 8~15 篇，按主题分类。在每个主题标题下用 **Markdown 表格**呈现，列固定为：

   | 论文 | 作者 | 简要说明 |
   | :--- | :--- | :--- |

   - **论文**：标题做成指向其 ArXiv 链接的 Markdown 链接
   - **作者**：缩写（前 3 位 + et al.）
   - **简要说明**：2 句话——摘要声称的贡献及为何值得查看；未验证结果必须归因于论文
   - 某主题下若无论文则整张表省略

   主题：
   - 🧠 大语言模型（架构、训练、对齐、评估）
   - 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
   - 🔧 方法与框架（新技术、基准测试、效率优化）
   - 📊 应用（垂直领域、多模态、代码生成）

3. **重复出现的投稿主题** — 100~200 字，只归纳本次有界分类/查询样本中重复出现的主题，不外推普遍性或新颖性

4. **值得精读** — 2~3 篇最值得完整阅读的论文，简述理由

语言要求：中文，简洁专业，保留链接，并区分论文自述与已验证事实。
`;
}

// ---------------------------------------------------------------------------
// Hugging Face prompt
// ---------------------------------------------------------------------------

export function buildHfPrompt(data: HfData, dateStr: string, lang: Lang = "zh"): string {
  const modelsText = data.models
    .map((m, i) =>
      lang === "en"
        ? `${i + 1}. **${m.id}**\n` +
          `   Link: ${m.url}\n` +
          `   Author: ${m.author} | Pipeline: ${m.pipelineTag || "N/A"}\n` +
          `   Last modified: ${m.lastModified || "unknown"}\n` +
          `   Likes: ${m.likes.toLocaleString()} | Downloads: ${m.downloads.toLocaleString()}\n` +
          `   Tags: ${m.tags.slice(0, 5).join(", ")}`
        : `${i + 1}. **${m.id}**\n` +
          `   链接: ${m.url}\n` +
          `   作者: ${m.author} | 任务: ${m.pipelineTag || "N/A"}\n` +
          `   最后修改: ${m.lastModified || "未知"}\n` +
          `   点赞: ${m.likes.toLocaleString()} | 下载: ${m.downloads.toLocaleString()}\n` +
          `   标签: ${m.tags.slice(0, 5).join(", ")}`,
    )
    .join("\n\n");

  if (lang === "en") {
    return `You are an evidence-bound analyst. The following models were returned by Hugging Face Hub's likes7d-sorted API query as of ${dateStr} (${data.models.length} models). Displayed likes/downloads are supplied counters, not weekly deltas:

---

${modelsText}

---

Generate a structured Hugging Face Trending Models Digest in English:

1. **Observed Query Highlights** — 3-5 sentences on representative returned models and explicit metadata; do not call lastModified a release date

2. **Returned Models** — Organized by category. Under each category header, render a **Markdown table** with exactly these columns:

   | Model | Author | Likes | Downloads | Summary |
   | :--- | :--- | ---: | ---: | :--- |

   - **Model**: model name as a Markdown link to its HF URL
   - **Likes / Downloads**: copy the numbers from the input verbatim (keep the thousands separators; do not recompute or round)
   - **Summary**: 1-2 sentences limited to ID, pipeline, tags, and exact counters; do not invent capabilities or explain causality
   - Omit a category's table entirely if no model falls under it

   Categories:
   - 🧠 Language Models (LLMs, chat models, instruction-tuned)
   - 🎨 Multimodal & Generation (image, video, audio, text-to-X)
   - 🔧 Specialized Models (code, math, medical, embeddings)
   - 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

3. **Sample Composition** — Describe repeated model families/tags in this returned sample only; do not infer momentum, release activity, or open/proprietary ecosystem trends

4. **Worth Exploring** — 2-3 models most worth trying or studying, with reasoning

Counters are cumulative and no prior snapshot is supplied. Style: English, concise and professional; preserve links.
`;
  }

  return `你是严格受证据约束的分析师。以下模型由 Hugging Face Hub 的 likes7d 排序查询在 ${dateStr} 返回（共 ${data.models.length} 个）；展示的点赞/下载是输入计数，不是周增量：

---

${modelsText}

---

请生成一份结构清晰的《Hugging Face 热门模型日报》，要求：

1. **查询快照** — 3~5 句话概括代表性返回模型与明示元数据；不得把 lastModified 写成发布日期

2. **返回模型** — 按以下分类整理。在每个分类标题下，用 **Markdown 表格**呈现，列固定为：

   | 模型 | 作者 | 点赞 | 下载 | 简要说明 |
   | :--- | :--- | ---: | ---: | :--- |

   - **模型**：模型名，做成指向其 HF 链接的 Markdown 链接
   - **点赞 / 下载**：数字直接照抄输入数据（保留千位分隔符，不要重新计算或四舍五入）
   - **简要说明**：1~2 句话，只使用 ID、pipeline、tags 与明确计数；不得编造能力或上榜原因
   - 某个分类下若没有模型，则整张表省略

   分类：
   - 🧠 语言模型（LLM、对话模型、指令微调）
   - 🎨 多模态与生成（图像、视频、音频、文本到X）
   - 🔧 专用模型（代码、数学、医疗、嵌入）
   - 📦 微调与量化（社区微调、GGUF、AWQ）

3. **样本构成** — 只描述本次返回样本中重复出现的模型家族/标签；不得推断势头、发布活动或开源/闭源生态趋势

4. **值得探索** — 2~3 个最值得尝试或研究的模型，简述理由

计数是累计值，且没有上一周期快照。语言要求：中文，简洁专业，保留链接。
`;
}

// ---------------------------------------------------------------------------
// Community prompt (Dev.to + Lobste.rs combined)
// ---------------------------------------------------------------------------

export function buildCommunityPrompt(
  devto: DevtoData,
  lobsters: LobstersData,
  dateStr: string,
  lang: Lang = "zh",
): string {
  const devtoText =
    devto.articles.length > 0
      ? devto.articles
          .map((a, i) =>
            lang === "en"
              ? `${i + 1}. **${a.title}**\n` +
                `   Link: ${a.url}\n` +
                `   Published: ${a.publishedAt} | Author: ${a.user} | Reactions: ${a.positiveReactionsCount} | Comments: ${a.commentsCount} | Reading: ${a.readingTimeMinutes} min\n` +
                `   Tags: ${a.tags.join(", ")}\n` +
                `   ${a.description}`
              : `${i + 1}. **${a.title}**\n` +
                `   链接: ${a.url}\n` +
                `   发布: ${a.publishedAt} | 作者: ${a.user} | 点赞: ${a.positiveReactionsCount} | 评论: ${a.commentsCount} | 阅读: ${a.readingTimeMinutes} 分钟\n` +
                `   标签: ${a.tags.join(", ")}\n` +
                `   ${a.description}`,
          )
          .join("\n\n")
      : lang === "en"
        ? "(No Dev.to articles available)"
        : "（无 Dev.to 文章）";

  const lobstersText =
    lobsters.stories.length > 0
      ? lobsters.stories
          .map((s, i) =>
            lang === "en"
              ? `${i + 1}. **${s.title}**\n` +
                `   Link: ${s.url}\n` +
                `   Discussion: ${s.commentsUrl}\n` +
                `   Published: ${s.publishedAt} | Score: ${s.score} | Comments: ${s.commentCount} | Author: ${s.author} | Tags: ${s.tags.join(", ")}`
              : `${i + 1}. **${s.title}**\n` +
                `   链接: ${s.url}\n` +
                `   讨论: ${s.commentsUrl}\n` +
                `   发布: ${s.publishedAt} | 分数: ${s.score} | 评论: ${s.commentCount} | 作者: ${s.author} | 标签: ${s.tags.join(", ")}`,
          )
          .join("\n\n")
      : lang === "en"
        ? "(No Lobste.rs stories available)"
        : "（无 Lobste.rs 内容）";

  if (lang === "en") {
    return `You are an evidence-bound analyst. The following is a bounded AI-related Dev.to/Lobste.rs listing as of ${dateStr}. Comment bodies are not supplied and counters are not period deltas:

## Dev.to Articles (${devto.articles.length} articles)

${devtoText}

---

## Lobste.rs Stories (${lobsters.stories.length} stories)

${lobstersText}

---

Generate a structured Tech Community AI Digest in English:

1. **Visible Listing Highlights** — 3-5 sentences on topics explicit in supplied titles, descriptions, and tags

2. **Dev.to Entries** — Select 5-10 relevant articles as a **Markdown table**:

   | Article | Reactions | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Article**: title as a Markdown link
   - **Reactions / Comments**: copy the numbers from the input verbatim
   - **Summary**: 1-2 sentences limited to the supplied title/description/tags

3. **Lobste.rs Entries** — Select 3-8 relevant stories as a **Markdown table**:

   | Story | Score | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Story**: title as a Markdown link, followed by " · [discuss](discussion-url)"
   - **Score / Comments**: copy the numbers from the input verbatim
   - **Summary**: 1 sentence limited to title/tags because linked text and comments are not supplied

4. **Repeated Visible Themes** — Themes repeated in supplied titles/descriptions/tags, naming the entries; do not infer community opinion, concern, consensus, or emergence

5. **Worth Reading** — 2-3 articles/stories most worth reading in depth

Reactions/scores/comments are cumulative engagement counters, not sentiment, quality, consensus, or current heat. Style: English, concise and developer-friendly; preserve links.
`;
  }

  return `你是严格受证据约束的分析师。以下是 ${dateStr} 的 Dev.to/Lobste.rs AI 相关有界列表；输入没有评论正文，计数也不是本期增量：

## Dev.to 文章（共 ${devto.articles.length} 篇）

${devtoText}

---

## Lobste.rs 内容（共 ${lobsters.stories.length} 条）

${lobstersText}

---

请生成一份结构清晰的《技术社区 AI 动态日报》，要求：

1. **可见列表速览** — 3~5 句话概括标题、描述和标签中明确出现的主题

2. **Dev.to 条目** — 选出 5~10 篇明确相关的文章，用 **Markdown 表格**呈现：

   | 文章 | 点赞 | 评论 | 简要说明 |
   | :--- | ---: | ---: | :--- |

   - **文章**：标题做成 Markdown 链接
   - **点赞 / 评论**：数字照抄输入，不要重算
   - **简要说明**：1~2 句话，只使用输入标题、描述和标签

3. **Lobste.rs 条目** — 选出 3~8 条明确相关的内容，用 **Markdown 表格**呈现：

   | 标题 | 分数 | 评论 | 简要说明 |
   | :--- | ---: | ---: | :--- |

   - **标题**：标题做成 Markdown 链接，其后附 " · [讨论](讨论链接)"
   - **分数 / 评论**：数字照抄输入，不要重算
   - **简要说明**：1 句话，只使用标题/标签，因为输入没有链接正文或评论正文

4. **重复出现的可见主题** — 只归纳标题/描述/标签中重复出现的主题并标明条目；不得推断社区观点、关切、共识或“正在兴起”

5. **值得精读** — 2~3 篇最值得深入阅读的内容

Reaction/分数/评论是累计互动计数，不代表情绪、质量、共识或当前热度。语言要求：中文，简洁专业，保留链接。
`;
}
