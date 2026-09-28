# OpenClaw 生态日报 2026-09-28

> Issues: 11 | PRs: 50 | 覆盖项目: 2 个 | 生成时间: 2026-09-28 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw 项目深度报告

**OpenClaw 项目动态日报 (2026-09-28)**

### 1. 今日速览
OpenClaw 社区今日活跃度**极高**，尽管过去24小时内无新版本发布，但代码库处于密集的重构与修复阶段。过去24小时新增活跃 Issue 11 条，PR 更新 50 条（其中 49 条待合并），显示出极高的开发密度。项目重心明显偏向**底层架构清理（deslop 系列重构）**与**核心稳定性修复**（如 SQLite 事务、会话状态管理、网关重启逻辑）。虽然 P0/P1 级别严重 Bug 有所涌现，但对应的修复 PR 已迅速介入并进入审查流程，项目处于高压推进状态。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

### 3. 项目进展
过去 24 小时内仅合并/关闭 1 个 PR，但绝大多数 PR 处于 `open` 状态，意味着大量工作正在进行中。今日主要进展集中在**代码瘦身与架构优化**，由核心维护者 `steipete` 主导：

*   **架构深度重构 (Deslop 系列)**：推进了针对 Agents 核心、Infra、Config 及 Shared Packages 的多轮清理，旨在移除冗余的转发层、过时的配置项及未引用的生产代码。这些 PR 虽然标记为无用户可见变更，但涉及安全性与兼容性风险评估。
    *   [`refactor(agents): deslop agents core fourth pass`](https://github.com/openclaw/openclaw/pull/159856)
    *   [`refactor: delete unreferenced production code`](https://github.com/openclaw/openclaw/pull/159847)
    *   [`refactor(infra): deslop infra fifth pass`](https://github.com/openclaw/openclaw/pull/159759)
    *   [`refactor(config): deslop config fourth pass`](https://github.com/openclaw/openclaw/pull/159588)
*   **核心状态与内存管理**：修复了 `memory-core` 侧边栏遗留的梦境作业 (dreaming jobs)，以及会话状态在嵌套事务回滚后的恢复问题。
    *   [`fix(cron): remove memory-core dreaming jobs...`](https://github.com/openclaw/openclaw/pull/156667)
    *   [`fix: restore session state after nested transcript rollback`](https://github.com/openclaw/openclaw/pull/159807)
*   **网关与性能优化**：针对大历史记录页面的主线程内存分配进行了优化，并解决了状态迁移中数据库租约丢失的问题。
    *   [`perf(gateway): reduce main-thread allocation...`](https://github.com/openclaw/openclaw/pull/159585)
    *   [`fix(state): retire stale workers before replacement admission`](https://github.com/openclaw/openclaw/pull/159944)

### 4. 社区热点
根据数据，社区讨论的热点集中在**生产环境升级困境**、**特定渠道兼容性**及**底层数据存储逻辑**：

*   **生产环境升级指导缺失 (P0)**：`#123799` 成为今日最高关注度 Issue。多个生产部署团队受影响于 Codex compact 404 错误，且此前相关 Issue 被标记为“已实现”关闭，导致用户缺乏回退或升级的安全指引。
    *   链接: [`#123799 Need safe upgrade/backport guidance...`](https://github.com/openclaw/openclaw/issues/123799)
*   **渠道媒体文件传输故障 (P1)**：`#159249` 指出 Zalo 个人账号渠道 (`zalouser`) 无法接收照片/视频，仅收到 CDN 链接。这影响了多模态交互的核心功能。
    *   链接: [`#159249 zalouser: inbound files... never as media`](https://github.com/openclaw/openclaw/issues/159249)
*   **重置命令数据残留 (P2)**：`#159419` 关注 `reset` 命令未能清理新架构下 SQLite 数据库中的会话历史，仅清理了旧目录，可能导致数据泄露或状态混乱。
    *   链接: [`#159419 fix(reset): remove canonical SQLite session history`](https://github.com/openclaw/openclaw/pull/159419)

### 5. Bug 与稳定性
今日出现了多个 P0/P1 级别的高危 Bug，主要集中在崩溃循环、会话静默死亡及渠道不可用方面：

*   **[P0] macOS 网关离线与更新失败**：
    *   问题：Telegram `/update` 触发 macOS Gateway 停止，且 Doctor config 权限检查失败导致系统无法自动恢复。
    *   状态：已有相关修复 PR 介入，但 Issue 仍为 OPEN。
    *   链接: [`#159839 Telegram update leaves macOS Gateway offline...`](https://github.com/openclaw/openclaw/issues/159839)
*   **[P0] 更新器子进程失控**：
    *   问题：在 Bun Gateway 下，更新器启动了 8,462 个子进程，导致验证预算耗尽。PR `#158447` 正在修复通过环境变量识别子进程的逻辑。
    *   链接: [`PR #158447 fix(updater): identify the config-read child...`](https://github.com/openclaw/openclaw/pull/158447)
*   **[P1] 会话静默死亡 (Silent Death)**：
    *   问题：HTTP 200 响应后触发 `auth-profile-failure` 导致会话直接终止，无恢复日志。已确认 5 起事故，指纹一致。
    *   链接: [`#125998 auth-profile-failure session death...`](https://github.com/openclaw/openclaw/issues/125998)
*   **[P1] SQLite 写事务长阻塞**：
    *   问题：Windows 宿主机上出现长达 5.9s-33.2s 的写事务阻塞，且网关冻结检测器误报。
    *   链接: [`#155359 9 dual-monitor-verified SQLite write-transaction holds...`](https://github.com/openclaw/openclaw/issues/155359)
*   **[P1] 渠道名称误判导致消息丢失**：
    *   问题：当未指定显式渠道时，配置中的渠道名称被误当作目的地，导致 Telegram 403 错误。
    *   状态：修复 PR `#158387` 已准备就绪，待合并。
    *   链接: [`#158387 fix: reject channel names without message destinations`](https://github.com/openclaw/openclaw/pull/158387)

### 6. 功能请求与路线图信号
*   **插件渠道队列支持**：用户请求允许在 `messages.queue.byChannel` 中使用插件渠道（如 `buzz`）作为键。目前运行时解析器已支持，但配置验证仍限制为硬编码的 12 个渠道。此需求已有 PR 关联，预计近期合入。
    *   链接: [`#158214 [Feature]: Allow plugin channels...`](https://github.com/openclaw/openclaw/issues/158214)
*   **实时语音代理行为优化**：当呼叫者未响应时，代理应保持静默直到通话结束，而非挂起或产生异常。这是一个产品行为决策，已有 PR 关联。
    *   链接: [`#159141 [Bug]: realtime agent is never woken when the caller does not answer...`](https://github.com/openclaw/openclaw/issues/159141)
*   **GitHub 客户端认证增强**：为企业级 Workers 提供短期访问令牌的 GitHub 认证方案，避免使用长期签名密钥。该 PR `#157500` 正在通过安全审查，暗示企业级部署能力将得到加强。
    *   链接: [`#157500 feat(workers): authenticate stock GitHub clients...`](https://github.com/openclaw/openclaw/pull/157500)

### 7. 用户反馈摘要
*   **对配置语义的困惑**：用户在 `#126296` 中反馈 `softThresholdTokens` 命名具有误导性，实际行为与名称暗示相反，增加了调试难度。
    *   链接: [`#126296 Compaction config usability...`](https://github.com/openclaw/openclaw/issues/126296)
*   **模型选择器不匹配**：用户在 `#159267` 中抱怨 Anthropic 模型选择器列出了当前 API 密钥无权访问的模型（如 Claude Mythos 5），导致 HTTP 404 错误。
    *   链接: [`#159267 Anthropic model pickers offer models the configured API key cannot use...`](https://github.com/openclaw/openclaw/issues/159267)
*   **UI 视觉体验改进**：PR `#150545` 和 `#151993` 针对 UI 进行了微调，包括停止为聊天图片预留过大框架，以及折叠已完成的工作日志，旨在提升阅读体验。
    *   链接: [`#150545 fix(ui): stop reserving oversized frames...`](https://github.com/openclaw/openclaw/pull/150545)

### 8. 待处理积压
*   **长期未响应的 P1 Issue**：`#125998` (会话静默死亡) 创建于 8 月，虽标记为 stale 但今日有更新，显示该问题反复出现且难以根治，需维护者重点关注。
    *   链接: [`#125998`](https://github.com/openclaw/openclaw/issues/125998)
*   **积压的 Refactor PR**：`steipete` 提交的多个 XL 大小 Refactor PR（如 `#159847`, `#159759`）标记为 "ready for maintainer look"，但由于体量巨大且涉及安全敏感代码，合并速度可能受限，需警惕引入回归风险。
    *   链接: [`#159847`](https://github.com/openclaw/openclaw/pull/159847)
*   **旧 Issue 回归**：`#123799` 提及的 `#123706` 曾被关闭，但生产环境问题复发，表明之前的修复可能不彻底或存在版本碎片化问题，需要建立更完善的回退机制文档。
    *   链接: [`#123799`](https://github.com/openclaw/openclaw/issues/123799)

---

## 横向生态对比

# 开源 AI 智能体与个人 AI 助手生态横向对比分析报告
**报告日期**: 2026-09-28
**分析对象**: OpenClaw, NanoBot

## 1. 生态全景
当前开源 AI 智能体生态正处于**架构下沉与数据一致性**的深化探索期，核心项目均将 SQLite 迁移与会话状态管理作为提升系统稳定性的基石。生态整体呈现出**多模态与新一代大模型接入需求激增**的特征，GPT-6 等新型推理模型与多渠道消息系统的适配成为社区焦点。在架构演进过程中，**并发读写冲突**与**后台静默数据泄露**成为制约体验的核心痛点。开发活跃度向**底层重构（Deslop）与高并发 IO 优化**集中，反映出生态正从单一功能扩展向企业级高可用与多端协同的架构成熟阶段过渡。

## 2. 各项目活跃度对比

| 项目 | Issues 数 | PR 数 | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 11 | 50 (49 待合并) | 过去 24 小时内无新版本发布 | **极高** (处于密集底层架构重构与多起 P0/P1 并发修复的高压推进状态，开发密度大但部分重构 PR 体量过大存在延迟合并风险) |
| **NanoBot** | 5 | 17 | 过去 24 小时内无新版本发布 | **良好** (开发节奏平稳，P0/P1 级 Bug 有对应的快速修复方案推进中，架构级大改 PR 长期挂起需关注) |

*注：表中数据基于提供的 2026-09-28 日报。*

## 3. OpenClaw 在生态中的定位
*   **优势与技术路线差异**：OpenClaw 采用**“Deslop”代码瘦身与多轮底层清理**路线，通过移除冗余转发层与未引用生产代码来控制架构复杂度。其技术重心在于解决网关重启逻辑、大历史记录主线程内存分配优化以及深层嵌套 SQLite 事务回滚恢复等复杂状态管理问题，展现出向底层基础设施级网关演进的定位。
*   **社区规模对比**：OpenClaw 的 PR 更新量（50 条）远超 NanoBot（17 条），且存在大批量 `XL` 尺寸的复杂重构 PR。这表明 OpenClaw 拥有更高强度的开发投入与更复杂的架构体系，其社区面临更严苛的生产环境升级挑战（如版本碎片化导致 Bug 复发），生态地位更偏向**底层核心框架**。

## 4. 共同关注的技术方向
*   **SQLite 作为核心状态存储的迁移**：OpenClaw 正在修复新架构下 SQLite 数据库的 `reset` 残留问题及写事务长阻塞；NanoBot 则提交了 PR #5943 将核心会话状态全面转移至 SQLite 以解决并发读写冲突。两个项目均将 SQLite 视为解决高并发状态管理的关键。
*   **多渠道与多模态指令的底层健壮性**：OpenClaw 面临 Zalo 渠道无法接收多模态媒体文件及未指定渠道时导致 403 故障；NanoBot 遇到 Telegram 多行命令截断及 WeChat 轮询日志刷屏。两者均急需增强渠道适配器的数据清洗与路由防御机制。
*   **新一代大模型（GPT-6/Codex）的兼容接入**：NanoBot 社区因 GPT-6 系列接入受阻引发密集讨论（#5898, #5939），催生了 Responses API 适配与内存泄漏修复；OpenClaw 则遭遇了生产环境部署的 Codex compact 404 错误，迫使项目紧急补齐安全回退机制。

## 5. 差异化定位分析
*   **功能侧重**：OpenClaw 聚焦于**底层网关与核心基础设施的稳定性与安全性**，涉及 macOS 系统级权限验证、网关离线崩溃循环及子进程失控。NanoBot 侧重于**应用层体验优化与跨端协同**，包括 iOS PWA 显示、本地 WebUI 发现远程实例以及 UI 语言扩展。
*   **目标用户**：OpenClaw 的目标用户群体明显偏向**多团队生产环境部署与企业级架构**（涉及企业级 Workers GitHub 短期访问令牌）。NanoBot 面向**注重多设备联动与移动端原生体验的终端个人/轻量级部署者**。
*   **技术架构**：OpenClaw 架构体系庞大，依赖高度解耦的 Agents、Infra、Config 分层，重构周期长且牵涉面广；NanoBot 架构相对轻量，当前正通过 PR 将 JSONL 向 SQLite 迁移，并处理 Cron 服务数据一致性等局部模块优化。

## 6. 社区热度与成熟度
*   **OpenClaw - 快速迭代与高压重构阶段**：11 条新增 Issue 与 50 条 PR 的极高比率表明社区处于**功能快速演进与底层架构剧痛清理的交汇期**。P0/P1 级的高危 Bug（会话静默死亡、macOS 网关离线）被持续曝光并迅速被 PR 响应，社区对版本发布节奏（24小时无新版本）具有高度焦虑。
*   **NanoBot - 质量巩固与局部精细化阶段**：5 条 Issue 与 17 条 PR 的较低比值表明项目处于**质量巩固与体验打磨阶段**。开发团队主要聚焦于修补具体渠道（WeChat, Discord, Feishu）的长尾体验 Bug，并对已知的数据一致性漏洞进行精准修复，架构级重构（SQLite 迁移）尚在挂起评估中。

## 7. 值得关注的趋势信号
1.  **数据一致性与灾难恢复成为架构底线**：OpenClaw 面临的 `reset` 残留 SQLite 历史数据与 NanoBot 的 `CronService` 写入失败（`ENOSPC`）清空已接受行动点，均表明单纯的 Agent 功能已非核心，**状态机的高可用与失败重试/回退机制**已成为智能体框架的硬性门槛。
2.  **后台静默执行（Silent Death / Background Leakage）亟需安全边界**：OpenClaw 的 HTTP 200 后 `auth-profile-failure` 导致的静默死亡，以及 NanoBot 压缩系统信息泄露至 Feishu 渠道，反映出 Agent 在后台高频循环时的**异常熔断机制与隐私隔离**缺乏标准。
3.  **架构复杂度反噬研发效率**：OpenClaw 积压大量 XL 级别重构 PR 并面临历史合并 Bug 复发的风险，提示 AI 开发者在追求智能体功能扩展的同时，必须建立**自动化验证与代码瘦身（Deslop）的持续防线**，以避免基础设施因代码膨胀而陷入长期不可维护状态。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下是基于 2026-09-28 数据的 NanoBot 项目动态日报：

### 1. 今日速览
过去 24 小时内，NanoBot 保持较高的开发活跃度，共有 17 条 Pull Requests 更新和 5 条 Issues 活跃。核心进展集中在会话持久化架构重构、Codex/GPT-6 模型兼容性修复以及 Cron 服务的数据一致性安全加固。社区主要关注点在于多模态模型（GPT-6 系列）的接入支持、Feishu 等长尾渠道的体验优化，以及 Agent 执行时的稳定性问题。整体项目健康度良好，P0/P1 级别的高优先级 Bug 修复正在快速推进中。

### 2. 版本发布
过去 24 小时内无新版本发布。

### 3. 项目进展
今日合并与关闭的 PR 主要集中在基础设施优化与 Provider 兼容性修复，显著提升了系统的稳定性和对新型 LLM 的适配能力。

*   **会话持久化架构重构**：PR [#5943](https://github.com/HKUDS/nanobot/pull/5943) 提出了将 SQLite 作为会话状态核心存储的重构方案，旨在解决 JSONL 存储带来的并发读写冲突，并配合 PR [#5580](https://github.com/HKUDS/nanobot/pull/5580) 将 IO 操作移出事件循环，提升高负载下的响应速度。
*   **OpenAI/Azure 兼容性与修复**：PR [#5937](https://github.com/HKUDS/nanobot/pull/5937) 修复了 Responses 流在终端事件后未立即停止导致内存泄漏的 P1 问题；PR [#5938](https://github.com/HKUDS/nanobot/pull/5938) 修复了 Responses 请求中可选工具参数被错误规范化为必填的回归问题。
*   **多渠道与体验修复**：PR [#5936](https://github.com/HKUDS/nanobot/pull/5936) 关闭了 WeChat 轮询请求的日志刷屏问题；PR [#5865](https://github.com/HKUDS/nanobot/pull/5865) 修复了使用较小 Fallback 上下文窗口时覆盖主预设预算的 Bug；PR [#5944](https://github.com/HKUDS/nanobot/pull/5944) 与 [#5934](https://github.com/HKUDS/nanobot/pull/5934) 分别优化了 WebUI 的邀请交互和分页加载反馈。

### 4. 社区热点
今日社区最活跃的讨论集中在 GPT-6 模型的接入体验、Agent 循环卡死机制以及 Feishu 渠道的交互异常上。

*   **GPT-6 模型接入受阻**：用户 [gqcao](https://github.com/gqcao) 在 [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) 中反馈通过 GitHub Copilot 使用 GPT-6 系列模型失败；随后 [bingqilinweimaotai](https://github.com/bingqilinweimaotai) 在 [Issue #5939](https://github.com/HKUDS/nanobot/issues/5939) 中深入分析，指出 OpenAI Codex 模型目录因客户端 `client_version` 固定导致漏掉了 Sol 和 Luna 模型。这两个 Issue 直接催生了 PR [#5935](https://github.com/HKUDS/nanobot/pull/5935) 和 [#5940](https://github.com/HKUDS/nanobot/pull/5940)，表明社区对新一代模型支持的诉求极其强烈。
*   **Agent 易陷入死循环**：[Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) 探讨了 Sudo 权限仅维持一轮导致 Agent 在授权失效时进入死循环的问题，且有 1 条热评。
*   **长尾渠道体验细节**：[Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) 揭示了 Feishu 渠道在空闲压缩后，系统内部标记被不当外发给用户，目前已有 3 条讨论，说明该问题影响了实际的用户体验。

### 5. Bug 与稳定性
今日报告的问题按严重程度排列如下，其中两个 P0/P1 级别的数据一致性与会话阻塞问题已有对应的修复方案在推进中。

*   **🔴 P0 - 定时任务数据丢失风险**：[Issue #5932](https://github.com/HKUDS/nanobot/issues/5932) 指出 `CronService` 在合并行动点时，如果在保存存储前发生 `ENOSPC` 等写入失败，会导致已接受的行动点被清空的严重数据丢失漏洞。**[已有 Fix PR]**：PR [#5933](https://github.com/HKUDS/nanobot/pull/5933) 已提交，建议优先审查合并。
*   **🟡 P1 - 上下文压缩系统信息泄露**：[Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) 指出 Feishu 渠道会将其内部检查点信息暴露给用户。**[暂无直接 Fix PR]**，但在 PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 中正在处理相关的压缩通知显示问题，需确认是否能彻底解决渠道外泄。
*   **🟠 P2 - 多渠道及路由回归问题**：
    *   Telegram 命令行截断邮箱和参数问题，[已有 Fix PR](https://github.com/HKUDS/nanobot/pull/5931)。
    *   Discord 运行时重置时未取消延迟表情任务，[已有 Fix PR](https://github.com/HKUDS/nanobot/pull/5864)。
    *   Agent 持续目标执行时的死循环问题，PR [#5257](https://github.com/HKUDS/nanobot/pull/5257) 给出了限制连续自动续接的方案。

### 6. 功能请求与路线图信号
用户的近期功能需求直接指向了多端协同体验和高级模型特性。

*   **远程实例连接 (NAN-157)**：[PR #5941](https://github.com/HKUDS/nanobot/pull/5941) 允许本地 WebUI 发现并连接远程已经运行的 nanobot 实例。这表明项目路线图正在向**“多端同步/多设备协同”**的方向演进，方便用户通过手机/桌面操作同一服务器端的 Agent。
*   **全新 UI 布局体系与 PWA 支持**：PR [#5944](https://github.com/HKUDS/nanobot/pull/5944) 引入了 10 种语言的 UI 文案更新，PR [#5942](https://github.com/HKUDS/nanobot/pull/5942) 增强了 iOS PWA 的显示效果，暗示下一代 WebUI 更加重视**移动端原生体验和多语言支持**。
*   **模型路由的精细化**：通过 GPT-6 的 Responses API 适配（PR [#5935](https://github.com/HKUDS/nanobot/pull/5935)），表明路线图正全面向**支持大上下文（256K+）及推理工具调用的新一代模型体系**靠拢。

### 7. 用户反馈摘要
基于 Issue 的讨论，可提炼出以下真实用户痛点和场景：

*   **痛点 1：大模型接入体验卡顿**。用户发现最新版本的 GPT-6 系列无法通过 GitHub Copilot 使用（#5898），且 WebUI 预设里甚至找不到这些模型（#5939）。用户期望开箱即用地支持主流 LLM 厂商的最新发布。
*   **痛点 2：Agent 执行稳定性不足**。Sudo 权限短暂导致 Agent 陷入死循环（#5924），或者在上下文压缩时泄露后台日志（#5903）。用户对 Agent 在后台静默工作而不打扰自身交互的期待较高。
*   **痛点 3：多行命令在特定 IM 中解析失败**。有用户（@2gg-bit）在 Telegram 中使用包含换行符、制表符或邮箱地址的多行参数时被系统截断（#5931 相关），这反映了跨渠道指令路由系统的底层设计需要更加健壮。

### 8. 待处理积压
以下为长期未获得最终响应的重要 PR，需维护者关注以免延误架构演进：

*   **会话系统全面重构**：PR [#5943](https://github.com/HKUDS/nanobot/pull/5943)（将核心状态转移到 SQLite）与 PR [#5580](https://github.com/HKUDS/nanobot/pull/5580) 是一对相互依存的架构级大改。这两个 PR 分别创建于 2026-09-27 和 2026-08-28，目前仍处于 OPEN 状态。作为 P1 优先级的性能与稳定性核心基建，长期未合并可能会阻碍其他依赖高并发 IO 的功能上线。
*   **长周期未处理的小 Bug**：PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 创建于 2026-09-15，主要是针对后台压缩通知的修改，因不确定是否原作者有意为之而产生讨论，已挂起半月，建议开发者给出决策并合并或关闭。

</details>