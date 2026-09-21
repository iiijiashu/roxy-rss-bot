# AI CLI Tools Community Digest 2026-09-21

> Generated: 2026-09-21 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## 1. Ecosystem Overview
The AI CLI tools landscape on 2026-09-21 is characterized by a maturity shift where stability and resource efficiency are now as critical as raw capability. While OpenAI Codex is in a rapid iteration phase with frequent alpha releases and intense TUI feature development, Claude Code is focusing on hardening its desktop and enterprise integrations. Both communities are facing significant operational friction, primarily driven by unpredictable resource consumption (Codex) and privacy/security regressions in automated environments (Claude Code). The industry is moving quickly toward greater subagent autonomy and enhanced desktop-like ergonomics within terminal interfaces, though underlying infrastructure bugs in sandboxing and remote execution remain major blockers for professional workflows.

## 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Tracked** | 10 | 11 |
| **PRs Tracked** | 5 | 10 |
| **Release Status** | No new releases in 24h | 3 Alpha releases (rust-v0.156.0-alpha.10–12) |
| **Primary Focus** | Privacy, desktop diff UX, headless auth | TUI ergonomics, subagent stability, quota debugging |

*Note: Counts reflect items explicitly highlighted in the provided digest for the last 24 hours.*

## 3. Shared Feature Directions
*   **Headless/Remote Reliability:** Both communities are struggling with non-interactive and remote environments. Claude Code is requesting RFC 8628 device-code auth for CI/CD and fixing worktree guard logic, while Codex is addressing zombie processes in VS Code Remote-SSH and MCP tool failures in Windows-WSL setups.
*   **Terminal UI (TUI) Ergonomics:** Both tools are moving the terminal experience toward desktop-level usability. Codex has merged features for mouse navigation, right-click copying, and color-level support. Claude Code is stabilizing the desktop diff experience and plugin hook execution to mirror this level of polish.
*   **Sandboxing & OS Integration:** Both tools face significant technical hurdles in isolation. Claude Code's `bwrap` errors on Linux git repositories mirror Codex's `seccomp` filter failures breaking Unix domain sockets and asyncio wakeups on Linux.

## 4. Differentiation Analysis
*   **Feature Focus:**
    *   **Codex:** Heavily invested in the TUI itself (voice playback, usage dashboards, command-center layouts) and expanding subagent autonomy (MCP elicitation).
    *   **Claude Code:** Focused on observability (OTEL fixes, telemetry refinement), privacy controls (git fetch transparency, session classification), and authentication flexibility.
*   **Target Users & Friction Points:**
    *   **Codex:** Users are experiencing acute "financial and workflow anxiety" due to aggressive token burn rates in 5-hour and weekly quotas. The desktop app (Windows/Linux) is currently unstable, with fatal startup errors and broken action buttons.
    *   **Claude Code:** Power users and enterprise admins are hitting friction from permission regressions (macOS Auto mode) and lack of visibility into background operations. Headless users are blocked by authentication limitations.
*   **Technical Approach:**
    *   **Codex:** Rapid iteration via alpha releases; engineering effort is split between fixing quota consumption bugs and polishing the frontend.
    *   **Claude Code:** Steadier release cadence; effort is directed at backend infrastructure (diff refetch optimization, telemetry scoping) and resolving OS-level security/privacy conflicts.

## 5. Community Momentum & Maturity
*   **OpenAI Codex:** Demonstrates high velocity and momentum. The release of three alpha CLIs in 24 hours and the merger of 10 TUI-focused PRs indicates a rapidly iterating product. However, community sentiment is highly volatile due to recurring rate-limit and desktop app bugs, suggesting the tool is in a "high-growth, high-friction" phase.
*   **Claude Code:** Appears more mature and stabilized in its core release cycle (no new releases in 24h), with development efforts focused on hardening and edge-case fixes (diff pane state, OTEL headers). Community issues point to a user base that is deeply embedded in enterprise/CI pipelines and is now demanding greater control and transparency.

## 6. Trend Signals
*   **Resource Transparency & Control:** The most urgent developer demand across the ecosystem is visibility into token usage. Codex users are demanding explanations for rapid quota exhaustion, while Claude Code users are seeking documentation on session states and telemetry.
*   **Subagent Ecosystem Integration:** Codex is pioneering the integration of subagents with external systems (MCP), but this comes with increased complexity and resource drain. This signals that autonomous agent swarms are becoming a standard architectural pattern, requiring new resource management strategies.
*   **Terminal as a "Desktop" Environment:** The sheer volume of TUI PRs in Codex (mouse support, voice, graphical charts) indicates that CLI tools are no longer satisfied with pure text. Developers expect GUI-like interactions, and terminal interfaces are being redesigned to bridge the gap between shell commands and desktop apps.
*   **Sandboxing is a Major Blocker for Linux Power Users:** Both tools are failing at advanced Linux execution models (seccomp, bwrap, Unix sockets). Developers building on Linux for secure or constrained environments must plan for these integration flaws, potentially favoring tools that better support standard Unix networking primitives.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data As Of:** 2026-09-21 | **Source:** [anthropics/skills](https://github.com/anthropics/skills)

## 1. Top Skills Ranking
*Ranked by relative community attention and discussion intensity based on provided data.*

1.  **skill-creator (Trigger Evaluation Fixes)**
    *   **Functionality:** Core meta-skill for generating and optimizing other skills; includes trigger evaluation loops.
    *   **Highlights:** Multiple critical bugs reported where trigger detection fails (0% recall on Windows/runtime failures, `claude -p` never triggering). Recent PRs isolate trigger evals and fix `run_loop` tuning logic that was incorrectly optimizing against false negatives.
    *   **Status:** [PR #1298](https://github.com/anthropics/skills/pull/1298) & [PR #1769](https://github.com/anthropics/skills/pull/1769) OPEN; linked to [Issue #556](https://github.com/anthropics/skills/issues/556).
2.  **mcp-builder (MCP Evaluation & Connectivity)**
    *   **Functionality:** Builds and evaluates Model Context Protocol servers.
    *   **Highlights:** Users report evaluation harnesses scoring 0/N against real servers due to serialization issues (`TextContent` not JSON serializable). Updates required for `mcp>=2.0.0` API changes (streamable HTTP client imports) and model version bumps.
    *   **Status:** [PR #1742](https://github.com/anthropics/skills/pull/1742) & [PR #1724](https://github.com/anthropics/skills/pull/1724) OPEN; linked to [Issue #1390](https://github.com/anthropics/skills/issues/1390).
3.  **docx / office (Document Integrity)**
    *   **Functionality:** Word document creation, parsing, and redlining.
    *   **Highlights:** Significant focus on preventing file corruption. Fixes address `w:id` collision with bookmarks, UTF-8 decoding issues in diffs on non-English locales, and missing relationship files in `comment.py`.
    *   **Status:** [PR #541](https://github.com/anthropics/skills/pull/541), [PR #1790](https://github.com/anthropics/skills/pull/1790), & [PR #1765](https://github.com/anthropics/skills/pull/1765) OPEN.
4.  **pdf (File Reference Consistency)**
    *   **Functionality:** PDF generation and manipulation.
    *   **Highlights:** Community fixes focus on case-sensitive file reference mismatches in `SKILL.md` (e.g., `REFERENCE.md` vs `reference.md`), which break execution on case-sensitive filesystems.
    *   **Status:** [PR #538](https://github.com/anthropics/skills/pull/538) OPEN.
5.  **web-artifacts-builder (Bundle Stability)**
    *   **Functionality:** Builds self-contained web bundles from artifacts.
    *   **Highlights:** Hard blockers reported on modern toolchains (pnpm ≥10.1) causing `ERR_PNPM_IGNORED_BUILDS`. Issues with font inlining and stale favicons in init scripts.
    *   **Status:** [Issue #1362](https://github.com/anthropics/skills/issues/1362) OPEN.

## 2. Community Demand Trends
*Distilled from Issues and PR summaries.*

*   **Security & Trust Boundary Enforcement:** High demand for mitigating "trust boundary abuse" where community skills distributed under the `anthropic/` namespace impersonate official skills, leading users to grant excessive permissions ([Issue #492](https://github.com/anthropics/skills/issues/492)).
*   **Organization-Level Skill Sharing:** Users anticipate direct org-wide sharing capabilities (shared libraries/links) to replace manual `.skill` file uploads via Slack/Teams ([Issue #228](https://github.com/anthropics/skills/issues/228)).
*   **Context Window Efficiency:** Strong demand for reducing token bloat. Specifically, fixes for skills like `claude-api` that eagerly inject ~156k tokens, exhausting context in a single call ([Issue #1487](https://github.com/anthropics/skills/issues/1487)), and proposals for "compact-memory" symbolic notation ([Issue #1329](https://github.com/anthropics/skills/issues/1329)).
*   **Enterprise/Governance Skills:** Proposals for skills covering agent governance, policy enforcement, and audit trails for AI agent systems ([Issue #412](https://github.com/anthropics/skills/issues/412)).

## 3. High-Potential Pending Skills
*Active PRs suggesting new Skills or significant feature expansions.*

*   **proofcore-contract-auditor:** A Web3 skill for automated static analysis of Solidity/Rust contracts and anchoring proofs to the TON Blockchain ([PR #1771](https://github.com/anthropics/skills/pull/1771)).
*   **md2video-audio:** A "zero-cost" skill compiling Markdown to MP4 videos with voiceovers via Marp ([PR #1703](https://github.com/anthropics/skills/pull/1703)).
*   **awt (AI Watch Tester):** An E2E testing skill enabling zero-code test generation with vision and browser control ([PR #822](https://github.com/anthropics/skills/pull/822)).
*   **pyxel:** A skill for creating, debugging, and verifying retro games in Python using Pyxel ([PR #525](https://github.com/anthropics/skills/pull/525)).
*   **blast-radius:** A pre-deployment checklist skill for bulk/destructive write operations (archiving, revoking access, deleting rows) ([PR #1776](https://github.com/anthropics/skills/pull/1776)).

## 4. Skills Ecosystem Insight
The community's most concentrated demand is for **reliability and security hardening** of existing core skills (particularly `skill-creator`, `mcp-builder`, and document formats), driven by a need to eliminate silent failures, context bloat, and trust-boundary ambiguities before adopting new third-party or enterprise skills.

---

**Today's Highlights**
No new releases were published in the last 24 hours. Community attention is concentrated on authentication reliability in headless environments and a regression in macOS Auto mode permissions, alongside critical privacy concerns regarding undocumented background `git fetch` operations. Development efforts are heavily focused on stabilizing the desktop diff experience, fixing plugin hook execution, and improving telemetry infrastructure.

**Releases**
No new releases available in the last 24 hours.

**Hot Issues**
1.  **Device-Code Auth for Headless Environments**: Support for RFC 8628 authentication flows is a top request for Pro/Max users on Linux who lack a web browser, enabling secure CLI access in CI/CD and remote servers. ([#22992](https://github.com/anthropics/claude-code/issues/22992))
2.  **Socket Connection Failures**: Users report frequent "socket connection closed unexpectedly" errors under heavy interactive use, with packet captures indicating server-initiated FINs mid-stream, causing interrupted turns. ([#67766](https://github.com/anthropics/claude-code/issues/67766))
3.  **Undocumented Background Git Fetch**: A significant privacy and operational concern where the desktop client performs unrequested `git fetch` to origin during diff/commit refreshes, with no configuration option to disable it. ([#84698](https://github.com/anthropics/claude-code/issues/84698))
4.  **macOS Auto Mode Regression**: A recent update has caused Auto mode to block routine release work for solo developers, increasing permission denials by 12x and forcing a manual fallback that requires excessive clicks. ([#95200](https://github.com/anthropics/claude-code/issues/95200))
5.  **Sandboxed Bash `.git` Errors**: Enabling Bash sandboxing fails in standard git repositories (non-worktrees) with `bwrap` errors, indicating a bug in how bind-mounts handle the `.git` directory. ([#72748](https://github.com/anthropics/claude-code/issues/72748))
6.  **Undocumented Session State Classification**: Developers are asking for documentation on "Classify session states" and its impact on data privacy and cost, as the feature is currently hidden in settings. ([#60955](https://github.com/anthropics/claude-code/issues/60955))
7.  **Vertex AI Thinking Display Bug**: When using `CLAUDE_CODE_USE_VERTEX=1`, the CLI omits the `thinking.display` field, making summarized thinking text invisible for Sonnet 5 users on Vertex. ([#79052](https://github.com/anthropics/claude-code/issues/79052))
8.  **OTEL Header Dropping**: Custom authentication headers via `otelHeadersHelper` are silently dropped for gRPC OTLP exporters, breaking observability integrations that require auth. ([#86814](https://github.com/anthropics/claude-code/issues/86814))
9.  **Worktree Guard Logic**: `EnterWorktree` on non-nested paths moves the Bash CWD but fails to rebind the Write/Edit guards, leading to silent security or file-handling inconsistencies. ([#95389](https://github.com/anthropics/claude-code/issues/95389))
10. **Login Token Persistence Failure**: `/login` reports success but fails to save the token on macOS 2.1.277 due to an `ENOTDIR` error involving stale lock files. ([#95425](https://github.com/anthropics/claude-code/issues/95425))

**Key PR Progress**
*Note: Only 5 Pull Requests were updated in the last 24 hours.*

1.  **Diff Refetch Optimization**: Ensures the diff modal only refetches after shell commands that may have written files, skipping read-only commands like `ls` or `cat` to reduce unnecessary network overhead. ([#95423](https://github.com/anthropics/claude-code/pull/95423))
2.  **Plugin Hook Script Execution**: Fixes execution of `ralph-wiggum` and output-style `.sh` hooks by wrapping script paths in quotes and explicitly running them through `bash`, preventing path resolution errors. ([#95698](https://github.com/anthropics/claude-code/pull/95698))
3.  **Diff Pane State Management**: Aligns the diff modal and built-in panel behavior for resumed sessions, ensuring the pane opens correctly when history is restored and behaves consistently after `/clear`. ([#95587](https://github.com/anthropics/claude-code/pull/95587))
4.  **Conditional Diff Opening**: Prevents the diff pane from opening on the first edit if there is no tracked file to list (e.g., edits to ignored files or different worktrees), avoiding empty UI states. ([#94847](https://github.com/anthropics/claude-code/pull/94847))
5.  **Built-in Plugin Telemetry**: Refines telemetry rows to include origin information (`next.origin`) and restricts data collection to built-in plugins only, excluding user-installed or administrator-listed plugins. ([#95618](https://github.com/anthropics/claude-code/pull/95618))

**Feature Request Trends**
*   **Authentication Flexibility**: Strong demand for device-code (RFC 8628) flows to support headless and non-browser environments for subscription users.
*   **Privacy & Control**: Requests for transparency in background network operations (git fetch) and explicit warning guardrails when diagnostic commands might expose sensitive system info.
*   **UI/UX Parity**: Call for the VS Code extension to match the terminal CLI's "ghost-text" prompt suggestions, and for an official read-only transcript viewer.

**Developer Pain Points**
*   **Reliability in Headless/CI**: Frequent connection drops and authentication limitations hinder Claude Code's utility in automated pipelines.
*   **Permission Management**: The Auto mode regression highlights the fragility of permission classifiers, leading to friction for power users managing high-volume tool calls.
*   **Sandboxing Complexity**: Conflicts between sandboxing (bwrap) and standard git structures continue to block Linux users from utilizing secure execution environments.
*   **Observability Gaps**: Silent failures in OpenTelemetry header propagation and undocumented session classification features create blind spots for enterprise admins monitoring compliance and costs.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### Today's Highlights

The OpenAI Codex community is currently grappling with significant and recurring issues regarding rate limits and resource consumption, with multiple high-traffic bug reports indicating that complex agent tasks are exhausting weekly and 5-hour quotas far faster than expected. Concurrently, the engineering team has merged a high volume of terminal user interface (TUI) enhancements and subagent stability improvements into the alpha releases, while Windows and macOS users report persistent installation, update, and session-sync errors that remain unresolved.

### Releases

*   **rust-v0.156.0-alpha.12, .11, .10**: Three rapid alpha releases of the Codex CLI were published within the last 24 hours. No specific change logs or feature descriptions were provided in the release notes.
    *   [rust-v0.156.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.12)
    *   [rust-v0.156.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.11)
    *   [rust-v0.156.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.10)

### Hot Issues

*   **[Bug] GPT-6 Astra Medium depleted 100% of Plus 5-hour quota in two short turns**: A user on Windows reports that medium-reasoning model usage consumed an entire 5-hour allowance in mere minutes. This issue has garnered 25 comments and 15 👍s, highlighting severe community concern over unpredictable token burn rates. [Issue #42987](https://github.com/openai/codex/issues/42987)
*   **[Bug] Codex App repeatedly shows "Selected model is at capacity" despite healthy connectivity**: Multiple users are experiencing persistent "at capacity" errors on the desktop app even when their network connections are stable and subscription limits have not been reached. The issue has 17 comments, with Pro Lite users expressing frustration over blocked work. [Issue #45835](https://github.com/openai/codex/issues/45835)
*   **[Bug] Windows Codex Desktop: Send button becomes disabled after the first successful turn**: A critical usability bug where the primary action button fails to re-enable, completely halting the workflow on Windows 11 after a single exchange. This has 14 comments and impacts newly created conversations. [Issue #45307](https://github.com/openai/codex/issues/45307)
*   **[Bug] ChatGPT Desktop Linux startup-fatal “ChatGPT hit a snag”**: A fatal `TypeError` in the renderer (AppRoutes) prevents the Linux desktop app from launching on Debian 13. While closed, the issue accumulated 13 comments and highlights persistent platform-specific build failures. [Issue #44785](https://github.com/openai/codex/issues/44785)
*   **[Bug] [VS Code Remote-SSH] Server reconnect leaves stale app-server holding thread writer**: A Remote-SSH disconnect leaves a zombie `app-server` process that blocks new sessions with "This is open in another app" errors. With 11 comments and 12 👍s, it is a major pain point for developers using headless or remote environments. [Issue #41849](https://github.com/openai/codex/issues/41849)
*   **[Bug] Codex mobile intermittently fails to open running task conversations**: An ongoing issue where iOS clients fail to load active task threads. It has accumulated 11 comments and 14 👍s, indicating widespread mobile client instability. [Issue #28340](https://github.com/openai/codex/issues/28340)
*   **[Bug] Windows Desktop + WSL agent: Browser, Chrome control, and Computer Use all fail through the shared bridge**: Users attempting to use Computer Use or browser MCP tools via the Windows-on-WSL agent are experiencing complete tool-call failures through the shared bridge. It has 8 comments and 9 👍s. [Issue #34458](https://github.com/openai/codex/issues/34458)
*   **[Bug] Codex Desktop authenticates OAuth MCP server but never imports tools into threads**: An MCP configuration bug where successful OAuth handshakes do not result in the tool being available to the model, leaving `auth_status` unsupported. It has 7 comments and 5 👍s, hindering the use of external MCP integrations. [Issue #20009](https://github.com/openai/codex/issues/20009)
*   **[Bug] Codex Security scan exhausted a freshly reset weekly allowance in ~44 minutes through worker/subagent fan-out**: A single security assessment spawned a massive worker fan-out that consumed an entire weekly Pro tier allowance in under an hour. This new issue (4 comments) highlights the danger of unmonitored subagent scaling. [Issue #46819](https://github.com/openai/codex/issues/46819)
*   **[Bug] Codex CLI repeatedly wakes xhigh to poll deterministic long-running jobs, exhausting finite weekly usage**: The CLI model behavior of polling for status on deterministic jobs at the highest reasoning effort is draining weekly quotas. It has 6 comments, marking a trend in poor token efficiency for background polling. [Issue #45974](https://github.com/openai/codex/issues/45974)
*   **[Bug] Restricted Linux sandbox breaks connected Unix socket sends and asyncio wakeups**: The Linux seccomp filter incorrectly blocks `sendto(2)` calls, which in turn breaks `send(2)` for connected Unix-domain sockets and causes Python `asyncio` cross-thread wakeups to fail. A critical technical bug for advanced Linux sandbox environments. [Issue #33793](https://github.com/openai/codex/issues/33793)

### Key PR Progress

*   **Add `/tui` to choose the terminal UI mode for the next launch**: Merged a new `/tui` command that allows users to explicitly select between "Scrollback" and "Fullscreen" modes, persisting the choice to the user configuration file for the next launch. [PR #46883](https://github.com/openai/codex/pull/46883)
*   **Allow subagents to request MCP elicitation input**: Merged a critical fix removing the root-only constraint on MCP elicitation, allowing subagents to directly request user input for browser sign-ins, form filling, and interactive tool approvals. [PR #46877](https://github.com/openai/codex/pull/46877)
*   **Preserve streamed answers when subagents finish**: Merged a fix that defers subagent activity rendering until the parent's answer stream has fully finished, preventing late subagent data from corrupting the main response. [PR #46867](https://github.com/openai/codex/pull/46867)
*   **Add right-click copying for transcript and composer selections**: Merged an enhancement allowing right-click-to-copy functionality for selected text in both the transcript and the composer, improving desktop TUI usability. [PR #46895](https://github.com/openai/codex/pull/46895)
*   **Enable mouse navigation in the TUI usage view**: Merged a feature enabling mouse wheel scrolling and clickable tabs in the TUI's usage overlay, providing a consistent alternative to keyboard-only navigation in the dashboard. [PR #46866](https://github.com/openai/codex/pull/46866)
*   **Streamline agent command-center shortcuts and layout**: Merged a UI refactor of the agent command center, grouping shortcuts into logical categories and adapting the layout to the available screen height to prevent content clipping. [PR #46882](https://github.com/openai/codex/pull/46882)
*   **Preserve voice playback across pauses and packet bursts**: Merged a fix for the TUI voice output, routing decoded PCM directly to the `BaseSink` to prevent the second audio ring from overwriting speech and to handle RTP packet bursts exceeding the jitter buffer. [PR #46880](https://github.com/openai/codex/pull/46880)
*   **Honor the effective terminal color level in activity charts**: Merged a fix ensuring TUI activity charts respect terminal color configurations, allowing Windows Terminal to use truecolor instead of falling back to low-color modes. [PR #46897](https://github.com/openai/codex/pull/46897)
*   **Preserve transcript position when opening settings pickers**: Merged a fix that keeps the transcript anchored in place when users open settings pickers like `/model` or `/theme`, preventing the context from jumping. [PR #46910](https://github.com/openai/codex/pull/46910)
*   **Limit the welcome logo animation to onboarding**: Merged a UI optimization that restricts the animated welcome logo strictly to the onboarding flow, removing unnecessary redraws during fresh conversations in the standard TUI. [PR #46859](https://github.com/openai/codex/pull/46859)

### Feature Request Trends

*   **TUI Ergonomics and Usability**: The high volume of PRs focused on right-click copying, mouse navigation for the usage view, and preserving scroll positions for pickers indicates a strong push to make the terminal interface feel more like a traditional desktop GUI.
*   **Subagent Autonomy**: The merger of PR #46877 and #46867 signals a shift toward greater autonomy for subagents, specifically allowing them to interact with external MCP servers and handle user input without deferring to the root thread.
*   **Transparent Resource Reporting**: Multiple PRs related to the TUI usage dashboard (#46864, #46863, #46862) demonstrate a focus on giving developers better, more stable, and visually compact insights into their token and model usage.

### Developer Pain Points

*   **Unpredictable and Aggressive Quota Consumption**: The most severe and repeated frustration is the rapid, seemingly unmonitored exhaustion of 5-hour and weekly rate limits. Multiple high-traffic issues (#42987, #46819, #45974, #46904) show that complex tasks and subagent fan-outs burn tokens at rates that developers do not understand or expect, leading to financial and workflow anxiety.
*   **Desktop App Instability (Windows/Linux)**: Windows users face recurring and severe problems including broken update mechanisms (AppX failures), disabled action buttons post-turn, and missing chat history. Linux desktop users are experiencing fatal startup errors, indicating the desktop clients are currently unreliable for daily professional use.
*   **Sandbox and Remote Environments**: Developers relying on Windows-WSL or headless Remote-SSH environments face broken tool integrations (MCP, Computer Use) and zombie process issues that lock threads. Additionally, Linux-specific seccomp sandbox bugs are breaking standard Unix domain socket communications, forcing power users to run into fundamental OS integration flaws.

</details>