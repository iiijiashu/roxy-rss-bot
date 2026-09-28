# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-28 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

以下是基于 2026-09-28 各主流 AI CLI 工具社区动态生成的横向对比分析报告。

### 1. 生态全景
当前 AI CLI 工具生态正经历从“基础可用性”向“深度工程化集成”的剧烈过渡，Claude Code 聚焦于消除平台差异（尤其是 Windows）及强化安全钩子，而 OpenAI Codex 则处于桌面端稳定性崩溃与底层 Rust 运行时高频优化的拉锯战中。两大工具社区均对“静默故障”（如数据写入滞后、进程假死）表现出极高焦虑，反映出自动化工作流对数据一致性及可观测性的刚性需求。随着 Cowork 与 Desktop 形态的融合，用户体验的细腻度（如 TUI 交互、Diff 面板逻辑）成为竞争的新高地，而 MCP 权限管理与多 Agent 通信可靠性仍是未解的核心痛点。

### 2. 各工具活跃度对比

| 工具 | Issues 活跃度 | PR 活跃度 | Release 情况 | 核心焦点 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 高（24h 处理 49 条更新） | 中（24h 更新 3 条） | 无新版本 | 桌面端功能回归、Windows 兼容性、Hook 安全性 |
| **OpenAI Codex** | 高（10 个热点 Issue 评论量大） | 高（10 个底层/UI PR） | 高频（v0.159.0-alpha.7~10 等 5 个版本） | 桌面端严重回归、Rust 运行时优化、TUI 体验 |

*注：Claude Code 未发布新版本，但 Issues 处理量大；Codex 处于 Alpha 高频迭代期，Release 频率极高。*

### 3. 共同关注的功能方向
*   **Windows 平台一等公民待遇**：
    *   **Claude Code**：社区强烈要求修复 Bash 路径解析、OAuth 403 错误及 Hook 不触发问题，消除“平台二等公民”体验。
    *   **OpenAI Codex**：焦点在于修复 Windows 终端窗口闪烁、Desktop 启动死循环及组织配置加载失败，解决基础交互阻断。
*   **MCP 稳定性与权限自动化**：
    *   **Claude Code**：关注 MCP 白名单工具仍触发权限提示的问题，要求更细粒度的权限控制。
    *   **OpenAI Codex**：通过 PR 优化单服务器 MCP 状态发现，降低全量查询开销，旨在提升连接健壮性。
*   **长会话与后台任务可靠性**：
    *   **Claude Code**：解决 `SendMessage` 假成功及 `device_commit_files` 静默写入滞后，防止数据丢失。
    *   **OpenAI Codex**：通过 `prewarm_with_history` 加速长会话恢复，并修复子进程回收问题，保障长期运行稳定性。

### 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **功能侧重** | **工作流整合与安全**：强调 Hooks 安全性（防注入）、Cowork 桌面端功能完整性、数据一致性。 | **底层性能与交互细节**：侧重 Rust 运行时优化、线程预热、TUI 动效同步及终端适配。 |
| **目标用户** | 重度自动化开发者、依赖多 Agent 协作的企业用户、注重数据安全与合规的团队。 | 追求极致响应速度的极客用户、跨平台（Win/Linux）桌面端重度使用者、底层架构探索者。 |
| **技术路线** | 基于现有 CLI 框架的功能扩展，侧重 API 行为修正（如 Cache 失效、权限模型）。 | 底层重构（Rust 替换/优化），高频 Alpha 迭代，侧重事件驱动架构与 Unix/Windows 系统级适配。 |

### 5. 社区热度与成熟度
*   **OpenAI Codex（快速迭代/不稳定期）**：社区热度极高，但伴随大量破坏性回归 Bug（Desktop 启动卡死、任务挂起）。处于“高频迭代以换取稳定”的混沌期，v0.158/159 Alpha 版本表明底层架构正在剧烈调整，适合尝鲜型开发者，但生产环境使用需谨慎。
*   **Claude Code（成熟/修补期）**：社区活跃度高，但无新版本发布，聚焦于 Bug 修复与安全性加固。处于“成熟维护”阶段，核心功能稳定，但 Windows 适配和安全钩子仍是痛点。适合追求稳定性的专业开发者，但需手动规避已知的 Windows 路径问题。

### 6. 值得关注的趋势信号
1.  **从“回合驱动”转向“事件驱动”的架构需求**：Codex 社区呼吁原生会话唤醒原语以响应外部文件变更或消息，这预示着未来 AI CLI 将从被动响应指令转向主动感知环境，开发者应关注基于 Unix Domain Socket (UDS) 的本地多 Agent 协同技术。
2.  **静默故障零容忍与可观测性提升**：两大工具均暴露“假成功”（Fake Success）和“静默写入”问题。行业趋势将强制要求 CLI 工具提供明确的错误反馈机制和细粒度审计日志（如 Claude Code 的 `prompt_source` 字段），开发者在构建自动化流水线时必须增加结果校验环节，不能完全信任 API 返回的 `success: true`。
3.  **Windows 成为 AI 工具竞争的分水岭**：随着 Windows 11 + WSL2 + Git Bash 混合环境普及，工具在 Windows 下的路径解析、进程管理（SIGCHLD 处理）和终端渲染能力直接决定其企业级采用率。关注工具是否支持 ConPTY 鼠标事件及符号链接解析能力，是评估其生产可用性的关键指标。
4.  **安全性从“功能”升级为“基础设施”**：Claude Code 针对 Prompt Injection 的 Hook 区分机制表明，AI CLI 的安全性不再仅是模型层面的事，而是涉及系统钩子、MCP 权限隔离及遥测数据控制。开发者应优先选择支持细粒度权限白名单和消息来源识别的工具，以应对供应链攻击风险。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告 (数据截止 2026-09-28)

## 1. 热门 Skills 排行
基于 PR 活跃度与更新时间排序，以下 Skill 社区关注度最高：

*   **skill-creator**: 核心元技能，用于创建其他 Skill。社区聚焦于其评估流程（Trigger Evals）在 Windows 环境下的兼容性修复及性能问题。
    *   状态: Open ([PR #1298](https://github.com/anthropics/skills/pull/1298), [Issue #1383](https://github.com/anthropics/skills/issues/1383))
*   **docx (Document Skills)**: 关注点在于修复 DOCX 文件生成的完整性问题，包括解决 Tracked Changes ID 冲突以及处理 LibreOffice 转换超时导致的错误报告。
    *   状态: Open ([PR #541](https://github.com/anthropics/skills/pull/541), [PR #1792](https://github.com/anthropics/skills/pull/1792))
*   **mcp-builder**: 重点在于兼容 MCP 2.0 规范（如 streamable_http_client 重命名），并修复评估脚本对真实 MCP 服务器返回 0/N 分数的 Bug。
    *   状态: Open ([PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390))
*   **pdf**: 主要讨论集中在修复跨平台（Linux/macOS）下因文件名大小写不匹配导致的引用错误。
    *   状态: Open ([PR #538](https://github.com/anthropics/skills/pull/538))
*   **testing-patterns**: 新增的测试方法论技能，涵盖测试金字塔、单元测试及 React 组件测试，社区对其实用性反馈积极。
    *   状态: Open ([PR #723](https://github.com/anthropics/skills/pull/723))
*   **md2video-audio**: 新提交的高关注度技能，实现将 Markdown 文档零成本转换为带语音的专业 MP4 视频。
    *   状态: Open ([PR #1703](https://github.com/anthropics/skills/pull/1703))
*   **frontend-design**: 长期 Open 的改进型 PR，旨在提升指令的清晰度与可执行性，解决 Skill 引导行为不够具体的问题。
    *   状态: Open ([PR #210](https://github.com/anthropics/skills/pull/210))

## 2. 社区需求趋势
从 Issues 的讨论热度与内容分析，社区对 Skills 的需求集中在以下方向：

*   **组织级协作与共享**: 强烈呼吁支持 org-wide 的 Skill 共享功能，以解决目前依赖手动下载 .skill 文件并通过 IM 传输的繁琐流程。([Issue #228](https://github.com/anthropics/skills/issues/228))
*   **安全与信任边界**: 社区担忧外部 Skill 滥用 `anthropic/` 命名空间导致的信任边界突破，以及 Skill 在加载时的安全风险（如 XSS 或权限提升）。([Issue #492](https://github.com/anthropics/skills/issues/492), [Issue #1175](https://github.com/anthropics/skills/issues/1175))
*   **上下文窗口优化**: 针对 Skill 贪婪注入 Token 导致上下文溢出的问题，社区提议引入“紧凑内存”（compact-memory）等机制来管理长对话状态。([Issue #1487](https://github.com/anthropics/skills/issues/1487), [Issue #1329](https://github.com/anthropics/skills/issues/1329))
*   **质量门禁与安全模式**: 开发者希望引入 Agent 治理（Agent Governance）Skill，以规范 AI Agent 系统的策略执行、威胁检测及审计痕迹。([Issue #412](https://github.com/anthropics/skills/issues/412))

## 3. 高潜力待合并 Skills
以下 PR 活跃度高且针对具体痛点，具备近期合并的潜力：

*   **blast-radius (安全校验 Skill)**: 针对批量或破坏性写操作（如删除、归档）提供安全清单，填补“查询正确”与“操作安全”之间的缺口。([PR #1776](https://github.com/anthropics/skills/pull/1776))
*   **AWT (AI Watch Tester)**: 提供零代码 E2E 测试生成，赋予 Claude 视觉与浏览器控制能力以自动运行测试。([PR #822](https://github.com/anthropics/skills/pull/822))
*   **document-typography**: 专门解决 AI 生成文档中常见的排版缺陷（如孤立行、孤字、编号错位），属于高频刚需类工具。([PR #514](https://github.com/anthropics/skills/pull/514))
*   **notion-spec-to-implementation**: 将 Notion 中的规格说明转化为可执行的 Claude Code 任务，打通了产品设计与代码实现的链路。([PR #1245](https://github.com/anthropics/skills/pull/1245))

## 4. Skills 生态洞察
**当前社区最集中的诉求是解决 Skills 在“大规模分布式管理”与“安全性”之间的平衡，既要简化组织内的共享与去重，又要建立严格的信任机制防止恶意 Skill 滥用官方命名空间。**

---

**今日速览**
过去24小时内，Claude Code 社区未发布新版本，但 Issues 活跃度极高，共处理了49条更新。社区焦点集中在 **Cowork/桌面端功能回归**、**Windows 平台特异性 Bug** 以及 **安全性（Hooks 与 MCP 权限）** 三大领域。其中，关于 Cowork 文件夹选择功能缺失的 Bug 成为当前最热讨论（35条评论），而新发现的提示注入攻击面问题引发了对系统级钩子安全性的担忧。

## 社区热点 Issues
（注：根据数据源，过去24小时内更新且评论数或影响度最高的10个 Issue）

1.  **[BUG] Cowork: new projects lost "Choose a folder"**
    *   **状态/热度**：OPEN | 35条评论 | 28个 👍
    *   **分析**：这是当前社区关注度最高的问题。在 Chat 和 Cowork 合并后，新项目的上下文菜单从“选择文件夹”变成了仅支持上传的知识菜单，导致用户无法直观选择本地工作目录。社区反应强烈，认为这是严重的功能倒退。
    *   链接: [anthropics/claude-code Issue #76694](https://github.com/anthropics/claude-code/issues/76694)

2.  **[BUG] Cowork: device_commit_files silent stale write**
    *   **状态/热度**：OPEN | 14条评论
    *   **分析**：数据完整性严重缺陷。`device_commit_files` 在覆盖文件时报告成功，但磁盘上的内容实际上滞后于上一次提交（内容陈旧但 mtime 刷新）。这种“静默陈旧写入”可能导致用户数据丢失且难以察觉，涉及数据丢失标签，风险极高。
    *   链接: [anthropics/claude-code Issue #93482](https://github.com/anthropics/claude-code/issues/93482)

3.  **[BUG] Prompt cache invalidated by rewrites in long sessions**
    *   **状态/热度**：CLOSED | 7条评论
    *   **分析**：此前导致成本激增的性能问题。Claude Code 在长会话中重写旧消息导致 Prompt 缓存失效，迫使重新处理整个对话。该 Issue 已关闭，表明官方可能已针对缓存机制进行了优化或修复，是性能优化方向的重要参考。
    *   链接: [anthropics/claude-code Issue #76606](https://github.com/anthropics/claude-code/issues/76606)

4.  **[BUG] UserPromptSubmit prompt-injection surface**
    *   **状态/热度**：OPEN | 3条评论
    *   **分析**：**安全高危预警**。`UserPromptSubmit` 钩子无法区分用户手动输入的提示和系统/Agent 注入的消息（如 `SendMessage` 负载、任务通知）。这意味着恶意注入可能绕过基于钩子的安全检查。社区正在讨论如何增加 `prompt_source` 或 `is_meta` 字段以识别消息来源。
    *   链接: [anthropics/claude-code Issue #94675](https://github.com/anthropics/claude-code/issues/94675)

5.  **[BUG] Windows Bash tool halves backslashes**
    *   **状态/热度**：OPEN | 1条评论
    *   **分析**：Windows 平台特有的底层解析错误。Bash 工具在 Windows 上会将命令中成对的反斜杠减半，导致路径解析错误。这严重影响了在 Windows 上使用复杂路径或正则表达式的用户，是基础体验的阻断性问题。
    *   链接: [anthropics/claude-code Issue #97409](https://github.com/anthropics/claude-code/issues/97409)

6.  **[BUG] Working directory change hook not triggering**
    *   **状态/热度**：OPEN | 1条评论
    *   **分析**：Windows 平台（Win32/Windows Terminal）上，`cwdchanged` 钩子无法触发。这对于依赖目录切换执行不同逻辑或环境变量的自动化工作流至关重要，阻碍了 Windows 开发者的高级定制能力。
    *   链接: [anthropics/claude-code Issue #97716](https://github.com/anthropics/claude-code/issues/97716)

7.  **[BUG] claude auth login fails on Windows (OAuth 403)**
    *   **状态/热度**：OPEN | 3条评论
    *   **分析**：Windows 用户运行 `claude auth login` 或 `setup-token` 时遭遇 OAuth 403 错误，尽管桌面应用登录正常。这表明 CLI 和 Desktop 在 Windows 上的认证流程或 Scope 请求存在不一致，阻碍了 CLI 独立使用场景。
    *   链接: [anthropics/claude-code Issue #93967](https://github.com/anthropics/claude-code/issues/93967)

8.  **[BUG] sendMessage success for undelivered messages (2.1.234)**
    *   **状态/热度**：OPEN | 3条评论
    *   **分析**：Agent 通信可靠性问题。`SendMessage` 对未实际发送的消息返回 `{"success":true}`，导致长时会话出现“双向失聪”现象，且旧桥接指针可能导致宿主显示“已连接”但实际无工作进程。影响了多 Agent 协作系统的稳定性。
    *   链接: [anthropics/claude-code Issue #89938](https://github.com/anthropics/claude-code/issues/89938)

9.  **[BUG] MCP allowlisted tools still trigger permission prompt**
    *   **状态/热度**：CLOSED | 4条评论
    *   **分析**：MCP 权限模型缺陷。即使在 `.claude/settings.json` 中允许了 MCP 工具，新会话启动时仍会触发权限提示。该问题已关闭，可能已在近期版本中修复，反映了社区对 MCP 权限自动化的高度需求。
    *   链接: [anthropics/claude-code Issue #76238](https://github.com/anthropics/claude-code/issues/76238)

10. **[BUG] WSL2 bwrap fails with symlinked /mnt/c paths**
    *   **状态/热度**：OPEN | 1条评论
    *   **分析**：WSL 用户痛点。当读取拒绝路径（read-deny path）是指向 `/mnt/c` 的符号链接时，沙箱环境（bwrap）设置失败，导致所有 Bash 命令报错。这是 WSL 环境下长期使用 Claude Code 的典型阻碍，且受管理策略限制难以移除。
    *   链接: [anthropics/claude-code Issue #93845](https://github.com/anthropics/claude-code/issues/93845)

## 重要 PR 进展
（注：根据数据源，过去24小时内更新的 PR 仅3条，以下列出全部3条）

1.  **sec-default: collector records continue past the user tier**
    *   **状态**：OPEN
    *   **内容**：调整 `sec-default` 配置，允许组织级别的插件不再丢弃或重写发送至收集器的记录。`telemetry.log` 现在在用户层之后继续记录，与 `classic.*` 和 `settings.read` 保持一致。旨在增强组织对遥测数据完整性的控制。
    *   链接: [anthropics/claude-code PR #97688](https://github.com/anthropics/claude-code/pull/97688)

2.  **diff: a resumed session with edits opens the pane**
    *   **状态**：CLOSED
    *   **内容**：修复 Diff 模块与内置面板行为不一致的问题。现在，当恢复或继续包含编辑历史的会话时，一旦宽度已知，Diff 面板就会立即打开，与内置面板在恢复历史时的行为保持一致。提升了 TUI 用户体验的一致性。
    *   链接: [anthropics/claude-code PR #95587](https://github.com/anthropics/claude-code/pull/95587)

3.  **diff: the first edit opens the pane only when it has a file to list**
    *   **状态**：OPEN
    *   **内容**：优化 Diff 面板的自动打开逻辑。之前首次成功编辑任意路径（包括仓库外、被忽略文件或不同 worktree）都会触发面板打开，导致显示“无跟踪更改”的空面板。此 PR 修复了该问题，仅当有实际文件可列出时才打开面板，减少了视觉噪音。
    *   链接: [anthropics/claude-code PR #94847](https://github.com/anthropics/claude-code/pull/94847)

## 功能需求趋势
从过去24小时的 Issues 中提炼出的社区核心关注方向：

1.  **平台一致性（特别是 Windows）**：
    *   多个 Issue 指出 Windows 在 Bash 路径解析、OAuth 认证、Hook 触发上与 macOS/Linux 存在显著差异。社区强烈期望消除“平台二等公民”体验，尤其是 Windows 11 + Git Bash/MSYS 环境下的兼容性。
2.  **Cowork 与桌面端的功能完整性**：
    *   随着 Cowork 与 Chat 的合并，用户反馈大量功能缺失（如文件夹选择、Google Drive 镜像支持）。社区关注点从“可用”转向“易用”和“功能对齐”，要求桌面端提供完整的本地文件交互能力。
3.  **MCP 服务器的稳定性与权限自动化**：
    *   开发者频繁遭遇 MCP 工具权限提示未消除、服务器启动竞态条件（regression）导致工具缺失等问题。趋势显示社区需要更健壮的 MCP 连接管理和更细粒度的权限白名单机制。
4.  **安全性与审计透明度**：
    *   关于提示注入（Prompt Injection）的讨论升温，社区要求 Hooks 能够区分系统消息和用户消息。同时，遥测数据（Telemetry）的透明度和组织级控制成为新的关注点。

## 开发者关注点
总结开发者反馈中的高频痛点：

1.  **静默故障与数据一致性**：
    *   最令开发者焦虑的是“静默”错误，如 `device_commit_files` 写入滞后、`SendMessage` 假成功、HTTP 连接网络变更后永久挂起。缺乏明确的错误反馈机制使得调试困难，数据完整性风险高。
2.  **长会话/后台任务的资源管理**：
    *   包括内存泄漏（Headless 模式 RSS 飙升至 10-15GB）、子代理后台进程在回合结束时被 SIGHUP 杀死、以及网络路径变更导致的连接不可恢复。这些痛点限制了 Claude Code 在长期自动化任务和服务器端无人值守场景中的应用。
3.  **TUI 交互的细节体验**：
    *   用户关注细微的 UI 行为，如 Diff 面板的弹出逻辑、模型名称在子代理中的显示准确性（误导性显示父会话模型）、以及颜色支持（Truecolor）。这表明核心用户群体对终端体验的专业度有较高要求。
4.  **Windows 生态的适配深度**：
    *   不仅是基础命令执行，连 Hook 触发、认证流程、驱动器路径权限匹配都存在缺陷。Windows 开发者感到其工作流受到系统性阻碍，尤其在集成 Git for Windows 和 WSL2 混合场景下。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

1. **今日速览**
过去 24 小时，OpenAI Codex 社区主要聚焦于 Windows 和 Linux 桌面端（Desktop）的严重回归缺陷，包括应用启动卡死、终端窗口闪烁及会话后续消息无法发送等核心体验问题。同时，Codex CLI 发布了 v0.159.0-alpha 系列高频更新，开发者侧重点转向了底层性能优化（如线程预热、Unix 套接字修复）及 TUI 界面细节打磨。

2. **版本发布**
过去 24 小时内，Codex CLI 发布了多个 Alpha 测试版本，迭代频率极高，主要涉及 Rust 运行时及核心模块调整：
*   **v0.159.0-alpha.10** [Release 0.159.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.10)
*   **v0.159.0-alpha.9** [Release 0.159.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.9)
*   **v0.159.0-alpha.8** [Release 0.159.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.8)
*   **v0.159.0-alpha.7** [Release 0.159.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.7)
*   **v0.158.0-alpha.15.3** [Release 0.158.0-alpha.15.3](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.15.3)

3. **社区热点 Issues**
挑选 10 个当前最受关注的 Issue（基于评论量与社区共鸣度）：

*   **Windows 终端窗口闪烁**：[Issue #48074](https://github.com/openai/codex/issues/48074)。安装 Codex 守护进程后，Windows 11 下终端窗口在请求期间反复闪烁。该问题影响极大（👍 73，评论 40），是目前 Windows CLI 端最严重的 UI/交互缺陷。
*   **Windows Desktop 后续消息阻断**：[Issue #44102](https://github.com/openai/codex/issues/44102)。Windows 桌面端 26.903 版本在首个回合完成后，无法发送后续消息（评论 29）。该问题导致桌面端 Agent 对话功能部分失效。
*   **Linux Desktop 任务挂起**：[Issue #48189](https://github.com/openai/codex/issues/48189)。Linux Mint 下 26.924 版本导致本地任务无限卡在"Starting your task"，回滚至 26.917 可修复（👍 42，评论 24）。
*   **Windows Desktop 启动死循环**：[Issue #48333](https://github.com/openai/codex/issues/48333)。Windows Desktop 26.924 版本启动后卡在加载界面，除非手动终止后台的 `codex.exe` 进程（评论 22）。
*   **Linux Electron 信号处理 Bug**：[Issue #48554](https://github.com/openai/codex/issues/48554)。Linux 桌面端 Electron 运行时替换了 libuv 的 `SIGCHLD` 处理器为空函数，导致子进程无法回收，进而引发 shell 环境变量超时和 "Git is unavailable" 错误（👍 12，评论 21）。
*   **Windows Shell 子进程窗口闪烁**：[Issue #48422](https://github.com/openai/codex/issues/48422)。Windows CLI 每次会话/回合时，可见的 shell 子进程控制台窗口都会闪烁（👍 16，评论 16）。
*   **Linux 提示词挂起回归**：[Issue #48417](https://github.com/openai/codex/issues/48417)。Fedora 系统在 26.924.22138 版本中，Codex Desktop 在每次提示词时均挂起，降级可复现问题（评论 15）。
*   **Windows 组织配置加载失败**：[Issue #48324](https://github.com/openai/codex/issues/48324)。Windows 桌面版在 Composer 加载前显示“Unable to load organization settings”，导致无法使用桌面端会话功能（评论 12）。
*   **跨平台桌面加载卡死**：[Issue #48522](https://github.com/openai/codex/issues/48522)。Windows 桌面端更新后，应用 `app://-/index.html` 路由解析失败，导致永久卡死在加载圈中（评论 10）。
*   **跨平台多控制台窗口**：[Issue #48325](https://github.com/openai/codex/issues/48325)。Windows PowerShell 运行 Codex CLI 时，发送消息会导致打开多个控制台窗口（评论 9）。

4. **重要 PR 进展**
挑选 10 个对开发者体验和底层架构有重要影响的 PR（均为自动 Bot 提交并已合并/关闭）：

*   **空闲线程历史预热**：[PR #48812](https://github.com/openai/codex/pull/48812)。通过调用 `CodexThread::prewarm_with_history()`，利用 WebSocket 和现有对话历史进行预热（`generate: false`），大幅提升长会话恢复速度。
*   **修复 Unix 长符号链接套接字**：[PR #48772](https://github.com/openai/codex/pull/48772)。解决 Unix 控制套接字路径因符号链接过长得导致超限连接失败的问题，增加路径解析与重试机制。
*   **单服务器 MCP 状态发现**：[PR #48783](https://github.com/openai/codex/pull/48783)。支持带 `serverName` 的单点 MCP 状态查询及线程连接复用，避免获取全量 MCP 资源，降低网络开销。
*   **Windows 终端鼠标上报修复**：[PR #48799](https://github.com/openai/codex/pull/48799)。通过单独写入 SGR 编码请求并与 `EnablePointerCapture` 分离，解决部分 Windows 终端（ConPTY）无法正确上报鼠标事件的问题。
*   **Guardian 历史记录保留**：[PR #48779](https://github.com/openai/codex/pull/48779)。优化上下文压缩（compaction）过程中的安全审查逻辑，确保在禁用重用时，Guardian 仍能保留原始证据及父级上下文。
*   **TUI 模态框下的列表滚动**：[PR #48805](https://github.com/openai/codex/pull/48805)。允许在“Implement this plan?”等模态弹窗打开时，继续使用鼠标滚轮滚动历史转录内容，改善长 Plan 交互体验。
*   **TUI 状态 Shimmer 动效同步**：[PR #48757](https://github.com/openai/codex/pull/48757)。调整终端 UI 的动画时序（初始延迟 600ms，每隔 4 秒 sweeping 1 秒），使其与桌面端状态栏视觉表现保持一致。
*   **Mermaid 标签标点修复**：[PR #48814](https://github.com/openai/codex/pull/48814)。修复图表渲染时，因在分号处错误拆分以及拒绝标签内标点，导致 `[]`、`&` 及特定序列消息等无法渲染的问题。
*   **TUI 短回合耗时显示**：[PR #48807](https://github.com/openai/codex/pull/48807)。TUI 完成提示的脚注现在会显示所有已知时长（包括亚秒级），以前只有超过 60 秒的回合才显示时间。
*   **Linux 测试执行修复**：[PR #48727](https://github.com/openai/codex/pull/48727)。集中化可执行文件 Fixture 的创建，解决 Linux 下并发测试因继承可写描述符而引发 `ETXTBSY` 竞态条件的问题。

5. **功能需求趋势**
*   **Agent 状态感知与事件驱动**：社区正强烈呼吁从纯"回合驱动"(turn-driven) 向"事件驱动"(event-driven) 发展。如 [Issue #20312](https://github.com/openai/codex/issues/20312) 提出原生的会话唤醒原语，希望 Agent 能响应外部消息、文件变更等实时反应。
*   **作用域化内存管理**：用户希望摆脱全局单点内存存储。[Issue #18343](https://github.com/openai/codex/issues/18343) 强调需要支持全局、项目级、混合及单线程作用域的 Memory 管理。
*   **多会话协同与本地通信**：单机多终端隔离限制了大量工程实践。[Issue #16447](https://github.com/openai/codex/issues/16447) 提出通过 Unix Domain Socket (UDS) 实现本地跨会话消息传递，以便多 CLI 实例能相互感知与协调。

6. **开发者关注点**
*   **桌面端稳定性危机（Windows & Linux）**：当前桌面端（版本 26.924 左右）存在高频且破坏性极强的回归 Bug。主要集中在进程生命周期管理（如 Electron 的 SIGCHLD 导致子进程僵尸）以及网络路由（如 Windows 端组织配置加载和路由解析失败）。这导致很多重度用户被迫回滚至 26.917 等旧版本。
*   **CLI 的终端适配与交互体验**：Windows CLI 对现代终端（Win Terminal, ConPTY）的支持存在诸多问题，包括鼠标事件捕获失效、子进程导致控制台频繁弹窗、多窗口打开异常等，严重影响了自动化集成。
*   **资源与状态观测**：用户在 Agent 运行监控、上下文裁剪和会话状态追踪上存在痛点。例如 [Issue #28977](https://github.com/openai/codex/issues/28977) 要求在 Desktop Thread UI 中展示当前 Git 分支和 CWD，以符合多项目并行开发时的可观测性需求。

</details>