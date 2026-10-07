# AI CLI 工具社区动态日报 2026-10-07

> 生成时间: 2026-10-07 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

基于 2026-10-07 的社区动态摘要，以下是针对 Claude Code 和 OpenAI Codex 的横向对比分析报告。

### 1. 生态全景
当前 AI CLI 工具生态正从单纯的代码生成向**全链路工程化协作**快速演进，稳定性与平台兼容性成为核心竞争壁垒。两家头部工具均面临**Windows 平台进程管理与资源回收**的严峻挑战，暴露出跨平台执行环境一致性的技术短板。同时，**权限策略的灵活性**与**MCP 生态的扩展性**成为社区热议焦点，开发者更倾向于具备细粒度控制能力和开放协议支持的工具。此外，无障碍性（A11y）与多账户/企业身份管理需求正在上升，标志着 AI CLI 工具正逐步融入企业级 DevOps 工作流。

### 2. 各工具活跃度对比

| 维度 | Claude Code (Anthropic) | OpenAI Codex (OpenAI) |
| :--- | :--- | :--- |
| **Release 情况** | 发布 **2** 个版本 (v2.1.291, v2.1.292)，重点在于 Bug 修复与 Plugin/MCP 功能增强。 | 发布 **2** 个 Alpha 版本 (0.162.0-alpha.17, 0.161.0-alpha.13.1)，侧重 CI/CD 流水线构建与修复。 |
| **Issues 热度** | 热点集中在多账户支持 (#27302, 402赞)、Windows 进程泄漏、分类器僵化。 | 热点集中在 Windows 桌面端挂起/崩溃、沙箱权限、云端任务同步失败。 |
| **PR 动向** | 3 条重要进展，聚焦 UI 细节、Windows 钩子兼容性、安全指引隔离。 | 10 条重要进展，密集修复 Windows 沙箱、MCP 环境、TUI 热加载及性能优化。 |
| **主要痛点** | Windows Git 内存泄漏、Linux 进程树误杀、权限分类器误拦截。 | Windows 命令执行挂起、内置浏览器崩溃、沙箱临时目录权限回退。 |

### 3. 共同关注的功能方向
*   **Windows 平台稳定性与进程管理**：
    *   **Claude Code**：遭遇 Git 孤儿进程导致内存耗尽（#97752）、后台任务清理误杀进程树（#99768）。
    *   **OpenAI Codex**：遭遇本地命令执行无限挂起（#50725）、内置浏览器清理崩溃（#50799）、沙箱临时目录权限不一致（#51512）。
    *   *共性*：两工具在 Windows 下的子进程生命周期管理、资源回收及沙箱隔离机制均存在显著缺陷，是当前的最大稳定性短板。
*   **权限控制与沙箱透明度**：
    *   **Claude Code**：用户抱怨 Auto 模式分类器过于僵化，缺乏回退机制（#92279, #100091）。
    *   **OpenAI Codex**：用户遇到沙箱拒绝写入允许目录、SSH 配置权限错误（#9286）。
    *   *共性*：社区强烈要求提高权限策略的可调试性、可配置性，避免“黑盒”拒绝或误杀。
*   **MCP 生态的可靠性与扩展性**：
    *   **Claude Code**：MCP 会话重连时工具调用丢失（#83655）。
    *   **OpenAI Codex**：MCP 贡献者环境暴露增强（#51503），优化环境感知。
    *   *共性*：MCP 已成为标配协议，但会话状态一致性、错误重试机制及环境上下文传递仍是瓶颈。

### 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **功能侧重** | **插件化与企业连接**：强调 Plugin Marketplace 支持、多账户连接器（#27302），以及 Sub-agent 的 `effort` 参数控制。 | **桌面端体验与 IDE 集成**：强调 Windows 桌面端稳定性、内置浏览器交互、VS Code 文件拖拽（#3761）及任务置顶管理。 |
| **目标用户** | **重度开发者与企业团队**：关注多租户隔离、安全审查指引（#96434）、复杂工作流自动化。 | **全场景开发者（含桌面端）**：关注跨设备同步（Dot 任务）、本地执行环境稳定性、IDE 自然交互。 |
| **技术路线** | **CLI 核心 + 插件扩展**：通过 Marketplace 和 Sub-agent 灵活扩展能力，注重 TUI 交互细节（如 Diff 面板）。 | **Rust 重写 + 沙箱隔离**：底层使用 Rust 优化性能，强化沙箱权限细粒度控制，注重云端-本地混合工作流。 |

### 5. 社区热度与成熟度
*   **Claude Code**：
    *   **成熟度：高（功能层面），中（稳定性层面）**。
    *   社区反馈量大（如 #27302 获 402 赞），功能迭代迅速（两天内发布两个版本修复回归 Bug），但在 Windows 和 Linux 的底层进程管理上暴露出**快速迭代带来的稳定性债务**。其核心痛点已从功能缺失转向**精细化控制**（如分类器、Sub-agent 边界）。
*   **OpenAI Codex**：
    *   **成熟度：中（架构层面），低（平台适配层面）**。
    *   处于 Rust 重写与 Alpha 测试阶段，PR 密集修复底层权限和进程问题，显示出**架构重构期的阵痛**。Windows 桌面端崩溃和挂起问题频发，表明其**跨平台一致性**尚未达到生产级标准，但性能优化（如 #51499）和安全加固（#51483）正在快速推进。

### 6. 值得关注的趋势信号
1.  **“Windows 一等公民”不再是口号，而是痛点**：
    *   两大工具在 Windows 上均出现严重进程/沙箱问题。趋势显示，未来 AI CLI 工具的**跨平台抽象层**（如进程树管理、沙箱文件系统映射）将成为核心差异化竞争力。开发者在选择工具时，应重点评估其在本地 OS 上的资源回收机制。
2.  **权限策略从“阻断”转向“协商”**：
    *   Claude Code 社区对分类器“硬拒绝”的反感，预示了**可配置的安全护栏**将成为高端需求。未来工具需提供“拦截-询问-回退”的渐进式权限模型，而非非黑即白。
3.  **MCP 状态一致性成为协议扩展关键**：
    *   无论是 Claude Code 的会话重连丢失，还是 Codex 的环境暴露，都表明 MCP 的**会话状态管理**（Session State Management）是下一阶段协议标准化的重点。开发者需关注 MCP 工具调用是否具备幂等性和重试能力。
4.  **云端-本地混合工作流的断裂点**：
    *   Codex 的 Dot 任务恢复失败和附件读取错误，以及 Claude Code 的多账户隔离需求，表明**身份与状态在云端的持久化**是 DevOps 闭环的最后一公里。工具需解决“本地会话与云端身份”的映射一致性问题。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
数据截止：2026-10-07 | 数据源：github.com/anthropics/skills

### 1. 热门 Skills 排行 (关注度与讨论焦点)
基于提供的热门 Pull Requests 列表，虽然部分条目评论数缺失（undefined），但以下 6 个 PR 代表了对特定 Skill 功能改进或新增的高关注度动态：

*   **Skill-Creator (核心元技能)**
    *   **功能/讨论焦点**: 社区高度关注 `skill-creator` 的鲁棒性与安全加固。近期动态包括隔离触发评估、修复 Windows 运行时失败（[PR #1298](anthropics/skills/PR/1298)），以及加固评估查看器以防止脚本逃逸、DNS 重绑定和 XSS 攻击（[PR #1961](anthropics/skills/PR/1961)）。
    *   **状态**: Open
*   **Claude-API (核心 API 指南)**
    *   **功能/讨论焦点**: 修正文档死链问题，将硬 404 链接替换为已验证的规范 platform/academy URL（[PR #1730](anthropics/skills/PR/1730)）。该 Skill 也因在工具调用中过量注入 Token（约 156k）导致上下文窗口耗尽而引发社区争议（参考 [Issue #1487](anthropics/skills/Issue/1487)）。
    *   **状态**: Open
*   **MCP-Builder (MCP 工具构建)**
    *   **功能/讨论焦点**: 修复对 `mcp>=2.0.0` 版本 API 变动的兼容性支持，特别是更新 `streamable_http_client` 导入及自定义 Header 的传入方式（[PR #1742](anthropics/skills/PR/1742)）。
    *   **状态**: Open
*   **Webapp-Testing (前端 E2E 测试)**
    *   **功能/讨论焦点**: 强化安全性，解决脚本中 `subprocess.Popen` 使用 `shell=True` 导致的命令注入风险（CWE-78）（[PR #1980](anthropics/skills/PR/1980)）。
    *   **状态**: Open
*   **Docx (文档处理)**
    *   **功能/讨论焦点**: 提升可靠性与检测能力。包括将 LibreOffice 的超时错误明确抛出，并在输出 DOCX 中验证是否遗留修订标记（`w:ins` 等）（[PR #1792](anthropics/skills/PR/1792)），以及检测孤立的 docx 评论（[PR #1734](anthropics/skills/PR/1734)）。
    *   **状态**: Open
*   **Blast-Radius (破坏性操作安全)**
    *   **功能/讨论焦点**: 新增的预执行检查 Skill，针对大规模数据写入、访问权限撤销或批量删除等破坏性操作提供安全检查清单（[PR #1776](anthropics/skills/PR/1776)）。
    *   **状态**: Open

### 2. 社区需求趋势 (基于 Issues)
社区目前在 Skill 层面最期待的演进方向集中在**系统安全防御**、**上下文效率**与**企业级协作**：
*   **安全与信任边界**: 强烈呼吁防范社区 Skill 假冒官方 `anthropic/` 命名空间带来的信任边界滥用（[Issue #492](anthropics/skills/Issue/492)），并提出了 AI 智能体系统治理（Agent Governance）的需求（[Issue #412](anthropics/skills/Issue/412)）。
*   **上下文效率 (Token 经济学)**: 针对大型 Skill（如 `claude-api`）一次性耗尽上下文窗口的痛点，社区提出了利用符号化表示压缩智能体内部状态的新 Skill 构想（[Issue #1329](anthropics/skills/Issue/1329)）。
*   **企业工作流自动化与分发**: 寻求在 Claude.ai 中实现组织级别的 Skill 直接共享（免去文件互传），优化企业级协作（[Issue #228](anthropics/skills/Issue/228)）；同时关注在特定企业环境（如 SharePoint Online）中安全处理文档时的权限逻辑与上下文隔离（[Issue #1175](anthropics/skills/Issue/1175)）。

### 3. 高潜力待合并 Skills
（以下 PR 具有明确的修复/新增目标且处于 Open 状态，具备近期落地的潜力）
*   **MD2Video-Audio (内容多媒体生成)**: 将 Markdown 直接编译为带逼真人类配音的专业 MP4 视频的零成本 Skill（[PR #1703](anthropics/skills/PR/1703)）。
*   **ProofCore-Contract-Auditor (Web3 区块链审计)**: 针对 Solidity/Rust 智能合同进行自动化静态分析，并将加密审计证明锚定到 TON 区块链的 Skill（[PR #1771](anthropics/skills/PR/1771)）。
*   **Document-Typography (排版质量控制)**: 专门用于拦截 AI 生成文档中常见的排版缺陷（如孤行、孤儿段落、页眉悬挂），提升基础文档 Skill 的视觉输出质量（[PR #514](anthropics/skills/PR/514)）。
*   **Notion-Spec-to-Implementation (研发工作流)**: 将 Notion 产品规范自动转化为 Claude Code 可执行的具体实现计划与进度追踪任务（[PR #1245](anthropics/skills/PR/1245)）。

### 4. Skills 生态洞察
当前社区在 Skills 层面最集中的诉求是：**在扩展自动化工作流广度（多媒体/Web3/跨工具）的同时，必须补齐基础底层基础设施的“安全沙箱化”与“Token 消耗精准控制”短板。**

---

# Claude Code 社区动态日报 (2026-10-07)

### 1. 今日速览
今日 Anthropic 发布了 v2.1.291 和 v2.1.292 两个新版本，重点增强了 Plugin 系统的 Marketplace 支持及 Agent 工具的 `effort` 参数，并修复了云端会话和退出时的数据丢失回归 Bug。社区讨论热度主要集中在多账户连接器支持（#27302，402 赞）及 Windows 平台下的进程管理与内存泄漏问题上。

### 2. 版本发布

**v2.1.292**
*   **功能增强**：
    *   在 `claude plugin install` 中新增 `--marketplace <source>` 参数。该功能允许在安装插件时自动添加必要的 Marketplace，遵循与 `claude plugin marketplace add` 相同的策略检查。
    *   为 Agent 工具新增 `effort` 参数，允许 Claude 在指定的努力程度下运行子代理。
*   **链接**: [anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases)

**v2.1.291**
*   **Bug 修复**：
    *   修复了 v2.1.290 中云端会话可能丢失权限提示回答的回归问题。
    *   修复了 v2.1.288 中退出时可能丢失会话最后几条消息的回归问题。
*   **链接**: [anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases)

### 3. 社区热点 Issues

以下精选 10 个值得关注的 Issue，依据热度、影响范围及反馈数量排序：

1.  **支持多 Connector 账户**
    *   **摘要**: 请求在 Web 版 Claude Code 中支持同一 Connector 下的不同账户。
    *   **重要性**: 社区投票极高（402 👍），是长期高热度功能请求，影响企业多团队或开发/测试环境隔离场景。
    *   **链接**: [anthropics/claude-code Issue #27302](https://github.com/anthropics/claude-code/issues/27302)

2.  **Windows 后台任务清理误杀进程树**
    *   **摘要**: 低内存停止后台任务后，`sudo kill` 终止了整个宿主机的进程树而非目标进程组，导致数据丢失风险。
    *   **重要性**: 标记为 `high-priority` 和 `data-loss`，涉及系统安全性与稳定性，严重影响 Linux/WSL 用户。
    *   **链接**: [anthropics/claude-code Issue #99768](https://github.com/anthropics/claude-code/issues/99768)

3.  **Windows Git 进程内存泄漏**
    *   **摘要**: `git status` 超时后，Launcher 进程被终止但实际 Git 进程未结束，导致 `git.exe` 进程堆积直至内存耗尽。
    *   **重要性**: Windows 平台频发性能问题，影响长期运行会话的稳定性。
    *   **链接**: [anthropics/claude-code Issue #97752](https://github.com/anthropics/claude-code/issues/97752)

4.  **粘贴文本块不可见/不可编辑**
    *   **摘要**: macOS 下使用语音输入或大段粘贴时，内容显示为折叠块，无法在提交前编辑或查看具体文本。
    *   **重要性**: 显著影响 TUI 用户体验，尤其是长文本处理场景（288 👍）。
    *   **链接**: [anthropics/claude-code Issue #3412](https://github.com/anthropics/claude-code/issues/3412)

5.  **Auto 模式分类器误拦截**
    *   **摘要**: 请求允许分类器拦截后回退到权限询问，而非直接硬拒绝（hard deny），否则模型会建议用户手动执行命令，违背自动化初衷。
    *   **重要性**: 反映当前权限策略过于僵化，阻碍复杂命令的自动执行（6 👍，3 评论）。
    *   **链接**: [anthropics/claude-code Issue #92279](https://github.com/anthropics/claude-code/issues/92279)

6.  **Grep 工具静默忽略 .gitignore**
    *   **摘要**: Agent 在审计代码时，因 Grep 遵循 `.gitignore` 规则而找不到实际存在的文件，且无法区分“文件不存在”与“被忽略”。
    *   **重要性**: 导致 Agent 审计能力盲区，引发逻辑错误。
    *   **链接**: [anthropics/claude-code Issue #84161](https://github.com/anthropics/claude-code/issues/84161)

7.  **Worktree 在 Windows 上清理不安全**
    *   **摘要**: `git worktree remove --force` 在 Windows 上会破坏 NTFS Junction 目标，导致无法安全回收 vendor 创建的 worktree，造成磁盘空间浪费。
    *   **重要性**: Windows 用户特有的持久化资源泄漏问题。
    *   **链接**: [anthropics/claude-code Issue #84162](https://github.com/anthropics/claude-code/issues/84162)

8.  **桌面版屏幕阅读器无障碍性问题**
    *   **摘要**: Windows 桌面版 Code 选项卡的 Slash 命令菜单对 NVDA 等屏幕阅读器不可读。
    *   **重要性**: 无障碍性（A11y）合规性问题，影响残障开发者。
    *   **链接**: [anthropics/claude-code Issue #94353](https://github.com/anthropics/claude-code/issues/94353)

9.  **分类器干扰用户体验**
    *   **摘要**: 用户强烈要求提供禁用分类器（Classifier）的选项，称其“阻碍工作流程”。
    *   **重要性**: 反映当前版本默认安全策略对高级开发者的侵入性过强。
    *   **链接**: [anthropics/claude-code Issue #100091](https://github.com/anthropics/claude-code/issues/100091)

10. **MCP 工具调用在会话重初始化时丢失**
    *   **摘要**: Streamable-HTTP MCP Connector 会话过期重连时，期间发出的工具调用被静默丢弃，既未重试也未报错。
    *   **重要性**: 影响 MCP 生态的稳定性与可靠性。
    *   **链接**: [anthropics/claude-code Issue #83655](https://github.com/anthropics/claude-code/issues/83655)

### 4. 重要 PR 进展

*注：根据提供的数据，过去 24 小时内更新的 PR 共 3 条，以下列出全部重要进展。*

1.  **修复 Docked 模式下 Diff 面板头部空白行问题**
    *   **内容**: 调整了 `/diff` 面板在 Docked 模式下的布局逻辑，移除了头部上方多余的空行，使引擎保留的关闭标记行不再显示为空白。
    *   **状态**: Closed
    *   **链接**: [anthropics/claude-code PR #99206](https://github.com/anthropics/claude-code/pull/99206)

2.  **修复 Ralph-Wiggum 插件 Windows 停止钩子兼容性**
    *   **内容**: 修复了 `stop-hook.sh` 在 Windows/WSL 环境下因使用 `#!/bin/bash` shebang 导致无法执行的问题，增加了兼容性处理。
    *   **状态**: Closed
    *   **链接**: [anthropics/claude-code PR #19084](https://github.com/anthropics/claude-code/pull/19084)

3.  **安全指引：隔离被拒绝及敏感文件**
    *   **内容**: 增强 `security-guidance` 审查功能，确保被 `Read` 规则拒绝或已知的敏感文件（如 `.env`, keys）不进入审查子代理的上下文。审查子代理不再拥有 Shell 权限，防止敏感数据泄露。
    *   **状态**: Open
    *   **链接**: [anthropics/claude-code PR #96434](https://github.com/anthropics/claude-code/pull/96434)

### 5. 功能需求趋势

基于今日更新的 30 条 Issue，社区关注方向主要集中在以下领域：

*   **多账户与企业身份管理**: 强烈的需求希望支持同一 Connector 下的多账户切换（#27302），适用于 SaaS 多租户场景。
*   **权限控制的灵活性**: 社区普遍反映 Auto 模式下的分类器（Classifier）过于严格或僵化，用户希望能禁用或调整其拦截行为（#92279, #100091, #84182）。
*   **平台特异性稳定性 (Windows)**: 大量 Issue 集中在 Windows 平台，包括 Git 进程泄漏、Worktree 清理失败、Google Drive 虚拟盘写入失败等（#97752, #84162, #99503）。
*   **无障碍性 (A11y)**: 对屏幕阅读器支持的关注度上升，特别是桌面版和 TUI 中的交互元素（#94353, #3412）。

### 6. 开发者关注点

*   **进程管理与资源回收**: 开发者极度关注 Claude Code 在后台任务、Git 操作中的进程管理。Windows 下 Git 孤儿进程和 Linux 下错误的 `kill` 范围是主要的痛点。
*   **会话状态一致性**: 关于 CWD（当前工作目录）漂移、MCP 会话重连状态不同步、以及 Worktree 状态判断错误的报告频繁出现，影响了自动化流程的可靠性。
*   **UI/UX 细节**: 包括 Diff 面板布局、粘贴文本可见性、以及桌面版输入框尺寸限制等问题，虽非核心功能，但显著影响日常开发体验。
*   **Sub-agent 行为可控性**: 对于异步 Sub-agent 的状态报告（如 API 错误导致的状态误报）以及 `/simplify` 等工具的执行边界（是否会自动合并 PR）存在疑虑。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-10-07)

### 1. 今日速览
今日社区焦点集中在 **Windows 桌面端稳定性**与**沙箱权限管理**，多个关于 Windows 本地命令执行挂起、内置浏览器崩溃及附件读取失败的 Issue 获得高频更新。同时，CI/CD 流水线发布了 `0.162.0` 与 `0.161.0` 的 Alpha 版本，近期 PR 密集修复了 Windows 沙箱临时目录权限、TUI 设置热加载及 MCP 环境选择逻辑，旨在提升跨平台一致性。

### 2. 版本发布
*   **rust-v0.162.0-alpha.17**: 发布 `0.162.0-alpha.17` 版本，属于最新主线的 Alpha 测试构建。
*   **rust-v0.161.0-alpha.13.1**: 发布 `0.161.0-alpha.13.1` 版本，属于前序版本的修复性 Alpha 构建。

### 3. 社区热点 Issues
1.  **[Bug] Windows 本地命令执行挂起** ([#50725](https://github.com/openai/codex/issues/50725)): 用户在 Windows 桌面端执行极简 `cmd.exe` 命令时无限挂起，无法返回 stdout。此问题直接影响基础代码执行能力，社区反应强烈，需紧急排查子进程生成逻辑。
2.  **[Bug] Windows 桌面端持久化聊天故障** ([#50428](https://github.com/openai/codex/issues/50428)): 绑定 Windows 执行环境的持久化云端聊天在分叉或新回合时失败，错误指向 `AbsolutePathBuf` 反序列化缺少基路径，影响云端协同场景。
3.  **[Enhancement] 支持非图片文件拖拽** ([#3761](https://github.com/openai/codex/issues/3761)): 社区长期呼声最高的功能之一（👍 57），VS Code 扩展目前仅支持图片拖拽，用户强烈期待支持代码、文本等通用文件拖拽以提升交互效率。
4.  **[Bug] 统一执行环境启动失败** ([#40596](https://github.com/openai/codex/issues/40596)): Windows 桌面端启动 unified exec 时抛出 `helper_unknown_error: setup refresh had errors`，阻碍了标准工作流的运行。
5.  **[Bug] 内置浏览器权限验证失败** ([#48670](https://github.com/openai/codex/issues/48670)): 桌面端内置浏览器在 Agent 尝试读取/交互页面时，报告保存的浏览器权限无法验证，导致 Browser Use 功能失效。
6.  **[Bug] 云端任务无法恢复/创建** ([#50015](https://github.com/openai/codex/issues/50015)): 用户反馈 "Dot" 无法恢复或创建云端任务，但在原任务中直接消息正常，涉及云端任务状态管理与后端 API 交互问题。
7.  **[Bug] 附件读取权限错误** ([#50556](https://github.com/openai/codex/issues/50556)): Windows 11 24H2 桌面端在云端模式下无法读取上传的附件，报错 `os error 5` (拒绝访问)，影响文件协作核心功能。
8.  **[Bug] 浏览器嵌入清理崩溃** ([#50799](https://github.com/openai/codex/issues/50799)): 桌面应用在清理嵌入式浏览器时发生 `chrome.dll` 访问违规崩溃，属于严重的内存/生命周期管理缺陷。
9.  **[Bug] 沙箱 SSH 配置权限问题** ([#9286](https://github.com/openai/codex/issues/9286)): 在 Linux 沙箱内，`/etc/ssh/ssh_config.d` 归 `nobody` 所有，导致 `git push --dry-run` 失败，影响开发环境下的 Git 操作。
10. **[Bug] Astra 模型配置自动回退** ([#51514](https://github.com/openai/codex/issues/51514)): Windows 桌面端选择 Astra 模型后，尽管配置保存成功，界面仍立即回退到 Sol，表明配置同步或 UI 状态管理存在 Bug。

### 4. 重要 PR 进展
1.  **[Fix] 对齐 Windows 沙箱临时目录权限** ([#51512](https://github.com/openai/codex/pull/51512)): 解决 Windows 沙箱临时权限回退到宿主机 `TEMP`/`TMP` 的问题，确保沙箱权限与子进程环境严格一致，防止绕过只读限制。
2.  **[Fix] 修复 Windows 10 驱动器字母文件系统操作** ([#51511](https://github.com/openai/codex/pull/51511)): 处理 Windows 10 下严格原生打开操作拒绝 DOS 驱动器别名作为重解析点的问题，通过重试机制修复普通驱动器路径的文件系统操作。
3.  **[Feat] MCP 贡献者环境暴露** ([#51503](https://github.com/openai/codex/pull/51503)): 向 MCP 贡献者暴露完整的执行器选择，区分不可用的主执行器与就绪的次级执行器，增强 MCP 生态的环境感知能力。
4.  **[Perf] 单线程阻塞加载 Rollout 历史** ([#51499](https://github.com/openai/codex/pull/51499)): 将完整的 rollout 历史读取和解析移至单个阻塞 worker，优化 `.jsonl` 和 `.jsonl.zst` 文件的加载性能，并支持取消感知。
5.  **[Bug] 修复 Windows 10 驱动器字母文件系统操作** ([#51511](https://github.com/openai/codex/pull/51511)): 处理 Windows 10 下严格原生打开操作拒绝 DOS 驱动器别名作为重解析点的问题，通过重试机制修复普通驱动器路径的文件系统操作。
6.  **[Refactor] 清理持久化 Turn 上下文** ([#51492](https://github.com/openai/codex/pull/51492)): 移除 `TurnContextItem` 中过时的 `workspace_roots`、`timezone` 等字段，更新预计算协议 schema，减少持久化数据冗余。
7.  **[Feat] Agent 命令中心任务置顶** ([#51500](https://github.com/openai/codex/pull/51500)): 在 Agent 命令中心添加共享任务置顶功能，支持通过 `p` 键切换，并优先显示置顶任务，优化多任务管理体验。
8.  **[Fix] 保留 TUI 设置热加载失败时的状态** ([#51510](https://github.com/openai/codex/pull/51510)): 防止配置重载失败时，新线程使用过期的设置覆盖用户最新的本地 TUI 偏好，提升 TUI 稳定性。
9.  **[Security] 结构化 Rendezvous 连接诊断** ([#51483](https://github.com/openai/codex/pull/51483)): 添加无凭据的结构化诊断信息，避免在日志中暴露敏感的 WebSocket 错误负载，提升故障排查安全性。
10. **[Perf] 提升 Unix App-server 文件描述符限制** ([#51470](https://github.com/openai/codex/pull/51470)): 在启动时将托管 app-server 的软 `RLIMIT_NOFILE` 限制提升至 4096，防止因文件句柄不足导致的性能问题或崩溃。

### 5. 功能需求趋势
*   **IDE 交互增强**: 社区强烈渴望在 VS Code 等 IDE 中实现更自然的操作，如**非图片文件拖拽** (#3761)，简化上下文注入流程。
*   **Windows 平台一等公民支持**: 大量 Bug 集中在 Windows 桌面端（沙箱、浏览器、子进程），显示出 Windows 用户基数庞大，但平台适配（特别是沙箱隔离和进程管理）仍有巨大优化空间。
*   **MCP 生态扩展**: PR 中多次出现针对 MCP (Model Context Protocol) 贡献者的改进（如 #51503），表明开发者正致力于丰富 Codex 的上下文协议生态，使其能更好地与外部工具链交互。
*   **多设备同步与可见性**: 用户期望在跨设备场景下（如 Mac 与 Windows 之间）对 Dot 任务有更好的设备级可见性控制 (#49503)。

### 6. 开发者关注点
*   **沙箱权限细粒度化**: 开发者频繁遇到沙箱拒绝写入允许的工作区（如 exFAT SSD #51513）、SSH 配置权限问题 (#9286) 以及临时目录权限不一致 (#51512)。用户对沙箱的“透明性”和“可调试性”要求提高。
*   **Windows 进程模型稳定性**: 从命令挂起 (#50725) 到浏览器崩溃 (#50799)，Windows 下的进程生命周期管理是最大痛点，开发者亟需更稳定的本地执行环境。
*   **配置状态一致性**: 模型配置回退 (#51514) 和 TUI 设置丢失 (#51510) 反映出配置层与 UI/逻辑层的状态同步存在延迟或竞态条件，影响用户体验的可预测性。
*   **云端-本地混合工作流**: 云端任务创建/恢复失败 (#50015) 和附件读取错误 (#50556) 表明在混合云-本地模式下，数据同步和权限验证链路存在断裂，阻碍了完整的 DevOps 闭环。

</details>