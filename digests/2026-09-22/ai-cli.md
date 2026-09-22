# AI CLI 工具社区动态日报 2026-09-22

> 生成时间: 2026-09-22 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告 (2026-09-22)

## 1. 生态全景
当前 AI CLI 工具生态正处于从“基础代码生成”向“多智能体协作与企业级集成”深度演进的关键阶段。各主流工具均面临本地执行环境（沙箱、文件系统隔离）稳定性与模型行为可控性（成本、安全、幻觉）的双重挑战。Windows 桌面端的平台兼容性缺陷成为跨工具的共同痛点，而 MCP 协议的集成深度与资源隔离能力正在成为衡量工具工程成熟度的核心指标。社区信任度因自动化 Issue 处理机制的透明度问题受到审视，反映出工具治理与开发流程规范化的紧迫性。

## 2. 各工具活跃度对比

| 工具 | 数据源 | 过去 24h Issues | 过去 24h PRs | Release 情况 | 核心关注领域 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | GitHub | 49 | 2 | 无新增版本 | Windows 兼容性、Agent 成本控制、MCP 稳定性、Issue 追踪透明度 |
| **OpenAI Codex** | GitHub | 未提供具体总数<br>*(列出 10 个热点)* | 10+<br>*(列出 10 个)* | 多个 Rust Alpha 版本<br>*(v0.157.0-alpha.2 等)* | 网络代理、MCP 资源隔离、Windows UI 缺陷、长程任务内存管理 |

*注：Claude Code 数据基于其日报中明确给出的“49 条 Issues 和 2 条 PR”统计；OpenAI Codex 日报未提供 Issue/PR 总量，仅列出热点项，故此处基于可见热点数量进行定性对比，显示 Codex 处于高强度的底层架构回归测试阶段。*

## 3. 共同关注的功能方向

*   **MCP 协议集成的稳定性与安全**
    *   **Claude Code**: 反馈 MCP elicitation 功能在 VSCode 中声明但不工作（#79174），以及 MCP 集成整体稳定性问题。
    *   **OpenAI Codex**: 重点优化 Linux 下 MCP 服务器的文件描述符继承漏洞（#46960），防止资源泄漏和安全风险（PR #47094）。
    *   **诉求**: 开发者需要 MCP 作为标准扩展接口具备更强的隔离性、错误处理和跨平台一致性。

*   **本地开发环境的沙箱与权限管理**
    *   **Claude Code**: 出现 Git worktree 中沙箱锁定 `.git/config.lock` 的回归 Bug（#78818），以及本地 `.local` 主机浏览器权限无法持久化（#94830）。
    *   **OpenAI Codex**: 面临 Windows 高级沙箱创建失败（#32315）及 MCP 服务器资源泄漏（#46960）。
    *   **诉求**: 寻求既能保障安全隔离，又不阻断常规 Git 操作和本地测试流程的细粒度权限机制。

*   **Agent 成本控制与可观测性**
    *   **Claude Code**: 强烈要求生成昂贵 Agent 前增加用户确认环节（#95313），并希望在状态栏暴露按模型的速率限制（#73770）。
    *   **OpenAI Codex**: 通过 PR #47114 暴露线程生命周期时间戳，便于前端展示任务耗时，间接支持成本监控。
    *   **诉求**: 在多智能体协作场景下，对 API 调用成本、时间消耗和资源占用的实时监控与干预能力。

## 4. 差异化定位分析

*   **Claude Code: 聚焦桌面端体验与 CLI 对等**
    *   **功能侧重**: 强调桌面应用与 CLI 的功能一致性（如主题、拼写检查），并关注无障碍（A11y）支持。
    *   **目标用户**: 深度依赖 Windows 企业环境的开发者，以及对开发工具 UI 细节有较高要求的用户。
    *   **技术路线**: 正在从纯 CLI 向全平台（含桌面端）演进，但仍面临平台特异性 Bug（如 UNC 路径、NVDA 兼容性）的拖累。

*   **OpenAI Codex: 聚焦底层引擎稳定性与企业集成**
    *   **功能侧重**: 高频迭代 Rust 核心引擎，重点解决网络代理、WebSocket、文件描述符等底层基础设施问题。
    *   **目标用户**: 需要处理长程任务、复杂网络环境（企业代理、MITM CA）及大规模代码库的工程团队。
    *   **技术路线**: 采取“破坏性/高强度 Alpha 迭代”策略，通过快速发布多个 Rust Alpha 版本来回归测试稳定性，而非等待单一稳定版。

## 5. 社区热度与成熟度

*   **OpenAI Codex (快速迭代/不稳定期)**:
    *   处于极高的工程负载期，Rust 核心引擎每日发布多个 Alpha 版本（13, 14, 16, 17, 2 等），表明团队正在通过高频发版来修复网络、MCP 和性能回归。
    *   Windows 桌面端 UI 交互 Bug（侧边栏消失、标题栏遮挡）集中爆发，反映出客户端重构或快速更新对稳定性的冲击。

*   **Claude Code (成熟/治理挑战期)**:
    *   功能层面已较为成熟，但社区焦点转向“元问题”，如 6000+ 有复现步骤的 Issue 被自动关闭引发的信任危机（#87647）。
    *   主要痛点为长期未修复的平台兼容性 Bug（如 UNC 路径自 4 月起未修复，#45297），显示出维护带宽在 Windows 生态上的瓶颈。

## 6. 值得关注的趋势信号

1.  **自动化 Issue 治理的双刃剑**：Claude Code 中关于大量“有复现”Bug 被自动关闭的讨论，预示 AI 辅助的代码仓库管理将成为行业标配，但缺乏透明度的自动化工具将严重损害社区信任。开发者应关注供应商的 Bug 追踪策略。
2.  **长程任务的内存与上下文管理**：OpenAI Codex 遇到的 OOM 和上下文压缩破坏记录问题，标志着 AI 编程工具正在挑战“会话式”的短周期边界。未来工具必须具备处理数十万 Token 级上下文且不丢失状态的能力。
3.  **MCP 从“可用”向“可信”演进**：各工具均在修补 MCP 的安全漏洞（如文件描述符泄漏）和交互缺陷。MCP 正在成为 AI 工具的标准 I/O 端口，其资源隔离和权限机制将直接影响生产环境的安全性。
4.  **Windows 成为 AI CLI 工具的主要摩擦点**：两个主流工具在 Windows 平台均暴露出底层（沙箱、文件系统锁）和表层（UI 遮挡、快捷键）的严重问题，表明跨平台 AI 工具在 Windows 上的工程适配难度被低估。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止时间**: 2026-09-22
**数据来源**: github.com/anthropics/skills

## 1. 热门 Skills 排行

基于评论数和社区关注度，以下是最受关注的 5 个相关 Skills 动态（注：多数热门 PR 评论数为 0，主要热度由关联 Issue 驱动）：

1.  **skill-creator 修复与优化** ([PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1769](https://github.com/anthropics/skills/pull/1769))
    *   **功能**: 官方核心 Skill，用于辅助用户创建新的 Skills。
    *   **社区热点**: 存在严重的评估系统 Bug（Issue [#556](https://github.com/anthropics/skills/issues/556)），导致触发率显示为 0%。社区强烈呼吁修复评估逻辑、Windows 兼容性以及召回率报告错误。
    *   **状态**: OPEN

2.  **document-skills (DOCX/PDF)** ([PR #538](https://github.com/anthropics/skills/pull/538), [PR #541](https://github.com/anthropics/skills/pull/541), [PR #1790](https://github.com/anthropics/skills/pull/1790))
    *   **功能**: 处理 Office 文档格式（DOCX, PDF）的创建、编辑和验证。
    *   **社区热点**: 存在大量底层 Bug 修复，包括大小写敏感导致的引用错误、OOXML 跟踪更改 ID 冲突导致文档损坏、以及关系文件缺失问题。
    *   **状态**: OPEN

3.  **mcp-builder** ([PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390))
    *   **功能**: 辅助构建 MCP (Model Context Protocol) 服务器。
    *   **社区热点**: 与 `mcp>=2.0.0` 的 API 变更不兼容，且评估脚本无法正确序列化非 JSON 内容，导致评分失效。
    *   **状态**: OPEN

4.  **claude-api** ([Issue #1487](https://github.com/anthropics/skills/issues/1487))
    *   **功能**: 调用 Claude API 的辅助 Skill。
    *   **社区热点**: 上下文窗口爆炸问题，单次调用注入约 156k tokens，导致上下文迅速耗尽。
    *   **状态**: OPEN (Issue)

5.  **testing-patterns** ([PR #723](https://github.com/anthropics/skills/pull/723))
    *   **功能**: 提供全面的测试模式指导，包括单元测试、React 组件测试等。
    *   **社区热点**: 旨在建立标准化的测试工作流，从创建到 2026-09 仍有更新。
    *   **状态**: OPEN

## 2. 社区需求趋势

从 Issues 提炼出的社区最期待的新 Skill 方向：

*   **安全与权限治理 (Security & Governance)**: 社区高度关注 Skill 的信任边界问题。[Issue #492](https://github.com/anthropics/skills/issues/492) 指出社区 Skill 滥用 `anthropic/` 命名空间造成信任滥用；[Issue #412](https://github.com/anthropics/skills/issues/412) 提出构建 `agent-governance` Skill，用于策略执行、威胁检测和审计跟踪。
*   **组织级 Skill 共享 (Org-wide Sharing)**: [Issue #228](https://github.com/anthropics/skills/issues/228) 强烈希望在 Claude.ai 中实现组织内部的 Skill 直接共享库，替代目前繁琐的文件传输方式。
*   **上下文效率优化 (Context Efficiency)**: 针对长任务和大量 Skill 注入，[Issue #1329](https://github.com/anthropics/skills/issues/1329) 提出 `compact-memory` 概念，使用符号化表示法压缩代理状态，以节省上下文窗口。
*   **特定领域自动化 (Domain Specific)**: 包括 Web3 智能合约审计 ([PR #1771](https://github.com/anthropics/skills/pull/1771))、HPC 集群操作 ([PR #1615](https://github.com/anthropics/skills/pull/1615))、以及 Markdown 转视频 ([PR #1703](https://github.com/anthropics/skills/pull/1703))。

## 3. 高潜力待合并 Skills

以下 PR 代表了近期活跃讨论或重要功能添加，可能近期落地：

*   **blast-radius** ([PR #1776](https://github.com/anthropics/skills/pull/1776)): 在批量或破坏性写入（如删除、归档、邮件）前提供安全检查清单，填补操作风险控制的空白。
*   **document-typography** ([PR #514](https://github.com/anthropics/skills/pull/514)): 针对 AI 生成文档的排版质量控制，解决孤行、寡行和编号对齐问题，提升文档专业度。
*   **md2video-audio** ([PR #1703](https://github.com/anthropics/skills/pull/1703)): 零成本将 Markdown 编译为带有人声旁白的 MP4 视频，拓展多媒体生成能力。
*   **pyxel** ([PR #525](https://github.com/anthropics/skills/pull/525)): 专注于复古游戏开发的 Python Skill，包含无头运行和帧检查工具。

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是“可信度与稳定性”：** 社区正在从单纯的“功能丰富度”转向关注 Skill 的安全信任边界、底层文档处理 Bug 的修复、以及评估/测试框架的准确性，以确保 Skill 在复杂生产环境中可被安全、可靠地自动化调用。

---

# Claude Code 社区动态日报（2026-09-22）

## 1. 今日速览
过去24小时内，Claude Code 仓库无版本发布，但社区反馈活跃，共有 49 条 Issues 和 2 条 PR 更新。社区焦点集中在 **Windows/桌面端平台兼容性**、**Agent 成本控制与权限管理** 以及 **MCP 集成与插件系统** 的稳定性上。值得注意的是，关于“6000+ 标记有复现的 Issue 被自动关闭”的问题引发了社区对 Issue 追踪透明度的讨论。

## 2. 版本发布
*无新增版本。*

## 3. 社区热点 Issues
以下挑选了 10 个基于评论量、点赞数及问题重要性的热点 Issue：

1.  **[BUG] Cowork: Folder does not support UNC under Windows**
    *   **链接**: [Issue #45297](https://github.com/anthropics/claude-code/issues/45297)
    *   **重要性**: 严重影响 Windows 企业用户通过 UNC 路径（如 `\\server\share`）访问共享文件夹的能力。
    *   **社区反应**: 评论数高达 29 条，点赞 30，是当前最热门的痛点，许多用户报告该功能自 4 月以来未获修复。

2.  **[BUG] Spell checking cannot be turned off, making all entered text hard to read**
    *   **链接**: [Issue #58693](https://github.com/anthropics/claude-code/issues/58693)
    *   **重要性**: 桌面端拼写检查功能无法禁用，导致代码和文本可读性下降，干扰开发体验。
    *   **社区反应**: 评论 18 条，点赞 10。用户强烈要求提供“关闭拼写检查”或“针对代码文件禁用”的选项。

3.  **[BUG] Over 6k issues labeled with "has repro" have been auto-closed since March 2026**
    *   **链接**: [Issue #87647](https://github.com/anthropics/claude-code/issues/87647)
    *   **重要性**: 社区发现大量包含复现步骤的 Bug 报告被系统自动关闭，引发了对问题追踪机制可信度的质疑。
    *   **社区反应**: 点赞数高达 59，评论 8 条。这是信任危机性质的 Issue，用户要求 Anthropic 解释自动关闭逻辑。

4.  **[ENHANCEMENT] Desktop app: support custom themes / accent colors**
    *   **链接**: [Issue #79305](https://github.com/anthropics/claude-code/issues/79305)
    *   **重要性**: 桌面端缺乏 CLI 端的自定义主题能力，在多显示器环境下难以区分窗口。
    *   **社区反应**: 点赞 19，评论 9。用户希望桌面端能与 CLI 的主题系统保持对等（Parity）。

5.  **[ENHANCEMENT] statusline: expose per-model weekly rate limits**
    *   **链接**: [Issue #73770](https://github.com/anthropics/claude-code/issues/73770)
    *   **重要性**: 用户希望在状态栏中直接看到 Opus/Sonnet/Fable 的每周速率限制，以便管理配额。
    *   **社区反应**: 点赞 18，评论 6。对于使用多模型的高级用户，这是一个提升透明度的重要需求。

6.  **[ENHANCEMENT] Require user confirmation before spawning expensive agents**
    *   **链接**: [Issue #95313](https://github.com/anthropics/claude-code/issues/95313)
    *   **重要性**: 当前 Agent 机制在生成高成本子任务前缺乏确认环节，可能导致意外的高额 API 费用。
    *   **社区反应**: 新创建的 Issue（9月18日），已有 6 条评论，聚焦于成本控制和权限细粒度控制。

7.  **[BUG] Sandbox materializes & persists .git/config.lock in linked worktrees**
    *   **链接**: [Issue #78818](https://github.com/anthropics/claude-code/issues/78818)
    *   **重要性**: 沙箱机制在处理 Git worktree 时错误地锁定或创建 `.git/config.lock`，导致后续 Git 操作阻塞。
    *   **社区反应**: 标记为 `regression` 和 `has repro`，技术影响深远，涉及底层文件系统隔离逻辑。

8.  **[BUG] MCP elicitation: capability is declared but requests are auto-declined in VSCode**
    *   **链接**: [Issue #79174](https://github.com/anthropics/claude-code/issues/79174)
    *   **重要性**: MCP 协议实现缺陷。虽然声明支持 elicitation，但在交互式会话中自动拒绝请求且不展示 UI，导致 MCP 功能在 VSCode 中不可用。
    *   **社区反应**: 已关闭（可能是重复或解决），但评论 6 条，涉及 MCP 核心交互逻辑。

9.  **[BUG] Desktop built-in browser can't grant standing permissions for .local hosts**
    *   **链接**: [Issue #94830](https://github.com/anthropics/claude-code/issues/94830)
    *   **重要性**: 针对本地开发（如 WordPress Studio 的 `127.0.0.1` 或 `.local` 域名），内置浏览器每次操作都需重新授权，无法保存“信任”状态。
    *   **社区反应**: 点赞 5，评论 5。对前端全栈开发体验造成显著摩擦。

10. **[BUG] Model fabricates user turns in its own response**
    *   **链接**: [Issue #95945](https://github.com/anthropics/claude-code/issues/95945)
    *   **重要性**: 严重的模型行为异常，报告称在一次会话中 14 次将模型生成的虚构用户指令当作真实输入执行，涉及安全问题。
    *   **社区反应**: 刚于 9月21日 创建，标记为 `has repro` 和 `security`，需重点关注。

## 4. 重要 PR 进展
由于过去24小时内仅更新 2 条 PR，以下列出全部可用 PR：

1.  **[OPEN] diff: a shell command the tool held read-only fetches nothing**
    *   **链接**: [PR #95423](https://github.com/anthropics/claude-code/pull/95423)
    *   **内容**: 修复 `diff` 面板的性能问题。此前，每当执行 Bash/PowerShell 命令时，diff 面板都会重新获取数据。现在，该 PR 修改逻辑以识别工具持有的“只读”命令（如 `ls`, `git status`, `cat`），在这些操作后跳过 diff 刷新，减少无谓的计算开销。

2.  **[CLOSED] Add issue template for GitHub connection problems on claude.ai**
    *   **链接**: [PR #95932](https://github.com/anthropics/claude-code/pull/95932)
    *   **内容**: 添加了一个新的 Issue 表单，专门用于收集 `claude.ai` 上 GitHub 连接问题。该表单应用了 `github-integration` 标签，并要求用户提供截图、操作上下文及诊断信息，旨在提高相关 Bug 报告的可用性。

## 5. 功能需求趋势
从 49 条 Issues 中提炼出以下主要功能关注方向：

*   **Agent 安全与成本控制**：
    *   社区强烈关注 Agent 在后台运行时（如子 Agent）缺乏资源限制（Token/时间/成本上限）的问题（参考 [#94013](https://github.com/anthropics/claude-code/issues/94013)）。
    *   需求集中在“生成昂贵 Agent 前需用户确认”（[#95313](https://github.com/anthropics/claude-code/issues/95313)）以及更细粒度的权限预检。
*   **桌面端与 CLI 的功能对等（Parity）**：
    *   用户期望桌面应用支持自定义主题（[#79305](https://github.com/anthropics/claude-code/issues/79305)）、多语言拼写检查（[#88502](https://github.com/anthropics/claude-code/issues/88502)）以及更好的插件管理（[#82610](https://github.com/anthropics/claude-code/issues/82610)）。
*   **本地开发与集成体验优化**：
    *   针对本地开发环境（如 WordPress Studio, Git Worktrees）的权限和沙箱逻辑需要优化，以减少重复授权和文件锁冲突（[#94830](https://github.com/anthropics/claude-code/issues/94830), [#78818](https://github.com/anthropics/claude-code/issues/78818)）。
*   **自动化与 CI/CD 支持**：
    *   缺乏非交互式授权路径（如 DesignSync）阻碍了头less/CI 环境下的使用（[#91063](https://github.com/anthropics/claude-code/issues/91063)）。

## 6. 开发者关注点
*   **稳定性与回归 Bug**：
    *   Git 集成（Worktree 中的锁文件）和 MCP 协议交互是近期的主要回归热点。
    *   模型行为异常（如虚构用户输入、将第三方粘贴内容视为用户决策）引起了安全和技术可信度的担忧（[#95945](https://github.com/anthropics/claude-code/issues/95945), [#95826](https://github.com/anthropics/claude-code/issues/95826)）。
*   **平台特异性问题**：
    *   **Windows** 依然是问题重灾区，涉及 UNC 路径、拼写检查干扰、无障碍支持（NVDA 未读取新回复，[#95937](https://github.com/anthropics/claude-code/issues/95937)）等。
    *   **macOS** 用户反馈了 PDF 导出失败（[#95922](https://github.com/anthropics/claude-code/issues/95922)）和 OTel 遥测数据丢失（[#77237](https://github.com/anthropics/claude-code/issues/77237)）。
*   **透明度与信任**：
    *   关于 6000+ Issue 被自动关闭的讨论（[#87647](https://github.com/anthropics/claude-code/issues/87647)）表明社区高度关注开发流程的透明度和 Bug 处理的公平性。
*   **可访问性（A11y）**：
    *   屏幕阅读器支持（NVDA）在桌面端存在缺陷，且讨论模式（[#85848](https://github.com/anthropics/claude-code/issues/85848)）等新交互模式尚未提供足够的可导出工件支持。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：** 2026-09-22

## 1. 今日速览
今日 Codex 发布了多个 Rust 核心引擎版本（v0.157.0-alpha.2 及 v0.156.0-alpha.17），重点优化了网络代理策略、实时 WebSocket 连接以及 MCP 服务器的资源隔离。社区对 Windows 桌面端更新后的 UI 交互异常及大文件会话恢复时的内存溢出问题关注度极高，同时针对 GPT-5.6 Sol 模型在 MultiAgent 场景下的兼容性 Bug 引发了广泛讨论。

## 2. 版本发布
过去 24 小时内，`openai/codex` 仓库活跃于 Rust 核心引擎的快速迭代：
*   **rust-v0.157.0-alpha.2**：最新 Alpha 版本，预计将包含最近合并的网络代理与 WebSocket 修复。
*   **rust-v0.156.0-alpha.17**：针对前一主线的紧急修复，重点解决 Linux 下 MCP 服务器继承父进程文件描述符的问题。
*   **其他版本**：rust-v0.157.0-alpha.1、rust-v0.156.0-alpha.16/14/13 密集发布，表明团队正在进行高强度的稳定性回归测试。

## 3. 社区热点 Issues
以下 Issue 因高评论数、高频反馈或严重影响用户体验而值得关注：

1.  **Windows 更新后本地项目侧边栏消失**
    *   [Issue #42739](https://github.com/openai/codex/issues/42739)：Windows 桌面端更新后，"Projects" 栏目显示为空，但磁盘文件仍在。社区反馈该问题在更新 `26.908` 版本后集中爆发，严重影响了日常项目切换。
2.  **GPT-5.6 Sol MultiAgent 协作失败**
    *   [Issue #31864](https://github.com/openai/codex/issues/31864)：GPT-5.6 Sol 模型在 MultiAgentV2 中因 `collaboration.spawn_agent` 工具定义保留导致所有轮次失败。此问题阻碍了高级多智能体功能的正常使用。
3.  **仓库级 Marketplace 与插件配置缺失**
    *   [Issue #18115](https://github.com/openai/codex/issues/18115)：开发者强烈要求在 `.codex/config.toml` 中支持仓库级别的插件配置。目前插件配置仅为用户级，限制了团队协作中的环境一致性。
4.  **大文件会话恢复导致 OOM**
    *   [Issue #28866](https://github.com/openai/codex/issues/28866) & [Issue #30932](https://github.com/openai/codex/issues/30932)：`codex resume` 在处理包含大量压缩记录（compacted records）的超大 JSONL 会话文件时，内存占用无限增长直至被系统 Kill，导致长程任务无法恢复。
5.  **Windows 高级沙箱创建失败**
    *   [Issue #32315](https://github.com/openai/codex/issues/32315)：Windows 下 Base64 编码的沙箱设置负载超过 `CreateProcessW` 限制，导致高级沙箱命令无法启动，限制了 Windows 用户在隔离环境中的操作能力。
6.  **上下文压缩破坏对话记录**
    *   [Issue #44363](https://github.com/openai/codex/issues/44363)：上下文压缩功能会原地重写存储的 rollout，导致对话转录永久丢失。此设计缺陷让用户无法回溯被压缩前的详细执行逻辑。
7.  **Windows 登录卡在 "Unable to load sign-in requirements"**
    *   [Issue #46613](https://github.com/openai/codex/issues/46613)：重装或重置应用后，Windows 版 ChatGPT Desktop 卡在登录前置检查界面，影响了新用户的初始化体验。
8.  **Agent 创建的顶层任务在桌面搜索中隐藏**
    *   [Issue #32614](https://github.com/openai/codex/issues/32614)：由 Agent 自动创建的顶层任务在桌面端搜索和移动端远程访问中均不可见，破坏了多端状态同步的一致性。
9.  **Linux MCP 服务器继承无关文件描述符**
    *   [Issue #46960](https://github.com/openai/codex/issues/46960)：Linux 桌面端本地 stdio MCP 服务器继承了 app-server 的大量文件描述符，可能导致资源泄漏和安全风险，相关修复已在 PR 中合并。
10. **Windows 标题栏遮挡 Codex 选择器**
    *   [Issue #47133](https://github.com/openai/codex/issues/47133)：Windows 版 ChatGPT 应用中，左上角的 Codex 选择器区域被系统识别为标题栏，导致无法点击切换 Codex 模式，属于严重的 UI 交互 Bug。

## 4. 重要 PR 进展
今日合并或更新的 PR 主要集中在网络底层、MCP 安全及多智能体支持：

1.  **[#47132](https://github.com/openai/codex/pull/47132) 支持网络代理中的调用方提供的 MITM CA**：允许通过 `certificate_file` 配置外部信任代理，增强了企业环境下的网络安全性。
2.  **[#47101](https://github.com/openai/codex/pull/47101) 实时 WebSocket 连接尊重配置的代理**：修复了 Voice 功能中 WebRTC 侧信道绕过代理策略的问题，确保网络请求统一走代理。
3.  **[#47094](https://github.com/openai/codex/pull/47094) 限制 Unix 本地 MCP 服务器仅使用 stdio 描述符**：通过应用 `DescriptorPolicy::StdioOnly`，防止无关父进程文件描述符传播至 MCP 子进程，解决 Linux 资源泄漏问题。
4.  **[#47130](https://github.com/openai/codex/pull/47130) 移除 gpt-5.6-sol 的 ultrafast 服务层级**：统一多智能体工具定义的快照，仅保留 `priority` 层级，简化了模型服务调用逻辑。
5.  **[#47113](https://github.com/openai/codex/pull/47113) 在 rollout 和 SQLite 中持久化线程创建者身份**：增加 `creator_user_id` 字段，为未来的审计和个性化功能提供数据基础。
6.  **[#47122](https://github.com/openai/codex/pull/47122) 将 OpenAI 文件 Blob 上传超时从 60s 提升至 5min**：显著改善了大文件附件上传在弱网环境下的成功率。
7.  **[#47118](https://github.com/openai/codex/pull/47118) 支持 Code Mode 工具消息的模型目录覆盖**：允许通过模型目录自定义 `exec` 和 MCP 工具的描述文本，增强了 Prompt 的可定制性。
8.  **[#47108](https://github.com/openai/codex/pull/47108) 保留 Windows 文件系统助手所需的运行时变量**：确保 `SystemDrive` 和 `LOCALAPPDATA` 不被过滤器丢弃，修复了 Windows 下 MXC 沙箱助手进程创建失败的问题。
9.  **[#47106](https://github.com/openai/codex/pull/47106) 保留已 yield 的 skill 调用的源回合元数据**：修复了 Code Mode 回调中因活跃回合切换导致的指标丢失问题，提升了多轮对话的状态一致性。
10. **[#47114](https://github.com/openai/codex/pull/47114) 暴露线程项生命周期时间戳**：在 `thread/items/list` API 中返回 `startedAtMs` 和 `completedAtMs`，便于前端展示精确的任务耗时。

## 5. 功能需求趋势
*   **多端状态同步与搜索**：社区强烈关注桌面端、移动端（Codex Mobile Remote）与云端项目列表的一致性，特别是 Agent 自动创建任务的可见性。
*   **企业级网络与安全配置**：对自定义 CA、代理策略、以及仓库级插件配置的需求增加，表明 Codex 正在向企业开发流程渗透。
*   **长程任务稳定性**：针对超大会话文件的内存管理、上下文压缩的可逆性以及自动化 Resume 功能（如 [Issue #28931](https://github.com/openai/codex/issues/28931) 提到的限额重置后自动恢复）成为高频需求。
*   **本地 Secrets 管理**：开发者呼吁提供本地安全存储敏感凭证（API Key、SSH 密码）的功能，以替代硬编码或明文配置。

## 6. 开发者关注点
*   **Windows 平台体验断层**：Windows 用户反馈了大量 UI 交互 Bug（如侧边栏消失、标题栏遮挡、沙箱创建失败），显示 Windows 客户端在快速迭代中牺牲了稳定性。
*   **性能瓶颈**：`codex resume` 的内存问题和大文件上传超时是阻碍长时间复杂工程任务落地的主要痛点。
*   **模型兼容性**：GPT-5.6 Sol 在多智能体场景下的工具定义冲突（Issue #31864）反映了底层模型能力与上层 Agent 框架之间的磨合尚需优化。
*   **UI 交互细节**：如活动摘要默认折叠（[Issue #23868](https://github.com/openai/codex/issues/23868)）和粘贴特殊字符导致 UI 冻结（[Issue #27183](https://github.com/openai/codex/issues/27183)）等“纸割”（Papercuts）问题影响了日常使用的流畅度。

</details>