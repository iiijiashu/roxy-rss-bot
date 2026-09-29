# AI CLI Tools Community Digest 2026-09-29

> Generated: 2026-09-29 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## Cross-Tool Comparison Report: AI CLI Developer Tools
**Date:** 2026-09-29
**Scope:** Claude Code (Anthropic), OpenAI Codex

### 1. Ecosystem Overview
The AI CLI development landscape is currently defined by a race between extensibility and platform stability. While Anthropic’s Claude Code is pivoting toward a modular "Mods" architecture to solve deep customization needs, OpenAI Codex is heavily focused on internal reliability engineering, specifically optimizing resource leaks and database performance. Both tools are facing significant friction in their latest stable releases, indicating that rapid feature shipping is outpacing quality assurance across the ecosystem. Consequently, community trust is currently driven by how quickly regressions (freeze loops, sandbox errors) are reverted or patched rather than by new feature introductions.

### 2. Activity Comparison
Based on the 2026-09-29 digest data:

| Metric | Claude Code (Anthropic) | OpenAI Codex (OpenAI) |
| :--- | :--- | :--- |
| **Release Status** | **v2.1.284** (Stable) | **v0.158.0** (Stable), **v0.160.0-alpha.2** |
| **Highlighted Issues** | 10+ (e.g., #91870, #98023) | 10+ (e.g., #42739, #48125) |
| **Highlighted PRs** | 5+ (e.g., #98018, #94847) | 10+ (e.g., #49106, #49105) |
| **Key Focus** | Extensibility (Hooks/Mods), Regression Rollback | Internal Reliability (SQLite), UX Refinement |
| **Stability Signal** | Reverting recent changes for stability | High velocity in backend optimization |

### 3. Shared Feature Directions
Several critical requirements are emerging across both communities, suggesting industry-wide gaps:
*   **MCP Resilience & Auto-Reconnect:** Both toolbases lack automatic reconnection for dead Model Context Protocol (MCP) servers. Claude Code users report wedge issues (#82746), while Codex users cite MCP tools remaining unavailable until manual reload (#11489). This is now a top-tier interoperability requirement.
*   **Sandbox & Permission Management:** Both ecosystems are grappling with permission prompt friction. Claude Code is rolling back "workspace trust" prompts that interrupt workflows (#97991), while Codex faces "blocked by policy" errors on Windows (#46012) and complex root access requirements.
*   **Cross-Platform/Device Parity:** There is a shared demand for seamless synchronization between environments. Claude Code users need Desktop-CLI skill parity (#20697), while Codex users are struggling with Android-to-Desktop remote pairing loops (#36268).

### 4. Differentiation Analysis
*   **Architectural Approach:** Claude Code is adopting a "cautious expansion" model, explicitly reverting unstable features (Agents-md reads) to prioritize the upcoming "Mods" plugin system (#91870). In contrast, Codex is pursuing "internal hardening," releasing a high volume of PRs focused on SQLite optimization, connection pooling, and plugin manifest caching to support its core execution loop.
*   **Target User Friction:** Claude Code's user base is experiencing more high-level workflow regressions (freeze loops, skill token overhead) related to its rapid feature shipping. Codex's user base is facing more low-level platform friction, specifically regarding Windows sandbox configurations and Linux clipboard regressions.
*   **Voice & Multimodal:** Codex is integrating voice catalog error handling and UI surfacing for connectivity failures, whereas Claude Code's voice mode is currently constrained by a lack of language localization (#31724), making it less robust for non-English markets.

### 5. Community Momentum & Maturity
*   **Activity Level:** Claude Code displays higher engagement on architectural roadmap items, with the "Mods" initiative commanding 223 comments and 128 reactions on its primary tracking issue. This suggests a highly active, forward-looking developer community focused on tooling extensibility.
*   **Iteration Velocity:** Codex demonstrates higher raw throughput in its development process, with 10+ significant internal improvements (database, state management) noted in a single day. This indicates a team heavily focused on maintaining performance integrity at scale.
*   **Maturity Indicators:** Both tools are moving past "proof of concept" into "production maturity," evidenced by a shift in community complaints from "does it work" to "why is it consuming 6GB of RAM" or "why did the patch release break my workflow."

### 6. Trend Signals
*   **The "Reliability Dividend":** Developers are actively downgrading or bypassing features (e.g., AVX-less CPU users avoiding the native installer) to maintain workflow consistency. This signals that in the AI CLI space, "non-breaking" updates are becoming as valuable as new features.
*   **Supply Chain Security:** Codex and Claude Code are both beginning to address CI security and egress-firewall runners for automated AI interactions. This indicates a maturing threat model where AI agents are no longer just tools but active actors requiring supply chain verification.
*   **Resource Management:** With reports of disk exhaustion (Codex) and RAM leaks (Claude Code), the next competitive differentiator will likely be "invisible resource management"—tools that efficiently handle temporary state (git objects, DB vacuums) without user intervention.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

### 1. Top Skills Ranking

Based on community engagement and discussion depth within the `anthropics/skills` repository, here are the most-discussed Skill developments:

*   **skill-creator (Tooling & Validation)**
    *   **Functionality:** Core tooling for building, validating, and benchmarking new Skills.
    *   **Highlights:** Significant discussion surrounds reliability issues, including `run_eval.py` failing to trigger commands (0% trigger rate), silent benchmark failures due to layout mismatches, and Windows-specific runtime failures. Security concerns also highlight that the eval-viewer's HTML escaping is not attribute-safe, posing an XSS risk.
    *   **Status:** Open PRs and Issues active; ongoing fixes for cross-platform compatibility.
    *   [PR #1298](https://github.com/anthropics/skills/pull/1298), [Issue #556](https://github.com/anthropics/skills/issues/556), [Issue #1394](https://github.com/anthropics/skills/issues/1394), [Issue #1383](https://github.com/anthropics/skills/issues/1383)

*   **document-skills (DOCX/ODT/PDF) (Enterprise Document Automation)**
    *   **Functionality:** Skills for manipulating Microsoft Word, OpenDocument, and PDF files, including handling tracked changes and timeouts.
    *   **Highlights:** Discussions focus on robustness, such as handling LibreOffice timeouts as errors, preventing file corruption via ID collisions in tracked changes, and fixing case-sensitive file reference breaks. A major security debate also centers on embedding SharePoint Online access control logic directly in SKILL.md files.
    *   **Status:** Open PRs addressing edge cases; security concerns under review.
    *   [PR #1792](https://github.com/anthropics/skills/pull/1792), [PR #541](https://github.com/anthropics/skills/pull/541), [PR #486](https://github.com/anthropics/skills/pull/486), [Issue #1175](https://github.com/anthropics/skills/issues/1175)

*   **claude-api (Model Management)**
    *   **Functionality:** Bundled skill for interacting with Claude models and API capabilities.
    *   **Highlights:** Community feedback highlights a critical token-efficiency flaw where the skill eagerly injects ~156k tokens, exhausting the context window in a single tool call. There is also active maintenance regarding deprecated and retired model IDs (e.g., opus-4-1, sonnet-4-0).
    *   **Status:** Open PRs for model updates and efficiency fixes.
    *   [PR #1607](https://github.com/anthropics/skills/pull/1607), [Issue #1487](https://github.com/anthropics/skills/issues/1487)

*   **mcp-builder (MCP Integration)**
    *   **Functionality:** Skill for building and testing Model Context Protocol (MCP) servers.
    *   **Highlights:** Discussions revolve around evaluation harness failures (scoring 0/N against real servers due to non-serializable TextContent) and compatibility breaks with newer `mcp` library versions (v2.0.0+) requiring updated import paths and client configurations.
    *   **Status:** Open PRs for library compatibility and evaluation fixes.
    *   [PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390)

*   **frontend-design & web-artifacts-builder (Web UI Generation)**
    *   **Functionality:** Generating front-end designs and self-contained web artifacts.
    *   **Highlights:** Community is pushing for improved clarity and actionability in the design instructions to ensure single-conversation usability. Web-artifact bundling scripts are actively being debugged to work with modern toolchains (pnpm ≥10.1).
    *   **Status:** Open PRs for refinement and toolchain compatibility.
    *   [PR #210](https://github.com/anthropics/skills/pull/210), [Issue #1362](https://github.com/anthropics/skills/issues/1362)

### 2. Community Demand Trends

From the active issue tracker, the community's demand is heavily concentrated on the following directions:

*   **Security & Trust Boundaries:** A highly debated trend regarding community skills distributed under the `anthropic/` namespace, which enables trust boundary abuse and impersonation. Users are demanding stricter validation to distinguish official Anthropic skills from community-made ones. ([Issue #492](https://github.com/anthropics/skills/issues/492))
*   **Enterprise Workflow & Collaboration:** Strong demand for org-wide skill sharing directly within Claude.ai without relying on manual file downloads or Slack/Teams sharing. Additionally, there is a push for "agent-governance" skills that teach policy enforcement, threat detection, and audit trails for AI agent systems. ([Issue #228](https://github.com/anthropics/skills/issues/228), [Issue #412](https://github.com/anthropics/skills/issues/412))
*   **Testing & Quality Assurance:** Growing interest in AI-powered E2E testing (AWT) and comprehensive testing patterns that cover the full stack, including React component testing and the Testing Trophy model. ([PR #822](https://github.com/anthropics/skills/pull/822), [PR #723](https://github.com/anthropics/skills/pull/723))
*   **Context Management & Memory:** Proposals for skills that optimize agent state, such as `compact-memory` using symbolic notation for persistent memory, to prevent long-running agents from bloating context with prose notes. ([Issue #1329](https://github.com/anthropics/skills/issues/1329))

### 3. High-Potential Pending Skills

These PRs represent active community contributions that have not yet been merged and may soon shape the ecosystem:

*   **proofcore-contract-auditor:** A Web3 skill for automated static analysis of Solidity/Rust smart contracts, anchoring cryptographic audit proofs onto the TON Blockchain via a zero-storage Merkle protocol. ([PR #1771](https://github.com/anthropics/skills/pull/1771))
*   **md2video-audio:** A zero-cost skill that compiles Markdown documents directly into MP4 videos with presentation slides and realistic voiceovers. ([PR #1703](https://github.com/anthropics/skills/pull/1703))
*   **scnet-hpc:** A skill specifically designed for operating SCNet HPC clusters, managing profile-based SSH, Slurm workflows, and cluster discovery. ([PR #1615](https://github.com/anthropics/skills/pull/1615))
*   **blast-radius:** A specialized checklist skill for safely executing bulk or destructive database/archival operations, classifying impact before the write. ([PR #1776](https://github.com/anthropics/skills/pull/1776))

### 4. Skills Ecosystem Insight

The community's most concentrated demand at the Skills level is the need to establish strict security trust boundaries to prevent community skill impersonation, coupled with significant tooling improvements to make skill evaluation and cross-platform execution reliable and context-efficient.

---

1. **Today's Highlights**
Claude Code released v2.1.284, introducing "Claude Sonnet 5.5" as the default Sonnet model with 1M context and optimized cache read costs. The community is heavily engaged in the "Mods" extensibility initiative (#91870), with maintainers confirming a shipping timeline of weeks. Significant user friction is reported regarding new regressions in v2.1.284, including freeze loops on Linux with eCryptfs and persistent worktree trust prompts.

2. **Releases**
- **v2.1.284**: Added `claude-sonnet-5-5` as the default Sonnet model (1M context, $2/$10 per Mtok, $0.20/Mtok cache reads). Added a specific "Yes, but ask again next time" option to auto-mode prompts for read operations outside working directories. [Release Notes](https://github.com/anthropics/claude-code/releases)

3. **Hot Issues**
- **[#91870] Mods - make Claude 10x more extensible**: 223 comments, 128 reactions. The community is demanding a function hooks system. Maintainers recently committed to shipping this in "weeks," marking a major shift in the plugin architecture roadmap. [Issue](https://github.com/anthropics/claude-code/issues/91870)
- **[#20697] Sync Skills between Desktop and CLI**: 48 comments, 157 reactions. High demand for parity between the Desktop app's isolated skill bundles and CLI user-level skills (`~/.claude/skills`). [Issue](https://github.com/anthropics/claude-code/issues/20697)
- **[#98023] v2.1.284 freezes on Linux with eCryptfs**: New regression in the latest release where the TUI freezes on the first Enter key due to recursive file system walking. [Issue](https://github.com/anthropics/claude-code/issues/98023)
- **[#97991] Worktree trust prompts persist in 2.1.284**: Despite documented fixes, new worktrees of trusted repos still trigger "Workspace not trusted" prompts, causing workflow interruptions. [Issue](https://github.com/anthropics/claude-code/issues/97991)
- **[#91683] `bypassPermissions` regression in 2.1.259**: `cd` and `grep` commands now prompt when specific Read() deny rules are configured, breaking established automated workflows. [Issue](https://github.com/anthropics/claude-code/issues/91683)
- **[#94478] Desktop app spawns ~17 git processes/sec (Windows)**: Severe performance leak where the Desktop app continuously spawns `git.exe`, amplifying a kernel pool leak to ~6GB/day RAM consumption. [Issue](https://github.com/anthropics/claude-code/issues/94478)
- **[#96402] SIGILL crash on x86-64 without AVX**: Native installer (2.1.280+) crashes on bare-metal Linux systems lacking AVX instruction support, forcing users to downgrade to older JS bundles. [Issue](https://github.com/anthropics/claude-code/issues/96402)
- **[#95340] Skill re-invocation dedupe bug**: Changing arguments in composed skills causes the entire `SKILL.md` body to be re-appended, increasing token costs by N times. [Issue](https://github.com/anthropics/claude-code/issues/95340)
- **[#31724] Voice mode lacks language setting**: `/voice` defaults to English speech-to-text, making it unreliable for non-English languages like Ukrainian. [Issue](https://github.com/anthropics/claude-code/issues/31724)
- **[#82746] Stdio MCP servers do not auto-reconnect**: Unlike HTTP/SSE, dead stdio MCP servers wedge permanently until Claude Code is restarted, requiring a `claude mcp reconnect` feature. [Issue](https://github.com/anthropics/claude-code/issues/82746)

4. **Key PR Progress**
- **[#98018] Revert agents-md truncated reads & diff forced colors**: Maintainers reverted two recent changes to restore earlier behavior for mod stability. [PR](https://github.com/anthropics/claude-code/pull/98018)
- **[#94847] Diff pane opening logic**: Improves when the diff pane auto-opens, preventing empty panes for writes outside the repository or ignored files. [PR](https://github.com/anthropics/claude-code/pull/94847)
- **[#96364] Nested AGENTS.md pagination fix**: Ensures auto-paginated Reads of nested `AGENTS.md` files are correctly counted as delivered, preventing duplicate attachments. [PR](https://github.com/anthropics/claude-code/pull/96364)
- **[#96363] Diff color forcing fix**: Passes `--no-color` to git diff commands to prevent ANSI escapes from emptying the diff body when users have forced color configurations. [PR](https://github.com/anthropics/claude-code/pull/96363)
- **[#97952] CI security hardening**: Enhances GitHub Actions workflows that call Claude, implementing egress-firewall runners for security. [PR](https://github.com/anthropics/claude-code/pull/97952)
- **[#96363] (Closed/Merged Context)**: Related to the diff color issue above, ensuring robustness against user-specific git configurations. [PR](https://github.com/anthropics/claude-code/pull/96363)
- **[#94847] (Open)**: Ongoing development for better UX around file edits and worktrees. [PR](https://github.com/anthropics/claude-code/pull/94847)
- **[#98018] (Closed/Merged Context)**: Signals a cautious approach to "Mods" stability, prioritizing rollback over feature shipping for buggy components. [PR](https://github.com/anthropics/claude-code/pull/98018)
- **[#97952] (Open)**: Focus on supply chain and workflow security for automated Claude interactions. [PR](https://github.com/anthropics/claude-code/pull/97952)
- **[#31204] (Closed)**: Unrelated feature request (AI Learning Roadmap) closed, indicating cleanup of non-core PRs. [PR](https://github.com/anthropics/claude-code/pull/31204)

5. **Feature Request Trends**
- **Extensibility (Mods/Hooks)**: The dominant trend is the demand for first-class function hooks and a modular plugin system to allow deep customization without forking core.
- **Cross-Platform Parity**: Strong requests for syncing skills and settings between Desktop and CLI environments, and better Windows support (data directory relocation).
- **Multimodal/Voice**: Growing interest in voice mode localization and UI improvements for transcript viewing (Focus View).
- **MCP Resilience**: Requests for auto-reconnection and better error handling for Model Context Protocol servers.

6. **Developer Pain Points**
- **Regression Sensitivity**: Users are frustrated by frequent breaking changes in patch releases (e.g., v2.1.259 permissions regression, v2.1.284 freeze/trust prompts).
- **Performance Leaks**: High resource consumption in the Desktop app (Windows) and compatibility issues with older hardware (AVX-less CPUs).
- **Skill Management**: Complexity in managing skills across different sessions (CLI vs. Desktop) and the token overhead of skill composition.
- **TUI Stability**: Renderer issues where output is dropped or overwritten during verbose operations, particularly on macOS.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-29

## 1. Today's Highlights
Stable release **v0.158.0** introduced enhanced TUI interactions, including copy-on-select and right-click paste with preserved Markdown formatting, alongside improved MCP OAuth integration. The community is currently experiencing significant friction with **Windows sandbox permissions** and **Android remote pairing loops**, which are the primary drivers for today’s high-traffic bug reports. Development velocity remains high, with a focus on **internal reliability** (SQLite optimization, connection pooling) and **UX refinement** (subagent environment preservation, voice catalog error handling) via 20+ merged PRs.

## 2. Releases
*   **[rust-v0.158.0](https://github.com/openai/codex/releases/tag/rust-v0.158.0)**
    *   **TUI Enhancements**: Configured copy-on-select and right-click paste specifically for the fullscreen TUI; copied transcript selections now retain Markdown formatting ([#47639](https://github.com/openai/codex/issues/47639), [#47896](https://github.com/openai/codex/issues/47896), [#48118](https://github.com/openai/codex/issues/48118)).
    *   **MCP/OAuth**: Enabled connections to MCP servers requiring pre-registered OAuth client secrets via `codex mcp add --oauth-client`.
*   **[rust-v0.160.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.160.0-alpha.2)**: Pre-release build for testing upcoming features.

## 3. Hot Issues
1.  **[#42739](https://github.com/openai/codex/issues/42739) Local projects disappear from sidebar after Windows desktop update**: A critical UX regression where the Projects section shows "No projects" despite folders existing on disk. (34 comments).
2.  **[#48125](https://github.com/openai/codex/issues/48125) I CANT FUCKING COPY TEXT**: A highly emotional report regarding copy/paste failures in TUI/CLI over SSH, highlighting frustration with basic usability. (14 comments, 17 👍).
3.  **[#46114](https://github.com/openai/codex/issues/46114) Windows Desktop: elevated sandbox fails with "requires effective :root read access"**: Users are unable to run sessions due to sandbox permission errors that persist even after admin relaunch or app repair. (14 comments).
4.  **[#36268](https://github.com/openai/codex/issues/36268) Android "Authorize this phone" loops forever**: A persistent pairing bug where web auth completes but the app never consumes the approval, blocking remote control. (12 comments).
5.  **[#35855](https://github.com/openai/codex/issues/35855) Android Remote Control pairing fails with Windows Codex**: Multiple reports of pairing failures between specific Windows and Android app versions. (9 comments).
6.  **[#48127](https://github.com/openai/codex/issues/48127) Codex CLI 0.157.0 regression: middle-click and right-click Paste no longer works**: Specific regression in Linux/Wayland environments affecting paste functionality. (8 comments, 4 👍).
7.  **[#9286](https://github.com/openai/codex/issues/9286) Git push --dry-run fails with Bad owner or permissions on /etc/ssh/ssh_config**: Long-standing issue where the sandboxed environment misreads SSH config permissions. (8 comments, 5 👍).
8.  **[#42660](https://github.com/openai/codex/issues/42660) Weekly Codex quota reset/reconciliation appears broken**: Users report hitting quota limits without corresponding local activity, affecting paid Pro subscribers. (7 comments).
9.  **[#46012](https://github.com/openai/codex/issues/46012) Windows: validation commands rejected with ‘blocked by policy’**: Validation commands are failing without clear diagnostics, hindering Windows users. (7 comments).
10. **[#11489](https://github.com/openai/codex/issues/11489) MCP client does not auto-reconnect after disconnect**: A major feature gap where MCP tools remain unavailable until manual reload, unlike model SSE streams which have retry logic. (6 comments, 8 👍).

## 4. Key PR Progress
*   **[PR #49106](https://github.com/openai/codex/pull/49106) Add history pagination to the agent command center**: Implements a "Show more" feature to browse beyond the initial 10 sessions, improving navigation in the task list.
*   **[PR #49105](https://github.com/openai/codex/pull/49105) Resume unsent TUI input after reconnecting**: Ensures queued messages that were not sent prior to a disconnection are tracked and resumed automatically after reconnecting.
*   **[PR #49098](https://github.com/openai/codex/pull/49098) Resolve Windows sandbox PowerShell fallbacks**: Fixes an issue where remote controllers could not resolve sandbox-compatible PowerShell executables on the execution host.
*   **[PR #49075](https://github.com/openai/codex/pull/49075) Preserve pending environments when spawning subagents**: Prevents subagents from losing their starting environment configuration if spawned before the environment is fully ready.
*   **[PR #49073](https://github.com/openai/codex/pull/49073) Surface realtime voice catalog failures in the TUI**: Stops silent fallbacks to built-in catalogs when server voice catalog requests fail, ensuring users are aware of connectivity issues.
*   **[PR #49102](https://github.com/openai/codex/pull/49102) Preserve SQLite vacuum modes and surface pool initialization errors**: Improves database stability by preventing blocking writer locks during vacuum mode changes and masking initialization errors.
*   **[PR #49099](https://github.com/openai/codex/pull/49099) Cache parsed plugin manifests across plugin workflows**: Optimizes performance by sharing a manifest cache to avoid reparsing unchanged manifests and repeating warnings.
*   **[PR #49084](https://github.com/openai/codex/pull/49084) Track app-server running turns incrementally**: Optimizes state mutation by maintaining an incremental count of running turns instead of scanning all tracked runtimes.
*   **[PR #49079](https://github.com/openai/codex/pull/49079) Update and centralize TUI subscription labels**: Standardizes subscription naming (e.g., `Pro 100`, `Pro 200`) across status and analytics views.
*   **[PR #49069](https://github.com/openai/codex/pull/49069) Reclaim unused SQLite log database pages in the background**: Implements a background incremental-vacuum worker to prevent database file bloat from log deletion.

## 5. Feature Request Trends
*   **MCP Resilience**: Strong demand for **auto-reconnect** and retry logic for MCP servers, mirroring the existing backoff logic used for model SSE streams ([#11489](https://github.com/openai/codex/issues/11489)).
*   **CLI UX Control**: Users are requesting options to **disable "welcome messages"** and startup noise, viewing them as unnecessary distraction ([#48991](https://github.com/openai/codex/issues/48991)).
*   **Cross-Device Pairing**: Significant effort is required to fix **Android-to-Desktop/CLI pairing**, which is currently plagued by infinite auth loops and session state mismatches ([#36268](https://github.com/openai/codex/issues/36268), [#48777](https://github.com/openai/codex/issues/48777)).
*   **TUI Interaction**: Continued refinement of **copy/paste** behaviors in TUI, specifically ensuring that pasted text preserves formatting and works across various terminals (SSH, Wayland) ([#48125](https://github.com/openai/codex/issues/48125)).

## 6. Developer Pain Points
*   **Windows Sandbox Instability**: A dominant pain point involves **Windows elevated sandbox** failures, where users face "requires effective :root read access" errors or "blocked by policy" rejections for standard commands. This affects both CLI and Desktop app users ([#46114](https://github.com/openai/codex/issues/46114), [#46012](https://github.com/openai/codex/issues/46012)).
*   **Remote Control Friction**: **Android remote control** is largely unusable for many users due to persistent pairing failures where the app fails to consume browser authorization tokens ([#48774](https://github.com/openai/codex/issues/48774)).
*   **TUI/CLI Regression in Linux**: Developers on Linux/Wayland are facing regressions in basic clipboard operations (paste) since v0.157.0, impacting workflow efficiency ([#48127](https://github.com/openai/codex/issues/48127)).
*   **Performance & Resource Leaks**: Reports of **high CPU usage** from background workers (git diffs, unignored data) and **disk exhaustion** caused by temporary Git objects not being cleaned up after SIGKILLs on macOS ([#30477](https://github.com/openai/codex/issues/30477), [#43158](https://github.com/openai/codex/issues/43158)).

</details>