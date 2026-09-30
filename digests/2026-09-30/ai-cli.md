# AI CLI 工具社区动态日报 2026-09-30

> 生成时间: 2026-09-30 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

基于 2026-09-30 Claude Code 与 OpenAI Codex 的社区动态数据，以下是横向对比分析报告：

### 1. 生态全景
当前 AI CLI 工具生态已从单纯的代码生成竞争进入**企业级稳定性**与**扩展架构安全**的深度博弈阶段。两大头部工具均将重心转向解决平台特异性（Windows/WSL/虚拟化）的稳定性痛点，如进程残留、死锁及指令集兼容性。同时，安全合规成为核心主线，Claude Code 正通过 `sec-default` 机制强化组织级权限隔离，而 Codex 则在优化 MCP 凭证存储与安全遥测。尽管两者都在推进桌面端与多端融合，但社区对“无干扰”、“高效率”终端体验的要求正在倒逼产品剥离冗余 UI 元素（如 Codex 移除问候语）。

### 2. 各工具活跃度对比

| 维度 | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **版本动态** | **v2.1.285**：新增桌面端集成命令、Web 获取控制环境变量及插件配置功能。 | **rust-v0.159.2**：修复 Windows 控制台闪烁；**0.160/0.161 Alpha**：引入即时中断机制。 |
| **Issues 热度** | **高活跃度**：热点 Issue 包括多账号管理（841 赞）、扩展架构路线图（225 评论）及 Windows MSIX 死锁。 | **高活跃度**：热点 Issue 包括 Windows 终端闪烁（138 赞）、守护进程权限错误及 TUI 问候语移除争议。 |
| **PR 侧重点** | **安全与扩展**：密集更新 `sec-default` 防止插件越权，完善 Mod 系统声明结构及 CI 安全加固。 | **平台修复与模型**：集中修复 Windows 路径编码与权限问题，更新 GPT-6.1 Sol 默认模型目录及 MCP OAuth 遥测。 |
| **典型数据点** | Issue #18435（多账号）获 841 赞；PR #98080 关闭了安全策略绕过漏洞。 | Issue #48074（Win闪烁）获 138 赞；PR #49395 迅速响应社区意见移除了 TUI 问候语。 |

### 3. 共同关注的功能方向

*   **Windows 平台稳定性**：
    *   **Claude Code**：社区强烈关注 MSIX 更新导致的进程残留死锁（#89599）及原生二进制在虚拟机中的 CPU 指令集兼容性问题（#95566）。
    *   **Codex**：核心痛点在于控制台窗口闪烁（#48074）、守护进程权限报错（#48043）及冷启动死锁（#48466）。
    *   *共同诉求*：开发团队需提供更健壮的 Windows 异常处理、进程生命周期管理及预检机制。
*   **成本与用量透明度**：
    *   **Claude Code**：存在 `/usage` 统计逻辑错误导致成本虚高（#91775），以及 Artifact 工具预加载大量 Schema 浪费 Token（#91395）。
    *   **Codex**：新旧用量界面数据不一致导致信任危机（#49322），且对长任务提前终止缺乏上下文延续能力（#49390）。
    *   *共同诉求*：开发者亟需精准的 Token 计费审计工具及透明的执行状态反馈。
*   **多端融合与会话持久化**：
    *   **Claude Code**：推动 CLI 与 Desktop 界限打通（新增 `--desktop` 命令），解决 Chrome 扩展重启后登录状态丢失问题（#97344）。
    *   **Codex**：关注 WSL2 环境下的沙箱互通及多智能体（Multi-Agent V2）在云端目录的映射。
    *   *共同诉求*：实现跨终端（CLI/IDE/Browser/Cloud）的无缝会话恢复与状态同步。

### 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **技术路线** | **扩展性优先 (Mods/Plugins)**：正快速迭代 Hooks 与 Modules 架构，旨在实现 10 倍扩展能力，支持细粒度控制与状态持久化。 | **模型与平台整合优先**：重点在于 GPT-6.1 Sol 的多端目录同步、Bedrock 多智能体支持及 `instant_interrupt` 即时中断机制。 |
| **企业管控** | **强隔离导向**：通过 `sec-default` 和 `allowManagedModsOnly` 实现组织级策略强制优先，严防用户插件绕过安全规则。 | **凭证与遥测导向**：聚焦 MCP OAuth 凭证的安全存储、脱敏及无凭证值的遥测数据收集，侧重数据合规。 |
| **目标用户** | 深度定制开发者、大型组织（需严格安全策略）及高扩展性需求团队。 | 追求稳定开发体验的 Windows/WSL 用户、依赖 Bedrock 云原生环境的团队及注重 UI 极简主义的用户。 |
| **UI 哲学** | 允许更丰富的配置交互（如插件配置命令），但近期 PR 趋向于将非必要日志移至 Debug 层级以保持界面整洁。 | 极致极简，主动移除任何“非任务相关”的 UI 干扰（如随机问候语），强调“无干扰、高效率”。 |

### 5. 社区热度与成熟度

*   **OpenAI Codex** 处于**快速迭代与修补阶段**：社区对 Windows 平台的稳定性问题（闪烁、死锁、权限）极度敏感，且开发团队响应迅速（如移除问候语、回退修复补丁），显示出其在处理平台特异性 Bug 上的高频迭代能力。其 TUI 体验正在向“极简”收敛，成熟度较高但在 Windows 端仍存痛点。
*   **Claude Code** 处于**架构演进与生态扩张阶段**：社区热度集中在“未来路线图”（如扩展架构 #91870）和“企业级痛点”（多账号 #18435）。其 Mod 系统尚不完善，导致大量关于权限覆盖、上下文膨胀（#91395）和垃圾回收（#91680）的问题，表明其正处于从“代码助手”向“可编程开发平台”过渡的阵痛期，社区对其长期可靠性持观望态度。

### 6. 值得关注的趋势信号

1.  **“安全默认值”成为企业级 CLI 的准入门票**：Claude Code 的 `sec-default` 更新和 Codex 的凭证脱敏遥测表明，AI CLI 正从“开发者工具”演变为“受管企业资产”。未来工具必须提供强制性的组织策略覆盖机制，否则难以进入大型工程团队的技术栈。
2.  **Windows 与虚拟化环境的“一等公民”化**：两大工具均在密集修复 Windows/WSL/VM 问题，反映出市场重心已从纯 Linux/macOS 开发者群体扩展至主流企业办公环境。缺乏对 x86 指令集差异和 Windows 进程机制的兼容性处理，将直接阻断用户转化。
3.  **上下文效率与“懒加载”成为性能竞争新焦点**：随着内置工具（Artifact）和系统提示词体积膨胀，社区开始要求像操作系统管理内存一样管理上下文（Lazy Loading, Allowlist-based selection）。开发者将更倾向于选择那些能精细控制 Token 开销的工具，以应对长任务成本压力。
4.  **“去娱乐化”的终端体验回归**：Codex 迅速移除 TUI 问候语的信号表明，专业开发工具正在剥离所有“拟人化”或“营销性”的 UI 元素。未来竞争将集中在纯粹的响应速度、状态透明度和零干扰交互上，“无聊但可靠”将成为最高级的用户体验指标。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills 社区热点报告（数据截止 2026-09-30）

以下分析基于 anthropics/skills 官方仓库公开数据，聚焦当前最受社区关注的 Skills 动态。

### 1. 热门 Skills 排行

由于源数据中“按评论数排序”的 50 条热门 PR 的评论字段均显示为 undefined，且未提供点赞数据，本报告基于 Issues 区明确的评论/点赞数（如 Issue #492 有 43 条评论、2 个 👍；Issue #228 有 16 条评论、8 个 👍 等）及 PR 的更新活跃度进行综合研判。

| 排名 | 关注对象 | 功能简述 | 社区讨论热点 | 当前状态 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 社区信任边界问题 | 针对社区 Skills 滥用 `anthropic/` 命名空间的官方安全机制 | 讨论热度最高（43条评论），涉及权限提升和供应链安全风险，持续活跃。 | Open (Issue) |
| 2 | org-wide skill sharing | 企业/组织内部 Skills 的直接共享功能 | 实用性强（16条评论，8个👍），解决通过 Slack/Teams 手动传递 .skill 文件的痛点。 | Open (Issue) |
| 3 | `skill-creator` 相关修复 | 隔离 trigger 评测、修复 Windows 兼容性及直接运行打包脚本的报错 | 长期未解决的底层工具链缺陷（关联 PR #1298, #1681, #1383），影响评测准确度。 | Open (PR/Issue) |
| 4 | `document-typography` | 避免 AI 生成文档的排版错误（孤行、孤儿段、编号错位） | 解决基础文字输出质量痛点，更新活跃（PR #514），对高频文档输出场景价值大。 | Open (PR) |
| 5 | `docx` 格式修复 | 修复 `accept_changes.py` 的 LibreOffice 超时报错与 tracked change ID 冲突 | 解决文档腐化与假成功问题（PR #1792, #541），是办公自动化核心痛点。 | Open (PR) |
| 6 | `mcp-builder` 适配 | 支持 `mcp>=2` 版本的 `streamable_http_client` 及自定义请求头 | 紧跟官方包版本更迭（PR #1742），关联评测失效问题（Issue #1390），时效性强。 | Open (PR/Issue) |
| 7 | `claude-api` 优化 | 修复已下线模型 ID 标识，解决单次调用注入 156k tokens 导致上下文耗尽 | 性能与准确性双杀（PR #1607, Issue #1487），直接影响实际开发体验。 | Open (PR/Issue) |

### 2. 社区需求趋势

从 Issues 的反馈和讨论中，可以提炼出社区当前最期待以下方向的新 Skill 或能力：
*   **组织级协作与共享**：打破本地 .skill 文件的物理隔离，实现团队内 Skills 资产库的直接调用与统一管理（参考 Issue #228）。
*   **安全与审计（Meta-Skills）**：针对 Skill 本身的质量评估、安全分析以及 Agent 治理模式（如策略执行、信任评分），社区有明确的定制化提案（参考 Issue #412, PR #83）。
*   **底层状态与内存管理**：为长时间运行的 Agent 提供结构化的紧凑记忆（如符号化状态表示），以减少冗余自然语言对 Context 窗口的消耗（参考 Issue #1329）。

### 3. 高潜力待合并 Skills

以下 Skills 虽处于 Open 状态，但具备成熟的 PR 描述、详细的测试用例或解决了阻塞性 Bug，近期落地概率较高：
*   **`mcp-builder` 兼容性修复**（PR #1742）：解决了 MCP 库 2.0 版本 API 更迭导致的调用失败问题，关联多个评测 Bug 修复，且由核心维护者高频提交。
*   **`docx` 核心脚本健壮性升级**（PR #1792, #541）：彻底排查并修复了 LibreOffice 解析超时的假成功现象及修订标记导致的文件损坏，极大提升了文档类任务的可靠性。
*   **`claude-api` 模型状态同步**（PR #1607）：精准标记了 4 个已下线模型，直接解决了由于错误调用旧模型导致的积分浪费或连接报错，维护成本低但收益高。

### 4. Skills 生态洞察

当前社区在 Skills 层面最集中的诉求是：**从“孤立的本地功能调用”向“组织级标准化资产管理”跃迁，同时亟需强化 Skill 底层评测链路的跨平台稳定性与安全性（防御边界滥用与上下文溢出）。**

**相关参考链接：**
*   [安全信任边界问题](anthropics/skills/Issue #492) / [企业共享需求](anthropics/skills/Issue #228)
*   [Skill-评测工具修复](anthropics/skills/PR #1298, #1681, Issue #1383)
*   [文档排版与修复](anthropics/skills/PR #514, #1792, #541)
*   [MCP 构建器升级](anthropics/skills/PR #1742, Issue #1390)
*   [API 性能优化](anthropics/skills/PR #1607, Issue #1487)

---

# Claude Code 社区动态日报 (2026-09-30)

### 1. 今日速览
今日核心动态集中在扩展架构的安全加固与权限控制，PR 密集更新了 `sec-default` 模块以防止用户插件覆盖组织级安全策略；同时，v2.1.285 发布了新的 CLI 命令与环境变量以增强桌面端交互和 Web 获取控制。社区热点 Issue 主要聚焦于解决 Windows 桌面端更新导致的进程残留死锁、Subagent 压缩机制的数据丢失 Bug 以及多账号管理的高频需求。

### 2. 版本发布
**v2.1.285 更新摘要**
*   **新增环境变量**：添加 `CLAUDE_CODE_DISABLE_WEB_FETCH`，用于彻底关闭 WebFetch 工具功能。
*   **桌面端集成**：新增 `claude --desktop` 命令，支持在当前目录打开 Claude Desktop 应用，并支持通过 `--continue` 或 `--resume <id>` 恢复会话。
*   **插件管理**：新增 `claude plugin configure <plugin>` 命令以查看并配置插件。
*   链接: [v2.1.285 Release](https://github.com/anthropics/claude-code/releases)

### 3. 社区热点 Issues
*   **[Enhancement] Mods - make Claude 10x more extensible**
    *   **重要性**：定义了 Claude Code 扩展架构（Mods）的未来路线图，确认将以数周而非数月的周期发布 Function Hooks，直接决定第三方扩展生态的成熟度。
    *   **社区反应**：讨论极度活跃（225 评论，128 赞），社区对高频迭代和细粒度控制表示强烈期待。
    *   链接: [Issue #91870](https://github.com/anthropics/claude-code/issues/91870)
*   **[Feature] Add the ability to manage multiple Claude accounts**
    *   **重要性**：解决企业级和个人用户在同一 Desktop 应用内切换不同账号（如工作/个人）的痛点，避免重复登录/登出。
    *   **社区反应**：极高关注度（198 评论，841 赞），是目前点赞数最高的功能请求之一。
    *   链接: [Issue #18435](https://github.com/anthropics/claude-code/issues/18435)
*   **[Bug] Claude Code desktop app (Windows MSIX): idle stealth update quits app**
    *   **重要性**：严重的稳定性 Bug，MSIX 应用在空闲更新时会导致主进程退出但子进程残留，使得注册表项失效（0x80073D02），导致应用无法启动直至手动杀掉僵尸进程。
    *   **社区反应**：高频痛点（13 评论），多位 Windows 用户报告复现，严重影响开发环境连续性。
    *   链接: [Issue #89599](https://github.com/anthropics/claude-code/issues/89599)
*   **[Bug] Subagent compaction: the preserved segment's tail record is never written**
    *   **重要性**：核心逻辑 Bug，Subagent 自动压缩时，保留片段的末尾记录未写入 Transcript，导致上下文引用断裂且无法恢复，影响长任务代理的可靠性。
    *   **社区反应**：被标记为 `has repro`（8 评论），技术细节深，涉及底层数据持久化。
    *   链接: [Issue #97665](https://github.com/anthropics/claude-code/issues/97665)
*   **[Bug] Native binary hangs silently at 100% CPU on VMs**
    *   **重要性**：Linux 原生二进制文件在特定虚拟化环境（kvm64 CPU 模型，缺乏 SSE4/POPCNT）下会死锁并占满 CPU，阻碍了在无特定指令集虚拟化环境下的运行。
    *   **社区反应**：复现率高（7 评论），开发者建议在安装前增加 CPU 特性预检机制。
    *   链接: [Issue #95566](https://github.com/anthropics/claude-code/issues/95566)
*   **[Bug] /usage Stats tab counts message.usage per transcript row**
    *   **重要性**：成本统计 Bug，`/usage` 命令对 Token 计费的计算逻辑错误（按行而非 ID 统计），导致显示成本虚高约 2 倍，误导用户预算管理。
    *   **社区反应**：影响计费准确性（5 评论），对于按量付费用户至关重要。
    *   链接: [Issue #91775](https://github.com/anthropics/claude-code/issues/91775)
*   **[Bug] Claude in Chrome: sign-in is lost on every full Chrome restart**
    *   **重要性**：破坏无人值守自动化流程，Chrome 扩展在浏览器完全重启后登录状态丢失，导致自动化任务频繁中断。
    *   **社区反应**：自动化场景关键障碍（2 评论），目前缺乏有效的会话持久化机制。
    *   链接: [Issue #97344](https://github.com/anthropics/claude-code/issues/97344)
*   **[Bug] Artifact tool loads ~12k tokens of schema into every session**
    *   **重要性**：严重的性能/成本开销，内置 Artifact 工具在 claude.ai 后端会话中默认预加载约 12k tokens 的 schema，且无法关闭，浪费大量上下文窗口。
    *   **社区反应**：性能敏感用户抱怨（4 评论），缺乏针对未使用工具的动态加载机制。
    *   链接: [Issue #91395](https://github.com/anthropics/claude-code/issues/91395)
*   **[Bug] Cowork sandbox: /sessions never garbage-collected**
    *   **重要性**：资源管理严重缺陷，四个小时内产生的 1,634 个目录未清理导致磁盘填满，进而导致计划任务在 `useradd` 阶段失败。
    *   **社区反应**：长周期运行系统的致命隐患（1 评论），需要引入垃圾回收机制。
    *   链接: [Issue #91680](https://github.com/anthropics/claude-code/issues/91680)
*   **[Enhancement] Allowlist-based tool selection to cap context overhead**
    *   **重要性**：针对内置工具日益增多导致的上下文膨胀问题，提议通过白名单选择工具，作为限制上下文开销的根本解决方案。
    *   **社区反应**：呼应了 #91395 等性能问题（2 评论），开发者倾向于通过配置文件控制工具可见性。
    *   链接: [Issue #92554](https://github.com/anthropics/claude-code/issues/92554)

### 4. 重要 PR 进展
*   **Security: 防止用户插件覆盖组织级 Deny 规则 (Closed)**
    *   修复了 `sec-default` 机制，确保在安全默认配置生效时，用户安装的 Mod 插件无法通过 `allow` 或 `ask` 指令绕过设置中的 `deny` 权限规则。支持组织在 managed settings 中配置此策略。
    *   链接: [PR #98080](https://github.com/anthropics/claude-code/pull/98080)
*   **Security: 新增 `allowManagedModsOnly` 选项 (Closed)**
    *   新增管理选项 `allowManagedModsOnly`，允许组织拒绝加载任何用户级别安装的 Mod（Hooks 模块），仅允许组织托管的 Mod 加载，实现扩展生态的严格管控。
    *   链接: [PR #98083](https://github.com/anthropics/claude-code/pull/98083)
*   **Mod Support: 增强 `process.run` 与文件列表声明 (Open)**
    *   更新了 Mod 的声明结构，支持包含 `isStdoutTruncated` 等进程截断标志以及文件列表的 `mtimeMs`，使扩展开发能更精细地处理系统输出和文件状态。
    *   链接: [PR #97293](https://github.com/anthropics/claude-code/pull/97293)
*   **Security Guidance: 隔离审查员可见的文件内容 (Open)**
    *   修复了安全引导（Security-guidance）审查员（Reviewer）能访问到权限规则禁止读取的机密文件（如 `secrets.yaml`）的问题，通过隔离 `git diff` 和 `git show` 组装的提示词来降低数据泄露风险。
    *   链接: [PR #96434](https://github.com/anthropics/claude-code/pull/96434)
*   **System Prompt: 优化 `sec-default` 上下文分层 (Closed)**
    *   重构了系统提示词的组装逻辑（`prompt.compose`），确保当组织部署 `sec-default` 时，个人插件不再干扰系统提示词的分层结构，保证了组织安全策略的优先级。
    *   链接: [PR #97241](https://github.com/anthropics/claude-code/pull/97241)
*   **AGENTS.md: 优化日志记录行为 (Open)**
    *   调整了 `AGENTS.md` 的加载逻辑，当项目中存在 `AGENTS.md` 而无 `CLAUDE.md` 时，将“加载成功”的信息发送至 Debug 日志而非直接显示在 Transcript 中，保持界面整洁。
    *   链接: [PR #98275](https://github.com/anthropics/claude-code/pull/98275)
*   **Conversation Context: 增强上下文保留逻辑 (Open)**
    *   通过 `session.append` 机制优化了对话保留逻辑，确保在复杂的安全层级下，会话中保持的数据行能正确延续到用户层级之外。
    *   链接: [PR #97334](https://github.com/anthropics/claude-code/pull/97334)
*   **CI Security: GitHub Actions 工作流加固 (Open)**
    *   为仓库中调用 Claude 的 GitHub Actions 工作流（如 issue 分类、去重）增加了出网防火墙限制，防止潜在的数据外泄并规范 API 访问。
    *   链接: [PR #97952](https://github.com/anthropics/claude-code/pull/97952)
*   **Diff Pane: 优化自动打开行为 (Open)**
    *   修复了 Diff 面板的触发逻辑，现在只有在存在实际文件变更列表时，首次编辑才会自动打开面板，避免了写入被忽略文件或非当前工作区文件时显示空面板的问题。
    *   链接: [PR #94847](https://github.com/anthropics/claude-code/pull/94847)
*   **Mod Support: 会话保留层测试完善 (Open)**
    *   配合 `#97334` 的更新，增加了针对会话保留机制的测试模拟，确保在引擎发布分支未包含特定事件时，测试能明确识别构建依赖。
    *   链接: [PR #97241](https://github.com/anthropics/claude-code/pull/97241)

### 5. 功能需求趋势
*   **扩展架构 (Mods/Plugins)**：最核心的发展方向。Issue #91870 和大量相关 PR 显示团队正在快速迭代 Hooks 和 Modules，旨在实现 10 倍扩展能力。重点在于细粒度控制、状态持久化及跨引擎兼容性。
*   **安全性与企业管控 (Security/Enterprise)**：近期 PR 大量涉及 `sec-default` 和 `managed settings`，趋势明确指向“组织级控制优先”，包括强制禁用未授权 Mod、严格权限隔离及审计日志。
*   **上下文效率 (Context Efficiency)**：多个 Issue（#91395, #92554）指出内置工具（如 Artifact）和系统提示词消耗了大量上下文。趋势要求实现工具的懒加载（Lazy Loading）和基于配置的动态裁剪，以提升模型长任务处理能力。
*   **多端融合与桌面化 (Desktop/IDE)**：新增 `--desktop` 命令及多账号需求（#18435）表明团队正努力打通 CLI 与 Desktop 的界限，强调会话管理的无缝切换和账号隔离。

### 6. 开发者关注点
*   **稳定性与死锁问题**：开发者对 **Windows MSIX 更新机制** 导致的僵尸进程问题（#89599）和 **Linux 虚拟化指令集兼容性问题**（#95566）非常关注，这些问题直接阻断开发流程，要求更健壮的异常处理和预检机制。
*   **数据可靠性**：**Subagent 的压缩（Compaction）机制**（#97665）出现的数据丢失是高风险痛点，开发者担心在复杂代理任务中，上下文边界的断裂会导致不可逆的逻辑错误。
*   **成本透明度**：由于 `/usage` 统计 Bug（#91775）和工具 Schema 预加载导致的 Token 浪费（#91395），开发者强烈要求提供更精准的成本估算和更灵活的工具按需加载能力。
*   **状态持久化**：无论是 Chrome 扩展登录丢失（#97344）还是 Cowork 磁盘未清理（#91680），**无状态（Stateless）导致的资源或认证失败** 是高频痛点，开发者呼吁完善本地资源的 GC 机制和认证状态的持久化。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-30**

## 1. 今日速览
今日 OpenAI Codex 重点解决了 Windows 平台上的控制台窗口闪烁及启动卡顿等核心稳定性问题，并正式发布 **rust-v0.159.2** 补丁版。同时，GPT-6.1 Sol 已确认为默认模型并完成多端目录更新，但社区对 TUI 新增的随机问候语（Greeting）反馈强烈，开发团队已迅速通过 PR 移除该功能以恢复开发者体验。

## 2. 版本发布
*   **rust-v0.159.2** ([Changelog](https://github.com/openai/codex/compare/rust-v0.159.1...rust-v0.159.2))
    *   **修复**：解决了 Codex 启动后台进程及执行沙箱命令时，Windows 控制台窗口反复闪烁的问题（[#49385](https://github.com/openai/codex/pull/49385)）。
*   **rust-v0.159.1**
    *   **新增**：将 GPT-6.1 Sol 设为捆绑目录、Amazon Bedrock Mantle 及 Runtime 目录中的默认模型（[#49323](https://github.com/openai/codex/pull/49323), [#49342](https://github.com/openai/codex/pull/49342)）。
*   **Alpha 进展**：`0.160.0-alpha` 与 `0.161.0-alpha` 持续迭代，其中 0.159.0 引入了 `instant_interrupt` 机制，允许在模型响应或代码执行中通过新输入进行转向。

## 3. 社区热点 Issues
1.  **Windows 终端窗口闪烁** ([#48074](https://github.com/openai/codex/issues/48074))
    *   **重要性**：👍138，评论 116。这是 Windows 用户最头疼的问题，严重干扰开发视线。v0.159.2 已针对性修复此问题。
2.  **Windows 守护进程权限错误** ([#48043](https://github.com/openai/codex/issues/48043))
    *   **重要性**：👍36，评论 37。0.157.0 版本后，Windows 客户端启动时出现的 daemon 权限报错，影响正常功能调用。
3.  **WSL2 沙箱命令无法启动** ([#25799](https://github.com/openai/codex/issues/25799))
    *   **重要性**：高频痛点。涉及 Linux/WSL 用户的核心工作流，Codex App 无法在 WSL2 环境中正确运行沙箱命令。
4.  **Windows 冷启动死锁/无响应** ([#48466](https://github.com/openai/codex/issues/48466))
    *   **重要性**：应用服务器（app-server）初始化存在竞态条件，导致 UI 卡在 Loading 状态，需手动重启后台进程。
5.  **移除 TUI 随机问候语** ([#48913](https://github.com/openai/codex/issues/48913), [#48991](https://github.com/openai/codex/issues/48991))
    *   **社区反应**：开发者强烈反感新会话中出现的“废话”问候语（如“Speak, friend...”）。团队已在 PR #49395 中移除了这些干扰项，回归极简 UI。
6.  **GPT-6.1 Sol 显示异常** ([#49362](https://github.com/openai/codex/issues/49362))
    *   **社区反应**：用户反映新版默认模型未正确出现在选项卡中，目前已被标记为 OPEN。
7.  **Windows 启动 Spinner 循环** ([#48946](https://github.com/openai/codex/issues/48946))
    *   **社区反应**：多个 Issue（含 #49240）反映 Windows 桌面端频繁卡在启动画面，修复和重装均无法解决握手延迟。
8.  **MCP 服务器管理 UX** ([#11765](https://github.com/openai/codex/issues/11765))
    *   **社区反应**：👍52。企业用户强烈希望能有 UI 直接管理 MCP 服务的启用状态，而非修改 `config.toml`。
9.  **多步骤任务中断** ([#49390](https://github.com/openai/codex/issues/49390))
    *   **社区反应**：Codex Desktop 在实现长任务时，容易在中间子任务完成后提前终止，缺乏有效的上下文延续能力。
10. **Codex 用量统计翻倍** ([#49322](https://github.com/openai/codex/issues/49322))
    *   **社区反应**：新旧用量界面的数据不一致，导致用户误以为剩余额度减少了一半，涉及计费信任问题。

## 4. 重要 PR 进展
1.  **[0.159] 回退 Windows 控制台修复** ([#49385](https://github.com/openai/codex/pull/49385))
    *   将控制台闪烁修复补丁应用于 0.159 分支，确保稳定版用户受益。
2.  **添加 GPT-6.1 Sol 至 Bedrock 目录** ([#49339](https://github.com/openai/codex/pull/49339))
    *   在 Amazon Bedrock Mantle 和 Runtime 目录中新增模型，并将其设为默认回退模型。
3.  **移除 TUI 会话问候语** ([#49395](https://github.com/openai/codex/pull/49395))
    *   移除启动时的随机文本和共享问候语状态，简化会话头部信息。
4.  **Bedrock 多智能体 V2 支持** ([#49345](https://github.com/openai/codex/pull/49345))
    *   启用 Amazon Bedrock 上的 Ultra 推理级别，支持声明为 V2 的模型使用多智能体。
5.  **Windows 不透明 URI 路径推断修复** ([#49388](https://github.com/openai/codex/pull/49388))
    *   修复 UTF-16LE 编码的 Windows 路径被误认为 POSIX 路径的问题，确保斜杠前缀的处理。
6.  **文件权限提升逻辑优化** ([#49353](https://github.com/openai/codex/pull/49353))
    *   允许已批准的文件系统操作进行权限提升，同时保持对未授权读取的拒绝。
7.  **Shell 调用元数据携带** ([#49360](https://github.com/openai/codex/pull/49360))
    *   通过 `ShellInvocation` 传递 shell 选择和登录模式，提升执行器 PATH 目录报告的准确性。
8.  **凭证存储结果追踪** ([#49384](https://github.com/openai/codex/pull/49384))
    *   在凭证落盘时记录结果，并在报错输出中脱敏敏感信息，区分安全存储失败与文件回退。
9.  **MCP OAuth 凭证存储遥测** ([#49392](https://github.com/openai/codex/pull/49392))
    *   为 MCP OAuth 的加载、保存、刷新等操作增加无凭证值的遥测数据，区分策略与固定存储。
10. **Hook 匹配器编译优化** ([#49379](https://github.com/openai/codex/pull/49379))
    *   在发现阶段预编译正则匹配器，避免在 Hook 派发时对每个输入重新编译，降低性能开销。

## 5. 功能需求趋势
*   **稳定性优先（Windows）**：当前最高优先级。社区对 Windows 平台的启动死锁、窗口闪烁、WSL 互通及守护进程权限问题极度敏感，要求 CLI 与 App 表现的一致性。
*   **MCP 生态深度整合**：开发者正从简单的“配置支持”转向“UI 级管理”（启用/禁用/状态监控），并开始在关注 MCP 凭证的安全存储与遥测。
*   **模型切换与多 Agent**：随着 GPT-6.1 Sol 的普及，社区正关注模型在 Bedrock 等云端的目录映射，以及对 Multi-Agent V2 的推理支持。
*   **工作流干预**：`instant_interrupt`（即时中断）功能的引入反映了开发者对长任务可控性（Steering）的需求，希望能在模型长周期执行中插入新指令。

## 6. 开发者关注点
*   **UI 干扰项**：开发者对“非任务相关”的 UI 元素（如幽默的会话问候语、随机提示）容忍度极低，追求“无干扰、高效率”的终端体验。
*   **透明度与信任**：用户在用量统计（Usage Reporting）不一致和模型行为（提前终止任务）上表现出强烈不满，希望开发工具提供更明确的执行反馈。
*   **企业级集成**：对于使用 API Key 而非 OAuth 登录的团队，支持“明确准入项目”（Cyber Access Programs）及凭证 UI 的措辞准确性（PR #49361, #49406）成为新的关注焦点。

</details>