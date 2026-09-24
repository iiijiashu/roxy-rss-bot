# AI CLI 工具社区动态日报 2026-09-24

> 生成时间: 2026-09-24 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

### 1. 生态全景
2026年9月24日，AI CLI工具生态呈现明显的“平台化”与“多模态增强”趋势。Anthropic的Claude Code v2.1.281 重点强化企业级网关与安全隔离（Bedrock IAM、沙箱Hooks），显示其正从单兵开发工具向企业协作平台演进。OpenAI Codex v0.156.1 则通过引入 GPT-6 Sol/Luna 及扩展 API 钩子，致力于构建开放的多模态自动化生态，但在Windows桌面端稳定性上仍面临显著挑战。整体而言，MCP协议的标准化带来的兼容性痛点已成为跨工具社区的核心抱怨点，且对Windows 10/11底层文件系统兼容性的支持成为阻碍大规模企业落地的主要技术债务。

### 2. 各工具活跃度对比

| 维度 | Claude Code (Anthropic) | OpenAI Codex |
| :--- | :--- | :--- |
| **今日 Release** | **v2.1.281**<br>重点：Claude Desktop网关支持、Bedrock IAM角色、桌面端策略控制。 | **v0.156.1**<br>重点：引入 GPT-6 Sol/Luna 模型选项、优化限流切换逻辑。 |
| **热点 Issues** | 约 10 条高关注<br>焦点：VS Code扩展锁定面板、Cowork Hooks失效、MCP Schema静默丢弃、1M上下文网络重置。 | 约 10 条高关注<br>焦点：Windows桌面端消息挂起/禁用、WSL UNC路径沙箱失败、插件加载失败、远程环境激活失败。 |
| **活跃 PRs** | 5 条核心 PR<br>重点：遥测数据增强、安全引导审查器加固、Diff解析修复、AGENTS.md分页逻辑修复。 | 10 条核心 PR<br>重点：Windows沙箱凭证/目录修复、扩展API（模型钩子/工具观测）、Guardian上下文重构。 |
| **主要问题域** | IDE集成体验、MCP健壮性、长上下文一致性。 | Windows平台稳定性、多模态插件加载、远程开发支持。 |

### 3. 共同关注的功能方向

*   **MCP (Model Context Protocol) 健壮性与容错**：
    *   **Claude Code**：社区强烈要求解决 MCP 工具因 `allOf`/`if/then` Schema 导致静默丢弃的问题（#95504, #88049），目前缺乏清晰的错误日志。
    *   **Codex**：虽然今日热点未直接指向MCP，但PR #47677 涉及 MCP 资源工具描述随模型变化的能力，表明对MCP生态的支持正在深化。
    *   *共性*：两工具均处于 MCP 规范迭代期，开发者亟需更好的错误提示和兼容性测试。
*   **Windows 平台深度适配**：
    *   **Claude Code**：Cowork 模式在 Windows 上出现 Plan9 挂载失败（#95910），以及路径大小写导致的项目键分裂（#85344）。
    *   **Codex**：问题更为密集，包括 WSL UNC 路径沙箱失败（#35380）、Windows 10 目录打开错误（#47672）、GUI 消息回传阻塞（#45626）。
    *   *共性*：Windows 下的文件系统抽象、进程间通信及 WSL 集成是当前跨工具体验的短板。
*   **细粒度控制与扩展 API**：
    *   **Claude Code**：用户希望单独禁用特定 Plugin Skills（#14920）和在不同模式下控制 Hooks（#40495）。
    *   **Codex**：新增 `ModelRequestContributor` 和 `on_tool_dispatch` 等扩展 API（#47679, #47662），允许第三方更深度介入核心执行流。
    *   *共性*：从“开箱即用”向“可定制企业级工作流”转变，追求对底层模型交互和工具调用的透明控制。

### 4. 差异化定位分析

*   **Claude Code：企业级协作与安全合规**
    *   **功能侧重**：强化网关能力（Bedrock IAM）、沙箱一致性（Cowork Hooks）、安全审查（Secrets 隔离 PR #96434）。
    *   **目标用户**：中大型开发团队、企业开发者，重视数据合规、多角色协作及 IDE（VS Code/Cursor）深度融合。
    *   **技术路线**：深耕 IDE 扩展体验，通过严格的沙箱策略确保多会话并行时的数据隔离与安全。
*   **OpenAI Codex：多模态自动化与开放生态**
    *   **功能侧重**：GPT-6 系列模型接入、Browser/Computer Use 插件支持、扩展 API 丰富性（模型钩子、工具观测）。
    *   **目标用户**：个人开发者、自动化工作流构建者、远程/云端开发者，追求多模态能力（图像、浏览器操作）和远程开发场景。
    *   **技术路线**：基于 Rust 的高性能 CLI，通过开放 API 鼓励第三方扩展生态，但在桌面端 GUI 稳定性和 Windows 底层兼容性上仍处于追赶状态。

### 5. 社区热度与成熟度

*   **OpenAI Codex（快速迭代/痛点集中）**：
    *   **热度**：极高。Windows 桌面端的消息挂起、配置加载卡死等问题讨论度极高（#42215, #45626），且多为阻塞性 Bug。
    *   **成熟度**：中等。虽然模型能力强大（GPT-6），但 Windows 平台稳定性、WSL 集成及插件加载机制尚存大量底层技术债务，社区抱怨集中于“环境特异性”故障。
*   **Claude Code（稳定演进/体验优化）**：
    *   **热度**：高且分散。热点集中在 IDE 集成 UX（锁定面板）、MCP 兼容性和长上下文指令漂移等细节问题。
    *   **成熟度**：较高。核心 CLI 功能稳定，迭代重心转向企业级网关、安全策略及 IDE 体验打磨。社区对细粒度控制（Skill/Hook）的需求反映了用户已进入深度使用阶段。

### 6. 值得关注的趋势信号

1.  **Windows/WSL 集成是下一步关键战场**：两个主流工具均在 Windows 平台暴露出大量底层文件系统（UNC 路径、Plan9 挂载、OBJ_DONT_REPARSE）和进程通信问题。开发者在跨平台部署 AI 工作流时，需重点关注 WSL2 环境的稳定性，避免将生产环境完全依赖 Windows 原生 GUI 桌面端。
2.  **MCP 协议的“静默失败”风险**：随着 MCP 规范引入复杂 Schema（如 `allOf`/`if/then`），客户端缺乏容错机制导致工具静默丢失将成为常见隐患。建议开发者在集成 MCP 服务器时，自行编写 Schema 校验层，避免依赖 CLI 的默认静默丢弃行为。
3.  **从“工具”向“平台”演进**：Claude Code 的网关/IAM 能力和 Codex 的扩展 API 表明，AI CLI 正在成为可观测、可拦截、可自定义的开发者平台。企业用户在选型时，应评估工具的 API 扩展能力是否满足内部安全审计、遥测数据采集及定制工具调度的需求。
4.  **长上下文下的指令漂移**：Claude Code 关于 1M 上下文网络重置（#74544）和语言/指令漂移（#96326）的问题提示，超长上下文的稳定性不仅关乎网络层，还涉及模型对长程指令的遵循能力。在构建自动化长流程任务时，需设计“检查点”机制以重新注入关键指令，防止上下文污染。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-09-24）

## 1. 热门 Skills 排行

基于提供的 PR 数据（注：数据中“评论”字段均为 `undefined`，此处按 PR 活跃度、创建/更新日期及摘要内容热度排序，选取关注度最高的 6 个 Skills/修复项）：

1.  **skill-creator（触发器与运行时修复）**
    *   **功能**：修复 Skill 创建工具中的触发评估误报、Windows 平台 `select()` 失败以及运行时故障被错误标记为负样本的问题。
    *   **热点**：PR #1298 长期开放（2026-06 创建，9月更新），是核心工具链稳定性痛点；同时 PR #1769 指出其报告 0% 召回率的 Bug。
    *   **状态**：Open
    *   **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1769](https://github.com/anthropics/skills/pull/1769)

2.  **docx（Office 文档处理增强）**
    *   **功能**：修复 DOCX Skill 在处理带有书签文档时的 `w:id` 冲突（#541），以及 LibreOffice 超时错误报告机制（#1792）。
    *   **热点**：办公文档场景是高频使用场景，多个 PR 集中在修复底层 XML 结构解析错误，反映社区对文档生成准确性的极高要求。
    *   **状态**：Open
    *   **链接**：[PR #541](https://github.com/anthropics/skills/pull/541), [PR #1792](https://github.com/anthropics/skills/pull/1792)

3.  **mcp-builder（MCP 集成工具）**
    *   **功能**：修复 `mcp>=2.0` 版本中 `streamable_http_client` 导入变更及自定义 Header 支持问题（#1742）。
    *   **热点**：MCP 生态快速迭代导致现有 Skill 脚本失效，社区急需适配新版 SDK 以保持连接稳定性。
    *   **状态**：Open
    *   **链接**：[PR #1742](https://github.com/anthropics/skills/pull/1742)

4.  **testing-patterns（测试模式）**
    *   **功能**：新增涵盖测试哲学、单元测试、React 组件测试的全栈测试指导 Skill。
    *   **热点**：PR #723 开放已久（2026-03 创建，9月更新），体现社区对标准化测试工作流的强烈需求。
    *   **状态**：Open
    *   **链接**：[PR #723](https://github.com/anthropics/skills/pull/723)

5.  **pdf（文件引用修复）**
    *   **功能**：修复 `SKILL.md` 中 8 处大小写敏感的文件引用错误（如 `REFERENCE.md` -> `reference.md`）。
    *   **热点**：基础文档 Skill 的健壮性问题，PR #538 开放时间长（2026-03 至 04 月），虽为小修但影响跨平台兼容性。
    *   **状态**：Open
    *   **链接**：[PR #538](https://github.com/anthropics/skills/pull/538)

6.  **claude-api（上下文窗口优化）**
    *   **功能**：解决该 Skill 单次工具调用注入约 156k tokens 导致上下文窗口耗尽的问题。
    *   **热点**：Issue #1487 指出这是当前版本的主要性能瓶颈，直接影响用户体验。
    *   **状态**：Issue Open（对应 PR 未在 Top 20 中明确展示，但关联度高）
    *   **链接**：[Issue #1487](https://github.com/anthropics/skills/issues/1487)

## 2. 社区需求趋势

从 Issues 中提炼出的主要期待方向：

*   **安全与信任边界**：社区对 Skills 命名空间滥用导致的安全风险高度敏感。Issue #492（43条评论，最高热度）指出社区 Skill 使用 `anthropic/` 命名空间冒充官方 Skill，存在权限提权风险，急需官方治理规范。
*   **组织级协作与共享**：Issue #228（8个👍）强烈呼吁在 Claude.ai 中实现组织范围内的 Skill 直接共享，避免手动下载 `.skill` 文件再上传的低效流程。
*   **质量与评估工具**：Issue #556 和 #1390 集中暴露了现有评估脚本（`run_eval.py`, `evaluation.py`）的严重缺陷（0% 触发率、0/N 评分），社区期待可靠的 Skill 质量与安全分析工具（参见 PR #83 提议的 analyzer）。
*   **特定领域工作流**：
    *   **Web3/区块链**：PR #1771 引入智能合约审计 Skill。
    *   **HPC/高性能计算**：PR #1615 引入 SCNet 集群操作 Skill。
    *   **记忆管理**：Issue #1329 提议 `compact-memory` Skill，用于优化长程 Agent 的状态记忆压缩。

## 3. 高潜力待合并 Skills

以下 PR 近期活跃且解决了实际痛点，合并可能性较高：

*   **mcp-builder (PR #1742)**：修复了 MCP 2.0 的兼容性硬伤，属于必须的基础设施修复，更新频繁（9月8日创建，19日更新）。
*   **docx 系列修复 (PR #1790, #1792)**：TINGyu123644 在 9月19日密集提交的两个修复，解决了 LibreOffice 超时误报和缺失 `.rels` 文件的问题，针对性强，易于验证。
*   **skill-creator 触发器修复 (PR #1769)**：修复了报告 0% 召回率的致命 Bug（Fixes #1721），直接影响 Skill 创建的核心体验，更新迅速（9月14-15日）。
*   **proofcore-contract-auditor (PR #1771)**：虽然较新（9月15日），但目标明确（Web3 审计），若社区对 Web3 领域有需求，可能快速通过审查。

## 4. Skills 生态洞察

**当前社区最集中的诉求是建立可靠的 Skill 评估体系（解决 0% 触发率/评分失效）以及强化命名空间安全治理（防止社区 Skill 冒充官方以规避信任边界漏洞）。**

---

# Claude Code 社区动态日报

**日期**: 2026-09-24
**数据来源**: [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. 今日速览

*   **版本迭代**：v2.1.281 发布，主要增强了 Claude Desktop 网关对 Bedrock 上游的 IAM 角色支持及桌面端策略控制。
*   **社区痛点**：VS Code 扩展导致的“锁定面板”问题（#20324）持续发酵，成为当前讨论度最高的 Bug；同时，Cowork 模式下 Hooks 失效（#40495）引发了关于沙箱一致性的担忧。
*   **开发动向**：官方团队正在修复 MCP 工具因 Schema 兼容性问题被静默丢弃的缺陷，并优化 Telemetry 数据以包含引擎版本信息。

## 2. 版本发布

**v2.1.281**
*   **网关增强**：在 `desktop` 策略块中新增了对新版 Claude Desktop 密钥的网关支持，包括 `blockReadsOutsideWorkingDirectories`（阻止读取工作目录外文件）和 `disableBypassPermissionsMode`（禁用权限绕过模式）。
*   **Bedrock IAM 支持**：为 Claude apps gateway 的 Bedrock 上游添加了 `assume_role` 功能，允许网关通过 IAM 角色调用 Bedrock，提升了企业级权限管理的灵活性。

## 3. 社区热点 Issues

以下列出过去24小时内更新或关注度最高的 10 个 Issues：

1.  **[BUG] Claude leaves behind locked panels in VSCode** ([#20324](https://github.com/anthropics/claude-code/issues/20324))
    *   **状态**: Closed (但近期有讨论更新)
    *   **关注度**: 👍 19, 评论 24
    *   **分析**: 尽管标记为 Closed，但近期仍有高频互动。核心痛点是 VS Code/Cursor 扩展在打开新标签页时创建了“锁定”的标签组，阻碍了用户管理多个 Claude Code 会话。这是 IDE 集成中最常见的 UX 投诉之一。

2.  **[BUG] Cowork sessions ignore user hooks and managed settings** ([#40495](https://github.com/anthropics/claude-code/issues/40495))
    *   **状态**: Open
    *   **关注度**: 👍 22, 评论 22
    *   **分析**: 高热度 Bug。Cowork（协作）模式下的沙箱平台匹配错误导致用户 Hooks 和托管设置无法解析。这影响了依赖自定义 Hooks 进行安全审计或流程控制的团队用户。

3.  **[Feature Request] Add ability to disable individual Claude plugin skills** ([#14920](https://github.com/anthropics/claude-code/issues/14920))
    *   **状态**: Open
    *   **关注度**: 👍 94
    *   **分析**: 长期未解决的高赞功能请求。用户希望单独禁用特定的 Skill（如 `commit-commands:commit-push-pr`），而不是整个插件。反映了社区对细粒度控制的强烈需求。

4.  **[FEATURE] Improve the model's ability to follow instructions** ([#13689](https://github.com/anthropics/claude-code/issues/13689))
    *   **状态**: Open
    *   **关注度**: 👍 8, 评论 13
    *   **分析**: 这是一个宽泛但关键的模型能力请求。近期讨论涉及模型在长上下文中指令遵循能力的退化，尤其是指令漂移（Instruction Drift）问题。

5.  **[BUG] MCP tools silently dropped when inputSchema uses root-level allOf/if/then** ([#95504](https://github.com/anthropics/claude-code/issues/95504))
    *   **状态**: Open
    *   **关注度**: 新晋热点
    *   **分析**: 随着 MCP 2026-07-28 规范更新，使用 `allOf`/`if/then` 的根级 Schema 导致工具被静默丢弃。这是一个严重的兼容性回归，影响依赖复杂 Schema 的 MCP 服务器。

6.  **[BUG] VS Code extension: clicking chat links to binary files silently fails** ([#81227](https://github.com/anthropics/claude-code/issues/81227))
    *   **状态**: Open
    *   **关注度**: 👍 9
    *   **分析**: IDE 体验 Bug。点击指向二进制文件（PNG, PDF）的链接无反应，原因是 `showTextDocument` 拒绝了二进制文件且未处理异常。

7.  **[BUG] Replies drift into English despite CLAUDE.md rule requiring Japanese** ([#96326](https://github.com/anthropics/claude-code/issues/96326))
    *   **状态**: Open
    *   **关注度**: 新 Issue
    *   **分析**: 语言一致性 Bug。在长会话中，即使 `CLAUDE.md` 强制要求日语，模型在处理完英语工具输出后，回复会漂移回英语。反映了长上下文下的指令保持能力问题。

8.  **[BUG] 1M-context session becomes unrecoverable: ECONNRESET on large uncached requests** ([#74544](https://github.com/anthropics/claude-code/issues/74544))
    *   **状态**: Closed (Stale)
    *   **关注度**: 长期关注
    *   **分析**: 1M 上下文会话在缓存冷启动时极易触发 `ECONNRESET`，且 `/compact` 也失败。虽然标记为 Closed，但此类网络稳定性问题在大型项目中复现率高，值得持续监控。

9.  **[BUG] MCP: one non-object tool inputSchema silently drops ALL tools** ([#88049](https://github.com/anthropics/claude-code/issues/88049))
    *   **状态**: Open
    *   **关注度**: 评论 2
    *   **分析**: 容错性极差。如果 HTTP MCP 服务器中有一个工具的 `inputSchema` 顶层不是对象，CLI 会丢弃该服务器的**所有**工具，且不报错。这对调试 MCP 服务器造成极大困扰。

10. **[BUG] Cowork sessions ignore user hooks... / Cowork Plan9 mount fails** ([#95910](https://github.com/anthropics/claude-code/issues/95910))
    *   **状态**: Open
    *   **分析**: Windows 平台特有 Bug。在 Release Preview 26300.9539 中，Cowork 的 Plan9 挂载失败（errno=22），即使安装了知识库提到的修复补丁。阻碍了 Windows 用户在 Cowork 模式下的使用。

## 4. 重要 PR 进展

以下列出过去 24 小时内更新的重要 Pull Requests：

1.  **[PR] telemetry: rows carry the engine's version** ([#96487](https://github.com/anthropics/claude-code/pull/96487))
    *   **作者**: poteat
    *   **内容**: 改进遥测数据，使每行数据包含引擎版本、基础版本和构建时间。之前外部构建发送的数据缺少版本信息，此 PR 通过 `$.session.version()` 解决该问题，有助于更精确地追踪不同构建的行为。

2.  **[PR] security-guidance: keep denied and secret files out of the reviewer's reach** ([#96434](https://github.com/anthropics/claude-code/pull/96434))
    *   **作者**: claude[bot]
    *   **内容**: 修复安全引导审查器（Security Guidance Reviewer）可能将被禁止读取的文件（如 `secrets.yaml`）注入模型上下文的风险。通过限制 `git diff` 和 `git show` 组装提示词的范围，防止敏感信息泄露。

3.  **[PR] diff: pass --no-color so forced git colors do not empty the diff body** ([#96363](https://github.com/anthropics/claude-code/pull/96363))
    *   **作者**: poteat
    *   **内容**: 修复当 Git 配置强制使用颜色（`color.ui=always`）时，Diff 模块因 ANSI 转义符导致无法匹配 hunk header 的问题。通过在调用 `git diff` 时添加 `--no-color` 参数，确保 Diff 内容正常解析。

4.  **[PR] agents-md: an auto-paginated Read of a nested AGENTS.md no longer counts as delivering it** ([#96364](https://github.com/anthropics/claude-code/pull/96364))
    *   **作者**: poteat
    *   **内容**: 修复 `AGENTS.md` 自动读取逻辑。当文件超过 Token 上限并被分页读取时，之前的逻辑错误地认为该文件已被“交付”，导致后续读取不再附带该文件。此 PR 确保分页读取后，系统仍能正确追踪文件状态。

5.  **[PR] docs: align code-review README with the current validation-based command** ([#79150](https://github.com/anthropics/claude-code/pull/79150))
    *   **作者**: Codeturion
    *   **内容**: 更新 `code-review` 的 README 文档，使其与当前基于验证的命令行为一致。移除了已废弃的置信度评分系统描述，避免了用户配置错误的风险。

*(注：提供的 PR 列表中共 5 条，已全部列出)*

## 5. 功能需求趋势

基于今日更新的 Issues 和 PRs，社区关注点主要集中在以下方向：

*   **MCP (Model Context Protocol) 健壮性**：
    *   多个 Issue (#95504, #88049) 指出 MCP 工具在 Schema 不严格符合预期时会被静默丢弃或导致整个服务器失效。社区强烈要求增强 MCP 客户端的容错能力和错误提示。
*   **IDE 集成体验优化**：
    *   VS Code/Cursor 扩展存在多个 UX 痛点，包括标签页锁定 (#20324)、二进制文件链接失效 (#81227)。开发者希望扩展行为更符合 IDE 原生习惯。
*   **细粒度配置与控制**：
    *   用户希望更精细地控制 Plugin Skills (#14920) 和 Hooks 在不同模式（如 Cowork）下的行为 (#40495)。
*   **多语言与长上下文一致性**：
    *   随着模型支持多语言和 1M 上下文，指令漂移和语言不一致问题 (#96326) 成为新的痛点。

## 6. 开发者关注点

*   **稳定性回归**：多个 Closed/Stale 的 Bug (#74544, #79664) 再次被提及或更新，暗示部分旧问题在新版本中可能重现或未彻底解决，尤其是网络连接和上下文压缩相关。
*   **安全与隐私**：PR #96434 显示官方正在主动收紧安全边界，防止敏感文件进入模型上下文。同时，企业用户关注 IAM 角色支持 (#v2.1.281) 以满足合规要求。
*   **调试透明度**：MCP 工具的“静默失败” (Silent Drop) 是开发者最大的痛点之一。缺乏明确的错误日志使得排查 MCP 集成问题极其困难，这是当前社区抱怨最多的问题之一。
*   **Windows 平台适配**：Cowork 在 Windows 上的挂载失败 (#95910) 和路径大小写导致的项目键分裂 (#85344) 表明 Windows 支持仍在完善中，企业用户需注意版本兼容性。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-09-24)

### 1. 今日速览
过去24小时内，Codex 社区主要关注点集中在 **Windows 桌面端稳定性** 与 **模型支持更新**。
官方发布了 **v0.156.1** 版本，正式在模型选择器中引入 **GPT-6 Sol** 和 **GPT-6 Luna**，并优化了限流提示逻辑。
社区方面，Windows 桌面应用（Desktop App）出现的消息发送阻塞、Sandbox 配置失败及插件加载失败等 bug 是当前最热的讨论焦点，尤其是涉及 WSL 路径和 GUI 消息回传的问题。

### 2. 版本发布

#### 🚀 Codex Rust CLI v0.156.1
*   **核心更新**：在模型选择器（Model Picker）中新增 **GPT-6 Sol** 和 **GPT-6 Luna** 选项。
*   **限流策略**：当触发限流（Rate-limit）切换提示时，系统现在推荐用户切换至 **GPT-6 Luna**。
*   **关联 PR**：#47405
*   **链接**: [Release v0.156.1](https://github.com/openai/codex/releases/tag/rust-v0.156.1)

*(注：同期还有 v0.158.0-alpha.6 等预发布版本，主要面向开发测试)*

### 3. 社区热点 Issues
*筛选依据：评论热度、问题严重性（阻塞性 bug）及涉及用户群体规模。*

1.  **[Windows] 项目上下文同步失败**
    *   **现象**：在现有的 ChatGPT Project 中无法启动本地 Work 聊天，文件系统阶段同步反复失败。
    *   **热度**：38 条评论，社区反应强烈，多位用户复现。
    *   **链接**: [#42215](https://github.com/openai/codex/issues/42215)

2.  **[Windows] 消息发送功能失效**
    *   **现象**：Windows 桌面端 `26.908.70816` 版本中，第一轮对话完成后，后续消息发送按钮变灰，无法继续对话（CLI 正常）。
    *   **热度**：30 条评论，高票（👍 5），严重影响桌面端核心交互。
    *   **链接**: [#45626](https://github.com/openai/codex/issues/45626)

3.  **[Windows] 本地配置加载卡死**
    *   **现象**：Desktop App 在发送消息时无限阻塞于 `loading-local-config`，需重新加载主窗口才能恢复，且重启后可能复发。
    *   **热度**：18 条评论，👍 6。
    *   **链接**: [#44342](https://github.com/openai/codex/issues/44342)

4.  **[Windows] App Server 异常终止**
    *   **现象**：在执行本地 shell 命令过程中，app-server 进程被 `STATUS_CONTROL_C_EXIT` 杀死，导致会话中断。
    *   **热度**：13 条评论，涉及底层进程稳定性。
    *   **链接**: [#40231](https://github.com/openai/codex/issues/40231)

5.  **[Windows] 内置插件加载失败**
    *   **现象**：`26.915.4065.0` 版本无法加载 openai-bundled 插件，导致 Browser Use、Computer Use 和 Image Gen 功能不可用。
    *   **热度**：6 条评论，影响高阶 AI 功能可用性。
    *   **链接**: [#46744](https://github.com/openai/codex/issues/46744)

6.  **[VS Code] 远程环境激活失败**
    *   **现象**：Codex 无法在 VS Code Server / serve-web 环境中激活，因为依赖的 Codex Audio 扩展仅支持桌面端。
    *   **热度**：5 条评论，👍 9，远程开发场景受阻。
    *   **链接**: [#47357](https://github.com/openai/codex/issues/47357)

7.  **[Windows] WSL UNC 路径沙箱失败**
    *   **现象**：当工作区根目录为 `\\wsl.localhost\...` 路径时，沙箱准备阶段失败，无法执行命令。
    *   **热度**：7 条评论，👍 2，涉及常见 WSL 开发场景。
    *   **链接**: [#35380](https://github.com/openai/codex/issues/35380)

8.  **[CLI] 会话元数据刷新 Bug**
    *   **现象**：刷新会话元数据可能恢复已被撤销（revert）的消息，导致状态不一致。
    *   **热度**：5 条评论，涉及 CLI 状态管理逻辑。
    *   **链接**: [#47056](https://github.com/openai/codex/issues/47056)

9.  **[Windows] 后续消息无限挂起**
    *   **现象**：与 #45626 类似，但用户报告干净重装仅能临时修复，问题具有持久性。
    *   **热度**：5 条评论，👍 2。
    *   **链接**: [#46299](https://github.com/openai/codex/issues/46299)

10. **[Windows] Computer Use 附件失败**
    *   **现象**：Windows 10 下 Computer Use 功能报错 `SetIsBorderRequired 0x80004002`，Appshots 无法附加窗口。
    *   **热度**：3 条评论，自动化操作功能受阻。
    *   **链接**: [#47699](https://github.com/openai/codex/issues/47699)

### 4. 重要 PR 进展
*筛选依据：涉及核心架构、Windows 兼容性修复及扩展 API 的重要合并/待合并 PR。*

1.  **修复 Windows 沙箱凭证验证**
    *   **内容**：在配置过程中检测被 Windows 拒绝存储的账户密码，防止运行时登录失败。
    *   **链接**: [#47695](https://github.com/openai/codex/pull/47695)

2.  **修复 Windows 10 目录打开错误**
    *   **内容**：解决 Windows 10 拒绝 `OBJ_DONT_REPARSE` 标志导致本地路径无法打开的问题，通过 `QueryDosDeviceW` 解析驱动别名。
    *   **链接**: [#47672](https://github.com/openai/codex/pull/47672)

3.  **改进 Windows 沙箱错误提示**
    *   **内容**：区分所有者不匹配、Codex home 不匹配及正在移除等不同错误状态，提供清晰的错误信息以便用户重试。
    *   **链接**: [#47673](https://github.com/openai/codex/pull/47673)

4.  **扩展 API：模型请求钩子**
    *   **内容**：新增 `ModelRequestContributor` 和 `ModelResponseInterceptor`，允许扩展添加客户端元数据或拦截特定请求。
    *   **链接**: [#47679](https://github.com/openai/codex/pull/47679)

5.  **扩展 API：工具调度观测**
    *   **内容**：暴露 `on_tool_dispatch` 和 `on_tool_timing` 观察点，使扩展能监控被拒绝的调用及取消时的计时信息。
    *   **链接**: [#47662](https://github.com/openai/codex/pull/47662)

6.  **Guardian 上下文捕获重构**
    *   **内容**：移除过时的 session-level 捕获模式，默认使用 thread-owned 保留上下文，简化历史管理和审批新鲜度检查。
    *   **链接**: [#47690](https://github.com/openai/codex/pull/47690)

7.  **Executor 能力发现 V2**
    *   **内容**：定义 `capabilities/discoverV2` 请求类型，并在服务器启动时预热插件和技能位置。
    *   **链接**: [#47683](https://github.com/openai/codex/pull/47683)

8.  **修复 Mermaid 流程图渲染**
    *   **内容**：支持带引号的标签（如 `A["Review & confirm"]`）及字符 `&`，避免回退到源码显示。
    *   **链接**: [#47678](https://github.com/openai/codex/pull/47678)

9.  **保留早期执行输出**
    *   **内容**：修复在流式订阅者附加之前产生的执行输出在完成事件中丢失的问题，直接在 `UnifiedExecProcess` 中记录转录。
    *   **链接**: [#47665](https://github.com/openai/codex/pull/47665)

10. **CI 优化：DotSlash 安装重试**
    *   **内容**：在 CI 环境中配置 `curl` 重试策略，提高 DotSlash 安装的稳定性。
    *   **链接**: [#47693](https://github.com/openai/codex/pull/47693)

### 5. 功能需求趋势
从最新 Issues 和 PR 中提炼出的社区关注方向：

*   **Windows 平台深度适配**：大量 Issue 集中在 Windows 特有场景（UNC/WSL 路径、Sandbox 权限、GUI 消息回传）。开发者正在通过 PR 密集修复 Windows 10/11 下的底层文件系统和进程通信问题。
*   **远程/云端开发支持**：VS Code Server/Remote 场景下的激活失败（#47357）表明用户对无桌面环境下的 CLI/Extension 兼容性有强烈需求。
*   **模型切换灵活性**：v0.156.1 引入 GPT-6 系列后，社区关注限流时的模型自动切换逻辑，以及 MCP 资源工具描述随模型变化的能力（PR #47677）。
*   **扩展生态增强**：近期 PR 重点在于丰富 Extension API（模型钩子、工具观测），旨在让第三方扩展能更深度地介入 Codex 的核心执行流。

### 6. 开发者关注点
*   **Windows 桌面端稳定性痛点**：
    *   高频出现的 "Send button disabled"（发送按钮禁用）和 "Message hang"（消息挂起）问题严重阻碍了日常使用（#45626, #46299, #43460）。
    *   WSL 用户无法使用 Codex 执行命令（#35380），这是一个常见的现代开发环境配置。
*   **配置与状态管理复杂性**：
    *   `~/.codex/config.toml` 既作为用户配置又作为运行时状态存储，导致文件膨胀且难以维护，社区建议分离用户配置与生成状态（#45627）。
    *   Desktop 设置中出现的 `unrecognized features` 警告（#47043）增加了调试难度。
*   **自动化与多模态功能受阻**：
    *   Browser Use 和 Computer Use 在 Windows 下的插件加载失败（#46744）和附件错误（#47699）使得多模态自动化功能在 Windows 平台上基本不可用。
*   **CLI 交互体验细节**：
    *   对于 TUI/CLI，用户希望自定义时间戳显示格式（12/24小时制）或隐藏时间戳（#47676），以及修复粘贴文本时的错误提示（#36003）。

</details>