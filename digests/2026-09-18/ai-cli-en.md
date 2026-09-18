# AI CLI Tools Community Digest 2026-09-18

> Generated: 2026-09-18 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

1. **Ecosystem Overview**
The AI CLI tool landscape is transitioning from simple chat interfaces to complex, extensible agent orchestration systems. Both Claude Code and OpenAI Codex are now focused on deepening developer workflows through plugin architectures, persistent session management, and multi-agent coordination. A significant portion of community energy is directed toward resolving platform-specific instability, particularly on Windows, which remains a primary friction point for both ecosystems. Simultaneously, both projects are expanding beyond their native model providers, signaling a shift toward provider-agnostic tooling and robust multi-modal integration.

2. **Activity Comparison**

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Tracked** | 10 Hot Issues | 10 Hot Issues |
| **PRs Updated** | 3 PRs | 10 PRs |
| **Release Status** | v2.1.275 | v0.155.0 + 5 Alpha Pre-releases |
| **Primary Focus** | Extensibility ("Mods") & Windows Stability | Voice UI & Windows Sandbox Repair |

3. **Shared Feature Directions**
*   **Windows Platform Stability:** Both communities report critical, recurring regressions specific to Windows. Claude Code users face launch failures due to orphaned Job Objects (#53247), while Codex users encounter execution blocks from corrupted `deny_read_acl_state.json` files (#45302).
*   **Permission & Context Management:** Developers across both ecosystems are demanding granular, persistent permission states to reduce approval fatigue. This includes "Allow always" options in Claude Code's browser pane (#93156) and the need for standard, callable MCP namespaces in Codex for alternative providers (#26234).
*   **Session Continuity & Persistence:** Both tools are facing pressure to improve long-running agent workflows. Claude Code has high traction for "Session Handoff" between machines (#11455), while Codex users are requesting event-driven wakeups to support autonomous background tasks without polling (#32188).

4. **Differentiation Analysis**
*   **Technical Approach & Extensibility:** Claude Code is moving toward a modular "Mods" architecture with explicit function hooks and plugin decoupling (#91870). OpenAI Codex is focusing on native multi-modality (experimental voice conversations #43581) and improving headless/CI-CD execution reliability.
*   **Target Users & Workflow:** Claude Code's community feedback is heavily influenced by IDE extension (VS Code) parity and multi-agent "Conductor" patterns (#93438). OpenAI Codex's community is increasingly driven by local/alternative model usage (Ollama, Bedrock) and a push for provider agnosticism, moving away from a strictly proprietary ecosystem.
*   **Release Cadence:** OpenAI Codex maintains a higher-velocity, multi-track release process (simultaneous GA and alpha releases), whereas Claude Code operates on a more consolidated single-version release cycle.

5. **Community Momentum & Maturity**
*   **Maturity & Scale:** Claude Code exhibits higher community maturity and scale, evidenced by long-standing, high-volume issues with over 90 comments (#53247). Its feature requests are deeply embedded in enterprise integration and orchestration patterns.
*   **Rapid Iteration:** OpenAI Codex is in a faster, more rapid iteration phase, characterized by a dense cluster of 10 PRs addressing architectural fixes, OAuth gateway management, and experimental UI features within a single 24-hour window. This indicates a project actively refining its core infrastructure to support newer capabilities.

6. **Trend Signals**
*   **Provider Agnosticism is Standard:** The push in Codex's community for reliable MCP tool support on non-OpenAI providers, alongside new OAuth gateway credential management, signals that AI CLI tools are becoming standardized interfaces for multiple LLMs rather than exclusive wrappers.
*   **Windows as the Lingering Bottleneck:** Despite rapid feature development on macOS/Linux, the ecosystem's next growth frontier depends on resolving deep OS-level sandboxing and job-object management issues on Windows.
*   **From Polling to Event-Driven Agents:** The request for event-driven wakeups in Codex (#32188) represents a maturing shift in agent design. Developers are moving away from model-driven polling (wasting API tokens) toward system-level callbacks for long-running autonomous tasks.
*   **Security & Cost Transparency:** Growing friction around context leaks, token waste, and accidental premium model billing indicates that developers are prioritizing strict cost-containment and security sandboxes as a prerequisite for high-velocity agent workflows.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-09-18 | Source: [anthropics/skills](https://github.com/anthropics/skills)**

## 1. Top Skills Ranking

The following skills from the most-active Pull Requests are ranked by sustained community attention and engagement:

*   **skill-creator** (Trigger Evaluation & Windows Fix)
    *   **Functionality:** Core meta-skill for creating and evaluating other Skills; currently undergoing fixes for trigger evaluation false misses and Windows runtime failures.
    *   **Discussion Highlights:** Active debugging of per-worker command probe competition and `select()` subprocess pipe failures on Windows.
    *   **Status:** [Open PR #1298](https://github.com/anthropics/skills/pull/1298)
*   **mcp-builder** (Import & Model Updates)
    *   **Functionality:** Toolkit for building and evaluating Model Context Protocol servers.
    *   **Discussion Highlights:** Addressing breaking changes in `mcp>=2.0.0` regarding `streamable_http_client` imports and updating the default evaluation model from `claude-3-7-sonnet` to `claude-sonnet-5`.
    *   **Status:** [Open PR #1742](https://github.com/anthropics/skills/pull/1742), [Open PR #1724](https://github.com/anthropics/skills/pull/1724)
*   **docx / office** (Redlining & Encoding)
    *   **Functionality:** Document generation and validation for Office formats.
    *   **Discussion Highlights:** Fixing document corruption from tracked change `w:id` collisions with bookmarks and ensuring redlining diffs are properly decoded as UTF-8 on Windows/non-UTF-8 locales.
    *   **Status:** [Open PR #541](https://github.com/anthropics/skills/pull/541), [Open PR #1765](https://github.com/anthropics/skills/pull/1765)
*   **pdf** (Case-Sensitivity Fix)
    *   **Functionality:** PDF manipulation and generation.
    *   **Discussion Highlights:** Resolving 8 case-sensitivity mismatches in `SKILL.md` file references that break on case-sensitive file systems.
    *   **Status:** [Open PR #538](https://github.com/anthropics/skills/pull/538)
*   **claude-api** (Model Retirement & Context Window)
    *   **Functionality:** API integration skill for Claude models.
    *   **Discussion Highlights:** Updating documentation to reflect four retired model IDs and addressing a critical issue where the skill eagerly injects ~156k tokens, exhausting the context window.
    *   **Status:** [Open PR #1607](https://github.com/anthropics/skills/pull/1607), [Open Issue #1487](https://github.com/anthropics/skills/issues/1487)

## 2. Community Demand Trends

Analysis of community Issues reveals the following anticipated Skill directions:

*   **AI Agent Governance & Safety:** Users are requesting "agent-governance" Skills to handle policy enforcement, threat detection, trust scoring, and audit trails for AI agent systems ([Issue #412](https://github.com/anthropics/skills/issues/412)). Relatedly, there is growing concern over security boundaries, specifically regarding community Skills distributed under the `anthropic/` namespace which can enable trust boundary abuse ([Issue #492](https://github.com/anthropics/skills/issues/492)).
*   **Workflow Automation & Multi-Agent Orchestration:** There is strong demand for zero-cost multi-agent orchestration (delegating mechanical work to headless workers) and portable API skills for social media scheduling ([PR #1628](https://github.com/anthropics/skills/pull/1628), [PR #1627](https://github.com/anthropics/skills/pull/1627)).
*   **Documentation & Memory Management:** Developers are proposing Skills for "compact-memory" (symbolic notation for compact agent state) to manage long-running agent context, as well as "Reasoning Quality Gate Pipelines" for pre-task calibration and delivery verification ([Issue #1329](https://github.com/anthropics/skills/issues/1329), [Issue #1385](https://github.com/anthropics/skills/issues/1385)).
*   **Enterprise Integration:** Ongoing work on connecting to enterprise systems like SCNet HPC clusters and Buffer GraphQL APIs, with attention to organizational skill sharing capabilities ([PR #1615](https://github.com/anthropics/skills/pull/1615), [Issue #228](https://github.com/anthropics/skills/issues/228)).

## 3. High-Potential Pending Skills

These active, recently updated PRs represent new Skills likely to land soon:

*   **proofcore-contract-auditor:** An Agent Skill for Web3 developers performing automated static analysis of Solidity and Rust smart contracts, anchoring cryptographic audit proofs onto the TON Blockchain. [PR #1771](https://github.com/anthropics/skills/pull/1771)
*   **md2video-audio:** A zero-cost skill that compiles Markdown documents into professional-grade MP4 videos with realistic human-like voiceovers via Marp. [PR #1703](https://github.com/anthropics/skills/pull/1703)
*   **pyxel:** A skill for creating, debugging, and verifying retro games in Python, featuring deterministic headless runs and frame inspection. [PR #525](https://github.com/anthropics/skills/pull/525)
*   **document-typography:** Typographic quality control for generated documents, preventing orphan word wrap, widow paragraphs, and numbering misalignment. [PR #514](https://github.com/anthropics/skills/pull/514)

## 4. Skills Ecosystem Insight

The community's most concentrated demand at the Skills level is improving the reliability and context efficiency of meta-skills (like `skill-creator` and `claude-api`) to prevent evaluation failures and context window exhaustion.

---

# Claude Code Community Digest — 2026-09-18

### Today's Highlights
Claude Code v2.1.275 introduced a "send-now" keybind (ctrl+enter / ctrl+x ctrl+s) to interrupt current turns and dispatch queued messages, alongside new account confirmation logic for the Claude apps gateway. Community attention remains heavily concentrated on the upcoming "Mods" extensibility system, which promises function hooks and rapid shipping timelines, as well as persistent Windows launch bugs caused by orphaned Job Objects.

### Releases
*   **v2.1.275**: Added signed-in account verification to the Claude apps gateway sign-in process; users must confirm the gateway-named account before credentials are saved, with details now visible in `/status`. Introduced a send-now keybind (ctrl+enter or ctrl+x ctrl+s) that interrupts the active turn and sends all queued messages immediately.
    *   [Release v2.1.275](https://github.com/anthropics/claude-code/releases)

### Hot Issues
1.  **#91870: Mods - make Claude 10x more extensible**
    The most active issue in the tracker. The maintainer confirmed a commitment to shipping "function hooks" within weeks, directly responding to high-signal community feedback regarding the modular architecture.
    *   [Issue #91870](https://github.com/anthropics/claude-code/issues/91870)
2.  **#53247: Claude Desktop fails to launch on Windows**
    A critical regression where app crashes leave orphaned Silo/Job Objects, requiring a full logoff or reboot to recover. This remains a top-3 friction point for Windows users with 90+ comments.
    *   [Issue #53247](https://github.com/anthropics/claude-code/issues/53247)
3.  **#11455: Session Handoff / Continuity Support**
    A long-standing request for the ability to transfer active sessions between machines or restarts without losing context, gaining significant traction from systems integrators.
    *   [Issue #11455](https://github.com/anthropics/claude-code/issues/11455)
4.  **#25128: Drag and drop not working in VS Code extension**
    A persistent regression since v2.1.6 where drag-and-drop works in the terminal CLI but is completely broken in the VS Code chat panel, affecting file attachment workflows.
    *   [Issue #25128](https://github.com/anthropics/claude-code/issues/25128)
5.  **#15921: VSCode Extension: `.claude/settings.local.json` permissions not respected**
    Users report that `bypassPermissions` and specific Bash/Write/Edit restrictions are ignored in the VS Code extension, creating security and friction issues compared to the CLI.
    *   [Issue #15921](https://github.com/anthropics/claude-code/issues/15921)
6.  **#81081: Session-start skill listing silently truncates descriptions**
    A subtle bug where skill descriptions are cut off due to a size budget, causing users to lose context about available capabilities without warning.
    *   [Issue #81081](https://github.com/anthropics/claude-code/issues/81081)
7.  **#93156: Browser pane: no way to grant persistent site permission**
    The in-app browser pane lacks an "Allow always" option, forcing users to re-authenticate or approve actions for trusted sites on every interaction.
    *   [Issue #93156](https://github.com/anthropics/claude-code/issues/93156)
8.  **#94225: ECONNRESET on direct ISP path**
    A networking issue where Anthropic ingress resets TLS 1.3 handshakes carrying X25519MLKEM768, specifically affecting Movistar/Telefónica users in Spain; VPNs mitigate the issue.
    *   [Issue #94225](https://github.com/anthropics/claude-code/issues/94225)
9.  **#93438: Agent dispatch with isolation:"worktree" causes cwd state bleed**
    A bug in Conductor-style patterns where isolated worktree agents leak their `cwd` state back into the parent session, causing path errors.
    *   [Issue #93438](https://github.com/anthropics/claude-code/issues/93438)
10. **#93680: Bash tool creates session directory via `/proc/self/fd/N/`**
    A regression in 2.1.263 where the Bash tool fails on Linux environments where `procfs` is absent or incomplete, as it relies on `/proc/self/fd/N/` instead of `mkdirat()`.
    *   [Issue #93680](https://github.com/anthropics/claude-code/issues/93680)

### Key PR Progress
*Note: Only 3 Pull Requests were updated in the last 24 hours.*
1.  **#95198: mods/diff: type openPane's answer as unknown**
    Adjusts the `diff` mod's host contract to accept `Promise<unknown>` for `openPane`, preparing for the next engine typings where `$.ui.open` resolves with a richer result object.
    *   [PR #95198](https://github.com/anthropics/claude-code/pull/95198)
2.  **#94847: diff: the first edit opens the pane only when it has a file to list**
    Fixes a UX issue where the diff pane would auto-open on the first successful Edit/Write even if it was outside the repository or to an ignored file, resulting in an empty "No tracked changes" pane.
    *   [PR #94847](https://github.com/anthropics/claude-code/pull/94847)
3.  **#87077: fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents**
    Repairs invalid YAML frontmatter in agent descriptions where unquoted dialogue lines were being parsed as nested mappings, causing agents to load with empty metadata.
    *   [PR #87077](https://github.com/anthropics/claude-code/pull/87077)

### Feature Request Trends
*   **Extensibility & Hooks:** The "Mods" issue (#91870) dominates the roadmap discussion, with the community pushing for function hooks and plugin architectures to decouple features from the core loop.
*   **Session Management:** Requests for Session Handoff (#11455) and continuity across restarts/machines are gaining momentum, driven by remote work and multi-device usage.
*   **Permission Control:** Users are demanding granular, persistent permission states (e.g., "Allow always" for browser origins in #93156) to reduce approval fatigue in high-velocity workflows.
*   **Cost & Model Transparency:** There is friction around model scoping, with users requesting clearer safeguards against accidental premium billing when using session-wide model switches vs. per-task overrides (#79478).

### Developer Pain Points
*   **Windows Instability:** The "orphaned Job Object" bug (#53247) continues to plague Windows users, requiring reboots for recovery. Additionally, local environment attachments in Cowork are failing on Windows while working on macOS (#88632).
*   **VS Code Extension Parity:** The IDE extension lags behind the CLI in critical features like drag-and-drop (#25128) and permission handling (#15921), creating a two-tier experience.
*   **Context & Token Waste:** Developers are frustrated by context leaks, such as MCP tool schemas consuming tokens even when disabled (#92255) and deferred tools wasting ~20k tokens per session (#83363).
*   **Agent Orchestration Bugs:** Conductor-style multi-agent setups are hitting state bleed issues (#93438) and lack safeguards against bulk-creating PRs on external repos (#79399), posing significant workflow risks.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-18

## 1. Today's Highlights
OpenAI released **Codex CLI v0.155.0**, introducing experimental voice conversations and live TUI reasoning summaries, alongside five alpha pre-releases. The community’s attention is heavily divided between a critical, recurring **Windows sandbox failure** that blocks Computer Use and basic CLI tools, and a cluster of reports regarding **missing Computer Use features on Intel macOS**. Notable engineering work includes the stabilization of OAuth gateway credentials, preservation of web-search data in JSON execution logs, and fixes to project trust persistence for projectless directories.

## 2. Releases
**Codex CLI v0.155.0**
- Introduced experimental `/voice` conversations with live transcripts and microphone controls, available on supported builds via `/experimental` ([#43581, #43651, #44331]).
- The TUI now displays live reasoning summaries in the status row and shows completion timestamps after successful turns.

*Note: v0.155.0-alpha.15 through v0.155.0-alpha.18 were also released in the 24-hour window, serving as stable stepping-stones to the GA release.*

## 3. Hot Issues
1. **[#26234] MCP tools uncallable for non-OpenAI providers (48 reactions)**
   Users running Codex against Ollama, LM Studio, OpenRouter, or AWS Bedrock report that tools from MCP servers are not callable by the model. This remains one of the highest-prioritized blockers for local and alternative model ecosystems.
   [View Issue](https://github.com/openai/codex/issues/26234)
2. **[#24287] Codex Desktop UI stuck in "Thinking" and turns become invisible (31 comments)**
   Prompts are accepted, but the UI freezes on the "Thinking" state. The Stop button fails, and sessions can become permanently invisible after a restart, severely degrading the desktop experience.
   [View Issue](https://github.com/openai/codex/issues/24287)
3. **[#40905] 5-hour usage limit interrupts long-running GPT-5.6 Sol tasks (15 comments)**
   The rolling 5-hour window frequently terminates multi-hour autonomous agent tasks. The community argues the limit is incompatible with the sustained reasoning capabilities of the GPT-5.6 Sol model.
   [View Issue](https://github.com/openai/codex/issues/40905)
4. **[#42739] Local projects disappear from Windows sidebar post-update (14 comments)**
   Following a desktop app update on Windows, the "Projects" section shows "No projects" despite the source folders and chat history still existing on disk.
   [View Issue](https://github.com/openai/codex/issues/42739)
5. **[#24437] Intel macOS x64 missing Computer Use / Appshots (10 comments)**
   A persistent packaging issue where the x64 macOS build lacks the `computer-use` plugin and `Codex Computer Use.app` helper, leaving Intel Mac users without Appshots or locked-screen capabilities.
   [View Issue](https://github.com/openai/codex/issues/24437)
6. **[#32188] Feature: Event-driven wakeup for background exec (13 reactions)**
   Currently, monitoring long-running commands requires the model to poll `write_stdin` inside a tool call. Users are requesting a true event-driven callback to reduce model turns and API costs.
   [View Issue](https://github.com/openai/codex/issues/32188)
7. **[#33171] Remote-compaction capacity error terminalizes persistent goals (9 comments)**
   On Windows Desktop, remote-compaction capacity errors permanently break persistent `/goal` tasks, while other concurrent tasks in the app remain healthy.
   [View Issue](https://github.com/openai/codex/issues/33171)
8. **[#44848] "Daybreak" false positive labels active goals as stalled (8 comments)**
   The Daybreak safety check triggers false positives, incorrectly labeling perfectly active and running goals as "stalled," confusing users and breaking agent workflows.
   [View Issue](https://github.com/openai/codex/issues/44848)
9. **[#45302] Windows sandbox blocks execution: invalid deny_read_acl_state.json (8 comments)**
   The `.codex/.sandbox/deny_read_acl_state.json` file is generated with 22 bytes of NULs, causing parse failures that completely block the elevated sandbox on Windows 11.
   [View Issue](https://github.com/openai/codex/issues/45302)
10. **[#38185] No opt-out for recommended_plugins injection (7 comments, 3 reactions)**
    The `<recommended_plugins>` block containing ~38 third-party plugins is unconditionally injected on the first turn of every session. Removing the feature flag leaves no way to suppress it.
    [View Issue](https://github.com/openai/codex/issues/38185)

## 4. Key PR Progress
1. **[#46328] Avoid persisting project trust for projectless directories**
   Fixes a trust-model loophole where starting a thread in a directory without a project would persist trust and preapprove future project configurations.
   [View PR](https://github.com/openai/codex/pull/46328)
2. **[#46324] Broaden compaction fallback to the current model**
   Ensures that if a model switch occurs mid-stream, compaction falls back to the new selected model instead of failing with the previous model's stream retries.
   [View PR](https://github.com/openai/codex/pull/46324)
3. **[#46319] Preserve web search actions and results in exec JSON output**
   Fixes `codex exec --json` so that web search events no longer collapse into generic `{"type": "other"}` payloads; structured URLs and outcomes are now preserved.
   [View PR](https://github.com/openai/codex/pull/46319)
4. **[#46318] Add OAuth credential management for model provider gateways**
   Introduces `GatewayAuthManager` to handle PKCE browser sign-in, loopback callbacks, and encrypted storage of gateway credentials for non-OpenAI providers.
   [View PR](https://github.com/openai/codex/pull/46318)
5. **[#46310] Defer environment selection changes until the next turn**
   Prevents mid-turn tool redirection when a user updates environment selections, ensuring the current turn's pending environment setup completes successfully.
   [View PR](https://github.com/openai/codex/pull/46310)
6. **[#46309] Preserve plugin caches across display metadata refreshes**
   Stops unnecessary invalidation of loaded MCP and skill caches by comparing plugin metadata by identity rather than image URLs and other transient display data.
   [View PR](https://github.com/openai/codex/pull/46309)
7. **[#46302] Validate network socket policies using the executor OS**
   Resolves false rejections of absolute paths (e.g., Windows paths on a Linux controller) by validating socket policies against the executor's OS.
   [View PR](https://github.com/openai/codex/pull/46302)
8. **[#46300] Centralize OAuth login and refresh handling with safer diagnostics**
   Consolidates separate OAuth login/refresh logic to prevent token and credential values from being exposed in JSON decoding error diagnostics.
   [View PR](https://github.com/openai/codex/pull/46300)
9. **[#46294] Separate thread startup metadata from replay history**
   Reduces memory cloning by storing `ThreadStartupMetadata` independently, allowing callers that only need thread IDs to avoid loading the full `SessionConfiguredEvent` replay history.
   [View PR](https://github.com/openai/codex/pull/46294)
10. **[#46288] Add opt-in overhead timing to code-mode responses**
    Introduces `experimental_show_cell_overhead` to display time spent outside the host (such as app-server waiting), providing crucial insights into agent latency.
    [View PR](https://github.com/openai/codex/pull/46288)

## 5. Feature Request Trends
- **Autonomous Task Persistence:** There is a strong push to make event-driven, long-running agent tasks robust against rate limits and transient network failures, requiring better memory context (e.g., `#32188`).
- **Provider Agnosticism:** Developers using Ollama, Bedrock, and OpenRouter are heavily requesting standard, callable MCP namespaces and first-class OAuth support ([#26234]), moving beyond OpenAI's proprietary Responses API.
- **Sandbox Transparency:** Users are requesting more granular control over `deny_read_acl` states and sandboxing to prevent hard failures during local execution ([#45302], [#46114]).

## 6. Developer Pain Points
- **Windows Sandbox Instability:** The most frequent and disruptive complaint. A corrupted `deny_read_acl_state.json` file causes a cascading failure that blocks Computer Use, terminal access, and basic CLI execution ([#45302], [#44034], [#42958]).
- **Intel macOS Feature Gap:** Multiple issues ([#24437], [#46327], [#25045]) highlight that x64 Intel Macs are still missing the Computer Use / Appshots service, creating a frustrating disparity compared to Apple Silicon users.
- **CLI `exec` Headless Friction:** Automators are hitting silent no-ops and broken JSON structures when attempting to use hooks (`SessionStart`) and web-search tools headlessly, hindering CI/CD integrations ([#45999], [#46210]).

</details>