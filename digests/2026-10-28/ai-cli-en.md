# AI CLI Tools Community Digest 2026-10-28

> Generated: 2026-10-28 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## 1. Ecosystem Overview
The AI CLI development tool landscape in late 2026 is defined by a critical shift toward complex, multi-agent orchestration and cross-platform enterprise integration. Both major ecosystems are grappling with the side effects of this scaling: infrastructure-level instability in cloud/sandboxed environments and the need for granular observability in autonomous workflows. While Claude Code is undergoing a significant restructuring of its GitHub integration and session management, OpenAI Codex is aggressively expanding its infrastructure capabilities with standalone execution servers and multi-cloud support. The community focus has moved beyond basic code generation to the reliability of long-running agents, privacy controls, and seamless IDE integration.

## 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Releases** | v2.1.312 (Security/UI focus) | rust-v0.165.0 (Feature/GCP), rust-v0.166.0-alpha.3 |
| **Key Issues** | 10 (Dominate: GitHub auth, PII, UI) | 10 (Dominate: Windows Sandbox, VS Code, Performance) |
| **Key PRs** | 3 (Docs, Plugin fix, Marketplace) | 10 (Infra: Exec-server, APIs, Memory, Tools) |
| **Release Status** | Stable patch release | Feature release + Alpha pipeline |

*Note: Data reflects the specific items provided in the 2026-10-28 digest. Codex demonstrates a much higher volume of concurrent pull request activity focused on core architecture.*

## 3. Shared Feature Directions
Requirements appearing across multiple tool communities indicate converging needs for professional-grade agent management:

*   **Stateful Session Management & Recovery:**
    *   **Claude Code:** High demand for "unarchiving" sessions and restoring state after silent failures (#67835).
    *   **Codex:** Struggles with thread resumption failures (missing env vars) and state synchronization issues between mobile/desktop (#56264, #39678).
    *   *Need:* Reliable state persistence and recovery mechanisms for long-running agents.
*   **Transparency & Observability:**
    *   **Claude Code:** Concerns over PII injection into prompts without disclosure (#81138).
    *   **Codex:** 209 upvotes for a customizable status line showing token usage/model state (#17827).
    *   *Need:* Developers require precise visibility into what data is sent to models and how resources are being consumed.
*   **Contextual Extensibility (MCP/Tools):**
    *   **Claude Code:** Plugin marketplace integration and fixes to tool formatting (#105303, #15620).
    *   **Codex:** Dynamic tool replacement and background MCP process management (#57553, #40579).
    *   *Need:* Robust handling of dynamic tool catalogs and external MCP servers without performance degradation.

## 4. Differentiation Analysis
*   **Technical Approach & Focus:**
    *   **Claude Code:** Currently focused on *identity, security, and UI polish*. The recent release prioritized OIDC claims and UI responsiveness. However, its core infrastructure (GitHub integration) is in flux, causing significant workflow breakage.
    *   **Codex:** Focused on *deep infrastructure and modularity*. Recent PRs show a move toward standalone executors (`codex-exec-server`), granular API control for child threads, and multi-cloud provider support (GCP Vertex).
*   **Target User Friction:**
    *   **Claude Code Users:** Facing friction from "invisible" failures (silent repo access breaks) and intrusive UI changes (next-step boxes).
    *   **Codex Users:** Facing friction from "hard" environment failures (Windows/BitLocker/Sandbox crashes) and resource leaks.
*   **Ecosystem Maturity:**
    *   Claude Code is scaling its user base with enterprise identity features but is hitting infrastructure ceilings regarding GitHub access.
    *   Codex is rapidly maturing its internal architecture to support complex multi-agent and headless scenarios.

## 5. Community Momentum & Maturity
*   **Active Community:** OpenAI Codex appears to have a higher volume of active development momentum, evidenced by 10 significant architectural PRs moving simultaneously compared to Claude Code's 3. The Codex community is highly technical, with detailed reproductions of environment-specific crashes.
*   **Maturity:** Claude Code exhibits "feature creep" maturity (OIDC, Desktop UI) but is experiencing maturity regressions in its core value proposition (secure GitHub push). Codex is in the "infrastructure scaling" phase, rapidly stabilizing its Rust engine and expanding to GCP, though it remains less mature regarding Windows-specific stability.

## 6. Trend Signals
*   **The "Silent Failure" Crisis:** The most dangerous trend for both tools is the emergence of non-obvious failure modes (e.g., Claude Code's "green" status with broken access; Codex's "locked BitLocker" crash). Developers are losing trust in the tools' reliability for automated CI/CD pipelines.
*   **Infrastructural Decoupling:** OpenAI Codex's move to ship `codex-exec-server` separately suggests the industry is moving toward decoupling the "brain" (UI/API) from the "hands" (Execution/Sandboxing). This allows for distributed agent execution.
*   **Privacy & Data Minimization:** The backlash against PII injection in Claude Code signals a hard boundary for enterprise adoption. Tools that cannot guarantee "no data leakage" into model contexts will face significant resistance in regulated industries.
*   **Developer Recommendation:**
    *   For **enterprise identity**: Monitor Claude Code's `oidc.user_id_claim` implementation.
    *   For **headless/automated execution**: Codex's `codex-exec-server` is the clear signal to watch.
    *   **Risk Management:** Both tools currently have critical blockers (GitHub auth for Claude, Windows Sandbox for Codex). Production environments should implement robust fallbacks and state-checking scripts to mitigate these specific issues.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

### Claude Code Skills Community Highlights Report

**Top Skills Ranking**
Based on the provided data, "comments" for the top 20 PRs are marked as `undefined` (0) and 👍 counts are 0. Ranking by activity (recency and issue volume) and addressing "most discussed" by associating skills with high-volume Issues:

*   **Skill-Creator:** The "core" tooling for the ecosystem. PRs #1298 and #1997 aim to fix trigger evaluation, Windows compatibility, and YAML frontmatter parsing. Related Issue #556 (13 comments) highlights that `claude -p` currently has a 0% trigger rate for skills. [PR #1298](https://github.com/anthropics/skills/pull/1298) | [PR #1997](https://github.com/anthropics/skills/pull/1997)
*   **MCP-Builder:** Critical infrastructure for Model Context Protocol. PR #1742 is open, aiming to fix compatibility with `mcp>=2.0.0` by renaming imports to `streamable_http_client` and supporting custom HTTP headers. [PR #1742](https://github.com/anthropics/skills/pull/1742)
*   **Webapp-Testing:** PRs #1976 and #1980 focus on robustness. The goal is to correctly report `textarea` and `select` element types and to eliminate security risks (`CWE-78`) by avoiding `shell=True` in the `with_server.py` script. [PR #1976](https://github.com/anthropics/skills/pull/1976) | [PR #1980](https://github.com/anthropics/skills/pull/1980)
*   **Document-Skills (DOCX/PDF):** Maintenance and bug fixes are prioritized. PR #1792 ensures `accept_changes.py` reports LibreOffice timeouts as errors. PR #1975 enforces `argparse` limits for `pptx` thumbnail generation. [PR #1792](https://github.com/anthropics/skills/pull/1792) | [PR #1975](https://github.com/anthropics/skills/pull/1975)
*   **Frontend-Design:** PR #210 aims to improve the skill's "clarity and actionability" to ensure Claude can follow the instructions within a single conversation. [PR #210](https://github.com/anthropics/skills/pull/210)
*   **Algorithmic-Art:** PR #1977 implements a logic fix for the `wrapAround()` function to correctly handle negative values via modulo arithmetic. [PR #1977](https://github.com/anthropics/skills/pull/1977)

**Community Demand Trends**
*   **Security & Trust Boundary:** Issue #492 (46 comments) is the most active, demanding action against community skills impersonating the official `anthropic/` namespace. [Issue #492](https://github.com/anthropics/skills/issues/492)
*   **Enterprise Collaboration:** Users are requesting org-wide skill sharing directly in Claude.ai to replace manual file uploads (Issue #228, 17 comments). [Issue #228](https://github.com/anthropics/skills/issues/228)
*   **Tooling Reliability:** High frustration regarding the skill-creator's inability to trigger skills via CLI, a major gap for automation (Issue #556, 13 comments). [Issue #556](https://github.com/anthropics/skills/issues/556)
*   **Specialized Logic:** Emerging interest in AI "governance" for agent systems (Issue #412) and reasoning quality gates (Issue #1385).

**High-Potential Pending Skills**
*   **Notion-Spec-to-Implementation (PR #1245):** Bridges product specs and Notion tasks, allowing for automated implementation planning and progress tracking. [PR #1245](https://github.com/anthropics/skills/pull/1245)
*   **MD2Video-Audio (PR #1703):** A "zero-cost" skill that compiles Markdown into MP4 videos with realistic voiceovers, expanding the "creative" skillset. [PR #1703](https://github.com/anthropics/skills/pull/1703)
*   **Proofcore-Contract-Auditor (PR #1771):** Specialized for Web3, it performs static analysis of Solidity/Rust and anchors proofs to the TON blockchain. [PR #1771](https://github.com/anthropics/skills/pull/1771)
*   **Pyxel (PR #525):** Facilitates the creation and debugging of retro Python games with headless input-driven testing. [PR #525](https://github.com/anthropics/skills/pull/525)

**Skills Ecosystem Insight**
The community's most concentrated demand is the transition from "creative" and "document" skills toward secure, enterprise-ready tooling that supports reliable automation and cross-functional trust boundaries.

---

## Today's Highlights

The Claude Code community is currently dominated by a critical infrastructure issue: widespread reports that Cloud/Cowork sessions and scheduled routines are blocking GitHub pushes due to a restrictive "authorized repository set" policy, breaking existing workflows even with valid credentials. Meanwhile, version v2.1.312 introduced security enhancements for enterprise identity verification and improved UI responsiveness in fullscreen mode, addressing specific developer friction points.

## Releases

**v2.1.312**
- **Security/Identity:** Added `oidc.user_id_claim` to the Claude apps gateway, enabling organizations to identify users via specific `id_token` claims (e.g., Microsoft Entra ID's `oid`) rather than just the default `sub` claim.
- **UI/UX:** Added "click to send" functionality in fullscreen mode; clicking the "to send now" hint under a queued message now sends the message immediately, matching keyboard shortcut behavior.
- **Link:** [GitHub Release v2.1.312](https://github.com/anthropics/claude-code/releases/tag/v2.1.312)

## Hot Issues

The following ten issues represent the highest community engagement and critical path blockers, particularly regarding GitHub integration and privacy.

1. **[BUG] Cloud/Cowork sessions: git proxy blocks all pushes** ([#76248](https://github.com/anthropics/claude-code/issues/76248))
   - **Why it matters:** This is the top-priority bug (41 comments, 16 👍). Since July 2026, Cloud/Cowork sessions can no longer push to GitHub repos not in the session's "authorized repository set," even when using user-supplied Personal Access Tokens (PATs).
   - **Community Reaction:** High frustration regarding broken workflows for automated routines and remote agents. Users report that the previous PAT pass-through mechanism no longer works.

2. **[FEATURE] Desktop app: End-of-turn "next-step" box obstructs discussion** ([#102273](https://github.com/anthropics/claude-code/issues/102273))
   - **Why it matters:** 51 users have upvoted this UI regression. The new "next-step" box with answer buttons in the Code tab interrupts real conversational flow.
   - **Community Reaction:** Developers argue the UI design prioritizes guided steps over free-form coding discussions, hindering rapid iteration.

3. **[BUG] Account email (PII) injected into system prompt without consent** ([#81138](https://github.com/anthropics/claude-code/issues/81138))
   - **Why it matters:** 65 users upvoted this privacy concern. The user's account email is included in the model's system prompt without disclosure or opt-out.
   - **Community Reaction:** Significant backlash regarding data privacy and transparency. Users demand a mechanism to exclude PII from context injection.

4. **[BUG] Cowork cloud sessions cannot access any GitHub repository** ([#84581](https://github.com/anthropics/claude-code/issues/84581))
   - **Why it matters:** 13 comments detail that the git proxy instructs the agent to call a nonexistent `add_repo` tool.
   - **Community Reaction:** Confusion and annoyance that the error message guides users to a non-existent solution, exacerbating the "authorized repository set" issue.

5. **[BUG] Session archive is one-way: no unarchive tool** ([#67835](https://github.com/anthropics/claude-code/issues/67835))
   - **Why it matters:** 15 upvotes for a missing inverse operation. Archiving a session orphans it with no way to restore it via UI or MCP.
   - **Community Reaction:** Users report losing access to archived history, highlighting a gap in session management lifecycle tools.

6. **[BUG] PreToolUse hook "ask" overridden in bypassPermissions for .git/ writes** ([#103994](https://github.com/anthropics/claude-code/issues/103994))
   - **Why it matters:** A security regression where `permissionDecision: "ask"` is bypassed if the tool call writes to `.git/` or `.claude/` in `bypassPermissions` mode.
   - **Community Reaction:** Security-focused users are flagging this as a dangerous edge case that defeats audit hooks for repository metadata changes.

7. **[BUG] GitHub integration: Cowork sessions on one account don't get list_repos** ([#97926](https://github.com/anthropics/claude-code/issues/97926))
   - **Why it matters:** Inconsistent tool availability across accounts. The same GitHub App configuration works on one account but fails on another.
   - **Community Reaction:** Users point to inconsistent rollout or backend state issues affecting multi-account setups.

8. **[BUG] Account email PII injection follow-up: No disclosure** ([#81138](https://github.com/anthropics/claude-code/issues/81138))
   - *Note: Duplicated above, but distinct from new issue #104120 below.*

9. **[BUG] Claude Code session's GitHub repo access silently broke mid-session** ([#104120](https://github.com/anthropics/claude-code/issues/104120))
   - **Why it matters:** Users report that account-level access checks pass, but session-level access fails silently without clear error messaging.
   - **Community Reaction:** Developers are forced to restart sessions or manually reconnect connectors, causing downtime in automated pipelines.

10. **[BUG] Turn-complete notifications fire intermittently on macOS** ([#97368](https://github.com/anthropics/claude-code/issues/97368))
    - **Why it matters:** Affects user workflow on macOS 27.0. Notifications are unreliable.
    - **Community Reaction:** Users working in background contexts or multi-tasking are impacted by the lack of reliable completion signals.

## Key PR Progress

*Note: The source data provided only contains 3 Pull Requests. Below are the 3 available PRs, as there are no additional 7 to list from the provided dataset.*

1. **fix(plugin-dev): Correct tools format in agent/command examples** ([#15620](https://github.com/anthropics/claude-code/pull/15620))
   - **Description:** Fixes YAML parsing issues where JSON arrays in `tools:` and `allowed-tools:` were treated as literal strings. Converts `["Read", "Write"]` to `Read, Write` (YAML comma-separated) across 11 files in the plugin-dev plugin.
   - **Status:** Open.

2. **Install marketplace plugins from claude-plugins-official** ([#105303](https://github.com/anthropics/claude-code/pull/105303))
   - **Description:** Integrates the `claude-code-plugins` marketplace to install plugins from `claude-plugins-official`. Includes merge order dependencies for `code-review` port and plugin versions.
   - **Status:** Closed (Merged/Updated recently).

3. **docs: Fix stale documentation URLs across repository** ([#32753](https://github.com/anthropics/claude-code/pull/32753))
   - **Description:** Replaces all `docs.anthropic.com` and `docs.claude.com` URLs with the current `code.claude.com` domain across 12 files (26 line changes). Historical references in CHANGELOG remain unchanged.
   - **Status:** Open.

## Feature Request Trends

Based on the issue data, the most requested feature directions are:

1. **Session Management Controls:** Users demand inverse operations for session states (unarchiving), better background process visibility for local sessions, and reliable state synchronization between Desktop and Cloud. ([#67835](https://github.com/anthropics/claude-code/issues/67835), [#104467](https://github.com/anthropics/claude-code/issues/104467))
2. **UI/UX Flexibility:** Requests to reduce intrusive UI elements (like the next-step box) and add background-tab options for Chrome-based integrations to prevent focus stealing. ([#102273](https://github.com/anthropics/claude-code/issues/102273), [#89148](https://github.com/anthropics/claude-code/issues/89148))
3. **Enhanced Memory/Context Injection:** Support for triggered injection of auto-memory topic files with rules-style frontmatter to customize context without hardcoding. ([#78795](https://github.com/anthropics/claude-code/issues/78795))

## Developer Pain Points

Recurring frustrations and high-frequency requests include:

1. **GitHub Integration Instability in Cloud/Routines:** The dominant pain point. Multiple issues (#76248, #84581, #100164, #105504, #98524, #104741) report that Cloud/Cowork sessions cannot access repositories due to opaque "authorized repository set" logic, missing `add_repo` tools, and broken PAT pass-throughs. This is breaking scheduled automated tasks.
2. **Privacy/Security Transparency:** Significant concern over PII (account email) being injected into system prompts without consent or disclosure (#81138). Additionally, security regressions in hook overrides (#103994) undermine trust in local security controls.
3. **Desktop App Usability Friction:** UI elements obstructing workflow (#102273), intermittent notifications on macOS (#97368), and lack of control over background processes or focus management in Chrome integrations (#89148).
4. **Opaque Error Messaging:** Users frequently report that status checks show "green"/connected, but sessions fail with cryptic errors about repository authorization or missing tools, making debugging nearly impossible (#104120, #98956, #99466).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest – 2026-10-28

## 1. Today's Highlights
The Codex Rust engine released version 0.165.0, introducing a native Google Cloud Vertex AI provider and adding GPT-6.1 Terra to model catalogs. Significant development activity continued in the alpha channel with the release of 0.166.0-alpha.3, while the community focused heavily on stabilizing Windows sandboxing (MXC) and resolving VS Code extension loading failures.

## 2. Releases
*   **rust-v0.165.0** ([Link](https://github.com/openai/codex/releases/tag/rust-v0.165.0)):
    *   Added built-in Google Cloud Vertex AI provider support (configurable via `model_provider = "gcp"`).
    *   Added GPT-6.1 Terra to model catalogs.
    *   Enhanced the session picker with a repository filter and improved agent command center navigation with directory grouping.
*   **rust-v0.166.0-alpha.3** ([Link](https://github.com/openai/codex/releases/tag/rust-v0.166.0-alpha.3)):
    *   Pre-release for the next minor version; no specific feature notes listed beyond version bump.

## 3. Hot Issues
*   **#37458: VS Code Extension Fails to Start on Windows** ([Link](https://github.com/openai/codex/issues/37458))
    *   **Why it matters:** High-impact usability bug where the Codex extension fails to load resources in Windows x64 environments.
    *   **Reaction:** Closed but highly active (58 comments), indicating widespread user impact on the primary IDE integration.
*   **#17827: Customizable Status Line** ([Link](https://github.com/openai/codex/issues/17827))
    *   **Why it matters:** Long-standing request for a CLI TUI status line displaying token usage, model names, and git branches, similar to competitors.
    *   **Reaction:** Most upvoted open issue (209 👍), reflecting strong community demand for real-time visibility into session state.
*   **#50915: MXC Fails with Locked BitLocker Volumes** ([Link](https://github.com/openai/codex/issues/50915))
    *   **Why it matters:** Windows sandboxing regression where an unrelated locked BitLocker volume prevents the MXC launcher from executing commands.
    *   **Reaction:** Active discussion (24 comments) highlighting specific edge-case incompatibilities with enterprise Windows configurations.
*   **#39678: Remote Android-to-macOS Trust Error** ([Link](https://github.com/openai/codex/issues/39678))
    *   **Why it matters:** Users attempting remote tasks from mobile to desktop face "project trust" errors before task initiation.
    *   **Reaction:** 21 comments detailing reproduction steps across various desktop builds, pointing to cross-platform state synchronization issues.
*   **#56264: Windows Thread Resume Failure (Missing SYSTEMROOT)** ([Link](https://github.com/openai/codex/issues/56264))
    *   **Why it matters:** Post-update regression on Windows Desktop where resuming local chats fails because the MXC launcher lacks the `SYSTEMROOT` environment variable.
    *   **Reaction:** 19 comments confirming the issue persists after recent desktop app updates, affecting session continuity.
*   **#40579: MCP Process-Batch Accumulation on Windows** ([Link](https://github.com/openai/codex/issues/40579))
    *   **Why it matters:** Performance degradation caused by incomplete cleanup of MCP server processes when multiple servers are configured.
    *   **Reaction:** 13 comments report reproducible memory/CPU leaks, impacting users relying on complex MCP setups.
*   **#57422: code-server Freeze** ([Link](https://github.com/openai/codex/issues/57422))
    *   **Why it matters:** New stable VS Code extension build (26.1021.22027) causes total editor freeze in code-server environments, not just the Codex view.
    *   **Reaction:** Newly reported (created 2026-10-27), indicating a critical regression in the latest stable release for cloud IDEs.
*   **#35549: Chrome Browser Use Blocks WeChat Channels** ([Link](https://github.com/openai/codex/issues/35549))
    *   **Why it matters:** Security/allowlist logic incorrectly blocks explicitly allowed domains, hindering browser-use workflows.
    *   **Reaction:** 14 comments with specific reproduction steps on macOS, highlighting limitations in the browser-use plugin's domain handling.
*   **#54956: Improve Usage Efficiency Across Models** ([Link](https://github.com/openai/codex/issues/54956))
    *   **Why it matters:** Request to make Codex usage more sustainable and affordable for experimentation across different model tiers.
    *   **Reaction:** Reflects growing sentiment about cost management and efficiency in agentic workflows.
*   **#56933: Desktop Pets Crashing on Intel macOS** ([Link](https://github.com/openai/codex/issues/56933))
    *   **Why it matters:** Repeated `setAcceptsMouseMovedEvents` errors when interacting with the "Mini and Pets" feature on Intel-based Macs.
    *   **Reaction:** Specific hardware regression affecting older macOS installations, limiting accessibility of the desktop companion feature.

## 4. Key PR Progress
*   **PR #57590: Ship `codex-exec-server` in CLI and App-Server Packages** ([Link](https://github.com/openai/codex/pull/57590))
    *   Bundles the standalone executor into release packages and advertises its path via `codex-package.json`, streamlining deployment of the executor component.
*   **PR #57589: Add Standalone `codex-exec-server` Executable** ([Link](https://github.com/openai/codex/pull/57589))
    *   Extracts executor startup logic into a shared module, allowing the `codex-exec-server` to run independently with preserved authentication and sandboxing configurations.
*   **PR #57586: Add Host-Reserved V2 Child Creation APIs** ([Link](https://github.com/openai/codex/pull/57586))
    *   Introduces `CodexThread::create_child` and `ThreadManager::create_prepared_child` APIs to support creating idle child threads with inherited settings for advanced orchestration.
*   **PR #57584: Preserve Output Boundaries Through Token Truncation** ([Link](https://github.com/openai/codex/pull/57584))
    *   Implements `OutputBoundary` mapping to ensure that when outputs are truncated by token budgets, the indices and text offsets remain accurate for subsequent processing.
*   **PR #57598: Cache Empty Remote Skill Discovery** ([Link](https://github.com/openai/codex/pull/57598))
    *   Optimizes performance by caching verified empty results for remote skill discovery, reducing unnecessary remote metadata requests when `.agents/skills` directories are absent.
*   **PR #57569: Preserve Process Output Under Backpressure** ([Link](https://github.com/openai/codex/pull/57569))
    *   Fixes data loss in process output streams when slow consumers cause the event queue to fill, ensuring descendants do not block client awareness of captured output.
*   **PR #57585: Replace Unavailable Image References** ([Link](https://github.com/openai/codex/pull/57585))
    *   Adds availability checks for image attachments so that model requests reflect current file status, while preserving original references in history for auditability.
*   **PR #57553: Allow Replacing Dynamic Tools Between Steps** ([Link](https://github.com/openai/codex/pull/57553))
    *   Enables `CodexThread::replace_dynamic_tools` to update the tool catalog without restarting a turn, supporting dynamic tool injection during active model steps.
*   **PR #57568: Independent Memory Consolidation Service Tiers** ([Link](https://github.com/openai/codex/pull/57568))
    *   Decouples background memory consolidation from the session's service tier, allowing independent configuration (defaulting to Standard) to manage resource usage more effectively.
*   **PR #57567: Allow Catalog URL Overrides for OpenAI Provider** ([Link](https://github.com/openai/codex/pull/57567))
    *   Permits `model_catalog_url` overrides under the `[model_providers.openai]` configuration, enabling custom routing while preserving built-in authentication and identity.

## 5. Feature Request Trends
*   **Observability & Status Visibility:** Strong demand for persistent indicators of rate limits, token usage, and session state in both TUI and Desktop apps (Issues #17827, #25561, #54956).
*   **Customization & Extensibility:** Requests for deeper customization of approval instructions, model catalogs, and MCP connections, including "One-Click" MCP setup (Issues #54925, #54956).
*   **Cross-Platform Consistency:** Urgent need to align Windows and macOS/Linux behavior, particularly regarding sandboxing (MXC), environment variables, and desktop companion features like "Pets" (Issues #50915, #56264, #56933).

## 6. Developer Pain Points
*   **Windows Sandbox Instability:** Recurring failures in the MXC sandbox due to environment variable stripping (missing `SYSTEMROOT`), BitLocker interactions, and process accumulation. This is the most prominent platform-specific friction point.
*   **VS Code Extension Regressions:** Frequent breakage in the latest stable extension builds affecting Windows and code-server environments (e.g., failing to load resources, freezing editors). Users are forced to downgrade to previous versions.
*   **Browser Use Limitations:** Inconsistent behavior in the Chrome Browser Use plugin, including incorrect blocking of allowed domains and failure to determine current URLs during Computer Use workflows.
*   **Resource Management:** Concerns over inefficient token consumption and rapid exhaustion of usage limits in autonomous agent loops, alongside background processes (MCP, memory consolidation) consuming excessive resources.

</details>