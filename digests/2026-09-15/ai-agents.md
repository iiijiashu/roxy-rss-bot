# OpenClaw 生态日报 2026-09-15

> Issues: 2 | PRs: 50 | 覆盖项目: 2 个 | 生成时间: 2026-09-15 04:59 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw 项目深度报告

**OpenClaw 项目动态日报 — 2026-09-15**

## 1. 今日速览
OpenClaw 今日活动以 PR 为主（50 条更新，40 条待合并，10 条已关闭），Issue 仅 2 条。项目处于活跃迭代期，重点修复进程泄漏、Gateway 启动、UI 交互等问题，整体健康度良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日关闭的重要 PR：
- [#148756](https://github.com/openclaw/openclaw/pull/148756) 修复聊天中显示本地模型名称。
- [#143234](https://github.com/openclaw/openclaw/pull/143234) 修复 Code Mode 工具调用中超时报告为内部错误的问题。
- [#148767](https://github.com/openclaw/openclaw/pull/148767) 加速冷启动模型策略加载。
- [#148779](https://github.com/openclaw/openclaw/pull/148779) 移除 Venice 重复的发现 fallback fixture。
- [#148780](https://github.com/openclaw/openclaw/pull/148780) 非 UTF-8 文件名测试 fixture 修复。

## 4. 社区热点
- [#97616](https://github.com/openclaw/openclaw/issues/97616) [P1] 子进程泄漏导致僵尸累积和运行时退化 — 31 评论。这是回归问题，影响长期运行稳定性。
- [#148584](https://github.com/openclaw/openclaw/issues/148584) [P1，已关闭] Gateway 启动时跳过插件 CLI 后端 — 5 评论。已解决。
- [#143250](https://github.com/openclaw/openclaw/pull/143250) 允许 pin Home-parented dashboard sessions，解决 #142673。
- [#148135](https://github.com/openclaw/openclaw/pull/148135) 将 runtime identity 传入 context-engine recall assembly，修复 #148033。
- [#148311](https://github.com/openclaw/openclaw/pull/148311) [P1] 修复 MCP 清理失败时的 slot 泄漏，解决 #144527。

## 5. Bug 与稳定性
- **[P1] 子进程泄漏** (#97616)：hook/tool 执行后未 reap 子进程，形成 zombie，长期运行后退化。已有关注但未 closed。
- **[P1] MCP slot 泄漏** (#144527)：每个隔离 cron 运行泄漏一个 runtime slot，256 上限命中后全部失败。PR #148311 已提交。
- **[P1] Gateway 启动跳过插件** (#148584)：已关闭，修复已合入。
- **P2 各类**：TTS 音频显示 (#148696)、浏览器面板缩放 (#148187)、背景任务输出显示 (#148138) 等均有 PR 跟进。

## 6. 功能请求与路线图信号
- **Wear OS 共享 Gateway 客户端** (#142954)：减少 Android/Wear OS 重复实现，信号表明移动端覆盖在扩展。
- **后台任务显示实际输出** (#148138)：用户希望看到 exec 命令的真实输出而非泛化 summary。
- **Dashboard session pinning** (#143250)：UI 交互细节改进，说明用户对会话管理有精细需求。
- **Suspension preflight + plugin participants** (#128994)：宿主控制器需要安全停机能力，面向企业部署场景。

## 7. 用户反馈摘要
- 长期运行的 agent 存在进程泄漏风险，用户担心生产环境稳定性。
- MCP 插槽泄漏是近期新发现的高严重性 bug，影响 cron 任务。
- 本地模型fallback 时 UI 显示错误模型名，影响调试体验。
- 浏览器面板拖拽会重排被 agent 操作的页面，是交互 bug。

## 8. 待处理积压
- [#97616](https://github.com/openclaw/openclaw/issues/97616)：子进程泄漏问题已标注 P1 但未关闭，需维护者优先处理。
- [#148135](https://github.com/openclaw/openclaw/pull/148135)：runtime identity 线程传入，标记为 "needs proof"，需测试验证。
- [#128994](https://github.com/openclaw/openclaw/pull/128994)：Suspension preflight 大 PR，需 maintainer 评审。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比 — 2026-09-15

## 1. 生态全景
个人 AI 助手开源生态正处于从「原型验证」向「生产可用」过渡的关键期。OpenClaw 与 NanoBot 均面临子进程/MCP 泄漏等长期运行稳定性问题，同时移动端体验（PWA/iOS）和国际化（i18n）成为新竞争维度。项目健康度整体良好，但 P1 级 bug 积压需警惕。

## 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | Release | 健康度 |
|---|---|---|---|---|
| OpenClaw | 2 | 50（40 开放/10 关闭） | 无 | 良好，积压需关注 |
| NanoBot | 6（5 开放/1 关闭） | 25（12 开放/13 关闭） | 无 | 良好，修复响应快 |

## 3. OpenClaw 在生态中的定位
- **优势**：PR 吞吐量大（50 条/日），Contributor 活跃；专注企业级功能（Suspension preflight、Session pinning、Wear OS 共享客户端）。
- **技术路线差异**：采用 Gateway 架构，插件系统成熟；相比 NanoBot 更注重多端协同与后台任务可观测性。
- **社区规模**：Issue 仅 2 条，表明新用户反馈较少或 bug 解决效率高。

## 4. 共同关注的技术方向
- **进程/资源泄漏**：OpenClaw 子进程泄漏（#97616，P1）与 NanoBot Cron slot 泄漏（#144527）属同类问题。
- **移动端体验**：NanoBot iOS PWA 四项 bug（#5770-5773）集中爆发；OpenClaw 推进 Wear OS 支持（#142954）。
- **可观测性**：NanoBot ToolInvocationContext（#5750）与 OpenClaw 后台任务输出可见（#148138）均指向调试需求。
- **Provider 容错**：NanoBot NIM 超时修复（#5674/#5769）反映多 provider 集成的稳定性挑战。

## 5. 差异化定位分析
- **OpenClaw**：定位企业级/自托管 Agent 平台，强于 Gateway 架构、插件生态、会话管理精细化。
- **NanoBot**：定位个人/轻量级 Agent，强于多 provider 支持（Nvidia NIM、Telegram 自定义 API）、i18n（新增波兰语）、WebUI 快速迭代。

## 6. 社区热度与成熟度
- **OpenClaw**：快速迭代期，PR 合并活跃，但 P1 子进程泄漏（#97616）长期未关闭，需维护者优先处理。
- **NanoBot**：质量巩固期，Bug 修复响应迅速（DuckDuckGo hangs 已关闭），移动端 bug 集中爆发显示 iOS 适配待加强。

## 7. 值得关注的趋势信号
- **Agent 长期运行稳定性**是行业瓶颈，子进程/资源泄漏需架构级解决。
- **移动端 PWA 体验**成为新战场，iOS 适配问题频发。
- **Provider 容错**直接影响生产可用性，多 provider fallback 策略值得跟进。
- **对开发者价值**：自托管场景优先关注 OpenClaw 的 Suspension preflight；轻量部署可参考 NanoBot 的 Provider failover 模式。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目动态日报 — 2026-09-15**

## 1. 今日速览
NanoBot 今日活动活跃：6 条 Issue 更新（5 条开放，1 条关闭），25 条 PR 更新（12 条开放，13 条关闭/合并）。重点是 Cron 调度器修复、Provider 容错改进和 WebUI 移动端体验优化，项目健康度良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并/关闭的重要 PR：
- [#5774](https://github.com/HKUDS/nanobot/pull/5774)：恢复 archive tool call，避免 raw fallback 前的数据丢失。
- [#5728](https://github.com/HKUDS/nanobot/pull/5728)：性能优化——减少流式文本处理和经典 CLI 重绘开销。
- [#5761](https://github.com/HKUDS/nanobot/pull/5761)：修复 edit_file 删除换行符的回归，统一成功摘要。
- [#5686](https://github.com/HKUDS/nanobot/pull/5686)：修复 Cron 定时器在 job 执行期间的重装问题。
- [#5751](https://github.com/HKUDS/nanobot/pull/5751)：编辑自动化详情时保留待运行项。
- [#5730](https://github.com/HKUDS/nanobot/pull/5730)：内部模型调用增加 idle timeout 流式支持。
- [#5684](https://github.com/HKUDS/nanobot/pull/5684)：更新 README WebUI 功能展示。
- [#5734](https://github.com/HKUDS/nanobot/pull/5734)：明确 Dream prompt 写入权限边界。

## 4. 社区热点
- [#2804](https://github.com/HKUDS/nanobot/issues/2804) [已关闭] DuckDuckGo 搜索 hangs 阻塞整个会话 — 4 评论。已解决。
- [#5674](https://github.com/HKUDS/nanobot/issues/5674) Nvidia NIM provider 特定错误导致 agent 停止 — 1 评论。已有 PR #5769 修复。
- [#5770-5773](https://github.com/HKUDS/nanobot/issues/5770)：WebUI iOS PWA 多项 UI bug（白屏、模糊、双击打开、搜索框误显）同一天集中提交，反映移动端体验亟待改善。
- [#5750](https://github.com/HKUDS/nanobot/pull/5750)：暴露 ToolInvocationContext，让工具能获取 stable invocation identity。
- [#5767](https://github.com/HKUDS/nanobot/pull/5767)：新增波兰语本地化（1,536 条消息）。

## 5. Bug 与稳定性
| 严重度 | Bug | 状态 |
|---|---|---|
| P1 | [#5674](https://github.com/HKUDS/nanobot/issues/5674) NIM provider 超时错误导致 agent 停止 | PR #5769 修复中 |
| P2 | [#5773](https://github.com/HKUDS/nanobot/issues/5773) PWA 冷启动白屏 | 待修复 |
| P2 | [#5772](https://github.com/HKUDS/nanobot/issues/5772) iOS PWA 顶部视图渲染模糊 | 待修复 |
| P2 | [#5771](https://github.com/HKUDS/nanobot/issues/5771) 移动端需双击打开会话 | 待修复 |
| P2 | [#5770](https://github.com/HKUDS/nanobot/issues/5770) 移动端侧边栏误触发搜索 tooltip | 待修复 |
| P2 | [#5766](https://github.com/HKUDS/nanobot/issues/5766) Cron 冲突调度字段静默丢弃 | PR #5766 修复中 |
| P2 | [#5762](https://github.com/HKUDS/nanobot/issues/5762) Cron 接受过去时间却不 firing | PR #5762 修复中 |
| P2 | [#5765](https://github.com/HKUDS/nanobot/issues/5765) stream 字段非布尔值误判 | PR #5765 修复中 |

## 6. 功能请求与路线图信号
- [#5666](https://github.com/HKUDS/nanobot/pull/5666) aimlapi.com 作为内置 provider — 第三方聚合商寻求集成。
- [#4919](https://github.com/HKUDS/nanobot/pull/4919) Telegram 自定义 Bot API base URL — 企业/self-hosted 部署需求。
- [#5750](https://github.com/HKUDS/nanobot/pull/5750) ToolInvocationContext — 增强工具的可观测性和调试能力。
- 波兰语本地化 (#5767) 表明国际化是持续方向。

## 7. 用户反馈摘要
- NIM provider 超时错误处理不当，agent 会永久卡死，是生产环境风险。
- WebUI 移动端（尤其 iOS PWA）有多处体验问题：冷启动慢、渲染异常、触控不灵敏，影响移动场景使用。
- Cron 调度器有静默行为缺陷（接受冲突字段、接受过去时间），用户提交定时任务后无反馈。
- DuckDuckGo 搜索 hangs 问题已解决，用户反馈积极。

## 8. 待处理积压
- [#5674](https://github.com/HKUDS/nanobot/issues/5674)：NIM provider 容错，PR #5769 待合并。
- [#5770-5773](https://github.com/HKUDS/nanobot/issues/5770)：WebUI iOS PWA 四个 UI bug 需 prioritized fix。
- [#5764](https://github.com/HKUDS/nanobot/pull/5764)：半开状态 fallback probe 序列化，防止并发请求击穿 cooldown。

</details>