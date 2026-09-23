# AI CLI 工具社区动态日报 2026-09-23

> 生成时间: 2026-09-23 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

### 1. 生态全景
2026年9月23日，AI CLI 工具生态正加速从“纯文本交互”向“多模态、长周期自动化及桌面级体验”演进。Claude Code 与 OpenAI Codex 均发布了包含重大交互改进（全屏 TUI、语音对话）的新版本，标志着 CLI 工具正在模糊传统命令行与桌面应用的边界。当前社区痛点高度集中于跨平台兼容性（尤其是 Windows 沙箱与虚拟环境）及长任务状态管理（上下文压缩、后台会话记录）。模型迭代速度极快，GPT-6 系列与 Claude Opus 5.5 已进入实际使用阶段，对上下文窗口和计费模型提出了新要求。生态竞争已从单纯的代码生成能力转向**工程化配置、多账户权限管理及可观测性**的深层比拼。

### 2. 各工具活跃度对比

| 工具 | 版本发布 | 今日热点 Issues | 今日重要 PR | 核心动态摘要 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.280 (Stable) | 10 条高热度 | 1 条 (AGENTS.md) | 引入 1M 上下文默认模型，优化鼠标交互；社区强烈反馈 Windows/WSL2 兼容性回归及 Worktree 管理缺陷。 |
| **OpenAI Codex** | v0.156.0 (Stable)<br>v0.157.0-alpha.9 (Pre) | 10 条高热度 | 10 条 (含模型、网络、沙箱) | 启用语音对话与全屏 TUI；密集修复 Windows 沙箱/权限问题；GPT-6 系列新模型集成进行中。 |

*注：数据基于提供的 24 小时社区动态摘要统计。Codex PR 活跃度显著高于 Claude Code，反映其处于快速修补 Windows 平台短板的迭代期。*

### 3. 共同关注的功能方向

*   **跨平台一致性（重点为 Windows）**：
    *   **Claude Code**：Windows 窗口层级无法退出、WSL2 剪贴板失效、KVM 虚拟环境 CPU 挂起。
    *   **OpenAI Codex**：Windows 沙箱初始化失败、Git 写入权限拒绝、安装助手 Access Denied。
    *   *共识*：Windows 本地环境（非 WSL）的可靠性仍是两大工具共同的工程短板，用户期待开箱即用的稳定性。
*   **长任务状态管理与可观测性**：
    *   **Claude Code**：后台 Daemon 会话丢失文本/工具记录、Monitor 工具被强制 30 分钟熔断。
    *   **OpenAI Codex**：上下文压缩永久销毁转录数据、TUI 恢复会话时计时器错误。
    *   *共识*：随着 Agent 处理更长周期的任务，用户对**数据完整性**（Transcript 保留）和**任务状态持久化**的需求激增，拒绝“黑盒”化。
*   **TUI 交互与 UI 工程化**：
    *   **Claude Code**：全屏模式鼠标滚轮支持、侧边栏分组混乱、配置文件无法持久化 UI 设置。
    *   **OpenAI Codex**：全屏 TUI 鼠标选择/Tmux 兼容性问题、动画干扰文本选择。
    *   *共识*：CLI 界面正向类 GUI 体验演进，但鼠标事件处理、终端渲染兼容性（Tmux/Kitty）及配置持久化仍是高频投诉点。
*   **多账户与权限细粒度控制**：
    *   **Claude Code**：多账户切换请求（387 👍）、沙盒访问控制。
    *   **OpenAI Codex**：企业网络代理配置、沙箱 DACL 权限隔离。
    *   *共识*：用户场景从个人开发扩展到团队协作与企业部署，身份管理和网络策略需更精细的配置项。

### 4. 差异化定位分析

| 维度 | **Claude Code** | **OpenAI Codex** |
| :--- | :--- | :--- |
| **功能侧重** | 强调**工作流整合**（Worktree 管理、`/skills`、`AGENTS.md` 指令标准化）和**多模态交互**（鼠标、语音听写）。 | 强调**底层沙箱安全**（MXC、DACL 隔离、网络策略）和**多模型路由**（GPT-6 Sol/Luna/Astra 快速迭代）。 |
| **目标用户** | 重度工程化开发者、需要管理复杂 Git Worktree 的架构师、追求 TUI 极致交互的用户。 | 企业级部署用户（需代理/合规）、需要本地高性能沙箱（MXC）的用户、关注最新模型能力的尝鲜者。 |
| **技术路线** | **标准化与扩展**：通过 `AGENTS.md` 和指令文件统一配置，侧重生态兼容性（VS Code, WSL2）。 | **隔离与安全**：通过 Windows 沙箱对象、网络策略强制执行，侧重系统级资源控制与权限最小化。 |

### 5. 社区热度与成熟度

*   **OpenAI Codex：高热度快速迭代期**。
    *   过去 24 小时 10 条重要 PR 涉及沙箱、网络、模型目录等核心底层，显示团队在积极修补 Windows 平台债务。
    *   社区 Issue 集中在“安装/初始化”阶段（#44696, #32492, #40550），表明 Windows 体验尚处于**早期成熟度**，稳定性是主要瓶颈。
    *   GPT-6 系列模型的引入（#47385）显示其模型迭代节奏快，属于**技术前沿探索阶段**。
*   **Claude Code：稳定成熟期伴随局部回归**。
    *   版本 v2.1.280 侧重交互优化与计费模型调整，整体架构稳定。
    *   热点 Issue 多为特定环境下的**回归 Bug**（WSL2 剪贴板、Windows 窗口），而非底层架构缺失，显示其**核心工作流已成熟**，正在打磨长尾兼容性。
    *   `AGENTS.md` PR 的关闭状态暗示社区对指令标准化的共识尚未完全落地，处于**规范制定与博弈阶段**。

### 6. 值得关注的趋势信号

1.  **“CLI 桌面化”不可逆，但需谨慎平衡**：
    *   两个工具均引入鼠标交互、全屏 UI 和语音对话。信号表明纯键盘驱动的 TUI 正在让位于混合交互模式。**开发者需预留 UI 状态持久化与多输入源（键鼠/语音）并发的工程空间。**
2.  **Windows 是 AI CLI 部署的“深水区”**：
    *   大量 Issue 指向沙箱、权限、文件系统语义（ENOENT）差异。信号表明**跨平台一致性已从“可选特性”变为“准入门槛”**。企业用户若部署 AI 工具，需优先评估 Windows 原生环境（非 WSL）的可靠性。
3.  **上下文压缩与数据完整性成为合规关注点**：
    *   Codex #44363（压缩销毁转录）与 Claude #65051（后台记录丢失）均指向**审计与回溯能力**。信号表明，随着 AI 执行更复杂任务，**不可变日志（Immutable Logs）和原始上下文保留**将成为未来版本的核心竞争力。
4.  **模型即服务（MaaS）的客户端侧适配加速**：
    *   GPT-6 Sol/Luna/Astra 与 Claude Opus 5.5 的 1M 上下文支持，显示客户端工具正在快速适配多模态、长窗口模型。**开发者应设计灵活的模型路由机制，而非硬编码单一模型版本。**
5.  **指令文件标准化战争**：
    *   `CLAUDE.md` vs `AGENTS.md` 的并存反映了生态碎片化。信号表明**未来将出现跨工具的指令文件事实标准**，早期采用者（如支持 `instructionFiles` 统一配置）将获得生态位优势。

**决策建议**：
*   **个人开发者**：若主要使用 Linux/macOS，Claude Code 当前体验更稳定；Windows 用户建议优先使用 WSL2 环境以规避原生沙箱 Bug。
*   **企业/团队**：关注 OpenAI Codex 的 PR #47389（网络策略）和 #47361（沙箱安全），这些特性更适合合规严格的内网环境；同时密切关注 Claude Code 的 `AGENTS.md` 进展，以便提前制定团队指令规范。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

### Claude Code Skills 社区热点报告
**数据范围**：anthropics/skills 仓库 PR 与 Issues 数据（截止 2026-09-23）

#### 1. 热门 Skills 排行
基于PR评论活跃度及社区关注度，以下 Skills 为当前社区焦点：

*   **Skill Creator (修复与优化)**
    *   **功能/热点**：聚焦于修复 `trigger evaluation` 在 Windows 下的失败问题（`select()` 进程管道错误）以及解决 `0% recall` 误报导致的描述优化逻辑失效。
    *   **状态**：[Open](https://github.com/anthropics/skills/pull/1298), [Open](https://github.com/anthropics/skills/pull/1769)
*   **MCP Builder (兼容性修复)**
    *   **功能/热点**：解决 `mcp>=2.0.0` 版本中 `streamable_http_client` 重命名及自定义 HTTP 头配置变更导致的连接脚本失效，修复评价脚本对真实 MCP Server 评分为 0/N 的序列化Bug。
    *   **状态**：[Open](https://github.com/anthropics/skills/pull/1742), [Open Issue #1390](https://github.com/anthropics/skills/issues/1390)
*   **DOCX / ODT / PDF (文档处理)**
    *   **功能/热点**：修复 OOXML 中 `w:id` 冲突导致的文档损坏、缺失的 `document.xml.rels` 生成、大写文件引用导致的 Linux/Mac 解析失败，以及新增 ODT 格式支持。
    *   **状态**：[Open](https://github.com/anthropics/skills/pull/1790), [Open](https://github.com/anthropics/skills/pull/541), [Open](https://github.com/anthropics/skills/pull/486), [Open](https://github.com/anthropics/skills/pull/538)
*   **Pyxel (Retro Game Development)**
    *   **功能/热点**：为 Python 复古游戏开发提供指导，包括无头输入驱动、帧检查和状态检查等验证工具。
    *   **状态**：[Open](https://github.com/anthropics/skills/pull/525)
*   **Testing Patterns (测试哲学与实操)**
    *   **功能/热点**：涵盖 Testing Trophy 模型、React 组件测试（Testing Library）及单元测试的 AAA 模式，强调“测什么”与“不测什么”的边界。
    *   **状态**：[Open](https://github.com/anthropics/skills/pull/723)
*   **ProofCore Contract Auditor (Web3 审计)**
    *   **功能/热点**：对 Solidity/Rust 智能合约进行静态分析，并通过零存储 Merkle 协议将审计证明锚定在 TON 区块链上。
    *   **状态**：[Open](https://github.com/anthropics/skills/pull/1771)

#### 2. 社区需求趋势
从 13 条高热度 Issues 中提炼出的核心期待方向：

*   **安全与信任边界 (High Priority)**：社区强烈关注 Skills 的安全分发问题，尤其是社区 Skills 在 `anthropic/` 命名空间下的冒名顶替风险（[Issue #492](https://github.com/anthropics/skills/issues/492)），以及企业内部 SharePoint 文档处理时的权限控制隔离（[Issue #1175](https://github.com/anthropics/skills/issues/1175)）。
*   **组织级协作与分发**：开发者希望在 Claude.ai 中实现组织范围内的 Skills 直接共享，避免通过 Slack/Teams 手动下载和上传的繁琐流程（[Issue #228](https://github.com/anthropics/skills/issues/228)）。
*   **状态管理与长任务效能**：社区期待针对长任务 Agent 的“记忆压缩”Skill（compact-memory），以符号化方式管理 Agent 状态并节省 Context Window（[Issue #1329](https://github.com/anthropics/skills/issues/1329)）。
*   **AI 行为治理 (Agent Governance)**：提出对 AI 代理系统进行策略执行、威胁检测和信任评分的治理类 Skill 需求（[Issue #412](https://github.com/anthropics/skills/issues/412)）。
*   **上下文窗口效率**：对 `claude-api` 等 Skill 在单次调用中注入约 156k tokens 导致 Context 耗尽的问题表示强烈不满，要求优化加载机制（[Issue #1487](https://github.com/anthropics/skills/issues/1487)）。

#### 3. 高潜力待合并 Skills
以下 PR 评论活跃且修复了核心痛点，具备近期落地潜力：

*   **[fix(mcp-builder): Support mcp>=2 streamable_http_client](https://github.com/anthropics/skills/pull/1742)**：解决了最新 MCP 库版本下的关键兼容性问题，直接关联 Issue #1668。
*   **[fix(skill-creator): Isolate trigger evals and handle Windows failures](https://github.com/anthropics/skills/pull/1298)**：修复了 Windows 环境下无法运行评估的逻辑，提升了 Skill 创建的跨平台稳定性。
*   **[fix(docx): Create document.xml.rels when missing](https://github.com/anthropics/skills/pull/1790)**：修复了生成带注释文档时缺失关系文件导致的解析失败。
*   **[fix(office): Decode redlining diffs as UTF-8](https://github.com/anthropics/skills/pull/1765)**：解决了非 ASCII 字符在 Windows 环境下导致 Redlining 校验失败的问题。

#### 4. Skills 生态洞察
当前社区在 Skills 层面最集中的诉求是：**在提升 Skills 功能多样性的同时，解决跨平台/多环境（Windows/Linux、MCP 版本迭代）的兼容性缺陷，并强化 Skills 分发过程中的安全信任边界与 Context 管理效率。**

---

### 今日速览
Claude Code 发布 v2.1.280，正式引入默认支持 1M 上下文的 Claude Opus 5.5 模型并优化全屏模式鼠标交互。过去 24 小时内，多平台兼容性问题（Windows 窗口层级、WSL2 剪贴板粘贴）及 Worktree 管理缺陷成为社区最迫切的修复诉求。

### 版本发布
- **[v2.1.280] 新增默认模型与交互增强**
  该版本确立了 `claude-opus-5-5` 为默认 Opus 模型，支持 1M 上下文，并明确了新的缓存读取计费标准（$0.20/Mtok）。同时，全屏模式下的 `/skills` 列表和 `/plugin` 状态选项增加了鼠标滚轮与点击支持，提升了 TUI 交互体验。
  链接: [anthropics/claude-code Release](https://github.com/anthropics/claude-code)

### 社区热点 Issues
1. **[增强] 支持在同一连接器的不同账户间切换**
   目前 Web 端仅支持单账户连接，该请求（387 👍）反映了多账户用户在 Claude.ai 和 Code 环境中切换身份的巨大痛点。
   链接: [#27302](https://github.com/anthropics/claude-code/issues/27302)
2. **[Bug] Windows 桌面应用窗口始终置顶且无退出选项**
   用户反馈在 Windows 10 下无法关闭窗口的 Always-on-Top 行为，严重影响多任务开发环境，引发 75 👍 的高度共鸣。
   链接: [#89467](https://github.com/anthropics/claude-code/issues/89467)
3. **[Bug] 2.1.269 版本在 VS Code WSL2 中导致语音听写粘贴失效**
   回退测试显示旧版正常，该 Regression 破坏了 VS Code 远程 WSL 环境下基于剪贴板的输入流，阻碍了语音驱动开发。
   链接: [#93782](https://github.com/anthropics/claude-code/issues/93782)
4. **[增强] 可配置 Worktree 目录及支持同级目录布局**
   目前 Worktree 默认路径缺乏灵活性，68 👍 开发者强烈建议增加配置选项以符合仓库管理的最佳实践。
   链接: [#27282](https://github.com/anthropics/claude-code/issues/27282)
5. **[Bug] 后台 Daemon 会话丢失混合文本与工具调用的记录**
   自 2.1.161 起，后台任务产生的 Assistant 文本块在 Transcript 中丢失，影响了对长周期自动化任务的调试与追踪。
   链接: [#65051](https://github.com/anthropics/claude-code/issues/65051)
6. **[Bug] Windows VM 共享文件夹触发 Edit/Write "ENOENT" 错误**
   当目标文件已存在时，虚拟机共享驱动器的文件系统限制导致文件操作失败，阻碍了跨平台开发。
   链接: [#73386](https://github.com/anthropics/claude-code/issues/73386)
7. **[Bug] Bash 工具在 macOS 上实际执行 Zsh 导致语义混淆**
   工具描述与实际运行的登录 Shell 不一致，导致 LLM 生成针对 Bash 的脚本时频繁报错，亟需修正工具命名与描述。
   链接: [#91498](https://github.com/anthropics/claude-code/issues/91498)
8. **[增强] 桌面端持久化显示用量限制指示器**
   用户希望在主屏幕常驻显示 Quota 剩余情况，以避免在接近上限时突然中断工作流。
   链接: [#80261](https://github.com/anthropics/claude-code/issues/80261)
9. **[Bug] Monitor 工具在 2.1.26x 版本后被强制限制在 30 分钟**
   即使设置 `persistent: true`，监控任务也会在 30 分钟时过期，破坏了长循环监听任务。
   链接: [#94553](https://github.com/anthropics/claude-code/issues/94553)
10. **[Bug] KVM64 虚拟环境下原生二进制文件 CPU 满载无响应**
    缺乏 CPU 特性预检导致在特定虚拟机（无 SSE4/POPCNT）下安装后程序直接挂起。
    链接: [#95566](https://github.com/anthropics/claude-code/issues/95566)

### 重要 PR 进展
- **[关闭] 新增 `agents-md` 模块以支持 `AGENTS.md` 指令**
  该 PR 补充了与 `CLAUDE.md` 平行的指令读取逻辑，允许通过单一选项 `instructionFiles` 统一配置指令文件的加载，目前处于关闭状态，等待后续实现或合入逻辑调整。
  链接: [#95409](https://github.com/anthropics/claude-code/pull/95409)

*(注：过去 24 小时内仅 1 条 PR 被标记为更新，其余 PR 动态较少，故仅列示该条。)*

### 功能需求趋势
1. **多账户与权限管理**：社区对支持多账户并行登录及细粒度控制（如密码输入、沙盒访问）的需求强烈，尤其是跨企业/个人场景。
2. **全局配置支持**：随着 `AGENTS.md` 的引入，开发者更倾向于在用户级（Global）配置指令和代理行为，而非仅限项目级。
3. **长任务监控可靠性**：针对后台 Daemon 会话和 Monitor 工具的持续性及记录完整性，要求消除“30分钟熔断”机制。

### 开发者关注点
- **Worktree 状态同步**：桌面端 Worktree 池分配错误（95% 的会话被分配至错误目录）及 VS Code 关闭后 Git Lock 未释放的问题，成为数据安全风险的高频焦点。
- **平台兼容性回归**：WSL2、Windows 共享文件夹及 KVM 虚拟环境下的原生二进制表现不稳定，开发者对跨平台一致性的期待高于目前的实际表现。
- **UI 交互细节**：桌面端侧边栏的会话分组混乱及全局功能（如 Auto-fix CI）无法通过配置文件持久化设置，反映出桌面端在工程化配置上的空白。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-09-23)

### 1. 今日速览
Codex CLI 正式发布 **v0.156.0**，引入了可选的全屏 UI（`/tui`）模式及默认启用的语音对话功能，同时 0.157.0 系列 Alpha 版本正在快速迭代。社区关注度最高的 Issue 依然集中在 **Windows 沙箱初始化失败**、**Chrome 插件/计算机使用受限**以及**模型目录中新增 GPT-6 Sol/Luna** 的兼容性上。

### 2. 版本发布

*   **rust-v0.156.0 (Stable)**
    *   **新增功能**: 引入可选的全屏 UI 模式，可通过 `/tui` 命令在下次启动时启用。该模式支持转录搜索、鼠标选择文本及右键复制功能。
    *   **语音对话**: 语音对话功能默认开启，支持 F8 键切换，提供 `/voice settings` 配置选择器，并捆绑了音频资源。
    *   **相关链接**: [rust-v0.156.0](https://github.com/openai/codex/releases/tag/rust-v0.156.0)
*   **rust-v0.157.0-alpha.9 (Pre-release)**
    *   发布 0.157.0-alpha.9 预发布版本，延续 Alpha 通道的快速迭代节奏。
    *   **相关链接**: [rust-v0.157.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.9)

### 3. 社区热点 Issues

1.  **Chrome 插件与计算机使用限制 (#29343)**
    *   **状态**: OPEN | **评论**: 33 | **点赞**: 12
    *   **分析**: 用户反映 Codex 的 Chrome 插件、浏览器及 Computer Use 功能拒绝与特定网站交互，导致静默失败。这是影响核心自动化场景的高频痛点，社区讨论热烈。
    *   **链接**: [Issue #29343](https://github.com/openai/codex/issues/29343)

2.  **自我进化 Agent 提议：交互式指令蒸馏 (#40575)**
    *   **状态**: OPEN | **评论**: 31
    *   **分析**: 一项 RFC 提案，旨在通过 `/learn` 命令和规则新陈代谢机制让 Agent 具备自我进化能力，解决长期项目中的记忆断层问题。代表了社区对 Agent 架构高级能力的探索方向。
    *   **链接**: [Issue #40575](https://github.com/openai/codex/issues/40575)

3.  **Windows 更新后本地项目从侧边栏消失 (#42739)**
    *   **状态**: OPEN | **评论**: 26
    *   **分析**: 更新 Windows 桌面应用后，“Projects” 区域显示无项目，尽管源文件夹和聊天记录依然存在。严重的状态同步 Bug，影响用户工作流连续性。
    *   **链接**: [Issue #42739](https://github.com/openai/codex/issues/42739)

4.  **Windows 沙箱助手报错：setup refresh had errors (#44696)**
    *   **状态**: OPEN | **评论**: 16 | **点赞**: 2
    *   **分析**: 在 Windows 11 上，所有 `exec_command` 甚至文件读取操作都在沙箱初始化层失败，导致基本功能不可用。阻碍了 Windows 用户的正常使用。
    *   **链接**: [Issue #44696](https://github.com/openai/codex/issues/44696)

5.  **Windows 应用卡在 "Finish Windows setup" (#32492)**
    *   **状态**: OPEN | **评论**: 16 | **点赞**: 5
    *   **分析**: 沙箱设置未触发真实的 UAC 提示，且重试无效。这是一个长期的安装/初始化阻塞问题，影响新装用户。
    *   **链接**: [Issue #32492](https://github.com/openai/codex/issues/32492)

6.  **Astra 动画干扰 Kitty 终端文本选择 (#44398)**
    *   **状态**: CLOSED | **评论**: 14 | **点赞**: 16
    *   **分析**: GPT-6-Astra 模型下的装饰性动画导致鼠标无法选择文本。虽已关闭（可能修复），但反映了 UI 渲染与终端交互兼容性的细节问题。
    *   **链接**: [Issue #44398](https://github.com/openai/codex/issues/44398)

7.  **Windows 应用安装助手 Access Denied (#40550)**
    *   **状态**: OPEN | **评论**: 14
    *   **分析**: 一次性设置失败，UI 显示 `helper_failed`。与 #44696 和 #32492 类似，Windows 沙箱/辅助程序权限管理存在普遍性难题。
    *   **链接**: [Issue #40550](https://github.com/openai/codex/issues/40550)

8.  **TUI 恢复会话时计时器状态错误 (#19984)**
    *   **状态**: OPEN | **评论**: 10
    *   **分析**: 状态回放或恢复后，活动轮次计时器丢失或报告错误。影响 CLI 用户对会话时长和性能的监控。
    *   **链接**: [Issue #19984](https://github.com/openai/codex/issues/19984)

9.  **Windows Git 写入被 DENY ACL 阻止 (#32880)**
    *   **状态**: OPEN | **评论**: 9
    *   **分析**: 版本更新后，Windows 桌面端无法执行自主 Git 元数据操作，workspace-write 权限配置出现问题。
    *   **链接**: [Issue #32880](https://github.com/openai/codex/issues/32880)

10. **上下文压缩永久销毁对话转录 (#44363)**
    *   **状态**: OPEN | **评论**: 9
    *   **分析**: Context compaction 功能在原地重写存储的 rollout，导致原始对话记录永久丢失。这是一个严重的数据完整性 Bug，用户无法回溯历史。
    *   **链接**: [Issue #44363](https://github.com/openai/codex/issues/44363)

### 4. 重要 PR 进展

1.  **PR #47385: 模型目录更新 (Open)**
    *   **内容**: 在模型目录中添加 `gpt-6-sol` 和 `gpt-6-luna`，并提供从旧模型（如 gpt-5.5, gpt-5.6）到新模型的迁移路径。
    *   **意义**: 标志着 GPT-6 系列新模型正式进入 Codex 支持列表，解决用户无法选择新模型的问题。
    *   **链接**: [PR #47385](https://github.com/openai/codex/pull/47385)

2.  **PR #47398: 系统代理回退修复 (Closed)**
    *   **内容**: 为登录和启动请求启用 `features.system_proxy_fallback`，解决仅通过系统代理可达的端点导致的企业配置引导失败问题。
    *   **意义**: 提升了企业环境下的网络兼容性。
    *   **链接**: [PR #47398](https://github.com/openai/codex/pull/47398)

3.  **PR #47399: 尊重 Tmux 鼠标设置 (Closed)**
    *   **内容**: 在全屏和覆盖层中检测 Tmux 的 `mouse` 设置，若禁用则抑制 Codex 的鼠标捕获。
    *   **意义**: 修复了在 Tmux 中 Codex 强制捕获鼠标导致终端其他功能异常的问题。
    *   **链接**: [PR #47399](https://github.com/openai/codex/pull/47399)

4.  **PR #47381: 语音对话跨线程保持 (Closed)**
    *   **内容**: 允许用户在切换 TUI 线程时保持语音对话运行，不再因导航而中断通话。
    *   **意义**: 显著提升了语音交互体验，符合 Agent 长时间任务的特点。
    *   **链接**: [PR #47381](https://github.com/openai/codex/pull/47381)

5.  **PR #47361: Windows 沙箱对象访问限制 (Closed)**
    *   **内容**: 将 Windows 沙箱默认的共享文件系统能力限制在日志会话内，防止隐式所有者权限被其他日志会话利用来重写 DACL。
    *   **意义**: 加强了 Windows 下的安全隔离，回应了多个沙箱安全相关的 Issue。
    *   **链接**: [PR #47361](https://github.com/openai/codex/pull/47361)

6.  **PR #47389: 网络策略强制执行 (Closed)**
    *   **内容**: 确保在重定向、响应体读取及 WebSocket 建立期间，网络目的地限制和策略撤销仍然有效。
    *   **意义**: 增强了企业安全合规性，防止策略绕过。
    *   **链接**: [PR #47389](https://github.com/openai/codex/pull/47389)

7.  **PR #47397: 刷新捆绑模型元数据 (Closed)**
    *   **内容**: 更新 GPT-6, GPT-5.6 等模型的元数据，标记 `gpt-6-astra` 支持推理努力度更新。
    *   **意义**: 确保客户端正确显示和使用新模型的功能特性。
    *   **链接**: [PR #47397](https://github.com/openai/codex/pull/47397)

8.  **PR #47393: 重试文件上传失败 (Closed)**
    *   **内容**: 针对 503 响应或中断流，最多重试 5 次，避免单次瞬态故障导致整个文件上传流程中止。
    *   **意义**: 提高了大文件或多文件场景下的健壮性。
    *   **链接**: [PR #47393](https://github.com/openai/codex/pull/47393)

9.  **PR #47375: 本地 MXC 沙箱选项 (Closed)**
    *   **内容**: 添加默认关闭的 `features.prefer_mxc` 标志，允许在支持本地原生操作且网络设置允许时，优先使用本地 MXC 进行 Windows 执行。
    *   **意义**: 为高性能或离线场景提供沙箱执行模式的灵活性。
    *   **链接**: [PR #47375](https://github.com/openai/codex/pull/47375)

10. **PR #47365: 从最新压缩边界恢复上下文 (Closed)**
    *   **内容**: 恢复压缩线程时，停止旧式分页扫描，直接从最新压缩边界恢复模型上下文，避免恢复过时的预压缩状态。
    *   **意义**: 优化了长会话恢复的逻辑，可能缓解了部分状态不一致问题。
    *   **链接**: [PR #47365](https://github.com/openai/codex/pull/47365)

### 5. 功能需求趋势

*   **模型迭代支持**: 社区高度关注 **GPT-6 系列**（Sol, Luna, Astra）的集成与配置，PR #47385 和 #47397 正在解决这一需求。
*   **语音交互增强**: 随着语音对话默认开启，用户开始提出更细粒度的需求，如**连续听写模式** (#47396) 和解决**启动失败** (#47400)。
*   **Agent 自治与记忆**: 长期项目导致对**上下文管理**和**自我进化**（如 #40575 的 RFC）的需求激增，用户希望 Agent 能更好地处理长期任务中的记忆断层。
*   **跨平台一致性**: 尤其是 **Windows 平台**，大量 Issue 集中在沙箱、安装和权限管理上，反映出 Windows 支持仍是主要短板。

### 6. 开发者关注点

*   **Windows 稳定性黑洞**: 过去 24 小时内，超过 10 个高热度 Issue 集中在 Windows 沙箱初始化、权限错误（Access Denied）、Git 写入失败及安装卡死。对于 Windows 开发者而言，Codex 目前的可靠性是主要痛点。
*   **UI 交互细节**: 全屏 TUI 的鼠标选择、Tmux 兼容性、以及 macOS/Windows 上的文本选择问题 (#44398, #47372) 影响了高频 CLI 用户的使用体验。
*   **透明度与可观测性**: 用户强烈要求了解后台行为，如**运行命令的可见性** (#37213)、**TRACE 日志的持久化** (#30405) 以及**上下文压缩对原始数据的影响** (#44363)。
*   **网络与企业配置**: 代理支持 (#47398) 和网络策略强制执行 (#47389) 表明企业用户正在更深入地将 Codex 集成到受控网络环境中，需要更精细的网络控制。

</details>