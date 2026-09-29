# AI CLI 工具社区动态日报 2026-09-29

> 生成时间: 2026-09-29 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

### 1. 生态全景
2026 年 9 月下旬，AI CLI 工具进入**深度工程化与多端协同**阶段，核心竞争焦点已从单纯代码生成转向**工作流扩展（Mods/Hooks）**、**沙箱安全隔离**及**跨设备体验一致性**。Anthropic Claude Code 重点攻坚模块化扩展体系（如 Sonnet 5.5 1M 上下文支持），而 OpenAI Codex 则聚焦底层架构稳定性修复（Windows/Android 沙箱权限、TUI 回归 Bug）。两大工具均在强化 MCP 协议集成与安全分类器优化，表明行业正致力于构建更安全、可审计且高度可定制的开发者基础设施。

### 2. 各工具活跃度对比
基于 2026-09-29 社区公开数据汇总如下：

| 维度 | Claude Code (Anthropic) | OpenAI Codex |
| :--- | :--- | :--- |
| **版本发布** | **v2.1.284**<br>核心：引入 Claude Sonnet 5.5 为默认模型，支持 1M 上下文；优化自动模式权限询问。 | **v0.158.0** (Stable)<br>核心：增强 TUI 全屏复制粘贴（保留 Markdown）；支持需预注册 OAuth 密钥的 MCP 连接。<br>**Alpha**：v0.159.0/v0.160.0-alpha 内部基础设施更新。 |
| **Issues 关注** | 共 10 个精选热点<br>痛点：Linux 冻结回归、Git Worktree 信任误报、Skill 去重 Token 成本、Windows 桌面版 Git 进程泄漏。 | 共 10 个精选热点<br>痛点：Windows 侧边栏消失/沙箱初始化失败、Android 远程配对死循环、TUI 剪贴板回归、SSH 权限底层 Bug。 |
| **PR 进展** | 共 10 个精选进展<br>重点：Mods 回滚以保持稳定性、CI 安全加固（出口防火墙）、TUI 渲染器修复、Agent 工作流性能优化。 | 共 10 个精选进展<br>重点：Agent 命令中心分页、TUI 断线重连输入恢复、Windows Bazel 测试分片平衡、Windows 沙箱策略事件安全加固。 |
| **活跃特征** | **高迭代频率**，社区对“回归 Bug”敏感度高，扩展机制（Mods/Hooks）处于关键落地期。 | **架构底层修复期**，主要精力用于解决跨平台（Win/Android）同步稳定性及 TUI 基础交互回归。 |

### 3. 共同关注的功能方向
*   **MCP 生态与安全集成**：两个工具均在强化 MCP 连接能力（Claude Code 关注连接稳定性，OpenAI Codex 新增 OAuth 密钥支持），且都在 PR 层面推进 CI 安全加固与事件日志脱敏。
*   **TUI/终端交互体验**：OpenAI Codex 重点修复复制粘贴与断线重连体验，Claude Code 修复 TUI 渲染器输出丢失问题；两者均致力于提升无 GUI 环境下的可用性与上下文管理（如 Claude Code 优化 Skill 去重以降低成本）。
*   **沙箱与权限控制粒度**：社区均对“误拦截”和“信任机制”提出批评（Claude Code 的 Git 工作树信任提示、OpenAI Codex 的 Windows 沙箱策略拦截），反映用户需要更精细、可自定义的权限边界。
*   **跨端同步与资源管理**：Claude Code 呼声最高的是 CLI 与 Desktop 的 Skills 同步（#20697），而 OpenAI Codex 面临 Android 与 Windows 远程配对的稳定性挑战（#36268），两者均暴露了多端生态链的断层。

### 4. 差异化定位分析
*   **Claude Code：模型能力驱动 + 模块化扩展路线**
    *   **功能侧重**：利用 Sonnet 5.5 的 1M 上下文提升复杂工作流处理能力，核心战略在于“Mods/Hooks”机制的落地，将工具从“终端助手”升级为“可编排平台”。
    *   **目标用户**：强调深度定制、高 Token 成本控制及多语言支持的重度开发者与企业级工作流构建者。
*   **OpenAI Codex：全设备协同 + 基础交互强化路线**
    *   **功能侧重**：补齐 Android 与 Windows 桌面端体验短板，重点解决 TUI 在主流终端环境（如 Konsole/Windows Terminal）下的基础交互回归及沙箱初始化底层稳定性。
    *   **目标用户**：依赖多设备（PC+移动端）无缝协作、偏好简洁低干扰界面及标准 TUI 工作流的用户群体。

### 5. 社区热度与成熟度
*   **OpenAI Codex 处于快速收敛与信任修复阶段**：由于近期版本（26.924 及 0.158.0 前后）引入了大量基础交互（粘贴）和核心功能（配对、侧边栏）的回归 Bug，社区情绪较激动，工具成熟度暂时承压，亟需通过底层架构加固重建信任。
*   **Claude Code 处于功能扩张与稳定性阵痛期**：模块化扩展（Mods）的发布节奏（“数周”内落地）显示出极强的功能野心与活跃度，但随之带来的 Linux 冻结、Skill 成本增加及非英语语音识别问题，表明其正处在大规模特性注入后亟需打磨细节和性能的阶段。

### 6. 值得关注的趋势信号
*   **本地资源消耗透明化**：开发者对工具的 CPU/内存泄漏（如 Claude Code 的 eCryptfs 冻结、Codex 的 SQLite 膨胀）零容忍，未来 CLI 工具的底层性能审计与资源控制将成为企业采纳的关键指标。
*   **安全与可审计性前置**：社区与官方均在发力强化事件日志脱敏与 CI 环境隔离（如 Codex 的 Windows 策略事件安全、Claude Code 的 CI 防火墙），表明 AI 代码生成工具正面临更严格的合规与审计要求。
*   **跨平台设备链闭环**：PC CLI 与移动端/桌面应用的状态同步（Skills/Remote Control）不再是加分项，而是避免“断层”的基础设施要求，未能实现跨端一致性的工具将难以满足复杂现代开发工作流。
*   **提示词工程向上下文工程演进**：围绕 Token 成本的优化（如 Skill 去重机制导致成本增加）和长上下文管理（1M 窗口），显示开发者正在寻求更精密的上下文组装与压缩技术来控制 API 调用开销。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills 社区热点报告（数据截止 2026-09-29）

### 1. 热门 Skills 排行

基于提供的 PR 数据（按评论数排序展示前 20 条，但评论数字段均为 undefined，故依据创建时间跨度、问题严重性及修复范围综合评估关注度）：

| 排名 | Skill/PR | 功能简述 | 社区讨论热点/问题核心 | 状态 | 链接 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **skill-creator** (PR #1298) | Skill 创建与评估工具链 | 触发评估（trigger evals）存在假阴性、Windows `select()` 管道失败、非触发工具误判等严重逻辑缺陷 | Open | [anthropics/skills PR #1298](https://github.com/anthropics/skills/pull/1298) |
| 2 | **mcp-builder** (PR #1742) | MCP 服务器连接构建 | 兼容 `mcp>=2.0.0` 版本中的 API 变更（`streamable_http_client` 重命名及自定义 Header 配置方式） | Open | [anthropics/skills PR #1742](https://github.com/anthropics/skills/pull/1742) |
| 3 | **claude-api** (PR #1607) | Claude API 模型参考 | 标记 4 个已退役模型 ID（如 `claude-opus-4-1` 等），解决模型文档过时导致的调用错误 | Open | [anthropics/skills PR #1607](https://github.com/anthropics/skills/pull/1607) |
| 4 | **docx** (PR #1792, #541) | Word 文档处理 | 1. LibreOffice 超时未报错且未验证输出；2. Tracked changes 与 Bookmarks 的 `w:id` 冲突导致文档损坏 | Open | [PR #1792](https://github.com/anthropics/skills/pull/1792), [PR #541](https://github.com/anthropics/skills/pull/541) |
| 5 | **pdf** (PR #538) | PDF 处理 | 修复 `SKILL.md` 中文件引用的大小写不敏感问题（Linux/macOS 下可能导致链接失效） | Open | [anthropics/skills PR #538](https://github.com/anthropics/skills/pull/538) |
| 6 | **testing-patterns** (PR #723) | 测试模式指南 | 涵盖单元测试、React 组件测试、E2E 测试的完整最佳实践（Testing Trophy 模型） | Open | [anthropics/skills PR #723](https://github.com/anthropics/skills/pull/723) |
| 7 | **frontend-design** (PR #210) | 前端设计 | 提升指令清晰度与可执行性，确保指南在单次对话中可被 Claude 准确遵循 | Open | [anthropics/skills PR #210](https://github.com/anthropics/skills/pull/210) |
| 8 | **pyxel** (PR #525) | 复古游戏开发 | 指导 Python Pyxel 库的游戏创建、无头输入模拟及帧检查 | Open | [anthropics/skills PR #525](https://github.com/anthropics/skills/pull/525) |

> **注**：由于原始数据中评论数缺失，排名依据 PR 涉及的核心组件重要性（如 skill-creator 为元工具）、跨平台兼容性（Windows 支持）及长期 Open 状态（如 PR #525 从 3 月开放至 9 月）进行推断。

### 2. 社区需求趋势（基于 Issues）

从 Issues 的高关注度内容提炼，社区当前对 Skills 的需求主要集中在以下四个方向：

1.  **安全与信任边界 (Security & Trust)**
    *   **核心痛点**：社区 Skill 使用 `anthropic/` 命名空间冒充官方，导致用户误授予高权限（Issue #492, 43 评论）；SharePoint 等内部文档处理时的权限控制担忧（Issue #1175）；skill-creator 中 HTML 转义不足导致的 XSS 风险（Issue #1394）。
    *   **趋势**：社区强烈呼吁建立明确的官方/社区 Skill 区分机制及更严格的静态安全审计。

2.  **协作与共享机制 (Collaboration & Sharing)**
    *   **核心痛点**：缺乏组织内的 Skill 共享库，目前需手动下载 `.skill` 文件并通过 Slack/Teams 传递（Issue #228, 8 👍）；`document-skills` 与 `example-skills` 插件内容重复导致上下文冗余（Issue #189, 9 👍）。
    *   **趋势**：期望原生支持“组织级 Skill 目录”及去重机制。

3.  **上下文效率与性能 (Context Efficiency)**
    *   **核心痛点**：`claude-api` Skill 单次调用注入 ~156k tokens，迅速耗尽上下文窗口（Issue #1487）；用户自建复杂 Skill 后因文件重命名等原因不可见（Issue #62）。
    *   **趋势**：要求 Skill 加载机制更轻量，避免“过度注入”，并增强 Skill 状态管理的鲁棒性。

4.  **元工具链的可靠性 (Meta-Toolchain Reliability)**
    *   **核心痛点**：`skill-creator` 的评估脚本 `run_eval.py` 触发率为 0%（Issue #556, 7 👍）；Windows 下触发评估布局不匹配、差分反转等问题（Issue #1383）；`mcp-builder` 对真实 MCP 服务器评分全为 0（Issue #1390）。
    *   **趋势**：社区发现“创建 Skill 的工具”本身存在大量逻辑 Bug，导致新手入门体验极差，亟需修复元工具链。

### 3. 高潜力待合并 Skills（活跃且长期 Open）

以下 PR 虽处于 Open 状态，但因解决了高频痛点或核心工具缺陷，极有可能近期合并：

*   **[fix(skill-creator): isolate trigger evals... (PR #1298)](https://github.com/anthropics/skills/pull/1298)**
    *   **理由**：`skill-creator` 是官方核心元工具，该 PR 修复了 Windows 兼容性和触发评估逻辑的根本缺陷，是提升整体生态可用性的关键路径。创建至今已 3 个月，持续更新。
*   **[fix(mcp-builder): support mcp>=2... (PR #1742)](https://github.com/anthropics/skills/pull/1742)**
    *   **理由**：MCP (Model Context Protocol) 生态迅速膨胀，`mcp>=2.0` 的 API 变更导致大量集成失效。此 PR 解决版本兼容性问题，社区依赖度高。
*   **[fix(docx): report LibreOffice timeout... (PR #1792)](https://github.com/anthropics/skills/pull/1792)**
    *   **理由**：文档处理类 Skill 是企业用户高频场景。该 PR 修复了“静默失败”问题（超时不报错且未验证输出），显著提升了可靠性，合并阻力较小。
*   **[feat(skills): add proofcore-contract-auditor (PR #1771)](https://github.com/anthropics/skills/pull/1771)**
    *   **理由**：Web3/智能合约审计是新兴高价值领域，该 Skill 提供 Solidity/Rust 静态分析及 TON 链上证明，填补了垂直行业空白。

### 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：** 从“能生成 Skill”转向“**可信赖、可协作、上下文高效的 Skill 生命周期管理**”，重点在于修复元工具（skill-creator/mcp-builder）的可靠性缺陷、建立明确的安全信任边界，并解决上下文窗口浪费问题。

---

# Claude Code 社区动态日报 (2026-09-29)

## 1. 今日速览
v2.1.284 正式发布，核心亮点是将 **Claude Sonnet 5.5** 设为默认 Sonnet 模型，支持 1M 上下文。社区热点集中在**模块化扩展能力（Mods）**的落地进展以及新版出现的**回归 Bug**（如 Linux 冻结、Git 工作树信任提示等），同时对桌面应用性能问题和非英语语音识别呼声较高。

## 2. 版本发布
**v2.1.284**
*   **模型更新**：引入 Claude Sonnet 5.5 (`claude-sonnet-5-5`)，成为 API 默认 Sonnet 模型。支持 1M 上下文窗口，成本为 $2/$10 每 Mtok（缓存读取 $0.20/Mtok）。
*   **交互优化**：在自动模式的读取权限询问中增加了 “Yes, but ask again next time” 选项，允许用户处理工作目录外的读取请求。
*   **链接**：[v2.1.284 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.284)

## 3. 社区热点 Issues

1.  **Mods 扩展性计划落地** ([#91870](https://github.com/anthropics/claude-code/issues/91870))
    *   **重要性**：社区关于“让 Claude 更具扩展性”的最大呼声 Issue。
    *   **状态**：官方更新确认将在数周内发货“功能钩子（Function Hooks）”，从“数天”变为“数周”，设计已定型。
2.  **跨端同步 Skills** ([#20697](https://github.com/anthropics/claude-code/issues/20697))
    *   **重要性**：高赞需求（157👍），希望实现 Claude Desktop 与 CLI 之间 Skills 的无缝同步。
3.  **Windows 数据目录自定义** ([#57998](https://github.com/anthropics/claude-code/issues/57998))
    *   **重要性**：Windows 用户痛点，请求提供 `CLAUDE_DATA_DIR` 环境变量以移动 `%APPDATA%\Claude\`。
4.  **非英语语音识别** ([#31724](https://github.com/anthropics/claude-code/issues/31724))
    *   **重要性**：`/voice` 模式默认英语导致非英语用户（如乌克兰语）识别失败，请求增加 `voiceLanguage` 设置。
5.  **权限绕过回归 Bug** ([#91683](https://github.com/anthropics/claude-code/issues/91683))
    *   **重要性**：2.1.259 引入的回归，配置了 Read 拒绝规则后，`cd DIR && grep` 命令触发意外弹窗。
6.  **Skill 去重机制缺陷** ([#95340](https://github.com/anthropics/claude-code/issues/95340))
    *   **重要性**：技能调用去重基于渲染内容，导致仅改变参数时重复追加整个 SKILL.md，增加 Token 成本。
7.  **Windows 桌面版 Git 进程泄漏** ([#94478](https://github.com/anthropics/claude-code/issues/94478))
    *   **重要性**：桌面应用每秒启动 ~17 个 git 进程，导致每日数 GB 的内核池泄漏，性能严重受损。
8.  **无 AVX 指令集 CPU 崩溃** ([#96402](https://github.com/anthropics/claude-code/issues/96402))
    *   **重要性**：Linux 裸机环境下，新版原生安装器在无 AVX 支持的 x86-64 CPU 上触发 SIGILL 崩溃。
9.  **Git Worktree 重复审批** ([#94265](https://github.com/anthropics/claude-code/issues/94265))
    *   **重要性**：位于 `.claude/worktrees/` 之外的 Worktree 切换时，每次都触发“Workspace not trusted” 审批。
10. **v2.1.284 Linux 冻结回归** ([#98023](https://github.com/anthropics/claude-code/issues/98023))
    *   **重要性**：最新版在 eCryptfs 主目录下首次回车即冻结，RSS 内存暴涨至 3GB+，影响 Linux 用户正常使用。

## 4. 重要 PR 进展

1.  **[#98018](https://github.com/anthropics/claude-code/pull/98018) (CLOSED): Mods 回滚**
    *   回滚了 `agents-md` 截断读取和 `diff` 强制颜色两个修改，恢复早期行为，以保持稳定性。
2.  **[#94847](https://github.com/anthropics/claude-code/pull/94847) (OPEN): Diff 面板逻辑优化**
    *   修复 Diff 面板在首次编辑时即使无文件列表也自动打开的问题，避免展示空白面板。
3.  **[#96364](https://github.com/anthropics/claude-code/pull/96364) (CLOSED): Agents.md 分页读取修正**
    *   修正嵌套 `AGENTS.md` 自动分页读取未被正确标记为“已交付”的问题，避免重复附加。
4.  **[#96363](https://github.com/anthropics/claude-code/pull/96363) (CLOSED): Git Diff 颜色处理**
    *   解决 Git 配置 `color.ui=always` 导致 Diff 正文为空的问题，通过强制 `--no-color` 修复。
5.  **[#97952](https://github.com/anthropics/claude-code/pull/97952) (OPEN): CI 安全加固**
    *   针对调用 Claude 的 GitHub Actions 工作流增加出口防火墙和权限最小化，提升安全性。
6.  **[#31204](https://github.com/anthropics/claude-code/pull/31204) (CLOSED): AI 学习路线图画布**
    *   合入一个基于 React/Vite 的交互式画布应用，用于可视化 AI 学习路径（社区贡献）。
7.  **[#98019](https://github.com/anthropics/claude-code/pull/98019) (OPEN): TUI 渲染器修复**
    *   修复 Classic 渲染器在可见窗口上方内容高度变化时（如 verbose 模式）输出丢失或覆盖的问题。
8.  **[#98016](https://github.com/anthropics/claude-code/pull/98016) (OPEN): Agent 工作流性能**
    *   针对 Agent 在 trivial 任务上性能下降问题的调查与潜在修复。
9.  **[#98017](https://github.com/anthropics/claude-code/pull/98017) (OPEN): 安全分类器误报**
    *   处理安全分类器错误拦截用户自有 NVR 扩展管理 UI 代码生成的反馈。
10. **[#98021](https://github.com/anthropics/claude-code/pull/98021) (OPEN): 工件深度链接**
    *   功能增强，允许将 URL fragment 转发到发布的工件中，支持深度链接。

## 5. 功能需求趋势
*   **模块化与扩展性 (Extensibility)**：社区强烈关注 **Mods** 和 **Hooks** 机制，希望实现更细粒度的插件化和自定义工作流（参考 #91870）。
*   **多平台一致性**：Windows 和 macOS 桌面版与 CLI 之间的体验割裂是痛点，尤其是 **Skills 同步** (#20697) 和 **数据目录自定义** (#57998)。
*   **国际化支持**：非英语地区的用户急需 **语音语言配置** (#31724) 以及更好的非英语代码理解支持。
*   **性能与资源管理**：高频率进程创建（Git #94478）和内存泄漏（#98023）是桌面版和 CLI 的主要抱怨点，社区要求优化资源占用。

## 6. 开发者关注点
*   **回归 Bug 敏感度高**：v2.1.284 发布后，Linux 用户立刻报告了严重的冻结问题 (#98023) 和 Git worktree 信任提示问题 (#97991)，开发者对稳定性回归零容忍。
*   **权限管理粒度**：用户希望更精细的权限控制，特别是 `bypassPermissions` 模式下的误报 (#91683) 和工作树信任机制 (#94265, #97991)。
*   **成本透明度**：Skill 去重机制导致 Token 重复消耗 (#95340) 引起关注，开发者希望优化提示词工程和上下文管理以降低成本。
*   **MCP 连接稳定性**：Stdio MCP 服务器断开后无法自动重连 (#82746) 是长期痛点，HTTP/SSE 已有重连机制但 Stdio 缺失。
*   **桌面版性能**：Windows 桌面版持续的高 CPU 占用和内存泄漏 (#94478) 严重影响用户体验，亟需底层优化。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 | 2026-09-29

## 1. 今日速览
今日 OpenAI Codex 发布了稳定版 **v0.158.0**，重点增强了 TUI 全屏模式的复制粘贴体验（保留 Markdown 格式）及支持需预注册 OAuth 密钥的 MCP 服务器连接。社区方面，Windows 桌面端沙箱权限故障、Android 远程配对死循环以及 TUI 剪贴板功能回归问题成为当前最受关注的痛点，大量 Issue 指向 26.924 版本更新后的稳定性回归。

## 2. 版本发布
**稳定版 v0.158.0 发布** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.158.0))
*   **TUI 增强**：在 TUI 全屏模式下支持选中复制和右键粘贴功能；复制的对话记录现在会保留 Markdown 格式 ([#47639](https://github.com/openai/codex/issues/47639), [#47896](https://github.com/openai/codex/issues/47896), [#48118](https://github.com/openai/codex/issues/48118))。
*   **MCP 认证升级**：支持连接需要预注册 OAuth 客户端密钥的 MCP 服务器，可通过 `codex mcp add --oauth-client-id` 配置。
*   **Alpha 频道**：发布了 v0.159.0-alpha.13 及 v0.160.0-alpha.2 等预测试版本，主要包含内部基础设施更新。

## 3. 社区热点 Issues
以下精选 10 个反映当前用户痛点的热门 Issue：

1.  **[Bug][Windows] 本地项目侧边栏消失** ([#42739](https://github.com/openai/codex/issues/42739))：Windows 桌面端更新后，Projects 侧边栏显示无项目，尽管源文件夹仍存在。评论数高达 34，影响大量 Windows 用户工作流。
2.  **[Bug][TUI/CLI] 无法复制文本** ([#48125](https://github.com/openai/codex/issues/48125))：标题包含强烈情绪表达，用户反馈在 1.157.0 版本中通过 SSH 连接时无法复制文本，👍 数达 17，显示该问题具有广泛共鸣。
3.  **[Bug][Windows] 沙箱初始化失败** ([#46114](https://github.com/openai/codex/issues/46114))：Windows 桌面端更新后，所有聊天线程因 `fs sandbox helper` 权限错误而失败，常规修复手段无效，阻碍了核心功能使用。
4.  **[Bug][Android] 远程配对死循环** ([#36268](https://github.com/openai/codex/issues/36268))：Android 端在重新安装应用后，"Authorize this phone" 步骤无限循环，Web 端授权成功但应用无法消费审批，阻碍跨设备协作。
5.  **[Bug][Windows/Android] 远程配对失败** ([#35855](https://github.com/openai/codex/issues/35855))：Windows Codex 桌面端与 Android 应用配对失败，涉及特定版本组合（Windows 26.721.41059 / Android 1.2026.202），是跨平台连接性的典型代表。
6.  **[Bug][TUI/CLI] 粘贴功能回归** ([#48127](https://github.com/openai/codex/issues/48127))：0.157.0 版本在 Konsole/Wayland 环境下，中键和右键粘贴功能失效，属于明确的版本回归。
7.  **[Bug][Sandbox/CLI] SSH 配置权限错误** ([#9286](https://github.com/openai/codex/issues/9286))：`git push --dry-run` 在沙箱内失败，报错 `/etc/ssh/ssh_config.d` 权限问题，这是一个自 1 月以来持续存在的长期未决底层问题。
8.  **[Bug][Rate Limits] 配额重置异常** ([#42660](https://github.com/openai/codex/issues/42660))：用户报告 Codex 每周配额在未使用本地资源的情况下耗尽，疑似账单或配额同步逻辑错误，已关闭但反映了信任危机。
9.  **[Bug][Windows] 验证命令被策略拦截** ([#46012](https://github.com/openai/codex/issues/46012))：Windows 原生 PowerShell 环境下，验证命令被拦截且缺乏可操作的诊断信息，阻碍了脚本自动化。
10. **[Bug][TUI/CLI] 计划滚动困难** ([#48024](https://github.com/openai/codex/issues/48024))：在 Windows Terminal/WSL 中，实施提示阶段的长计划无法滚动到开头，严重影响长文档的阅读体验。

## 4. 重要 PR 进展
以下精选 10 个体现开发重点的 PR：

1.  **Agent 命令中心分页** ([#49106](https://github.com/openai/codex/pull/49106))：为命令中心添加历史分页功能，允许用户浏览最近 10 条会话之外的历史记录。
2.  **TUI 断线重连输入恢复** ([#49105](https://github.com/openai/codex/pull/49105))：在重连后恢复未发送的 TUI 输入，区分未发送和未确认消息，提升网络波动下的用户体验。
3.  **Windows Bazel 测试分片平衡** ([#49103](https://github.com/openai/codex/pull/49103))：基于持续时间估算平衡 Windows Bazel 测试分片，优化 CI/CD 效率。
4.  **SQLite 真空模式与错误暴露** ([#49102](https://github.com/openai/codex/pull/49102))：保留 SQLite 真空模式（FULL/INCREMENTAL）并清晰暴露池初始化错误，避免掩盖原始故障。
5.  **HTTP 连接池复用** ([#49100](https://github.com/openai/codex/pull/49100))：在远程插件请求中复用 HTTP 连接池，避免每次调用创建新客户端，降低资源开销。
6.  **插件清单缓存** ([#49099](https://github.com/openai/codex/pull/49099))：在插件工作流间缓存解析后的插件清单，减少重复解析和无效警告。
7.  **Windows 沙箱 PowerShell 回退** ([#49098](https://github.com/openai/codex/pull/49098))：在执行服务器上解析 Windows 沙箱的 PowerShell 回退，修复远程控制器无法解析兼容执行文件的问题。
8.  **生命周期扩展通知** ([#49097](https://github.com/openai/codex/pull/49097))：在用量限制失败时通知生命周期扩展，使插件能响应 `UsageLimitExceeded` 错误。
9.  **TUI 订阅标签重构** ([#49079](https://github.com/openai/codex/pull/49079))：统一 TUI 订阅标签，将 `Pro Extra/Standard/Max` 重命名为 `Pro 200/100/500`，提升标签清晰度。
10. **Windows 沙箱策略事件安全** ([#49067](https://github.com/openai/codex/pull/49067))：在 Windows 沙箱策略事件中排除配置值，防止凭据等敏感信息被记录在策略拒绝事件中。

## 5. 功能需求趋势
*   **跨平台协作稳定性**：Android 与 Windows 桌面端的远程配对（Remote Control）故障频发（#36268, #35855, #48774），表明跨设备生态链的稳定性是用户核心诉求。
*   **TUI 交互体验优化**：复制、粘贴、滚动等基础交互在 0.157.0/0.158.0 版本中出现回归（#48125, #48127, #48024），社区对 TUI 的可用性和快捷键支持关注度高。
*   **Windows 沙箱兼容性**：多个 Issue 指向 Windows 环境下沙箱权限错误、PowerShell 回退失败（#46114, #46012, #48443），反映出 Windows 原生支持仍是主要短板。
*   **MCP 与外部集成**：MCP 服务器 OAuth 支持（v0.158.0 新功能）及 MCP 自动重连需求（#11489）表明开发者正寻求更复杂的工具链集成能力。

## 6. 开发者关注点
*   **诊断信息缺失**：在 Windows 沙箱故障（#46012）和配额问题（#42660）中，用户普遍抱怨缺乏可操作的诊断信息（"blocked by policy" 无详细原因），阻碍了故障排查。
*   **性能与资源占用**：macOS 和 Linux 用户报告 Git diff 导致的 CPU 高负载（#30477, #43158）以及 SQLite 文件膨胀问题（#49069 PR 应对），对长期运行任务的资源效率敏感。
*   **版本回归带来的信任波动**：近期更新（26.924 系列）引入的多项 Bug（侧边栏消失、粘贴失效、配对失败）导致用户情绪激动（如 #48125 的标题），频繁的版本迭代需加强回归测试。
*   **UI 噪音与自定义**：部分高级用户（如 josharian in #48991）希望禁用启动时的“欢迎消息”等装饰性文本，追求更简洁、低干扰的开发者工具界面。

</details>