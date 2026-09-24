# OpenClaw 生态日报 2026-09-24

> Issues: 5 | PRs: 50 | 覆盖项目: 2 个 | 生成时间: 2026-09-24 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-09-24)

## 1. 今日速览
过去24小时内，OpenClaw 项目保持极高活跃度，共新增/更新 5 个 Issue 和 50 个 Pull Request。当前面临的主要挑战是 macOS 客户端 v2026.9.6 版本发布后的严重启动崩溃问题（P0级），该问题已导致版本回滚并在紧急修复中。与此同时，核心 Gateway 的更新回滚机制、会话状态管理以及多通道（Telegram/WhatsApp）的重构工作正在密集推进，团队正努力平衡新功能迭代与底层稳定性。

## 2. 版本发布
### ⚠️ v2026.9.6 (紧急撤回/修复中)
- **状态**：已发布但被标记为**不建议更新**，macOS 应用已撤回 Sparkle 更新源。
- **严重缺陷**：macOS 应用在每次启动时都会崩溃，导致 OpenClaw 在 Mac 上完全无法使用。
- **影响范围**：所有通过应用内更新从 2026.9.4/9.5 升级到 2026.9.6 的 macOS 用户。
- **官方建议**：若应用无法启动，需重装 2026.9.5 macOS 构建版本。2026.9.7 热修复正在开发中。
- **相关链接**：
  - Issue: [openclaw/openclaw#156861](https://github.com/openclaw/openclaw/issues/156861)
  - Release Note PR: [openclaw/openclaw#155225](https://github.com/openclaw/openclaw/pull/155225)

## 3. 项目进展
今日有 2 个 PR 被合并/关闭，主要涉及文档与发布流程：
- **文档与发布标准化**：PR [#155225](https://github.com/openclaw/openclaw/pull/155225) 增加了 v2026.9.6 的统一发布说明，涵盖托管更新、重启恢复及 30 天使用报告等功能亮点，尽管该版本后续出现严重 Bug，但文档基础已完善。
- **整体推进方向**：虽然合并数量不多，但 48 个待合并的 PR 显示了密集的功能推进。核心方向包括：
  - **网关稳定性**：PR [#144005](https://github.com/openclaw/openclaw/pull/144005) 和 [#145169](https://github.com/openclaw/openclaw/pull/145169) 正在处理更新回滚时的状态备份与数据保留，旨在解决数据库架构迁移失败导致的“无路径前进”状态。
  - **代码重构（Deslopping）**：多个子系统（Memory-core, Feishu, Telegram/WhatsApp）正在进行大型重构（如 [#156867](https://github.com/openclaw/openclaw/pull/156867), [#156832](https://github.com/openclaw/openclaw/pull/156832), [#156752](https://github.com/openclaw/openclaw/pull/156752)），旨在消除重复代码，降低维护成本。

## 4. 社区热点
- **macOS 启动崩溃 (P0)**：
  - [Issue #156861](https://github.com/openclaw/openclaw/issues/156861) 是当前讨论最热烈的 Issue。用户报告更新后应用完全无法启动，甚至导致两台 Mac 机器均失效。这是典型的“UX-Release-Blocker”，直接阻塞了用户的正常使用。
- **Windows 数据库迁移死锁 (P0)**：
  - [Issue #146886](https://github.com/openclaw/openclaw/issues/146886) 涉及 Windows 平台更新中断后，数据库架构迁移租约（lease）泄漏，导致 Doctor 工具和后续更新全部被阻断。这是一个严重的底层状态管理问题。

## 5. Bug 与稳定性
按严重程度排列今日关注的问题：

| 严重程度 | 问题描述 | 状态 | 关联 Fix PR |
| :--- | :--- | :--- | :--- |
| **P0 (Critical)** | **macOS 启动崩溃**：v2026.9.6 在 macOS 上完全无法启动。 | Open | 热修复 v2026.9.7 进行中; 相关 PR [#156811](https://github.com/openclaw/openclaw/pull/156811) 正在加强发布验证以防止此类问题再次发生。 |
| **P0 (Critical)** | **Windows 数据库架构迁移死锁**：更新中断后，DB 版本超前且租约未释放，导致无法更新或运行 Doctor。 | Open | PR [#144005](https://github.com/openclaw/openclaw/pull/144005) 和 [#145169](https://github.com/openclaw/openclaw/pull/145169) 正在处理更新回滚与状态恢复。 |
| **P1 (High)** | **会话延迟续接路由错误**：延迟的 `sessions_send` 续接使用了错误的回复路由或进入已重置的会话。 | Open | PR [#156802](https://github.com/openclaw/openclaw/pull/156802) 修复此问题，保留原始请求者路由。 |
| **P1 (High)** | **Codex 压缩写入器释放时机错误**：Codex 后续任务可能在不同的 writer 上恢复或过早释放队列。 | Open | PR [#144511](https://github.com/openclaw/openclaw/pull/144511) 修复。 |
| **P2 (Medium)** | **Doubao/BytePlus 模型定价缺失**：缓存读写价格设为 0，导致成本计算错误。 | Open | 暂无明确 Fix PR，标记为需要产品决策。 |
| **P2 (Medium)** | **WhatsApp 审计身份丢失**：审计检查报告未知的人主体和通道入口。 | Open | PR [#156730](https://github.com/openclaw/openclaw/pull/156730) 修复。 |

## 6. 功能请求与路线图信号
- **原生子任务进度显示**：PR [#150995](https://github.com/openclaw/openclaw/pull/150995) 正在实现父任务 yield 后显示 Codex 原生子任务的进度。这暗示团队重视多智能体协作中的透明度和用户体验。
- **会议集成基础**：PR [#152327](https://github.com/openclaw/openclaw/pull/152327) 添加了持久参与基础（Google Meet），表明 OpenClaw 正在扩展其交互边界，从聊天/代理扩展到实时会议场景。
- **Agents API 原生输出保留**：PR [#156182](https://github.com/openclaw/openclaw/pull/156182) 旨在保留 Agents API 的原生输出和工具历史，增强了底层协议的兼容性。
- **本地嵌入服务就绪状态报告**：PR [#156483](https://github.com/openclaw/openclaw/pull/156483) 改进了 Ollama/LM Studio 本地服务的就绪状态报告，利好本地化部署场景。

## 7. 用户反馈摘要
基于 Issue 摘要，提炼出以下用户痛点：
- **对更新稳定性的极度敏感**：Issue #156861 和 #146886 显示，用户（尤其是高级运维者）对更新失败导致的“不可逆状态”（如 DB 锁死、应用崩溃）感到极度困扰。用户期望的是：更新失败后能自动、安全地回滚到可用状态，而不是陷入需要手动修复的困境。
- **多模态/多模型成本透明度**：Issue #54157 指出用户对国产模型（Doubao/BytePlus）的缓存成本缺失感到不满，这影响了预算管理和成本估算的准确性。
- **子任务结果交付可靠性**：Issue #128245 和 #148298 反映了用户对“子任务看似成功但实际未交付/状态错误”的不满。用户希望看到端到端的回归测试保障，确保委托的工作真正完成并渲染给请求者。

## 8. 待处理积压
- **长期存在的模型定价问题**：Issue [#54157](https://github.com/openclaw/openclaw/issues/54157) 创建于 2026-03-25，至今仍有 5 条评论但未见 Fix PR，标记为 `clawsweeper:no-new-fix-pr`，可能需要维护者重新评估优先级。
- **会话状态回归测试缺失**：Issue [#148298](https://github.com/openclaw/openclaw/issues/148298) 创建于 2026-09-14，提出需要端到端的子任务续接和完成可见性测试。鉴于今日有多个涉及会话状态的 P1 Bug（如 #156802, #154175），此测试覆盖的缺失可能是根本原因，建议加速推进。
- **Anthropic Advisor Tool 支持**：PR [#64064](https://github.com/openclaw/openclaw/pull/64064) 创建于 2026-04-10，至今处于 `triage: dirty-candidate` 和 `needs-pr-context` 状态，长期未被合并，可能需要清理或重新整理。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**日期**：2026-09-24
**数据来源**：OpenClaw, NanoBot 社区动态日报

## 1. 生态全景
2026年9月下旬，个人AI助手与自主智能体开源生态正处于“功能扩张与底层稳定性修复”并重的关键阶段。核心框架（如OpenClaw）的迭代重心已从单纯的功能堆叠转向架构稳定性、状态回滚机制及多通道协议的深层重构。与此同时，周边应用层项目（如NanoBot）正加速向企业级可观测性、细粒度成本控制及多模型Provider集成演进。整个生态面临的核心挑战是解决长程任务中的状态管理死锁、并发写入冲突以及更新失败后的不可逆破坏，社区对“优雅降级”和“端到端可靠性”的诉求日益强烈。

## 2. 各项目活跃度对比

| 项目 | 近24h 新增/活跃 Issues | 近24h PR 动态 (新/更新/合并) | 版本发布 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 5 | 50 (其中 2 已合并) | **v2026.9.6 (紧急撤回)**，v2026.9.7 热修开发中 | ⚠️ **高风险 (High-Risk)**：触发 P0 级崩溃导致版本回滚，底层状态管理问题密集爆发，但重构投入巨大，修复响应迅速。 |
| **NanoBot** | 6 (2 新增, 4 关闭) | 33 (13 待合并, 20 已合并/关闭) | 无 | 🟢 **高健康 (Healthy)**：高频合入，P0/P1 并发与通知 Bug 获当日修复，重点优化 WebUI 体验与记忆压缩机制。 |

## 3. OpenClaw 在生态中的定位
*   **优势与角色**：作为核心参照项目，OpenClaw 具备类似“操作系统内核”的复杂度，主攻**底层网关稳定性、数据库迁移、多通道（Telegram/WhatsApp）深度重构**及原生多智能体协作（子任务进度、会议集成）。其社区讨论更多聚焦于数据完整性与灾难恢复（如数据库租约泄漏导致状态锁死）。
*   **技术路线差异**：与 NanoBot 等偏向上层交互体验和轻量级记忆策略的项目相比，OpenClaw 的技术路线更具“基础设施”属性，涉及复杂的数据库架构升级、复杂的上下文/路由生命周期管理（`sessions_send` 路由保留），以及深度接入企业级会议（Google Meet）与本地化算力（Ollama/LM Studio）。
*   **社区规模与成熟度对比**：OpenClaw 的 PR 数量（50 个）与积压规模远大于 NanoBot（33 个），且处理大量 P0 级阻塞问题，表明其处于**高速扩张并遭遇规模瓶颈**的阶段；而 NanoBot 的 PR 周转率更高（合并20个），处于**成熟应用层的质量打磨与体验增强**阶段。

## 4. 共同关注的技术方向
*   **上下文压缩（Memory Compaction）与状态恢复机制**：
    *   **共同诉求**：两个项目均在此领域遭遇严重稳定性挑战。
    *   **OpenClaw**：关注更新回滚时的状态备份（PR #144005, #145169），以及 Codex 压缩写入器过早释放队列的问题（PR #144511）。
    *   **NanoBot**：重点修复了 `MemoryStore` 并发追加的数据竞争（PR #5884），以及上下文压缩引发的大文件 `read_file` 中断和 Telegram 通知泛滥问题（Issue #5870, #5879）。
*   **多通道（Multi-Channel）集成与交互边界扩展**：
    *   **共同诉求**：从单一聊天扩展到多通道协同及实时交互。
    *   **OpenClaw**：正在进行 Telegram/WhatsApp 的“Deslopping”重构，并引入 Google Meet 会议集成基础（PR #152327）。
    *   **NanoBot**：针对 Telegram/WhatsApp 渠道优化了上下文压缩通知体验，并探讨 WhatsApp 语音消息（STT+TTS）的官方 Skill 支持（Issue #2152）。
*   **多模型与多提供商（Multi-Provider）适配及成本控制**：
    *   **共同诉求**：适配异构模型并解决计费盲区。
    *   **OpenClaw**：正在解决 Doubao/BytePlus 模型缓存读写价格缺失导致的成本计算错误（Issue #54157）。
    *   **NanoBot**：快速集成 IO Intelligence (io.net) 提供商（PR #5875），并为 Codex 提供商补齐 Langfuse 原生追踪（PR #5520）以实现全栈可观测性。

## 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw**：侧重**网关底层架构、数据一致性（DB租约管理）与多智能体系统间协议**（Agents API 原生输出保留、原生子任务进度显示）。
    *   **NanoBot**：侧重**应用层交互体验（WebUI 日历/统计图表、Linear Agent UX）与开箱即用的 Provider 扩展**。
*   **目标用户**：
    *   **OpenClaw**：主要面向高级运维者（Operations）及进行多智能体复杂编排的高级开发者，用户痛点集中在“更新失败后的不可逆状态”和“多模型预算精确管理”。
    *   **NanoBot**：主要面向需要快速集成特定工具链、关注 Web 端统计透明度以及受背景噪音（通知）困扰的终端用户。
*   **技术架构**：
    *   OpenClaw 展现出明显的**状态机驱动架构特征**（面临 DB 架构迁移失败导致的“无路径前进”死锁状态）。
    *   NanoBot 展现出明显的**事件驱动与模块化架构特征**（高频解决并发写入、模块级 JSONL 原子写逻辑复用及 Provider 热插拔）。

## 6. 社区热度与成熟度
*   **高速迭代/质量巩固临界点（OpenClaw）**：处于狂飙突进后的阵痛期。50个更新PR、48个待合并PR表明其底层重构（Deslopping）处于攻坚阶段。多个 P0 级问题（macOS 启动崩溃、Windows DB 死锁）暴露出快速迭代带来的架构脆弱性，社区正处于“用底层机制回滚换取上层功能”的成熟度磨合期。
*   **稳定演进/精细化打磨阶段（NanoBot）**：处于健康的高成熟度状态。24小时内合并 20 个 PR，快速闭环 P0/P1 并发 Bug 和通知体验问题。长期 Open 的 PR（如 Heartbeat 共享会话，创建近 3 个月）反映了其在核心机制演进上保持稳健节奏，没有底层崩溃危机，重心向边缘工具集成（Tracing, Provider）倾斜。

## 7. 值得关注的趋势信号
1.  **长程任务“端到端可靠性”成为核心护城河**：
    *   *趋势表现*：用户对“看似成功但未交付”的幻觉容忍度降至冰点（OpenClaw Issue #128245, #148298）。
    *   *参考价值*：未来的 AI 智能体不能仅仅依靠 LLM 的自洽性，必须引入类似事务隔离的严格状态机管理，确保子任务续接（yield）后的数据完整性与可见性，并构建端到端的回归测试基线。
2.  **“零容忍”的更新崩溃与不可逆状态（UX-Release-Blocker）**：
    *   *趋势表现*：OpenClaw 的 macOS 全面崩溃（#156861）与 Windows DB 租约泄漏（#146886）导致大量用户机器“变砖”需手动介入。
    *   *参考价值*：智能体系统的更新机制必须实现强制的“自动、安全回滚”机制。任何涉及数据库架构变更的更新，其失败路径必须保证数据库处于可被外部工具（如 Doctor）恢复的安全态，而非死锁态。
3.  **后台维护操作（Compaction/GC）的静默化诉求**：
    *   *趋势表现*：NanoBot 用户频繁抱怨 Telegram 中上下文压缩完成通知（`Context compacted.`）的泛滥（#5870）。
    *   *参考价值*：随着上下文窗口受限和长会话增多，系统必然涉及后台记忆压缩与缓存淘汰。开发者需将底层状态维护动作与前台交互通道隔离，提供可配置的“静默维护”模式，避免后台系统任务污染用户对话 UX。
4.  **异构算力的可观测性（Tracing）碎片化弥合**：
    *   *趋势表现*：NanoBot 补齐 Langfuse 对 Codex 提供商的追踪（#5520），OpenClaw 关注本土模型（Doubao）定价缺失（#54157）。
    *   *参考价值*：多模态及混合提供商（含本地 Ollama/LM Studio 及 API）正成为主流。智能体框架必须提供统一且开箱即用的成本计量引擎与全栈 Tracing 支持，以解决多模型部署下的财务预算黑盒问题。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

1. **今日速览**
NanoBot 项目今日保持高活跃度，过去 24 小时内共有 6 条 Issues 更新（2 新开/活跃，4 已关闭）和 33 条 PR 更新（13 待合并，20 已合并/关闭），未发布新版本。项目开发重心集中在记忆管理（Memory Compaction）机制的修复与优化，以及 WebUI 用户体验的增强。社区关注点明确指向上下文压缩引发的稳定性问题及 Telegram/WhatsApp 等渠道的通知体验，核心维护者对 P0/P1 级别 Bug 响应迅速，当日即有修复 PR 被提交或合并。

2. **版本发布**
无。

3. **项目进展**
今日共合并/关闭 20 个 PR，主要进展集中在以下领域：
- **记忆与上下文管理**：修复了 `MemoryStore` 在并发追加时的数据竞争问题 ([PR #5884](https://github.com/HKUDS/nanobot/pull/5884))；修正了 Codex 原生压缩时状态丢失的问题 ([PR #5883](https://github.com/HKUDS/nanobot/pull/5883))；更新了上下文压缩行为的文档，明确 `/compact` 命令的作用 ([PR #5882](https://github.com/HKUDS/nanobot/pull/5882))；增加了 turn 间注入消息的日志记录以便排查 ([PR #5878](https://github.com/HKUDS/nanobot/pull/5878))。
- **WebUI 体验**：合并了改进 WebUI 重启提示残留问题的修复 ([PR #5813](https://github.com/HKUDS/nanobot/pull/5813))；上线了使用范围、活动日历和模型分解功能 ([PR #5851](https://github.com/HKUDS/nanobot/pull/5851))；Linear 原生 Agent UX 得到显著改进 ([PR #5871](https://github.com/HKUDS/nanobot/pull/5871))。
- **Provider 扩展**：正式引入了 IO Intelligence (io.net) 提供商，支持开箱即用的推理服务 ([PR #5875](https://github.com/HKUDS/nanobot/pull/5875))。
- **代码重构**：解决了三个 JSONL 写入器中重复的原子写逻辑 ([Issue #5290](https://github.com/HKUDS/nanobot/issues/5290) 已关闭)。

4. **社区热点**
- **上下文压缩通知泛滥**：[Issue #5870](https://github.com/HKUDS/nanobot/issues/5870)（P1，已关闭）指出 Telegram 中 `Context compacted.` 提示重复出现多达 6 次以上，用户感到困扰。该问题已关闭，并有相关 PR [PR #5780](https://github.com/HKUDS/nanobot/pull/5780) 试图停止发送自动压缩通知。用户核心诉求是背景维护操作不应干扰正常对话体验。
- **WhatsApp 生态功能集成**：[Issue #2152](https://github.com/HKUDS/nanobot/issues/2152) 讨论 WhatsApp 语音消息（STT+TTS）支持，用户已开发独立 Skill 但需每次更新后手动打补丁，反映出官方对第三方 Skill 标准化支持不足的问题。[Issue #2160](https://github.com/HKUDS/nanobot/issues/2160) 同样涉及 WhatsApp 启动通知功能，两项 Issue 均在 09-23 更新并关闭。
- **WebUI 交互统一**：[PR #5847](https://github.com/HKUDS/nanobot/pull/5847)（Open）旨在统一会话文件和网站预览的工作流，将分散的文件操作整合到一个可调整的预览窗格中，代表了社区对 WebUI 交互一致性的强烈需求。

5. **Bug 与稳定性**
按严重程度排序，今日报告的 Bug 及修复情况如下：
- **P0/P1 级（高危）**：
  - **并发写入导致历史丢失**：`compact_history` 未加锁导致并发追加被覆盖。**已修复**，[PR #5884](https://github.com/HKUDS/nanobot/pull/5884) 已合并。
  - **Telegram 通知重复**：上下文压缩完成通知在 Telegram 中重复显示。**已处理**，[Issue #5870](https://github.com/HKUDS/nanobot/issues/5870) 已关闭。
  - **Fallback Tokenizer 阻塞**：网关启动时同步下载 tokenizer 导致阻塞。**修复中**，[PR #5861](https://github.com/HKUDS/nanobot/pull/5861) 处于 Open 状态，拟在后台线程预热。
  - **0.3.5 版本配置校验回归**：新版本强制要求 `_nanobot` 目录位于 workspace 外，导致部分用户实例启动失败。**未修复**，[Issue #5881](https://github.com/HKUDS/nanobot/issues/5881) 处于 Open 状态，涉及 `Config.runtime_data_dir` 只读属性变更。
- **P2 级（中危）**：
  - **大文件读取导致 Turn 中断**：大 `read_file` 结果在压缩后仍作为未摘要的 delta 存在，超出输入预算导致 `ContextWindowExceededError`。**修复中**，[PR #5880](https://github.com/HKUDS/nanobot/pull/5880) 提交于 [Issue #5879](https://github.com/HKUDS/nanobot/issues/5879)，处于 Open 状态。
  - **read_file 超大行处理**：超出字符预算的行导致读取停滞。**修复中**，[PR #5824](https://github.com/HKUDS/nanobot/pull/5824) 处于 Open 状态。
  - **空闲摘要缓存无界增长**：废弃会话的摘要缓存未释放内存。**修复中**，[PR #5664](https://github.com/HKUDS/nanobot/pull/5664) 处于 Open 状态。

6. **功能请求与路线图信号**
- **技能调用控制**：[PR #5405](https://github.com/HKUDS/nanobot/pull/5405) 提议支持 `disable-model-invocation: true` 以允许手动仅调用具有副作用（如部署、发布）的技能。该需求符合生产环境安全规范，已 Open 待合并。
- **Langfuse Tracing 扩展**：[PR #5520](https://github.com/HKUDS/nanobot/pull/5520) 为 Codex 提供商添加 Langfuse 原生追踪，弥补了此前仅 OpenAI 兼容提供商有追踪支持的空白，利于全栈可观测性。
- **Idle 压缩阈值门控**：[PR #5885](https://github.com/HKUDS/nanobot/pull/5885) 建议为空闲转录替换设置 token 阈值，避免短会话被不必要的 LLM 摘要替换，以提升恢复质量和降低成本。
- **Heartbeat 共享会话**：[PR #4551](https://github.com/HKUDS/nanobot/pull/4551) 允许 heartbeat 在目标聊天会话中执行，使心跳任务可访问先前上下文，该 PR 自 6 月创建，长期 Open。

7. **用户反馈摘要**
- **痛点**：
  - 背景维护操作（如上下文压缩）产生的日志/通知严重干扰用户对话体验，尤其是 Telegram 用户（[Issue #5870](https://github.com/HKUDS/nanobot/issues/5870)）。
  - 第三方 Skill（如 WhatsApp 语音、启动通知）缺乏官方原生支持，用户需自行维护补丁，更新维护成本高（[Issue #2152](https://github.com/HKUDS/nanobot/issues/2152), [Issue #2160](https://github.com/HKUDS/nanobot/issues/2160)）。
  - 0.3.5 版本对目录结构的严格校验导致多实例部署场景下启动失败，缺乏向后兼容的过渡方案（[Issue #5881](https://github.com/HKUDS/nanobot/issues/5881)）。
- **满意**：
  - WebUI 在使用统计（活动日历、模型分解）和 Linear Agent UX 方面的改进受到关注，体现了项目对产品化体验的投入。
  - 新 Provider (io.net) 的快速集成降低了用户使用 IO Intelligence 的门槛。

8. **待处理积压**
- **长期 Open PR**：
  - [PR #4551](https://github.com/HKUDS/nanobot/pull/4551)（Heartbeat 共享会话）创建于 2026-06-26，至今已 3 个月，多次更新但标记为 conflict，需维护者优先处理合并冲突。
  - [PR #5520](https://github.com/HKUDS/nanobot/pull/5520)（Langfuse Codex Tracing）创建于 2026-08-24，标记为 conflict 且优先级 p2，建议解决冲突以增强可观测性。
- **长期 Open Issue**：
  - [Issue #5879](https://github.com/HKUDS/nanobot/issues/5879) 及其对应修复 [PR #5880](https://github.com/HKUDS/nanobot/pull/5880) 涉及上下文压缩后大文件读取中断的核心稳定性问题，虽为今日新开，但因涉及 `ContextWindowExceededError` 这种高危错误，建议提升至 P1 级别优先合并。
  - [Issue #5881](https://github.com/HKUDS/nanobot/issues/5881) 涉及 0.3.5 版本的目录校验回归，影响多实例用户，需评估是否提供配置项豁免或优化文档指引。

</details>