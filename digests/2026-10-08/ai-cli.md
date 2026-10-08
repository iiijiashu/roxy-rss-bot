# AI CLI 工具社区动态日报 2026-10-08

> 生成时间: 2026-10-08 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

### 1. 生态全景
2026 年 10 月 8 日，AI CLI 工具生态呈现**“平台稳定性攻坚”**与**“安全架构深化”**并行的态势。Claude Code 聚焦于长会话记忆连续性与多代理编排的精细化控制，而 OpenAI Codex 则面临严重的 Windows 沙箱回归故障，迫使官方加速跨平台沙箱完整性校验体系的落地。两者均引入了新一代默认模型（Claude Haiku 5.5 与 GPT-6.1 Sol），并在构建管线（Bazel/Cargo 双轨）和移动端远程体验上持续投入。行业竞争核心已从单纯的模型能力转向**工程化可靠性、安全合规性及本地工作流无缝集成**。

### 2. 各工具活跃度对比

| 维度 | Claude Code (Anthropic) | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues 活跃度** | 高（10 条热点，涉及隐私、网络、远程控制） | 极高（45+ 更新，过半集中于 Windows 故障） |
| **PR 活跃度** | 中（7 条更新，侧重安全修复与兼容性） | 高（10+ 条密集提交，侧重构建管线与安全校验） |
| **Release 情况** | **v2.1.293**：引入 Haiku 5.5，扩展 1M 上下文 | **v0.161.0**：GPT-6.1 Sol 默认；**v0.162.0-alpha** |
| **核心痛点** | 远程连接断开、长会话记忆丢失、密码输入拦截 | Windows 沙箱 `node_repl` 共享冲突、命令无法执行 |
| **典型热度指标** | #69336 (21 赞同), #78160 (21 赞同) | #49458 (64 评论), #51601 (50 评论) |

### 3. 共同关注的功能方向
*   **跨平台沙箱与安全完整性校验**：
    *   **Claude Code**：修复 Hookify 插件忽略祖先目录配置的安全绕过漏洞（PR #85716），增强 PreToolUse 异常的 Fail-Closed 机制（PR #84364）。
    *   **OpenAI Codex**：密集落地 Linux (bubblewrap)、macOS (Seatbelt) 及 Windows 的沙箱完整性检查（PR #51840-51843），以应对当前的高发故障。
*   **上下文与记忆管理优化**：
    *   **Claude Code**：社区强烈呼吁解决压缩后工作状态丢失问题（#70555），支持 1M 上下文窗口下的逻辑连贯性。
    *   **OpenAI Codex**：聚焦图像负载引发的无限压缩循环（#33493）及 Prompt Cache 在预测分支中的复用效率（PR #51884）。
*   **移动端与远程工作流**：
    *   **Claude Code**：重点修复 Android 推送失效及桌面更新后会话断开问题（#87003, #100106）。
    *   **OpenAI Codex**：解决 Dot 客户端与本地会话的状态同步及 Computer Use 工具在本地任务中的缺失问题（#51880, #49458）。

### 4. 差异化定位分析
*   **Claude Code**：
    *   **技术路线**：侧重**Agent 编排粒度**与**合规安全**。通过 `agentType` 字段和动态 `effort` 参数（#77298）强化多代理系统的可观测性与成本控制，适合需要复杂工作流和企业级合规（如 HIPAA）的用户。
    *   **目标用户**：强调长任务连续性和远程办公效率的专业开发者及团队协作场景。
*   **OpenAI Codex**：
    *   **技术路线**：侧重**底层构建灵活性**与**沙箱隔离**。通过引入 Bazel 构建矩阵（PR #51856）和跨平台沙箱校验，强调代码执行的物理隔离安全性与工程化标准化。
    *   **目标用户**：依赖本地终端自动化、对 Windows 桌面端稳定性敏感以及需要自定义构建管线的工程团队。

### 5. 社区热度与成熟度
*   **Claude Code**：处于**功能迭代深水区**。社区成熟度较高，讨论从基础稳定性转向记忆架构、成本控制和权限精细化配置，反映其作为主流开发工具已进入“体验优化”阶段。
*   **OpenAI Codex**：处于**快速修复与架构加固期**。因 Windows 平台的大面积沙箱故障，社区热度集中于 bug 修复而非新特性探讨，表明其在跨平台稳定性上仍面临成熟度挑战，正处于高强度的工程补强阶段。

### 6. 值得关注的趋势信号
*   **沙箱即服务（Sandbox-as-Feature）**：安全机制正从简单的权限控制演变为可验证的完整性检查系统。开发者需关注沙箱初始化失败对自动化流水线的阻断风险，建议在 CI/CD 中增加沙箱健康预检。
*   **上下文经济学**：随着上下文窗口扩大至 1M token，成本与效率的平衡成为新焦点。动态 `effort` 参数和基于成本的代理生成确认机制（#95313）提示开发者需重新评估多代理系统的资源消耗模型。
*   **Windows 一等公民化**：两大工具均在 Windows 平台遭遇严重稳定性问题，暗示 Windows 已成为 AI CLI 的关键战场。建议技术决策者在评估工具链时，将 Windows 下的沙箱兼容性和进程管理作为核心选型指标。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

### 1. 热门 Skills 排行
基于提供的 Pull Requests 数据，以下是关注度（活跃更新或功能重要性）较高的 5 个 Skills：

*   **Skill Creator**
    *   **功能与讨论**：核心开发工具，用于创建和评估其他 Skills。当前热点集中在修复 Windows 兼容性、运行时代码评估假阴性、以及加固评估查看器（Eval Viewer）的安全漏洞（如脚本逃逸、DNS 重绑定）。
    *   **状态**：Open
    *   **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1961](https://github.com/anthropics/skills/pull/1961)
*   **MCP Builder**
    *   **功能与讨论**：支持 MCP 协议构建。社区关注其与 `mcp>=2.0` 版本的兼容性（`streamable_http_client` 接口变更）以及评估脚本在处理真实 MCP 服务器时的序列化错误。
    *   **状态**：Open
    *   **链接**：[PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390)
*   **DOCX / Document Skills**
    *   **功能与讨论**：处理 Word 文档生成与修改。讨论热点包括修复 LibreOffice 超时错误处理、验证输出文件是否清除修订标记，以及检测孤立的 docx 注释。
    *   **状态**：Open
    *   **链接**：[PR #1792](https://github.com/anthropics/skills/pull/1792), [PR #1734](https://github.com/anthropics/skills/pull/1734)
*   **Claude API**
    *   **功能与讨论**：封装 Claude API 调用。主要问题在于该 Skill 在单次工具调用中注入过多 Token（约 156k），导致上下文窗口耗尽；同时正在修复失效的文档链接。
    *   **状态**：Open
    *   **链接**：[PR #1730](https://github.com/anthropics/skills/pull/1730), [Issue #1487](https://github.com/anthropics/skills/issues/1487)
*   **Webapp Testing**
    *   **功能与讨论**：Web 应用端到端测试。热点集中在修复 `subprocess` 中的命令注入风险（CWE-78）以及测试脚本的健壮性。
    *   **状态**：Open
    *   **链接**：[PR #1980](https://github.com/anthropics/skills/pull/1980)

### 2. 社区需求趋势
从 Issues 反馈中，社区对新 Skill 方向的期待主要集中在：

*   **组织级共享与协作**：强烈期望 Claude.ai 能支持组织内部直接共享 Skills 库，避免手动下载上传 `.skill` 文件的繁琐流程。 [Issue #228](https://github.com/anthropics/skills/issues/228)
*   **Agent 状态管理**：提出 `compact-memory` 需求，希望使用符号化表示法来压缩长时程 Agent 的状态和笔记，以优化上下文占用。 [Issue #1329](https://github.com/anthropics/skills/issues/1329)
*   **AI 安全与治理**：期待针对 AI Agent 系统的安全模式 Skill，如策略执行、威胁检测和审计追踪（Agent Governance）。 [Issue #412](https://github.com/anthropics/skills/issues/412)
*   **视频生成**：出现将 Markdown 编译为带语音的专业视频（`md2video-audio`）的新需求。 [PR #1703](https://github.com/anthropics/skills/pull/1703)

### 3. 高潜力待合并 Skills
以下 PR 评论活跃或近期更新频繁，显示社区关注度较高，可能在近期合并：

*   **ProofCore Contract Auditor**：针对 Web3 开发的智能合约审计与 TON 区块链证明锚定 Skill。 [PR #1771](https://github.com/anthropics/skills/pull/1771)
*   **SCNet HPC**：提供通过 SSH 和 Slurm 工作流操作 SCNet 高性能计算集群的指引。 [PR #1615](https://github.com/anthropics/skills/pull/1615)
*   **Algorithmic Art 修复**：修复了 `wrapAround()` 函数对负值处理错误的逻辑 Bug，确保结果在有效范围内。 [PR #1977](https://github.com/anthropics/skills/pull/1977)

### 4. Skills 生态洞察
当前社区最集中的诉求是**提升 Skills 的信任边界安全性与上下文效率**（防止社区 Skill 冒充官方、修复 Skill 脚本的安全漏洞、解决超大 Token 注入问题）。

---

# Claude Code 社区动态日报 (2026-10-08)

## 1. 今日速览
今日最关键的动态是 **v2.1.293** 版本的发布，正式引入 Claude Haiku 5.5 作为默认 Haiku 模型并大幅扩展上下文窗口，同时新增 `agentType` 字段以增强子代理脚本的可观测性。社区层面，**远程控制（Remote Control）稳定性**成为高频痛点，多个 Issue 指出桌面应用更新后会话断开及 Android 推送失效问题；此外，**长会话记忆连续性**和**安全权限机制**（如密码输入限制、权限规则匹配 Bug）引发了大量讨论，开发者强烈呼吁增加对长任务场景和合规工作流的支持。

## 2. 版本发布
### v2.1.293
*   **模型更新**：新增 **Claude Haiku 5.5** (`claude-haiku-5-5`)，现为 Anthropic API 上的默认 Haiku 模型。支持 1M 上下文窗口；定价调整为 $0.10/$0.50 每 Mtok（超过 100K 提示为 $0.50/$2.50）。
*   **Agent SDK**：`subagentStatusLine` 载荷中新增 `agentType` 字段，允许脚本区分不同类型的自定义子代理。
*   **其他**：更新内容中包含多项核心功能迭代（原文截断，但上述为核心变更）。
*   链接: [anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases)

## 3. 社区热点 Issues
1.  **#69336 [BUG] API Error: Connection closed mid-response**
    *   **重要性**：Linux 平台下新上下文窗口立即出现 API 连接中断，影响核心可用性。
    *   **社区反应**：20 条评论，21 个赞同，属于高频网络稳定性问题。
    *   链接: [Issue #69336](https://github.com/anthropics/claude-code/issues/69336)

2.  **#66010 [BUG] [PRIVACY] GMail MCP Rewrites URL with google tracking URLS**
    *   **重要性**：MCP 集成中的隐私安全问题，GMail MCP 擅自将 URL 重写为带 Google 追踪参数的链接。
    *   **社区反应**：20 条评论，涉及 macOS 平台，用户担忧数据泄露和链接完整性。
    *   链接: [Issue #66010](https://github.com/anthropics/claude-code/issues/66010)

3.  **#70555 [ENHANCEMENT] Working-state continuity: survive compaction and /clear**
    *   **重要性**：长会话“变笨”问题。上下文压缩或 `/clear` 后，AI 丢失工作状态，导致重复推导和错误。
    *   **社区反应**：15 条评论，是长任务开发场景下的核心痛点，涉及记忆管理架构。
    *   链接: [Issue #70555](https://github.com/anthropics/claude-code/issues/70555)

4.  **#78160 [ENHANCEMENT] Hard block on typing passwords breaks legitimate dev/test workflows**
    *   **重要性**：安全机制过度拦截。Claude 拒绝在本地/测试环境输入已知密码，阻碍自动化测试和开发工作流。
    *   **社区反应**：13 条评论，21 个赞同，开发者呼吁提供基于权限的“信任模式”以绕过此类硬拦截。
    *   链接: [Issue #78160](https://github.com/anthropics/claude-code/issues/78160)

5.  **#87003 [BUG] Remote Control: CLI reports "Mobile push requested" but Android never receives it**
    *   **重要性**：移动端远程体验断裂。Android 端无法接收推送，导致远程启动会话失败。
    *   **社区反应**：9 条评论，6 个赞同，复现于最新 CLI 版本，严重影响移动办公场景。
    *   链接: [Issue #87003](https://github.com/anthropics/claude-code/issues/87003)

6.  **#95967 [BUG] Scheduled task (routine) runs no longer appear in the desktop sidebar**
    *   **重要性**：桌面端功能回归。定时任务（Routines）执行后不再显示在侧边栏或远程控制中，导致无法查看历史或继续会话。
    *   **社区反应**：8 条评论，6 个赞同，破坏了桌面应用的核心工作流。
    *   链接: [Issue #95967](https://github.com/anthropics/claude-code/issues/95967)

7.  **#77298 [ENHANCEMENT] Add per-call effort parameter to the Agent (Task) tool**
    *   **重要性**：Agent 控制粒度不足。目前无法在调用单个子代理时动态设置 `effort` 等级，需预先定义文件。
    *   **社区反应**：8 条评论，24 个赞同，高热度功能请求，旨在优化多代理编排的效率与成本。
    *   链接: [Issue #77298](https://github.com/anthropics/claude-code/issues/77298)

8.  **#96299 [BUG] Windows: claude.exe session processes accumulate and are never terminated**
    *   **重要性**：资源泄漏。Windows 上后台进程未随会话结束而终止，导致 RAM/磁盘占用随时间线性增长。
    *   **社区反应**：7 条评论，影响 Windows 用户长时间使用体验。
    *   链接: [Issue #96299](https://github.com/anthropics/claude-code/issues/96299)

9.  **#96662 [BUG] Auto Mode classifier false positives in legitimate multi-agent repo workflow**
    *   **重要性**：安全分类器误报。在多代理仓库工作流中，合法操作被错误标记为风险，干扰自动化流程。
    *   **社区反应**：3 条评论，近期更新引入的回归问题。
    *   链接: [Issue #96662](https://github.com/anthropics/claude-code/issues/96662)

10. **#95313 [ENHANCEMENT] Request: Require user confirmation before spawning expensive agents**
    *   **重要性**：成本与权限控制。缺乏对高成本/高权限子代理生成的用户确认机制，存在资源滥用风险。
    *   **社区反应**：8 条评论，关注成本控制与安全边界。
    *   链接: [Issue #95313](https://github.com/anthropics/claude-code/issues/95313)

## 4. 重要 PR 进展
*注：过去 24 小时内更新 7 条 PR，以下列出其中核心或具有代表性的 5 条（因未提供完整 10 条有效详情，仅选取有摘要内容的条目）*

1.  **PR #82320: Fix examples/gateway/aws/setup.sh aborting on stock macOS bash 3.2**
    *   **内容**：修复 macOS 默认 Bash 3.2 因不支持 Bash 4 语法（`${DIST_SHA256,,}`）导致脚本中断的问题，增强跨平台兼容性。
    *   链接: [PR #82320](https://github.com/anthropics/claude-code/pull/82320)

2.  **PR #86746: fix(security-guidance): preserve Python probe errors**
    *   **内容**：修复安全引导模块中 Python 解释器探测错误被静默丢弃的问题，现在会保留 stderr 并在所有候选解释器失败时报告诊断信息。
    *   链接: [PR #86746](https://github.com/anthropics/claude-code/pull/86746)

3.  **PR #85323: fix(plugin-dev): parse block scalar agent descriptions**
    *   **内容**：修复 YAML 块标量（Block Scalar）解析缺陷，确保多行 `description` 字段被正确读取，而非仅读取标记符。
    *   链接: [PR #85323](https://github.com/anthropics/claude-code/pull/85323)

4.  **PR #84364: fix(hookify): fail closed on exceptions in pretooluse hook**
    *   **内容**：安全增强。修复 PreToolUse Hook 中异常导致默认放行（Fail Open）的漏洞，现在异常将触发 `deny` 决策，防止未授权操作。
    *   链接: [PR #84364](https://github.com/anthropics/claude-code/pull/84364)

5.  **PR #85716: fix(hookify): load rules from ancestor .claude directories to prevent silent bypass**
    *   **内容**：修复 Hookify 插件在子目录中运行时忽略祖先目录 `.claude` 配置的安全绕过漏洞，确保规则一致加载。
    *   链接: [PR #85716](https://github.com/anthropics/claude-code/pull/85716)

*(其余 2 条 PR #100293 和 #41447 涉及 HIPAA 配置示例和开源请求，因缺乏详细技术变更描述，未列入核心进展)*

## 5. 功能需求趋势
*   **记忆与上下文管理**：社区强烈关注长会话中的**工作状态连续性**（#70555），希望 AI 在压缩或清除后能保持逻辑连贯，避免重复劳动。
*   **Agent 编排灵活性**：请求在调用 Agent 时支持**动态参数**（如 `effort` #77298）和**成本确认**（#95313），以优化多代理系统的资源消耗和控制力。
*   **远程与移动端体验**：对 **Remote Control** 的稳定性要求极高，包括 Android 推送修复（#87003）和桌面更新后的会话重连（#100106, #96220）。
*   **安全与合规**：开发者希望平衡安全拦截与工作流程，特别是针对**本地开发/测试环境**的密码输入豁免（#78160）以及 **HIPAA/企业合规**配置（PR #100293）。

## 6. 开发者关注点
*   **Windows 平台稳定性**：进程泄漏（#96299）和特定环境下的 EFS 卷启动问题（#100354）是 Windows 用户的主要痛点。
*   **网络与连接层回归**：2.1.213+ 版本引入的 Keep-Alive 禁用逻辑导致长会话中出现流闲置停滞和全量重发（#100353），严重影响大模型交互体验。
*   **权限规则误判**：`permissions.deny` 规则在包含特定字符（如反斜杠）时失效（#100349），以及安全分类器在复杂工作流中的高误报率（#96662），削弱了开发者对安全沙箱的信任。
*   **桌面应用 UI/UX 异常**：macOS 上主进程意外导航至不存在路由（#100086）和远程会话自动断开（#100106）影响了专业用户的日常使用效率。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex 社区动态日报（2026-10-08）

### 1. 今日速览
今日社区最核心的动态是 Windows 平台出现大面积沙箱故障，多个高热度 Issue 集中反馈 `node_repl.exe` 共享冲突（os error 32）导致命令无法执行。与此同时，官方发布 Rust 0.161.0 正式版本，将 GPT-6.1 Sol 设为默认模型并强化 Amazon Bedrock 支持；代码侧则密集推进了跨平台沙箱完整性校验体系及 Bazel 构建管线落地。

### 2. 版本发布
*   **Rust v0.161.0**：发布稳定版，主要更新包括 GPT-6.1 Sol 成为默认模型，Amazon Bedrock 支持多智能体 V2 和 Ultra 推理，以及扩展 AWS GovCloud 区域支持。
*   **Rust v0.162.0-alpha.17.1 / .18**：发布两个 Alpha 测试版本，用于后续功能预演。
    *   链接：[v0.161.0](https://github.com/openai/codex/releases/tag/rust-v0.161.0) | [v0.162.0-alpha.18](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.18)

### 3. 社区热点 Issues
1.  **[#49458] Windows Dot 本地任务缺失 Computer Use 工具**：64 条评论，社区热度最高。Dot 启动的本地任务无法调用 Computer Use，而普通本地会话正常，严重影响 Windows 用户自动化流程。[链接](https://github.com/openai/codex/issues/49458)
2.  **[#51601] Windows 沙箱设置失败（Sharing Violation）**：50 条评论。更新至 26.1002.51308 后，命令执行前因验证自身运行时失败，导致所有命令无法启动。[链接](https://github.com/openai/codex/issues/51601)
3.  **[#33493] 本地压缩 v2 导致无界图像负载**：28 条评论。长对话中图像负载未清理，引发反复自动压缩，严重影响上下文管理和性能。[链接](https://github.com/openai/codex/issues/33493)
4.  **[#51590] Windows 沙箱无法打开 node_repl.exe**：19 条评论。具体定位了 error 32（共享冲突），导致 Computer Use 和 Shell 均被阻塞，是今日 Windows 故障的典型代表。[链接](https://github.com/openai/codex/issues/51590)
5.  **[#48913] 增加禁用随机问候语设置**：34 个 👍。用户认为数百次/天的新会话中显示重复的俏皮问候语显得低效且干扰，需求强烈。[链接](https://github.com/openai/codex/issues/48913)
6.  **[#49873] Dot 安全暂停状态不同步**：12 条评论。ChatGPT Pro 用户反馈在 macOS/iOS 上，自主执行继续运行时，人工控制/恢复功能却被阻塞，存在安全风险。[链接](https://github.com/openai/codex/issues/49873)
7.  **[#51357] GPT-6.1 Sol 输出前存在数分钟延迟**：新模型行为问题。工具调用后到实际输出之间存在间歇性长延迟，且推理摘要为空，影响使用体验。[链接](https://github.com/openai/codex/issues/51357)
8.  **[#51340] Windows 桌面应用启动即崩溃**：6 条评论。指向 `windows-updater.node` 模块的 0xC0000005 异常，重装无法修复，属于严重稳定性问题。[链接](https://github.com/openai/codex/issues/51340)
9.  **[#51881] Windows CLI 0.160.0 只读模式初始化失败**：新报告。调用内置 CLI 时因 Access denied (os error 5) 无法初始化 in-process app-server，阻碍了程序化调用。[链接](https://github.com/openai/codex/issues/51881)
10. **[#51880] macOS Dot 无法读取原始本地 Codex 任务**：升级至 26.1002.52244 后，Dot 通过官方入口无法读取已存在的本地会话，提示不支持的放置格式版本。[链接](https://github.com/openai/codex/issues/51880)

### 4. 重要 PR 进展
1.  **[#51884] 添加继承父级上下文的实验性预测分支**：支持 `experimentalPredictionMode`，优化 Prompt Cache 复用，提升多分支推理效率。[链接](https://github.com/openai/codex/pull/51884)
2.  **[#51872] 保持全局 app-server 配置独立于启动目录**：修复全局请求继承项目配置导致的潜在泄露或重载失败问题，增强配置隔离安全性。[链接](https://github.com/openai/codex/pull/51872)
3.  **[#51843] 在命令和文件系统操作前运行沙箱完整性检查**：将完整性检查嵌入本地命令准备和 FS 操作，是应对今日沙箱故障的重要防御性代码。[链接](https://github.com/openai/codex/pull/51843)
4.  **[#51841] 为沙箱完整性添加 macOS Seatbelt 后端**：在 exec-server 中启用 macOS Seatbelt 后端，将 Codex 可执行文件和系统 Seatbelt 列为关键依赖进行库存管理。[链接](https://github.com/openai/codex/pull/51841)
5.  **[#51840] 为沙箱完整性检查添加 bubblewrap 后端**：针对 Linux 平台，库存捆绑和系统 `bwrap` 候选项及 deny-glob 扫描器，完善跨平台沙箱校验。[链接](https://github.com/openai/codex/pull/51840)
6.  **[#51856] 并行构建 Bazel 和 Cargo 发布产物**：为 Linux/macOS/Windows 添加双构建矩阵，发布带 `-bazel` 后缀的 Bazel 二进制包，丰富构建系统选项。[链接](https://github.com/openai/codex/pull/51856)
7.  **[#51835] 默认启用代码模式中断**：将 `code_mode_interrupt` 标记为稳定并默认开启，允许中断活跃的代码模式单元和嵌套工具调用。[链接](https://github.com/openai/codex/pull/51835)
8.  **[#51828] 添加基于策略的文件内容完整性检查**：导出 `FileContentsChecker`，识别在准备的文件系统策略下可写的包含依赖文件，增强安全审计能力。[链接](https://github.com/openai/codex/pull/51828)
9.  **[#51866] 在多行异步问题中保留换行符和链接**：修复终端渲染问题，单独包装和标注异步问题标题的每个逻辑行，避免超链接错位。[链接](https://github.com/openai/codex/pull/51866)
10. **[#51868] 记录每个采样请求的工具注册指标**：添加 `codex.tools.registered` 直方图，统计最终工具注册数量，便于监控工具暴露状态。[链接](https://github.com/openai/codex/pull/51868)

### 5. 功能需求趋势
*   **Windows 平台稳定性与沙箱兼容性**：今日 45 个更新 Issues 中超过半数与 Windows 相关，核心集中在沙箱初始化失败（ACL 更新、node_repl 锁定）和 Computer Use 工具缺失。社区急需 Windows 环境的稳定运行。
*   **沙箱安全完整性校验**：从 PR 进展看，官方正在大力构建跨平台（Linux/macOS/Windows）的沙箱完整性检查机制，表明安全性是近期开发重心。
*   **构建系统多元化**：Bazel 构建管线的密集落地（PR #51847-51856）显示官方在支持更灵活的底层构建配置，可能为大型项目集成或定制构建提供便利。
*   **模型推理性能与上下文管理**：GPT-6.1 Sol 的延迟问题和图像负载导致的压缩循环，反映社区对长上下文稳定性和推理速度的高关注度。

### 6. 开发者关注点
*   **高痛点：Windows 沙箱“共享冲突”**：大量用户反馈更新后命令完全无法执行（`helper_unknown_error`），且排查指向 Codex 自身进程锁定了 `node_repl.exe`。这是当前阻碍 Windows 用户使用的最大障碍。
*   **高频需求：沙箱策略透明化**：用户抱怨 `exec_command` 被“策略阻止”但缺乏可操作的解释（#50884），开发者迫切需要更清晰的错误日志和权限配置指导。
*   **持续痛点：Dot 与本地会话状态同步**：多个 Issue 指出 Dot 无法读取或操作本地 Codex 会话，存在数据隔离或接口版本不匹配问题，影响混合工作流体验。
*   **UI/UX 细节：减少干扰**：关于随机问候语（#48913）和 Windows 文本模糊（#14577）的长期未决问题，显示部分用户对终端应用的视觉干扰和渲染质量仍有不满。

</details>