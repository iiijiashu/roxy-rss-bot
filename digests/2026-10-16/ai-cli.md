# AI CLI 工具社区动态日报 2026-10-16

> 生成时间: 2026-10-16 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

以下基于 2026-10-16 Claude Code 与 OpenAI Codex 的社区动态生成的横向对比分析报告：

### 1. 生态全景
当前 AI CLI 工具生态正从基础代码生成向**精细化工作流管理**与**跨平台稳定性**深度演进。两大头部工具今日均释放了重大版本更新，重点在于增强可观测性、优化交互预设系统及修复长期存在的平台级沙箱/权限缺陷。社区痛点高度集中于**资源消耗透明度**（如后台任务成本、上下文占用）及**多端同步一致性**（远程会话、权限同步）。Windows 与 macOS 的平台特异性故障（沙箱冲突、内存泄漏、自动更新干扰）成为阻碍用户体验提升的主要摩擦点。

### 2. 各工具活跃度对比

| 指标 | Claude Code (Anthropic) | OpenAI Codex |
| :--- | :--- | :--- |
| **最新 Release** | **v2.1.301** <br> 聚焦重试超时控制与 OTel 追踪指引 | **rust-v0.163.0** <br> 聚焦 `/config` 搜索、交互中断及 Preset 系统 |
| **今日热点 Issues 数** | **10 条** (Top: Desktop UI 回归, Linux Seccomp, 成本损耗) | **10 条** (Top: Windows CUA 启动失败, 内存泄漏, TUI 恢复故障) |
| **今日显著 PR 数** | **1 条** (高亮显示，侧重插件脚本路径修复) | **10 条** (高亮显示，侧重 TUI Preset 基础设施与远程凭据) |
| **主要平台痛点** | macOS TCC 弹窗命名, Linux Seccomp 沙箱, 后台 DarkWake 成本 | Windows CUA/沙箱 ACL 冲突, macOS 桌面内存泄漏, TUI 会话恢复 |

### 3. 共同关注的功能方向

*   **交互效率与自定义预设**：
    *   **Codex** 全面投入 TUI 预设系统（`/presets`），支持模型、权限、标题的快速切换与保存（PR #54379-#54388）。
    *   **Claude Code** 社区也在呼吁更高效的会话管理与长任务支持（Issue #91712），虽未直接落地 Preset，但强调了对上下文窗口可视化的需求。
*   **权限管理与同步稳定性**：
    *   **Claude Code** 遭遇 Auto 模式权限分类器误判及 MCP 连接器权限同步缺陷（Issue #100374, #102528）。
    *   **Codex** 提供内联权限配置（`/permissions`）及远程凭据轮换机制（PR #54434），但用户仍抱怨跨设备项目状态持久化不一致（Issue #53761）。
    *   **共同诉求**：用户强烈要求权限变更的透明性、可逆性及跨设备一致性。
*   **资源消耗透明化**：
    *   **Claude Code** 面临后台 Agent 因 macOS DarkWake 导致的意外高额 Token 消耗（Issue #102597）及未使用 MCP 占用上下文（Issue #102333）。
    *   **Codex** 遭遇隐式子代理消耗 15% 配额的质疑（Issue #51177）及会话存储膨胀至 165GiB 的问题（Issue #35458）。
    *   **共同诉求**：开发者急需更精细的资源监控与成本控制工具，以避免“静默”费用流失。

### 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **功能侧重** | **可观测性与企业合规**：强化 OpenTelemetry 追踪、重试看门狗，侧重 MCP 生态集成与长任务上下文管理。 | **交互体验与配置灵活性**：主打 TUI Preset 系统、`/config` 即时修改、远程执行凭据管理，侧重开发者日常高频操作效率。 |
| **目标用户** | 重度 MCP 依赖者、远程工作流用户、对成本敏感且需审计追踪的企业开发者。 | 追求极致快捷键操作效率的个人开发者、跨平台（Win/Mac）桌面应用重度用户。 |
| **技术路线** | 深度绑定 Anthropic 模型特性（如 1M+ 上下文），通过环境变量（`CLAUDE_CODE_RETRY...`）进行细粒度运行时控制。 | 基于 Rust 架构，强调系统级沙箱（Seccomp/ACL）与本地资源管理，通过 stdin 传递凭据实现远程安全通信。 |

### 5. 社区热度与成熟度

*   **社区热度**：**OpenAI Codex** 今日社区活跃度略高，PR 数量（10 条）显著多于 Claude Code（1 条高亮），且 Issues 集中在高频交互组件（TUI、Preset）和平台底层（沙箱），反映出其处于**功能快速迭代与重构期**。Claude Code 的热点更多集中在**长期未决的平台级 Bug**（如 Linux Seccomp #43454 为长期回归）和**成本焦虑**，显示出其在**稳定性与精细化运营**阶段。
*   **成熟度对比**：
    *   **Claude Code** 在可观测性（OTel）和重试机制上更成熟，但 Desktop 客户端的更新策略（自动重启导致会话丢失）和权限模型仍存在明显 UX 债务。
    *   **Codex** 在 TUI 交互架构上创新激进，但 Windows 沙箱与 CUA 的兼容性问题是当前最大阻碍，macOS 桌面版的内存管理漏洞也影响了生产环境信心。

### 6. 值得关注的趋势信号

1.  **“静默成本”成为核心 KPI**：无论是 Claude Code 的 DarkWake 后台唤醒，还是 Codex 的隐式子代理配额消耗，开发者社区正在从“功能可用性”转向“**资源可预测性**”。未来工具需内置细粒度的 Token/配额监控面板，并提供“休眠/唤醒”策略控制。
2.  **沙箱安全与可用性博弈加剧**：Linux Seccomp、Windows ACL 错误频发，表明**安全隔离机制与跨平台兼容性**的平衡是 CLI 工具的技术深水区。工具提供商需从“默认最高安全”转向“可配置的安全级别”并增强诊断工具（如 `codex doctor` 的增强需求）。
3.  **TUI 交互向“桌面级 UX”演进**：Codex 的 Preset 系统和 Claude Code 对 Redo/Undo 的呼声，显示 CLI 工具正试图摆脱“键盘地狱”，向**可视化、可绑定、低认知负荷**的混合交互模式靠拢，快捷键与预设将成为操作效率的新标准。
4.  **MCP 生命周期管理标准化**：Claude Code 社区对 MCP 连接器未使用状态仍占用上下文、权限同步失败的反响，预示着**MCP 协议的“懒加载”与“按需激活”** 将成为下一个技术突破口，以实现上下文窗口的动态优化。

**对开发者的建议**：若追求即时交互效率与预设工作流，Codex 的 v0.163.0 更具吸引力；若依赖 MCP 生态且需严格的审计追踪，Claude Code 的 v2.1.301 更合适，但需手动配置重试看门狗并关注成本监控。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

### 1. 热门 Skills 排行
基于提供的热门 Pull Requests（按评论数排序展示，但数据中评论数为 undefined，故依据摘要内容、涉及核心 Skill 的基础设施重要性及问题复杂度进行筛选）：

1.  **skill-creator**
    *   **功能**：自动化创建、评估和优化其他 Skills 的元技能。
    *   **热点**：社区集中修复其评估引擎（`run_eval.py`）在 Windows 下的兼容性、并行工作线程导致的 UUID 交叉匹配错误（造成 0% 触发率假象）、YAML 元数据解析错误以及 Eval Viewer 的安全漏洞（XSS/DNS 重绑定）。
    *   **状态**：Open ([PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1997](https://github.com/anthropics/skills/pull/1997), [PR #1961](https://github.com/anthropics/skills/pull/1961))
2.  **mcp-builder**
    *   **功能**：构建 Model Context Protocol (MCP) 服务器及工具连接。
    *   **热点**：修复对 `mcp>=2.0.0` 版本 API 变更（`streamable_http_client` 重命名、自定义头配置）的支持，以及评估脚本中对真实 MCP 服务器评分恒为 0 的静默故障。
    *   **状态**：Open ([PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390))
3.  **docx**
    *   **功能**：处理 Word 文档（.docx）的生成、修改和转换。
    *   **热点**：解决 LibreOffice 转换超时误报为成功的问题、`merge_runs.py` 生成无效 XML 的 Bug，以及检测孤立注释（orphaned comments）。
    *   **状态**：Open ([PR #1792](https://github.com/anthropics/skills/pull/1792), [PR #1734](https://github.com/anthropics/skills/pull/1734))
4.  **claude-api**
    *   **功能**：调用 Claude API 的指南与工具使用概念。
    *   **热点**：修复文档中失效的 URL（404 错误），以及解决该 Skill 在单次工具调用中急切注入约 156k token 导致上下文窗口耗尽的性能问题。
    *   **状态**：Open ([PR #1730](https://github.com/anthropics/skills/pull/1730), [Issue #1487](https://github.com/anthropics/skills/issues/1487))
5.  **webapp-testing**
    *   **功能**：Web 应用自动化测试。
    *   **热点**：安全加固，移除 `with_server.py` 中 `shell=True` 带来的命令注入风险（CWE-78）。
    *   **状态**：Open ([PR #1980](https://github.com/anthropics/skills/pull/1980))
6.  **pdf**
    *   **功能**：PDF 文件处理。
    *   **热点**：修复 `SKILL.md` 中引用的文件路径大小写不匹配（`REFERENCE.md` vs `reference.md`），导致在大小写敏感文件系统（如 Linux）上失效。
    *   **状态**：Open ([PR #538](https://github.com/anthropics/skills/pull/538))
7.  **algorithmic-art**
    *   **功能**：生成算法艺术。
    *   **热点**：修复 `wrapAround()` 函数在处理负值时的逻辑错误，确保结果正确落在 [0, max) 区间。
    *   **状态**：Open ([PR #1977](https://github.com/anthropics/skills/pull/1977))
8.  **slack-gif-creator**
    *   **功能**：生成 Slack 风格的 GIF。
    *   **热点**：修复 Pillow 库更新后文本居中计算偏差，导致字幕位置偏移的 Bug。
    *   **状态**：Open ([PR #2004](https://github.com/anthropics/skills/pull/2004))

### 2. 社区需求趋势
从 Issues 中提炼出的社区期待方向：

*   **企业级协作与共享**：强烈需求在 Claude.ai 中实现组织内部 Skills 的直接共享库，避免手动下载/上传 `.skill` 文件的繁琐流程 ([Issue #228](https://github.com/anthropics/skills/issues/228))。
*   **安全性与信任边界**：社区高度警惕“命名空间仿冒”问题，即社区 Skill 使用 `anthropic/` 前缀误导用户以为是官方 Skill，要求加强安全边界和权限审计 ([Issue #492](https://github.com/anthropics/skills/issues/492))。
*   **Agent 治理与记忆管理**：新增对 AI Agent 系统治理（政策执行、威胁检测、审计）的 Skill 需求 ([Issue #412](https://github.com/anthropics/skills/issues/412))，以及用于压缩长期 Agent 状态的 `compact-memory` 符号化表示技能 ([Issue #1329](https://github.com/anthropics/skills/issues/1329))。
*   **输出质量门禁**：社区提议构建“推理质量门禁流水线”，涵盖任务前校准、对抗性审查和交付验证，以提升 AI 输出的可靠性 ([Issue #1385](https://github.com/anthropics/skills/issues/1385))。

### 3. 高潜力待合并 Skills
这些 PR 涉及高关注度 Skill 的关键修复或功能增强，且近期有活跃更新（数据截止 2026-10-16）：

*   **skill-creator 评估引擎重构**：PR #1298 和 #1961 针对 Windows 兼容性和安全漏洞的深度修复，解决了长期存在的评估失效问题，是核心基础设施的关键更新 ([PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1961](https://github.com/anthropics/skills/pull/1961))。
*   **Notion 工作流自动化**：PR #1245 提出的 `notion-spec-to-implementation` 将产品规格转换为可执行的 Notion 任务，填补了需求到实施之间的自动化空白 ([PR #1245](https://github.com/anthropics/skills/pull/1245))。
*   **多模态内容生成**：PR #1703 的 `md2video-audio` 允许零成本将 Markdown 编译为带语音的视频，扩展了 Skills 在多媒体内容生成领域的应用 ([PR #1703](https://github.com/anthropics/skills/pull/1703))。
*   **Web3 合约审计**：PR #1771 的 `proofcore-contract-auditor` 引入了基于 TON 区块链的零存储 Merkle 协议审计证明，代表了垂直领域（区块链）的专业化技能 ([PR #1771](https://github.com/anthropics/skills/pull/1771))。

### 4. Skills 生态洞察
当前社区在 Skills 层面最集中的诉求是**基础设施的稳定性与安全性**（特别是修复 skill-creator 评估引擎的误报和 MCP 构建器的兼容性）以及**解决企业级 Skill 共享与信任边界问题**。

---

# Claude Code 社区动态日报 (2026-10-16)

## 今日速览
今日社区主要围绕 v2.1.301 版本发布展开，重点优化了未监管重试模式的超时控制并增强了 OpenTelemetry 追踪指引。社区热点集中在 Desktop 客户端的 UI 回归 bug（侧边栏分组移除）以及 Linux 沙箱权限错误，同时大量用户反馈了关于 MCP 连接器权限同步、后台 Agent 成本损耗及权限分类器误判的问题。

## 版本发布

### v2.1.301
*   **未监管重试优化**：新增 `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` 环境变量，允许在用量限制重置时间过远时强制结束未监管重试请求，避免无限等待。
*   **可观测性增强**：在 `claude-api` 技能中增加了 OpenTelemetry 追踪指引，包括设置相关配置。
*   链接: [anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases)

## 社区热点 Issues

1.  **#102088 Desktop 侧边栏“Group by”选项移除 [BUG]**
    *   **关注度**: 51 评论 / 37 👍
    *   **原因**: Windows Desktop 客户端最新版本移除了 Code 标签页侧边栏的分组选项，导致用户只能按环境分组，被视为功能回归。
    *   链接: [Issue #102088](https://github.com/anthropics/claude-code/issues/102088)

2.  **#43454 Linux 沙箱 apply-seccomp 失败 [BUG]**
    *   **关注度**: 29 评论 / 49 👍
    *   **原因**: 长期存在的 Linux 平台回归问题，因无法写入 `/proc/self/setgroups` 导致沙箱配置失败，严重影响 Linux 用户的环境隔离功能。
    *   链接: [Issue #43454](https://github.com/anthropics/claude-code/issues/43454)

3.  **#95364 Desktop 自动更新导致远程会话中断 [BUG]**
    *   **关注度**: 11 评论 / 8 👍
    *   **原因**: macOS Desktop 客户端在空闲时执行“静默更新”并重启应用，导致所有正在进行的 Remote Control 会话丢失，影响远程工作流。
    *   链接: [Issue #95364](https://github.com/anthropics/claude-code/issues/95364)

4.  **#100374 Auto 模式权限分类器误拒已批准操作 [BUG]**
    *   **关注度**: 3 评论
    *   **原因**: 用户在 Auto 模式下明确批准的操作仍被分类器拒绝，且远程项目线程用户缺乏重新批准的路径，暴露了权限同步机制缺陷。
    *   链接: [Issue #100374](https://github.com/anthropics/claude-code/issues/100374)

5.  **#102597 macOS 后台 Agent 唤醒导致高成本损耗 [BUG]**
    *   **关注度**: 0 评论
    *   **原因**: 合盖后 macOS DarkWake 机制触发后台 Agent 重复发送全量上下文（400-580K tokens），导致过夜产生大量无效 API 请求和费用。
    *   链接: [Issue #102597](https://github.com/anthropics/claude-code/issues/102597)

6.  **#76684 缺少重做 (Redo) 支持 [FEATURE]**
    *   **关注度**: 5 评论 / 7 👍
    *   **原因**: TUI 编辑器仅支持撤销，缺乏 Vim 模式下的 `Ctrl+R` 或可绑定的 redo 动作，影响高效编辑体验。
    *   链接: [Issue #76684](https://github.com/anthropics/claude-code/issues/76684)

7.  **#102496 新会话默认静默启动 Worktree [BUG]**
    *   **关注度**: 1 评论
    *   **原因**: Desktop 环境选择器更新后，新会话默认进入 Git Worktree 且无关闭开关，引发用户对工作区管理不确定性的抱怨。
    *   链接: [Issue #102496](https://github.com/anthropics/claude-code/issues/102496)

8.  **#74068 macOS TCC 权限弹窗显示版本号而非应用名 [BUG]**
    *   **关注度**: 4 评论 / 4 👍
    *   **原因**: macOS 文件访问权限提示显示为 "2.1.201" 而非 "Claude Code"，且每次更新重置授权，严重影响用户信任与使用体验。
    *   链接: [Issue #74068](https://github.com/anthropics/claude-code/issues/74068)

9.  **#102333 未使用的 MCP 连接器消耗 Token [ENHANCEMENT]**
    *   **关注度**: 2 评论 / 1 👍
    *   **原因**: 即使会话未使用某 MCP 工具，其名称和 Schema 仍加载进上下文，导致基础 Token 消耗过高，用户要求按需加载或排除机制。
    *   链接: [Issue #102333](https://github.com/anthropics/claude-code/issues/102333)

10. **#91712 用量环仅显示 5 小时窗口 [FEATURE]**
    *   **关注度**: 10 评论 / 12 👍
    *   **原因**: Desktop Code 标签页底部的用量指示器仅反映短期窗口，用户希望其反映整个 Session 的上下文使用率，以便更好地管理长任务。
    *   链接: [Issue #91712](https://github.com/anthropics/claude-code/issues/91712)

## 重要 PR 进展

*注：过去 24 小时内仅展示 1 条主要 PR 数据，以下基于该条目及趋势进行说明。*

1.  **#95698 修复插件 Hook 脚本路径引用问题 [Merged/Open]**
    *   **内容**: 修复 `ralph-wiggum` 和 `output-style` 插件中 `.sh` hook 未通过 `bash` 执行且路径未加引号的问题。
    *   **影响**: 解决特定 shell 环境下插件钩子无法正确执行的问题，提升插件系统的稳定性。
    *   链接: [PR #95698](https://github.com/anthropics/claude-code/pull/95698)

*(由于数据源限制，其他 PR 未在“过去24小时”列表中详细展示，故仅列出可见的高亮 PR)*

## 功能需求趋势

*   **上下文管理与成本控制**: 社区强烈关注未使用工具/MCP 对上下文窗口的占用（#102333），以及后台任务导致的意外成本损耗（#102597）。
*   **远程与多端同步**: Remote Control 会话的稳定性（#95364）及跨设备权限同步（#100374）是高频痛点，用户期望在远程环境中拥有与本地一致的审批和控制能力。
*   **长会话支持**: 对 1M+ 上下文模型的支持优化（#91712）及避免 Auto-compact 丢失关键信息的替代方案（#90089）成为长程任务开发的核心诉求。
*   **UI 交互细节**: TUI 的编辑体验（Redo 支持 #76684）和 Desktop 客户端的 UI 回归（侧边栏分组 #102088）受到较多关注。

## 开发者关注点

*   **权限模型的不透明性**: 多个 Issue（#100370, #100374, #101463）反映 Auto 模式下的权限分类器（Classifier）经常误判用户已明确批准的操作，且缺乏清晰的拒绝原因解释或人工介入路径，阻碍了自动化工作流。
*   **平台特定环境隔离问题**: Linux 用户长期受困于 Seccomp 沙箱错误（#43454），macOS 用户则面临 TCC 权限弹窗命名混乱（#74068）及 DarkWake 导致的资源浪费，平台适配的深度仍有提升空间。
*   **MCP 连接器的生命周期管理**: 用户发现 MCP 连接器的权限更新、Token 刷新（#102528, #102508）及 SSE 流断开重连（#102476）存在逻辑漏洞，影响依赖外部服务的稳定性。
*   **Desktop 客户端的更新干扰**: 自动更新机制在用户无操作时重启应用导致会话中断（#95364），表明客户端更新策略需更加尊重用户的长连接工作状态。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-10-16)

### 1. 今日速览
今日 Codex 发布了 Rust v0.163.0 正式版，重点增强了 `/config` 配置搜索及即时修改能力，并支持在响应过程中中断以转向新的指令。社区热点高度集中在 Windows 平台稳定性上，尤其是 Computer Use (CUA) 组件的启动故障（HRESULT 0x80070003）及沙箱机制冲突。同时，TUI 交互体验迎来重大升级，新增了一套完整的预设系统（`/presets`）以支持快捷键调用和权限管理。

### 2. 版本发布
*   **rust-v0.163.0**: 正式发布。
    *   **配置优化**: 开放 `/config` 命令用于跨类别搜索偏好设置，支持即时修改受支持的配置项，并明确标识哪些更改需要重启生效 ([#52990, #53429])。
    *   **交互增强**: 支持在 Codex 响应期间发送后续指令以立即引导其行为；中断回合还会停止活跃的 Code Mode cells ([Link](https://github.com/openai/codex/releases/tag/rust-v0.163.0))。
*   **rust-v0.163.0-alpha.10.2**: Alpha 版本更新。

### 3. 社区热点 Issues
1.  **Windows CUA 启动失败 (HRESULT 0x80070003)**: Windows 用户反馈“Dot”本地任务中的 Computer Use MXC 启动器失败，导致无法使用计算机操作工具。该问题影响面广，评论数最高，社区正等待修复 ([#52407](https://github.com/openai/codex/issues/52407))。
2.  **Windows 沙箱 ACL 更新错误**: 在 Windows 11 上，沙箱尝试更新 `node_repl.exe` 的 ACL 时发生共享冲突（错误 32），导致 Computer Use 初始化和 shell 命令被阻止 ([#51590](https://github.com/openai/codex/issues/51590))。
3.  **Windows 浏览器工具初始化失败**: 多个用户报告浏览器工具无法绑定到活跃会话，提示 `Browser is not available: iab`，且 Computer Use 在浏览器窗口中被硬阻塞 ([#53188](https://github.com/openai/codex/issues/53188), [#54036](https://github.com/openai/codex/issues/54036))。
4.  **Mac 桌面应用内存泄漏与崩溃**: macOS 桌面应用存在严重的渲染进程内存泄漏（增长至 4-7 GB）及主状态膨胀（8.74 GiB），导致系统交换耗尽甚至 WindowServer 重置 ([#46690](https://github.com/openai/codex/issues/46690), [#54416](https://github.com/openai/codex/issues/54416))。
5.  **TUI 会话恢复故障**: CLI 无法恢复现有的本地 TUI 会话，原因是 `thread/resume` 调用了不支持的 `list_turns` 方法，影响 Linux 和 Mac 用户的工作流连续性 ([#37754](https://github.com/openai/codex/issues/37754))。
6.  **会话存储膨胀**: 桌面应用在进行压缩（compaction）时重复持久化完整截图，导致 `~/.codex/sessions` 目录达到 ~165 GiB，其中 95% 为 base64 图片 ([#35458](https://github.com/openai/codex/issues/35458))。
7.  **模型目录缺失**: 使用 ChatGPT 认证时，官方模型目录中缺失 "Sol Ultrafast" 等模型，导致用户无法访问最新或特定模型 ([#52839](https://github.com/openai/codex/issues/52839))。
8.  **子代理内存泄漏**: 报告称 CLI 中的子代理（subagents）存在内存泄漏问题，尤其在 Apple Silicon 平台上运行较长时间后性能下降 ([#23260](https://github.com/openai/codex/issues/23260))。
9.  **配额消耗异常**: 默认记忆生成机制会隐式创建后台子代理，一个 2 分钟的任务即可消耗约 15% 的 5 小时配额，引发用户对资源使用的担忧 ([#51177](https://github.com/openai/codex/issues/51177))。
10. **Windows 项目持久化失效**: Windows 桌面应用中，从 UI 移动的项目成员关系更改不可靠，稍后会回退到初始状态，而浏览器端发起的分配却能持久化 ([#53761](https://github.com/openai/codex/issues/53761))。

### 4. 重要 PR 进展
1.  **TUI 预设系统基础架构**: 添加了 TUI 输入预设的配置支持，允许通过数字键 `0-9` 绑定 prompt 或 slash commands，并存储在配置 schema 中 ([#54379](https://github.com/openai/codex/pull/54379))。
2.  **`/presets` 命令实现**: 实现了 `/presets` 选择器，包含 10 个编号槽位、编辑器和删除确认逻辑，支持从当前模型/推理设置创建预设 ([#54380](https://github.com/openai/codex/pull/54380))。
3.  **预设快捷键菜单**: 将 `/presets` 替换为响应式菜单，支持 `0-9` 运行，`n/s/e/d` 创建、启动、编辑和删除预设，提升了操作效率 ([#54381](https://github.com/openai/codex/pull/54381))。
4.  **权限预设支持**: 允许将当前的权限设置（包括模型、审批策略、审核员）保存为预设，确保一致性恢复 ([#54385](https://github.com/openai/codex/pull/54385))。
5.  **内联权限配置**: 支持 `/permissions <profile-id>` 直接选择内置或自定义权限档案（如 `:read-only`），无需进入菜单 ([#54383](https://github.com/openai/codex/pull/54383))。
6.  **标题与状态行预设**: 为 `/title` 和 `/statusline` 添加快速拨号预设，支持自定义项顺序、别名及颜色控制 ([#54388](https://github.com/openai/codex/pull/54388), [#54387](https://github.com/openai/codex/pull/54387))。
7.  **远程执行凭据轮换**: 为远程 exec-server 添加了通过 stdin 传递轮换 JSON 凭据的功能，要求 30 秒内提供初始凭据并拒绝过期项 ([#54434](https://github.com/openai/codex/pull/54434))。
8.  **Zsh 凭据掩码支持**: 扩展了远程凭据掩码功能，现在支持使用 shell 快照的 Zsh login commands，解决了之前仅支持 Bash 的限制 ([#54432](https://github.com/openai/codex/pull/54432))。
9.  **Linux NFS SQLite 优化**: 检测到 `sqlite_home` 位于 Linux NFS 挂载点时，跳过页面回收操作，避免 I/O 负载和内容竞争 ([#54417](https://github.com/openai/codex/pull/54417))。
10. **Mermaid 换行支持**: 修复了 Mermaid 流程图节点标签中 `<br>` 标签导致渲染回退为源码的问题，现在支持在终端图中正确显示换行 ([#54419](https://github.com/openai/codex/pull/54419))。

### 5. 功能需求趋势
*   **交互自定义与效率**: 社区强烈关注 TUI 的操作效率，新推出的 Preset 系统反映了用户对于快速切换模型、权限和工作流的需求。
*   **跨平台一致性**: Windows 和 macOS 桌面应用之间的行为差异（如项目持久化、浏览器连接）引发大量抱怨，用户期望各平台功能对等。
*   **资源透明度**: 对于后台子代理（Subagents）和资源配额（Quota）消耗不透明的问题，开发者开始探索如何更好地监控和控制后台任务。

### 6. 开发者关注点
*   **Windows 沙箱与 CUA 兼容性**: 这是当前最大的痛点。沙箱机制与 Computer Use 的冲突（ACL 错误、MXC 启动失败）导致大量 Windows 用户无法使用核心功能。
*   **稳定性与内存管理**: 桌面应用（特别是 macOS）的内存泄漏和崩溃问题严重影响了生产环境的使用信心。
*   **调试与诊断工具**: 用户报告错误时提供了详细的日志和环境信息，表明社区需要更内置化的诊断工具（如 `codex doctor` 的增强）来快速定位沙箱和连接问题。
*   **配置管理复杂性**: 随着功能增多，用户需要通过 `/config` 和 Presets 来管理复杂的权限和模型设置，对配置系统的易用性提出了更高要求。

</details>