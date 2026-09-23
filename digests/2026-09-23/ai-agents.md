# OpenClaw 生态日报 2026-09-23

> Issues: 4 | PRs: 50 | 覆盖项目: 2 个 | 生成时间: 2026-09-23 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：2026-09-23**

## 1. 今日速览
OpenClaw 项目今日保持高度活跃，过去24小时内共有 4 条 Issue 更新和 50 条 Pull Request 更新。虽然今日无新版本发布，但开发重心明显偏向稳定性修复与性能优化，包括 Gateway 内存泄漏监控、更新流程修复及会话状态管理。社区关注点集中在解决 P0 级别的崩溃与回归问题上，尤其是 OpenClaw 2026.9.5 版本的安装阻断问题。整体来看，项目处于密集迭代期，维护者对底层基础设施（Gateway、CI/CD、跨平台兼容性）的治理力度加大。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日 50 条 PR 更新中，有 46 条待合并，4 条已合并或关闭。已处理的重要进展包括：
*   **性能优化**：PR #155995 已关闭，通过减少进度更新期间的会话列表重建工作，优化了 Gateway 在忙碌状态下的内存分配与 CPU 消耗。
*   **基础设施修复**：PR #152085 已关闭，修复了 Codex 在破坏性操作禁用策略下，允许对已授权读取进行确认的逻辑问题。
*   **内部重构**：PR #156034 与 #156035 推进了 Doctor 迁移边界与 Gateway 会话查找键的复用重构，虽为用户不可见的内部变更，但有助于提升长期可维护性。

## 4. 社区热点
*   **Gateway 内存泄漏（P0）**：[Issue #91588](openclaw/openclaw Issue #91588) 持续活跃，评论数达 34 条。用户报告 Gateway 进程在数天内 RSS 内存从 350MB 飙升至 15.5GB，触发 OOM 崩溃。该问题被标记为 `impact:crash-loop`，是社区最紧迫的稳定性诉求。
*   **更新流程阻断（P0）**：[Issue #155764](openclaw/openclaw Issue #155764) 与 [Issue #156032](openclaw/openclaw Issue #156032) 反映了 2026.9.5 与 2026.9.2 版本更新失败的问题，主要涉及 `retained_plugin_source_conflict` 和 `unexpected-error`，显示更新机制存在严重回归。
*   **功能扩展讨论**：[Issue #79902](openclaw/openclaw Issue #79902) 讨论在 database-first runtime 上增加 SQLite 转录/会话接口，旨在为高级用户提供规范化的运行时状态访问能力，避免直接解析不透明数据。

## 5. Bug 与稳定性
按严重程度排列：
*   **[P0] 更新阻断回归**：
    *   [Issue #155764](openclaw/openclaw Issue #155764)：2026.9.5 更新因插件源冲突被阻断。
    *   [Issue #156032](openclaw/openclaw Issue #156032)：2026.9.2 更新发生未知错误。
    *   *关联修复*：PR #150153 正在处理跨 Gateway 更新的任务恢复问题（Draft 状态）。
*   **[P0] Gateway 内存泄漏**：
    *   [Issue #91588](openclaw/openclaw Issue #91588)：Gateway 长时间运行导致 OOM 崩溃。
    *   *关联修复*：PR #154946 旨在减少 SQLite schema-check 的重复工作，PR #155957 优化会话列表性能，可能间接缓解内存压力。
*   **[P2] 实时语音通话中断**：
    *   [PR #155839](openclaw/openclaw PR #155839) 修复了 Control UI 中因页面后台活动导致实时语音输入滞后并中断通话的 Bug。
    *   [PR #155838](openclaw/openclaw PR #155838) 确保在特定 provider 下保留 Grok 转录和语音咨询状态。

## 6. 功能请求与路线图信号
*   **Google Interactions API**：[PR #149880](openclaw/openclaw PR #149880) 引入 `google-interactions` 后端，支持 Gemini Interactions 用于文本、图像及工具调用，预计将在近期版本中作为可选功能推出。
*   **ChatGPT 登录集成**：[PR #148567](openclaw/openclaw PR #148567) 添加“Sign in with ChatGPT”功能，允许通过 Responses API 进行认证，扩展了 OpenAI 生态的接入方式。
*   **iOS 选区操作**：[PR #143610](openclaw/openclaw PR #143610) 为 iOS 应用增加针对已选中对话的操作支持，提升 Siri 和 Shortcuts 的交互体验。
*   **个人指令编辑**：[PR #155256](openclaw/openclaw PR #155256) 允许用户通过 Profile 或聊天直接编辑 `USER.md` 个人指令，增强了个性化配置的便捷性。

## 7. 用户反馈摘要
*   **痛点**：用户强烈不满于更新过程中的不透明失败（如 #155764 中的 `retained_plugin_source_conflict`），导致无法修复或升级系统。Gateway 的内存增长（#91588）导致生产环境服务不稳定，严重影响依赖长时会话的用户。
*   **满意度**：社区对性能优化类 PR（如 #155995, #154946）持积极态度，认为这些底层改进有助于提升整体响应速度。
*   **场景**：高级用户（如 #79902 作者）希望获得更稳定的 API 接口来构建外部工具，而非依赖内部状态解析。

## 8. 待处理积压
*   **[P0] Gateway 内存泄漏**：[Issue #91588](openclaw/openclaw Issue #91588) 创建于 2026-06-09，至今仍有 34 条新评论，但标记为 `clawsweeper:no-new-fix-pr`，表明缺乏直接的修复 PR，需维护者优先级排查根本原因。
*   **[P2] 技能集合审查认证**：[PR #136365](openclaw/openclaw PR #136365) 创建于 2026-09-02，修复订阅认证下的技能审查问题，目前状态为 `stale` 且 `needs proof`，需维护者验证其安全性与兼容性。
*   **[P0] 插件节点路由权限**：[PR #123457](openclaw/openclaw PR #123457) 创建于 2026-08-14，涉及 Gateway 安全边界（`security-boundary`），目前 `waiting on author`，因涉及权限提升风险，需尽快完成安全审查。

---

## 横向生态对比

1. **生态全景**
个人 AI 助手与自主智能体开源生态在 2026 年 9 月下旬呈现出“基础设施加固与多模态扩展并行”的态势。核心项目不再仅仅关注大模型接入，而是将重心转向底层运行时（Gateway/Context）的稳定性、内存管理以及跨平台渠道（Telegram/iOS/Control UI）的精细化体验。社区对长时会话的健壮性（如上下文压缩、内存泄漏）及自动化任务执行逻辑的可靠性提出了更高要求，标志着生态正从“快速功能堆叠”迈向“生产级可用性治理”阶段。

2. **各项目活跃度对比**

| 指标 | OpenClaw | NanoBot |
| :--- | :--- | :--- |
| **Issue 更新数** | 4 | 3 |
| **PR 更新数** | 50 | 29 |
| **版本发布** | 无 | 无 |
| **关键状态** | 密集迭代，P0 崩溃/更新阻断优先 | 快速落地，核心 Bug 修复与渠道优化 |
| **健康度评估** | **中等偏高**。开发活跃度高，但存在 P0 级稳定性回归（Gateway 内存、更新阻断），底层治理压力大。 | **良好**。修复闭环效率高（14/29 PR 已合并/关闭），重点解决上下文死锁与渠道体验，积压项较少。 |

3. **OpenClaw 在生态中的定位**
OpenClaw 在该生态中扮演着**重型基础设施与标准化运行时**的角色。相较于 NanoBot，其技术路线更侧重于通过 Gateway 提供复杂的会话状态管理、多后端集成（如 Google Interactions, ChatGPT Login）及系统级安全边界（插件路由权限）。其优势在于对高级用户工具链的深度支持（如 SQLite 转录接口、iOS 选区操作）及企业级安全审计；差异在于其架构复杂度更高，导致当前面临更多 P0 级稳定性挑战。从社区规模看，OpenClaw 的 Issue 讨论热度（如 #91588 34 条评论）显著高于 NanoBot，表明其拥有更广泛的开发者及高级用户基数，但也因此背负了更高的维护成本。

4. **共同关注的技术方向**
尽管项目架构不同，以下技术方向在两个项目中均出现显著信号：
*   **上下文与记忆管理**：NanoBot 修复了自动摘要的令牌预算保护缺失（#5857）及压缩重复通知（#5870）；OpenClaw 正在优化 Gateway 内存分配与会话列表重建（#155995）并讨论规范化运行时状态访问（#79902）。共同诉求在于解决长对话下的系统健壮性与状态透明性。
*   **渠道体验优化**：NanoBot 集中在 Telegram 富消息与细节修复（#5614, #5803）；OpenClaw 侧重于 iOS 选区操作及 Control UI 的实时语音通话修复（#143610, #155839）。共同目标是将 AI 助手从“文本交互”升级为“多模态、低延迟、高保真”的全渠道体验。
*   **工具调用与集成扩展**：NanoBot 推进 Linear 集成及供应链安全（#5871, #5866）；OpenClaw 扩展 Google Interactions API 及 ChatGPT 登录（#149880, #148567）。共同趋势是深化第三方 SaaS 与主流模型生态的原生集成，同时加强集成过程的安全性审计。

5. **差异化定位分析**
*   **功能侧重**：OpenClaw 侧重**系统级基础设施**（Gateway、CI/CD、跨平台兼容性、安全边界），适合需要高度可控运行时的场景；NanoBot 侧重**垂直渠道体验与轻量任务执行**（Telegram 优化、心跳任务、WebUI 简洁性），适合日常自动化与即时通讯交互。
*   **目标用户**：OpenClaw 主要面向构建外部工具的高级开发者、需要长期维护会话状态的企业级用户及 iOS 深度用户；NanoBot 面向依赖即时通讯渠道（Telegram/Discord）的个人自动化用户及关注轻量级智能体执行逻辑的开发者。
*   **技术架构**：OpenClaw 采用更复杂的运行时状态管理，涉及 SQLite 底层交互及多后端路由；NanoBot 架构更精简，强调任务调度（Cron/心跳）与多模态输入处理的直接性，两者在底层状态同步与工具验证逻辑上存在显著差异。

6. **社区热度与成熟度**
*   **快速迭代阶段**：**NanoBot**。今日 29 条 PR 中有 14 条合并/关闭，快速响应并解决了上下文死锁等近期回归问题，显示出极高的敏捷修复能力。
*   **质量巩固/底层治理阶段**：**OpenClaw**。50 条 PR 更新中有 46 条待合并，且资源大量投入于 Gateway 内存泄漏（P0）与更新阻断（P0）的排查。这并非衰退，而是项目规模扩大后，为维护生产环境稳定性而进行的密集底层治理。OpenClaw 目前处于“功能扩展”与“稳定性兜底”双线并行的复杂周期。

7. **值得关注的趋势信号**
*   **长时会话的“内存经济学”**：从 OpenClaw 的 Gateway 内存飙升至 NanoBot 的上下文预算保护，AI 助手开发者必须将“长时运行状态下的内存/Token 控制”视为与功能扩展同等重要的核心指标。
*   **供应链与插件安全边界**：OpenClaw 对插件节点路由权限的审查及 NanoBot 对远程包安装来源（Provenance）的强调，表明开源 AI 生态正在构建类似操作系统级的供应链安全与沙箱机制，这将是未来企业级落地的必备条件。
*   **规范化的状态访问层**：用户不再满足于解析不透明日志，OpenClaw 推进的 SQLite 转录接口预示着未来的智能体将提供标准化 API 来暴露内部状态，以便第三方工具链进行更复杂的编排与审计。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 (2026-09-23)

### 1. 今日速览
NanoBot 项目今日保持较高活跃度，过去 24 小时内共更新 3 条 Issue 和 29 条 Pull Request，其中 14 条 PR 已合并或关闭，显示出核心功能与稳定性修复正在快速落地。主要精力集中在 Telegram 渠道优化、上下文压缩机制修复以及 WebUI 体验改进上。虽然今日无新版本发布，但针对上下文压缩死锁（#5849）和重试机制回归（#4896, #4915）的关键修复已合并，显著提升了系统在大文本场景下的健壮性。社区对于多模态支持（视频输入）和自动化任务执行逻辑的讨论正在积累，为后续路线图提供信号。

### 2. 版本发布
今日无新版本发布。

### 3. 项目进展
今日多项关键 PR 合并或关闭，主要推进了以下方面：
*   **上下文压缩机制修复**：PR [#5857](https://github.com/HKUDS/nanobot/pull/5857) 合并，修复了自动摘要过程中的令牌预算保护缺失问题，解决了历史对话过长导致无法恢复的死锁风险。
*   **心跳任务逻辑重构**：PR [#4896](https://github.com/HKUDS/nanobot/pull/4896) 和 [#4915](https://github.com/HKUDS/nanobot/pull/4915) 关闭，修复了从 v0.2.1 版本迁移到 Cron 后，心跳任务从“报告”变为“执行”的回归问题，并增加了更可配置的评价器。
*   **Telegram 渠道优化**：PR [#5614](https://github.com/HKUDS/nanobot/pull/5614) 关闭，实现了 Telegram 富消息流的发送支持，提升了聊天体验；PR [#5783](https://github.com/HKUDS/nanobot/pull/5783) 关闭，修复了提供商在包含工具调用时剥离助手内容的问题。
*   **文件系统与安全修复**：PR [#5867](https://github.com/HKUDS/nanobot/pull/5867) 和 [#5868](https://github.com/HKUDS/nanobot/pull/5868) 关闭，分别修复了 BOM 标记文本解码错误以及 Windows 下带引号路径的可执行文件调用问题。

### 4. 社区热点
*   **上下文压缩重复通知**：[Issue #5870](https://github.com/HKUDS/nanobot/issues/5870) 记录了 Telegram 渠道中“Context compacted”提示多次重复出现的问题，目前有 3 条评论。用户反馈这影响了聊天体验，且与日志中显示的自动压缩行为相关。该问题目前仍处于 OPEN 状态，是近期讨论较活跃的功能缺陷。
*   **视频支持功能请求**：[Issue #5869](https://github.com/HKUDS/nanobot/issues/5869) 请求添加对视频输入的多模态支持（如 Qwen3.8 或 Mino-v2.6）。虽然目前评论数为 0，但代表了用户对当前仅保存磁盘路径并传递文本给 LLM 的现状的不满，是潜在的高价值功能诉求。

### 5. Bug 与稳定性
按严重程度排列，今日涉及的 Bug 及修复状态如下：

*   **高优先级 (P1)**
    *   **重试延迟逻辑错误**：[PR #4959](https://github.com/HKUDS/nanobot/pull/4959) 已关闭，修复了 LLM 瞬时错误重试时延迟计算少 1 秒的问题（例如 25s 变成 26s），解决了频繁的“too many requests per minute”告警。
    *   **Token 估算性能**：[PR #5861](https://github.com/HKUDS/nanobot/pull/5861) 处于 OPEN 状态，旨在通过后台预热 Fallback Tokenizer 来避免聊天界面在使用 UTF-8 字节估算时的卡顿或等待，需关注其合并进展。
*   **中优先级 (P2)**
    *   **上下文压缩死锁**：[Issue #5849](https://github.com/HKUDS/nanobot/issues/5849) 描述的自动压缩无预算保护问题已通过 [PR #5857](https://github.com/HKUDS/nanobot/pull/5857) 修复并合并。
    *   **Telegram 细节修复**：[PR #5803](https://github.com/HKUDS/nanobot/pull/5803) 处于 OPEN 状态，包含 3 个小改进：富消息换行符处理、`topic_id` 在 `my` 工具中的可用性、以及打字状态在启用 Topic 时的尊重。
    *   **Discord 任务取消**：[PR #5864](https://github.com/HKUDS/nanobot/pull/5864) 处于 OPEN 状态，修复了 Discord 运行时重置时未取消延迟表情反应任务的问题。
    *   **工具参数验证**：[PR #5859](https://github.com/HKUDS/nanobot/pull/5859) 已关闭，修复了布尔型 JSON 子模式在参数验证时导致崩溃的问题。

### 6. 功能请求与路线图信号
*   **多模态视频输入**：[Issue #5869](https://github.com/HKUDS/nanobot/issues/5869) 提出的视频支持请求，结合当前 Omni 模型的发展趋势，很可能成为下一版本的重要特性。目前尚无针对此具体 Issue 的开放 PR，但基础的多模态架构可能在演进中。
*   **Linear 集成优化**：[PR #5871](https://github.com/HKUDS/nanobot/pull/5871) 处于 OPEN 状态，旨在改进 Linear 原生代理用户体验，包括 OAuth 回调真实性、工作区健康检查以及工具设置路径的简化。这表明项目正在加强第三方 SaaS 工具（如 Linear）的集成深度。
*   **CLI 应用安全**：[PR #5866](https://github.com/HKUDS/nanobot/pull/5866) 处于 OPEN 状态，建议在 `nanobot apps` 安装远程包时记录安装来源（Provenance），并在注册表数据漂移时失败关闭，以增强供应链安全性。

### 7. 用户反馈摘要
*   **痛点**：用户在 Telegram 渠道中抱怨上下文压缩通知的冗余（[Issue #5870](https://github.com/HKUDS/nanobot/issues/5870)），以及视频文件无法直接作为多模态输入，只能获取磁盘路径的不便（[Issue #5869](https://github.com/HKUDS/nanobot/issues/5869)）。
*   **满意/改进**：通过 [PR #5831](https://github.com/HKUDS/nanobot/pull/5831) 和 [PR #5862](https://github.com/HKUDS/nanobot/pull/5862) 的合并，WebUI 的消息控制更加简洁，Markdown 表格的换行显示得到修复，提升了桌面端的使用体验。
*   **使用场景**：用户正在探索使用 NanoBot 进行自动化任务执行（而非仅仅是报告），对心跳机制的可靠性要求较高（参考 [PR #4896](https://github.com/HKUDS/nanobot/pull/4896) 的修复背景）。

### 8. 待处理积压
*   **嵌套 JSON 工具参数解码**：[PR #5314](https://github.com/HKUDS/nanobot/pull/5314) 创建于 2026-08-10，至今仍有 2 个月以上处于 OPEN 状态（标记有冲突）。该 PR 修复了 OpenAI 兼容提供商返回嵌套 JSON 字符串导致 MCP 工具调用验证失败的问题。由于涉及底层工具调用逻辑，且存在合并冲突，建议维护者优先解决此积压项，以改善多提供商兼容性。
*   **Telegram 小改进**：[PR #5803](https://github.com/HKUDS/nanobot/pull/5803) 创建于 2026-09-17，包含多个用户体验细节修复，目前仍待合并。鉴于 Telegram 是主要渠道之一，建议尽快审查合并以提升渠道质量。

</details>