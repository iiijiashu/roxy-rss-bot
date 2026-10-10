# AI CLI Tools Community Digest 2026-10-10

> Generated: 2026-10-10 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## Cross-Tool Comparison Report: AI CLI Developers Tools (2026-10-10)

### 1. Ecosystem Overview
The AI developer tools landscape in late 2026 is characterized by a maturation phase where the focus has shifted from core code generation to robustness, extensibility, and multi-platform stability. Both Anthropic's Claude Code and OpenAI Codex are navigating significant friction in their desktop and sandboxed execution environments, with Windows-specific reliability emerging as the primary blocker for enterprise adoption. Simultaneously, both ecosystems are rapidly evolving their plugin and extensibility architectures (Claude Code "Mods" vs. Codex Brokered Credentials/MITM hooks) to support complex, stateful agent workflows. Security hardening is a top priority, with active patches addressing credential injection, sandbox escapes, and compliance (HIPAA). The industry is moving toward granular permission models and subagent context management to support more sophisticated autonomous coding tasks.

### 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Top Issues (Last 24h)** | 10 highlighted (248 comments max on #91870) | 10 highlighted (117 comments max on #51601) |
| **Active PRs (Last 24h)** | 7 highlighted (Security/HIPAA focus) | 10 highlighted (Sandbox/Terminal focus) |
| **Release Status** | v2.1.296 (Gateway/Subagent enhancements) | rust-v0.162.1 (TUI Crash/Startup fix) |
| **Primary Focus** | Extensibility (Mods) & Desktop Stability | Windows Sandbox Stability & TUI Robustness |
| **Critical Blockers** | Desktop crashes, Scrollback duplication | SHARING_VIOLATION, DeviceCheck failures |

### 3. Shared Feature Directions
*   **Subagent Context Management:** Both tools are addressing the need for finer control over context windows in subagent workflows.
    *   *Claude Code:* Introduced `autoCompactWindow` in subagent frontmatter (v2.1.296).
    *   *Codex:* Added opt-in clearing of inherited `model_context_window` limits for subagents (PR #52659).
*   **Security & Credential Integrity:** Both communities are heavily focused on preventing security bypasses and ensuring secure credential handling.
    *   *Claude Code:* Fixed silent bypasses in `hookify` and YAML injection/symlink overwrites (PRs #85716, #84711).
    *   *Codex:* Hardened MITM hooks for brokered credentials to prevent proxy credential injection (PR #52661).
*   **Windows Stability:** Both ecosystems report high-volume, critical failures on Windows, though the root causes differ.
    *   *Claude Code:* Window management bugs ("always-on-top") and shell command truncation.
    *   *Codex:* Sandbox `SHARING_VIOLATION` errors and `MAXIMUM_ALLOWED` ACL issues blocking execution.

### 4. Differentiation Analysis

| Aspect | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Feature Focus** | **Extensibility & UI:** Heavy investment in "Mods" for deep UI/state customization and HIPAA compliance for enterprise healthcare. | **Sandbox & Infrastructure:** Heavy investment in stabilizing the Windows MXC sandbox, terminal status reporting (OSC 7501), and gRPC transports. |
| **Target User** | Enterprise/Healthcare developers needing strict compliance (HIPAA) and deep customization; also strong consumer focus on Desktop app polish. | Developers in corporate IT environments (BitLocker/ACL sensitive) and power users needing stable sandboxed execution and mobile/remote integration. |
| **Technical Approach** | React-based Desktop app with plugin-driven extensibility; focus on "fail-closed" security for hooks. | Rust-based CLI with a heavy sandboxing layer; focus on "observed" stability via terminal status and graceful shutdown reasoning. |
| **Unique Pain Point** | UI rendering glitches on Desktop (redraws on any state change) and Linux SIGABRT in constrained containers. | macOS DeviceCheck token failures breaking new chats and multi-monitor UI spillover on Windows. |

### 5. Community Momentum & Maturity
*   **Claude Code:** The community is in a high-churn maturity phase. The "Mods" extensibility system (#91870, 248 comments) indicates a rapid feature rollout that is causing significant UI instability, prompting intense community feedback loops. The presence of HIPAA compliance PRs suggests a shift toward mature, regulated industry adoption.
*   **OpenAI Codex:** The community is in a stabilization phase. The dominance of Windows sandbox issues (#51601, 117 comments) suggests that the underlying architecture is under stress from a large Windows user base. The release of a specific patch for TUI crashes (v0.162.1) and the focus on observability (exec-server connection tracking) indicate a tool moving from "raw power" to "reliable infrastructure."
*   **Maturity Signal:** Codex appears to have a more stable core execution loop but struggles with OS-level integration (Windows ACLs, macOS DeviceCheck). Claude Code has a more feature-rich but less stable UI layer, with core CLI stability appearing higher but Desktop app reliability lower.

### 6. Trend Signals
*   **Sandboxing is the New Boring Middle:** The era of "unrestricted" CLI agents is over. Both tools are now defined by their ability to sandbox effectively (Codex MXC, Claude Code Hooks). Developers should choose tools based on which sandbox model aligns with their IT infrastructure (Codex for strict ACL/Corporate IT, Claude Code for plugin-heavy/Compliance environments).
*   **Extensibility vs. Stability Trade-off:** Claude Code is pushing hard on extensibility ("Mods"), which is inviting regression bugs. Codex is pushing hard on observability and terminal status, which is inviting stability bugs. Watch for which ecosystem wins the "developer workflow" war: deep customization (Claude) or deep reliability (Codex).
*   **Mobile/Remote Continuity:** Codex is making moves toward iOS/Shortcuts integration (#50385), while Claude Code is dealing with "Remote Control" session state loss (#100114). The trend is toward "always-on" assistants that span desktop and mobile, making session state persistence a critical differentiator.
*   **Compliance as a Feature:** The explicit addition of HIPAA settings in Claude Code signals that AI CLI tools are now enterprise procurement items, not just developer toys. Expect similar compliance modes (SOC2, FedRAMP) to become standard features in Codex and other competitors.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report

*(Data as of 2026-10-10)*

### 1. Top Skills Ranking
*Note: The provided dataset lists "Comments: undefined" for all top PRs. Ranking is therefore based on the explicit sorting criterion (top 20 by comments) and recency/impact within that top tier.*

1.  **mcp-builder (Fix/Support)** | [PR #1742](https://github.com/anthropics/skills/pull/1742)
    *   **Functionality:** Fixes import errors for `mcp>=2.0.0` (`streamable_http_client`) and updates header configuration for MCP server connections.
    *   **Highlights:** Addresses breaking changes in the MCP library ecosystem; essential for developers using the latest MCP versions.
    *   **Status:** Open (Created 2026-09-08, Updated 2026-10-08).

2.  **skill-creator (Robustness)** | [PR #1298](https://github.com/anthropics/skills/pull/1298)
    *   **Functionality:** Isolates trigger evaluations and handles Windows-specific subprocess failures to prevent false misses in skill testing.
    *   **Highlights:** Long-standing issue (since June 2026) regarding cross-platform compatibility and evaluation accuracy.
    *   **Status:** Open (Created 2026-06-10, Updated 2026-09-16).

3.  **proofcore-contract-auditor (New Skill)** | [PR #1771](https://github.com/anthropics/skills/pull/1771)
    *   **Functionality:** Performs static analysis of Solidity/Rust smart contracts and anchors audit proofs to the TON Blockchain.
    *   **Highlights:** Represents a niche Web3/security domain expansion of the Skills ecosystem.
    *   **Status:** Open (Created 2026-09-15, Updated 2026-09-16).

4.  **docx (Bug Fixes)** | [PR #1792](https://github.com/anthropics/skills/pull/1792) & [PR #1734](https://github.com/anthropics/skills/pull/1734)
    *   **Functionality:** PR #1792 fixes LibreOffice timeout errors in document acceptance; PR #1734 detects orphaned comments in DOCX files.
    *   **Highlights:** Improves reliability of document generation workflows and error reporting.
    *   **Status:** Open (Created Sept 2026).

5.  **md2video-audio (New Skill)** | [PR #1703](https://github.com/anthropics/skills/pull/1703)
    *   **Functionality:** Compiles Markdown into MP4 videos with voiceovers using Marp and TTS.
    *   **Highlights:** Extends Claude's output capabilities from text to multimedia presentation.
    *   **Status:** Open (Created 2026-09-01, Updated 2026-09-15).

6.  **notion-spec-to-implementation (New Skill)** | [PR #1245](https://github.com/anthropics/skills/pull/1245)
    *   **Functionality:** Transforms Notion product specs into actionable implementation tasks.
    *   **Highlights:** Bridges product management planning with code execution.
    *   **Status:** Open (Created 2026-06-02, Updated 2026-09-30).

7.  **skill-creator (Security)** | [PR #1961](https://github.com/anthropics/skills/pull/1961)
    *   **Functionality:** Hardens the eval viewer against script breakout, DNS rebinding, and XSS.
    *   **Highlights:** Critical security hardening for the core skill development tool.
    *   **Status:** Open (Created 2026-10-03, Updated 2026-10-07).

8.  **claude-api (Documentation)** | [PR #1730](https://github.com/anthropics/skills/pull/1730)
    *   **Functionality:** Replaces dead 404 URLs in academy guides and tool-use concepts.
    *   **Highlights:** Ensures documentation integrity for API integration skills.
    *   **Status:** Open (Created 2026-09-06, Updated 2026-10-04).

### 2. Community Demand Trends
Based on the most-discussed Issues, the community is driving demand in these directions:

*   **Security & Trust Boundary:** The most commented issue ([#492](https://github.com/anthropics/skills/issues/492), 43 comments) highlights a major concern regarding community skills impersonating the `anthropic/` namespace. There is high demand for clear trust signals and security auditing of third-party skills.
*   **Organizational Skill Sharing:** Issue [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 upvotes) shows strong enterprise demand for native org-wide skill libraries, moving beyond manual file uploads.
*   **Evaluation & Testing Reliability:** Multiple high-impact issues ([#556](https://github.com/anthropics/skills/issues/556), [#1352](https://github.com/anthropics/skills/issues/1352)) point to systemic failures in `skill-creator`'s evaluation harnesses (0% trigger rates, Windows incompatibility). The community demands robust, cross-platform testing infrastructure.
*   **Context Window Management:** Issue [#1487](https://github.com/anthropics/skills/issues/1487) identifies that bundled skills like `claude-api` are injecting excessive tokens, creating demand for leaner, more efficient skill designs.

### 3. High-Potential Pending Skills
These open PRs address critical pain points or expand capabilities and may land soon:

*   **skill-creator Security & Stability:** [PR #1961](https://github.com/anthropics/skills/pull/1961) (Security hardening) and [PR #1298](https://github.com/anthropics/skills/pull/1298) (Windows/Trigger fixes) are high-potential because they address the core tooling used to create *all* other skills.
*   **Document Reliability:** [PR #1792](https://github.com/anthropics/skills/pull/1792) and [PR #1734](https://github.com/anthropics/skills/pull/1734) target the `docx` skill, which is a primary enterprise use case. Fixing LibreOffice timeouts significantly boosts professional document workflow trust.
*   **Multimedia Generation:** [PR #1703](https://github.com/anthropics/skills/pull/1703) (`md2video-audio`) is a high-potential new capability that extends Claude from text/code to video production, appealing to a broad creative/technical audience.

### 4. Skills Ecosystem Insight
The community's most concentrated demand is for **robust evaluation infrastructure and security trust boundaries**, as users are increasingly adopting community-contributed skills but lack the tools to verify their safety and performance reliably.

---

## 1. Today's Highlights
The Claude Code community is currently focused on stabilizing the new Desktop "Mods" extensibility system, which is causing a surge in UI rendering bugs and integration issues. Simultaneously, persistent reliability concerns remain high regarding the Windows and macOS Desktop environments, particularly concerning session state management and crash reports. The release cycle continues with v2.1.296 expanding gateway configurations and subagent capabilities.

## 2. Releases
*   **[v2.1.296](https://github.com/anthropics/claude-code/releases)**:
    *   **Gateway Enhancements**: Added a `code` key to the Claude apps gateway's `managed.policies[]`, allowing `cli` settings to be applied specifically within Claude Desktop's Code tab.
    *   **Subagent Config**: Introduced `autoCompactWindow` in subagent frontmatter and `--agents` definitions, allowing finer control over context window management for subagents.

## 3. Hot Issues
1.  **[#91870](https://github.com/anthropics/claude-code/issues/91870)** *[MODS/Extensibility]:* With 248 comments and 131 upvotes, this issue is the central hub for the new "Mods" extensibility. The community is actively providing feedback on the new affordance, with the maintainers providing weekly updates on rapid integration.
2.  **[#28304](https://github.com/anthropics/claude-code/issues/28304)** *[Desktop Crash]:* A critical bug where Claude Desktop 1.1.4173 fails to render a window on startup (Task Manager process visible). Despite being an older issue, it remains highly active (41 comments), indicating a persistent crash blocker for many users.
3.  **[#51828](https://github.com/anthropics/claude-code/issues/51828)** *[TUI/Scrollback]:* Scrollback duplication persists on terminal resize in VS Code (macOS) as of v2.1.116. A high-frequency UI annoyance affecting developers using integrated terminals.
4.  **[#100730](https://github.com/anthropics/claude-code/issues/100730)** *[Cowork/Permissions]:* The "Auto mode" classifier is blocking the account owner's own scheduled tasks and file transfers. This highlights growing friction in permission granularity for cloud/remote sessions.
5.  **[#95580](https://github.com/anthropics/claude-code/issues/95580)** *[Windows/Computer Use]:* Windows desktop windows get stuck in "always-on-top" mode after using Computer Use tools. This specific OS-level conflict breaks the user experience for automated workflows.
6.  **[#99211](https://github.com/anthropics/claude-code/issues/99211)** *[Desktop/UI Rendering]:* The Desktop app redraws every mod render site on *any* state change. This performance bug breaks buttons and restarts SVG animations, directly impacting the usability of the new Mods feature.
7.  **[#73338](https://github.com/anthropics/claude-code/issues/73338)** *[Desktop/Regression]:* File paths outside the working directory no longer open inline (regression). A high-impact regression for developers using the Desktop app for mixed-directory workflows.
8.  **[#100114](https://github.com/anthropics/claude-code/issues/100114)** *[Windows/Remote]:* Remote Control is not restored after app relaunch (silent update/restart), causing sessions to appear archived on mobile. This breaks the "always-on" connection expectation.
9.  **[#100813](https://github.com/anthropics/claude-code/issues/100813)** *[Skills/Context]:* The main agent never receives the available-skills listing in interactive CLI sessions, even when `/skills` shows them as loaded. This breaks the intended workflow of skill discovery.
10. **[#100545](https://github.com/anthropics/claude-code/issues/100545)** *[Linux/Robustness]:* Claude Code aborts (SIGABRT) without error when thread creation fails with EAGAIN (common in resource-limited containers). This is a critical failure mode for Docker/K8s environments.

## 4. Key PR Progress
*Note: Most recent PRs in the last 24h are closed/fixed. The following highlight the security and plugin robustness improvements:*

1.  **[#100293](https://github.com/anthropics/claude-code/pull/100293)** *[HIPAA Compliance]:* Added HIPAA settings examples (`settings-hipaa.json`) to restrict how session content leaves a developer's computer. Critical for enterprise/healthcare adoption.
2.  **[#85716](https://github.com/anthropics/claude-code/pull/85716)** *[Hookify Security]:* Fixed a silent bypass in the `hookify` plugin where rules weren't loaded from ancestor `.claude` directories.
3.  **[#84747](https://github.com/anthropics/claude-code/pull/84747)** *[Hookify Logic]:* Enforced proper rule evaluation scope in `hookify`. Ensures tools like `Read`/`Browser` only trigger `all` scoped rules when no specific event is mapped.
4.  **[#84711](https://github.com/anthropics/claude-code/pull/84711)** *[Security]:* Fixed YAML injection and symlink credential overwrites in plugin scripts. A significant security hardening for the plugin ecosystem.
5.  **[#84365](https://github.com/anthropics/claude-code/pull/84365)** *[Bot UX]:* Allowed any user to prevent auto-close of issues/PRs with a "thumbs down". Improves community curation and prevents loss of relevant bug reports.
6.  **[#84364](https://github.com/anthropics/claude-code/pull/84364)** *[Hookify Fail-Safe]:* Made `hookify` fail closed on exceptions. Previously, an error in rule evaluation allowed gated tools to execute; now it denies by default.
7.  **[#41447](https://github.com/anthropics/claude-code/pull/41447)** *[Open Source]:* A community-maintained PR aimed at open-sourcing the core codebase. While likely not to be merged by Anthropic, it reflects strong developer interest in transparent internals.

## 5. Feature Request Trends
*   **Extensibility (Mods):** The most requested direction is making Claude 10x more extensible via "Mods" (#91870). Users want to customize UI, state, and agent behavior more deeply.
*   **i18n/Localization:** Growing requests for translatable spinner status words and UI elements (#91878), indicating a broadening global user base.
*   **Granular Permissions:** A push for better control over what the "Auto mode" classifier allows, specifically to avoid blocking legitimate owner actions in Cowork/Remote scenarios (#100730).
*   **Subagent Control:** Demand for finer-grained `autoCompactWindow` and context management for subagents, which was partially addressed in v2.1.296.

## 6. Developer Pain Points
*   **Desktop Stability:** The Desktop app (Windows/macOS) is the primary source of frustration. Recurring issues include crashes (#28304), UI rendering glitches (#99211), and session state loss after updates (#100114).
*   **Windows-specific Bugs:** A high volume of Windows-only issues, including window management bugs (#95580), path handling regressions (#73338), and shell command truncation (#100936).
*   **Security & Plugin Integrity:** Concerns about silent security bypasses in plugins (Hookify) and credential handling, though these are being actively patched by the community and maintainers.
*   **Resource Management:** Developers running Claude Code in constrained environments (containers/CI) face hard crashes (SIGABRT) when process limits are hit, lacking graceful degradation (#100545).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest: 2026-10-10

## 1. Today's Highlights
*   A critical cluster of Windows sandbox failures, primarily involving `SHARING_VIOLATION` errors on `node_repl.exe` and `MAXIMUM_ALLOWED` ACL issues, has become the dominant community pain point, affecting multiple app versions including 26.1002.51308 and 26.1002.52244.
*   OpenAI released patch version **rust-v0.162.1**, which specifically addresses TUI crashes caused by multi-line asynchronous questions and startup failures due to background server feature mismatch.
*   Developer efforts in recent pull requests are heavily focused on stabilizing the Windows MXC sandbox architecture, improving terminal lifecycle reporting via OSC 7501, and hardening security around brokered credentials and MITM hooks.

## 2. Releases
*   **rust-v0.162.1**: This patch release resolves a TUI crash triggered by multi-line asynchronous questions, ensuring line breaks and hyperlink destinations are preserved. It also fixes startup failures caused by discrepancies between a running background server's feature settings and CLI defaults by implementing new compatibility checks. ([Release](https://github.com/openai/codex/releases/tag/rust-v0.162.1))
*   **rust-v0.163.0-alpha.4 & .alpha.2**: Minor alpha releases in the 0.163.0 series with no detailed changelog provided in the last 24 hours. ([Release v4](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.4))

## 3. Hot Issues
1.  **Windows Sandbox Sharing Violation**: [Issue #51601](https://github.com/openai/codex/issues/51601) reports that Windows app 26.1002.51308 fails sandbox setup with a sharing violation when validating its own active runtime. With **117 comments** and **30 upvotes**, this is the most critical blocker for Windows users.
2.  **Windows Multi-Monitor UI Glitch**: [Issue #25826](https://github.com/openai/codex/issues/25826) details how the maximized window spills onto adjacent monitors in multi-monitor setups, affecting **56 comments** and **23 upvotes** since June.
3.  **Cloud-Computer File Unavailability**: [Issue #49682](https://github.com/openai/codex/issues/49682) tracks a persistent bug where files on Dots cloud computers become unavailable, disrupting workflows. **28 comments** indicate significant community impact.
4.  **Windows "Setup Refresh" Errors**: [Issue #40596](https://github.com/openai/codex/issues/40596) and [Issue #51882](https://github.com/openai/codex/issues/51882) both report unified exec failures with `helper_unknown_error: setup refresh had errors`. While individually smaller, they represent a consistent failure mode in the Windows tool-call pipeline.
5.  **macOS Stage Manager Capture Poisoning**: [Issue #38348](https://github.com/openai/codex/issues/38348) reveals that macOS Computer Use captures Stage Manager thumbnails instead of live windows, causing ScreenCaptureKit errors (-3811/-3812) and poisoning the shared capture stream.
6.  **Windows File Processing Failures**: [Issue #52042](https://github.com/openai/codex/issues/52042) shows Excel and other file tools failing due to `CreateProcessSecurityEnvironment` errors, preventing basic local tool execution.
7.  **BitLocker Lockout Blocking Sandbox**: [Issue #50915](https://github.com/openai/codex/issues/50915) identifies that an unrelated locked BitLocker volume causes MXC sandbox failures before command launch, a non-obvious edge case affecting many corporate environments.
8.  **Windows ACL MAXIMUM_ALLOWED Block**: [Issue #51971](https://github.com/openai/codex/issues/51971) and [Issue #52172](https://github.com/openai/codex/issues/52172) document how elevated sandbox processes are blocked by `MAXIMUM_ALLOWED` on live runtime files, persisting even after reboot.
9.  **DeviceCheck Failure on macOS**: [Issue #52342](https://github.com/openai/codex/issues/52342) and [Issue #52470](https://github.com/openai/codex/issues/52470) report that new chats fail with "Failed to load workspace settings" due to DeviceCheck token generation failures in version 26.1002.52244.
10. **Linux Sandbox Downgrade**: [Issue #52251](https://github.com/openai/codex/issues/52251) highlights a regression on Fedora where full-access threads are downgraded to managed `:workspace` profiles during goal continuation, breaking Git metadata access.

## 4. Key PR Progress
1.  **OSC 7501 Terminal Status**: [PR #52725](https://github.com/openai/codex/pull/52725) implements terminal program status reporting via OSC 7501, allowing non-iTerm2 terminals to receive Codex's `idle`, `working`, or `blocked` states.
2.  **Exec-Server Connection Observers**: [PR #52724](https://github.com/openai/codex/pull/52724) adds observability to initial exec-server connections, tracking elapsed time and outcomes (success/failure/cancellation) for better debugging.
3.  **gRPC over stdio for Code Mode**: [PR #52723](https://github.com/openai/codex/pull/52723) introduces an opt-in `grpc+stdio://` transport for the code-mode host, sharing a lazy HTTP/2 channel while isolating session state.
4.  **Graceful Shutdown Reasoning**: [PR #52721](https://github.com/openai/codex/pull/52721) adds structured `serverShuttingDown` reasons to session creation failures, improving UX in command center views.
5.  **Windows MXC Sandbox Migration**: [PR #52707](https://github.com/openai/codex/pull/52707) migrates the Windows MXC sandbox to split crates, improving availability detection for transitional Windows builds where PSEC API symbols are present but MXC is disabled.
6.  **Proxy Fallback for Bootstrap GETs**: [PR #52702](https://github.com/openai/codex/pull/52702) ensures account discovery and cloud configuration GETs retry through the system proxy if the initial request fails before response headers are received.
7.  **Windows Junction Path Fix**: [PR #52696](https://github.com/openai/codex/pull/52696) fixes marketplace path matching for Windows junctions, preventing redirected managed roots from losing their managed classification.
8.  **Cyber Access Program Forwarding**: [PR #52689](https://github.com/openai/codex/pull/52689) forwards per-turn `cyber_access_program` to Guardian reviewers and asynchronous classifiers, ensuring consistent `daybreak_blue` or `standard` selection.
9.  **Brokered Credential MITM Hardening**: [PR #52661](https://github.com/openai/codex/pull/52661) prevents brokered credential aliases from bypassing MITM hooks, closing a security gap where proxies could inject credentials without enforcing hook policy.
10. **Subagent Context Limits**: [PR #52659](https://github.com/openai/codex/pull/52659) adds an opt-in feature to clear inherited `model_context_window` limits when spawning or resuming subagents, improving context management for complex agent workflows.

## 5. Feature Request Trends
*   **Granular Quota & Stop Policies**: [Issue #24927](https://github.com/openai/codex/issues/24927) requests agent-accessible quota/status and automatic graceful stop policies to prevent repository mutations during limit breaches.
*   **Context-Aware Prompts**: [Issue #42587](https://github.com/openai/codex/issues/42587) seeks optional, context-aware suggested next prompts in the composer to guide users through logical workflow steps.
*   **iOS/Shortcuts Integration**: [Issue #50385](https://github.com/openai/codex/issues/50385) pushes for opening or calling specific Dots from iOS Shortcuts, Action Buttons, and widgets to enhance mobile assistant accessibility.
*   **Configurable Remote Link Behavior**: [Issue #48886](https://github.com/openai/codex/issues/48886) requests configurable click behavior for transcript links on remote SSH hosts to prevent browser launches on isolated development boxes.

## 6. Developer Pain Points
*   **Windows Sandbox Stability**: The most frequent frustration is the "setup refresh" and "SHARING_VIOLATION" errors on Windows. Multiple issues (#51601, #40596, #51882, #52425, #52722) report that sandbox setup fails when validating active runtimes, specifically involving `node_repl.exe` and ACL conflicts. This is blocking basic command execution for a significant portion of the Windows user base.
*   **macOS Security Check Loops**: Recent updates (26.1002.52244) have introduced DeviceCheck token generation failures that hard-fail new chats and disable send buttons in ChatGPT Work, trapping users in a loop where workspace settings cannot load (#52342, #52470).
*   **Windows Multi-Monitor UI**: Long-standing bugs in the Windows desktop app regarding window management on multi-monitor setups (#25826) continue to degrade the user experience for power users.
*   **Model Availability Errors**: Users on Linux are encountering "Selected model is at capacity" errors across all models, suggesting potential backend rate-limiting or misconfiguration issues affecting availability (#52465).

</details>