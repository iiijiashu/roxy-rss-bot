import { describe, expect, it } from "vitest";
import { extractReportHighlights } from "../prompts-data.ts";

describe("extractReportHighlights", () => {
  it("extracts concise Chinese highlights from report prose and tables", () => {
    const result = extractReportHighlights(
      {
        "ai-trending": `# AI 开源趋势日报 2026-09-15

> 数据来源: GitHub Trending

## 今日速览
今天语音模型和代码代理持续升温，多个开源项目出现明显增长。

## 各维度热门项目

| 项目 | Stars | 简要说明 |
| :--- | ---: | :--- |
| [acme/voice](https://github.com/acme/voice) | 1234 | Voice 2.0 发布，新增本地实时语音代理能力。 |
| [acme/code-agent](https://github.com/acme/code-agent) | 987 | Code Agent 增加多仓库审查和 MCP 支持。 |`,
      },
      "zh",
      6,
    );

    expect(result["ai-trending"]?.length).toBeGreaterThanOrEqual(3);
    expect(result["ai-trending"]?.join("\n")).toContain("acme/voice");
    expect(result["ai-trending"]?.join("\n")).not.toContain("https://");
    expect(result["ai-trending"]?.join("\n")).not.toContain("今日速览");
    expect(result["ai-trending"]?.join("\n")).not.toContain("项目：简要说明");
    expect(result["ai-trending"]?.every((item) => Array.from(item).length <= 30)).toBe(true);
  });

  it("skips arbitrary table headers by Markdown structure", () => {
    const result = extractReportHighlights(
      {
        "ai-arxiv": `# ArXiv 日报

## 重点论文
| 论文 | 方向 | 简要说明 |
| :--- | :--- | :--- |
| [Agent Paper](https://example.com/paper) | Agents | 论文提出新的多智能体协作训练方法。 |`,
        "ai-hf": `# Hugging Face 日报

## 热门模型
| 模型 | 下载量 | 简要说明 |
| :--- | ---: | :--- |
| [Acme-3B](https://example.com/model) | 12000 | 新模型支持更低显存的本地推理。 |`,
      },
      "zh",
    );

    const joined = JSON.stringify(result);
    expect(joined).not.toContain("论文：简要说明");
    expect(joined).not.toContain("模型：简要说明");
    expect(joined).not.toContain("重点论文");
    expect(joined).not.toContain("热门模型");
    expect(result["ai-arxiv"]?.join("\n")).toContain("多智能体协作训练方法");
    expect(result["ai-hf"]?.join("\n")).toContain("低显存的本地推理");
  });

  it("drops navigation-only links and details structure before findings", () => {
    const result = extractReportHighlights(
      {
        "ai-cli": `# AI CLI 日报

- [Claude Code](https://github.com/anthropics/claude-code)
- **[OpenAI Codex](https://github.com/openai/codex)**
<details>
<summary>仓库导航</summary>
</details>

## 热门新闻与讨论
Claude Code 新版本加入并行子代理，并修复长会话上下文恢复问题。
Codex 更新审查流程，降低多文件修改时的冲突概率。`,
      },
      "zh",
      6,
    );

    const items = result["ai-cli"] ?? [];
    expect(items).toHaveLength(2);
    expect(items.join("\n")).toContain("并行子代理");
    expect(items.join("\n")).toContain("多文件修改");
    expect(items).not.toContain("Claude Code");
    expect(items).not.toContain("OpenAI Codex");
    expect(items.join("\n")).not.toContain("仓库导航");
  });

  it("keeps Chinese notifications free of English-only candidates", () => {
    const result = extractReportHighlights(
      {
        "ai-community": `# 社区日报

## Today's Highlights
- OpenAI launches a new agent runtime with faster tool calls.
- Claude Code 发布新版本，修复多代理任务恢复问题。
- DeepSeek V4.1 improves code generation benchmarks.`,
      },
      "zh",
    );

    expect(result["ai-community"]).toEqual(["Claude Code 发布新版本，修复多代理任务恢复问题。"]);
  });

  it("extracts English highlights and enforces the language length limit", () => {
    const result = extractReportHighlights(
      {
        "ai-hn": `# Hacker News AI Report

## Overview
Open source coding agents dominated discussion today with several major releases.

- Claude Code shipped a new multi-agent workflow for repository maintenance.
- A compact local model reached a new coding benchmark milestone.`,
      },
      "en",
      4,
    );

    expect(result["ai-hn"]?.length).toBeGreaterThanOrEqual(2);
    expect(result["ai-hn"]?.every((item) => Array.from(item).length <= 60)).toBe(true);
  });

  it("skips reports that only contain failure or no-content messages", () => {
    const result = extractReportHighlights(
      {
        "ai-web": "# Web report\n\nNo new content detected, skipping report.",
        "ai-hf": "# HF report\n\n- 新模型发布并进入热门榜单。",
      },
      "zh",
    );

    expect(result["ai-web"]).toBeUndefined();
    expect(result["ai-hf"]).toEqual(["新模型发布并进入热门榜单。"]);
  });

  it("filters explicit no-activity variants in both languages", () => {
    const zh = extractReportHighlights(
      {
        "ai-agents": `# Agents\n\n- 过去24小时无活动。\n- OpenClaw 新增中文插件市场和权限隔离。`,
      },
      "zh",
    );
    const en = extractReportHighlights(
      {
        "ai-agents": `# Agents\n\n- No activity in the last 24 hours.\n- OpenClaw added safer plugin isolation and recovery.`,
      },
      "en",
    );

    expect(zh["ai-agents"]).toEqual(["OpenClaw 新增中文插件市场和权限隔离。"]);
    expect(en["ai-agents"]).toEqual(["OpenClaw added safer plugin isolation and recovery."]);
  });

  it("skips metadata bullets and auto-generated footer but keeps real failure-related findings", () => {
    const result = extractReportHighlights(
      {
        "ai-hn": `# HN 日报

- **原文链接**: https://example.com/post
- **HN讨论**: https://news.ycombinator.com/item?id=1
- **分数**: 267 | 评论: 97
- API Failure 策略讨论失败恢复边界，而非状态失败。

---
*本日报由 [agents-radar](https://github.com/example/radar) 自动生成。*`,
      },
      "zh",
    );

    expect(result["ai-hn"]).toEqual(["API Failure 策略讨论失败恢复边界，而非状态失败。"]);
  });

  it("ignores transposed comparison tables and only reads item-list tables with summary columns", () => {
    const result = extractReportHighlights(
      {
        "ai-agents": `# Agent comparison

| Project | OpenClaw | NanoBot |
| --- | --- | --- |
| Issues Count | 47 open issues | 7 open issues |
| PR Count | 50 pull requests updated | 31 pull requests updated |
| Release Status | No new releases today | 3 new alpha releases |
| Health Score | Active with mixed user satisfaction | Active with strong contributions |

| 项目 | Stars | 简要说明 |
| :--- | ---: | :--- |
| [OpenClaw](https://example.com/openclaw) | 12000 | OpenClaw 新增安全插件隔离和任务恢复。 |
| [NanoBot](https://example.com/nanobot) | 9000 | 无新版本发布 |`,
      },
      "zh",
    );

    const items = result["ai-agents"] ?? [];
    expect(items).toHaveLength(1);
    expect(items[0]).toContain("OpenClaw：OpenClaw 新增安全插件隔离");
    expect(items.join("\n")).not.toContain("Issues Count");
    expect(items.join("\n")).not.toContain("Health Score");
    expect(items.join("\n")).not.toContain("无新版本发布");
  });

  it("filters English no-release status rows while retaining useful summaries", () => {
    const result = extractReportHighlights(
      {
        "ai-cli": `# CLI report

| Project | Stars | Summary |
| :--- | ---: | :--- |
| Claude Code | 1000 | No new releases today |
| Codex | 900 | Codex added safer parallel review and recovery. |`,
      },
      "en",
    );

    expect(result["ai-cli"]).toEqual(["Codex：Codex added safer parallel review and recovery."]);
  });

  it("filters prefixed no-update/no-release status variants but keeps explanatory follow-ups", () => {
    const zh = extractReportHighlights(
      {
        "ai-cli": `# CLI report\n\n- 今日无新 PR 更新。\n- 今天无新版本发布。\n- Codex 修复并发审查中的任务恢复问题。`,
      },
      "zh",
    );
    const en = extractReportHighlights(
      {
        "ai-cli": `# CLI report\n\n- None. No new releases were published today.\n- No new releases today. Users should monitor PR #2849 for the next security fix.`,
      },
      "en",
    );

    expect(zh["ai-cli"]).toEqual(["Codex 修复并发审查中的任务恢复问题。"]);
    expect(en["ai-cli"]).toHaveLength(1);
    expect(en["ai-cli"]?.[0]).toContain("Users should monitor PR #2849");
    expect(en["ai-cli"]?.[0]).toMatch(/…$/u);
  });

  it("filters localized generation-failure status messages with warning prefixes", () => {
    const zh = extractReportHighlights(
      {
        "ai-cli": `# CLI report\n\n⚠️ 摘要生成失败。\n⚠️ Skills 摘要生成失败。\n⚠️ 趋势报告生成失败。`,
      },
      "zh",
    );
    const en = extractReportHighlights(
      {
        "ai-cli": `# CLI report\n\n⚠️ Summary generation failed.\n⚠️ Skills summary generation failed.\n⚠️ Trending report generation failed.`,
      },
      "en",
    );

    expect(zh["ai-cli"]).toBeUndefined();
    expect(en["ai-cli"]).toBeUndefined();
  });

  it("deduplicates repeated highlights", () => {
    const result = extractReportHighlights(
      {
        "ai-cli": `# CLI report

- Claude Code 发布 v2.0。
- Claude Code 发布 v2.0。
- Codex 新增并行审查能力。`,
      },
      "zh",
    );

    expect(result["ai-cli"]).toEqual(["Claude Code 发布 v2.0。", "Codex 新增并行审查能力。"]);
  });

  it("does not merge distinct findings that collide after display truncation", () => {
    const shared = "Agnes 3.0 发布后社区反馈集中在确定性高亮与请求预算的边界";
    const result = extractReportHighlights(
      {
        probe: `- ${shared}，A 组报告解析失败。\n- ${shared}，B 组报告出现重复条目。`,
      },
      "zh",
      6,
    );

    const items = result.probe ?? [];
    expect(items).toHaveLength(2);
    expect(items[0]).not.toBe(items[1]);
    expect(items.every((item) => Array.from(item).length <= 30)).toBe(true);
  });

  it("rejects a single table column whose label superficially combines subject and detail words", () => {
    const result = extractReportHighlights(
      {
        probe: `| 项目摘要 |\n| --- |\n| Agnes 3.0 新增确定性高亮 |`,
      },
      "zh",
    );

    expect(result.probe).toBeUndefined();
  });

  it("filters formatted warning-only failure bullets but keeps explanatory failure findings", () => {
    const result = extractReportHighlights(
      {
        probe: `- **⚠️ 摘要生成失败。**\n- 趋势报告生成失败。根因是 Agnes 3.0 限流，恢复策略需要调整。`,
      },
      "zh",
    );

    expect(result.probe).toEqual(["趋势报告生成失败。根因是 Agnes 3.0 限流，恢复策…"]);
  });

  it("keeps inline-code pipes inside Markdown table detail cells", () => {
    const result = extractReportHighlights(
      {
        probe: `| 项目 | 简要说明 |\n| --- | --- |\n| GPT-5 | 支持 \`a|b\` 两种模式，并新增稳定恢复。 |`,
      },
      "zh",
    );

    expect(result.probe).toEqual(["GPT-5：支持 a|b 两种模式，并新增稳定恢复。"]);
  });

  it("filters pure status lines with arbitrary leading status emoji", () => {
    const result = extractReportHighlights(
      {
        probe: `# Status\n\n❌ No new releases today.\n⚠ No activity in the last 24 hours.\n🔴 No updates.`,
      },
      "en",
    );

    expect(result.probe).toBeUndefined();
  });

  it("truncates at grapheme boundaries", () => {
    const family = "👨‍👩‍👧‍👦";
    const result = extractReportHighlights(
      {
        probe: `- ${"中".repeat(27)}${family}这是第一条完整信息。\n- ${"文".repeat(27)}e\u0301这是第二条完整信息。`,
      },
      "zh",
    );

    const items = result.probe ?? [];
    expect(items).toHaveLength(2);
    expect(items.every((item) => !/\u200D$|\p{M}$/u.test(item.replace(/…$/u, "")))).toBe(true);
    expect(items.every((item) => highlightGraphemeCount(item) <= 30)).toBe(true);
  });

  it("filters English no-content status sentences with suffixes", () => {
    const result = extractReportHighlights(
      {
        probe: `# Web\n\nNo new content detected, skipping report.\n(metadata-only, no content to analyze.)`,
      },
      "en",
    );

    expect(result.probe).toBeUndefined();
  });

  it("skips source-count metadata without hiding normal OpenAI findings", () => {
    const result = extractReportHighlights(
      {
        probe: `- Anthropic: [anthropic.com](https://www.anthropic.com) — 0 new articles\n- OpenAI: [openai.com](https://openai.com) — 12 new articles\n- OpenAI: released a new agent runtime with safer recovery.`,
      },
      "en",
    );

    expect(result.probe).toEqual(["OpenAI: released a new agent runtime with safer recovery."]);
  });

  it("skips relevance-screening tables including excluded repositories", () => {
    const result = extractReportHighlights(
      {
        probe: `| 项目 | 判定 | 说明 |\n| :--- | :--- | :--- |\n| codecrafters-io/build-your-own-x | ❌ 排除 | 通用编程学习资源，非 AI 特定 |\n| OpenClaw | ✅ 保留 | AI Agent 项目 |\n\n| 项目 | Stars | 简要说明 |\n| --- | ---: | --- |\n| OpenClaw | 12000 | 新增安全插件隔离和任务恢复。 |`,
      },
      "zh",
    );

    expect(result.probe).toEqual(["OpenClaw：新增安全插件隔离和任务恢复。"]);
  });

  it("skips pictograph-prefixed link-only lines and metadata status lines", () => {
    const result = extractReportHighlights(
      {
        probe: `📎 [Release 详情](https://example.com/release) | [PR #123](https://example.com/pr)\n- 📎 [Repository](https://example.com/repo)\n**Status:** OPEN | **Comments:** 2\n状态：已关闭\nActual finding: new recovery logic shipped successfully.`,
      },
      "en",
    );

    expect(result.probe).toEqual(["Actual finding: new recovery logic shipped successfully."]);
  });
});

function highlightGraphemeCount(text: string): number {
  return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)).length;
}
