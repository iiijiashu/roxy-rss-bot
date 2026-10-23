# AI CLI 工具社区动态日报 2026-10-23

> 生成时间: 2026-10-23 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

## 1. 生态全景
2026 年 10 月下旬，AI CLI 工具生态进入“稳定性与安全合规”并重的深水区。头部工具如 Claude Code 和 OpenAI Codex 均将研发重心从单纯的功能扩张转向底层资源管理（内存泄漏、进程树清理）及企业级权限隔离。多云接入能力成为新竞争点，Codex 正式引入 Google Cloud Vertex AI 支持，标志着单一模型绑定壁垒被打破。桌面端与 CLI 的跨端同步、远程持久化连接成为提升重度开发者体验的关键迭代方向。

## 2. 各工具活跃度对比

| 工具名称 | 24h Issues 热度焦点 | 24h PR 数量 | Release 情况 | 社区互动规模参考 |
| :--- | :--- | :---: | :--- | :--- |
| **Claude Code** | Team 订阅层级、Win 端性能、Git 交互 Bug | 7 | v2.1.309, v2.1.308 | 高（单 Issue 最高 185 赞 / 65 评论） |
| **OpenAI Codex** | MCP 内存泄漏、Win 客户端更新、多模态 Provider | 10 | Rust Alpha x3 (0.164/0.163 分支) | 高（单 Issue 最高 63 评论 / 20 赞） |

*注：数据基于提供的当日摘要提取。Claude Code 侧重 UI/UX 与安全修补，Codex 侧重 Rust 核心库迭代与底层架构增强。*

## 3. 共同关注的功能方向

*   **Windows 平台稳定性与性能**：两家工具均在 Windows 端遭遇严重性能或兼容性挑战。Claude Code 报告 MSIX 主进程 CPU 占用 100% 及 I/O 过高；Codex 则面临 MSIX 包文件锁导致的更新失败及沙箱子进程启动异常。
*   **资源生命周期管理（内存/进程）**：资源泄漏是共同痛点。Codex 核心问题是 MCP 服务器进程未清理导致 RSS 超 9GB；Claude Code 关注 `TaskStop` 未清理子进程树导致破坏性命令残留运行。
*   **细粒度权限与安全策略**：Claude Code 聚焦于组织层级的 `sec-default` 阻断与工具权限封顶；Codex 引入环境作用域 Hook 及 MCP 网络策略元数据。两者均显示出向企业合规场景倾斜的趋势。
*   **本地/文件访问策略平衡**：Claude Code 用户呼吁禁用后台 Git fetch 以保护隐私；Codex 用户则因 `file://` 预览被拦截而受阻。社区正在寻找安全隔离与本地开发自由度的平衡点。

## 4. 差异化定位分析

*   **Claude Code**：
    *   **功能侧重**：深耕 IDE 级交互体验（桌面侧边栏、Diff 面板、远程连接持久化），强调“开箱即用”的桌面应用整合。
    *   **目标用户**：重度个人开发者及寻求高算力订阅层级的团队，关注 UI 定制与多任务并行导航。
    *   **技术路线**：通过高频小版本（v2.1.308/309）快速修补沙箱漏洞，强化 macOS/Linux 安全底座。
*   **OpenAI Codex**：
    *   **功能侧重**：强化底层 Rust 核心库与 MCP 生态，注重多模型/多云支持（Vertex AI）及构建工具链标准化（Cosign/uv）。
    *   **目标用户**：寻求工程化集成、自动化流水线及混合云部署的开发者与企业架构师。
    *   **技术路线**：通过 Alpha 版本迭代 Rust 模块，解耦配置加载与认证，提升跨环境鲁棒性。

## 5. 社区热度与成熟度

*   **OpenAI Codex**：处于**高速架构迭代期**。大量精力投入在 Rust 核心库的 Alpha 发布与 MCP SDK 升级上，社区对底层资源泄漏（MCP）的关注度极高，显示出产品仍在快速打磨长期运行稳定性。
*   **Claude Code**：处于**功能完善与商业化探索期**。Issue 热度集中在订阅层级（Team/Max）及桌面端 UI 细节，表明核心功能已趋于稳定，当前重点在于解决特定平台（Windows）的性能短板及探索高阶付费市场。
*   **总体成熟度**：两者均已跨越“能用”阶段，进入“好用且安全”的竞争维度。Windows 平台似乎是两者共同的体验洼地，而 macOS/Linux 的稳定性相对更高。

## 6. 值得关注的趋势信号

1.  **去中心化模型接入成为标配**：Codex 引入 GCP Vertex AI 支持是重要信号，未来 CLI 工具将不再绑定单一模型提供商，而是通过标准化接口支持多云/多模型路由，降低用户锁定风险。
2.  **企业级“安全默认值”兴起**：从 Claude Code 的 `sec-default` 阻断个人插件覆写组织策略，到 Codex 的环境隔离 Hook，工具正从“开发者助手”向“企业合规工具”演进。未来的竞争点在于能否在不牺牲开发效率的前提下满足 SOC2/ISO 等审计要求。
3.  **长期运行服务的资源治理**：MCP 内存泄漏与进程树清理问题频发，表明 AI 辅助编程正从“短任务脚本”向“长生命周期守护进程”演进。开发者在选择工具时，应重点评估其在 24h+ 运行场景下的资源曲线，而非仅关注单次任务速度。
4.  **Windows 生态的适配滞后**：两个头部工具在 Windows 端均暴露了严重的性能与沙箱限制问题，相比 macOS 的优先修复策略，Windows 开发者需做好手动干预或迁移至 WSL2/Linux 的备选方案。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

### 1. 热门 Skills 排行

以下 PR 关注度较高（基于评论数及议题热度排序）：

1.  **mcp-builder**
    *   **功能**：修复 `mcp>=2.0.0` 兼容性，支持新的 `streamable_http_client` 导入及自定义 headers。
    *   **状态**：Open
    *   **链接**：[PR #1742](https://github.com/anthropics/skills/pull/1742)

2.  **skill-creator**
    *   **功能**：多项关键修复，包括隔离触发评估、处理 Windows 运行时故障、支持直接执行打包脚本以及正确解析 YAML frontmatter。
    *   **状态**：Open
    *   **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1681](https://github.com/anthropics/skills/pull/1681), [PR #1997](https://github.com/anthropics/skills/pull/1997)

3.  **webapp-testing**
    *   **功能**：安全增强，移除 `shell=True` 以消除命令注入风险；修复 textarea/select 元素发现报告的错误。
    *   **状态**：Open
    *   **链接**：[PR #1980](https://github.com/anthropics/skills/pull/1980), [PR #1976](https://github.com/anthropics/skills/pull/1976)

4.  **docx / document-skills**
    *   **功能**：修复 LibreOffice 超时误报及输出验证；修复 `merge_runs.py` 导致的无效 XML 写入问题。
    *   **状态**：Open
    *   **链接**：[PR #1792](https://github.com/anthropics/skills/pull/1792), [Issue #2018](https://github.com/anthropics/skills/issues/2018)

5.  **claude-api**
    *   **功能**：修复文档中的死链；社区强烈关注其单次调用注入约 156k tokens 导致上下文窗口耗尽的性能问题。
    *   **状态**：Open
    *   **链接**：[PR #1730](https://github.com/anthropics/skills/pull/1730), [Issue #1487](https://github.com/anthropics/skills/issues/1487)

6.  **md2video-audio**
    *   **功能**：新增零成本 Skill，将 Markdown 编译为带真人音色的 MP4 视频。
    *   **状态**：Open
    *   **链接**：[PR #1703](https://github.com/anthropics/skills/pull/1703)

7.  **Notion & Web3 专项**
    *   **功能**：`notion-spec-to-implementation` 实现从规格到 Notion 任务拆解；`proofcore-contract-auditor` 提供智能合约静态分析与 TON 链上证明。
    *   **状态**：Open
    *   **链接**：[PR #1245](https://github.com/anthropics/skills/pull/1245), [PR #1771](https://github.com/anthropics/skills/pull/1771)

### 2. 社区需求趋势

从 Issues 讨论来看，社区最期待的新 Skill 方向集中在：
*   **组织级协作与共享**：强烈需求在 Claude.ai 内直接共享 Skill 库，避免通过文件手动流转（[Issue #228](https://github.com/anthropics/skills/issues/228)）。
*   **推理质量与流程管控**：提出“推理质量门”流水线，包含任务前校准、对抗性审查及交付验证，以解决 AI 输出一致性问题（[Issue #1385](https://github.com/anthropics/skills/issues/1385)）。
*   **状态记忆优化**：提议开发 `compact-memory` Skill，使用符号化表示管理长时运行 Agent 的上下文，降低 token 消耗（[Issue #1329](https://github.com/anthropics/skills/issues/1329)）。
*   **信任与安全性**：社区担忧第三方 Skill 占用官方命名空间导致的信任边界滥用，呼吁加强元安全审查（[Issue #492](https://github.com/anthropics/skills/issues/492)）。

### 3. 高潜力待合并 Skills

以下 PR 评论活跃且涉及核心工具链或重要新特性，大概率将在近期合并：
*   **MCP 构建器兼容性更新**：紧跟 `mcp>=2.0.0` 官方 API 变动，属于阻断性 Bug 修复（[PR #1742](https://github.com/anthropics/skills/pull/1742)）。
*   **Skill Creator 核心工具链修复**：包含 3 个独立的 Skill-creator 修复 PR（Windows 兼容、打包执行、YAML 解析），解决了 Skill 开发流程中的基础痛点（[PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1681](https://github.com/anthropics/skills/pull/1681), [PR #1997](https://github.com/anthropics/skills/pull/1997)）。
*   **Web 测试安全加固**：消除了 `webapp-testing` 中的 CWE-78 命令注入漏洞，属于高危安全修复，合并优先级极高（[PR #1980](https://github.com/anthropics/skills/pull/1980)）。

### 4. Skills 生态洞察

当前社区最集中的诉求是提升 Skill 的**安全性与性能边界管理**，尤其是防止命名空间信任滥用以及解决大规模 Skill（如 claude-api）对上下文窗口的过度占用问题。

---

# Claude Code 社区动态日报（2026-10-23）

**今日速览**
Claude Code 持续迭代修复 macOS/Linux 沙箱安全漏洞，并推出桌面应用的多项 UI 与交互体验优化。社区关注度最高的议题集中在 Team/Max 订阅层级与桌面应用性能问题，其中 Team 计划升级请求已获大量支持。多项涉及桌面端会话持久化、远程连接及 Git 交互底层逻辑的 Bug 正在被逐一验证与关闭。

**版本发布**
- **v2.1.309** 发布，重点优化 macOS 与 Linux 平台的沙箱运行安全，修复了启动文件在沙箱外执行以及符号链接导致的路径写入权限绕过漏洞（[anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases/tag/v2.1.309)）。
- **v2.1.308** 发布，主要包含常规 Bug 修复与可靠性提升（[anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases/tag/v2.1.308)）。

**社区热点 Issues**
- **Team/Max 订阅层级呼声最高**：社区强烈呼吁推出面向重度开发者的 Team Max 20x 等价层级，该议题在 65 条评论和 185 个赞中脱颖而出，凸显了高算力消耗场景的付费焦虑（[#47509](https://github.com/anthropics/claude-code/issues/47509)）。
- **Windows 桌面端性能警报**：Windows MSIX 桌面版主进程 CPU 占用率异常飙升至 100% 单核，文件 I/O 操作高达每分钟 150k-330k 次，引发底层监控关注（[#96722](https://github.com/anthropics/claude-code/issues/96722)）。
- **桌面侧边栏会话层级**：用户提议将 Git Fork 会话作为顶级节点而非嵌套在父级下，旨在提升多任务并行时的导航清晰度（[#100216](https://github.com/anthropics/claude-code/issues/100216)）。
- **常驻远程控制需求**：桌面应用未读取 CLI 配置中的远程控制常驻选项，导致每次连接需手动切换，社区期待增加持久化开关（[#48949](https://github.com/anthropics/claude-code/issues/48949)）。
- **后台 Git fetch 隐私争议**：桌面应用在没有用户显式指令的情况下对 origin 发起不可追踪的后台 fetch 请求，开发者呼吁提供禁用该功能的设置项（[#84698](https://github.com/anthropics/claude-code/issues/84698)）。
- **Worktree 池化策略探讨**：提出取消 Git worktree 池化（默认每会话单一 worktree），仅在会话归档时销毁，以降低工作区文件冲突风险（[#91472](https://github.com/anthropics/claude-code/issues/91472)）。
- **进程树强制终止验证**：`TaskStop` 命令存在未清理子进程树的缺陷，曾导致 `rm -rf` 等破坏性命令在终止后仍继续运行 20 分钟，需重点排查（[#85200](https://github.com/anthropics/claude-code/issues/85200)）。
- **移动端与桌面端断连**：macOS 桌面应用静默自动更新后，本地 Code 会话的远程连接无法自动恢复，移动端显示离线状态（[#104230](https://github.com/anthropics/claude-code/issues/104230)）。
- **安全提示误报争议**：模型在分析合法文档路径时多次触发 reasoning_extraction 安全拦截，引发关于基础指令集被过度限制的讨论（[#97452](https://github.com/anthropics/claude-code/issues/97452)）。
- **UI 交互自定义诉求**：开发者要求增加隐藏权限模式底部指示器的配置项，以适配高度自定义的状态栏布局（[#89126](https://github.com/anthropics/claude-code/issues/89126)）。

**重要 PR 进展**
*注：以下为过去24小时内有最新活动的 7 个 PR，已全量提取。*
- **mods 引擎截断标志同步**：对齐 npm CLI 发布的 `isStdoutTruncated` 与 `mtimeMs` 字段，确保引擎层结果与实际运行时数据一致（[#97293](https://github.com/anthropics/claude-code/pull/97293)）。
- **sec-default 记录越权阻断**：组织层级的安全默认策略生效后，个人的插件将无法再丢弃或覆写发送至组织的 collector 遥测日志（[#97688](https://github.com/anthropics/claude-code/pull/97688)）。
- **diff 面板 UI 修复**：解决了在 `/diff` 面板或对话框保持打开状态时，其他插件的 Toast 提示被意外挂起且不展示的问题（[#99118](https://github.com/anthropics/claude-code/pull/99118)）。
- **权限提升防护机制**：在部署 sec-default 的组织中，个人插件被拦截对 deny 或 ask 规则的放宽行为，以及固定变量的篡改（[#99137](https://github.com/anthropics/claude-code/pull/99137)）。
- **diff 渲染保持策略**：修复了 `/diff` 在主机尚未挂载完毕时打开导致 pane 不保留的问题，现引擎将在就绪后立即回显该面板（[#99141](https://github.com/anthropics/claude-code/pull/99141)）。
- **连接器工具权限封顶**：组织层级的 policy mod 现已对工具调用实施权限封顶，并为其所有 hook 判定机制自动添加 `.catch` 异常拦截（[#99540](https://github.com/anthropics/claude-code/pull/99540)）。
- **会话数据保留策略**：安全默认行在会话中的存续层级已被重新评估，确保数据在跨越 user tier 后依然符合既定安全规范（[#97334](https://github.com/anthropics/claude-code/pull/97334)）。

**功能需求趋势**
- **企业级权限控制（Security/Permissions）**：近期大量 PR 和 Issue 围绕 `sec-default`、组织层级的权限策略（Deny/Ask 拦截）及自定义头部配置展开，说明企业客户对安全隔离与合规性的需求正在急剧上升（[#99137](https://github.com/anthropics/claude-code/pull/99137), [#97949](https://github.com/anthropics/claude-code/issues/97949)）。
- **本地文件系统与状态管理（Core/State）**：针对 `.claude.json` 自动清理失效、配置同步及 Worktree 资源管理的呼声持续走高，底层文件态管理成为当前核心演进方向（[#87677](https://github.com/anthropics/claude-code/issues/87677), [#87027](https://github.com/anthropics/claude-code/issues/87027)）。
- **桌面应用跨端同步与 UI 体验（Desktop/Remote）**：移动端远程控制持久化、多端状态同步（Cloud sessions）、以及桌面端 Code Tab 的可视化与交互（侧边栏 Fork、内联批注）是当前 UI/UX 迭代的重头戏（[#102055](https://github.com/anthropics/claude-code/issues/102055), [#95237](https://github.com/anthropics/claude-code/issues/95237)）。

**开发者关注点**
- **Windows 端性能与数据完整性崩溃**：Windows 环境下的 CPU 狂飙导致系统资源耗尽（Kernel pool 接近 9.4GB），以及桌面应用更新导致的 Session 丢失、插件未恢复等灾难性数据丢失问题令开发者如坐针毡（[#96722](https://github.com/anthropics/claude-code/issues/96722), [#103465](https://github.com/anthropics/claude-code/issues/103465)）。
- **模型行为不可控与提示词干扰**：针对 Opus/Sonnet 在特定场景下无视用户指令、乱改代码或触发虚假安全拦截（reasoning_extraction 误报）的抱怨增加，用户对高级别模型的“服从性”表现出一定程度的担忧（[#104428](https://github.com/anthropics/claude-code/issues/104428), [#103269](https://github.com/anthropics/claude-code/issues/103269)）。
- **高频权限弹窗疲劳**：在允许特定操作（如文件编辑）时，快捷选项“Always Allow”在静默提权至 Accept Edits 模式的同时，缺乏足够的视觉预警，导致用户在无意识的情况下丧失了细粒度控制力（[#103615](https://github.com/anthropics/claude-code/issues/103615)）。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-10-23)

### 1. 今日速览
今日社区热度集中在 **MCP 服务器内存泄漏**（#30408）与 **Windows 客户端更新/运行稳定性**问题，前者因资源未清理导致 RSS 超 9GB 引发 63 条评论的热议。开发层面，代码库正引入 **Google Cloud Vertex AI 支持**及 **环境作用域 Hook 机制**，同时 MCP SDK 升级至 1.32.0 以增强网络策略与安全性。

### 2. 版本发布
过去 24 小时内发布了三个 Rust 核心库的 Alpha 版本，主要为 CI 验证与 Backport 准备：
*   **rust-v0.164.0-alpha.12**: 最新 Alpha 迭代。
*   **rust-v0.164.0-alpha.11**: 用于 Backport Google Cloud Vertex AI 提供者（PR #56276 验证此版本基线）。
*   **rust-v0.163.0-alpha.11.2**: 针对 0.163 分支的稳定小版本更新。
*   [查看 Release 记录](https://github.com/openai/codex/releases)

### 3. 社区热点 Issues
| 标题 | 链接 | 重要性与社区反应 |
| :--- | :--- | :--- |
| **MCP server processes leak: per-thread processes never cleaned up** | [#30408](https://github.com/openai/codex/issues/30408) | **最高热度**。App-server 在归档线程后未清理 MCP 进程，导致内存无限增长（9GB+）。63 条评论，20 个点赞，确认为严重性能 Bug。 |
| **[Windows App] read_thread returns only chatgpt-content-reference** | [#50329](https://github.com/openai/codex/issues/50329) | Windows 客户端 API 返回异常，仅返回引用而非实际内容，影响自动化脚本集成。22 条评论。 |
| **Windows Store Codex repeatedly fails to update** | [#25770](https://github.com/openai/codex/issues/25770) | 旧 MSIX 包文件锁导致更新失败，高频出现。20 条评论，5 个点赞。 |
| **Chrome Computer Use changes to URL safety stop** | [#53154](https://github.com/openai/codex/issues/53154) | Computer Use 功能在成功读取后突然因安全策略停止，缺乏可操作的错误信息。14 条评论。 |
| **Windows Browser Use blocks file:// previews** | [#24847](https://github.com/openai/codex/issues/24847) | 浏览器代理策略错误拦截本地文件预览，与文档描述不符。11 条评论，9 个点赞。 |
| **macOS desktop: accumulating per-thread tool servers** | [#55141](https://github.com/openai/codex/issues/55141) | 与 #30408 类似，macOS 上工具服务器累积导致内存压力，重启后仍可见复制进程。8 条评论。 |
| **Project membership differs between sidebar and list_threads** | [#53486](https://github.com/openai/codex/issues/53486) | 侧边栏与 API 返回的项目归属不一致，`move_thread_to_project` 后读取值未更新。5 条评论。 |
| **Pre-turn compaction clears reasoning-included state** | [#32483](https://github.com/openai/codex/issues/32483) | CLI 预压缩清空了推理包含状态，影响自定义 Provider 的上下文管理。4 条评论，3 个点赞。 |
| **Windows: Sandbox cannot launch USER32-importing children** | [#46412](https://github.com/openai/codex/issues/46412) | 沙箱在 Session 0 启动导入 USER32 的子进程失败（STATUS_DLL_INIT_FAILED），影响 GUI 自动化。4 条评论。 |
| **GPT-6 Astra max turns one deletion rejection into refusal loop** | [#56086](https://github.com/openai/codex/issues/56086) | 模型行为 Bug，单次拒绝触发永久拒绝循环，影响 Pro 用户。3 条评论。 |

### 4. 重要 PR 进展
| 标题 | 链接 | 功能/修复内容 |
| :--- | :--- | :--- |
| **Add a built-in Google Cloud Vertex AI provider** | [PR #56265](https://github.com/openai/codex/pull/56265) | **新功能**。支持 `model_provider = "gcp"`，通过 `gcloud` 凭证获取，默认使用 `global` 位置。 |
| **Add support for environment-scoped managed hooks** | [PR #56304](https://github.com/openai/codex/pull/56304) | 新增环境级 Hook 发现与列表 API，将命令/MCP 执行路由至所属环境，隔离工作目录。 |
| **Bump `@modelcontextprotocol/sdk` to `1.32.0`** | [PR #56286](https://github.com/openai/codex/pull/56286) | 升级 MCP SDK，可能带来协议改进与安全增强。 |
| **Add negotiated network policy metadata support for MCP** | [PR #56278](https://github.com/openai/codex/pull/56278) | 为 MCP 调用添加网络策略元数据，仅向受信任 ChatGPT 源发送，增强安全隔离。 |
| **Support bounded request bodies in AWS SigV4 signing** | [PR #56277](https://github.com/openai/codex/pull/56277) | 修复网络代理限制，允许对非空 Payload 进行 AWS SigV4 签名，缓冲并哈希请求体。 |
| **Scope model catalogs and caches by thread originator** | [PR #56284](https://github.com/openai/codex/pull/56284) | 按线程发起者隔离模型目录与磁盘缓存，避免多租户/多场景下的缓存污染。 |
| **Decouple managed configuration loading from ChatGPT auth** | [PR #56295](https://github.com/openai/codex/pull/56295) | 引入 `BundleSource` 接口，分离配置加载与认证，提升云配置加载的健壮性。 |
| **Pin Linux artifact signing to Cosign v3.1.4** | [PR #56288](https://github.com/openai/codex/pull/56288) | 固定签名工具版本，确保 Linux 发行版兼容性，防止签名格式变更破坏验证。 |
| **Lock Python release build tools with uv** | [PR #56290](https://github.com/openai/codex/pull/56290) | 使用 `uv` 锁定 Python 构建依赖，防止重试构建时引入不稳定依赖。 |
| **Group consecutive transcript prompts into one background block** | [PR #56280](https://github.com/openai/codex/pull/56280) | 优化 UI，将连续用户提示合并为一个背景块，减少空白间距。 |

### 5. 功能需求趋势
*   **多云/多模型支持**：社区强烈关注模型连接性，PR 已引入 **Google Cloud Vertex AI**（#56265），表明官方正扩展非 OpenAI 直连的模型接入能力。
*   **细粒度 Hook 与自动化**：新 PR（#56304, #56302）引入 **环境作用域 Hook**，允许在特定运行环境中执行自定义逻辑，满足企业级自动化需求。
*   **网络策略与安全**：MCP 调用的 **网络策略元数据**（#56278）和 **SigV4 签名支持**（#56277）显示社区关注代理环境下的安全与鉴权兼容性。

### 6. 开发者关注点
*   **资源泄漏与稳定性**：MCP 进程泄漏（#30408, #55141）是当前最痛的痛点，直接影响长期运行服务的稳定性。
*   **Windows 平台体验**：多个 Issue（#50329, #25770, #46412）指向 Windows 客户端更新失败、API 返回异常及沙箱限制，Windows 用户反馈集中。
*   **本地文件访问受限**：Browser Use 对 `file://` 协议的拦截（#24847, #49601）阻碍了本地 HTML/原型调试，开发者呼吁放宽本地资源策略。
*   **权限持久化问题**：Google Drive 等工具的“Always allow”权限在跨会话时失效（#56300），导致频繁打断工作流。

</details>