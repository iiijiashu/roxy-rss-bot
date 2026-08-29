/**
 * Social media content generator — uses LLM to produce platform-specific
 * articles from daily digests.
 *
 * Usage:
 *   pnpm xiaohongshu          # latest day → xiaohongshu
 *   pnpm wechat               # last 7 days → wechat weekly
 *   pnpm wechat:monthly       # last 30 days → wechat monthly
 *
 * Reads API keys from .env (local only).
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { callLlm } from "./report.ts";

const DIGESTS_DIR = "digests";
const SOCIAL_DIR = "social";

function saveSocialFile(content: string, filename: string): string {
  fs.mkdirSync(SOCIAL_DIR, { recursive: true });
  const filepath = path.join(SOCIAL_DIR, filename);
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

// Reports to include as source material (zh only)
const SOURCE_REPORTS = ["digest", "ai-cli", "ai-agents", "ai-web", "ai-trending", "ai-hn"];

function getRecentDates(n: number): string[] {
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => dateRe.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse()
    .slice(0, n);
}

function loadReports(date: string, truncate = 3000): string {
  const digestPath = path.join(DIGESTS_DIR, date, "digest.md");
  if (fs.existsSync(digestPath)) {
    const content = fs.readFileSync(digestPath, "utf-8");
    return `## [digest]\n\n${content.slice(0, truncate)}`;
  }
  const sections: string[] = [];
  for (const report of SOURCE_REPORTS) {
    const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      sections.push(`## [${report}]\n\n${content.slice(0, truncate)}`);
    }
  }
  return sections.join("\n\n---\n\n");
}

function loadMultiDayReports(days: number, truncate: number): { dateRange: string; content: string } {
  const dates = getRecentDates(days);
  if (dates.length === 0) throw new Error("No digest directories found");

  const sections: string[] = [];
  for (const date of dates) {
    const dayContent = loadReports(date, truncate);
    if (dayContent) {
      sections.push(`# ${date}\n\n${dayContent}`);
    }
  }
  if (sections.length === 0) throw new Error(`No reports found in the last ${days} days`);

  const dateRange = `${dates[dates.length - 1]} ~ ${dates[0]}`;
  return { dateRange, content: sections.join("\n\n===\n\n") };
}

function buildXiaohongshuPrompt(reports: string, date: string): string {
  return `你是一位 AI 技术领域的内容创作者，风格平实专业，擅长简洁地传达技术动态。

以下是 ${date} 的 AI 生态日报原始内容：

${reports}

---

请基于以上内容，生成一篇小红书日报笔记，要求：

**标题**：简洁明了，15-25 字，概括当日核心动态

**正文**（500-800 字）：
1. 一句话概括今天 AI 领域的整体动态
2. 精选 5-8 个当日要点，每个要点：
   - 用简短的小标题（可适当用 emoji 区分类别）
   - 1-2 句话说清楚事实和意义
   - 语言简练，不夸大
3. 结尾一句话总结
4. 最后加 3-5 个话题标签（#AI #开源 等）

**风格要求**：
- 语气平实，像写技术简报，不要夸张或煽情
- 段落短小，适合手机阅读
- 技术术语保留原文，不需要刻意通俗化
- 陈述事实为主，少用感叹号和夸张形容词
- 不要加任何链接（小红书不支持外链）

直接输出标题和正文，不要加额外说明。`;
}

function buildWechatPrompt(dateRange: string, reports: string): string {
  return `你是一位专注 AI 领域的公众号作者，文风专业但可读性强，擅长把一周的技术动态梳理成结构清晰、有深度的周刊长文。

以下是 ${dateRange} 这一周的 AI 生态日报原始内容（按日期倒序排列）：

${reports}

---

请基于以上一周的内容，生成一篇微信公众号周刊文章，要求：

**标题**：专业有力，20-35 字，体现本周核心看点，包含日期范围

**正文**（3000-5000 字）：

1. **本周速览**（200-300 字）：概括本周 AI 领域最重要的 5-8 件事，让读者 30 秒内获取核心信息

2. **AI CLI 工具周报**：各主流 AI 编程工具本周的关键进展
   - 重要版本发布和功能更新
   - 只在输入包含可比证据时总结反复出现的技术主题
   - 没有评论正文和跨日增量时，不判断社区情绪或活跃度变化

3. **AI Agent 生态**：Agent 框架和项目本周的关键动向
   - 新功能、新项目、生态合作
   - 输入明确记录的项目变化，不做行业格局排名

4. **开源与社区样本**：本周 GitHub Trending 和 Hacker News 返回的有界样本
   - 多个日期重复出现的项目（逐项标明日期，不把累计计数当周增量）
   - 新出现的值得关注的项目
   - 输入中可见的话题；没有评论正文时不概括社区共识或争议

5. **官方动态**（如有）：Anthropic、OpenAI 等公司本周的重要发布

6. **本周观点**（300-500 字）：基于一周可追溯证据给出有边界的判断
   - 本周证据最充分、最值得继续验证的变化
   - 只有多个有日期、可比较的证据重复支持时，才总结跨天模式
   - 对开发者的实操建议
   - 后续值得验证的问题，不预测发布或事件

**风格要求**：
- 专业但不晦涩，面向有一定技术背景的读者
- 使用 Markdown 格式，包括标题层级、加粗、列表
- 每个章节之间用分隔线（---）隔开
- 关键数据（star 数、版本号等）要保留
- 数字、版本和日期必须来自输入；累计计数不得改写成周增量
- 抓取可见性不等于公司或项目没有活动；不得推断未提供的战略、路线图或社区情绪
- 结尾附注：数据来源为 agents-radar 项目（https://github.com/duanyytop/agents-radar）

直接输出标题和正文，不要加额外说明。`;
}

function buildWechatMonthlyPrompt(dateRange: string, reports: string): string {
  return `你是一位专注 AI 领域的公众号作者，文风专业但可读性强，擅长从一个月的海量信息中提炼出清晰的脉络和深刻的洞察。

以下是 ${dateRange} 这一个月的 AI 生态日报原始内容（按日期倒序排列，每天的内容已做摘要）：

${reports}

---

请基于以上一个月的内容，生成一篇微信公众号月报文章，要求：

**标题**：专业有深度，20-35 字，体现本月最重要的主题，包含月份

**正文**（5000-8000 字）：

1. **月度已验证总览**（300-500 字）：按日期概括输入明确记录的 3-5 个关键事件，不把覆盖缺口解释为整体走势或转折

2. **AI 编程工具已验证变化**：本月各 CLI 工具有日期、可溯源的变化
   - 重大版本发布和里程碑（按时间线梳理）
   - 多个日期报告重复支持的技术主题
   - 只有可比增量存在时才描述月度活动变化，不比较社区规模
   - 值得关注的技术架构变化

3. **AI Agent 项目变化**：本月 Agent 项目有证据支持的变化
   - 新入场的重要项目
   - 输入明确记录的项目变化
   - 有第一方证据的技术路线与商业化进展

4. **重复出现的开源主题**：只从多个日期的 GitHub Trending 和 HN 输入中归纳可复核主题
   - 多个日期重复出现的项目（标明日期和可比证据）
   - 不用累计计数推断持续增长或热度迁移
   - 输入明确记录的新技术方向，并标明首次出现日期
   - 输入中重复出现的话题；没有评论正文时不推断社区关注迁移

5. **第一方发布回顾**：Anthropic、OpenAI 等公司材料明确记录的发布
   - 第一方材料明确记录的产品发布与陈述理由
   - 只在输入提供直接依据时分析对开发者或开源项目的具体影响

6. **月度分析与待验证问题**（500-800 字）：
   - 输入中至少被多个日期证据支持的 3 个重复主题
   - 明确区分事实、分析与仍待验证的问题
   - 不预测未来发布、路线图或公司行动
   - 给不同角色的建议（开发者 / 技术管理者 / 创业者）

**风格要求**：
- 深度分析而非信息罗列，体现月度视角的独特价值
- 使用 Markdown 格式，包括标题层级、加粗、列表
- 每个章节之间用分隔线（---）隔开
- 关键数据要保留，适当做月度对比
- 只有输入提供同口径可比数据时才做月度对比；累计计数不是月度增量
- 抓取可见性不等于公司活动；不得推断未提供的战略、社区情绪或项目健康度
- 有明确的观点和判断，不要只做信息搬运
- 结尾附注：数据来源为 agents-radar 项目（https://github.com/duanyytop/agents-radar）

直接输出标题和正文，不要加额外说明。`;
}

type Platform = "xiaohongshu" | "wechat" | "wechat:monthly";

async function generate(platform: Platform): Promise<void> {
  if (platform === "xiaohongshu") {
    const dates = getRecentDates(1);
    if (dates.length === 0) throw new Error("No digest directories found");
    const date = dates[0]!;
    const reports = loadReports(date);
    if (!reports) throw new Error(`No reports found for ${date}`);

    console.log(`[social] Generating xiaohongshu article for ${date}…`);
    const content = await callLlm(buildXiaohongshuPrompt(reports, date), 4096);
    const filepath = saveSocialFile(content, `${date}-xiaohongshu.md`);
    console.log(`[social] Saved to ${filepath}`);
  } else if (platform === "wechat") {
    const { dateRange, content: reports } = loadMultiDayReports(7, 2000);
    const latestDate = getRecentDates(1)[0]!;

    console.log(`[social] Generating wechat weekly article for ${dateRange}…`);
    const content = await callLlm(buildWechatPrompt(dateRange, reports), 16384);
    const filepath = saveSocialFile(content, `${latestDate}-wechat.md`);
    console.log(`[social] Saved to ${filepath}`);
  } else {
    // wechat:monthly — use 30 days, smaller truncation per day to fit context
    const { dateRange, content: reports } = loadMultiDayReports(30, 1000);
    const latestDate = getRecentDates(1)[0]!;

    console.log(`[social] Generating wechat monthly article for ${dateRange}…`);
    const content = await callLlm(buildWechatMonthlyPrompt(dateRange, reports), 16384);
    const filepath = saveSocialFile(content, `${latestDate}-wechat-monthly.md`);
    console.log(`[social] Saved to ${filepath}`);
  }
}

const VALID_PLATFORMS: Platform[] = ["xiaohongshu", "wechat", "wechat:monthly"];
const platform = process.argv[2] as Platform | undefined;
if (!platform || !VALID_PLATFORMS.includes(platform)) {
  console.error("Usage: tsx src/social.ts <xiaohongshu|wechat|wechat:monthly>");
  process.exit(1);
}

generate(platform).catch((e: unknown) => {
  console.error("[social]", e instanceof Error ? e.message : e);
  process.exit(1);
});
