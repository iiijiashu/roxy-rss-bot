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
});
