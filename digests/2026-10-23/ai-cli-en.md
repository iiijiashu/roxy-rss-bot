# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool AI CLI Comparison Report
**Date:** 2026-10-23
**Tools:** Claude Code, OpenAI Codex

## 1. Ecosystem Overview
The AI developer tool ecosystem is currently prioritizing system stability and resource management over raw feature expansion, as both major CLI tools face significant challenges with memory leaks and process orchestration. A distinct divergence is emerging in their architectural approaches: Anthropic is hardening its platform with strict organizational security policies and sandboxing, while OpenAI is focusing on broadened infrastructure integration, such as new cloud provider support and modular hook systems. Community feedback indicates a growing demand for transparency in background operations, with users actively requesting control over automatic behaviors like background fetching and plugin lifecycle management. Furthermore, both ecosystems are grappling with platform-specific distribution friction, particularly regarding Windows MSIX packaging and update reliability, which is impacting user trust and retention.

## 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues (Top 10)** | 10 tracked (High engagement on pricing/policy) | 10 tracked (High engagement on memory/Windows) |
| **PRs (Key 10)** | 10 tracked (Focus on `sec-default` hardening) | 10 tracked (Focus on infra/MCP/Vetex AI) |
| **Release Status** | Stable patch releases (v2.1.309, v2.1.308) | Alpha streaming (rust-v0.164.0-alpha.12/11, 0.163.0-alpha.11.2) |

## 3. Shared Feature Directions
*   **Resource & Process Management:** Both communities report critical failures in process cleanup. Claude Code users report orphaned processes continuing to execute destructive commands after "Stop" (#85200), while Codex users report unbounded MCP server memory leaks exceeding 9GB (#30408, #55141).
*   **Windows Distribution Friction:** Significant pain points exist for both tools regarding the Windows MSIX package. Claude Code reports severe CPU spinning and memory growth in MSIX builds (#96722), while Codex reports update failures due to locked MSIX packages (#25770).
*   **Plugin/Ecosystem Lifecycle:** Both tools are addressing issues with external integrations. Claude Code is fixing silent failures in plugin loading and auto-updates (#83422), while Codex is working on state persistence for plugins like Cloudflare and Google Drive (#53854, #56300).
*   **Desktop Session Persistence:** Users of both platforms are requesting features to maintain state or control across sessions. Claude Code wants "always-on" Remote Control (#48949), while Codex IDE users want workspace-persistent agent state and model preferences (#56305).

## 4. Differentiation Analysis
*   **Security vs. Infrastructure:** Claude Code's recent PR activity is heavily weighted toward `sec-default` modules, enforcing that organizational security policies cannot be loosened by user-installed plugins. OpenAI Codex's PR activity is focused on infrastructure modularity, specifically decoupling managed configuration from authentication and adding environment-scoped hooks.
*   **Target User Focus:** Claude Code's community shows high engagement with enterprise-grade pricing tiers (Max 20x) and organizational audit logging, indicating a strong B2B/enterprise focus. Codex's community is more focused on individual developer experience (DX), such as token counting for cost visibility and live remote computer-use previews.
*   **Technical Approach:** Claude Code is stabilizing its desktop app by fixing sandboxing bypasses (symlinks) and shell startup file execution. Codex is expanding its runtime capabilities, recently integrating Google Cloud Vertex AI and updating its MCP SDK to 1.32.0.

## 5. Community Momentum & Maturity
*   **Claude Code:** Exhibits signs of maturation with a focus on "hardening" and policy enforcement. The community is highly organized, with specific issues regarding organizational security posture. However, momentum is slightly hindered by reliability concerns regarding desktop updates and data loss.
*   **OpenAI Codex:** Is in a rapid iteration phase, evidenced by the steady release of alpha builds (v0.164.0). Momentum is high on infrastructure improvements, but maturity is challenged by critical stability blockers (MCP memory leaks) and platform-specific regressions in Windows and macOS environments.

## 6. Trend Signals
*   **Shift to "Managed" Security:** The emergence of `sec-default` in Claude Code signals an industry trend toward strict, non-bypassable organizational security layers for AI agents, preventing privilege escalation via user plugins.
*   **Infrastructure Abstraction:** Codex's decoupling of authentication from configuration and the introduction of environment-scoped hooks suggest a move toward more modular, multi-environment capable agent runtimes.
*   **Resource Efficiency as a Competitive Feature:** With both tools facing memory/process management critiques, efficient resource usage is becoming a key differentiator for long-running agentic workflows.
*   **Windows Packaging as a Bottleneck:** The recurring MSIX/Windows Store update failures in both ecosystems highlight that distribution model is becoming a primary source of user friction, potentially driving more users toward CLI-only or self-managed binary installations.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**1. Top Skills Ranking**

*   **MCP-Builder Fixes**: The [`fix(mcp-builder)` PR #1742](https://github.com/anthropics/skills/pull/1742) targets a compatibility breakage where `mcp>=2.0.0` renamed `streamablehttp_client` to `streamable_http_client`. The discussion highlights that custom HTTP headers are now configured via `create_mcp_http_client`, breaking legacy import patterns. **Status**: Open.
*   **Skill-Creator Stability**: [`fix(skill-creator)` PR #1298](https://github.com/anthropics/skills/pull/1298) addresses critical flaws in trigger evaluation, including `select()` failures on Windows and false misses in per-worker command probes. **Status**: Open.
*   **Notion & Resume Auditing**: [`Add notion-spec-to-implementation...` PR #1245](https://github.com/anthropics/skills/pull/1245) introduces skills to convert product specs into Notion tasks and audit resumes quantitatively. The discussion focuses on breaking down spec pages into implementation plans with acceptance criteria. **Status**: Open.
*   **Web3 Contract Auditing**: [`feat(skills): add proofcore-contract-auditor` PR #1771](https://github.com/anthropics/skills/pull/1771) adds a skill for static analysis of Solidity/Rust smart contracts, anchoring cryptographic audit proofs onto the TON Blockchain using a zero-storage Merkle protocol. **Status**: Open.
*   **MD-to-Video Conversion**: [`Add md2video-audio skill` PR #1703](https://github.com/anthropics/skills/pull/1703) compiles Markdown into MP4 videos with realistic voiceovers via Marp. The highlight is the "zero-cost" workflow for generating presentation slides from docs. **Status**: Open.
*   **DOCX Automation Fixes**: [`fix(docx): report LibreOffice timeout...` PR #1792](https://github.com/anthropics/skills/pull/1792) fixes `accept_changes.py` to report errors instead of falsely claiming success when `soffice` times out, and verifies output XML revision marks. **Status**: Open.
*   **Frontend Design Clarity**: [`Improve frontend-design skill` PR #210](https://github.com/anthropics/skills/pull/210) revises the skill to ensure instructions are specific and actionable within a single conversation, improving steering of Claude's behavior. **Status**: Open.
*   **Algorithmic Art Utils**: [`algorithmic-art: wrapAround() now wraps` PR #1977](https://github.com/anthropics/skills/pull/1977) fixes a modulo logic error in `wrapAround()`, ensuring results correctly stay in the `[0, max)` range. **Status**: Open.

**2. Community Demand Trends**

*   **Trust & Security Boundaries**: The most significant demand is addressing trust boundary abuse. [Issue #492](https://github.com/anthropics/skills/issues/492) (46 comments) highlights that community skills distributed under the `anthropic/` namespace impersonate official skills, prompting a need for clear security vetting and namespace integrity.
*   **Organizational Sharing**: [Issue #228](https://github.com/anthropics/skills/issues/228) (17 comments) seeks native org-wide skill sharing in Claude.ai to replace manual `.skill` file transfers via Slack/Teams.
*   **Evaluation Reliability**: [Issue #556](https://github.com/anthropics/skills/issues/556) (13 comments) reports that `run_eval.py` has a 0% trigger rate, indicating a strong demand for reliable, functional skill evaluation tooling.
*   **Agent State Management**: [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory`, a skill using symbolic notation to manage agent state, reflecting a trend toward efficient context and memory management for long-running agents.
*   **Duplicate Content Resolution**: [Issue #189](https://github.com/anthropics/skills/issues/189) identifies that `document-skills` and `example-skills` plugins install identical content, creating a demand for cleaner plugin categorization.

**3. High-Potential Pending Skills**

*   **scnet-hpc**: [`Add scnet-hpc skill` PR #1615](https://github.com/anthropics/skills/pull/1615) enables operating SCNet HPC clusters via profile-based SSH and Slurm workflows, a specialized but high-utility skill for academic/compute environments. **Status**: Open.
*   **ODT Support**: [`Add ODT skill` PR #486](https://github.com/anthropics/skills/pull/486) covers OpenDocument Format creation, filling, and parsing to HTML, addressing a gap in office document automation. **Status**: Open.
*   **Pyxel Games**: [`Add pyxel skill` PR #525](https://github.com/anthropics/skills/pull/525) guides the creation and debugging of retro games in Python, including headless input-driven runs. **Status**: Open.
*   **Meta-Skill Analyzers**: [`Add skill-quality-analyzer...` PR #83](https://github.com/anthropics/skills/pull/83) introduces tools to evaluate skill quality and security across five dimensions, a meta-layer skill for the ecosystem itself. **Status**: Open.

**4. Skills Ecosystem Insight**

The community's most concentrated demand at the Skills level is for **enhanced security and trust mechanisms** (specifically namespace integrity and vetting) alongside **reliable evaluation and sharing infrastructure** for enterprise and organizational use.

---

# Claude Code Community Digest: 2026-10-23

## 1. Today's Highlights
- **v2.1.309** released with critical sandboxing fixes for macOS and Linux, addressing issues where shell startup files ran outside the sandbox and symlinked `denyWrite` globs were bypassed.
- **Security & Policy Hardening:** A series of closed PRs focused on the `sec-default` module, ensuring that organizational policies (deny/ask rules) are strictly enforced over individual user-installed plugins, preventing privilege escalation.
- **Desktop Reliability Concerns:** Community attention is rising on macOS desktop auto-updates breaking Remote Control sessions and Windows MSIX package performance issues, with a significant data-loss report regarding desktop updates wiping Code tab sessions.

## 2. Releases
- **v2.1.309**: 
    - Fixed sandboxed Bash commands on macOS/Linux executing shell startup files outside the sandbox before each command.
    - Fixed macOS sandbox `denyWrite` glob patterns not applying correctly when the target path is reached through a symlink.
    - General reliability improvements. ([Release Notes](https://github.com/anthropics/claude-code/releases/tag/v2.1.309))
- **v2.1.308**: 
    - Bug fixes and general reliability improvements. ([Release Notes](https://github.com/anthropics/claude-code/releases/tag/v2.1.308))

## 3. Hot Issues
1.  **[enhancement, area:cost] feat: Team plan needs a Max 20x equivalent tier for power users** ([#47509](https://github.com/anthropics/claude-code/issues/47509))
    - **Why it matters:** High community engagement (185 👍, 65 comments). Power users/CTOs argue the current Premium tier (6.25x Pro) is insufficient for heavy agentic coding workflows, requesting a tier matching the individual Max 20x allowance.
2.  **[enhancement, platform:windows, area:desktop] Persistent always-on Remote Control option for desktop app** ([#48949](https://github.com/anthropics/claude-code/issues/48949))
    - **Why it matters:** Discrepancy between CLI and Desktop. The CLI supports `remoteControlAtStartup: true`, but the desktop app ignores this setting, defaulting to off. Users want a persistent always-on option.
3.  **[enhancement, platform:windows, area:ui, area:desktop] [FEATURE] Desktop sidebar: option to show forks as top-level sessions instead of nested under the parent** ([#100216](https://github.com/anthropics/claude-code/issues/100216))
    - **Why it matters:** UI usability. Forked sessions are currently nested under the parent, making it difficult to access independent branches. Users request an option to flatten the view.
4.  **[enhancement, area:desktop] [FEATURE] Make git worktree pooling opt-out: one worktree per session, removed only when the session is archived** ([#91472](https://github.com/anthropics/claude-code/issues/91472))
    - **Why it matters:** Resource management. Current worktree pooling behavior is surprising; users want explicit control (opt-out) to prevent unexpected worktree creation or cleanup.
5.  **[bug, area:desktop] [BUG] Desktop: unrequested background `git fetch` to origin on diff/commit refresh — untraceable by design, and no setting disables it** ([#84698](https://github.com/anthropics/claude-code/issues/84698))
    - **Why it matters:** Privacy/Surprise. The desktop app performs background `git fetch` operations that users did not explicitly trigger, and there is no configuration to disable it, causing concern for users with slow or monitored network environments.
6.  **[reproduced] Plugins: enabled-in-settings but never installed loads nothing silently; marketplace autoUpdate never updates existing installs** ([#83422](https://github.com/anthropics/claude-code/issues/83422))
    - **Why it matters:** Plugin reliability. If a plugin is marked enabled in `settings.json` but missing from `installed_plugins.json`, it silently fails to load without warnings. Auto-update also fails to refresh existing installs.
7.  **[bug, platform:linux, area:agents] In-process subagents are never re-invoked when their own run_in_background Bash / Monitor task completes** ([#88423](https://github.com/anthropics/claude-code/issues/88423))
    - **Why it matters:** Agent orchestration bug. Subagents that launch background tasks do not wake up when those tasks finish, breaking complex multi-step agentic workflows.
8.  **[bug] [BUG] TaskStop does not kill the process tree — orphaned `rm -rf /c` deleted user data for 20 minutes after stop** ([#85200](https://github.com/anthropics/claude-code/issues/85200))
    - **Why it matters:** Critical Safety Bug. Stopping a task does not properly terminate the underlying process tree, leading to dangerous orphaned processes continuing to execute destructive commands (like `rm -rf`) after the user believes the agent has stopped.
9.  **[enhancement, area:tui, area:statusline] [FEATURE] Setting to hide the permission-mode footer indicator (like hideVimModeIndicator)** ([#89126](https://github.com/anthropics/claude-code/issues/89126))
    - **Why it matters:** Customization. Users with custom statuslines find the built-in permission mode indicator redundant and want an option to hide it for a cleaner TUI.
10. **[bug, platform:windows, perf:memory, perf:cpu, area:desktop] [BUG] Windows MSIX Desktop: main process spins at 100% of a core with 150k-330k file 'other' I/O ops/s; kernel pool grows to ~9.4 GB** ([#96722](https://github.com/anthropics/claude-code/issues/96722))
    - **Why it matters:** Performance/Resource Leak. The MSIX packaged desktop app suffers from severe CPU spinning and file I/O throughput, leading to massive kernel memory growth (~9.4 GB), impacting system stability.

## 4. Key PR Progress
1.  **[CLOSED] mods: the declarations carry process.run's truncation flags and list entries' mtimeMs** ([#97293](https://github.com/anthropics/claude-code/pull/97293))
    - **Description:** Updates plugin module declarations to include `isStdoutTruncated`, `isStderrTruncated`, and `mtimeMs` fields. Ensures the engine's `.process.run` and `.fs.list` results accurately reflect CLI capabilities.
2.  **[CLOSED] sec-default: the rows a conversation keeps continue past the user tier** ([#97334](https://github.com/anthropics/claude-code/pull/97334))
    - **Description:** Implements event logging for the `sec-default` module that persists beyond the user tier, ensuring organizational audit logs capture conversation retention events.
3.  **[CLOSED] sec-default: collector records continue past the user tier** ([#97688](https://github.com/anthropics/claude-code/pull/97688))
    - **Description:** Security hardening. Prevents user-installed plugins from dropping or rewriting telemetry records sent to the organizational collector. Ensures `telemetry.log` integrity at the org level.
4.  **[CLOSED] diff: toasts show while the pane is open** ([#99118](https://github.com/anthropics/claude-code/pull/99118))
    - **Description:** UX Fix. Previously, toasts from other plugins were held/suppressed while the `/diff` pane was open. This PR allows transient toasts to display even when the diff pane is active.
5.  **[CLOSED] sec-default: a person's plugin may tighten, never loosen, what holds over it** ([#99137](https://github.com/anthropics/claude-code/pull/99137))
    - **Description:** Security Policy Enforcement. Ensures that in a `sec-default` environment, user plugins cannot loosen security rules (e.g., changing a "deny" to "allow") or modify pinned variables. They can only add stricter constraints.
6.  **[CLOSED] diff: a pane nothing can draw yet is kept, and shows once something can** ([#99141](https://github.com/anthropics/claude-code/pull/99141))
    - **Description:** Edge case fix for `/diff`. If the pane is opened before any host page is attached (nothing to draw), the pane state is kept and it will automatically render as soon as a drawable host attaches.
7.  **[CLOSED] sec-default: an organization's ceiling on a tool holds over the plugins a person installs** ([#99540](https://github.com/anthropics/claude-code/pull/99540))
    - **Description:** Organizational Security Ceiling. Enforces that if an organization requires approval for a specific tool, this requirement holds over any plugins installed by individual users. All policy hooks now carry a `.catch` to ensure strict enforcement.
8.  **[CLOSED] mods: the declarations carry process.run's truncation flags and list entries' mtimeMs** ([#97293](https://github.com/anthropics/claude-code/pull/97293)) *(Note: Duplicate entry in source, treated as related infrastructure update)*
    - **Description:** Further refinement of the plugin API surface to match the actual CLI capabilities regarding output truncation and file system metadata.
9.  **[CLOSED] sec-default: the rows a conversation keeps continue past the user tier** ([#97334](https://github.com/anthropics/claude-code/pull/97334)) *(Note: Duplicate entry in source, treated as related security audit)*
    - **Description:** Ensures audit logs for conversation retention are visible at the organizational level, not just the user level.
10. **[CLOSED] diff: toasts show while the pane is open** ([#99118](https://github.com/anthropics/claude-code/pull/99118)) *(Note: Duplicate entry in source, treated as related UX)*
    - **Description:** Restores toast visibility for the UI stack while the diff view is active.

## 5. Feature Request Trends
- **Granular Control & Customization:** Strong demand for settings to disable specific automatic behaviors (e.g., background `git fetch`, hidden permission indicators) and for customizable keybindings (e.g., swapping Enter/Cmd+Enter in the composer).
- **Plugin Lifecycle Management:** Requests for better plugin installation/update mechanisms, ensuring that `enabledPlugins` in settings actually load if installed, and fixing silent failures when plugins are missing from the local install registry.
- **Organizational Security Posture:** Emerging focus on `sec-default` behaviors, where users and org admins expect strict enforcement that user plugins cannot loosen security policies (deny/ask rules) set by the organization.
- **Remote Control Persistence:** Users want Remote Control to be a persistent, "always-on" state for desktop sessions, rather than a per-session toggle that defaults to off.
- **UI Layout Adjustments:** Requests to flatten session forks in the sidebar and allow the task plan block in the desktop app to scroll with the conversation rather than staying pinned.

## 6. Developer Pain Points
- **Data Loss & Safety:** Significant anxiety over orphaned processes continuing to run destructive commands after a "Stop" command (Issue #85200) and desktop updates wiping session data/plugins (Issue #103465).
- **Performance & Resource Leaks:** Windows MSIX users report critical performance issues with high CPU spin, excessive file I/O, and kernel memory growth (Issue #96722).
- **Unexpected Side Effects:** Unprompted background network activity (git fetch) and silent plugin loading failures create a "black box" experience where users are unaware of actions taken by the tool (Issues #84698, #83422).
- **Desktop Reliability:** Issues with macOS auto-updates breaking Remote Control connectivity and Windows session management failures when using worktrees with unpushed branches (Issues #104230, #104412).
- **Agent Orchestration Bugs:** Subagents failing to re-invoke upon completion of background tasks breaks complex agentic workflows (Issue #88423).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest: 2026-10-23

## 1. Today's Highlights
The community is focused on severe performance degradation in the desktop app, specifically unbounded MCP server process leaks consuming over 9GB of RAM, and persistent Windows Store update failures due to locked MSIX packages. Recent development cycles have introduced significant infrastructure improvements, including a new built-in Google Cloud Vertex AI provider and security hardening for MCP network policies, while users report ongoing regressions in Browser Use file preview policies and Cloudflare plugin persistence on Windows.

## 2. Releases
*   **rust-v0.164.0-alpha.12**: The latest alpha release [rust-v0.164.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.12) was published.
*   **rust-v0.164.0-alpha.11**: A previous alpha build [rust-v0.164.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.11) remains visible in the release feed.
*   **rust-v0.163.0-alpha.11.2**: A patch release for the 0.163.0 series [rust-v0.163.0-alpha.11.2](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.11.2) was released.

## 3. Hot Issues
1.  **MCP Server Process Leak (#30408)**: [Issue #30408](https://github.com/openai/codex/issues/30408) remains the top community pain point with 63 comments and 20 reactions. The app-server spawns full MCP process sets per thread but fails to clean them up, leading to unbounded memory growth (>9GB RSS). This is a critical stability blocker for long-running desktop sessions.
2.  **Windows Readback Failure (#50329)**: [Issue #50329](https://github.com/openai/codex/issues/50329) reports that `read_thread` on Windows returns only `chatgpt-content-reference` for completed ChatGPT replies. This breaks programmatic access to conversation history for Windows developers and is actively being discussed with 22 comments.
3.  **Windows Store Update Lock (#25770)**: [Issue #25770](https://github.com/openai/codex/issues/25770) highlights a recurring failure where old MSIX packages remain locked, preventing updates. With 20 comments and 5 reactions, this is a major friction point for Windows Store users trying to stay current.
4.  **Chrome Computer Use Safety Stop (#53154)**: [Issue #53154](https://github.com/openai/codex/issues/53154) details inconsistent behavior where successful page reads suddenly trigger URL safety stops without actionable reasons. Users are frustrated by the lack of transparency in the safety-checking mechanism.
5.  **File:// Preview Block on Windows (#24847)**: [Issue #24847](https://github.com/openai/codex/issues/24847) shows Browser Use on Windows blocking `file://` previews despite documentation claiming support. This 9-reaction issue highlights a discrepancy between docs and implementation for local development workflows.
6.  **macOS Memory Pressure (#55141)**: [Issue #55141](https://github.com/openai/codex/issues/55141) is a newer report confirming similar MCP/per-thread tool server accumulation on macOS, causing rising memory pressure after restart. It corroborates the findings in #30408.
7.  **Project Membership Sync (#53486)**: [Issue #53486](https://github.com/openai/codex/issues/53486) points out that `move_thread_to_project` success is not reflected in `read_thread` or the sidebar. This state inconsistency disrupts workflow management in the desktop app.
8.  **Pre-turn Compaction Bug (#32483)**: [Issue #32483](https://github.com/openai/codex/issues/32483) reveals that CLI pre-turn compaction clears reasoning-included state before accounting for it. This affects context window management and cost tracking for API users.
9.  **Windows Sandbox DLL Init Failure (#46412)**: [Issue #46412](https://github.com/openai/codex/issues/46412) reports that the Windows sandbox fails to launch USER32-importing children from session 0 with `STATUS_DLL_INIT_FAILED`. This limits the usability of the sandbox in specific orchestration environments.
10. **HTTP 432 Workspace Routing (#52996)**: [Issue #52996](https://github.com/openai/codex/issues/52996) documents persistent `HTTP 432` errors and account lookup failures on Windows. This connectivity issue prevents some users from initializing their workspaces properly.

## 4. Key PR Progress
1.  **Environment-Scoped Managed Hooks (#56304)**: [PR #56304](https://github.com/openai/codex/pull/56304) adds discovery and listing APIs for environment-owned required hooks. This allows command and MCP execution to be routed to the owning environment, improving modularization.
2.  **Hook Configuration in Attachments (#56302)**: [PR #56302](https://github.com/openai/codex/pull/56302) adds `environment_hooks` to `EnvironmentConfig`. This integrates hook configurations directly into environment attachments, streamlining setup for managed requirements.
3.  **MITM SigV4 TLS Forwarding Tests (#56301)**: [PR #56301](https://github.com/openai/codex/pull/56301) introduces test-only MITM CA constructors to exercise AWS SigV4 forwarding. This ensures payload hashes and credential replacements are handled correctly for GET/POST requests.
4.  **Dummy Credential Hardening (#56297)**: [PR #56297](https://github.com/openai/codex/pull/56297) marks built-in dummy credentials with a `masked` prefix and random characters. It also strengthens collision checks, enhancing security for credential handling.
5.  **Decouple Managed Config from Auth (#56295)**: [PR #56295](https://github.com/openai/codex/pull/56295) introduces a `BundleSource` interface to separate managed configuration loading from ChatGPT authentication. This improves modularity and allows better handling of unauthorized-request recovery.
6.  **Vertex AI Fixed-Token Fixtures (#56293)**: [PR #56293](https://github.com/openai/codex/pull/56293) adds `ProviderAuthCommandFixture::fixed_token` to support concurrent credential resolution. This fixes test flakiness associated with sequential token fixture rewrites.
7.  **MCP Cancellation Test Fix (#56292)**: [PR #56292](https://github.com/openai/codex/pull/56292) updates `call_tool` invocations to use the metadata callback API. This ensures tests correctly reflect the current interface for handling remote request cancellations.
8.  **Python Build Tool Locking (#56290)**: [PR #56290](https://github.com/openai/codex/pull/56290) locks Python release build tools with `uv`. This prevents isolated builds from resolving additional dependencies, ensuring reproducibility in release jobs.
9.  **Linux Artifact Signing Pin (#56288)**: [PR #56288](https://github.com/openai/codex/pull/56288) pins Linux artifact signing to Cosign v3.1.4. This upgrade preserves v2 signature bundle format compatibility while updating the installer.
10. **MCP SDK Bump (#56286)**: [PR #56286](https://github.com/openai/codex/pull/56286) bumps `@modelcontextprotocol/sdk` to `1.32.0`. This keeps the Codex MCP implementation aligned with the latest protocol specifications.

## 5. Feature Request Trends
*   **Input Token Counting for OAuth Plans**: Users are requesting a way to count input tokens for ChatGPT plan (OAuth) inference without sampling completions ([#56306](https://github.com/openai/codex/issues/56306)), aiming for better cost/context visibility.
*   **Workspace-Persistent Agent State**: IDE extension users want completed agent runs and model preferences to be preserved by workspace ([#56305](https://github.com/openai/codex/issues/56305)), reducing the need to re-configure sessions.
*   **Live Remote Computer Use Preview**: A request to show a live preview of remote computer-use sessions directly in the app ([#56296](https://github.com/openai/codex/issues/56296)) to improve visibility of actions performed on remote machines.

## 6. Developer Pain Points
*   **Resource Leakage**: A significant recurring pain point is the unbounded accumulation of MCP server processes and per-thread tool servers, leading to severe memory pressure on both macOS ([#30408](https://github.com/openai/codex/issues/30408), [#55141](https://github.com/openai/codex/issues/55141)) and potentially other platforms.
*   **Windows Update Friction**: The Windows Store MSIX update process is frequently failing due to locked packages ([#25770](https://github.com/openai/codex/issues/25770)), forcing users to manually repair or find workarounds to update the application.
*   **Browser Use Policy Inconsistencies**: Developers are frustrated by Browser Use blocking `file://` previews on Windows ([#24847](https://github.com/openai/codex/issues/24847)) and specific sites like AliExpress despite authorization ([#47579](https://github.com/openai/codex/issues/47579)), as well as IAB file preview blocks on macOS ([#49601](https://github.com/openai/codex/issues/49601)).
*   **Plugin State Persistence**: Issues with Cloudflare plugins disappearing after OAuth on Windows ([#53854](https://github.com/openai/codex/issues/53854)) and "Always allow" permissions for Google Drive not persisting across fresh chats ([#56300](https://github.com/openai/codex/issues/56300)) hinder stable workflow automation.

</details>