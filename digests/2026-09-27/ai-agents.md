# OpenClaw 生态日报 2026-09-27

> Issues: 6 | PRs: 50 | 覆盖项目: 2 个 | 生成时间: 2026-09-27 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报：2026-09-27

## 1. 今日速览
OpenClaw 项目今日保持高活跃度，过去 24 小时内有 6 个 Issue 更新（全部为新开或活跃状态，无关闭），以及 50 个 Pull Request 更新（48 个待合并，2 个已关闭/合并）。虽然今日没有发布新版本，但开发重心明显集中在**性能优化、核心代码重构（"deslop" 系列）以及多通道（Zalo、Telegram、Gateway）的稳定性修复**上。社区反馈集中在消息截断泄漏、Zalo 媒体文件处理缺陷以及监控心跳卡死等稳定性问题上，维护者响应迅速，多数关键 Bug 已关联修复 PR 并提交审查。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日主要进展体现在 48 个待合并的 PR 中，其中 2 个 PR 状态为已关闭/合并。核心推进方向包括：
*   **核心架构重构与清理**：维护者 steipete 提交了多组大规模重构 PR，旨在移除 Workboard、voice-call、Reef、LINE 等插件中的重复投影和不可达代码（[PR #158847](https://github.com/openclaw/openclaw/pull/158847)），以及清理 Agents 核心冗余验证和结果投影（[PR #159220](https://github.com/openclaw/openclaw/pull/159220)）。此外，根脚本 a-k 的清理工作也在推进中（[PR #159199](https://github.com/openclaw/openclaw/pull/159199)）。
*   **性能优化**：多个 PR 聚焦于降低资源消耗，包括网关流式传输增量数据以减少二次方流量增长（[PR #158587](https://github.com/openclaw/openclaw/pull/158587)），减少会话活动广播的 CPU 占用（[PR #159182](https://github.com/openclaw/openclaw/pull/159182)），以及使用 Bun 替代 Node 运行内存插件测试以提升速度（[PR #159236](https://github.com/openclaw/openclaw/pull/159236)）。
*   **通道与代理逻辑修复**：修复了 Telegram Webhook 模式下机器人身份替换导致消息丢失的问题（[PR #159219](https://github.com/openclaw/openclaw/pull/159219)），以及 Collector 并发启动顺序错乱的问题（[PR #159272](https://github.com/openclaw/openclaw/pull/159272), [PR #159273](https://github.com/openclaw/openclaw/pull/159273)）。

## 4. 社区热点
*   **Zalo 媒体文件处理缺陷**：Issue [#[159249](https://github.com/openclaw/openclaw/issues/159249)] 报告了 Zalo 个人账号通道中，用户发送的 PDF、照片和视频仅以 CDN 链接形式到达代理，而非实际媒体内容，导致代理无法读取。该问题今日已有关联修复 PR [#[159253](https://github.com/openclaw/openclaw/pull/159253)] 提交，处于待合并状态。
*   **截断哨兵泄漏**：Issue [#[82121](https://github.com/openclaw/openclaw/issues/82121)] 是一个高关注度（👍: 3）的长期问题，指出内部截断标记（如 `...(truncated)...`）泄漏到最终用户回复中。虽然该 Issue 创建于 5 月，但今日仍有更新，显示维护者正在处理此 UI/逻辑边缘案例。
*   **监控心跳卡死回归**：Issue [#[155347](https://github.com/openclaw/openclaw/issues/155347)] 报告了 9.5 版本中 8 个监控心跳作业永久卡在 "running" 状态的回归问题，今日更新显示维护者正在追踪 trace 形状以复现和定位问题。

## 5. Bug 与稳定性
*   **P0 - 更新失败 (Win32)**：Issue [#[159257](https://github.com/openclaw/openclaw/issues/159257)] 报告了 2026.9.3 版本在 Windows 平台上因 `runtime-verification-failed` 导致的更新失败。该 Issue 标记为 P0 和 `ux-release-blocker`，目前暂无直接修复 PR，需维护者优先关注。
*   **P1 - 监控心跳卡死**：Issue [#[155347](https://github.com/openclaw/openclaw/issues/155347)] 涉及 8 个 heartbeat 作业永久运行，属于严重稳定性回归。当前状态为 OPEN，标记为 `not-repro-on-main`，需进一步调试。
*   **P1 - Zalo 媒体文件丢失**：Issue [#[159249](https://github.com/openclaw/openclaw/issues/159249)] 导致用户媒体文件无法被代理处理。已有修复 PR [#[159253](https://github.com/openclaw/openclaw/pull/159253)] 在审查中。
*   **P1 - 请求者唤醒失败**：PR [#[159157](https://github.com/openclaw/openclaw/pull/159157)] 修复了子代理直接结果镜像后，请求者下一轮次唤醒失败的问题。该 PR 已关联 Issue #159059，当前等待作者完成修改。
*   **P1 - HTTP 400 重试循环**：PR [#[159221](https://github.com/openclaw/openclaw/pull/159221)] 修复了当 HTTP 400 错误携带瞬态内部代码（如 `rate_limit_exceeded`）时，系统重复发起相同模型请求的问题。

## 6. 功能请求与路线图信号
*   **Swarm 有界启动契约**：Issue [#[156632](https://github.com/openclaw/openclaw/issues/156632)] 提出了针对 Swarm `agents.run` 的通用有界启动契约，要求显式交接边界过滤和 fail-closed 沙箱准入。该 Issue 标记为 P2 且需要安全审查，相关实现已在 [PR #155442](https://github.com/openclaw/openclaw) 中重构，表明该功能正在积极开发中。
*   **自适应测试时计算**：Issue [#[158068](https://github.com/openclaw/openclaw/issues/158068)] 请求为 Swarm 群体引入自适应测试时计算策略（energetic/JEV population controller）。目前作为独立后续政策表面跟踪，不阻塞其他合并，显示团队正在规划更复杂的资源调度机制。
*   **AgentsAPI 隔离会话**：PR [#[159246](https://github.com/openclaw/openclaw/pull/159246)] 提议在 AgentsAPI 中支持隔离会话并启用受限的 dreaming 会话，旨在解决 Memory Core dreaming 在 Agents API 框架下无法生成日记叙述的问题。

## 7. 用户反馈摘要
*   **痛点：多模态输入兼容性**：Zalo 用户反馈强烈，指出媒体文件（PDF/图片/视频）无法被代理实际读取，仅收到链接，严重影响多模态交互体验（[#[159249](https://github.com/openclaw/openclaw/issues/159249)]）。
*   **痛点：平台特定更新故障**：Windows 用户报告 2026.9.3 版本更新验证失败，影响正常使用流程（[#[159257](https://github.com/openclaw/openclaw/issues/159257)]）。
*   **痛点：内部信息泄漏**：用户注意到助手回复中出现内部截断标记（`...(truncated)...`），认为这破坏了用户体验的完整性（[#[82121](https://github.com/openclaw/openclaw/issues/82121)]）。
*   **诉求：监控可靠性**：监控用户报告心跳作业卡死，影响长期无人值守运行的可靠性（[#[155347](https://github.com/openclaw/openclaw/issues/155347)]）。

## 8. 待处理积压
*   **长期截断泄漏 Issue**：Issue [#[82121](https://github.com/openclaw/openclaw/issues/82121)] 自 2026-05-15 创建，至今未解决，且今日仍有更新，表明该边缘情况较难修复或优先级被其他问题占据。
*   **大量待合并重构 PR**：目前 48 个 PR 处于待合并状态，其中包含多个 XL 规模的代码清理和性能优化 PR（如 [#[158587](https://github.com/openclaw/openclaw/pull/158587)], [#[159084](https://github.com/openclaw/openclaw/pull/159084)]）。维护者需尽快完成代码审查和合并，以避免主干分支拥堵。
*   **P0 更新故障无 PR**：Issue [#[159257](https://github.com/openclaw/openclaw/issues/159257)] 标记为 P0 但无关联修复 PR，需立即指派开发资源进行调查。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向对比分析
**日期**: 2026-09-27
**数据来源**: OpenClaw, NanoBot 社区动态日报

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正从功能扩张转向**工程稳定性与多通道深度适配**。头部项目如 OpenClaw 展现出极高的开发密度，日活 PR 量巨大，重心在于核心代码重构与性能优化。中小型项目如 NanoBot 则聚焦于解决跨平台兼容性与渠道集成的边缘缺陷，社区贡献者正在主动清理技术债务。整体来看，生态的健康度良好，但普遍面临“已知 Bug 积压”与“核心状态机逻辑复杂性”带来的维护压力。

## 2. 各项目活跃度对比

| 项目 | 日更 Issues | 日更 PRs | 待合并 PR | 已关闭/合并 PR | 版本发布 | 健康度评估 |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 6 | 50 | 48 | 2 | 无 | **高活跃/拥堵**。PR 积压严重，需加速审查以避免主干分支阻塞；存在 P0 级阻断性 Bug。 |
| **NanoBot** | 4 | 13 | 11 | 2 | 无 | **中等活跃/稳健**。合并率偏低，大量修复处于审查阶段；社区正通过高质量 PR 批量修复底层缺陷。 |

*注：OpenClaw 的 PR 数量是 NanoBot 的近 4 倍，显示出其作为“核心参照”项目的体量差异。*

## 3. OpenClaw 在生态中的定位
与 NanoBot 等轻量级项目相比，OpenClaw 展现出**平台化**的技术路线差异：
*   **功能侧重**: OpenClaw 专注于多通道（Zalo, Telegram, Gateway）的复杂逻辑与 Swarm 多智能体协调，技术架构更深，涉及投影清理、流式增量传输等底层优化；NanoBot 则更侧重于工具链（MCP, Linear）的易用性与单 Agent 在飞书/邮件等具体场景的稳健性。
*   **社区规模与成熟度**: OpenClaw 的日更 PR 量（50+）表明其处于**快速迭代阶段**，拥有庞大的开发资源和极快的响应速度；NanoBot 的日更 PR 量（13）表明其处于**质量巩固阶段**，社区更依赖外部贡献者（如 `2gg-bit`）进行细致的回归修复。
*   **优势**: OpenClaw 在性能优化（如使用 Bun 替代 Node 测试）和大规模架构重构（"deslop" 系列）上具有领先优势，适合追求极致性能和多智能体协调的高级用户。

## 4. 共同关注的技术方向
尽管体量不同，两个项目在今日动态中共同涌现了对以下技术方向的关注：
*   **内部状态与信息泄漏防御**: 这是今日最显著的共性痛点。OpenClaw 的高关注度 Issue #82121 报告了内部截断标记 `...(truncated)...` 泄漏至用户回复；NanoBot 的 Issue #5903 则指出飞书渠道空闲压缩后，内部系统标记 `"Continue the active task..."` 被错误发送给用户。这反映出智能体在“系统层”与“用户层”边界处理上普遍缺乏隔离机制。
*   **工具与渠道的跨平台边缘鲁棒性**: OpenClaw 在 Zalo 渠道上遭遇媒体文件仅作为链接传递的问题；NanoBot 在 Windows 平台遭遇 CRLF 换行符处理导致的文件损坏，以及因未知字符集导致的邮件轮询崩溃。两者均表明，开源智能体在跨平台和非结构化数据处理上仍缺乏足够的韧性。
*   **资源调度的精细化**: OpenClaw 正在开发 Swarm 的“自适应测试时计算”和“有界启动契约”；NanoBot 提出了基于“白名单 + 跳数限制”的 Bot-to-Bot 通信机制。这预示着社区正在从单一 Agent 执行转向多 Agent 协作与资源精细化治理。

## 5. 差异化定位分析
*   **功能侧重**: OpenClaw 侧重“多智能体（Swarm）协调与底层性能榨取”，适合构建复杂的企业级多通道代理网络；NanoBot 侧重“单智能体在特定渠道（飞书/邮件/Linear）的可靠落地”，适合个人或小团队的工作流自动化。
*   **目标用户**: OpenClaw 的用户更倾向于全栈开发者或平台构建者，关注 CPU 占用、内存插件测试等底层指标；NanoBot 的用户更倾向于应用开发者或终端用户，关注 UI 可观测性（如 `tokens/sec` 指标）与跨平台文件操作体验。
*   **技术架构**: OpenClaw 的架构复杂度体现在核心验证、结果投影与多通道网关流式传输上；NanoBot 的复杂度更多体现在渠道适配层（飞书、MCP 分页）和底层时区/编码数据处理上。

## 6. 社区热度与成熟度
*   **快速迭代阶段 (OpenClaw)**: 48 个待合并的 PR 积压量表明项目处于高速发展中。尽管维护者响应迅速，但大量代码清理和性能优化 PR 的堆积使得主干分支面临拥堵风险。项目成熟度较高，但需要建立更高效的 PR 审查流水线。
*   **质量巩固阶段 (NanoBot)**: 13 个 PR 中 11 个待合并，且其中 6 个 P2 级别 PR 均由外部贡献者提交，涵盖了时区、文件编码、网络去重等基础逻辑。这表明项目核心功能已定型，社区正集中精力提升底层工具的健壮性，处于打磨产品细节的成熟期。

## 7. 值得关注的趋势信号
1.  **“系统痕迹”用户化 (Leakage as a Bug)**: 过去智能体将内部标记作为正常输出被视为特性或边缘 case，如今两个头部项目均将其视为破坏用户体验的高优先级 Bug。这表明 AI 智能体正在走向“拟人化”与“透明化”的临界点，开发者需引入更严格的输出过滤器。
2.  **多智能体通信的安全边界**: OpenClaw 的“有界启动契约”与 NanoBot 的“跳数限制白名单”显示出行业开始正视多 Bot 交互带来的安全风险与资源耗竭问题。未来 AI 智能体框架必将内建更严格的 ACL 与状态机验证。
3.  **底层工具链的回归测试价值**: NanoBot 贡献者对 Windows 换行符、未知字符集等“看似基础”的 Bug 进行批量修复，提醒开发者在评估开源 Agent 框架时，不应仅关注其 LLM 编排能力，其底层的 I/O、时区和网络处理质量同样决定了生产环境的可用性。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 (2026-09-27)

**项目地址**: [github.com/HKUDS/nanobot](https://github.com/HKUDS/nanobot)

## 1. 今日速览
过去 24 小时 NanoBot 社区保持中等活跃度，共记录 4 个 Issues 更新和 13 个 PR 活动（11 个待合并/开放，2 个已关闭）。今日无新版本发布。项目当前的主要开发重心集中在 **Feishu（飞书）渠道的深度支持**、**邮件/网络工具的错误处理加固** 以及 **底层时区与编码逻辑的修正**。PR 数量较多但合并率偏低（仅 2/13），表明大量修复处于代码审查或等待维护者合入阶段。整体健康度良好，社区贡献者（如 `2gg-bit`, `KailBug`）正在主动清理技术债务并提升核心模块的健壮性。

## 2. 版本发布
*无新版本发布*

## 3. 项目进展
今日合入或关闭的关键 PR 主要集中在工具链和渠道适配方面：

*   **[CLOSED] 修复 MCP 工具分页加载问题 ([#5916](https://github.com/HKUDS/nanobot/pull/5916))**:
    *   **状态**: 已关闭（推测为已合并或无效，根据上下文“待合并11”且此PR标记为CLOSED，结合其修复性质，大概率是功能修复）。
    *   **影响**: 修复了 `connect_mcp_servers()` 仅加载第一页工具的问题。此前，如果 MCP Server 返回分页的 `tools/list` 响应，后续页面的工具即使被显式启用也无法使用。此修复提升了 MCP 集成的可用性。
*   **[CLOSED] 简化 Linear 成员访问管理 ([#5919](https://github.com/HKUDS/nanobot/pull/5919))**:
    *   **状态**: 已关闭。
    *   **影响**: 允许管理员直接在 WebUI 中管理 Linear Agent 的访问权限（成员搜索、头像、开关），无需每个同事交换配对代码。这改善了多用户场景下的 Linear 集成体验。

*(注：其余 11 个 PR 仍处于 OPEN 状态，详见下文“待处理积压”及“Bug 与稳定性”部分，尚未计入“已推进”的量化成果)*

## 4. 社区热点
基于评论数和关注度，以下 Issue 是当前社区讨论的焦点：

*   **#5908 WebUI 实时 Tokens/Sec 指示器 ([#5908](https://github.com/HKUDS/nanobot/issues/5908))**:
    *   **状态**: OPEN, P2
    *   **数据**: 4 条评论，活跃度高。
    *   **分析**: 用户希望在 WebUI 流式响应期间显示 `tokens/sec` 指标。这不仅是 UI 优化，更是**可观测性**需求。用户希望借此判断模型是在正常生成还是卡顿（Stalling）。这是提升用户体验（UX）的重要功能请求，可能涉及前端与后端流式数据的配合。
*   **#5903 飞书渠道隐藏标记泄露问题 ([#5903](https://github.com/HKUDS/nanobot/issues/5903))**:
    *   **状态**: OPEN, Bug
    *   **数据**: 2 条评论。
    *   **分析**: 飞书渠道在空闲压缩（Idle Compaction）后，内部用于会话检查点的隐藏标记 `"Continue the active task..."` 被错误地作为普通聊天消息发送给用户。这是一个明显的**UI/UX 缺陷**，破坏了对话的自然感，需优先修复。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在渠道兼容性和底层数据处理逻辑，大部分已有对应的 Fix PR 提交（由 `2gg-bit` 集中贡献）：

*   **[P1 高优先级] Cron 任务时区计算错误 ([#5922](https://github.com/HKUDS/nanobot/pull/5922))**:
    *   **问题**: 未显式设置 `tz` 时，`_compute_next_run()` 使用 `datetime.now().astimezone().tzinfo`，仅保留 UTC 偏移而丢失夏令时规则。导致跨季节调度时执行时间偏移 1 小时（如纽约时间）。
    *   **修复**: PR 已提交（OPEN），改用 `detect_system_timezone()` 构造 `ZoneInfo` 以保留完整 IANA 时区规则。
    *   **状态**: 等待合并。
*   **[P2] 飞书机器人间消息被误丢弃 ([#5929](https://github.com/HKUDS/nanobot/issues/5929))**:
    *   **问题**: `channels/feishu/runtime.py` 无条件丢弃了来自其他机器人的 @ 消息，尽管飞书平台允许此类事件。
    *   **修复**: PR [#5930](https://github.com/HKUDS/nanobot/pull/5930) 已提交，建议引入“白名单 + 跳数限制”机制来处理 Bot-to-Bot 消息。
    *   **状态**: 等待合并。
*   **[P2] 邮件收件轮询因字符集未知崩溃 ([#5928](https://github.com/HKUDS/nanobot/pull/5928))**:
    *   **问题**: 当邮件 `Content-Type` 声明了 Python 不认识的字符集（如 `unknown-charset`）时，`get_content()` 抛出 `LookupError`，导致异常逃逸出轮询循环，中断服务。
    *   **修复**: PR 已提交，捕获 `LookupError` 并回退到 UTF-8 替换字符解码。
*   **[P2] Sudo 权限循环卡死 ([#5924](https://github.com/HKUDS/nanobot/issues/5924))**:
    *   **问题**: Agent 在需要 sudo 权限时陷入循环。由于 Sudo 授权仅持续一轮（Turn），Agent 在下轮重试时权限已过期，且达到最大迭代次数后仍执着于该命令。
    *   **修复**: 暂无 Fix PR。此问题涉及 Agent 核心状态机或工具调用逻辑，需深入调查。
*   **[P2] 网页抓取 URL 去重逻辑错误 ([#5926](https://github.com/HKUDS/nanobot/pull/5926))**:
    *   **问题**: 去重逻辑将 URL 转小写，导致 `/API` 和 `/api` 被视为同一 URL。第三次请求时，即使 URL 不同也可能被错误拦截。
    *   **修复**: PR 已提交，保留 URL 原始大小写进行精确比较。
*   **[P2] 图片 Base64 解码异常捕获不全 ([#5923](https://github.com/HKUDS/nanobot/pull/5923))**:
    *   **问题**: `base64.b64decode()` 遇到非 ASCII 字符抛出 `ValueError`，但代码仅捕获了 `binascii.Error`（其子类？或父类关系需确认，通常 `binascii.Error` 是 `ValueError` 子类，但原代码可能捕获范围太窄或逻辑反了）。摘要指出需改为捕获 `ValueError` 以涵盖非法字符。
    *   **修复**: PR 已提交。
*   **[P2] Windows 换行符处理导致文件损坏 ([#5925](https://github.com/HKUDS/nanobot/pull/5925))**:
    *   **问题**: `write_file` 在 Windows 上创建文件时，若传入 CRLF 内容，默认文本模式转换会导致重复回车 `\r\r\n`。
    *   **修复**: PR 已提交，指定 `newline=""` 以保留原始换行符。
*   **[P2] Token 截断破坏 Unicode 字符 ([#5920](https://github.com/HKUDS/nanobot/pull/5920))**:
    *   **问题**: 按 Token 截断文本时，若截断点落在多字节字符内部，生成替换字符 `�`。
    *   **修复**: PR 已提交，解码前忽略末尾不完整的 UTF-8 字节。

## 6. 功能请求与路线图信号
*   **WebUI 性能可视化**: [#5908](https://github.com/HKUDS/nanobot/issues/5908) 请求在 WebUI 显示 `tokens/sec`。鉴于已有 4 条讨论且标记为 P2，此功能极可能在近期版本中实现，以增强用户对 AI 响应速度的感知。
*   **飞书 Bot-to-Bot 通信**: [#5929](https://github.com/HKUDS/nanobot/issues/5929) 和 [#5930](https://github.com/HKUDS/nanobot/pull/5930) 显示了社区对飞书渠道高级用法的需求。PR 建议引入“白名单 + 跳数限制”，这表明 NanoBot 正在考虑支持多 Agent 协作或 Bot 集群场景，未来版本可能会在飞书渠道增加相关配置选项。
*   **Linear 权限管理**: 虽然 [#5919](https://github.com/HKUDS/nanobot/pull/5919) 已关闭，但反映了对 WebUI 中更细粒度权限管理的需求。结合飞书的白名单机制，路线图可能倾向于在“渠道集成”中增加更灵活的访问控制（ACL）。

## 7. 用户反馈摘要
*   **痛点 1 (飞书)**: 内部系统消息（Checkpoint markers）泄露到用户界面 ([#5903](https://github.com/HKUDS/nanobot/issues/5903))。用户希望内部实现细节对用户不可见。
*   **痛点 2 (稳定性)**: 邮件轮询因边缘情况（未知字符集）而崩溃 ([#5928](https://github.com/HKUDS/nanobot/pull/5928))。用户期望工具在面对“脏数据”时具有更强的韧性（Resilience），而非抛出未处理异常。
*   **痛点 3 (跨平台一致性)**: Windows 用户遭遇文件写入换行符问题 ([#5925](https://github.com/HKUDS/nanobot/pull/5925))。暗示 NanoBot 在跨平台文件操作上仍有边缘 case 需要覆盖。
*   **痛点 4 (Agent 行为)**: Sudo 循环 ([#5924](https://github.com/HKUDS/nanobot/issues/5924)) 导致 Agent 不可用。用户反映 Agent 在遇到权限不足且无法持续授权时，缺乏优雅的退出或重试机制，而是陷入死循环。

## 8. 待处理积压
维护者需关注以下高优先级或长期未决事项：

1.  **#5922 (P1) Cron 时区 Bug**: 这是一个严重逻辑 Bug，影响定时任务准确性。PR 已就绪，建议优先合并。
2.  **#5924 (Bug) Sudo 循环**: 此 Issue 目前**没有**对应的 Fix PR。由于它影响 Agent 的核心可用性，建议维护者尽快评估并指派修复。
3.  **批量低优先级 Fix PRs**: `2gg-bit` 提交了 6 个 P2 级别的修复 PR（#5920, #5921, #5923, #5925, #5926, #5927）。虽然单个严重性较低，但涉及核心工具（文件、网络、编码、时区），积压过多可能导致代码库处于“已知有 Bug 但未修复”的状态。建议维护者安排一次“清理日”批量审查合并这些高质量的回归修复。
4.  **#5903 (Bug) 飞书泄露**: 已有 Issue 但未见 Fix PR。需确认是否由飞书渠道维护者介入修复。

---
**分析师备注**: 数据截止至 2026-09-27。PR 状态基于 GitHub 标签 `[OPEN]` / `[CLOSED]`。由于 `CLOSED` PR 未明确标记 `Merged`，在“项目进展”中保守描述为“已关闭”，实际效果需查看具体 PR 页面包。

</details>