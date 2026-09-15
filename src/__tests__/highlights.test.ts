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
    expect(result["ai-trending"]?.every((item) => Array.from(item).length <= 30)).toBe(true);
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
