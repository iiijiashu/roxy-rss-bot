# OpenClaw Ecosystem Digest 2026-09-28

> Issues: 11 | PRs: 50 | Projects covered: 2 | Generated: 2026-09-28 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)

---

## OpenClaw Deep Dive

**1. Today's Overview**
OpenClaw maintains a high-velocity development cycle with **50 PRs updated** and **11 issues active** in the last 24 hours, though **no new releases** were published. Project health is characterized by a focus on code quality and refactoring ("deslop" passes) across the `agents` and `infra` core, alongside critical stability fixes for session state and crash loops. However, P0 severity issues remain unresolved, including production upgrades blocked by authentication failures and security-sensitive gateway offline states, indicating a gap between development velocity and critical operational stability.

**2. Releases**
*   No new releases were published on 2026-09-28.

**3. Project Progress**
*   **Merged PRs:** 1
    *   [PR #159981](https://github.com/openclaw/openclaw/pull/159981): *fix(test): include manifest-only plugins in extension test plans*. This fix resolves CI failures where manifest-only plugins (Active Memory, device-pair, talk-voice) were silently omitted from extension test plans, improving test coverage for existing plugins.
*   **Active Refactoring:** Significant effort is directed at code cleanup and performance:
    *   [PR #159856](https://github.com/openclaw/openclaw/pull/159856): *refactor(agents): deslop agents core fourth pass*. Removes duplicate projections and retired plumbing in the agents core.
    *   [PR #159759](https://github.com/openclaw/openclaw/pull/159759): *refactor(infra): deslop infra fifth pass*. Removes duplicated projections and forwarding helpers in the infrastructure layer.
    *   [PR #159585](https://github.com/openclaw/openclaw/pull/159585): *perf(gateway): reduce main-thread allocation for large history pages*. Optimizes SQLite worker returns to reduce heap allocation during large history reads.

**4. Community Hot Topics**
*   **Production Upgrade Guidance ([Issue #123799](https://github.com/openclaw/openclaw/issues/123799)):** Open for 45 days (created 2026-08-14, 8 comments). This P0 issue reports that production deployments on version `2026.5.12` are affected by a Codex compact 404 error. The user seeks safe upgrade/backport guidance after the related issue was closed as "already implemented" on main, highlighting a disconnect between `main` fixes and stable production releases.
*   **Session State & Auth Failures ([Issue #125998](https://github.com/openclaw/openclaw/issues/125998)):** Open for 41 days. Reports 5 confirmed incidents where sessions die silently after an HTTP 200 response due to `auth-profile-failure` re-warming. The lack of error-level logging makes this a "silent death" issue, critical for observability.
*   **Realtime Voice Agent Hangs ([Issue #159141](https://github.com/openclaw/openclaw/issues/159141)):** Created 2 days ago. Reports that if a caller does not answer a realtime agent's question, the agent remains silent on an open line until teardown, as the bridge does not wake the model. This impacts voice channel usability.

**5. Bugs & Stability**
*   **P0 - Gateway Offline / Security:** [Issue #159839](https://github.com/openclaw/openclaw/issues/159839) reports that a Telegram `/update` command on macOS causes the Gateway to go offline when "activation Doctor" refuses config promotion with `authority-check-failed`. This is marked as a crash-loop and security-sensitive issue.
*   **P0 - Unbounded Subprocess Chain:** [PR #158447](https://github.com/openclaw/openclaw/pull/158447) (fix for [Issue #158339](https://github.com/openclaw/openclaw/issues/158339)) addresses a bug where a managed update from a Bun Gateway spawns an unbounded chain of config-read subprocesses (measured up to 8,462 descendants), exhausting the 300s verification budget.
*   **P1 - SQLite Write Locks:** [Issue #155359](https://github.com/openclaw/openclaw/issues/155359) reports 9 dual-monitor-verified SQLite write-transaction holds (5.9s-33.2s) exceeding `busy_timeout=5000ms` on Windows, causing gateway freezes. The freeze detector reports freezes the process did not have.
*   **P1 - Message Loss in Zalo Channel:** [Issue #159249](https://github.com/openclaw/openclaw/issues/159249) reports that on the `zalouser` channel, inbound files/photos/videos are passed to the agent only as CDN links, never as media in the media store, leading to potential message loss or context degradation.

**6. Feature Requests & Roadmap Signals**
*   **Plugin Channel Queue Support:** [Issue #158214](https://github.com/openclaw/openclaw/issues/158214) requests allowing plugin channels (e.g., `buzz`) as keys in `messages.queue.byChannel`. Currently, config validation rejects non-hard-coded channels even though the runtime resolver supports them. This suggests a roadmap shift towards fully dynamic channel configuration.
*   **Remote Workspace File Previews:** [PR #159895](https://github.com/openclaw/openclaw/pull/159895) implements file preview for remotely hosted workspaces, fixing "session file not found" errors when files reside on the paired Harness instead of the Gateway. This indicates continued maturation of multi-host/distributed agent setups.
*   **GitHub Enterprise Worker Auth:** [PR #157500](https://github.com/openclaw/openclaw/pull/157500) adds authentication for stock `git`/`gh` clients on enterprise workers using short-lived App tokens, reducing reliance on ambient logins. This signals an expansion into enterprise-grade CI/CD integration.

**7. User Feedback Summary**
*   **Pain Point - Config Usability:** [Issue #126296](https://github.com/openclaw/openclaw/issues/126296) highlights a counter-intuitive compaction config where `softThresholdTokens` implies an absolute level but behaves as a distance-from-edge, causing users who set large values to experience *more* compactions.
*   **Pain Point - UI Clutter:** [PR #150545](https://github.com/openclaw/openclaw/pull/150545) and [PR #151993](https://github.com/openclaw/openclaw/pull/151993) address UI issues where completed work rows display intermediate tool failures before the answer, and chat images reserve oversized frames. These changes aim to reduce visual noise and improve readability.
*   **Satisfaction - Security Redaction:** [PR #141271](https://github.com/openclaw/openclaw/pull/141271) fixes a leak where raw `errorMessage` text in Codex dynamic tools was not redacting credentials, closing a security gap identified in user reporting.

**8. Backlog Watch**
*   **Stale P1 - Auth Profile Failure:** [Issue #125998](https://github.com/openclaw/openclaw/issues/125998) has been open for 41 days with 2 comments. It describes a critical "silent death" of sessions with no error-level logging. Maintainer attention is needed to add observability or a fix for the re-warming logic.
*   **Long-Running PR - Agent Completion Binding:** [PR #126263](https://github.com/openclaw/openclaw/pull/126263) (opened 2026-08-19, P1) fixes a race condition where subagent completions match the wrong session after registry rows are gone. It has been in the "needs proof" status for over a month, risking stale code or merge conflicts.
*   **Linux PATH Restoration:** [PR #136677](https://github.com/openclaw/openclaw/pull/136677) (opened 2026-09-02, P1) fixes Linux node-host commands losing access to service tools when login-shell resets PATH. It is in "needs proof" status, blocking reliable tool execution in headless environments.

---

## Cross-Ecosystem Comparison

### 1. Ecosystem Overview
The open-source AI agent and personal assistant ecosystem in late 2026 is defined by a bifurcated development strategy: OpenClaw is pursuing high-velocity, large-scale refactoring and distributed multi-host capabilities, while NanoBot is focused on stabilizing core infrastructure, session persistence, and rapid compatibility with the latest LLM model series. Both projects are currently in a stabilization phase regarding versioning, with no new formal releases published in the digest period, indicating a preference for continuous integration over discrete versioning for critical fixes. The shared landscape reveals a strong industry drive toward decoupling provider dependencies, enhancing observability in asynchronous agent loops, and addressing critical data integrity and security gaps that arise in production environments.

### 2. Activity Comparison

| Metric | OpenClaw | NanoBot |
| :--- | :--- | :--- |
| **Issues Updated (24h)** | 11 | 5 |
| **Pull Requests Updated (24h)** | 50 | 17 |
| **Release Status** | No new releases | No new releases |
| **Health Score** | High Activity / Stability Gap | High Activity / Stabilizing |
| **Primary Focus** | Refactoring, Performance, Enterprise | Provider Compatibility, Session Persistence, UI |

*Note: "Health Score" is a qualitative assessment based on the balance of high PR velocity against unresolved P0/P1 issues and release cadence.*

### 3. OpenClaw's Position
*   **Advantages vs. Peers:** OpenClaw demonstrates superior engineering scale, evidenced by 50 PRs in 24 hours and complex "deslop" refactoring passes across core agents and infrastructure. It leads in advanced architectural features like remote workspace file previews and enterprise-grade GitHub worker authentication.
*   **Technical Approach Differences:** While NanoBot prioritizes fixing immediate provider integration bugs (e.g., GPT-6 routing) and UI polish, OpenClaw is aggressively optimizing for performance (reducing main-thread allocation for large history pages) and addressing deep systemic issues like unbounded subprocess chains and SQLite write locks. OpenClaw's approach is more systemic and architectural, whereas NanoBot's is more feature-focused and reactive.
*   **Community Size Comparison:** OpenClaw's community exhibits a broader scope of interest, with discussions spanning production upgrade guidance, security redaction, and distributed agent setups. NanoBot's community is more tightly focused on consumer-facing features like mobile PWA experiences and specific channel hygiene (Feishu/WeChat), suggesting a more niche but rapidly growing user base focused on personal assistant usability.

### 4. Shared Technical Focus Areas
*   **Session State & Persistence:** Both projects are grappling with the reliability of session data. OpenClaw addresses session state crash loops and auth failures, while NanoBot is refactoring session state ownership into SQLite to prevent event loop blocking.
*   **Provider/Model Compatibility:** NanoBot is actively fixing GPT-6 discovery and routing issues. OpenClaw is addressing the gap between main branch fixes and stable production releases regarding Codex compact errors, highlighting a shared need for robust, abstracted LLM integration layers that withstand model upgrades.
*   **Observability & Logging:** OpenClaw highlights a critical lack of error-level logging for silent session deaths, while NanoBot recently silenced routine polling logs to reduce noise. Both indicate a maturing need for better diagnostic tooling in asynchronous agent environments.

### 5. Differentiation Analysis
*   **Feature Focus:** OpenClaw differentiates through enterprise and distributed capabilities (multi-host, GitHub Enterprise auth, remote workspaces). NanoBot differentiates through consumer-grade polish (iOS PWA, localized UI copy, mobile web experience) and immediate accessibility with new model releases.
*   **Target Users:** OpenClaw targets developers and teams deploying agents in complex, production, or enterprise environments where stability, security, and scaling are paramount. NanoBot targets individual users and small teams who prioritize out-of-the-box ease of use, quick model adoption, and consumer-friendly interfaces.
*   **Technical Architecture:** OpenClaw's architecture is becoming more complex, involving distributed state, subprocess management, and intricate database locking. NanoBot's architecture is moving toward centralization and simplification, aiming to consolidate state in SQLite and streamline the event loop for predictable, single-node performance.

### 6. Community Momentum & Maturity
*   **Activity Tiers:** OpenClaw operates at a higher velocity tier (50 PRs/24h), suggesting a larger contributor base or more intense development cycles. NanoBot is in a mid-velocity tier (17 PRs/24h) with a high signal-to-noise ratio in its core maintenance.
*   **Rapidly Iterating:** NanoBot is rapidly iterating on compatibility layers (GPT-6) and UI/UX, showing a "fast-follow" strategy to keep pace with model releases.
*   **Stabilizing:** OpenClaw is in a stabilization phase for its core, using "deslop" passes to clean up legacy code before tackling major architectural shifts. However, its P0 stability issues indicate it is not yet fully mature for unattended production use without manual intervention. Both projects are stabilizing their versioning, prioritizing backports and continuous fixes over new major releases.

### 7. Trend Signals
*   **Model Agility as a Core Feature:** The community's intense focus on GPT-6 and Codex support signals that the ability to quickly adopt new LLMs without breaking configuration is a key differentiator for agent platforms.
*   **Shift to Distributed & Enterprise AI:** OpenClaw's progress on remote workspaces and enterprise authentication indicates that personal AI assistants are evolving into distributed, enterprise-grade infrastructure, moving beyond single-user, local-first models.
*   **Observability in Async Systems:** The recurring theme of "silent" failures (OpenClaw's silent session deaths, NanoBot's event loop stalls) highlights a critical industry gap: building AI agents that are not just intelligent, but transparent and debuggable. Developers are increasingly valuing logging, freeze detection, and clear error states over raw model performance.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### 1. Today's Overview
NanoBot experienced high development activity on 2026-09-28 with 17 Pull Requests and 5 Issues updated in the last 24 hours. The project currently has no new releases, indicating a focus on stabilization and backlog clearance over versioning. Community energy is directed toward core infrastructure improvements, specifically session persistence and provider compatibility for the new GPT-6 model series. Overall health is strong, with multiple high-priority fixes merged for critical provider and UI stability issues.

### 2. Releases
No new releases were identified for this digest period.

### 3. Project Progress
Several significant improvements were merged or closed today, advancing the project’s stability and capabilities:

*   **Provider Stability & GPT-6 Support**:
    *   [CLOSED] [HKUDS/nanobot PR #5937](https://github.com/HKUDS/nanobot/pull/5937): Fixed `Responses` stream parsing to stop at terminal events rather than waiting for transport EOF, improving reliability.
    *   [CLOSED] [HKUDS/nanobot PR #5938](https://github.com/HKUDS/nanobot/pull/5938): Preserved optional tool parameters in `Responses` requests, preventing schema normalization issues that could force incompatible arguments.
    *   [CLOSED] [HKUDS/nanobot PR #5936](https://github.com/HKUDS/nanobot/pull/5936): Silenced routine WeChat polling logs to reduce noise in gateway output.
*   **Session & Context Management**:
    *   [CLOSED] [HKUDS/nanobot PR #5934](https://github.com/HKUDS/nanobot/pull/5934): Unblocked earlier-history pagination in the WebUI and added retry states for failed requests.
    *   [CLOSED] [HKUDS/nanobot PR #5865](https://github.com/HKUDS/nanobot/pull/5865): Ensured primary context window budgets are preserved even when smaller fallbacks are configured.
*   **UI Polish**:
    *   [CLOSED] [HKUDS/nanobot PR #5944](https://github.com/HKUDS/nanobot/pull/5944): Polished the GitHub star invitation in the WebUI with improved illustrations and localized copy.

### 4. Community Hot Topics
The most active discussion revolves around the compatibility of the new GPT-6 model series and channel-specific message handling.

*   **GPT-6 Model Discovery & Routing**:
    *   [Issue #5939](https://github.com/HKUDS/nanobot/issues/5939): Reports that OpenAI Codex model discovery omits GPT-6 Sol and Luna due to a pinned client version. A fix is in progress via [PR #5940](https://github.com/HKUDS/nanobot/pull/5940).
    *   [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898): Reports that `gpt-6` models fail through GitHub Copilot. A related fix to route GPT-6 through the Responses API is proposed in [PR #5935](https://github.com/HKUDS/nanobot/pull/5935).
    *   **Analysis**: Users are actively adopting the latest OpenAI models. The underlying need is seamless support for new model series without manual configuration workarounds.
*   **Feishu Channel Message Hygiene**:
    *   [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903): The internal session-checkpoint marker "Continue the active task..." is incorrectly delivered to users as a visible chat message after idle compaction. This affects user experience on the Feishu/Lark channel.

### 5. Bugs & Stability
Bugs reported today are ranked by severity, with critical data integrity issues and provider failures at the top.

| Severity | Issue/PR | Description | Fix Status |
| :--- | :--- | :--- | :--- |
| **P0** | [PR #5933](https://github.com/HKUDS/nanobot/pull/5933) / [Issue #5932](https://github.com/HKUDS/nanobot/issues/5932) | **Data Loss in Cron**: If the merged cron store cannot be saved (e.g., ENOSPC), pending actions in `action.jsonl` are lost before the store is written. | Fix is open and prioritized. |
| **P1** | [PR #5580](https://github.com/HKUDS/nanobot/pull/5580) | **Event Loop Blocking**: Slow session storage can block the async event loop, stalling all conversations. A large refactor to offload persistence is in progress. | Open. |
| **P2** | [Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) | **Agent Sudo Loop**: Agent gets stuck in a loop when a sudo command fails or when hitting max iterations, becoming unusable. | No fix PR yet. |
| **P2** | [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) | **Feishu Leakage**: Internal hidden markers are shown to users. | No fix PR yet. |
| **P2** | [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) / [PR #5935](https://github.com/HKUDS/nanobot/pull/5935) | **GPT-6 Copilot Failure**: GPT-6 models fail via GitHub Copilot due to API routing. | Fix is open. |

### 6. Feature Requests & Roadmap Signals
*   **Remote Instance Connectivity**: [PR #5941](https://github.com/HKUDS/nanobot/pull/5941) implements the ability for the local WebUI to connect to and discover existing remote `nanobot` instances. This signals a roadmap shift toward multi-node and remote-access capabilities.
*   **iOS PWA Experience**: [PR #5942](https://github.com/HKUDS/nanobot/pull/5942) adds a top-edge color surface for iOS PWAs, indicating a focus on polishing the mobile web experience.
*   **Session State Centralization**: [PR #5943](https://github.com/HKUDS/nanobot/pull/5943) proposes refactoring session state ownership into SQLite, which could be a significant architectural improvement for future releases.

### 7. User Feedback Summary
*   **Frustration with Model Support Lag**: Users are dissatisfied with the lack of out-of-the-box support for the newest GPT-6 models, particularly through Copilot and Codex providers.
*   **Confusion over Agent Behavior**: The "sudo loop" and iteration obsession reported in [Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) highlight user confusion when the agent fails to gracefully handle failed commands or reach its limits.
*   **Channel-Specific Noise**: Users on Feishu are reporting unwanted internal messages, while WeChat users previously complained about log spam, which is now addressed.

### 8. Backlog Watch
*   **Event Loop Persistence**: [PR #5580](https://github.com/HKUDS/nanobot/pull/5580) has been open since 2026-08-28. It is a critical P1 performance fix that is taking a long time to merge, possibly due to the complexity of the refactor.
*   **Agent Idle Continuation**: [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) has been open since 2026-08-05. It addresses a subtle but annoying bug where the agent repeatedly continues when it should be waiting for user input.
*   **Context Compaction Notifications**: [PR #5780](https://github.com/HKUDS/nanobot/pull/5780) is flagged with a "conflict" and seeks to stop sending notifications for background compaction, a feature that appears to have caused user annoyance. It requires maintainer attention to resolve the merge conflict.

</details>