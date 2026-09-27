# AI CLI Tools Community Digest 2026-09-27

> Generated: 2026-09-27 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

Here is the cross-tool comparison report for the AI CLI development ecosystem as of September 27, 2026.

### 1. Ecosystem Overview
The AI CLI development ecosystem in late 2026 is characterized by a shift from basic code generation to complex, multi-agent orchestration and deep system integration. Both Claude Code and OpenAI Codex are facing significant stability regressions, with Claude Code grappling with model behavior "scope creep" and TUI input freezes, while Codex is managing a widespread authentication outage and platform-specific sandbox failures. The development focus for both tools has intensified around enterprise-grade reliability, specifically in security hardening, cost transparency, and cross-platform consistency. Community feedback indicates that users are moving away from "magic" black-box AI interactions toward demanding explicit control over agent fan-outs, resource limits, and output styles. Consequently, the maturity of these tools is being defined less by raw model intelligence and more by the robustness of the surrounding infrastructure (sandboxes, auth, TUI stability) that supports them.

### 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Count (24h)** | ~9 Critical/Hot Issues<br>(Focus: Model Behavior, TUI Stability, Windows/MacOS Specifics) | 10 Critical/Hot Issues<br>(Focus: Auth Outage, Sandbox Failures, Windows/Linux UI Regressions) |
| **PR Count (24h)** | 1 Active PR<br>(#97334: Session Persistence Security) | 10 Active PRs<br>(Focus: Windows Console Fixes, Proxying, TLS Trust, TUI Rendering) |
| **Release Status** | No new releases in last 24h. | 2 New Releases<br>1. `rust-v0.159.0-alpha.6` (Alpha)<br>2. `rust-v0.157.1` (Stable Patch) |
| **Primary Stability Risk** | TUI Input Freezes; Model Scope Creep. | Global "401 Unauthorized" Auth Storm; Windows Startup Loops. |

### 3. Shared Feature Directions
Several requirements are trending across both tool communities, indicating shared pain points in the broader AI CLI space:

*   **Windows Platform Reliability:** Both tools report significant friction on Windows. Claude Code users face broken GitHub connectors (#61682) and CRLF diff issues, while Codex users struggle with flashing console windows (#48074) and sandbox lock failures. There is a shared need for a more robust Windows execution environment that doesn't interrupt the user's desktop workflow.
*   **Cost & Resource Transparency:** Claude Code users are demanding previews and confirmation prompts before agent fan-outs explode billing (#89865). Similarly, Codex users are requesting granular control over tool budgets and proxying for enterprise networks (#48574). Both communities are moving toward "pay-per-action" visibility.
*   **Sandbox & Security Hardening:** Both ecosystems are dealing with security and isolation challenges. Claude Code is addressing missing process wrappers for self-hosted runners (#97538), while Codex is fixing macOS TLS trust evaluation (#48565) and Linux snapd mount rejections. The trend is toward stricter, yet more transparent, sandboxing that doesn't block legitimate developer workflows.
*   **TUI Usability & Accessibility:** Both tools face critical TUI regressions. Claude Code has input freezes (#96931) and mouse tracking floods (#85290). Codex has visible console pop-ups breaking headless workflows (#44768). There is a shared need for a stable, non-intrusive terminal interface that respects user focus and input state.

### 4. Differentiation Analysis

*   **Technical Approach & Architecture:**
    *   **Claude Code:** The core friction is currently *behavioral*. The issues reflect a model (Opus 5.5) that is too agentic, causing scope creep and ignoring style instructions (#97117, #65961). The tooling is stable but the "brain" is regressing in focus.
    *   **OpenAI Codex:** The core friction is *infrastructural*. The issues reflect a rapid iteration cycle (Rust-based alpha/stable) where the underlying runtime, sandboxes, and auth layers are breaking under load or platform-specific edge cases (macOS TIOCSTI, Linux SIGCHLD).
*   **Target User Base:**
    *   **Claude Code:** Heavily used for long-running, complex projects where "task focus" is critical. The community is sensitive to model drift and verbose outputs, suggesting a user base that values precision and code cleanliness over raw automation.
    *   **OpenAI Codex:** Heavy usage in enterprise/complex network environments (VPN proxying needs) and headless/daemonized workflows. The user base is sensitive to background process visibility and startup reliability.
*   **Feature Focus:**
    *   **Claude Code:** Focused on *Model Control* (comment reduction, focus maintenance) and *Cross-Repo Search*.
    *   **Codex:** Focused on *Connectivity* (Auth resilience, Proxying) and *Platform Integration* (Git ACLs, Sandbox ports).

### 5. Community Momentum & Maturity

*   **Maturity:** **OpenAI Codex** appears to be in a more mature but *volatile* iteration state. The high volume of closed PRs in 24 hours and frequent stable/alpha releases suggest a rapid response team, but the "401 Unauthorized" global incident indicates that the service-side infrastructure is not yet fully mature for enterprise reliability.
*   **Activity:** **Claude Code** shows a different kind of momentum: *behavioral tuning*. The community is not reporting as many crashes, but they are deeply engaging with model quality regressions. The high upvotes on "Scope Creep" and "Verbose Comments" suggest a user base that is highly experienced and critical of model hallucinations/drift, pushing for stricter adherence to prompts.
*   **Risk Profile:** Codex has a higher *availability risk* (auth outages, hangs). Claude Code has a higher *quality risk* (poor code output, ignored instructions).

### 6. Trend Signals

*   **"Agentic" Backlash:** The "Scope Creep" issue in Claude Code signals a major trend: developers are rejecting "do everything" agents. The next generation of AI CLI tools will likely introduce "focus locks" or strict task boundaries to prevent models from wandering off-task.
*   **Security as a First-Class Citizen:** The presence of "Cyber Safety Filter False Positives" (Claude) and "Sandbox/TLS Trust" fixes (Codex) indicates that AI CLI tools are now being treated as production security targets. "Trust" is being built not just through accuracy, but through verifiable, non-interfering security layers.
*   **The End of "Set and Forget":** The 401 Auth storm and Windows startup loops in Codex highlight that AI CLIs are becoming critical infrastructure. The industry trend is moving from "experimental tool" to "essential dev dependency," requiring SLA-level reliability.
*   **Developer Control Over Cost:** The demand for cost previews before agent fan-outs is a signal that AI development is becoming a budgetary concern for enterprises. Future tools will likely include hard caps and "dry-run" cost estimation features as standard.

**Recommendation for Developers:**
For high-stakes, long-context work, **Claude Code** remains preferred, but users should pin to older model versions (Opus 4.6) to avoid the current 5.5 scope-creep regression. For high-velocity, multi-platform enterprise environments, **Codex** offers faster iteration and better sandboxing, but teams should implement retry logic for auth failures and avoid using it in headless environments until the Windows/Linux console visibility issues are resolved.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills Community Highlights Report**
*Data Source: github.com/anthropics/skills | As of: 2026-09-27*

### 1. Top Skills Ranking
*Note: The provided PR data indicates `undefined` comment counts for the top 20 PRs. Ranking below is based on recency, activity updates, and thematic prevalence within the provided dataset.*

1.  **skill-creator (Fixes & Maintenance)**
    *   **Functionality:** Core meta-skill for creating and evaluating other skills.
    *   **Highlights:** Active efforts to isolate trigger evaluations, handle Windows runtime failures ([PR #1298](https://github.com/anthropics/skills/pull/1298)), fix module path errors in `package_skill.py` ([PR #1681](https://github.com/anthropics/skills/pull/1681)), and resolve YAML parsing issues ([PR #539](https://github.com/anthropics/skills/pull/539)).
    *   **Status:** Open / In Progress.
2.  **mcp-builder**
    *   **Functionality:** Tool for building and testing Model Context Protocol servers.
    *   **Highlights:** Critical compatibility fixes for `mcp>=2.0.0` import renames and custom header support ([PR #1742](https://github.com/anthropics/skills/pull/1742)). Significant ongoing discussion regarding evaluation harness failures against real MCP servers ([Issue #1390](https://github.com/anthropics/skills/issues/1390)).
    *   **Status:** Open.
3.  **docx**
    *   **Functionality:** Word document generation and manipulation.
    *   **Highlights:** Improvements to error handling for LibreOffice timeouts ([PR #1792](https://github.com/anthropics/skills/pull/1792)) and fixes for OOXML ID collisions with bookmarks ([PR #541](https://github.com/anthropics/skills/pull/541)).
    *   **Status:** Open.
4.  **Testing & Quality (Composite)**
    *   **Functionality:** New community skills for test generation and quality analysis.
    *   **Highlights:** Proposal for `AWT` for zero-code E2E testing ([PR #822](https://github.com/anthropics/skills/pull/822)), `testing-patterns` for comprehensive test strategy ([PR #723](https://github.com/anthropics/skills/pull/723)), and `skill-quality-analyzer` for meta-assessment ([PR #83](https://github.com/anthropics/skills/pull/83)).
    *   **Status:** Open.
5.  **PDF**
    *   **Functionality:** PDF generation and manipulation.
    *   **Highlights:** Fix for case-sensitivity mismatches in file references that break cross-platform usage ([PR #538](https://github.com/anthropics/skills/pull/538)).
    *   **Status:** Open.

### 2. Community Demand Trends
*Based on High-Traffic Issues:*

*   **Security & Trust Boundaries:** The most discussed issue ([#492](https://github.com/anthropics/skills/issues/492), 43 comments) highlights a critical demand for namespace integrity. The community is demanding stricter separation between official `anthropic/` skills and community skills to prevent trust boundary abuse and permission impersonation.
*   **Enterprise Sharing & Collaboration:** Users are requesting native org-wide skill sharing mechanisms ([Issue #228](https://github.com/anthropics/skills/issues/228)) to bypass manual `.skill` file uploads via Slack/Teams.
*   **Reliability & Evaluation Integrity:** Significant frustration with the skill evaluation pipeline ([Issue #556](https://github.com/anthropics/skills/issues/556)) where `claude -p` fails to trigger skills, indicating a demand for robust, verifiable skill execution guarantees.
*   **Context Efficiency:** Concerns over skills exhausting context windows (e.g., `claude-api` injecting ~156k tokens in [Issue #1487](https://github.com/anthropics/skills/issues/1487)) are driving a trend toward leaner, more token-efficient skill designs.
*   **Agent Governance:** Emerging demand for skills that enforce safety patterns, policy, and audit trails for AI agent systems ([Issue #412](https://github.com/anthropics/skills/issues/412)).

### 3. High-Potential Pending Skills
*Active Open PRs likely to merge soon based on specificity and recent updates:*

*   **mcp-builder (Compat Fixes):** [PR #1742](https://github.com/anthropics/skills/pull/1742) addresses critical breakage in `mcp>=2.0.0`. High utility for users building MCP integrations.
*   **docx (Robustness):** [PR #1792](https://github.com/anthropics/skills/pull/1792) ensures LibreOffice timeouts are reported as errors rather than silent successes, improving reliability of document workflows.
*   **proofcore-contract-auditor:** [PR #1771](https://github.com/anthropics/skills/pull/1771) introduces Web3 smart contract auditing with blockchain-anchored proofs, expanding the skill ecosystem into niche verification sectors.
*   **blast-radius:** [PR #1776](https://github.com/anthropics/skills/pull/1776) provides a safety checklist for bulk/destructive database operations, addressing a key gap in operational safety skills.
*   **md2video-audio:** [PR #1703](https://github.com/anthropics/skills/pull/1703) adds zero-cost Markdown-to-Video conversion, a high-value capability for content generation workflows.

### 4. Skills Ecosystem Insight
The community’s most concentrated demand is for **security hardening and trust verification**, specifically ensuring that skill namespaces clearly distinguish between official Anthropic capabilities and community contributions to prevent permission abuse.

---

# Claude Code Community Digest — 2026-09-27

## 1. Today's Highlights
The community is focused on stability regressions in the TUI and model behavior; specifically, a critical bug where input stops accepting keystrokes in version 2.1.282 has drawn immediate attention. Developers are also reporting severe "scope creep" and task-focus regressions when using the latest Opus 5.5 model compared to Opus 4.6, alongside persistent issues with verbose code comments that ignore user instructions.

## 2. Releases
No new releases were published in the last 24 hours.

## 3. Hot Issues
*   **#65961: Verbose Code Comments** ([Link](https://github.com/anthropics/claude-code/issues/65961))
    *   **Why it matters:** One of the most upvoted issues (247 👍), this report highlights that the model defaults to adding excessive comments and ignores instructions to stop. This significantly impacts code cleanliness and user control over output style.
*   **#96931: Input Box Freezes** ([Link](https://github.com/anthropics/claude-code/issues/96931))
    *   **Why it matters:** A critical usability bug in v2.1.282 where the TUI stops accepting keyboard input 0–90 seconds into a session. Since this effectively renders the interactive tool unusable, it is high-priority for stability teams.
*   **#97117: Opus 5.5 Scope Creep** ([Link](https://github.com/anthropics/claude-code/issues/97117))
    *   **Why it matters:** Developers report that Opus 5.5 exhibits significant loss of task focus and scope creep compared to Opus 4.6 on long-running projects, forcing users to revert to older model versions to complete work.
*   **#61682: GitHub Connector Broken on Windows** ([Link](https://github.com/anthropics/claude-code/issues/61682))
    *   **Why it matters:** A persistent bug (33 comments, 25 👍) where the GitHub connector shows as "Connected" in Cowork/Windows but exposes no tools, breaking a core workflow for Windows users.
*   **#89865: Workflow Cost Explosion** ([Link](https://github.com/anthropics/claude-code/issues/89865))
    *   **Why it matters:** Reports that workflow verification stages can fan out agents 20x past guidelines (355+ agents in one run) without cost previews or confirmation, leading to unexpected high billing.
*   **#93046: Misleading Usage Limit Warnings** ([Link](https://github.com/anthropics/claude-code/issues/93046))
    *   **Why it matters:** When a subagent hits a usage limit, the warning banner names the parent model (e.g., Opus) instead of the subagent's model (e.g., Fable), causing confusion in multi-model sessions.
*   **#85290: Mouse Tracking Floods Composer** ([Link](https://github.com/anthropics/claude-code/issues/85290))
    *   **Why it matters:** A regression where terminal handoffs leave `altScreenMouseTracking` enabled, flooding the input composer with mouse motion events and breaking arrow key navigation.
*   **#25664: SSH Remote Hangs** ([Link](https://github.com/anthropics/claude-code/issues/25664))
    *   **Why it matters:** Connecting via SSH passes local macOS plugin paths and MCP configs to the remote server. These invalid paths cause the remote process to hang indefinitely, breaking remote development workflows.
*   **#97538: Missing Process Wrapper in Self-Hosted** ([Link](https://github.com/anthropics/claude-code/issues/97538))
    *   **Why it matters:** Security and enterprise concern: `claude self-hosted-runner` and `plugin eval` start processes without `CLAUDE_CODE_PROCESS_WRAPPER`, potentially bypassing environment hardening.
*   **#94086: Cyber Safety Filter False Positives** ([Link](https://github.com/anthropics/claude-code/issues/94086))
    *   **Why it matters:** A "cyber" safeguard is falsely flagging background shell tasks and session continuations, halting authorized work and blocking legitimate security or general domains.

## 4. Key PR Progress
Only one Pull Request was updated in the last 24 hours:

*   **#97334: sec-default Session Persistence** ([Link](https://github.com/anthropics/claude-code/pull/97334))
    *   **Description:** This PR ensures that security default rows a conversation keeps continue past the user tier. It is gated behind engine changes (`session.append`) and includes a test that remains red until the CLI event is released, indicating a complex dependency chain for security feature stability.

*(Note: No other PRs were active in the provided 24h window.)*

## 5. Feature Request Trends
*   **Model Behavior Control:** Strong demand for the model to respect instructions to reduce code comments (#65961) and to fix scope creep/task focus regressions in newer models (#97117).
*   **Cost Transparency:** Requests for better cost previews and confirmation prompts before workflow agent fan-outs can explode billing (#89865).
*   **Cross-Repo GitHub Search:** Users are looking for the ability to search across repositories and enable repo access in chat sessions, which is currently blocked or disabled (#96396, #96369).
*   **Plugin Management:** Improved lifecycle for synced plugins, specifically the ability to uninstall plugins that lose their "marketplace backing" after sync (#97095).

## 6. Developer Pain Points
*   **TUI Stability:** Recurring and critical input handling bugs, including keystroke freezing (#96931) and mouse event floods breaking navigation (#85290), are frustrating terminal users.
*   **Platform-Specific Breakage:** Significant friction on Windows (GitHub connector #61682, CRLF diff previews #88114) and macOS (SSH remote hangs #25664, computer:// link rendering #97255).
*   **Accessibility & Focus Management:** Permission dialogs silently stealing focus and destroying typed input is a major accessibility complaint that destroys user work (#75360).
*   **Security Filter Over-Reach:** False positives from safety filters (cyber flags #94086, research blocks #95597) are halting legitimate workflows, eroding trust in the harness's reliability.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### 1. Today's Highlights
The OpenAI Codex ecosystem faced significant connectivity instability on September 26–27, with a widespread "401 Unauthorized" API key error affecting thousands of users, prompting a major mitigation effort and a spike in bug reports. Meanwhile, the engineering team shipped a high volume of closed pull requests focused on Windows sandbox reliability, TUI polish, and Linux signal handling fixes, indicating a rapid response to the recent surge of platform-specific regressions.

### 2. Releases
*   **rust-v0.159.0-alpha.6**: The latest alpha release, continuing the 0.159 development cycle. ([Release](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.6))
*   **rust-v0.157.1**: A stable patch release that addressed minor chores, though specific highlights were unavailable due to an empty PR index during comparison. ([Release](https://github.com/openai/codex/releases/tag/rust-v0.157.1))
*   **Changelog**: Full changes for 0.157.1 can be reviewed in the [comparison view](https://github.com/openai/codex/compare/rust-v0.157.0...rust-v0.157.1).

### 3. Hot Issues
1.  **[#48237] Auth: Unexpected 401 Unauthorized (High Urgency)**
    *   **Link**: [Issue #48237](https://github.com/openai/codex/issues/48237)
    *   **Why it matters**: With 96 comments and 104 upvotes, this is the most critical issue, reporting a global service-side bug where valid service keys return "Incorrect API key provided." It broke operations for many users on September 26.
2.  **[#45119] macOS Sandbox: Unbound variable TIOCSTI**
    *   **Link**: [Issue #45119](https://github.com/openai/codex/issues/45119)
    *   **Why it matters**: A persistent sandbox failure on macOS 14.2 (Apple Silicon) prevents CLI startup. 30 comments indicate developers are actively digging into the kernel-specific terminal control issues.
3.  **[#48074] Windows: Terminal windows repeatedly flash**
    *   **Link**: [Issue #48074](https://github.com/openai/codex/issues/48074)
    *   **Why it matters**: Highly upvoted (47 thumbs up) report of visual interference caused by the Codex daemon opening background processes. It degrades the Windows TUI experience.
4.  **[#48189] Linux Desktop: Hangs on "Starting your task"**
    *   **Link**: [Issue #48189](https://github.com/openai/codex/issues/48189)
    *   **Why it matters**: A regression in build 26.924.20706 that freezes the Linux app indefinitely. 15 comments show users have found a workaround (rolling back to 26.917) while waiting for a fix.
5.  **[#46110] Linux Sandbox: Rejects snapd nsfs mount roots**
    *   **Link**: [Issue #46110](https://github.com/openai/codex/issues/46110)
    *   **Why it matters**: Prevents Codex from running on Ubuntu systems using Snap packages. The error "mountinfo path is not absolute" blocks bubblewrap execution, impacting a large portion of the Linux user base.
6.  **[#36475] Windows Sandbox: helper_sandbox_lock_failed**
    *   **Link**: [Issue #36475](https://github.com/openai/codex/issues/36475)
    *   **Why it matters**: A long-standing (since August) issue where Windows sandbox refresh fails with access denied errors. It suggests lingering problems with how Codex manages `.sandbox-bin` permissions.
7.  **[#44768] Windows: App-server daemon opens visible console windows**
    *   **Link**: [Issue #44768](https://github.com/openai/codex/issues/44768)
    *   **Why it matters**: Hooks and shell commands trigger visible console pop-ups, which is disruptive in headless or background workflows. Related PRs are currently being merged to address this.
8.  **[#32880] Windows Desktop: Git writes stopped after update**
    *   **Link**: [Issue #32880](https://github.com/openai/codex/issues/32880)
    *   **Why it matters**: A regression in the workspace-write DENY ACL blocks Git operations in linked worktrees. This is a critical blocker for version control workflows.
9.  **[#48554] Linux Desktop: SIGCHLD handler replaced with empty function**
    *   **Link**: [Issue #48554](https://github.com/openai/codex/issues/48554)
    *   **Why it matters**: A deep technical bug where Electron runtime code overwrites libuv's signal handler, preventing child processes from being reaped. This causes timeouts and "Git is unavailable" errors.
10. **[#48466] Windows 26.924: Cold startup stalls on Loading**
    *   **Link**: [Issue #48466](https://github.com/openai/codex/issues/48466)
    *   **Why it matters**: Users report the UI hangs on startup unless the app-server is manually restarted. It indicates instability in the current Windows release build.

### 4. Key PR Progress
1.  **[#48575] Allow provisioned executors more time to come online**
    *   **Link**: [PR #48575](https://github.com/openai/codex/pull/48575)
    *   **Description**: Adjusts registry retry limits to handle slow executor startups, preventing false "offline" status reports for provisioned environments.
2.  **[#48568] Allow exec-server to proxy permitted private IPs upstream**
    *   **Link**: [PR #48568](https://github.com/openai/codex/pull/48568)
    *   **Description**: Adds `--proxy-private-ips-via-upstream` flag, enabling Codex to function correctly on private networks that require VPN proxying.
3.  **[#48565] Allow macOS TLS trust evaluation in network-enabled Seatbelt profiles**
    *   **Link**: [PR #48565](https://github.com/openai/codex/pull/48565)
    *   **Description**: Fixes macOS TLS failures by allowing the sandbox to access `com.apple.TrustEvaluationAgent`, ensuring `libcurl` can perform trust checks.
4.  **[#48483] Prevent console windows for piped Windows child processes**
    *   **Link**: [PR #48483](https://github.com/openai/codex/pull/48483)
    *   **Description**: Sets `CREATE_NO_WINDOW` for piped child processes on Windows. This directly addresses the "flashing terminal windows" complaints in issues like #48074.
5.  **[#48548] Preserve table cell source metadata through TUI rendering**
    *   **Link**: [PR #48548](https://github.com/openai/codex/pull/48548)
    *   **Description**: Ensures that when users copy Markdown tables from the TUI, the source structure and formatting are preserved rather than being converted to raw code blocks.
6.  **[#48531] Add context to Windows sandbox runtime registration errors**
    *   **Link**: [PR #48531](https://github.com/openai/codex/pull/48531)
    *   **Description**: Improves error messaging by using `anyhow::Context` to identify which specific step (start, complete, verify) fails in the Windows sandbox registration.
7.  **[#48502] Fix ChatGPT browser sign-in for local app servers**
    *   **Link**: [PR #48502](https://github.com/openai/codex/pull/48502)
    *   **Description**: Resolves a race condition where login completion could arrive before the TUI recorded the active login, ensuring browser sign-in works reliably for local daemons.
8.  **[#48491] Fall back to embedded mode under restrictive Windows launchers**
    *   **Link**: [PR #48491](https://github.com/openai/codex/pull/48491)
    *   **Description**: Prevents crashes when using launchers like `cargo run` that prevent background processes from outliving the parent, allowing the CLI to still open.
9.  **[#48508] Preserve WebSocket continuations when steering a turn**
    *   **Link**: [PR #48508](https://github.com/openai/codex/pull/48508)
    *   **Description**: Optimizes performance by preserving WebSocket connections during steering, avoiding the need to resend full history for follow-up requests.
10. **[#48469] Default to copying transcript selections in more terminals**
    *   **Link**: [PR #48469](https://github.com/openai/codex/pull/48469)
    *   **Description**: Expands the "copy on select" feature to Ghostty, Kitty, Windows Terminal, and VS Code, improving UX for mouse-heavy workflows.

### 5. Feature Request Trends
*   **Cross-Platform Auth Resilience**: Following the #48237 incident, users are requesting more robust error handling and automatic retry mechanisms for API keys to prevent total service outages.
*   **Windows Sandbox Management**: There is a strong push for better visibility into why Windows sandboxes fail (see #36475), suggesting a need for a "doctor" command or diagnostic tool specific to ACLs.
*   **Linux Desktop Stability**: Requests for bug-fixes in the Electron-based Linux app are trending, particularly regarding process management (SIGCHLD) and task startup hangs.
*   **CLI Configuration Flexibility**: Users are requesting more granular control over proxying (PR #48568) and tool budgets (PR #48574) to accommodate complex enterprise network setups.

### 6. Developer Pain Points
*   **Windows UI Disruption**: The recurring issue of visible console windows popping up during background operations (#44768, #48074) is a major pain point, interrupting developer focus and causing visual clutter.
*   **Auth Fragility**: The recent "401 Unauthorized" storm highlights a perceived fragility in the authentication layer, causing anxiety about whether the service is down or the user's credentials are invalid.
*   **Sandbox Portability**: Both macOS (TIOCSTI issues) and Linux (snapd mount issues) suffer from sandboxing that doesn't account for specific OS variants or package managers, blocking execution in legitimate environments.
*   **Windows Startup Loops**: Users on Windows are experiencing a "startup stall" loop where the app appears frozen until the app-server is manually restarted (#48466), indicating a broken initialization sequence in recent builds.

</details>