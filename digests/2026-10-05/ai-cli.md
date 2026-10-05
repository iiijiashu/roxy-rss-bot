# AI CLI 工具社区动态日报 2026-10-05

> 生成时间: 2026-10-05 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

**生态全景**
当前 AI CLI 工具生态进入“平台化与稳定性攻坚”阶段。各主流工具社区焦点高度集中在跨平台（特别是 Windows/WSL）集成缺陷修复、长上下文下的核心工具稳定性以及多会话并发管理上。OpenAI Codex 正通过 Rust 核心重写加速底层架构迭代，而 Claude Code 则面临桌面端更新机制与会话持久化的集中投诉。行业竞争正从单纯的模型能力比拼，转向开发工作流可靠性、IDE 深度集成及 MCP 协议健壮性的精细化体验优化。

**各工具活跃度对比**

| 工具 | 过去24h Issues 更新 | 过去24h PRs 更新 | Release 情况 | 核心焦点领域 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 10+ (高热度 Bug) | 2 (功能/修复) | 无新 Release | 长上下文稳定性、Windows/桌面端集成、MCP 交互 |
| **OpenAI Codex** | 49 | 17 (已合并) | `rust-v0.162.0-alpha` 连续发布 | Windows 沙盒/ACL、Daemon 生命周期、Rust 核心重构 |

*注：数据基于各工具提供的“过去24小时”动态摘要汇总。*

**共同关注的功能方向**
*   **Windows 平台稳定性与集成**：两个工具的社区均将 Windows 痛点作为最高优先级。Claude Code 用户投诉 MSIX 更新导致的进程残留与 OAuth 竞态条件；Codex 用户则反馈 WSL 映射失败、CLI 终端窗口闪烁及沙盒 ACL 权限错误。
*   **MCP 协议健壮性与兼容性**：双方均在推进 MCP 生态成熟度。Claude Code 面临 Remote HTTP MCP 表单交互超时及 Remote HTTP MCP 认证失败；Codex 则修复了 RFC 9728 合规服务器的 OAuth 验证逻辑错误，并优化了 MCP 工具与 Computer Use 的联动。
*   **TUI/IDE 交互体验精细化**：开发者普遍关注 UI 的可用性。Codex 强调 TUI 的无障碍支持（屏幕阅读器）及 Vim 模式优化；Claude Code 则聚焦于桌面版多窗口 UI 渲染异常（如 AbovePrompt 丢失）及 VSCode 扩展的会话状态同步。

**差异化定位分析**
*   **技术路线**：**Codex** 处于架构演进期，核心正从现有语言向 **Rust 重写**迁移，通过 Alpha 版本快速迭代底层性能与二进制体积；**Claude Code** 架构相对成熟，重点在于**应用层逻辑**（如 Agent 隔离、长上下文管理）的精细化修补。
*   **功能侧重**：**Codex** 深度绑定“Computer Use/桌面操作”能力，强调自治 Agent 的控制权（如 Safety-pause 机制）与配额管理；**Claude Code** 侧重开发者工作流深度集成，突出 Worktree 隔离、Subagent 逻辑及全局 Hookify 规则。
*   **目标用户**：**Codex** 社区对 Pro/Plus 订阅用户及企业级合规集成（MCP 认证）关注度较高；**Claude Code** 则更吸引追求复杂代理工作流、注重长期记忆管理与多项目配置统一的重度开发者。

**社区热度与成熟度**
*   **OpenAI Codex**：处于**快速迭代与重构**阶段。49 条 Issue 与 17 个已合并 PR 的高流量，加之 Rust Alpha 版本的连续发布，表明其工程化进程处于高强度冲刺期。
*   **Claude Code**：处于**核心稳定性攻坚**阶段。缺乏新 Release 的情况下，高热度 Issue 集中在长上下文（100K+ tokens）工具失效与会话数据丢失，反映出其功能边界已拓展至大模型底层交互的深水区。

**值得关注的趋势信号**
1.  **Windows 成为 AI CLI 开发短板**：两个工具社区的 Windows 相关缺陷占比极高，表明跨平台 GUI 与 TUI 的底层进程管理（沙盒、ACL、Daemon）尚未成为标准化最佳实践，是后续版本的核心竞争力瓶颈。
2.  **长上下文引发的架构挑战**：随着上下文窗口突破 100K tokens，简单的会话管理已失效。Claude Code 暴露的 Advisor 工具不可用及状态水化问题，预示着 Agent 框架必须从“状态记录”转向“结构化记忆管理”。
3.  **MCP 协议工程化落地**：MCP 已从实验性接口转变为标准。OAuth 验证逻辑、Streamable HTTP 交互及工具变更追踪（如 Codex 的 `tools_change_count` 指标）成为企业级集成的必争之地。
4.  **对开发者的参考建议**：在构建或依赖 AI 工具链时，决策者应将“Windows/WSL 环境下的进程生命周期管理”与“MCP 端点容错机制”纳入技术选型考量，以规避会话中断与认证失败导致的工作流风险。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于 `anthropics/skills` 仓库数据（截止 2026-10-05）生成的社区热点报告。

### 1. 热门 Skills 排行
*注：由于源数据中评论数显示为 `undefined`，以下排名基于 Issues 关联热度、更新时间及问题严重程度进行加权评估。*

1.  **skill-creator (修复与增强)**
    *   **功能/热点**：社区最关注的核心工具。PR #1298 修复了触发评估（trigger evals）在 Windows 下的兼容性及运行时失败误报问题；Issue #1383 和 #1394 进一步暴露了基准测试布局不匹配、XSS 漏洞及评估不一致等深层问题。
    *   **状态**：Open (PR #1298, Issue #1383)
    *   **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298), [Issue #1383](https://github.com/anthropics/skills/issues/1383)
2.  **claude-api (模型状态同步)**
    *   **功能/热点**：解决模型 ID 过时和上下文窗口耗尽问题。PR #1607 标记了 4 个已退役模型 ID；Issue #1487 指出该 Skill 单次调用注入约 156k tokens，严重挤占上下文；PR #1730 修复了文档中的死链。
    *   **状态**：Open (PR #1607, Issue #1487)
    *   **链接**：[PR #1607](https://github.com/anthropics/skills/pull/1607), [Issue #1487](https://github.com/anthropics/skills/issues/1487)
3.  **docx / document-processing (文档处理)**
    *   **功能/热点**：针对 Word 文档处理的稳定性修复。PR #1792 解决了 LibreOffice 超时未报错且未验证输出的问题；PR #1734 试图检测孤立的 docx 注释。
    *   **状态**：Open (PR #1792, PR #1734)
    *   **链接**：[PR #1792](https://github.com/anthropics/skills/pull/1792)
4.  **mcp-builder (MCP 集成)**
    *   **功能/热点**：支持新版 MCP 协议和修复评估脚本。PR #1742 适配了 `mcp>=2.0.0` 的 `streamable_http_client` 导入变更及自定义头部；Issue #1390 指出其评估脚本对真实 MCP 服务器得分始终为 0 的严重 Bug。
    *   **状态**：Open (PR #1742, Issue #1390)
    *   **链接**：[PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390)
5.  **frontend-design / web-artifacts-builder (前端开发)**
    *   **功能/热点**：提升前端代码生成质量与构建工具兼容性。PR #210 旨在提高 Skill 的可操作性；Issue #1362 指出构建脚本在 pnpm ≥10.1 下失败。
    *   **状态**：Open (PR #210, Issue #1362)
    *   **链接**：[PR #210](https://github.com/anthropics/skills/pull/210), [Issue #1362](https://github.com/anthropics/skills/issues/1362)
6.  **security-safeguards (安全守护)**
    *   **功能/热点**：响应社区对信任边界的高度关注。Issue #492 揭示了社区 Skill 伪装成官方命名空间的信任滥用风险；PR #1776 提出 `blast-radius` Skill 用于在批量破坏性写入前进行安全检查。
    *   **状态**：Open (Issue #492, PR #1776)
    *   **链接**：[Issue #492](https://github.com/anthropics/skills/issues/492), [PR #1776](https://github.com/anthropics/skills/pull/1776)

### 2. 社区需求趋势
从 Issues 数据提炼，社区最期待的新 Skill 方向集中在**Agent 生命周期管理与质量保障**：

*   **组织级协作共享**：Issue #228 强烈呼吁在 Claude.ai 中实现组织范围内的 Skill 共享，减少手动上传 `.skill` 文件的繁琐流程。
*   **Agent 状态与治理**：Issue #1329 提出 `compact-memory` Skill 以符号化压缩长期 Agent 状态；Issue #412 提议 `agent-governance` Skill 用于策略执行与信任评分。
*   **推理质量门禁**：Issue #1385 提出三阶段推理质量门禁管道（校准、对抗审查、交付验证），以解决 AI 输出的稳定性问题。
*   **文档格式标准化**：除 Word 外，社区积极扩展 ODT 支持（PR #486）及 Markdown 到视频的转化（PR #1703），强调文档生成的排版质量控制（PR #514）。

### 3. 高潜力待合并 Skills
以下 PR 活跃度较高且功能明确，近期落地概率大：

*   **md2video-audio**：将 Markdown 编译为带语音的 MP4，低成本实现多媒体生成。 [PR #1703](https://github.com/anthropics/skills/pull/1703)
*   **testing-patterns**：覆盖单元测试、React 组件测试等全流程测试哲学，填补代码生成后的验证空白。 [PR #723](https://github.com/anthropics/skills/pull/723)
*   **AWT (AI Watch Tester)**：提供零代码 E2E 测试生成与浏览器控制，结合视觉能力自动运行测试。 [PR #822](https://github.com/anthropics/skills/pull/822)
*   **scnet-hpc**：针对高性能计算集群的 SSH 与 Slurm 工作流操作，满足科研与算力密集型用户需求。 [PR #1615](https://github.com/anthropics/skills/pull/1615)

### 4. Skills 生态洞察
当前社区在 Skills 层面最集中的诉求是**构建可信、安全且资源高效的 Agent 执行环境**，重点在于消除信任边界滥用（如命名空间冒充）、修复评估工具的可靠性（如 0% 触发率、0 分 Bug）以及优化上下文窗口管理（防止单 Skill 注入过量 Token）。

---

### 2026-10-05 Claude Code 社区动态日报

#### 1. 今日速览
过去 24 小时内，Claude Code 社区焦点集中在**长上下文稳定性**与**Windows/桌面端集成缺陷**。最高热度 Issue（#67609）揭示了 `claude-fable-5` 模型在 100K+ tokens 场景下 Advisor 工具失效的严重 Bug，获得 45 个点赞。此外，Windows MSIX 安装模式的进程生命周期管理问题及桌面应用多会话并发缺陷成为用户投诉的集中爆发点。

#### 2. 版本发布
*（过去 24 小时无新 Release）*

#### 3. 社区热点 Issues
以下 10 个 Issue 按社区关注度（点赞数、评论数）及影响范围筛选：

1.  **[高优 Bug] 长上下文导致 Advisor 工具失效**
    *   在 `claude-fable-5` 模型中，当对话记录超过约 100K tokens 时，服务端 `advisor` 工具返回 `unavailable` 错误，导致长会话核心功能瘫痪。
    *   社区反应强烈（45 👍, 27 评论），确认低于该阈值时功能正常。
    *   [Issue #67609](https://github.com/anthropics/claude-code/issues/67609)

2.  **[稳定性] Windows MSIX 更新导致会话阻断**
    *   `git fsmonitor--daemon` 进程继承 AppX 容器 Job，在强制关闭旧版本时未被清理，导致新版本启动失败（错误码 0x80070020）。提供了无需重启电脑的临时解决方案。
    *   [Issue #91763](https://github.com/anthropics/claude-code/issues/91763)

3.  **[逻辑缺陷] 外部文件变更提示误报**
    *   系统通知声称文件由“用户或 linter”变更，但无法验证真实性，模型将此作为事实传递给 LLM，可能误导代理决策。
    *   [Issue #71585](https://github.com/anthropics/claude-code/issues/71585)

4.  **[数据丢失] 桌面版更新重启丢失会话**
    *   桌面应用更新后的“静默重启”机制恢复了窗口但未恢复正在运行的会话，导致工作状态丢失。被标记为关联 8 个缺陷的核心问题。
    *   [Issue #90867](https://github.com/anthropics/claude-code/issues/90867)

5.  **[并发问题] Windows OAuth 刷新竞态条件**
    *   在 Windows 文件凭证存储模式下，多进程并发刷新 OAuth token 导致 400 错误，强制用户重新登录。主要影响 VSCode 扩展及多开场景。
    *   [Issue #91708](https://github.com/anthropics/claude-code/issues/91708)

6.  **[MCP 缺陷] Remote HTTP MCP 表单交互失败**
    *   Streamable HTTP MCP 的 `Elicitation` 交互无法到达客户端，既无弹窗也无 Hook 触发，导致服务端超时。
    *   [Issue #85442](https://github.com/anthropics/claude-code/issues/85442)

7.  **[插件缺陷] code-review 插件静默退出**
    *   在 `claude-code-action` CI 环境中，code-review 插件的资格检查作为后台代理启动后，会话在回合结束时终止，导致审查未执行。
    *   [Issue #85275](https://github.com/anthropics/claude-code/issues/85275)

8.  **[UI 缺陷] 桌面版 AbovePrompt 显示异常**
    *   并排打开两个聊天时，Mod 的 `AbovePrompt` 条仅在一个聊天中绘制，另一个不显示。
    *   [Issue #99265](https://github.com/anthropics/claude-code/issues/99265)

9.  **[核心逻辑] Worktree 隔离路径绑定错误**
    *   Agent 工具使用 `isolation: 'worktree'` 时，基准仓库绑定的是调用方当前的 Bash 工作目录，而非目标仓库，导致上下文隔离失效。
    *   [Issue #85448](https://github.com/anthropics/claude-code/issues/85448)

10. **[性能/内存] macOS 桌面版内存耗尽卡死**
    *   在低可用内存下，主进程因 `WarmLifecycle` 持续生成子会话且缺乏内存背压机制而硬卡死。
    *   [Issue #85104](https://github.com/anthropics/claude-code/issues/85104)

#### 4. 重要 PR 进展
当前过去 24 小时内更新的 PR 数量较少，重点关注以下有效进展：

1.  **[功能] 支持全局 Hookify 规则**
    *   允许从 `~/.claude/` 加载全局 Hook 规则，实现跨项目统一配置，简化多项目开发环境。
    *   [PR #40572](https://github.com/anthropics/claude-code/pull/40572)

2.  **[修复] PR Review Toolkit YAML 格式修复**
    *   修复 `pr-review-toolkit` 中所有 Agent 的 YAML frontmatter 语法错误（未加引号的标量包含对话行），此前导致 Agent 加载时描述为空。
    *   [PR #87077](https://github.com/anthropics/claude-code/pull/87077)

*(注：PR #1 为历史遗留的安全文档创建，无实质技术影响)*

#### 5. 功能需求趋势
*   **IDE/桌面端体验优化**：大量 Issue 集中在 VSCode 扩展与桌面 App 的会话状态同步、内存管理及多窗口 UI 渲染（如 #90867, #85281, #85146）。
*   **Windows 平台稳定性**：MSIX 安装包的进程生命周期、OAuth 并发竞争及 Chrome Extension 文件锁问题成为 Windows 用户主要痛点。
*   **长上下文与记忆管理**：100K+ tokens 场景下的工具可用性（Advisor）及 `/rewind` 后的状态水化问题受到关注。
*   **MCP 协议健壮性**：Remote MCP 的表单交互、缓存清理及错误处理机制存在多处边界 Bug。

#### 6. 开发者关注点
*   **高频痛点**：**会话持久化**与**多并发安全**。用户在更新、重启或多开场景下频繁遭遇会话丢失或认证竞态失败。
*   **UI/UX 一致性**：VSCode 扩展中 Extended Thinking 不再折叠、焦点框颜色被误解为错误状态等细节影响使用体验。
*   **代理（Agent）隔离准确性**：Worktree 隔离路径绑定错误及子代理（Subagent）在模型拒绝/过载时的非预期终止/重复执行，影响了复杂工作流的可靠性。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-10-05）

## 1. 今日速览
今日 Codex 社区活跃度极高，过去24小时内更新了49条Issue和17个PR，主要焦点集中在 **Windows 平台稳定性修复**（沙盒ACL、Daemon启动）以及 **安全沙盒机制优化**。新版本 `rust-v0.162.0-alpha` 系列连续发布，表明 Rust 重写分支正在加速迭代。

## 2. 版本发布
- **rust-v0.162.0-alpha.13 & alpha.12**：发布 Rust 核心版本的 Alpha 迭代。主要包含底层稳定性修复与功能增强，为正式版 0.162.0 做铺垫。
  - 链接：[Rust Alpha Releases](https://github.com/openai/codex/releases)

## 3. 社区热点 Issues
以下 Issue 因高评论数、高👍数或涉及核心痛点被重点标记：

1.  **[#49532] 请求恢复 Codex App 中的分支选择功能**
    *   **重要性**：高👍数（69），用户强烈要求在 UI 中直接选择 Git 分支。
    *   **社区反应**：创建至今近一周，36条评论，显示该UI缺失对开发流阻断严重。
    *   [查看 Issue](https://github.com/openai/codex/issues/49532)

2.  **[#29639] Windows + WSL 工作区下 Browser Use/Node REPL 故障**
    *   **重要性**：跨平台痛点。WSL 映射问题导致 `sandboxCwd` 未映射，Node REPL 调用失败。
    *   **社区反应**：27条评论，Windows 桌面用户结合 WSL 是高频使用场景。
    *   [查看 Issue](https://github.com/openai/codex/issues/29639)

3.  **[#49834] VS Code 扩展 JSON 解析错误（Send-lock 释放）**
    *   **重要性**：VS Code 扩展核心通信机制 Bug，导致消息发送后状态锁死。
    *   **社区反应**：24条评论，Linux 用户反馈较多，影响扩展可用性。
    *   [查看 Issue](https://github.com/openai/codex/issues/49834)

4.  **[#49488] Windows 桌面端缺乏 Browser/Desktop 工具支持**
    *   **重要性**：Windows 版 Codex App 在 MCP 启动失败后无法降级，Computer Use 功能不可用。
    *   **社区反应**：24条评论，涉及 Windows 用户无法使用视觉/桌面操作能力的核心功能缺失。
    *   [查看 Issue](https://github.com/openai/codex/issues/49488)

5.  **[#33483] 迁移至新 ChatGPT App 后桌面卡死/崩溃**
    *   **重要性**：性能与稳定性严重问题，新架构导致 Windows 桌面冻结。
    *   **社区反应**：17条评论，老用户迁移痛点，6️⃣高👍。
    *   [查看 Issue](https://github.com/openai/codex/issues/33483)

6.  **[#49264] Windows CLI 每次命令生成新终端窗口（回归问题）**
    *   **重要性**：近期回归 Bug，`codex` 命令在 Windows Terminal 中闪烁新窗口，干扰视觉体验。
    *   **社区反应**：16条评论，7️⃣高👍，已标记为回归。
    *   [查看 Issue](https://github.com/openai/codex/issues/49264)

7.  **[#20489] 增加屏幕阅读器友好的 TUI 模式**
    *   **重要性**：无障碍功能（Accessibility）需求，当前 TUI 对 VoiceOver 等工具不友好。
    *   **社区反应**：11条评论，开发者社区对包容性设计的关注。
    *   [查看 Issue](https://github.com/openai/codex/issues/20483)

8.  **[#49873] Dot 安全暂停状态不同步（Safety-pause Desync）**
    *   **重要性**：严重安全/逻辑 Bug。用户手动暂停后，自治执行仍继续，且恢复控制被阻止。
    *   **社区反应**：10条评论，涉及 Pro 订阅用户，安全审计风险。
    *   [查看 Issue](https://github.com/openai/codex/issues/49873)

9.  **[#39851] Windows 版无法使用方向键滚动对话**
    *   **重要性**：基础交互体验缺失。Windows 桌面端对话区不支持键盘滚动。
    *   **社区反应**：8条评论，6️⃣高👍，长期存在的基础 UI Bug。
    *   [查看 Issue](https://github.com/openai/codex/issues/39851)

10. **[#40885] MCP OAuth 验证逻辑错误导致合规服务器被拒**
    *   **重要性**：MCP 生态兼容性 Bug。ISS 提取逻辑错误，导致符合 RFC 9728 的服务器无法登录。
    *   **社区反应**：6条评论，12️⃣高👍，影响企业级 MCP 集成。
    *   [查看 Issue](https://github.com/openai/codex/issues/40885)

## 4. 重要 PR 进展
以下 PR 均处于 **CLOSED (Merged)** 状态，代表了最新代码变更：

1.  **[#50940] 安全恢复 Windows 恶意 Deny-read ACL 状态**
    *   **内容**：修复 `deny_read_acl_state.json` 损坏时的恢复逻辑，避免误删未知限制。
    *   [查看 PR](https://github.com/openai/codex/pull/50940)

2.  **[#50962] 通过 Feature Flag 控制稳定环境工具暴露**
    *   **内容**：新增 `stable_environment_tools` 开关，允许在 Executor 就绪前广告环境工具（如 shell），提高响应速度。
    *   [查看 PR](https://github.com/openai/codex/pull/50962)

3.  **[#50802] Windows Daemon Junction 更新失败时回退至 mklink**
    *   **内容**：当 Windows 策略拒绝原进程修改 Reparse Point 时，回退使用 `cmd.exe mklink /J`，增强 Daemon 发布鲁棒性。
    *   [查看 PR](https://github.com/openai/codex/pull/50802)

4.  **[#50782] 重试 Windows Daemon 发布以应对临时文件锁**
    *   **内容**：解决杀毒软件或文件扫描器持有文件句柄导致的重命名失败，增加重试机制。
    *   [查看 PR](https://github.com/openai/codex/pull/50782)

5.  **[#50803] 远程启动时优先使用托管 Daemon**
    *   **内容**：优化 `codex remote-control` 启动逻辑，自动复用或启动托管 Daemon，仅在不可用时回退到前台服务。
    *   [查看 PR](https://github.com/openai/codex/pull/50803)

6.  **[#50913] TUI 新会话使用服务器默认模型配置**
    *   **内容**：修复 TUI 连接 App Server 时，新会话使用本地过期模型配置而非服务器最新配置的问题。
    *   [查看 PR](https://github.com/openai/codex/pull/50913)

7.  **[#50786] 记忆 Command Center 分组设置**
    *   **内容**：TUI 的 Agent Overview 分组方式（如按项目/按类型）现在会持久化到用户配置，重启后不再重置。
    *   [查看 PR](https://github.com/openai/codex/pull/50786)

8.  **[#50764] 允许在回合运行中执行 `/archive`**
    *   **内容**：解锁 `/archive` 命令在 Agent 执行任务时的可用性，允许用户归档当前会话并停止任务。
    *   [查看 PR](https://github.com/openai/codex/pull/50764)

9.  **[#50943] 在 Turn Analytics 中追踪工具变更次数**
    *   **内容**：增加 `tools_change_count` 指标，用于后端分析会话中工具列表变更频率，优化推理链路监控。
    *   [查看 PR](https://github.com/openai/codex/pull/50943)

10. **[#50788] Vim 普通模式下空草稿直接呼出斜杠命令**
    *   **内容**：优化 TUI 编辑器体验，在 Vim Normal 模式下按 `/` 直接打开命令菜单，而非进入搜索。
    *   [查看 PR](https://github.com/openai/codex/pull/50788)

## 5. 功能需求趋势
基于 Issue 标签与内容分析，社区最关注的功能方向包括：

*   **跨平台一致性（Windows/WSL 重点）**：大量 Bug 集中在 Windows 桌面端与 WSL 交互、Windows 沙盒权限（ACL）及 Daemon 管理。用户强烈期望 Windows 体验能追平 macOS。
*   **MCP 生态系统成熟度**：除了 OAuth 兼容性问题（#40885），用户关注 MCP 工具的加载时序、错误恢复及与 Computer Use 的联动（#49488）。
*   **UI/UX 精细化控制**：包括 Git 分支选择（#49532）、TUI 无障碍支持（#20489）、以及 TUI 配置持久化（#50786）。
*   **安全与自治边界**：用户对 Agent 的“暂停/恢复”控制权（Safety-pause）非常敏感，希望更透明的授权机制（#49873, #50769）。

## 6. 开发者关注点
*   **Windows 稳定性是最大痛点**：超过 40% 的高热度 Issue 涉及 Windows 平台（桌面端崩溃、CLI 窗口闪烁、沙盒 ACL 失败、Daemon 启动失败）。开发者反馈 Windows 版本在资源占用和后台进程管理上存在显著回归。
*   **VS Code 扩展通信可靠性**：JSON 解析错误和锁机制问题（#49834, #50914）导致用户在 VS Code 中体验中断，尤其是快速连续提问时。
*   **配额与订阅管理困惑**：Pro/Plus 降级后的配额重置逻辑（#26763）及 Usage 显示不一致（#34865）引发用户不满，希望更清晰的配额重置提示。
*   **Rust 核心重构进度**：Alpha 版本的快速迭代表明团队正在大力投入 Rust 重写，社区期待正式版（0.162.0）带来的性能提升与二进制体积缩减。

</details>