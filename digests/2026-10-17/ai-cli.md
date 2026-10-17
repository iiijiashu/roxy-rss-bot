# AI CLI 工具社区动态日报 2026-10-17

> 生成时间: 2026-10-17 00:20 UTC | 覆盖工具: 2 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

**1. 生态全景**
当前 AI CLI 工具生态正从单一线程的编码辅助向多 Agent 协作与深层系统集成加速演进。社区痛点高度集中在 Windows 平台的工程适配（如沙盒机制、存储管理）以及跨环境资源传输的效率优化。头部工具均在强化 MCP 协议支持与会话状态一致性，致力于解决长任务中断、上下文丢失及底层资源耗尽等稳定性难题。

**2. 各工具活跃度对比**

| 工具 | Issues 数 | PR 数 | Release 情况 |
| :--- | :---: | :---: | :--- |
| Claude Code | 10 | 0 | 1 个 (v2.1.302) |
| OpenAI Codex | 10 | 10 | 2 个 Alpha (rust-v0.164.0-alpha.x) |

*注：数量基于提供的 2026-10-17 摘要数据，未包含摘要之外的动态。*

**3. 共同关注的功能方向**

*   **Windows 平台深度适配与稳定性**：两家工具的社区均将 Windows 作为核心痛点。Claude Code 集中于解决 `.vhdx` 存储配置、非 ASCII 路径及环境继承问题；Codex 则聚焦于沙盒策略引擎（execpolicy）误报、BitLocker 锁定及系统级资源（Git 进程）耗尽问题。
*   **会话与状态管理可靠性**：多平台用户面临长任务中断风险。Claude Code 出现会话 ID 变更导致分裂及压缩后 Skill 清单丢失；Codex 面临审批流状态不一致及 Web 端 409 离线故障，均要求强化底层状态同步机制。
*   **资源效率与 Token 优化**：双方社区均对成本与性能极度敏感。Claude Code 关注缓存 TTL 错误导致的 API 费用异常；Codex 则通过跨环境文件透传（Zero-Context Transfer）技术，在不注入 LLM 上下文的前提下优化大文件传输效率。

**4. 差异化定位分析**

| 维度 | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **功能侧重** | 偏向 IDE/CLI 深度集成、多 Agent 协作调度与自动模式模型配置。 | 偏向跨环境沙盒隔离、MCP 协议动态发现及前端 TUI 交互解耦。 |
| **技术路线** | 核心在应用层逻辑，如 `CLAUDE_CODE_AUTO_MODE_MODEL` 引入与 Agent 轮次调度增强。 | 核心在底层基础设施，包括 Rust 引擎多线程 Store 状态机优化与 Bazel CI/CD 重构。 |
| **目标用户** | 侧重复杂多 Agent 工作流及需要精细控制自动分类器的工程团队。 | 侧重高频读写、长生命周期会话及面临企业级合规（如卸载清理、NFS 锁）的重度开发者。 |

**5. 社区热度与成熟度**

*   **成熟度对比**：Claude Code 版本（v2.1.302）已高度成熟，社区反馈多集中于边角逻辑（如 grep 漏检）与商业订阅（计费透明度）；Codex 处于快速重构的 Alpha 阶段，高频发布带来显著的回归风险（如功能缺失、UI 回退），社区对“以牺牲稳定性换取新功能”的负面情绪较高。
*   **社区活跃度**：Codex 在工程级 PR 层面的活跃度极高，单日合并了 10 个核心基础设施类 PR；Claude Code 则展现出更高的用户层参与度，单 Issue 讨论量极大（如 Windows 项目消失问题达 65 条评论），反映出庞大的终端开发者基数。

**6. 值得关注的趋势信号**

*   **MCP 协议的运行时化**：工具正将 MCP 从静态接口扩展为支持动态工具发现与元数据保留的运行时系统，这将成为未来 AI 工具链的标准扩展协议。
*   **零上下文文件传输（Zero-Context Transfer）**：开发者通过绕过 LLM 直接进行沙盒间文件透传，有效规避了 Token 成本，预示底层工具链正寻求 LLM 与非 LLM 任务执行路径的物理解耦。
*   **工程底层的健壮性回归**：社区不再仅关注代码生成质量，而是开始倒逼工具提供方修复诸如 NFS 锁残留、数千个 Git 进程资源耗尽等底层系统级灾难，AI CLI 工具正进入“企业级可观测性与状态机管理”的深水区。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-17）

## 1. 热门 Skills 排行

以下条目按评论数排序展示前20条热门 PR。由于数据中 PR 评论数均为 undefined，以下排行基于 Issues 及 PR 的更新频率、创建时间与主题显著性进行综合评估。

| 排名 | PR | 状态 | 创建/更新时间 | 核心功能 | 社区讨论热点 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [PR #1742](https://github.com/anthropics/skills/pull/1742) fix(mcp-builder): 支持 mcp>=2 导入及自定义头 | OPEN | 2026-09-08 / 2026-10-08 | 修复 MCP Builder 在新版 MCP 下的客户端导入及自定义 HTTP 头配置问题 | 涉及 MCP 工具链兼容性与升级痛点，关联 Issue #1668，关注 MCP 生态演进 |
| 2 | [PR #1961](https://github.com/anthropics/skills/pull/1961) skill-creator: 加固 Eval 查看器 | OPEN | 2026-10-03 / 2026-10-11 | 修复 Skill 评估查看器中脚本逃逸、DNS 重绑定和跨站点 POST 等安全漏洞 | 针对 `skill-creator` 工具的安全性加固，体现社区对本地运行工具的安全关注 |
| 3 | [PR #2039](https://github.com/anthropics/skills/pull/2039) harness SDD 套件：规范驱动开发 | OPEN | 2026-10-16 / 2026-10-16 | 提供 3 个过程性 Skills，涵盖规范驱动开发、分发纪律和对抗性审查 | 引入多智能体“harness”方法论，关注复杂工作流的结构化与可审查性 |
| 4 | [PR #1734](https://github.com/anthropics/skills/pull/1734) 检测孤立 docx 评论 | OPEN | 2026-09-06 / 2026-09-25 | 在 Word 文档生成中检测并处理孤立的 docx 评论 | 文档处理精细度提升，解决 AI 生成文档中常见的注释残留问题 |
| 5 | [PR #2004](https://github.com/anthropics/skills/pull/2004) fix(slack-gif-creator): 文本居中边界 | OPEN | 2026-10-12 / 2026-10-14 | 修复 GIF 生成时文本居中忽略了包围盒偏移的问题 | 多媒体（GIF）生成质量修复，确保视觉效果精准 |
| 6 | [PR #1792](https://github.com/anthropics/skills/pull/1792) fix(docx): 超时及输出验证 | OPEN | 2026-09-19 / 2026-09-25 | 修复 docx 处理中 LibreOffice 超时未报错及未校验输出文件的问题 | 文档自动化工具的鲁棒性增强，确保转换成功才报告完成 |
| 7 | [PR #1745](https://github.com/anthropics/skills/pull/1745) notion-spec-to-implementation | OPEN | 2026-06-02 / 2026-10-15 | 将 Notion 规范转化为可实施任务，支持进度跟踪 | 桥接产品规范与开发实施，适合敏捷开发团队 |
| 8 | [PR #1997](https://github.com/anthropics/skills/pull/1997) fix(skill-creator): YAML 解析修复 | OPEN | 2026-10-10 / 2026-10-13 | 修复 Skill 创建器中 YAML 元数据解析不一致的问题 | 基础工具链修复，确保 Skill 描述与评估时元数据一致 |

*注：PR #2039 和 PR #1961 均创建于 2026-10 月，属于极近期动态。PR #1742 更新时间最晚，表明持续跟进中。*

## 2. 社区需求趋势

基于 Issues 评论数排序（共16条，展示前15条），社区最期待的新 Skill 方向集中在以下三类：

*   **组织级共享与管理（高关注度）**
    *   [Issue #228](https://github.com/anthropics/skills/issues/228)：强烈呼吁支持组织内直接共享 Skills，无需手动下载/上传文件，当前需通过 Slack 传递 `.skill` 文件，流程繁琐。
    *   趋势：从“个人工具”向“团队协作资产”演进，对集中式 Skill 库的需求迫切。

*   **安全与信任边界（高频讨论）**
    *   [Issue #492](https://github.com/anthropics/skills/issues/492)（46条评论）：社区 Skill 滥用 `anthropic/` 命名空间，导致用户误以为官方背书而授予过高权限，造成信任边界漏洞。
    *   趋势：急需官方明确命名规范、权限分级及社区 Skill 的信任机制。

*   **工作流可靠性与开发纪律（过程性需求）**
    *   [Issue #1385](https://github.com/anthropics/skills/issues/1385)：提议“推理质量门禁流水线”，涵盖任务前校准、对抗性审查和交付验证，以系统性提升 AI 输出质量。
    *   [Issue #556](https://github.com/anthropics/skills/issues/556)（12条评论）：反映 `run_eval.py` 工具无法正确触发 Skill（0%触发率），暴露评估工具链的底层缺陷。
    *   趋势：社区不仅关注“能做什么”，更关注“如何可靠地做”及“如何评估质量”。

## 3. 高潜力待合并 Skills

以下 PR 虽未合并，但具备高关注度或解决关键痛点，可能近期落地：

*   **[PR #1742](https://github.com/anthropics/skills/pull/1742) fix(mcp-builder)**
    *   **理由**：解决 MCP 2.0+ 兼容性核心问题，直接影响大量 MCP 开发者工作流。更新时间达至 10 月 8 日，维持热度。
*   **[PR #2039](https://github.com/anthropics/skills/pull/2039) harness SDD 套件**
    *   **理由**：提供规范驱动开发（SDD）的结构化解决方案，填补多智能体工作流管理空白。虽提交时间为 10 月 16 日（极新），但配套 PR #2040 同日提交，显示系统性规划，落地意愿强烈。
*   **[PR #1961](https://github.com/anthropics/skills/pull/1961) skill-creator 安全加固**
    *   **理由**：针对官方核心工具链 `skill-creator` 的严重安全漏洞（XSS/逃逸），属于优先级极高的修复，预计较快合并。
*   **[PR #1245](https://github.com/anthropics/skills/pull/1245) notion-spec-to-implementation**
    *   **理由**：更新时间 10 月 15 日，处于活跃维护中。将产品规范转化为实施任务的技能符合“从设计到开发”的全链路自动化趋势。

## 4. Skills 生态洞察

> **当前社区在 Skills 层面最集中的诉求是：在提升 Skills 组织共享与协作效率的同时，建立清晰的安全信任边界与可靠性评估体系，以支撑从“个人实验”向“团队工程化”的成熟转变。**

---

# Claude Code 社区动态日报 (2026-10-17)

## 1. 今日速览
今日核心动态为 **v2.1.302** 的发布，主要引入了客户端自动模式模型选择变量及空闲压缩配置项。社区关注点高度集中在 **Windows 平台兼容性**（包括 Cowork VM 存储配置、非 ASCII 路径处理及环境继承问题）与 **Agent 会话管理**（跨会话消息限制、后台会话环境变量及子 Agent 轮次调度）的缺陷修复与功能增强。

## 2. 版本发布
**v2.1.302**
*   **新增功能**: 引入 `CLAUDE_CODE_AUTO_MODE_MODEL` 环境变量，允许用户指定客户端自动模式分类器使用的模型（不影响服务端自动模式）。
*   **配置优化**: 在 `/config` 界面新增 `Idle compaction` 行，支持用户关闭或重新开启空闲压缩功能。
*   *注：发布说明摘要显示不完整，具体变更细节以官方 Changelog 为准。*
[查看 Release](https://github.com/anthropics/claude-code/releases)

## 3. 社区热点 Issues
以下 Issues 按社区关注度（点赞/评论）及技术影响范围筛选：

1.  **[BUG] Max 订阅升级支付失败 (Issue #56281)**
    *   **重要性**: 涉及核心订阅业务，用户无法从 5x 升级至 20x，且客服响应滞后。
    *   **社区反应**: 30 条评论，9 个点赞，标签为 `[invalid]` 但仍持续发酵，反映出用户对计费透明度的焦虑。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/56281)

2.  **[FEATURE] 允许配置 Cowork VM 存储位置 (Issue #56089)**
    *   **重要性**: Windows 平台特性，当前 `.vhdx` 文件存储位置固定，限制了高级用户的磁盘管理需求。
    *   **社区反应**: 53 个点赞，12 条评论，是近期点赞数最高的功能请求之一。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/56089)

3.  **[BUG] 交互式会话缓存 TTL 错误 (Issue #101685)**
    *   **重要性**: 影响成本优化，交互式会话错误使用 5 分钟缓存而非 1 小时缓存，导致 API 调用成本异常升高。
    *   **社区反应**: 10 条评论，8 个点赞，复现条件明确（Team/Max 订阅，特定版本区间）。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/101685)

4.  **[BUG] Desktop Code 标签页轮次提前终止 (Issue #102132)**
    *   **重要性**: Windows 桌面端 UI 逻辑缺陷，`wrap_up` 工具在回复写入前结束轮次，导致用户体验断裂。
    *   **社区反应**: 8 条评论，4 个点赞，属于高频使用的桌面端核心交互路径。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/102132)

5.  **[FEATURE] 跨会话消息发送限制不可配置 (Issue #94000)**
    *   **重要性**: Agent 协作受限，硬编码的“10 次/人工输入”限制忽略了人工发起的消息，阻碍了复杂多 Agent 工作流。
    *   **社区反应**: 7 条评论，8 个点赞，标签涵盖 `[enhancement]` 和 `[agents]`。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/94000)

6.  **[BUG] 背景会话 ID 变更导致会话分裂 (Issue #87984)**
    *   **重要性**: 会话管理核心缺陷，后台化操作生成新 Session ID，导致 `--resume` 出现停滞的重复会话。
    *   **社区反应**: 6 条评论，标签包含 `[reproduced]`，严重影响长任务管理。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/87984)

7.  **[BUG] Worktree 隔离模式拒绝非 Git Bash 命令 (Issue #95122)**
    *   **重要性**: Linux/WSL 平台回归，2.1.272/2.1.273 版本中，隔离工作树错误地拒绝不包含 `git` 字样的安全 Bash 命令。
    *   **社区反应**: 5 条评论，标签 `[has repro]`，影响了开发者的自动化脚本执行。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/95122)

8.  **[BUG] VS Code 扩展忽略外部 @imports (Issue #99032)**
    *   **重要性**: IDE 集成差异，CLI 支持的项目外 `CLAUDE.md` 引用在 VS Code 扩展中失效，造成多平台行为不一致。
    *   **社区反应**: 4 条评论，2 个点赞，标签包含 `[regression]` 暗示近期版本引入。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/99032)

9.  **[BUG] 压缩后续会话丢失 Skill 清单 (Issue #82017)**
    *   **重要性**: 核心机制缺陷，自动压缩后模型无法感知已注册的 Skills，导致“路由失明”，只能看到增量变更。
    *   **社区反应**: 3 条评论，3 个点赞，影响多 Skill 项目的长期维护。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/82017)

10. **[BUG] Bash grep 因 .gitignore 通配符漏检文件 (Issue #102875)**
    *   **重要性**: 工具准确性，递归搜索因 `.gitignore` 以 `*` 开头而错误跳过非忽略文件，影响代码检索可靠性。
    *   **社区反应**: 2 条评论，标签 `[has repro]`，属于底层 Shell 快照逻辑问题。
    *   [查看 Issue](https://github.com/anthropics/claude-code/issues/102875)

## 4. 重要 PR 进展
**无**
过去 24 小时内无更新或合并的 Pull Requests。

## 5. 功能需求趋势
*   **Windows 平台深度适配**: 社区强烈要求解决 Windows 特有的存储管理（Cowork VHDX）、环境继承（Daemon 环境变量）及非 ASCII 路径处理问题。
*   **Agent 协作灵活性**: 针对多 Agent 场景，开发者希望解除跨会话消息硬限制，并解决后台子 Agent 的轮次调度停滞问题。
*   **IDE 与 CLI 行为一致性**: VS Code 扩展在配置加载（@imports）和 UI 交互（AskUserQuestion 乱码、轮次终止）上与 CLI 存在显著差异，社区期望统一行为模型。

## 6. 开发者关注点
*   **成本与透明度**: 缓存 TTL 错误（#101685）和订阅升级故障（#56281）是用户情绪最激烈的领域，直接关联 API 费用与订阅权益。
*   **会话状态管理**: 会话 ID 变更、后台化逻辑及 Skill 清单丢失（#87984, #82017）导致长任务中断或上下文混乱，是高级用户的主要痛点。
*   **模型安全与行为异常**: 多个被关闭的 Issue 涉及模型“拒绝执行”、“虚构系统警报”或“未授权使用高价模型”，反映了社区对模型行为边界及安全防护机制的信任危机。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-10-17）

## 1. 今日速览
今日 Codex 社区动态主要聚焦于 **Windows 桌面端稳定性** 与 **跨环境文件协作能力**。官方连续发布了 `rust-v0.164.0` 的两个 Alpha 版本，并合并了多个与 Bazel CI、MCP 协议及多环境文件传输相关的核心工程 PR。社区反馈中，Windows 平台下的沙盒机制误报、进程资源耗尽及 UI 组件回退问题成为主要痛点，而关于 Branch 选择功能缺失的呼声也再次在 Issue 区达到高热度。

## 2. 版本发布
- **rust-v0.164.0-alpha.2** & **rust-v0.164.0-alpha.1**
  - **概况**：Codex Rust 核心引擎在 24 小时内完成了两个 Alpha 版本的快速迭代。
  - **分析**：虽然本次数据源未提供详细的 Changelog，但结合今日合入的多个 Bazel CI 修复与多线程 Store 错误处理的 PR，预计本 Alpha 周期重点在于重构 CI/CD 基础设施、优化资源占用（针对 Git 进程膨胀问题），以及修复沙盒环境下的文件锁释放异常。
  - [Link to Releases](https://github.com/openai/codex/releases)

## 3. 社区热点 Issues
1. **[Bug] Windows 桌面更新后本地项目从侧边栏消失**
   - **重要性**：严重影响 Windows 桌面用户的基础使用体验，导致本地项目状态数据丢失。
   - **社区反应**：讨论热度极高（65 条回复），是当日数据源中关注度最高的 Issue。
   - [Issue #42739](https://github.com/openai/codex/issues/42739)
2. **[Enhancement] 恢复 Codex App 的分支（Branch）选择功能**
   - **重要性**：Git 分支管理的可用性是开发者在代码执行环境下的核心刚需。
   - **社区反应**：该诉求被大量老用户顶起（99 个点赞），显示近期版本更新中移除此功能是重大体验倒退。
   - [Issue #49532](https://github.com/openai/codex/issues/49532)
3. **[Bug] Windows execpolicy 策略对 PowerShell 脚本的误报**
   - **重要性**：Windows 沙盒策略引擎的误报直接导致自动化脚本无法执行，阻塞了 CLI 在 Windows 环境下的常规工作流。
   - **社区反应**：40 条讨论中大量用户提供了不同的触发用例（如包含无关 URL 的脚本）。
   - [Issue #40060](https://github.com/openai/codex/issues/40060)
4. **[Bug] Windows 更新后“无法加载工作区设置”阻塞新建会话**
   - **重要性**：桌面端状态同步失败的致命级 Bug，直接阻断用户开启任何新的对话或任务。
   - [Issue #51917](https://github.com/openai/codex/issues/51917)
5. **[Bug] 存在 BitLocker 锁定时 MXC 沙盒无法启动子进程**
   - **重要性**：Windows 企业级部署场景下的高频阻塞项，环境隔离过度导致了功能失效。
   - [Issue #50915](https://github.com/openai/codex/issues/50915)
6. **[Bug] Windows 桌面端文件处理工具失败（MXC 创建进程失败）**
   - **重要性**：重启后依旧报错的本地工具调用异常，导致复杂文件（如 Excel）任务流中断。
   - [Issue #52042](https://github.com/openai/codex/issues/52042)
7. **[Bug] Dots/Web 端 GitHub 审批卡片失效与重复授权**
   - **重要性**：Web 端云工作流的审批状态机异常，用户反复点击“Always allow”却持续被阻断。
   - [Issue #52503](https://github.com/openai/codex/issues/52503)
8. **[Bug] Windows 桌面端生成的文件链接无法下载/打开**
   - **重要性**：交互闭环断裂的长期未解 Bug，已持续数月（创建于 8 月初）。
   - [Issue #37193](https://github.com/openai/codex/issues/37193)
9. **[Bug] Codex app-server 狂刷 Git 进程导致系统耗尽**
   - **重要性**：资源管理缺陷引发的系统级灾难风险（导致 16GB 内存机器被拖垮），影响系统稳定性。
   - [Issue #53645](https://github.com/openai/codex/issues/53645)
10. **[Bug] macOS 桌面端 Work 审批提示“审批请求已失效”**
   - **重要性**：macOS 平台的审批流交互异常，Web 端正常但桌面端 100% 失败。
   - [Issue #53560](https://github.com/openai/codex/issues/53560)

## 4. 重要 PR 进展
1. **[Feature] 增加跨环境复制文件的扩展工具**
   - **说明**：新增 `multi_env_copy_file` 特性及底层扩展。通过非模型上下文透传，允许在不同沙盒环境间直接复制文件而不将内容传入 LLM，极大提升处理大文件的效率。
   - [PR #54674](https://github.com/openai/codex/pull/54674) / [PR #54741](https://github.com/openai/codex/pull/54741)
2. **[Bugfix] 修复临时目录清理异常导致的 NFS 锁残留**
   - **说明**：解决在移除临时目录前未关闭 arg0 锁文件的 Bug，防止在 NFS 网络文件系统中产生 `.nfs*` 残留文件。
   - [PR #54739](https://github.com/openai/codex/pull/54739)
3. **[Feature] 允许动态工具调用并行执行**
   - **说明**：为 `DynamicToolHandler` 启用并行处理能力，优化多工具并发响应时的排队等待时间，避免单个挂起的调用阻塞整个客户端。
   - [PR #54654](https://github.com/openai/codex/pull/54654)
4. **[Feature] 动态更新 MCP 工具列表**
   - **说明**：在对话轮次（turn）内动态响应 MCP 服务器发出的工具列表变更通知，使 Agent 能够立即发现并调用新暴露的工具。
   - [PR #54656](https://github.com/openai/codex/pull/54656)
5. **[Refactor] 完善线程存储（Thread-Store）的错误区分机制**
   - **说明**：细化 `ThreadStoreError` 状态，区分“可安全重试的瞬时失败”与“写入结果未知的危险状态”，将恢复决策权交还操作主逻辑，避免盲目重试。
   - [PR #54664](https://github.com/openai/codex/pull/54664)
6. **[Feature] 优化 TUI 会话绑定的后端机制**
   - **说明**：在 TUI 界面中强化对 fork 和 resume 操作的校验，确保会话选择与特定的后端隔离一致，防止跨后端误操作。
   - [PR #54681](https://github.com/openai/codex/pull/54681)
7. **[Infra] 统一 V8 及 Lint 任务的 Bazel CI 准备流程**
   - **说明**：重构内部工程基建，统一使用共享的 Bazel 准备 action 恢复缓存，并在 Voice 发布构建中接入 BuildBuddy 提升可观测性。
   - [PR #54672](https://github.com/openai/codex/pull/54672) / [PR #54737](https://github.com/openai/codex/pull/54737)
8. **[Bugfix] 修复 Windows 卸载时的配置清理逻辑**
   - **说明**：Windows 卸载时读取用户的 `config.toml`，根据偏好决定是否递归删除本地 Home 目录，避免误删用户自定义配置。
   - [PR #54708](https://github.com/openai/codex/pull/54708)
9. **[Feature] 改进 MCP OAuth 发现机制**
   - **说明**：优化了授权服务器的 Scope 发现逻辑，避免在 OAuth 认证时向资源方请求超出其实际需要的过宽权限。
   - [PR #54653](https://github.com/openai/codex/pull/54653)
10. **[Refactor] 支持斜杠命令前缀作为提示词标记**
    - **说明**：将 Shell 模式与斜杠命令输入解耦，允许在编辑器前端将 `/` 前缀展示为独立的提示词标记（Prompt Marker）而非可编辑的普通文本，增强交互体验。
    - [PR #54742](https://github.com/openai/codex/pull/54742)

## 5. 功能需求趋势
- **多环境文件透传（Zero-Context File Transfer）**：针对大文件的跨环境处理，社区倾向于使用不将文件内容注入 Context 的直接传输方案（详见新增的扩展工具 PR），以提升处理效率和减少 Token 消耗。
- **MCP 协议深度演进**：动态更新工具、细化授权取消原因、保留元数据（`_meta`）等趋势表明 Codex 正在试图将 MCP 从一个静态的接口工具集扩展为具备动态能力发现的运行时系统。
- **Windows 平台专项重构**：由于近期 Windows 端的 Issue 占比极高，社区迫切关注针对该平台的沙盒策略引擎（如 execpolicy 误报消除）及系统资源管理（如 Git 进程耗尽）。

## 6. 开发者关注点
- **沙盒策略的过度拦截（False Positives）**：Windows 平台上的沙盒机制对合法操作（如 PowerShell 脚本、BitLocker 锁定的无关卷、写入 stdin）存在较多误伤。开发者强烈要求提供更具操作可行性的报错说明及更精细的粒度控制（Granular Control）。
- **资源与状态管理的可靠性**：开发者反馈了多个引起系统级问题的 Bug（如数千个 Git 进程导致内存耗尽、进程锁未释放导致 NFS 残留），显示出工程底层在高频读写和长生命周期会话中的健壮性不足。
- **前端 UI 体验倒退的痛点**：开发者对核心基础功能（如 Branch 选择、侧边栏项目显示、生成文件链接的闭环）的缺失或异常极度敏感，认为当前桌面端（尤其是 Windows）的迭代正在以牺牲稳定性为代价换取新功能。
- **配额与审批流的状态一致性**：包括 Web 端“Always allow”不生效导致的重复审批、云历史加载失败（409 offline），以及 macOS 审批状态机报错，暴露了全局状态同步机制的断裂。

</details>