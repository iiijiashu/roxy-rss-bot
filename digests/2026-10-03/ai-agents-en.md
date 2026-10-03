# OpenClaw Ecosystem Digest 2026-10-03

> Issues: 8 | PRs: 50 | Projects covered: 2 | Generated: 2026-10-03 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw Deep Dive

## OpenClaw Project Digest – 2026‑10‑03

### 1. Today's Overview
OpenClaw shipped a new `extended-stable` (LTS-equivalent) release, **v2026.8.35**, focused on the gateway with critical security updates, reliability/performance fixes, and new model support. Activity is strong: 8 open issues updated in the last 24h and 50 PRs updated (43 open, 7 merged/closed), indicating a high-velocity engineering and review cycle. The project is actively stabilizing core session/agent infrastructure (transcript projection, rewind, worker placement) while also expanding model and channel capabilities. Overall project health is good, with notable attention to long-running session performance and multi-channel reliability.

### 2. Releases
- **v2026.8.35 – gateway-only `extended-stable` (LTS-equivalent)**  
  - Content per release notes: OpenClaw from the end of August 2026 plus critical security updates, reliability and performance fixes, and features like new model support.  
  - Migration/impact: The release note text was truncated in the source, so confirm changelog details before treating it as a drop-in upgrade. Gateway-centric release — expect changes primarily in gateway behavior/perf/security rather than client-only features.

  Link: openclaw/openclaw Release v2026.8.35

### 3. Project Progress (Merged/Closed PRs today)
Seven PRs were merged/closed in the last 24h, mostly test/CI and UI locale refreshes:

- **PR #163887** (CLOSED) – `chore(ui): refresh control ui locales` — keeps generated Control UI locales synchronized via protected-branch-safe workflow.  
- **PR #163882** (CLOSED) – `fix(test): session search scope fixture times out before querying` — fixes a regression-test timeout in session-search scope coverage.  
- **PR #163883** (CLOSED) – `fix(test): compaction lifecycle tests race awaited persistence` — stabilizes compaction lifecycle tests against real persistence timing.  
- **PR #163879** (CLOSED) – `fix(ci): keep shell values free of terminal colors` — prevents ANSI color codes from leaking into CI shell values, fixing invalid worker args/status parsing.  
- **PR #163884** (OPEN but updated today) – `fix(test): Doctor locator fixture uses retired Discord config` — small test fix; noted here as a quick-turnaround item likely to close soon.

Net: Today’s merged work is largely “quality/robustness” — test flakiness, CI hygiene, and UI locale sync — consistent with hardening around the new LTS release.

### 4. Community Hot Topics (Most active Issues/PRs by comments/reactions)
Ranked by comment count/reactions among items updated today:

- **Issue #103198** (8 comments, 3 👍) – WebChat image attachments not mapped to media store path (tool receives `image_0`).  
  [openclaw/openclaw#103198](https://github.com/openclaw/openclaw/issues/103198)  
  Underlying need: reliable media-path resolution for inbound images across WebChat/media store.

- **Issue #70266** (5 comments, 1 👍) – Use assistant avatar in macOS Talk Mode overlay.  
  [openclaw/openclaw#70266](https://github.com/openclaw/openclaw/issues/70266)  
  Underlying need: consistent assistant identity/branding across voice/overlay UX.

- **Issue #129884** (3 comments) – Opt-in path excludes / bounded path-authority weights for builtin memory search ranking.  
  [openclaw/openclaw#129884](https://github.com/openclaw/openclaw/issues/129884)  
  Underlying need: controllable memory ranking when derivative “dreaming” files outrank canonical records.

- **Issue #153976** (3 comments, P1) – Active transcript projection rebuild is a full-table rescan; rejects inbound messages while running (~64s on a 1.2k-event session).  
  [openclaw/openclaw#153976](https://github.com/openclaw/openclaw/issues/153976)  
  Underlying need: high-availability session state for long-lived channels (e.g., WeChat daily automation).

- **PR #163185** (P2, “diamond lobster”) – Control UI file links outside session workspace fail; HTML previews drop assets.  
  [openclaw/openclaw#163185](https://github.com/openclaw/openclaw/pull/163185)  
  Underlying need: robust cross-session/external file access in the Web UI.

- **PR #163814** (P1) – Stale pause notice wakes the requester after a quick subagent follow-up.  
  [openclaw/openclaw#163814](https://github.com/openclaw/openclaw/pull/163814)  
  Underlying need: accurate agent/subagent pause/resume semantics in message delivery.

### 5. Bugs & Stability (ranked by severity, with fix PRs where present)
**P1 / high severity**
- **Issue #153976** – Full-table rescan on transcript projection invalidation blocks inbound messages (`SessionTranscriptProjectionUnavailableError`). No fix PR listed yet.  
  [openclaw/openclaw#153976](https://github.com/openclaw/openclaw/issues/153976)
- **Issue #163871** – Control UI “Rewind” for `claude-cli` drops the session binding, causing loss of all context. No fix PR listed yet.  
  [openclaw/openclaw#163871](https://github.com/openclaw/openclaw/issues/163871)
- **PR #150992** (fix exists) – Rerun onboarding rewrites trusted-proxy gateway to token auth.  
  [openclaw/openclaw#150992](https://github.com/openclaw/openclaw/pull/150992)
- **PR #163645** (feature/fix track) – Add native inference runtime for restricted workers (security-sensitive; needs proof).  
  [openclaw/openclaw#163645](https://github.com/openclaw/openclaw/pull/163645)
- **PR #163853** (security-sensitive) – Route same-root local state mutations through live owner (routing 1/4).  
  [openclaw/openclaw#163853](https://github.com/openclaw/openclaw/pull/163853)
- **PR #126224** (security-sensitive) – Recover after model catalog generation mismatch.  
  [openclaw/openclaw#126224](https://github.com/openclaw/openclaw/pull/126224)
- **PR #163877** (P1, backport) – Invalid-answer recovery for `ask-user` on September branch; prevents unhandled errors escaping into channel ingress.  
  [openclaw/openclaw#163877](https://github.com/openclaw/openclaw/pull/163877)

**P2**
- **Issue #103198** – WebChat image attachments not mapped to real media store paths. No fix PR listed yet.  
  [openclaw/openclaw#103198](https://github.com/openclaw/openclaw/issues/103198)
- **PR #163880** – Voice relays disconnect/stall between replies (Talk Mode).  
  [openclaw/openclaw#163880](https://github.com/openclaw/openclaw/pull/163880)
- **PR #163185** – Web UI file links outside session workspace fail; HTML previews drop assets.  
  [openclaw/openclaw#163185](https://github.com/openclaw/openclaw/pull/163185)
- **PR #163825** – Declarative role assignment by GitHub login (security-sensitive; waiting on author).  
  [openclaw/openclaw#163825](https://github.com/openclaw/openclaw/pull/163825)
- **PR #147886** – Feishu channel rejects documented `markdown.tables` option, blocking gateway startup.  
  [openclaw/openclaw#147886](https://github.com/openclaw/openclaw/pull/147886)
- **PR #162759** – Webhooks preserve callbacks while retiring implicit ports (compatibility-sensitive).  
  [openclaw/openclaw#162759](https://github.com/openclaw/openclaw/pull/162759)
- **PR #163893** – Deliver final replies across reloads for channels without sender preparation (e.g., non-Telegram channels).  
  [openclaw/openclaw#163893](https://github.com/openclaw/openclaw/pull/163893)

**P3 / lower severity**
- **Issue #163881** – Monolithic extension test typecheck exhausts memory on a 20 GB host. No fix PR listed yet.  
  [openclaw/openclaw#163881](https://github.com/openclaw/openclaw/issues/163881)
- **Issue #64624** – Transient channel connection status system events are noisy; requests suppression/throttling. No fix PR listed yet.  
  [openclaw/openclaw#64624](https://github.com/openclaw/openclaw/issues/64624)

### 6. Feature Requests & Roadmap Signals
Likely candidates for the next version (based on active PRs and feature requests):

- **Worker-local inference and placement**  
  - PR #158902 – Define worker-local inference contracts (additive protocol facts).  
  - PR #163645 – Add native inference runtime for restricted workers.  
  - PR #158903 – Require configured worker placement for sessions (compat/session-state/security-sensitive).  
  [158902](https://github.com/openclaw/openclaw/pull/158902) · [163645](https://github.com/openclaw/openclaw/pull/163645) · [158903](https://github.com/openclaw/openclaw/pull/158903)

- **Session/Workboard UX modernization**  
  - PR #163823 – Rule-based Sessions boards with live facts and no utility model (reduces dependency on classification queues).  
  [163823](https://github.com/openclaw/openclaw/pull/163823)

- **Model ecosystem expansion**  
  - Issue #83030 – Add ReCraft V4.1 image-generation model family via OpenRouter.  
  [83030](https://github.com/openclaw/openclaw/issues/83030)  
  - PR #163891 – Docs add Grokified custom-provider example (OpenAI-compatible hosted API).  
  [163891](https://github.com/openclaw/openclaw/pull/163891)

- **Security/ops hardening**  
  - PR #163825 – Declarative role assignment by GitHub login for gateway operators.  
  [163825](https://github.com/openclaw/openclaw/pull/163825)

- **Voice/Talk Mode reliability**  
  - PR #163880 – Fix voice relay disconnects/stalls between replies.  
  [163880](https://github.com/openclaw/openclaw/pull/163880)

### 7. User Feedback Summary (pain points, use cases, sentiment)
- **Long-lived channel sessions (automation, e.g., WeChat)**: transcript projection rebuilds block inbound messages and take ~64s on large sessions → frustration and message loss risk. [#153976](https://github.com/openclaw/openclaw/issues/153976)
- **Control UI rewind behavior**: `claude-cli` rewind loses context, undermining reliability for iterative work. [#163871](https://github.com/openclaw/openclaw/issues/163871)
- **Web UI file access**: external/cross-session links fail to open; HTML previews drop assets → usability gap for shared/forwarded content. [#163185](https://github.com/openclaw/openclaw/pull/163185)
- **Memory search relevance**: derivative “dreaming” files outrank canonical memory records; users want controllable ranking weights. [#129884](https://github.com/openclaw/openclaw/issues/129884)
- **Channel status noise**: transient disconnect/reconnect system messages are helpful for debugging but noisy in normal operation; users want suppression/throttling. [#64624](https://github.com/openclaw/openclaw/issues/64624)
- **Media handling**: WebChat image attachments not resolved to real media store paths, breaking downstream tools. [#103198](https://github.com/openclaw/openclaw/issues/103198)

Sentiment: Users are deeply invested in reliability and operational control (session state, worker placement, security boundaries). Several high-priority issues point to real production impact, especially around long-running sessions and cross-channel automation.

### 8. Backlog Watch (important items needing maintainer attention)
- **Issue #153976 (P1)** – Transcript projection full-table rescan and message rejection during rebuild. Needs a targeted performance/availability fix; high impact for long-lived channels.  
  [153976](https://github.com/openclaw/openclaw/issues/153976)
- **Issue #163871 (P1)** – `claude-cli` rewind drops session binding; requires a checkpoint-resume fix to preserve context.  
  [163871](https://github.com/openclaw/openclaw/issues/163871)
- **Issue #103198 (P2)** – WebChat image path resolution to media store; blocks reliable image tool usage.  
  [103198](https://github.com/openclaw/openclaw/issues/103198)
- **PR #158903** – Worker placement requirement for sessions; compatibility/session-state/security-sensitive, needs review to avoid regressions.  
  [158903](https://github.com/openclaw/openclaw/pull/158903)
- **PR #163853** – Gateway routing for local state mutations; security-sensitive, part of a multi-PR routing series (1/4).  
  [163853](https://github.com/openclaw/openclaw/pull/163853)
- **PR #163825** – Declarative role assignment by GitHub login; waiting on author and security-sensitive, should be prioritized for review.  
  [163825](https://github.com/openclaw/openclaw/pull/163825)

---
**Data source note:** All items are drawn from the provided GitHub data snapshot for OpenClaw on 2026-10-03. Links point to the corresponding GitHub issues/PRs.

---

## Cross-Ecosystem Comparison

## 1. Ecosystem Overview
The personal AI assistant and agent open-source ecosystem in early 2026 is characterized by a shift from rapid feature expansion to operational robustness and security hardening. Projects like OpenClaw and NanoBot are prioritizing the stabilization of core agent loops, channel integrations, and state management over the introduction of new experimental capabilities. A common industry trend is the decoupling of agent inference from channel logic, with a growing emphasis on reliable worker placement, long-running session persistence, and multi-model compatibility. The landscape reflects a maturation phase where reliability, particularly in handling long-lived automated channels and complex state transitions, has become a primary driver of user satisfaction and project health.

## 2. Activity Comparison

| Project | Issues (Updated/Active) | PRs (Updated/Merged) | Release Status (2026-10-03) | Health Indicator |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 8 open issues updated | 50 updated (43 open, 7 merged) | v2026.8.35 (LTS/Gateway) | High velocity; active stabilization |
| **NanoBot** | 6 active issues | 37 updated (6 key merges) | No new release | High velocity; regression focus |

*Note: Counts reflect items active or updated within the last 24 hours for the specified date.*

## 3. OpenClaw's Position
*   **Advantages vs. Peers:** OpenClaw distinguishes itself through a more complex, multi-layered architecture involving explicit gateway management and worker placement. It offers a structured LTS (Long-Term Support) release cycle (`extended-stable`), providing a more enterprise-ready path for upgrades compared to NanoBot's current focus on immediate regression fixes.
*   **Technical Approach:** OpenClaw employs a "gateway-centric" approach, where core infrastructure (session projection, transcript handling, worker routing) is treated as critical system components. In contrast, NanoBot focuses on lighter-weight agent state management and provider-specific configuration logic.
*   **Community Scale:** OpenClaw exhibits a significantly larger engineering surface area, with ~50 PRs updated daily versus NanoBot's ~37. This suggests OpenClaw has a broader development community or more complex subsystems requiring parallel work, particularly in UI locales, CI hygiene, and cross-channel security.

## 4. Shared Technical Focus Areas
Several technical requirements are emerging across both projects, indicating industry-wide gaps in current agent implementations:

*   **Reliable State Persistence & Recovery:**
    *   *OpenClaw:* Needs to fix full-table rescans in transcript projection that block inbound messages during rebuilds (Issue #153976) and ensure rewind operations do not drop session bindings (Issue #163871).
    *   *NanoBot:* Fixed regressions in cron data integrity (PR #5933) and agent state management where late messages incorrectly marked runs as failed (PR #5995).
    *   *Common Need:* Both projects struggle with ensuring that agent state remains consistent and accessible during high-load or error-condition scenarios.
*   **Channel-Specific Context & Media Handling:**
    *   *OpenClaw:* WebChat image attachments fail to map to media store paths (Issue #103198), and QQ/WeChat automation suffers from session blocking.
    *   *NanoBot:* QQ quoted messages never reach the agent (Issue #6006), breaking contextual follow-ups.
    *   *Common Need:* Reliable extraction and injection of channel-specific metadata (quotes, media paths, sender IDs) into the agent context is a major pain point.
*   **Provider Configuration Robustness:**
    *   *NanoBot:* Logical flaws in `reasoningEffort` settings silently drop `temperature` for 38 providers (Issue #6002).
    *   *OpenClaw:* Security-sensitive routing of local state mutations and model catalog mismatch recovery (PR #163853, #126224).
    *   *Common Need:* Both ecosystems are moving toward stricter validation and explicit error handling for provider configurations to prevent silent failures.

## 5. Differentiation Analysis
*   **Feature Focus:**
    *   **OpenClaw:** Focuses on infrastructure scalability, worker-local inference contracts, and "diamond lobster" control UI enhancements. It is building a platform for multi-channel, long-running automation.
    *   **NanoBot:** Focuses on provider compatibility (GPT-6/Copilot), specific channel quirks (Slack chunking, Telegram markdown), and tool validation safety. It is optimizing the "agent-core" experience for diverse model backends.
*   **Target Users:**
    *   **OpenClaw:** Likely targeted at power users and developers running persistent, multi-channel agents (e.g., WeChat/Feishu automation) who require LTS guarantees and complex session management.
    *   **NanoBot:** Targeted at developers prioritizing rapid iteration across different LLM providers and seeking a lightweight, flexible agent that can handle specific edge cases in tool execution and message routing.
*   **Technical Architecture:**
    *   **OpenClaw:** Heavy infrastructure focus with distinct gateway/worker separation and complex state projection systems.
    *   **NanoBot:** Lighter agent loop with strong emphasis on provider abstraction layers and strict input validation for tool calls.

## 6. Community Momentum & Maturity
*   **OpenClaw (Stabilizing at Scale):** The project is in a "hardening" phase. The release of an LTS-equivalent version (`v2026.8.35`) and the focus on P1/P2 bugs related to performance and security indicate a shift from feature velocity to operational maturity. The high number of open PRs (43) suggests a large backlog of improvements, but the recent merges are focused on test stability and CI hygiene.
*   **NanoBot (Rapid Regression Iteration):** The project is in a "resilience" phase. With no new releases and a focus on closing security loopholes and fixing silent failures, the team is actively maintaining existing functionality. The quick turnaround on regression fixes (e.g., cron data integrity) signals a responsive community that prioritizes user-facing reliability over new feature expansion.
*   **Maturity Comparison:** OpenClaw appears more mature in its release engineering (LTS track) but faces more complex architectural challenges. NanoBot is more agile in its feedback loop but lacks the structured release channels of OpenClaw.

## 7. Trend Signals
*   **Silent Failure Prevention:** Both communities are vocal about "silent" errors (e.g., temperature dropping, sidebar state wiping, quoted messages missing). There is a strong trend toward explicit error propagation and validation in agent interfaces.
*   **Long-Lived Session Availability:** The pain point of blocking inbound messages during state rebuilds (OpenClaw) and state loss on rewind (OpenClaw) signals that developers are deploying agents in continuous, 24/7 workflows. Future agent frameworks must treat session state as a highly available, non-blocking resource.
*   **Provider Abstraction Complexity:** The difficulty in supporting newer models (GPT-6) and handling nuanced provider parameters (`reasoningEffort` vs `temperature`) indicates that provider abstraction layers are becoming a critical bottleneck. Standardization of these parameter mappings across open-source agent frameworks is likely to be a key competitive advantage.
*   **Security in Agent Operations:** With both projects addressing security-sensitive routing and validation (e.g., OpenClaw's gateway routing, NanoBot's tool registry security), the "secure-by-default" agent is becoming a baseline requirement, not just a feature.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## 1. Today's Overview
NanoBot exhibits high development velocity with 37 pull requests updated and six issues active in the last 24 hours, reflecting a focus on stabilizing core agent behaviors and expanding channel compatibility. The project prioritizes immediate bug fixes over new releases, evidenced by the absence of new version tags today. Community activity is driven by specific provider configuration errors and edge cases in tool validation, indicating a maturation phase where the focus shifts from feature addition to robustness. Maintainers are actively addressing security and regression issues, particularly within the agent's execution environment and external API interactions.

## 2. Releases
No new releases were published on 2026-10-03.

## 3. Project Progress
Several critical bug fixes and security patches were merged or closed during the reporting period, significantly improving the reliability of the agent's tool execution and channel integrations.

*   **Cron Service Data Integrity**: PR [#5933](https://github.com/HKUDS/nanobot/pull/5933) was closed/merged to fix a regression where pending cron actions were lost if the merged store failed to save. This directly resolves issue [#5932](https://github.com/HKUDS/nanobot/issues/5932), ensuring data persistence in scheduled tasks.
*   **Agent State Management**: PR [#5995](https://github.com/HKUDS/nanobot/pull/5995) was closed to address a regression where successful recovery was incorrectly reported as a failed run after late follow-up messages, which could suppress final WebSocket replies.
*   **Security & Validation**: PR [#5994](https://github.com/HKUDS/nanobot/pull/5994) was closed to ensure that explicitly empty tool registries are preserved, preventing default tools from being re-enabled when they should be disabled. Additionally, PR [#5997](https://github.com/HKUDS/nanobot/pull/5997) was closed to reject stale member access updates in Linear after reauthorization, closing a potential security loophole.
*   **Execution Timeouts**: PR [#5957](https://github.com/HKUDS/nanobot/pull/5957) was closed to enforce session hard timeouts independently of polling, preventing commands from running past their configured limits.

## 4. Community Hot Topics
*   **Provider Compatibility (GPT-6/Copilot)**: Issue [#5898](https://github.com/HKUDS/nanobot/issues/5898) discusses the inability to use the GPT-6 model series through GitHub Copilot, with four comments indicating active user interest in supporting newer OpenAI models.
*   **Provider Configuration Logic**: Issue [#6002](https://github.com/HKUDS/nanobot/issues/6002) highlights a logical flaw where setting `reasoningEffort` silently drops `temperature` for all 38 `openai_compat` providers, not just specific reasoning models. This has generated immediate community attention due to its impact on standard model behavior.
*   **WebUI State Management**: Issue [#6008](https://github.com/HKUDS/nanobot/issues/6008) reports that sidebar state is wiped after an update if the initial fetch fails, a recurring frustration point for UI users that often leads to data loss in user preferences.

## 5. Bugs & Stability
The following issues represent active stability concerns, ranked by potential impact:

1.  **HIGH: QQ Quoted Messages Missing**: Issue [#6006](https://github.com/HKUDS/nanobot/issues/6006) reports that quoted messages in QQ chats never reach the agent, breaking contextual follow-ups. This is a functional blocker for QQ channel users.
2.  **HIGH: WebUI Sidebar State Loss**: Issue [#6008](https://github.com/HKUDS/nanobot/issues/6008) describes a silent fallback to default states when initial fetches fail, leading to unintended user data overrides. A fix is implied by the issue title but not yet merged.
3.  **MEDIUM: `reasoningEffort` Side Effects**: Issue [#6002](https://github.com/HKUDS/nanobot/issues/6002) identifies that `temperature` is dropped for non-reasoning models when `reasoningEffort` is set. This causes inconsistent model behavior across the 38 affected providers.
4.  **MEDIUM: GPT-6 Support**: Issue [#5898](https://github.com/HKUDS/nanobot/issues/5898) notes that v0.3.5 does not support GPT-6 via GitHub Copilot, resulting in provider request failures.
5.  **LOW/MEDIUM: Progress Reporting**: Issue [#6000](https://github.com/HKUDS/nanobot/issues/6000) highlights that `sendProgress: true` yields no output on default installs due to contradictory `tool_contract.md` instructions. PR [#6001](https://github.com/HKUDS/nanobot/pull/6001) is open to address this.

## 6. Feature Requests & Roadmap Signals
*   **New Provider Support**: PR [#5845](https://github.com/HKUDS/nanobot/pull/5845) is open to add "Opper" as a built-in gateway provider, mirroring Eden AI. This suggests the project is actively expanding its gateway provider registry.
*   **Progress Reporting Logic**: The combination of Issue [#6000](https://github.com/HKUDS/nanobot/issues/6000) and PR [#6001](https://github.com/HKUDS/nanobot/pull/6001) indicates a roadmap item to ensure that progress flags actually result in user-facing text, rather than being silently ignored.
*   **Multimodal API Validation**: PR [#5763](https://github.com/HKUDS/nanobot/pull/5763) is open to return 400 errors for invalid multimodal field types, signaling a push toward stricter API input validation.

## 7. User Feedback Summary
*   **Pain Point: Silent Failures**: Users are frustrated by silent errors in provider configurations (e.g., [#6002](https://github.com/HKUDS/nanobot/issues/6002), [#6008](https://github.com/HKUDS/nanobot/issues/6008)) where settings do not behave as expected without explicit error messages.
*   **Pain Point: Channel Context Loss**: The QQ channel issue ([#6006](https://github.com/HKUDS/nanobot/issues/6006)) highlights that users expect full conversational context, including quoted messages, to be available to the agent.
*   **Satisfaction: Rapid Regression Fixes**: The closure of PRs [#5933](https://github.com/HKUDS/nanobot/pull/5933), [#5957](https://github.com/HKUDS/nanobot/pull/5957), and [#5995](https://github.com/HKUDS/nanobot/pull/5995) shows a responsive maintainer team addressing regressions in execution timeouts and state management promptly.

## 8. Backlog Watch
*   **Case-Sensitive URL Deduplication**: PR [#5926](https://github.com/HKUDS/nanobot/pull/5926) addresses a bug where web scraping tools incorrectly deduplicate URLs that differ only in case. This has been open since 2026-09-26 and requires merging to prevent loss of valid fetches.
*   **Null Parameter Validation**: PR [#5965](https://github.com/HKUDS/nanobot/pull/5965) fixes tool parameter validation to correctly handle `null` types and enums. It has been open since 2026-09-29 and is critical for ensuring tool safety.
*   **Slack Message Chunking**: PR [#5961](https://github.com/HKUDS/nanobot/pull/5961) fixes a bug where Slack messages with buttons lose text beyond 3000 characters. This has been open since 2026-09-29 and affects long-form content delivery.
*   **Telegram Markdown Rendering**: PR [#5960](https://github.com/HKUDS/nanobot/pull/5960) addresses URL corruption in Telegram Markdown-to-HTML conversion. It has been open since 2026-09-29 and impacts the reliability of link rendering in the Telegram channel.

</details>