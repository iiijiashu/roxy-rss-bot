# AI CLI Tools Community Digest 2026-09-26

> Generated: 2026-09-26 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

**1. Ecosystem Overview**
The AI developer CLI landscape in late 2026 is characterized by a mature but volatile transition from basic coding assistants to complex agentic automation systems. Both major tools, Claude Code and OpenAI Codex, are navigating significant friction in enterprise authentication and cross-platform stability, with recent releases introducing regressions that disrupt primary workflows. While Anthropic pushes aggressively toward modular extensibility with its new "Mods" system, OpenAI focuses on multi-model integration and autonomous "Computer Use" capabilities. The current development environment is defined by a tension between rapid feature iteration—specifically in LLM gateways and sandboxing—and the immediate need for reliability fixes in Windows and remote development contexts.

**2. Activity Comparison**

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Highlighted** | 10 Top Hot Issues | 10 Top Hot Issues |
| **PRs Highlighted** | 6 Recent PRs | 10 Recent PRs |
| **Release Status** | v2.1.283 (Gateway headers, settings) | v0.157.0 (GPT-6 Sol/Luna, UI defaults) |
| **Dominant Issue Type** | Model Regression & Extensibility | Auth Failure (401s) & Windows Instability |

**3. Shared Feature Directions**
*   **Enterprise Auth Robustness:** Both communities report critical failures in authentication flows. Claude Code faces OAuth issues with Microsoft Entra ID due to hardcoded consent parameters, while Codex users encounter widespread `401 Unauthorized` errors and refresh token revocations despite successful logins.
*   **Remote & Headless Development:** There is a shared demand for stability in remote environments. Codex is blocked in VS Code Server due to desktop-only dependencies, while Claude Code users report CPU spin issues in VS Code Remote-SSH.
*   **Windows Platform Parity:** Both tools suffer from specific Windows regressions. Claude Code faces duplicate browser panes and UI interaction bugs, whereas Codex experiences daemon privilege errors, terminal window spawning loops, and browser policy loading failures.
*   **Session Stability for Long-Running Tasks:** Both ecosystems struggle with maintaining state and connectivity during extended agentic sessions. Claude Code reports infinite loop hooks and scope creep, while Codex faces WebSocket reconnect loops that interrupt long-running code generation.

**4. Differentiation Analysis**
*   **Feature Focus:** Anthropic is prioritizing **extensibility architecture** (the "Mods" system with function hooks and telemetry) and fine-grained model management. OpenAI is prioritizing **multi-model capability** (GPT-6 Sol/Luna via Bedrock) and **autonomous agency** (Computer Use and browser automation).
*   **Target Users:** Claude Code's community feedback highlights a strong demand from enterprise users needing multi-account separation and granular security controls. Codex's community is heavily focused on individual developer productivity, with significant pain points around "Computer Use" reliability and local desktop UX.
*   **Technical Approach:** Claude Code is moving toward a plugin/mod architecture to externalize logic (truncation flags, telemetry hooks). Codex is focusing on internal stability and security hardening (SSE frame bounding, `.aws` directory protection) while integrating deeper into the multi-cloud infrastructure (Amazon Bedrock).

**5. Community Momentum & Maturity**
*   **Claude Code:** The community is highly mature regarding extensibility, actively building around the "Mods" system. However, momentum is currently dampened by significant model regression reports (Opus 5.5 scope creep), causing users to downgrade to older models. The high engagement on multi-account issues suggests a shift toward more serious enterprise adoption.
*   **OpenAI Codex:** Community momentum is defined by high anxiety and reactive debugging. The sheer volume of authentication reports (100+ upvotes on the primary bug) and Windows instability issues suggests the tool is in a state of rapid, somewhat unstable iteration. The recent PR volume (10 in a single day) indicates a high-velocity response to breakages, but the user experience is currently plagued by "silent failures" in network and auth handling.

**6. Trend Signals**
*   **The "Agentic Reliability" Hurdle:** Both tools demonstrate that the primary barrier to adoption is no longer model intelligence, but the reliability of the execution environment. Mid-session crashes, auth token expiration, and UI loops are the top user complaints across both platforms.
*   **Security as a Feature:** There is a clear trend toward treating security instrumentation as a product feature. Codex is explicitly protecting credential directories in sandboxes, while Claude Code is adding managed settings for model matching and gateway hints. Developers should expect tighter security defaults that may require configuration overrides.
*   **Platform Fragmentation Risks:** The "Windows penalty" is becoming a distinct structural issue. Both tools have specific, persistent bugs on Windows that are not present on Linux/macOS to the same degree, likely signaling that cross-platform compatibility is lagging behind the core development cycles.
*   **Shift to Multi-Model Routers:** Codex's release of models with Bedrock support and migration prompts signals that the CLI is becoming a router for heterogeneous LLM backends, rather than just a wrapper for a single proprietary model. Developers should look for tooling that abstracts away model-specific quirks.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report

### 1. Top Skills Ranking

Based on the provided data, all listed Pull Requests have 0 explicit 👍 reactions and "undefined" comment counts in the structured feed, but they are sorted by overall community attention. The most prominent submissions are:

*   **`skill-creator` (Fix/Enhancement)**: Focuses on isolating trigger evaluations and fixing Windows subprocess failures. This skill is critical for the self-referential nature of the ecosystem, allowing users to build new skills. The open PR [#1298](https://github.com/anthropics/skills/pull/1298) addresses false misses in evaluation and runtime failures, indicating active stabilization of the core tooling.
*   **`mcp-builder` (Fix)**: Addresses compatibility with `mcp>=2.0.0` where `streamable_http_client` was renamed and custom header configuration changed. The open PR [#1742](https://github.com/anthropics/skills/pull/1742) fixes import errors, highlighting the rapid upstream evolution of MCP standards that skills must track.
*   **`docx` (Multiple Fixes)**: The document skills are seeing significant activity with three distinct open PRs: [#1792](https://github.com/anthropics/skills/pull/1792) (LibreOffice timeout handling), [#541](https://github.com/anthropics/skills/pull/541) (OOXML ID collision bugs causing document corruption), and [#1790](https://github.com/anthropics/skills/pull/1790) (missing `document.xml.rels` file creation). This suggests `docx` is a high-usage skill with complex edge cases being resolved.
*   **`proofcore-contract-auditor` (New)**: A Web3-specific skill for static analysis of Solidity/Rust contracts and cryptographic audit proof anchoring to the TON blockchain. Open PR [#1771](https://github.com/anthropics/skills/pull/1771) represents a move into specialized financial/crypto security domains.
*   **`md2video-audio` (New)**: Compiles Markdown directly into MP4 videos with voiceovers using Marp. Open PR [#1703](https://github.com/anthropics/skills/pull/1703) shows expansion into multimedia content generation.
*   **`awt` (AI Watch Tester)**: An E2E testing skill that provides Claude with vision and browser control for zero-code test generation. Open PR [#822](https://github.com/anthropics/skills/pull/822) indicates growing interest in automated QA and testing workflows.

### 2. Community Demand Trends

Analysis of the top Issues reveals distinct demand vectors:

*   **Security & Trust Boundaries**: Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments) highlights a critical concern: community skills distributed under the `anthropic/` namespace, creating impersonation risks. The community is demanding clearer separation between official and community namespaces.
*   **Skill Triggering & Evaluation Reliability**: Issue [#556](https://github.com/anthropics/skills/issues/556) reports a 0% trigger rate for `run_eval.py`, while Issue [#1390](https://github.com/anthropics/skills/issues/1390) notes that `mcp-builder` evaluation silently fails. There is strong demand for robust, testable mechanisms to verify that skills are actually being invoked correctly.
*   **Enterprise Collaboration**: Issue [#228](https://github.com/anthropics/skills/issues/228) calls for org-wide skill sharing within Claude.ai, moving beyond individual file downloads to managed, shared libraries.
*   **Context Window Management**: Issues [#1487](https://github.com/anthropics/skills/issues/1487) and [#1362](https://github.com/anthropics/skills/issues/1362) point to skills like `claude-api` and `web-artifacts-builder` consuming excessive tokens or failing on modern toolchains (pnpm ≥10.1), demanding more efficient, lightweight skill implementations.
*   **Agent Governance & Quality Gates**: Issue [#412](https://github.com/anthropics/skills/issues/412) and [#1385](https://github.com/anthropics/skills/issues/1385) propose skills for safety patterns, policy enforcement, and reasoning quality verification, indicating a shift toward governed, auditable agent operations.

### 3. High-Potential Pending Skills

These active PRs represent skills that are close to addressing significant gaps or offering new capabilities, pending review:

*   **`blast-radius`**: Open PR [#1776](https://github.com/anthropics/skills/pull/1776) adds a checklist for destructive bulk operations (deleting rows, revoking access). It fills a critical safety gap in data manipulation workflows.
*   **`testing-patterns`**: Open PR [#723](https://github.com/anthropics/skills/pull/723) provides a comprehensive testing philosophy and React component testing guidance. This addresses the need for structured, best-practice-aligned testing strategies within the agent's context.
*   **`scnet-hpc`**: Open PR [#1615](https://github.com/anthropics/skills/pull/1615) enables operation of HPC clusters via SSH/Slurm. This is a high-value niche skill for scientific computing and data engineering users.
*   **`notion-spec-to-implementation`**: Open PR [#1245](https://github.com/anthropics/skills/pull/1245) bridges product specs and execution by converting Notion pages into implementable tasks. This represents a strong "workflow automation" trend.

### 4. Skills Ecosystem Insight

The community's most concentrated demand is for **reliable verification mechanisms** that ensure skills trigger correctly, evaluate successfully without silent failures, and operate within secure, well-defined trust boundaries.

---

**Claude Code Community Digest — 2026-09-26**

### Today's Highlights
Anthropic released v2.1.283, introducing gateway hint headers for LLM request grouping and new managed settings for model matching. Community attention remains heavily focused on the "Mods" extensibility system, with active development of function hooks and a massive feature request for multi-account connector support. Notable model regression reports for Opus 5.5 and persistent UI/CLI bugs continue to dominate recent issue discussions.

### Releases
**v2.1.283**
*   Added `x-claude-code-prompt-id` to gateway hint headers to allow LLM gateways to group requests serving a single user prompt (opt-in via `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1`).
*   Added `availableModelsMatch` managed setting; `"exact"` mode restricts `availableModels` entries to allow only specific models.
*   [Link to Release](https://github.com/anthropics/claude-code/releases)

### Hot Issues
1.  **Multi-Account Connector Support (#27302)**: The most upvoted open issue (390 👍, 256 comments) requesting support for multiple accounts on the same connector in Claude Code web/desktop. High demand for enterprise and personal account separation.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/27302)
2.  **Mods Extensibility (#91870)**: 216 comments tracking the "Mods" feature that promises 10x extensibility. Latest update confirms function hooks are being shipped on a multi-week timeline, shaping the plugin architecture.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/91870)
3.  **Opus 5.5 Scope Creep (#97117)**: New reports indicate significant task focus regression and scope creep in Opus 5.5 compared to 4.6 on long-running projects, forcing users to switch back to the previous model.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/97117)
4.  **VS Code Copy Bug (#43477)**: Long-standing bug where `Ctrl+C` fails to copy text in the Claude Code window within VS Code, persisting across platform updates.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/43477)
5.  **MCP OAuth Entra ID Failure (#94804)**: Hardcoded `prompt=consent` breaks OAuth for Microsoft Entra tenants with user consent disabled. Affects CLI, web, and desktop, marking a regression in enterprise auth flows.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/94804)
6.  **Native /goal Hook Loop (#94041)**: Session-scoped `/goal` Stop hooks re-fire indefinitely on Linux with no acknowledgment mechanism, causing stalled sessions until the safety valve triggers.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/94041)
7.  **Chrome Bypass Mode Regression (#96096)**: In desktop Bypass permissions mode, `claude-in-chrome` tools prompt on every call in v2.1.280+, ignoring "Always allow" settings.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/96096)
8.  **CPU Spin on Linux (#87739)**: The native CLI binary spins at ~100% CPU indefinitely on startup in VS Code Remote-SSH environments on Ubuntu 26.04.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/87739)
9.  **Model Word Substitution (#97305)**: Reproducible model error where "verifiable" is replaced with "falsifiable" in specific contexts; project-scoped corrections fail to transfer across sessions.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/97305)
10. **Spurious System Reminders (#81503)**: System reminders falsely attribute self-caused git diffs to "user or linter," instructing the model to withhold information from the user.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/81503)

### Key PR Progress
*Note: The repository only displays 6 recent PRs, not 10. The following covers all available recent PR activity, heavily focused on the "Mods" and telemetry architecture by contributor `poteat`.*

1.  **Mods Truncation Flags (#97293)**: Adds `isStdoutTruncated` and `mtimeMs` to Mod declarations, enabling process.run truncation handling and fs.list metadata access, conditional on CLI support.
2.  **System Prompt Sections (#97241)**: Extends system prompt sections past the user tier, dependent on `prompt.compose` engine availability; test checks remain red until CLI releases support the event.
3.  **Diff Hook Naming (#96953)**: Fixes `ui.focus` hook matching to align with engine-stamped element names (`cc-plugin-diff`) rather than hardcoded plugin names.
4.  **Telemetry Test Plugins (#96930)**: Updates test plugins to hook `telemetry.log` via the collector stream by name, ensuring tests stand in for installed plugins without modifying `hooks/` logic.
5.  **Telemetry Log/Mark Hooks (#96917)**: Moves `$.telemetry.log` and `$.telemetry.mark` implementation into Mod hooks on noun events, queuing rows and answering values beneath the security gate.
6.  **Source Code Addition (#41611)**: Long-open PR attempting to add missing source code to the repository.

### Feature Request Trends
*   **Multi-Account & Identity**: Strongest demand for supporting multiple connector accounts within a single session (Issue #27302).
*   **Extensibility (Mods)**: Community is actively building and discussing the new "Mods" system for 10x extensibility, particularly function hooks (Issue #91870).
*   **Artifact Management**: Requests to delete or unpublish Artifacts to manage workspace clutter (Issue #74589).
*   **Safeguard Controls**: Requests for more granular control over security instrumentation to prevent false positives in legitimate security work (Issue #97303).

### Developer Pain Points
*   **Model Regression**: Opus 5.5 is causing significant scope creep and loss of task focus on long projects, leading users to downgrade to 4.6 (Issue #97117).
*   **Auth & OAuth Complexities**: Enterprise environments (Entra ID) are breaking due to hardcoded OAuth parameters, and account switching disrupts `claude-in-chrome` connectivity (Issues #94804, #97309).
*   **Desktop UI Bugs**: Multiple reported rendering and interaction issues in the desktop app, including duplicate browser panes on Windows, stuck task chips, and failure of "Always allow" in bypass mode (Issues #97313, #91820, #96096).
*   **Unintended Interruptions**: Spurious system reminders falsely reporting user/linter changes and infinite loop hooks are disrupting automated workflows (Issues #81503, #94041).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### Today's Highlights
OpenAI released Codex CLI **v0.157.0**, introducing GPT-6 Sol and Luna models with Amazon Bedrock support and enabling fullscreen transcripts by default. The community is currently experiencing a significant authentication regression where many users report receiving `401 Unauthorized` errors with invalid `sk-svcac` credentials despite successful ChatGPT logins, prompting over 100 community reactions to a major bug report. Concurrently, Windows users face new instability with persistent terminal window spawning and daemon privilege errors following the recent update.

### Releases
*   **Codex CLI v0.157.0** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.157.0))
    *   **New Models:** Added GPT-6 Sol and Luna, including support for Amazon Bedrock and migration prompts for older models ([#47332](https://github.com/openai/codex/issues/47332), [#47347](https://github.com/openai/codex/issues/47347)).
    *   **UI Enhancements:** Enabled fullscreen transcripts by default and added Shift-click to extend text selections ([#47178](https://github.com/openai/codex/issues/47178), [#47414](https://github.com/openai/codex/issues/47414)).
    *   **Automation:** Enabled automatic background-server startup for eligible environments.

### Hot Issues
1.  **Mass 401 Unauthorized / Invalid API Key Failure** ([#48237](https://github.com/openai/codex/issues/48237))
    *   **Why it matters:** This is the highest-traffic issue, with 93 comments and 100 upvotes. Users are logging into ChatGPT successfully but encountering `401 Unauthorized` errors citing incorrect `sk-svcac` API keys. It appears to be a widespread backend or client-side credential mismatch.
    *   **Community Reaction:** High anxiety; many users report total unavailability of the service, with multiple duplicate reports filed in a single day.
2.  **Windows Daemon Privilege & Terminal Loop** ([#48043](https://github.com/openai/codex/issues/48043), [#48059](https://github.com/openai/codex/issues/48059))
    *   **Why it matters:** v0.157.0 introduced a regression on Windows where the CLI fails to start due to daemon privilege errors, or repeatedly spawns ~20 terminal windows that cannot be easily closed.
    *   **Community Reaction:** Users are reverting to v0.156.1 or avoiding Windows usage; the issue blocks local development on Windows platforms.
3.  **macOS Sandbox Startup Failure** ([#45119](https://github.com/openai/codex/issues/45119))
    *   **Why it matters:** A persistent bug on macOS 14.2 (Apple Silicon) where the sandbox fails to start due to an unbound variable `TIOCSTI`. This prevents the CLI from executing commands in a secure environment on affected systems.
    *   **Community Reaction:** Ongoing technical debate with maintainers; users are locked out of sandboxed execution on specific macOS versions.
4.  **Frequent WebSocket Reconnect Loop** ([#18960](https://github.com/openai/codex/issues/18960))
    *   **Why it matters:** A long-standing connectivity issue where the Codex App repeatedly disconnects with "websocket closed by server before response.completed."
    *   **Community Reaction:** Frustration with reliability; users report this interrupts long-running agent sessions and code generation tasks.
5.  **Refresh Token Revocation on macOS** ([#41973](https://github.com/openai/codex/issues/41973))
    *   **Why it matters:** Even after successful ChatGPT login, refresh tokens are being revoked, causing subsequent 401 errors in Desktop and CLI. This suggests a session management bug specifically affecting macOS.
    *   **Community Reaction:** Users report a "logged in" status that is functionally broken; high frequency of reports from macOS users.
6.  **VS Code Server / Remote Activation Failure** ([#47357](https://github.com/openai/codex/issues/47357))
    *   **Why it matters:** Codex fails to activate in VS Code Server (remote environments) because the required "Codex Audio" extension is desktop-only. This blocks remote development workflows.
    *   **Community Reaction:** 20 upvotes; developers using remote containers or WSL are unable to use the tool in their IDE.
7.  **OAuth Fallback to Hardcoded Dummy Key** ([#37192](https://github.com/openai/codex/issues/37192))
    *   **Why it matters:** When network conditions change (e.g., WiFi to hotspot), Codex silently falls back to a hardcoded "dummy" API key instead of prompting for re-authentication, causing obscure 401 errors.
    *   **Community Reaction:** Users find the silent failure mode confusing and difficult to debug; requests for clearer error messaging.
8.  **Windows Browser Policy Loading Failure** ([#46129](https://github.com/openai/codex/issues/46129))
    *   **Why it matters:** On Windows, browser commands fail with "Unable to load browser request-header policy" due to a ~4.8 MB Statsig payload exceeding response limits. This blocks the "Computer Use" feature.
    *   **Community Reaction:** Specific to Windows; users attempting to use automated browser control are completely blocked.
9.  **Windows Desktop Renderer Reload Loop** ([#47449](https://github.com/openai/codex/issues/47449))
    *   **Why it matters:** The Windows desktop app reloads its renderer every time the window loses or regains focus, causing UI instability and potential loss of local state.
    *   **Community Reaction:** Reported as a major UX hindrance for Windows users; affects both Codex and ChatGPT desktop interfaces.
10. **Browser/Computer Use Input Stoppage** ([#47980](https://github.com/openai/codex/issues/47980))
    *   **Why it matters:** Mid-session, browser and native computer-use inputs stop working and do not recover in new sessions. This breaks the primary value proposition of the agentic "computer use" feature.
    *   **Community Reaction:** Users report that long-running automation tasks fail unpredictably, requiring manual intervention or restarts.

### Key PR Progress
*All recent PRs were merged on 2026-09-25, focusing on stability, security, and internal refactoring.*

1.  **Prevent Windows Daemon Stdio Inheritance** ([#48272](https://github.com/openai/codex/pull/48272)): Fixes an issue where detached Windows daemons inherited output pipes, causing callers to wait for EOF indefinitely. This likely addresses part of the Windows instability issues.
2.  **Suppress Console Windows for Local MCP Servers** ([#48238](https://github.com/openai/codex/pull/48238)): Implements `CREATE_NO_WINDOW` for local stdio MCP servers on Windows, preventing unnecessary console window flicker.
3.  **Extract Responses Failure Parsing** ([#48229](https://github.com/openai/codex/pull/48229)): Moves `response.failed` classification and rate-limit retry logic into a dedicated `responses_error.rs` module, improving code maintainability and error handling.
4.  **Preserve Model/Access Program Pairs** ([#48224](https://github.com/openai/codex/pull/48224)): Fixes a bug where compaction could produce a model/program pair rejected by the server by persisting `cyber_access_program` in previous-turn settings.
5.  **Preserve Late Result Metadata** ([#48222](https://github.com/openai/codex/pull/48222)): Ensures that truncated code-mode calls correctly attach result metadata to output, preventing data loss in nested execution traces.
6.  **Isolate Executable Fixture Copies** ([#48213](https://github.com/openai/codex/pull/48213)): Fixes `ETXTBSY` errors in Linux CLI tests by isolating executable fixture copies, improving test reliability.
7.  **Keep Codex Visible During Editor Handoff** ([#48211](https://github.com/openai/codex/pull/48211)): Improves TUX by preserving the last Codex frame when handing the terminal to an external editor, preventing the UI from disappearing.
8.  **Preserve Queued Output for Observers** ([#48207](https://github.com/openai/codex/pull/48207)): Fixes observer detachment during code-mode termination, ensuring all queued runtime events are drained before the process ends.
9.  **Bound Agent Message Board SSE Frames** ([#48190](https://github.com/openai/codex/pull/48190)): Enhances security and stability by enforcing `MAX_BODY` limits on SSE frames before parsing, preventing memory accumulation from oversized or malformed data.
10. **Protect `.aws` Directories in Sandbox** ([#48176](https://github.com/openai/codex/pull/48176)): Security improvement that protects `.aws` credential directories even when the parent directory is granted write access in the sandbox, preventing credential theft or manipulation.

### Feature Request Trends
*   **Remote/Headless IDE Support:** Significant demand for Codex to function properly in VS Code Server and remote environments without desktop-only dependencies (e.g., Codex Audio) ([#47357](https://github.com/openai/codex/issues/47357)).
*   **Improved Error Transparency:** Users are requesting clearer error messages for authentication failures, specifically when OAuth tokens expire or network changes occur, instead of silent fallbacks to dummy keys ([#37192](https://github.com/openai/codex/issues/37192)).
*   **Reliable Long-Running Sessions:** Demand for stability in WebSocket connections to prevent mid-session drops in long agentic tasks ([#18960](https://github.com/openai/codex/issues/18960), [#32868](https://github.com/openai/codex/issues/32868)).
*   **Windows Platform Parity:** Strong request for Windows-specific fixes to match the stability of macOS/Linux, particularly regarding daemon management and terminal handling ([#48043](https://github.com/openai/codex/issues/48043)).

### Developer Pain Points
*   **Authentication Confusion:** The primary pain point is the disconnect between "Logged in with ChatGPT" status and actual 401 errors. Developers are unable to debug whether the issue is local (CLI version) or global (backend service outage), leading to wasted time on support tickets ([#48237](https://github.com/openai/codex/issues/48237)).
*   **Windows Instability:** Windows users face a "double penalty" with recent releases: both the Desktop app and CLI are experiencing regressions (daemon errors, terminal spawning, browser policy failures), making Windows an unreliable platform for critical development work ([#48059](https://github.com/openai/codex/issues/48059)).
*   **Sandbox Limitations:** macOS users on specific versions (14.2) are completely blocked from using sandboxed execution due to kernel-level variable issues (`TIOCSTI`), forcing them to either disable safety features or use alternative OS versions ([#45119](https://github.com/openai/codex/issues/45119)).
*   **Computer Use Reliability:** The "Computer Use" and browser automation features are frequently cited as stopping mid-session or failing to load policies on Windows, undermining trust in autonomous workflows ([#47980](https://github.com/openai/codex/issues/47980)).

</details>