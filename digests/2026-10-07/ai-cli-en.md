# AI CLI Tools Community Digest 2026-10-07

> Generated: 2026-10-07 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## Cross-Tool AI CLI Ecosystem Analysis: 2026-10-07

### 1. Ecosystem Overview
The AI CLI developer tool landscape is undergoing a critical shift from rapid feature expansion to platform-specific stability hardening and cross-environment integration. Both Claude Code and OpenAI Codex are facing significant user friction regarding process management on Windows and Linux, indicating that foundational OS compatibility remains a primary pain point in this sector. While Claude Code focuses on refining its agent orchestration and plugin marketplace, OpenAI Codex is prioritizing Rust-based backend robustness and autonomous "dots" agent functionality. The community is demanding granular control over security classifiers and sandbox permissions, signaling that autonomy and safety are no longer binary choices but require user-adjustable dials.

### 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issue Volume** | High (Active requests on multi-account support, process leaks, and classifier disablement) | High (Critical regressions on Windows desktop, sandbox execution failures, and agent task management) |
| **PR Focus** | 3 Updated PRs (UI spacing, Windows WSL compatibility, security guidance exclusions) | 10 Active PRs (Persistence intent, agent diagnostics, Windows sandbox permissions, memory limits) |
| **Release Status** | **v2.1.292** (Stable release; plugin marketplace integration, sub-agent effort parameters) | **rust-v0.162.0-alpha.17** & **rust-v0.161.0-alpha.13.1** (Alpha builds; rapid iterative development on Rust core) |

### 3. Shared Feature Directions
*   **Process & Resource Isolation:** Both tools face critical issues with cleaning up background tasks and terminating processes safely (Claude Code's `sudo kill` risks on Linux vs. Codex's orphaned processes/limited file descriptors). Users are demanding safer sandbox execution environments.
*   **Windows Desktop/CLI Stability:** A major shared pain point is Windows-specific instability. Claude Code users struggle with orphaned `git.exe` processes, while Codex users face crashes, command hangs, and terminal execution failures.
*   **Granular Permission Controls:** Both communities are moving beyond binary "allow/deny" models. Claude Code users want to disable security classifiers and fallback prompts, while Codex users request more approval granularity for sub-agents and sandboxed actions.
*   **Multi-Agent & Sub-Agent Management:** Both tools are actively iterating on how main agents interact with sub-agents. Claude Code introduces an `effort` parameter for resource allocation; Codex is working on sub-agent auto-review denial fixes and agent tree shutdown diagnostics.

### 4. Differentiation Analysis
*   **Feature Focus:** 
    *   **Claude Code** is focused on enterprise integration and workflow enhancement, specifically through the new `--marketplace` plugin installation and granular control over sub-agent "effort."
    *   **OpenAI Codex** is prioritizing autonomous agent capabilities (specifically the "dots" feature) and robust internal infrastructure (Rust backend memory management, improved diagnostic logging).
*   **Target Users:**
    *   **Claude Code** targets developers needing deep integration with their local dev environments, heavy plugin users, and accessibility-focused users (screen reader compatibility).
    *   **OpenAI Codex** is appealing to developers who want highly autonomous coding assistance and heavy IDE extension usage (VS Code drag-and-drop), alongside users relying on multi-terminal setups.
*   **Technical Approach:**
    *   **Claude Code** is operating on a mature, high-frequency release cadence (v2.1.x), treating the CLI as a stable foundation for feature overlays.
    *   **OpenAI Codex** is in an alpha phase for its core Rust architecture (v0.16x), indicating a major underlying rewrite or transition is in progress, requiring aggressive stabilization.

### 5. Community Momentum & Maturity
*   **Active Communities:** Both projects possess highly engaged communities, but the **nature of their momentum differs**. Claude Code's community is driven by workflow friction (e.g., inability to edit pasted text, multi-account support). OpenAI Codex's community is driven by critical desktop app regressions (crashes, hangs).
*   **Rapid Iteration:** **OpenAI Codex** is iterating more rapidly on its core infrastructure, evidenced by the push of alpha releases (0.162.0) and a high volume of underlying PRs addressing memory, permissions, and file handling. **Claude Code** is iterating on top-level user-facing features (plugins, sub-agent parameters) while patching regressions, suggesting a more mature, stable base.

### 6. Trend Signals
*   **From Agent Autonomy to Agent Supervision:** The push for granular permission controls, classifier disabling, and sub-agent "effort" dials signals a shift where developers want to act as *supervisors* to AI agents rather than just prompters. The market is moving toward adjustable autonomy.
*   **Platform Stability is a Gatekeeper:** Despite massive AI feature development, cross-platform stability (specifically Windows and Linux memory/process management) is the primary blocker for enterprise adoption. Tools that solve background process safety will see a significant retention boost.
*   **Rising Demand for Granular Accessibility & UX:** Features like dictation support, screen reader compatibility, and non-image file drag-and-drop are no longer "nice-to-haves." They are becoming critical baseline requirements for developer tools to remain competitive among professional engineering teams.
*   **Internal Infrastructure Race to the Bottom:** The focus on Rust, memory management, and file descriptor limits indicates that the industry has hit the limits of what existing JS/TS runtime architectures can handle for long-running, multi-agent sessions. Developers should monitor Rust-based CLI rewrites as a major performance enabler.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

### 1. Top Skills Ranking

Based on the provided data (sorted by comment count for Issues and PRs), the most-discussed Skills and associated development work are:

1.  **Security & Trust Boundaries (Meta-Skill/Distribution)**
    *   **Functionality:** Addresses the critical vulnerability where community skills distributed under the `anthropic/` namespace impersonate official skills, allowing trust boundary abuse.
    *   **Discussion Highlights:** Issue #492 is the most active thread in the repository with 43 comments and 2 upvotes, indicating high community concern regarding supply chain security and namespace squatting.
    *   **Status:** Open (Issue #492).
    *   **Link:** [Issue #492](https://github.com/anthropics/skills/issues/492)

2.  **Skill Creator (Eval & Packaging Infrastructure)**
    *   **Functionality:** The core tool for building and testing other skills. Recent PRs focus on fixing `run_eval.py` trigger rates (Issue #556, 12 comments), isolating trigger evaluations on Windows/failed runtimes (PR #1298), and hardening the eval viewer against XSS and script breakout (PR #1961, Issue #1394).
    *   **Discussion Highlights:** Issue #556 highlights a 0% trigger rate bug in evaluation harnesses, while PR #1961 addresses security flaws in the local eval viewer. PR #1681 fixes module path errors when running `package_skill.py` directly.
    *   **Status:** Open (Issues #556, #1394; PRs #1298, #1961, #1681).
    *   **Links:** [Issue #556](https://github.com/anthropics/skills/issues/556), [PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1961](https://github.com/anthropics/skills/pull/1961)

3.  **MCP Builder (Model Context Protocol Integration)**
    *   **Functionality:** Assists in building and testing MCP servers. Active work involves fixing compatibility with `mcp>=2.0.0` (renamed `streamable_http_client`) and resolving an evaluation bug where `TextContent` is not JSON serializable, causing 0/N scores (Issue #1390, 4 comments).
    *   **Discussion Highlights:** PR #1742 fixes import errors and custom header support. Issue #1390 details how the evaluation harness silently fails against real servers.
    *   **Status:** Open (Issue #1390; PR #1742).
    *   **Links:** [Issue #1390](https://github.com/anthropics/skills/issues/1390), [PR #1742](https://github.com/anthropics/skills/pull/1742)

4.  **Document Skills (DOCX/PDF/ODT)**
    *   **Functionality:** Creating and editing office documents. PR #1792 improves `docx` reliability by verifying LibreOffice output and handling timeouts. PR #486 proposes a new ODT skill for OpenDocument formats. PR #538 fixes case-sensitivity bugs in PDF references.
    *   **Discussion Highlights:** Focus is on robustness (handling timeouts/verifications) and expanding format support beyond standard DOCX/PDF.
    *   **Status:** Open (PRs #1792, #486, #538).
    *   **Links:** [PR #1792](https://github.com/anthropics/skills/pull/1792), [PR #486](https://github.com/anthropics/skills/pull/486)

5.  **Web App Testing & Security**
    *   **Functionality:** E2E testing and security hardening. PR #822 adds "AWT" for zero-code E2E testing. PR #1980 addresses command injection risks in `webapp-testing` by removing `shell=True`.
    *   **Discussion Highlights:** The community is balancing feature expansion (AI-driven testing) with security remediation (preventing shell injection in test harnesses).
    *   **Status:** Open (PRs #822, #1980).
    *   **Links:** [PR #822](https://github.com/anthropics/skills/pull/822), [PR #1980](https://github.com/anthropics/skills/pull/1980)

### 2. Community Demand Trends

From the active Issues, the most-anticipated directions for new Skills or improvements include:

*   **Organization-Wide Skill Sharing:** Issue #228 (16 comments, 8 upvotes) demands native features for sharing skills within Claude.ai organizations, moving beyond manual file uploads. This indicates a strong demand for enterprise-grade skill distribution.
*   **Agent Governance & Safety:** Issue #412 proposes an "agent-governance" skill for policy enforcement and threat detection. Issue #1175 highlights concerns about context window and security when handling sensitive SharePoint documents, suggesting a need for security-focused skills.
*   **Reasoning Quality Gates:** Issue #1385 proposes a pipeline for "Pre-task Calibration → Adversarial Review → Delivery Verification," indicating demand for skills that improve output reliability and catch reasoning errors.
*   **Memory Optimization:** Issue #1329 proposes a "compact-memory" skill using symbolic notation to reduce context usage for long-running agents.

### 3. High-Potential Pending Skills

These PRs are active, well-documented, and address clear gaps or bugs, suggesting they may be merged or are under active review:

*   **ProofCore Contract Auditor (Web3):** [PR #1771](https://github.com/anthropics/skills/pull/1771) adds a skill for automated static analysis of Solidity/Rust contracts and anchors audit proofs to the TON blockchain. This represents a significant vertical expansion into crypto/web3.
*   **MD2Video-Audio:** [PR #1703](https://github.com/anthropics/skills/pull/1703) enables zero-cost compilation of Markdown to MP4 videos with voiceovers, expanding media generation capabilities.
*   **Blast-Radius Safety Checklist:** [PR #1776](https://github.com/anthropics/skills/pull/1776) provides a critical safety checklist for bulk/destructive operations (deleting rows, revoking access), addressing a major operational risk.
*   **SCNet-HPC:** [PR #1615](https://github.com/anthropics/skills/pull/1615) targets High-Performance Computing workflows, showing demand for scientific/engineering infrastructure skills.
*   **Frontend-Design Clarity Improvements:** [PR #210](https://github.com/anthropics/skills/pull/210) revises the existing frontend-design skill to be more actionable and specific, likely improving its effectiveness for user tasks.

### 4. Skills Ecosystem Insight

The community's most concentrated demand is currently focused on **securing the skill supply chain** (preventing namespace impersonation and injection vulnerabilities) and **improving the reliability of skill evaluation/testing infrastructure** (fixing trigger rates, Windows compatibility, and security in eval viewers), rather than just adding new creative skills.

---

1. **Today's Highlights**
Claude Code released v2.1.292, introducing a streamlined plugin installation workflow via `--marketplace` and an `effort` parameter for sub-agent management. The release cycle also patched critical regressions in v2.1.291, addressing data loss in cloud sessions and message truncation during quit operations. Community attention is heavily focused on resolving cross-platform process management bugs, particularly regarding Windows orphaned processes and Linux background task cleanup safety.

2. **Releases**
*   **v2.1.292**: Added `--marketplace <source>` to `claude plugin install` to automatically add and install plugins under standard policy checks. Introduced an `effort` parameter to the Agent tool, allowing control over sub-agent resource allocation.
*   **v2.1.291**: Fixed a regression where cloud sessions dropped answers to permission prompts. Resolved another regression causing the loss of the last messages in a session upon quitting.
    *   [v2.1.292 Changelog](https://github.com/anthropics/claude-code/releases/tag/v2.1.292)
    *   [v2.1.291 Changelog](https://github.com/anthropics/claude-code/releases/tag/v2.1.291)

3. **Hot Issues**
*   **Multi-Account Support**: [Issue #27302](https://github.com/anthropics/claude-code/issues/27302) remains the most active open request with 262 comments and 402 upvotes, demanding support for multiple Connector accounts with the same connector type in Claude.ai and Claude Code web environments.
*   **Windows Process Leak**: [Issue #97752](https://github.com/anthropics/claude-code/issues/97752) reports that timed-out `git status` commands leave orphaned `git.exe` processes on Windows, leading to memory exhaustion due to incomplete process termination.
*   **Linux Safety Concern**: [Issue #99768](https://github.com/anthropics/claude-code/issues/99768) flags a high-priority data-loss risk where background task cleanup on low-memory conditions executes `sudo kill -TERM` on the entire process group, potentially terminating unrelated host processes.
*   **Paste Editing**: [Issue #3412](https://github.com/anthropics/claude-code/issues/3412) highlights the inability to view or edit "pasted text" blocks before submission, which is critical for users relying on dictation software like MacWhisper.
*   **Accessibility Gaps**: [Issue #94353](https://github.com/anthropics/claude-code/issues/94353) documents that the slash command menu in the Windows Desktop Code tab is silent for screen readers (NVDA), excluding visually impaired developers.
*   **Diff Panel CWD**: [Issue #89395](https://github.com/anthropics/claude-code/issues/89395) notes that the `/diff` panel runs git commands without specifying a `cwd`, causing it to read from the launch directory instead of the active session worktree.
*   **Routine Email Failures**: [Issue #96059](https://github.com/anthropics/claude-code/issues/96059) reports that scheduled routine email notifications are silently failing, persisting issues closed as "not planned" in previous tickets.
*   **Classifier Limitations**: [Issue #92279](https://github.com/anthropics/claude-code/issues/92279) requests a fallback mechanism in auto mode where a classifier block triggers a permission prompt instead of a hard deny, allowing user intervention.
*   **Stop Hook Verdicts**: [Issue #83687](https://github.com/anthropics/claude-code/issues/83687) details that stop hook exit-2 verdicts are silently discarded when a turn ends on a tool result with a pending schedule, preventing proper logging.
*   **Classifier Disable Request**: [Issue #100091](https://github.com/anthropics/claude-code/issues/100091) is a vocal feature request to completely disable the security classifier, which users report frequently interferes with legitimate workflows.

4. **Key PR Progress**
*   **Note**: The provided data source contains 3 updated PRs. To meet the requirement of 10 items, the following list includes the available PRs and relevant linked issues that act as fix-requests or are closely related to active development efforts noted in the issues section.
*   [PR #99206](https://github.com/anthropics/claude-code/pull/99206): Closed; fixed a UI spacing issue where the docked `/diff` pane incorrectly started under the engine's head row, removing an unnecessary blank line.
*   [PR #19084](https://github.com/anthropics/claude-code/pull/19084): Closed; added Windows compatibility for the `ralph-wiggum` stop hook by resolving `WSL` path errors for `/bin/bash` shebangs.
*   [PR #96434](https://github.com/anthropics/claude-code/pull/96434): Open; enhances `security-guidance` reviews by excluding files covered by `Read` deny rules or well-known secret files (`.env`, keys) from the reviewer's access.
*   [Issue #83687](https://github.com/anthropics/claude-code/issues/83687): Actively tracked for a fix on stop hook verdict logging; currently marked stale/closed without a merged fix, indicating need for revisiting.
*   [Issue #89395](https://github.com/anthropics/claude-code/issues/89395): Open; requires a patch to ensure `/diff` git commands respect the session's `cwd` rather than the launch directory.
*   [Issue #97752](https://github.com/anthropics/claude-code/issues/97752): Open; engineering attention required to properly kill the full process tree of timed-out `git status` commands on Windows.
*   [Issue #99768](https://github.com/anthropics/claude-code/issues/99768): Open; critical security fix needed to prevent `sudo kill` from targeting the wrong process group during low-memory cleanup on Linux.
*   [Issue #84155](https://github.com/anthropics/claude-code/issues/84155): Closed; addressed an edge case where async sub-agents killed by mid-stream API errors incorrectly reported "completed" status.
*   [Issue #84170](https://github.com/anthropics/claude-code/issues/84170): Closed; resolved a scope escalation bug where `/simplify` review forks accidentally committed and merged PRs beyond their report-only intent.
*   [Issue #84161](https://github.com/anthropics/claude-code/issues/84161): Closed; fixed `Grep` tool's silent honoring of `.gitignore`, which previously allowed agents to miss code files, causing "No files found" false negatives.

5. **Feature Request Trends**
*   **Granular Control Over Automation**: Users are demanding more flexibility in the permission system, specifically the ability to disable classifiers ([#100091](https://github.com/anthropics/claude-code/issues/100091)) and fallback prompts instead of hard denies ([#92279](https://github.com/anthropics/claude-code/issues/92279)).
*   **Multi-Tenant Account Management**: High demand for supporting multiple accounts for the same connector, allowing users to switch contexts without reconfiguring entire profiles ([#27302](https://github.com/anthropics/claude-code/issues/27302)).
*   **Enhanced Plugin & Marketplace Integration**: The recent addition of `--marketplace` to install commands signals a trend toward tighter integration between community plugins and official distribution channels, reducing friction in setup.
*   **Accessibility Improvements**: Specific requests for screen reader compatibility in the Windows Desktop app ([#94353](https://github.com/anthropics/claude-code/issues/94353)) indicate a push to make the desktop experience viable for assistive technology users.

6. **Developer Pain Points**
*   **Cross-Platform Process Management**: Developers are facing significant reliability issues on Windows (orphaned git processes) and Linux (unsafe sudo kill ranges). These bugs directly impact system stability and resource usage, causing memory leaks and potential data loss on host systems.
*   **Worktree & CWD Isolation**: There is recurring frustration with state management in isolated worktrees. Issues with `git diff` reading the wrong directory ([#89395](https://github.com/anthropics/claude-code/issues/89395)) and worktree cleanup destroying NTFS junctions ([#84162](https://github.com/anthropics/claude-code/issues/84162)) highlight that the isolation mechanism is fragile and error-prone.
*   **UI/UX Limitations in Terminal**: The inability to edit pasted blocks ([#3412](https://github.com/anthropics/claude-code/issues/3412)) and inconsistent Esc key semantics ([#83698](https://github.com/anthropics/claude-code/issues/83698)) degrade the workflow for power users who rely on dictation or rapid navigation, making the TUI feel less responsive than required for complex agent sessions.
*   **Security & Privacy Friction**: The new security guidance and classifier features are causing friction, with users reporting that valid workflows are being blocked or that secret files are unnecessarily exposed in reviews unless specifically opted out of ([#96434](https://github.com/anthropics/claude-code/pull/96434), [#100091](https://github.com/anthropics/claude-code/issues/100091)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### Today's Highlights
The OpenAI Codex community is facing a surge of platform-specific stability issues, with Windows desktop experiencing multiple critical bugs involving sandbox execution failures, file system access errors, and application crashes. Simultaneously, development efforts are focused on hardening the Rust backend, with recent PRs addressing memory management, Windows-specific filesystem quirks, and improved diagnostic logging for agent trees. The "dots" (autonomous agent) functionality is generating significant user interest but is currently hindered by integration bugs across both macOS and Windows environments.

### Releases
*   **rust-v0.162.0-alpha.17**: Released as an alpha build, indicating ongoing iterative development for the next minor version. [View Release](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.17)
*   **rust-v0.161.0-alpha.13.1**: A patch release for the 0.161.0 alpha series, likely addressing immediate stability concerns in the Rust core. [View Release](https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.13.1)

### Hot Issues
1.  **[Enhancement] Drag-and-Drop non-image Files (#3761)**: The most upvoted issue (57 👍) highlighting a major usability gap in the VS Code extension. Users cannot drag non-image files into the chat, significantly hampering code context workflows. [Link](https://github.com/openai/codex/issues/3761)
2.  **[Bug] Windows Desktop: Durable Chat Turn/Fail (#50428)**: A critical regression where Windows desktop users face `AbsolutePathBuf` deserialization errors, preventing chat turns from starting or forking. High comment volume indicates widespread impact. [Link](https://github.com/openai/codex/issues/50428)
3.  **[Bug] Windows Codex App: Unified Exec Fails (#40596)**: Users report `helper_unknown_error` when trying to start unified execution terminals. This blocks core coding tasks on the Windows platform for a sustained period (since Aug 2026). [Link](https://github.com/openai/codex/issues/40596)
4.  **[Bug] Windows Desktop: Built-in Browser Route Disappears (#48670)**: The embedded browser is unstable, with routes disappearing and permission checks failing. This disrupts the "Computer Use" and web-browsing agent capabilities on Windows. [Link](https://github.com/openai/codex/issues/48670)
5.  **[Bug] Codex Doctor: Rollout DB Parity Warning (#41608)**: `codex doctor` incorrectly flags valid paginated rollouts as having parity issues, causing confusion in diagnostics. [Link](https://github.com/openai/codex/issues/41608)
6.  **[Bug] Git Push Fails in Sandbox (#9286)**: A long-standing issue where SSH config permissions in the Linux sandbox prevent `git push --dry-run`. Critical for developers relying on secure Git workflows. [Link](https://github.com/openai/codex/issues/9286)
7.  **[Bug] Sub-agent Auto-Review Denial (#45167)**: Sub-agents cannot receive trusted user approval for denied actions, breaking the multi-agent workflow for complex tasks. [Link](https://github.com/openai/codex/issues/45167)
8.  **[Bug] Windows Desktop Crash in chrome.dll (#50799)**: Crashes during embedded browser cleanup on Windows 11, pointing to potential memory management issues with the bundled Chromium-based browser. [Link](https://github.com/openai/codex/issues/50799)
9.  **[Bug] Dots Cannot Resume Cloud Tasks (#50015)**: Autonomous "dots" fail to resume or create cloud tasks, while direct manual messages work. This isolates the bug to the agent’s task management layer. [Link](https://github.com/openai/codex/issues/50015)
10. **[Bug] Windows Codex Local Commands Hang (#50725)**: Minimal commands hang indefinitely in the Windows desktop app, preventing basic tool usage. [Link](https://github.com/openai/codex/issues/50725)

### Key PR Progress
1.  **Pass Thread Persistence Intent (#51517)**: Ensures attachment uploads correctly distinguish between ephemeral and durable threads, preventing data loss or unnecessary storage usage. [Link](https://github.com/openai/codex/pull/51517)
2.  **Expose Agent Tree Shutdown Failure Reports (#51515)**: Adds detailed diagnostics for agent shutdowns, moving from generic errors to specific failure points, aiding in debugging complex multi-agent sessions. [Link](https://github.com/openai/codex/pull/51515)
3.  **Align Windows Sandbox Temp Permissions (#51512)**: Fixes a security/compatibility issue where Windows temp grants could bypass read-only subpaths by falling back to host environment variables. [Link](https://github.com/openai/codex/pull/51512)
4.  **Fix Windows 10 Drive-Letter Opens (#51511)**: Addresses a strict native open rejection for DOS drive aliases, improving filesystem operation compatibility on older Windows versions. [Link](https://github.com/openai/codex/pull/51511)
5.  **Preserve Live TUI Settings on Reload Failure (#51510)**: Prevents user preferences from being overwritten with stale settings when configuration reloads fail, enhancing UX consistency. [Link](https://github.com/openai/codex/pull/51510)
6.  **Expose Selected Environments to MCP Contributors (#51503)**: Allows MCP (Model Context Protocol) extensions to better distinguish between primary and secondary executors, improving tool selection logic. [Link](https://github.com/openai/codex/pull/51503)
7.  **Bound Relay Connection Attempts (#51502)**: Mitigates stalled WebSocket upgrades and resets reconnect backoff too early, improving stability for remote/cloud connections. [Link](https://github.com/openai/codex/pull/51502)
8.  **Add Shared Task Pinning to Agent Command Center (#51500)**: Introduces a UI feature to pin specific tasks in the agent dashboard, improving organization for multi-task workflows. [Link](https://github.com/openai/codex/pull/51500)
9.  **Load Rollout History on Single Blocking Worker (#51499)**: Optimizes memory usage and cancellation handling when loading large `.jsonl.zst` rollout histories. [Link](https://github.com/openai/codex/pull/51499)
10. **Raise Managed App-Server File Descriptor Limit (#51470)**: Increases the soft `RLIMIT_NOFILE` limit on Unix to 4096 for managed daemons, preventing "Too many open files" errors under high load. [Link](https://github.com/openai/codex/pull/51470)

### Feature Request Trends
*   **Enhanced File Interaction**: Strong demand for drag-and-drop of non-image files and better attachment handling in both VS Code and Desktop apps.
*   **Autonomous Agent (Dots) Control**: Users are requesting per-device visibility controls and better management of agent tasks across different clients.
*   **Browser Integration Stability**: Requests focus on reliable permission handling and stable routes for the built-in browser component.
*   **Approval Granularity**: Users want finer control over sub-agent approvals and sandboxed actions, particularly on Windows where current controls are lacking.

### Developer Pain Points
*   **Windows Desktop Instability**: A cluster of bugs specific to the Windows desktop app, including crashes, hanging commands, and sandbox execution failures, is the primary source of frustration.
*   **Sandbox Limitations**: Recurring issues with SSH config permissions, exFAT external drives, and temp directory permissions hinder real-world development workflows.
*   **Diagnostic Opacity**: Developers struggle with generic error messages (e.g., "helper_unknown_error") and `codex doctor` false positives, making troubleshooting difficult.
*   **Memory Footprint**: Reports of excessive heap retention (66 GiB) in macOS CLI versions suggest a need for better memory management in long-running sessions.

</details>