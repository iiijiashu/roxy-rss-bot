# AI CLI 工具社区动态日报 2026-09-18

> 生成时间: 2026-09-18 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告 (2026-09-18)

### 1. 生态全景
当前 AI CLI 工具生态已从单纯的代码生成工具向具备复杂状态管理、多模交互及深度 IDE 集成的“开发伴侣”演进。头部工具如 Claude Code 和 OpenAI Codex 均开始探索语音交互、远程控制及模块化扩展架构（如 Mods/Hooks），以应对长时任务和跨平台协作的需求。然而，Windows 平台的稳定性、非官方模型提供商的兼容性以及底层协议（如 MCP、OAuth）的实现完整性，仍是制约工具走向大规模生产环境的共同瓶颈。整体态势显示，工具成熟度正在分化，核心功能在快速迭代，但边缘场景的鲁棒性仍需大量社区反馈驱动修复。

### 2. 各工具活跃度对比

| 工具名称 | 今日 Issues 热度 | 重要 PR 数量 | Release 情况 | 核心痛点领域 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 高 (Mods 提案 195 评论; Windows Bug 93 评论) | 3 | v2.1.275 (Gateway/快捷键优化) | Windows 稳定性, IDE 集成, 上下文资源浪费 |
| **OpenAI Codex** | 高 (MCP 兼容性 35 评论/48 赞; UI 卡顿 31 评论) | 10 | rust-v0.155.0 (语音/TUI 增强) | 非 OpenAI 提供商支持, Intel Mac 功能缺失, 沙箱 ACL |

*注：数据基于提供的 2026-09-18 社区动态摘要统计。*

### 3. 共同关注的功能方向
多个工具社区同时反映了以下需求，表明这是当前 AI CLI 开发者的普遍关切：
*   **IDE (VS Code) 集成深度与一致性**：Claude Code 存在拖放失效 (#25128)，Codex 存在主题卡死 (#15684) 和状态持久化问题。开发者均期待 IDE 体验能匹配终端 CLI 的能力，且两者状态同步需更稳定。
*   **MCP (Model Context Protocol) 协议完善**：Claude Code 面临上下文资源浪费 (#92255)，Codex 面临工具分页支持缺失 (#28858) 及非 OpenAI 提供商下的序列化错误 (#26234)。MCP 的标准化实现和效率优化是共同的技术焦点。
*   **长时任务与自动化可靠性**：Claude Code 关注会话连续性 (#11455) 和 Worktree 隔离泄露 (#93438)，Codex 关注远程压缩错误 (#33171) 和后台事件驱动唤醒 (#32188)。两者均在试图解决长时间运行 Agent 任务的稳定性问题。
*   **跨平台（特别是 Windows/Intel Mac）稳定性**：两个工具均在非主流或传统平台上遭遇阻断性 Bug，Windows 桌面启动/进程管理问题在两个生态中均有高频反馈。

### 4. 差异化定位分析
*   **Claude Code：扩展架构与多模交互先锋**
    *   **功能侧重**：强调架构级扩展能力，通过“Mods”和 Function Hooks 试图建立插件生态壁垒；率先引入 Gateway 签入和即时发送等高频交互优化。
    *   **技术路线**：倾向于增强 CLI 的独立性和模块化，支持多 Agent 并行（Worktree 隔离）。
    *   **目标用户**：深度依赖定制化工具链、需要长时复杂任务处理的高级开发者。
*   **OpenAI Codex：模型能力与多提供商兼容**
    *   **功能侧重**：紧密跟随 OpenAI 模型能力（如 GPT-5.6 Sol），重点在于提升 TUI 的实时反馈（推理摘要、语音）；积极扩展非 OpenAI 网关支持（OAuth 管理、Ollama/LM Studio）。
    *   **技术路线**：注重底层协议（MCP/网络）的健壮性和多模型环境的适配性，强化沙箱隔离。
    *   **目标用户**：使用多种 LLM 提供商、注重成本与效率平衡、且有本地模型部署需求的开发者。

### 5. 社区热度与成熟度
*   **社区活跃度**：两者均处于高热度阶段，但活跃类型不同。Claude Code 社区更多集中在**特性提案**（如 Mods 扩展 195 评论）和**平台缺陷投诉**，显示出用户对其潜力的期待及对 Windows 支持的不满。Codex 社区则更多集中在**协议兼容性**（MCP/非 OpenAI 提供商）和**UI 稳定性**讨论，反映出其作为通用入口在集成外部资源时面临的挑战。
*   **成熟度判断**：
    *   **Claude Code**：功能迭代速度快（新版本侧重交互效率），但核心痛点（Windows、IDE 细节）的修复速度滞后于功能上新，处于**快速功能堆叠**阶段。
    *   **OpenAI Codex**：PR 数量较多（10 条重要 PR 涉及安全、网络、性能底层），显示出更强的**工程稳定性**打磨力度，但在支持非 OpenAI 生态时暴露出集成深度不足的问题。

### 6. 值得关注的趋势信号
*   **从“代码补全”向“自主代理”过渡的阵痛**：两个工具均出现长时任务中断、状态泄露、速率限制不适配的问题。行业正试图在无限自动化与可控性之间寻找平衡，事件驱动唤醒和会话持久化将是接下来的竞争焦点。
*   **本地模型与边缘计算的兴起**：Codex 社区对 Ollama/LM Studio 及 MCP 非官方提供商的高关注度，表明开发者不再仅仅依赖云端顶级模型，**本地化部署**和**低成本模型集成**的需求正在迅速增长，CLI 工具必须提供灵活的后端抽象层。
*   **多模态与语音交互常态化**：Codex 引入实验性 `/voice` 功能，预示着 CLI 工具正从纯文本交互向“可听可说”的无障碍/高效开发模式扩展，这对 TUI 的设计提出了新要求。
*   **安全与权限模型的重构**：两个工具都出现了权限配置失效、沙箱 ACL 错误等安全相关 Bug。随着 AI 代理获取更高系统权限，**细粒度的权限控制**和**透明的审计日志**将成为企业级采用的关键门槛。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止日期：** 2026-09-18 | **数据源：** `anthropics/skills`

## 1. 热门 Skills 排行
基于 Issue 评论数及 PR 关注度排序，核心功能与讨论热点如下：

*   **skill-creator（Skill 创建器）**
    *   **功能/热点：** 负责创建和优化 Skill。当前社区最核心的痛点集中在触发率评估（Trigger Evals）失效及 Windows 兼容性问题上，多个 PR 试图修复其 0% 召回率误报问题。
    *   **状态：** Open ([PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1769](https://github.com/anthropics/skills/pull/1769), [Issue #556](https://github.com/anthropics/skills/issues/556))
*   **mcp-builder（MCP 构建器）**
    *   **功能/热点：** 用于构建和评估 Model Context Protocol 服务。社区讨论集中在评估脚本报错吞没异常、默认模型版本更新（向 claude-sonnet-5 迁移）以及新版本库的 API 适配。
    *   **状态：** Open ([PR #1742](https://github.com/anthropics/skills/pull/1742), [PR #1724](https://github.com/anthropics/skills/pull/1724), [Issue #1390](https://github.com/anthropics/skills/issues/1390))
*   **document-skills / office（文档生成核心）**
    *   **功能/热点：** 涵盖 DOCX、PPTX、XLSX 等办公文档生成与排版。讨论焦点在于文档排版质量控制、UTF-8 编码兼容性及 tracked changes（修订模式）导致的数据损坏 Bug。
    *   **状态：** Open ([PR #1765](https://github.com/anthropics/skills/pull/1765), [PR #541](https://github.com/anthropics/skills/pull/541), [PR #514](https://github.com/anthropics/skills/pull/514))
*   **claude-api（API 集成）**
    *   **功能/热点：** 官方 API 接入规范。社区主要关注模型 ID 废弃状态更新，以及单次工具调用注入近 156k tokens 导致的上下文窗口耗尽问题。
    *   **状态：** Open ([PR #1607](https://github.com/anthropics/skills/pull/1607), [Issue #1487](https://github.com/anthropics/skills/issues/1487))
*   **web-artifacts-builder（Web 构建器）**
    *   **功能/热点：** 生成自包含的 Web 资源包。主要讨论围绕 pnpm 高级别版本下打包脚本的阻塞级故障（ERR_PNPM_IGNORED_BUILDS）。
    *   **状态：** Open ([Issue #1362](https://github.com/anthropics/skills/issues/1362))
*   **Hivemind（多智能体编排）**
    *   **功能/热点：** 零成本的多智能体协作架构，将机械任务下放至免费模型执行，保持核心规划能力。
    *   **状态：** Open ([PR #1628](https://github.com/anthropics/skills/pull/1628))

## 2. 社区需求趋势
通过分析开放的 Issues，社区对新 Skill 及功能的期待集中在以下几个方向：
*   **组织级协同共享：** 期待 Claude.ai 支持企业内部的直接 Skills 共享机制，避免繁琐的本地文件传递与上传。([Issue #228](https://github.com/anthropics/skills/issues/228))
*   **安全与信任边界治理：** 社区强烈呼吁建立 Skills 命名空间的信任机制，防范第三方社区恶意 Skill 借用 `anthropic/` 前缀进行权限滥用。([Issue #492](https://github.com/anthropics/skills/issues/492))
*   **AI 智能体系统级治理：** 需求从单一代码生成延伸至 AI 系统的策略执行、威胁检测与信任评分等 Agent 治理安全模式。([Issue #412](https://github.com/anthropics/skills/issues/412))
*   **长时程任务状态管理：** 期待针对长时程 Agent 状态的记忆压缩与符号化通知技术（compact-memory），以提升多轮长对话的 Token 效率。([Issue #1329](https://github.com/anthropics/skills/issues/1329))

## 3. 高潜力待合并 Skills
以下为近期讨论活跃、技术路径明确但尚未合并的 Open PR，存在较高概率近期落地：
*   **Buffer GraphQL Scheduling API**：打通 Buffer 社交数据 API，支持任意 AI Agent 执行社交发帖及数据分析调度。([PR #1627](https://github.com/anthropics/skills/pull/1627))
*   **Proofcore Contract Auditor**：Web3 方向的智能合约静态审计，支持将 TON 链上加密审计证明锚定。([PR #1771](https://github.com/anthropics/skills/pull/1771))
*   **md2video-audio**：零成本将 Markdown 文档直接编译为具备拟人语音的专业 MP4 视频。([PR #1703](https://github.com/anthropics/skills/pull/1703))
*   **Reasoning Quality Gate Pipeline**：提供全生命周期（前置校准->对抗性审查->交付验证）的推理质量三重把关门禁。([Issue #1385](https://github.com/anthropics/skills/issues/1385))

## 4. Skills 生态洞察
当前社区在 Skills 层面最集中的诉求是**消除底层基础设施（如评测工具及打包链路）中破坏“开箱即用”预期的确定性故障**，以及**构建严格的组织级安全信任框架**。

---

# Claude Code 社区动态日报 (2026-09-18)

### 1. 今日速览
今日版本 v2.1.275 上线，重点优化了 Gateway 签入流程及新增“即时发送”快捷键以提升交互效率。社区焦点高度集中在 **Mods 扩展架构**（高热度增强提案）及 **Windows 平台稳定性**（Desktop 启动故障）。同时，Remote Control（远程控制）功能的缺陷及 MCP 上下文资源浪费问题成为近期开发者反馈的显著趋势。

### 2. 版本发布
**v2.1.275 更新摘要**
*   **Gateway 签入增强**：在 Claude apps gateway 签入中增加已登录账户显示；若 Gateway 命名账户，需在凭证保存前确认，且 `/status` 命令将展示该信息。
*   **即时发送功能**：新增快捷键（`ctrl+enter` 或 `ctrl+x ctrl+s`），可中断当前回合并立即发送所有排队消息。

### 3. 社区热点 Issues
以下 Issue 基于热度（评论数/点赞）及重要性筛选，反映当前社区最紧迫的需求与痛点：

1.  **[增强] Mods - 让 Claude 扩展性提升 10 倍** (#91870)
    *   **现状**：社区最热 Issue (195 评论)，提案者承诺数周内发布 function hooks，旨在通过大幅扩展 Hooks/Plugins 机制提升可定制性。
    *   **链接**：https://github.com/anthropics/claude-code/issues/91870
2.  **[Bug] Windows Desktop 启动失败 (Silo/Job Object 残留)** (#53247)
    *   **现状**：高频投诉 (93 评论)，Windows 崩溃后产生孤儿进程，导致应用无法重启，需注销或重启系统才能恢复，严重影响 Windows 用户体验。
    *   **链接**：https://github.com/anthropics/claude-code/issues/53247
3.  **[增强] 会话交接/连续性支持 (Session Handoff)** (#11455)
    *   **现状**：长期需求 (36 评论)，旨在解决 CLI 会话中断后的状态恢复问题，提升长任务处理的连续性。
    *   **链接**：https://github.com/anthropics/claude-code/issues/11455
4.  **[Bug] VS Code 扩展中拖放功能失效** (#25128)
    *   **现状**：回归性 Bug (48 点赞)，自 v2.1.6 起，VS Code 扩展聊天面板无法使用拖放文件，而终端 CLI 正常，影响 IDE 集成体验。
    *   **链接**：https://github.com/anthropics/claude-code/issues/25128
5.  **[Bug] 权限配置 `.claude/settings.local.json` 未被遵守** (#15921)
    *   **现状**：高关注度 Bug (31 评论)，即使在 `bypassPermissions` 模式下，Bash/Write/Edit 操作的权限限制仍未生效，涉及核心安全与权限逻辑。
    *   **链接**：https://github.com/anthropics/claude-code/issues/15921
6.  **[Bug] Session-start 技能列表描述被静默截断** (#81081)
    *   **现状**：在技能大小预算限制下，大多数技能描述被静默截断，影响用户对可用技能的感知。
    *   **链接**：https://github.com/anthropics/claude-code/issues/81081
7.  **[Bug] Cowork Windows 无法附加任何项目** (#88632)
    *   **现状**：Windows 本地环境 Cowork 模式报错“Projects can't be included...”，而 macOS 正常，平台不一致性 Bug。
    *   **链接**：https://github.com/anthropics/claude-code/issues/88632
8.  **[Bug] ECONNRESET: TLS 1.3 握手重置** (#94225)
    *   **现状**：特定网络环境（如西班牙 Movistar ISP）下直接路径连接失败，开启 VPN 可恢复，涉及底层网络协议兼容性。
    *   **链接**：https://github.com/anthropics/claude-code/issues/94225
9.  **[Bug] Remote Control 会话状态矛盾** (#95254)
    *   **现状**：手机端远程控制时，虽能接收其他会话消息，但自身输入被标记为“offline”，功能逻辑冲突。
    *   **链接**：https://github.com/anthropics/claude-code/issues/95254
10. **[Bug] Worktree 隔离导致 CWD 状态泄露** (#93438)
    *   **现状**：Agent 派发使用 `isolation:"worktree"` 时，工作区状态意外泄露回父会话，影响多 Agent 并行开发的稳定性。
    *   **链接**：https://github.com/anthropics/claude-code/issues/93438

### 4. 重要 PR 进展
*(注：提供的 PR 列表仅包含 3 条数据，故仅列出这 3 条)*

1.  **[Mods] 类型安全优化：`openPane` 返回类型调整为 `unknown`** (#95198)
    *   **内容**：将 diff mod 中 `openPane` 的返回类型从 `Promise<void>` 调整为 `Promise<unknown>`，以兼容即将发布的更丰富的 `$.ui.open` 结果对象，确保编译通过且不影响现有调用方。
    *   **链接**：https://github.com/anthropics/claude-code/pull/95198
2.  **[Diff] 修复首次编辑自动打开面板逻辑** (#94847)
    *   **内容**：修复 Diff 面板在首次成功执行 Edit/Write 时自动打开的问题。原逻辑在获取数据前打开面板，若涉及仓库外文件、忽略文件或不同 worktree，会导致显示空面板。新逻辑仅在有可列出文件时打开。
    *   **链接**：https://github.com/anthropics/claude-code/pull/94847
3.  **[PR-Review-Toolkit] 修复 Agent YAML Frontmatter 错误** (#87077)
    *   **内容**：修复所有 agents 描述中未引用的标量包含对话行（如 `Daisy: "..."`）导致的 YAML 解析错误，该错误导致 agent 加载时 frontmatter 为空。
    *   **链接**：https://github.com/anthropics/claude-code/pull/87077

### 5. 功能需求趋势
从过去 24 小时及近期更新的 Issue 中，提炼出以下社区关注方向：

*   **扩展性与定制化 (Mods/Hooks)**：以 #91870 为代表，社区强烈渴望通过 Function Hooks 和 Plugins 实现更深度的扩展，不仅仅是 CLI 层面的简单调用，而是架构级的“10x 扩展”。
*   **Windows 平台稳定性**：Windows 用户面临较多阻断性问题，包括 Desktop 启动崩溃恢复困难 (#53247) 和 Cowork 项目附加失败 (#88632)。Windows 支持的质量成为当前主要短板。
*   **远程与移动开发体验**：Remote Control 功能出现多个状态同步 Bug (#95254, #95231)，开发者对移动端与本地会话无缝协作的期待在上升，但当前实现尚不成熟。
*   **IDE (VS Code) 集成完善**：VS Code 扩展在基础交互（拖放 #25128）和 UI 细节（消息折叠 #77004、图片渲染 #79436）上存在大量待修复项，用户期待 IDE 体验向终端 CLI 看齐。

### 6. 开发者关注点
*   **上下文资源管理**：开发者抱怨 MCP 工具 schema 和 Deferred tools 在禁用时仍消耗大量 Token (#92255, #83363)，期望更精细的上下文保留与驱逐机制 (#85169)。
*   **权限与安全模型**：权限配置生效不及时或不彻底 (#15921)，以及 Agent 批量操作缺乏安全护栏 (#79399) 引起对自动化任务安全性的担忧。
*   **会话连续性**：长任务处理中会话中断后的恢复能力不足 (#11455)，以及 Worktree 隔离的状态泄露 (#93438) 影响了复杂多 Agent 工作流的可靠性。
*   **计费透明度**：模型切换（如 Fable）的计费范围不明确导致意外高额账单 (#79478)，开发者期望更清晰的计费作用域提示。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-09-18)

## 1.  今日速览
OpenAI 发布 Codex CLI 稳定版 **v0.155.0**，引入实验性 `/voice` 语音对话功能及 TUI 实时推理状态展示。社区热点集中在 **Windows 沙箱 ACL 错误**、**Intel macOS Computer Use 缺失**以及 **MCP 工具在非 OpenAI 提供商下的兼容性** 问题，相关 Issue 讨论热度极高。

## 2. 版本发布
*   **rust-v0.155.0 (稳定版)**
    *   **新功能**：支持实验性 `/voice` 对话，提供实时转录和麦克风控制（需通过 `/experimental` 启用）。
    *   **TUI 增强**：状态栏实时显示推理摘要（reasoning summaries），并在回合成功后显示完成时间戳。
    *   相关 PR：#43581, #43651, #44331
*   **Alpha 版本更新**：同步发布了 0.155.0-alpha.15 至 0.155.0-alpha.18 多个预测试版本。

## 3. 社区热点 Issues
以下选取了 10 个关注度最高或影响面最大的 Issue：

1.  **[MCP/CLI] 非 OpenAI Responses API 提供商下 MCP 工具不可用**
    *   **摘要**：在使用 Ollama、LM Studio 或 OpenRouter 等本地/网关服务端时，Codex 将 MCP 工具序列化为专有 namespace 格式，导致模型无法调用这些工具。
    *   **社区反应**：35 条评论，48 个 👍，是过去 24 小时内讨论最热烈的 Issue。
    *   链接：[Issue #26234](https://github.com/openai/codex/issues/26234)

2.  **[App/Session] Codex Desktop 接受提示后 UI 卡在 "Thinking"，Stop 失效**
    *   **摘要**：macOS 桌面版在特定情况下 UI 冻结，无法停止任务，重启后该回合可能消失。
    *   **社区反应**：31 条评论，14 个 👍。
    *   链接：[Issue #24287](https://github.com/openai/codex/issues/24287)

3.  **[Rate-Limits] 5 小时使用限制频繁中断 GPT-5.6 Sol 长时任务**
    *   **摘要**：随着 GPT-5.6 Sol 能力的提升，现有的 5 小时滚动窗口限制不适合长时自主代理任务，导致任务中断。
    *   **社区反应**：15 条评论，4 个 👍。
    *   链接：[Issue #40905](https://github.com/openai/codex/issues/40905)

4.  **[Windows] 桌面更新后本地项目从侧边栏消失**
    *   **摘要**：Windows 桌面应用更新后，"Projects" 区域显示为空，尽管文件和聊天历史仍存在。
    *   **社区反应**：14 条评论。
    *   链接：[Issue #42739](https://github.com/openai/codex/issues/42739)

5.  **[IDE/Extension] VS Code 扩展卡在深色主题**
    *   **摘要**：VS Code 侧边栏/Webview 界面卡死在深色模式，无法跟随系统或手动切换。
    *   **社区反应**：13 条评论，10 个 👍，已标记为回归问题并关闭（可能已修复或转为其他 Issue）。
    *   链接：[Issue #15684](https://github.com/openai/codex/issues/15684)

6.  **[macOS/Intel] x64 构建缺失 Computer Use 辅助程序**
    *   **摘要**：Intel Mac 用户无法使用 Appshots、锁屏操作等功能，因为 x64 发行包中缺少 `computer-use` 插件和辅助应用。此问题在多个 Issue 中反复出现（#24437, #24053, #26842, #25045, #46327）。
    *   **社区反应**：多个相关 Issue 均获得关注，表明这是 Intel Mac 用户的重大痛点。
    *   链接：[Issue #24437](https://github.com/openai/codex/issues/24437) (及关联 Issue)

7.  **[CLI/Enhancement] 后台执行会话完成时的事件驱动唤醒**
    *   **摘要**：请求支持在长时间运行的后台命令完成时通过事件唤醒模型，而非当前的轮询机制，以减少模型回合和成本。
    *   **社区反应**：10 条评论，13 个 👍。
    *   链接：[Issue #32188](https://github.com/openai/codex/issues/32188)

8.  **[App/Context] 远程压缩容量错误导致单个持久目标终止**
    *   **摘要**：长时运行的 `/goal` 任务因远程压缩容量错误而失败，尽管其他任务正常。
    *   **社区反应**：9 条评论。
    *   链接：[Issue #33171](https://github.com/openai/codex/issues/33171)

9.  **[CLI/Skills] recommended_plugins 注入缺乏有效的禁用选项**
    *   **摘要**：`recommended_plugins` 块在每次会话第一轮无条件注入约 38 个未安装插件，缺乏细粒度的客户端禁用机制。
    *   **社区反应**：7 条评论，3 个 👍。
    *   链接：[Issue #38185](https://github.com/openai/codex/issues/38185)

10. **[MCP/CLI] Codex 未遵循 MCP `tools/list` 的分页 (nextCursor)**
    *   **摘要**：当 MCP 服务器返回分页结果时，Codex 未通过 `nextCursor` 获取后续工具列表。
    *   **社区反应**：6 条评论，6 个 👍。
    *   链接：[Issue #28858](https://github.com/openai/codex/issues/28858)

## 4. 重要 PR 进展
以下选取了 10 个已关闭或合并的重要 PR，反映了近期开发重点：

1.  **PR #46319: 在 exec JSON 输出中保留 Web Search 操作和结果**
    *   **内容**：修复了 `codex exec --json` 中 Web Search 事件丢失结构化结果（如 URL 和搜索结果）的问题，通过显式映射替代了有损的序列化往返。
    *   链接：[PR #46319](https://github.com/openai/codex/pull/46319)

2.  **PR #46318: 为模型提供商网关添加 OAuth 凭证管理**
    *   **内容**：引入 `GatewayAuthManager`，支持 PKCE 浏览器登录、loopback 回调、令牌缓存及刷新，并将凭证存储在加密名称空间中，增强对非 OpenAI 网关的安全支持。
    *   链接：[PR #46318](https://github.com/openai/codex/pull/46318)

3.  **PR #46324: 扩展压缩回退至当前模型**
    *   **内容**：修复了在切换模型后，压缩操作失败时未能回退到新选择模型的问题，增强了多模型环境下的稳定性。
    *   链接：[PR #46324](https://github.com/openai/codex/pull/46324)

4.  **PR #46302: 使用执行器 OS 验证网络套接字策略**
    *   **内容**：修复了在控制器与执行器 OS 不同（如 Linux 控制器 + Windows 执行器）时，因路径验证错误导致有效绝对路径被拒绝的问题。
    *   链接：[PR #46302](https://github.com/openai/codex/pull/46302)

5.  **PR #46300: 集中化 OAuth 登录和刷新处理**
    *   **内容**：重构了 OAuth 流程，提取了授权 URL 构造和错误处理，防止在诊断信息中泄露令牌或凭据，提升了安全性。
    *   链接：[PR #46300](https://github.com/openai/codex/pull/46300)

6.  **PR #46328: 避免持久化无项目目录的信任状态**
    *   **内容**：当在无法识别为项目根目录的文件夹中启动线程时，不再持久化项目信任状态，防止后续添加的项目配置被错误地预批准。
    *   链接：[PR #46328](https://github.com/openai/codex/pull/46328)

7.  **PR #46310: 推迟环境选择更改至下一回合**
    *   **内容**：确保在回合运行期间更改环境选择不会干扰当前回合的工具调用或环境设置，提高了并发执行的安全性。
    *   链接：[PR #46310](https://github.com/openai/codex/pull/46310)

8.  **PR #46309: 在显示元数据刷新时保留插件缓存**
    *   **内容**：优化了插件缓存策略，避免因图像 URL 等显示元数据的变化而无效化 MCP 和技能缓存，提升性能。
    *   链接：[PR #46309](https://github.com/openai/codex/pull/46309)

9.  **PR #46293: 通过 EnvironmentAccess 路由技能发现**
    *   **内容**：将技能发现和插件命名空间解析重构为使用 `EnvironmentAccess`，替代直接的 `ExecutorFileSystem` 调用，增强了沙箱隔离的明确性。
    *   链接：[PR #46293](https://github.com/openai/codex/pull/46293)

10. **PR #46288: 为代码模式响应添加可选开销计时**
    *   **内容**：新增实验性标志 `experimental_show_cell_overhead`，用于在 TUI 中显示 host 持续时间及 app-server 等待时间，帮助调试性能瓶颈。
    *   链接：[PR #46288](https://github.com/openai/codex/pull/46288)

## 5. 功能需求趋势
*   **多模型/非 OpenAI 提供商支持**：社区强烈需求更好地支持 Ollama、LM Studio、OpenRouter 等本地或网关提供商，特别是 MCP 工具调用的兼容性和 OAuth 认证流程。
*   **长时任务与代理能力**：随着 GPT-5.6 Sol 等模型的推出，用户需要更灵活的速率限制策略（如针对长时任务的例外）和更高效的事件驱动机制（如后台命令完成唤醒）来支持自主代理。
*   **跨平台一致性**：Intel macOS 和 Windows 平台存在显著的功能缺失或 Bug（如 Computer Use 缺失、沙箱 ACL 错误），用户期望各平台功能对齐。
*   **插件与技能管理**：对插件注入的细粒度控制（如禁用特定插件）和技能发现机制的优化是近期热点。

## 6. 开发者关注点
*   **Windows 沙箱稳定性**：多个 Issue 指向 Windows 10/11 上 `deny_read_acl_state.json` 损坏或 ACL 应用失败，导致 Computer Use 和 CLI 命令被阻止。这是一个高频且影响面大的底层问题。
*   **MCP 协议实现的完整性**：除了非 OpenAI 提供商的工具序列化问题，MCP 的分页支持（`nextCursor`）也是开发者关注的核心协议细节。
*   **CLI 自动化与无头模式**：开发者在使用 `codex exec` 进行自动化时，遇到了 Hooks 信任机制不明确（无诊断信息）、JSON 输出数据丢失等问题，影响了 CI/CD 流水线的集成体验。
*   **桌面应用状态持久性**：项目列表消失、UI 卡死等问题影响了日常开发效率，用户对应用的稳定性和状态恢复能力提出更高要求。

</details>