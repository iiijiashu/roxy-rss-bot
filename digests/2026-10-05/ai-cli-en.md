# AI CLI Tools Community Digest 2026-10-05

> Generated: 2026-10-05 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

### 1. Ecosystem Overview
The AI CLI development landscape as of October 2026 is characterized by a split focus between foundational stability for long-running agent sessions and rapid iteration on desktop-specific integrations. Claude Code is currently grappling with context management regressions and Windows deployment reliability, while OpenAI Codex is aggressively shipping alpha releases to resolve Windows daemon and sandbox issues. Both ecosystems are experiencing significant friction in cross-platform environments, particularly on Windows, where file locking, credential races, and sandbox ACLs are primary pain points. Community momentum is shifting toward demand for better UI control, session persistence, and clearer documentation on multi-project and hybrid (WSL/Desktop) workflows. The maturity of these tools is being tested by the complexity of integrating MCP (Model Context Protocol) standards and maintaining safety controls in autonomous execution environments.

### 2. Activity Comparison

| Metric | Claude Code (`anthropics/claude-code`) | OpenAI Codex (`openai/codex`) |
| :--- | :--- | :--- |
| **Releases (Last 24h)** | 0 new releases detected | 2 Alpha releases (v0.162.0-alpha.12, .13) |
| **Hot Issues (Listed)** | 10 issues (6 Open, 4 Closed/Stale) | 10 issues (All Open/Active, 1 Closed) |
| **Key PRs (Listed)** | 3 PRs (1 Open, 1 Open, 1 Closed) | 10 PRs (All Open) |
| **Primary Focus** | Bug fixes, cleanup of stale issues | Feature iteration, Windows daemon reliability |

### 3. Shared Feature Directions

*   **Windows Stability & File System Handling**: Both communities report critical failures on Windows. Claude Code users face `EBUSY` errors on Chrome MCP host copies and MSIX shutdown issues with `git fsmonitor`. Codex users experience daemon release failures due to file locks and sandbox ACL mismatches.
*   **MCP (Model Context Protocol) Integration**: Both tools report significant issues with MCP. Claude Code has stale cache injection for `claude.ai` connectors and remote form elicitation timeouts. Codex faces OAuth issuer mismatches and Node REPL failures in WSL environments when using MCP.
*   **UI/Workflow Control Restoration**: Users in both ecosystems are demanding more control over the interface. Codex users are heavily upvoting the restoration of Branch Selection UI. Claude Code users are requesting independent control over TUI elements (hiding mode indicators) and non-blocking hook behaviors.
*   **Session & State Persistence**: Claude Code reports session loss during desktop app updates ("stealth relaunch"). Codex reports thread locking in remote control (iOS) that blocks desktop sync, indicating a shared struggle with maintaining continuous state across devices and app versions.

### 4. Differentiation Analysis

*   **Feature Focus**:
    *   **Claude Code**: Focus is on *agent reliability* and *context management*. The prominent regression is the `advisor` tool becoming unavailable at >100K tokens, suggesting a focus on long-session capabilities.
    *   **OpenAI Codex**: Focus is on *desktop app integration* and *analytics/observability*. Recent PRs track inference tool changes in turn analytics and gate environment tool exposure, suggesting a deeper push into measuring and controlling the agent execution loop.
*   **Target Users**:
    *   **Claude Code**: Appears to target power users and enterprise agents requiring long-running, multi-repo setups (evidence: worktree isolation bugs, global Hookify rules).
    *   **OpenAI Codex**: Targets a broader developer audience using hybrid environments (WSL + Windows Desktop, Mobile + Desktop sync), with strong demand for accessibility (screen-reader TUI) and documentation clarity on project types.
*   **Technical Approach**:
    *   **Claude Code**: Heavily reliant on specific model behaviors (e.g., `claude-fable-5`) and external tools (MCP connectors). Issues often stem from model logic flaws (hallucinated file change causes).
    *   **OpenAI Codex**: Heavily reliant on Rust-based daemon architecture and system-level sandboxing (ACLs, reparse points). Issues often stem from OS-level conflicts (Windows Terminal flashing, sandbox directory ops denied).

### 5. Community Momentum & Maturity

*   **OpenAI Codex** shows higher *iteration velocity*, shipping two alpha releases in 24 hours with a robust pipeline of 10+ active PRs addressing specific system-level bugs. The community is rapidly engaging with new features like analytics and environment gating.
*   **Claude Code** shows higher *community scrutiny* on core logic. The absence of new releases contrasts with a detailed list of hot issues, many of which are closed/stale, suggesting a cleanup phase. The high upvote count on the `advisor` regression (#67609) indicates a large base of users dependent on long-context workflows.
*   **Maturity**: Codex is in a "rapid iteration" phase for its desktop/daemon stack. Claude Code is in a "stabilization/cleanup" phase for its agent core and MCP integration.

### 6. Trend Signals

*   **Windows as the Primary Bottleneck**: For both tools, Windows is not just a secondary platform but a major source of critical bugs (sandbox ACLs, file locks, terminal flashing, MSIX issues). Developers building on these tools should expect significant Windows-specific maintenance overhead.
*   **Rise of "Agent-Observed" Analytics**: Codex's move to track `tools_change_count` in turn analytics signals a shift from simple chat interfaces to monitorable, stateful agent executions. This is a trend for developers to consider when integrating AI CLIs into CI/CD or observability stacks.
*   **MCP Standardization Struggles**: The prevalence of MCP-related bugs in both tools (OAuth, timeouts, stale caches, native host copies) indicates that while MCP is the emerging standard for tool integration, the ecosystem has not yet reached full operational stability. Enterprise users should implement robust fallbacks or wrappers for MCP connections.
*   **Safety Control Drift**: The "Dot Safety-Pause State Desync" in Codex and "unverifiable file change causes" in Claude Code highlight a growing concern that autonomous agents are beginning to bypass or misreport safety controls. This is a critical trend for security-conscious developers to monitor.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights

### 1. Top Skills Ranking

*   **Skill-Creator (Evaluation & Packaging Fixes)**
    *   **Functionality:** Internal meta-skill for creating, validating, and packaging other Skills.
    *   **Highlights:** Heavy discussion focuses on resolving critical bugs where trigger evaluations falsely report misses on Windows, and `package_skill.py` fails when run directly due to module path errors.
    *   **Status:** Open PRs pending fixes.
    *   [PR #1298: fix(skill-creator)](https://github.com/anthropics/skills/pull/1298) | [PR #1681: fix(skill-creator)](https://github.com/anthropics/skills/pull/1681)

*   **MCP-Builder (Compatibility & Evaluation)**
    *   **Functionality:** Skill for building and evaluating Model Context Protocol (MCP) servers.
    *   **Highlights:** Community is working to adapt to breaking changes in `mcp>=2.0.0` (renamed `streamable_http_client` and header configuration). Additionally, the evaluation harness currently fails against real MCP servers due to JSON serialization errors.
    *   **Status:** Open PRs addressing version compatibility and evaluation bugs.
    *   [PR #1742: fix(mcp-builder)](https://github.com/anthropics/skills/pull/1742) | [Issue #1390: mcp-builder evaluation](https://github.com/anthropics/skills/issues/1390)

*   **Claude-API (Documentation & Token Efficiency)**
    *   **Functionality:** Skill providing Claude API references and model details.
    *   **Highlights:** Ongoing fixes are required to remove hard-404 documentation links and mark retired model IDs correctly. A major open issue highlights that this skill eagerly injects ~156k tokens, exhausting the context window in a single tool call.
    *   **Status:** Open PRs for documentation cleanup; critical context-window issue open.
    *   [PR #1607: Update claude-api](https://github.com/anthropics/skills/pull/1607) | [PR #1730: fix(claude-api)](https://github.com/anthropics/skills/pull/1730) | [Issue #1487: context exhaustion](https://github.com/anthropics/skills/issues/1487)

*   **Document Generation & Processing (PDF, DOCX, ODT)**
    *   **Functionality:** Skills for creating, parsing, and modifying office documents.
    *   **Highlights:** Discussions focus on robustness: fixing case-sensitive file references in PDF skills, ensuring LibreOffice timeouts are reported as errors in DOCX skills, and adding support for OpenDocument (ODT/ODS) formats.
    *   **Status:** Open PRs for bug fixes and new ODT skill addition.
    *   [PR #1792: fix(docx)](https://github.com/anthropics/skills/pull/1792) | [PR #538: fix(pdf)](https://github.com/anthropics/skills/pull/538) | [PR #486: Add ODT skill](https://github.com/anthropics/skills/pull/486)

*   **Testing & QA (AWT & Patterns)**
    *   **Functionality:** Skills for end-to-end testing and comprehensive testing methodologies.
    *   **Highlights:** Introduction of AWT (AI Watch Tester) for zero-code E2E testing with browser control, and a broad `testing-patterns` skill covering unit, integration, and React component testing.
    *   **Status:** Open PRs for new skill additions.
    *   [PR #822: Add AWT](https://github.com/anthropics/skills/pull/822) | [PR #723: Add testing-patterns](https://github.com/anthropics/skills/pull/723)

*   **Meta-Security & Quality Analysis**
    *   **Functionality:** Skills that analyze other Skills for quality, security, and trust boundaries.
    *   **Highlights:** High attention to a security vulnerability where community skills under the `anthropic/` namespace enable trust boundary abuse. New proposals include `skill-security-analyzer` and `blast-radius` for safe bulk operations.
    *   **Status:** Open PRs and critical security issues.
    *   [PR #83: skill-quality-analyzer](https://github.com/anthropics/skills/pull/83) | [Issue #492: Security vulnerability](https://github.com/anthropics/skills/issues/492) | [PR #1776: blast-radius](https://github.com/anthropics/skills/pull/1776)

### 2. Community Demand Trends

*   **Security & Trust Integrity:** The most concentrated demand is preventing malicious or confusing community skills from impersonating official Anthropic skills, and providing tools to audit skill security and context-window impact. ([Issue #492](https://github.com/anthropics/skills/issues/492), [Issue #1394](https://github.com/anthropics/skills/issues/1394))
*   **Organizational Collaboration:** Strong desire for native org-wide skill sharing, moving beyond manual `.skill` file transfers via Slack/Teams. ([Issue #228](https://github.com/anthropics/skills/issues/228))
*   **Agent Governance & Memory:** Proposals for skills that manage AI agent behavior, such as policy enforcement, trust scoring, audit trails, and symbolic compact memory for long-running agents. ([Issue #412](https://github.com/anthropics/skills/issues/412), [Issue #1329](https://github.com/anthropics/skills/issues/1329))
*   **Quality Assurance Pipelines:** Requests for structured reasoning gates (calibration, adversarial review, delivery verification) to ensure high-quality AI outputs. ([Issue #1385](https://github.com/anthropics/skills/issues/1385))

### 3. High-Potential Pending Skills

*   **Proofcore-Contract-Auditor:** Automated static analysis for Solidity/Rust smart contracts with cryptographic proof anchoring to the TON blockchain. ([PR #1771](https://github.com/anthropics/skills/pull/1771))
*   **MD2Video-Audio:** Zero-cost skill to compile Markdown documents into MP4 videos with realistic voiceovers via Marp. ([PR #1703](https://github.com/anthropics/skills/pull/1703))
*   **Notion-Spec-to-Implementation & Quantitative-Resume-Auditor:** Skills for transforming Notion specs into implementation tasks and auditing resumes quantitatively. ([PR #1245](https://github.com/anthropics/skills/pull/1245))
*   **SCNet-HPC:** Skill for operating SCNet HPC clusters via SSH and Slurm workflows. ([PR #1615](https://github.com/anthropics/skills/pull/1615))
*   **Pyxel:** Skill for creating, debugging, and verifying retro games in Python. ([PR #525](https://github.com/anthropics/skills/pull/525))

### 4. Skills Ecosystem Insight

The community's most concentrated demand is on **enhancing the reliability and security of the Skill execution environment**, specifically fixing broken evaluation/triggering mechanisms, preventing context-window exhaustion, and establishing strict trust boundaries against malicious or impersonating community submissions.

---

1. **Today's Highlights**
No new releases were published for `anthropics/claude-code` in the last 24 hours. Community attention is heavily concentrated on a critical regression where the `claude-fable-5` model’s advisor tool becomes unavailable when transcripts exceed ~100K tokens, alongside persistent stability issues with Windows MSIX deployments. The repository is also undergoing a cleanup of stale issues, with a large batch of bugs related to agents, MCP, and desktop app behaviors marked as closed/stale.

2. **Releases**
No new releases detected.

3. **Hot Issues**
*   **[#67609] Advisor tool "unavailable" on claude-fable-5 (>100K tokens)**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/67609>  
    A high-impact bug (45 👍) where the server-side advisor tool fails with `unavailable` errors on `claude-fable-5` when context exceeds ~100K tokens. This effectively breaks long-session workflows for users relying on the advisor, making it the most prominent technical regression this week.
*   **[#91763] Windows/MSIX `git fsmonitor--daemon` blocks relaunch**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/91763>  
    Identifies a critical Windows-specific issue where a spawned `git fsmonitor--daemon` survives the MSIX container's forced shutdown, causing error `0x80070020` and preventing the new app version from launching. Community reaction includes a detailed root-cause analysis and a no-reboot workaround.
*   **[#71585] System notes assert unverifiable file change causes**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/71585>  
    Highlights a logic flaw where external-file-change system notes claim changes were made "by the user or by a linter" and assume user awareness. Developers note that the model often relays this as fact, leading to hallucinated context in automated runs.
*   **[#90867] Desktop update restart kills running sessions**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/90867>  
    Reports that the desktop app’s "stealth relaunch" during updates restores the UI window but loses active Claude Code sessions. This is identified as the core defect in a larger report of eight interconnected desktop app defects.
*   **[#91708] Windows/VSCode OAuth refresh race condition**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/91708>  
    On Windows using the file-based credential store, concurrent Claude Code processes race on OAuth token refresh, resulting in HTTP 400 errors and forced re-login. This disrupts multi-session workflows in the VS Code extension.
*   **[#85442] Remote MCP form elicitation times out**: [CLOSED/Stale]  
    <https://github.com/anthropics/claude-code/issues/85442>  
    While marked stale, this issue (4 👍) detailed how Streamable HTTP MCP form elicitations never reach the client, causing `-32001` timeouts. Its closure suggests a shift in priority or an out-of-band fix, but it remains a reference point for MCP integration issues.
*   **[#85275] Code-review plugin silently exits in CLI action**: [CLOSED/Stale]  
    <https://github.com/anthropics/claude-code/issues/85275>  
    The `code-review` plugin’s eligibility check launched as a background agent, causing the CI run to terminate at the end of the turn. This silent failure made the plugin unusable in `claude-code-action` workflows.
*   **[#99265] Desktop app renders mod's AbovePrompt band in only one chat**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/99265>  
    With two chats open side-by-side, the desktop app only draws the `AbovePrompt` band in one chat at a time. This is a UI synchronization bug affecting users running multiple concurrent sessions in the desktop client.
*   **[#85448] Agent worktree isolation binds to caller's cwd**: [CLOSED/Stale]  
    <https://github.com/anthropics/claude-code/issues/85448>  
    Discovered that `isolation: 'worktree'` binds the base repo to the dispatching session's current Bash `cwd` rather than the target repo. This was a subtle but significant bug for multi-repo agent setups, now closed/stale.
*   **[#99513] Stale `claudeAiMcpEverConnected` cache**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/99513>  
    A new report showing that a stale cache in `~/.claude.json` injects full tool definitions for 16 disconnected `claude.ai` connectors into every session. This bloats context and can cause confusion, representing a new vector for performance degradation.
*   **[#93083] Chrome Extension MCP native host copy fails (EBUSY)**: [OPEN]  
    <https://github.com/anthropics/claude-code/issues/93083>  
    On Windows, the desktop app fails to copy `chrome-native-host.exe` if the old host is running (`EBUSY`), leaving the MCP host stale. This breaks the Chrome extension's MCP integration until a manual restart.

4. **Key PR Progress**
*   **[#40572] feat: Add support for global Hookify rules**: [OPEN]  
    <https://github.com/anthropics/claude-code/pull/40572>  
    Introduces the ability to load Hookify rules from a global directory (`~/.claude/`) alongside project-specific rules. This allows for cross-project configuration management.
*   **[#87077] fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents**: [OPEN]  
    <https://github.com/anthropics/claude-code/pull/87077>  
    Fixes a critical syntax error where agent descriptions containing dialogue lines with colons were parsed as nested mappings in YAML. This caused agents to load with empty `name`/`description` fields.
*   **[#1] Create SECURITY.md**: [CLOSED]  
    <https://github.com/anthropics/claude-code/pull/1>  
    A foundational maintenance PR that established the security disclosure policy for the repository. While old, it was updated recently as part of a broader cleanup.
*(Note: Only 3 PRs were provided in the source data; the other 7 slots are filled by expanding the context of the above or noting the lack of additional data.)*

5. **Feature Request Trends**
*   **Headless/VPS Support**: Users are requesting better mobile support for Dispatch on VPS/headless servers without an always-on desktop session ([#99525](<https://github.com/anthropics/claude-code/issues/99525>)).
*   **UI Customization**: Demand for independent control over TUI elements, such as hiding the mode indicator and hint text on the status line ([#93803](<https://github.com/anthropics/claude-code/issues/93803>)).
*   **Hook Resilience**: Requests for non-blocking `PreToolUse` hook behaviors that handle failures gracefully without truncating stderr or preventing agent progress ([#99366](<https://github.com/anthropics/claude-code/issues/99366>)).

6. **Developer Pain Points**
*   **Windows Stability**: Recurring issues with MSIX container jobs, credential store races, and file locks (`EBUSY`) are causing significant friction for Windows users, particularly in concurrent or updated environments.
*   **Context Management**: The "unavailable" advisor error on large transcripts and stale MCP cache injections are degrading the quality of long-running agent sessions.
*   **Desktop App Session Persistence**: The loss of active sessions during desktop app updates is a major workflow blocker for power users relying on the desktop client for persistent workflows.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-05

## 1. Today's Highlights
The Codex team shipped two alpha releases (0.162.0-alpha.12 and alpha.13) with a focus on Windows daemon reliability, TUI configuration persistence, and analytics improvements. Community attention remains high on Windows-specific stability issues, particularly sandbox ACL failures and desktop app crashes. Developers are actively advocating for the restoration of branch selection in the Codex app and clearer documentation for the new multi-project system.

## 2. Releases
*   **rust-v0.162.0-alpha.13** and **rust-v0.162.0-alpha.12**: Two consecutive alpha releases were published in the last 24 hours. While detailed changelogs were not provided in the release titles, the associated Pull Requests indicate these versions include fixes for Windows daemon junction handling, TUI server model defaults, and tool analytics tracking.
    *   [View Releases](https://github.com/openai/codex/releases)

## 3. Hot Issues
*   **[Issue #49532] Restore Branch Selection in Codex App**: With 69 upvotes and 36 comments, this is the most popular feature request. Users are frustrated by the removal of the branch selector UI and are demanding its reinstatement for efficient workflow management.
*   **[Issue #29639] Browser Use Node REPL Failure on Windows/WSL**: A persistent bug where the desktop app's Node REPL fails when using WSL workspaces due to unmapped sandbox paths. It has gathered significant traction (8 upvotes) among Windows developers relying on WSL.
*   **[Issue #49834] VS Code Extension JSON Parse Error**: Users on Linux x64 are encountering JSON parse errors when releasing send-locks for queued messages. This affects workflow continuity in the VS Code extension.
*   **[Issue #49488] Windows Computer Tasks Lack Browser Tools**: Reports indicate durable MCP startup failures on Windows prevent Computer Use tasks from accessing browser/desktop tools, highlighting ongoing instability in the Windows desktop environment.
*   **[Issue #33483] Codex Freezes Desktop on Windows**: A severe performance issue where the app crashes and freezes the desktop after migrating to the new ChatGPT app. Despite being open since July, it continues to receive updates and 6 upvotes, indicating it remains unresolved.
*   **[Issue #49264] CLI Flashes Windows Terminal Window (Regression)**: A newly reported regression where the CLI flashes a Windows Terminal window for every command. Marked as a regression in version 0.159.0, it has already drawn 7 upvotes and is currently closed, suggesting a quick fix or triage.
*   **[Issue #49873] Dot Safety-Pause State Desync**: A critical safety bug where autonomous execution continues while human control is blocked. This raises security concerns for users of the "Dot" integration, with reports of the agent ignoring safety pauses.
*   **[Issue #40565] macOS Sandbox Denies Directory Operations**: A long-standing issue (8 upvotes) where the macOS sandbox incorrectly denies directory renames/removals within writable workspaces, hindering standard file operations.
*   **[Issue #40885] MCP OAuth Issuer Mismatch**: A technical bug where `codex mcp login` rejects conformant OAuth servers due to incorrect issuer resolution. 12 upvotes indicate this is a significant blocker for enterprise MCP integrations.
*   **[Issue #44449] Remote Control Thread Locking**: iOS users report that threads viewed in the mobile app stay locked in the daemon, causing desktop sync failures. This disrupts the cross-device workflow.

## 4. Key PR Progress
*   **[PR #50940] Recover Malformed Windows Deny-Read ACL State**: Addresses a critical stability issue where malformed ACL state files caused reconciliation failures. This PR implements safe recovery without removing unknown restrictions.
*   **[PR #50802] Fall Back to `mklink` for Windows Daemon Junctions**: Improves Windows reliability by falling back to `cmd.exe` when native reparse-point mutations are denied by system policies, ensuring daemon release selection works.
*   **[PR #50913] Use Server Model Defaults for TUI Fresh Starts**: Fixes a bug where fresh TUI starts used stale client settings. It now reads server configuration to ensure correct model bootstrapping.
*   **[PR #50964] Track Inference Tool Changes in Turn Analytics**: Enhances observability by adding `tools_change_count` to turn profiles, allowing developers to monitor how often tool lists change during a session.
*   **[PR #50962] Gate Stable Environment Tool Exposure**: Introduces a feature flag to advertise environment-backed tools before the executor is ready, improving the startup sequence for environment-dependent tasks.
*   **[PR #50786] Remember Command Center Grouping**: Preserves user-selected grouping in Command Center across app launches, preventing the annoyance of resetting to project grouping on every start.
*   **[PR #50782] Retry Windows Daemon Release on File Locks**: Mitigates transient failures on Windows where executable scanners hold file locks, ensuring daemon releases can be published reliably.
*   **[PR #50764] Allow `/archive` During Running Turns**: Removes the restriction that prevented archiving a session while a turn was active, with a warning that archiving will stop the current execution.
*   **[PR #50811] Honor Server Reasoning Summary Defaults**: Prevents client settings from overriding the destination server's reasoning summary configuration in new TUI threads, ensuring consistent behavior.
*   **[PR #50781] Restrict TUI MCP Startup Notifications**: Prevents MCP notifications from unrelated threads from creating event channels in the current session, improving isolation and security in multi-threaded setups.

## 5. Feature Request Trends
*   **UI Control Restoration**: Strong demand for restoring removed UI elements, specifically the Branch Selector (#49532).
*   **Accessibility**: Requests for screen-reader-friendly TUI modes to assist VoiceOver users (#20489).
*   **Documentation Clarity**: Call for authoritative side-by-side comparisons of ChatGPT Web, Local Projects, and Codex Projects to reduce confusion about the new project system (#38042).
*   **Screen Scrolling**: Repeated requests for arrow-key scrolling in conversation views, which is currently broken on Windows (#39851).

## 6. Developer Pain Points
*   **Windows Stability Crisis**: A cluster of issues (#33483, #49488, #40972, #49299) indicates widespread instability on Windows, including desktop freezes, orphaned processes, sandbox setup failures, and missing tools.
*   **Sandbox Limitations**: Recurring friction with sandbox enforcement, particularly on macOS (#40565) where legitimate workspace operations are denied, and on Windows (#42398) where read-only sandboxes fail due to write-access requirements for installation IDs.
*   **MCP & OAuth Integration**: Developers are struggling with MCP server connectivity, specifically OAuth discovery errors (#40885) and Node REPL failures in hybrid WSL/Windows environments (#29639).
*   **Rate Limiting Confusion**: Issues persist where usage limits do not reset correctly after plan changes (#26763, #34865), causing locked-out users despite subscription upgrades.

</details>