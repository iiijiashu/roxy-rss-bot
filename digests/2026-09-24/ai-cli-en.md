# AI CLI Tools Community Digest 2026-09-24

> Generated: 2026-09-24 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool Comparison Report: AI CLI Developer Ecosystem
**Date:** 2026-09-24
**Tools Analyzed:** Claude Code, OpenAI Codex

## 1. Ecosystem Overview
The AI developer tools landscape is rapidly maturing, shifting from basic code generation to complex agent orchestration with robust extension architectures. Both major players are heavily investing in enterprise-grade security, fine-grained permission management, and platform-specific stability. A clear trend toward modularity and granular control over model behaviors and plugin capabilities is emerging, driven by enterprise adoption needs. Simultaneously, significant friction remains in cross-platform stability (particularly Windows for Codex) and long-session reliability for both tools.

## 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Release Status** | **v2.1.281** (Stable) | **rust-v0.156.1** (Stable) + 3 Alpha/Prerelease streams (0.155.0, 0.157.0, 0.158.0) |
| **Key Release Focus** | Enterprise security (Bedrock IAM), Desktop policy blocks | New model options (GPT-6 Sol/Luna), rate-limit guidance |
| **Hot Issues Count** | 10 tracked | 10 tracked |
| **PR Count (Last 24h)** | 5 tracked | 10 tracked |
| **Top Issue Severity** | UI friction (VS Code locked panels), Config bugs | Critical Windows Desktop regressions (Hanging/Disabled messages) |

## 3. Shared Feature Directions

*   **Granular Configuration & Control:** Both communities demand fine-grained control over agent behavior. Claude Code users seek the ability to disable individual plugin skills rather than whole plugins; Codex users request decoupling user-owned settings from generated runtime state and control over tool dispatch.
*   **Extension & Interception Hooks:** Both are expanding their extension surfaces. Claude Code is refining `AGENTS.md` delivery and security-guidance hooks; Codex is adding `ModelRequestContributor` and `on_tool_dispatch` hooks, allowing extensions to intercept model streams and tool lifecycles.
*   **Context & Memory Management:** Both tools face challenges in managing long-term context. Claude Code struggles with post-compaction instruction drift; Codex is restructuring its "Guardian" context architecture to be thread-owned rather than session-level to improve history management.
*   **MCP Integration Robustness:** Both are dealing with MCP protocol complexity. Claude Code faces silent failures with complex JSON schemas (`allOf`/`if`/`then`); Codex faces OAuth refresh failures and resource override control requests.

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Primary Focus** | **Security & Enterprise Integration:** Heavy lift on Bedrock IAM roles, desktop policy blocks, and preventing secret leakage in reviews. | **Platform Stability & Extensibility:** Massive push on Windows sandbox repairs, credential validation, and new extension API surfaces for model/tool interception. |
| **Target User Friction** | **IDE/Terminal UX:** Locked VS Code panels, TUI copy-paste fidelity, and multi-lingual consistency (drifting to English). | **Desktop App Reliability:** Critical Windows regressions where follow-up messages hang or disable, and app-server crashes. |
| **Technical Approach** | **Configuration Resolution:** Struggles with how settings resolve across Cowork modes and platforms; focus on fixing config inconsistencies. | **Architecture Refactoring:** Moving from session-level to thread-owned context; introducing V2 capability discovery for pre-warming plugins. |
| **Model Strategy** | Gateway-centric: Integrating new model keys and policy blocks into the gateway architecture. | Model-picker-centric: Explicitly recommending specific models (GPT-6 Luna) for rate-limit management. |

## 5. Community Momentum & Maturity

*   **OpenAI Codex:** Higher velocity in internal iteration (3 alpha streams vs. Claude Code's single stable update). The community is currently in a "debugging phase" for the Windows desktop app, with high-severity regressions affecting daily use. This suggests rapid feature shipping (GPT-6 integration, new hooks) at the cost of platform stability.
*   **Claude Code:** More mature in enterprise readiness, focusing on hardening security and fixing long-standing UI friction. The high upvote count for granular plugin control (94 👍) indicates a community that is deeply invested in power-user workflows but feeling constrained by monolithic plugin management.

## 6. Trend Signals

1.  **Windows is the Critical Weak Point:** For Codex, Windows stability is the dominant pain point, not model quality. Developers building on cross-platform environments should expect a period of instability in Codex's Windows desktop app before these regressions are resolved.
2.  **Security as a First-Class Feature:** Claude Code’s focus on preventing secret leakage in `git diff` reviews and adding IAM role support signals that AI CLI tools are moving from "dev productivity" to "dev security compliance." Enterprises will look for these guardrails.
3.  **The End of Monolithic Plugins:** The demand for skill-level granularity in Claude Code and tool-level interception in Codex suggests the next generation of AI CLI extensions will be highly modular, with user-defined permission scopes for individual capabilities rather than binary on/off switches.
4.  **Context Architecture War:** The shift to "thread-owned" context in Codex and the struggles with post-compaction drift in Claude Code highlight that context management is the new performance bottleneck. Tool choice may soon depend on which architecture better preserves instruction fidelity over long sessions.

**Recommendation for Developers:**
*   For **Windows-centric enterprises** requiring immediate stability: **Claude Code** currently has fewer critical platform regressions, though its VS Code integration has friction points.
*   For **Power Users** needing deep customization of agent behavior: **OpenAI Codex** offers more advanced extension hooks for model interception, but requires tolerance for current Windows instability.
*   For **Security-Sensitive Environments:** **Claude Code**’s new Bedrock IAM support and security-guidance PRs make it the stronger candidate for regulated environments.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report
*(Data as of 2026-09-24)*

### 1. Top Skills Ranking
The following PRs represent the most active skill contributions and fixes, sorted by recency and relevance of discussion:

*   **skill-creator: Trigger Eval Isolation & Windows Fixes** — This critical fix addresses false misses in trigger evaluation, Windows-specific `select()` failures, and runtime error handling that previously skewed optimization metrics.
    *   **Status:** Open ([PR #1298](https://github.com/anthropics/skills/pull/1298))
*   **docx: Comment & Tracked Changes Fixes** — A series of PRs resolving document corruption, including ID collisions with existing bookmarks, missing `.rels` files for comments, and incorrect timeout reporting in LibreOffice integration.
    *   **Status:** Open ([PR #1790](https://github.com/anthropics/skills/pull/1790)), ([PR #1792](https://github.com/anthropics/skills/pull/1792)), ([PR #541](https://github.com/anthropics/skills/pull/541))
*   **mcp-builder: Compatibility & Import Fixes** — Updates to support `mcp>=2.0.0` streamable HTTP client renames and custom header configurations, resolving breakage in newer MCP environments.
    *   **Status:** Open ([PR #1742](https://github.com/anthropics/skills/pull/1742))
*   **pdf: Case-Sensitivity Fixes** — Corrects 8 case-sensitivity mismatches in `SKILL.md` file references (e.g., `REFERENCE.md` vs `reference.md`) that caused failures on case-sensitive file systems.
    *   **Status:** Open ([PR #538](https://github.com/anthropics/skills/pull/538))
*   **md2video-audio: Zero-Cost Video Generation** — A new skill that compiles Markdown documents into MP4 videos with voiceovers via Marp and TTS, positioned as a low-cost content generation tool.
    *   **Status:** Open ([PR #1703](https://github.com/anthropics/skills/pull/1703))
*   **pyxel: Retro Game Development** — Supports creating, debugging, and verifying retro games in Python with headless input-driven runs and frame inspection.
    *   **Status:** Open ([PR #525](https://github.com/anthropics/skills/pull/525))
*   **testing-patterns: Comprehensive QA Skill** — Covers the full testing stack including unit tests, React component testing, and the Testing Trophy model philosophy.
    *   **Status:** Open ([PR #723](https://github.com/anthropics/skills/pull/723))
*   **proofcore-contract-auditor: Web3 Smart Contract Analysis** — Adds automated static analysis for Solidity/Rust contracts and anchors cryptographic audit proofs to the TON Blockchain.
    *   **Status:** Open ([PR #1771](https://github.com/anthropics/skills/pull/1771))

### 2. Community Demand Trends
Analysis of high-comment Issues reveals four dominant demand directions:
*   **Security & Trust Boundaries:** The most discussed issue ([#492](https://github.com/anthropics/skills/issues/492)) highlights urgent community concern over "trust boundary abuse," where community skills distributed under the `anthropic/` namespace impersonate official tools, leading to potential permission escalation.
*   **Skill Sharing & Organizational Workflows:** Strong demand for native org-wide sharing capabilities to replace manual file uploads ([#228](https://github.com/anthropics/skills/issues/228)), alongside reports of skills "disappearing" after file renaming ([#62](https://github.com/anthropics/skills/issues/62)).
*   **Reliability & Token Efficiency:** Users are demanding fixes for context window exhaustion (e.g., `claude-api` injecting ~156k tokens in [#1487](https://github.com/anthropics/skills/issues/1487)) and zero-trigger rates in evaluation scripts ([#556](https://github.com/anthropics/skills/issues/556)).
*   **Advanced Agent Governance & Quality Gates:** Proposals are emerging for meta-skills that enforce safety patterns, policy checks, and reasoning quality gates ([#412](https://github.com/anthropics/skills/issues/412), [#1385](https://github.com/anthropics/skills/issues/1385)).

### 3. High-Potential Pending Skills
These active PRs represent novel capabilities likely to be merged soon:
*   **blat-radius** — A safety checklist skill for "bulk or destructive write" operations (deleting rows, revoking access) to prevent unintended global state changes. ([PR #1776](https://github.com/anthropics/skills/pull/1776))
*   **scnet-hpc** — Specialized skill for operating SCNet HPC clusters, covering SSH, Slurm, and accelerator profiling. ([PR #1615](https://github.com/anthropics/skills/pull/1615))
*   **AWT (AI Watch Tester)** — An E2E testing skill providing Claude with vision and browser control for zero-code test generation. ([PR #822](https://github.com/anthropics/skills/pull/822))
*   **document-typography** — Focuses on typographic quality control (orphans, widows, numbering) to improve AI-generated document aesthetics. ([PR #514](https://github.com/anthropics/skills/pull/514))
*   **ODT (OpenDocument)** — Enables creation, filling, and parsing of `.odt`/`.ods` files, expanding office suite support beyond Microsoft formats. ([PR #486](https://github.com/anthropics/skills/pull/486))

### 4. Skills Ecosystem Insight
The community's most concentrated demand is for **enhanced security and trust mechanisms** to distinguish official Anthropic skills from third-party contributions, combined with **reliability improvements** (trigger evaluation and context efficiency) to ensure skills function as intended in enterprise environments.

---

# Claude Code Community Digest — 2026-09-24

## 1. Today's Highlights
Claude Code v2.1.281 introduces Claude apps gateway support for desktop policy blocks and adds `assume_role` capabilities for Bedrock upstreams, enhancing enterprise security and integration options. The community is actively addressing a critical configuration resolution bug in Cowork sessions and a widespread issue where VS Code extensions leave locked panels behind, both of which have generated significant developer feedback. Security and reliability improvements are in focus, with new PRs aimed at preventing secret leakage in security-guidance reviews and fixing ANSI color issues in diff outputs.

## 2. Releases
**v2.1.281**
*   **Claude Apps Gateway:** Added support for newer Claude Desktop keys in `desktop` policy blocks, including `blockReadsOutsideWorkingDirectories` and `disableBypassPermissionsMode`.
*   **Bedrock Integration:** Added `assume_role` support on Claude apps gateway Bedrock upstreams, allowing the gateway to call Bedrock as an IAM role.

## 3. Hot Issues
1.  **[BUG] Claude leaves behind locked panels in VSCode** ([#20324](https://github.com/anthropics/claude-code/issues/20324))
    *   **Status:** Closed | **Reaction:** 19 👍
    *   **Why it matters:** A long-standing friction point where opening new tabs creates locked tab groups, hindering multi-file workflows. The closure suggests a fix or resolution has been reached for this UI annoyance.
2.  **[BUG] Cowork sessions ignore user hooks and managed settings** ([#40495](https://github.com/anthropics/claude-code/issues/40495))
    *   **Status:** Open | **Reaction:** 22 👍
    *   **Why it matters:** A critical mismatch in sandbox platforms breaks settings resolution for Cowork users, ignoring managed hooks. High community interest indicates this is blocking enterprise configurations.
3.  **[FEATURE] Add ability to disable individual Claude plugin skills** ([#14920](https://github.com/anthropics/claude-code/issues/14920))
    *   **Status:** Open | **Reaction:** 94 👍
    *   **Why it matters:** One of the most upvoted requests. Developers want granular control over plugin skills (e.g., disabling `commit-push-pr` while keeping `:commit`), signaling a need for more modular plugin management.
4.  **[FEATURE] Improve the model's ability to follow instructions** ([#13689](https://github.com/anthropics/claude-code/issues/13689))
    *   **Status:** Open | **Reaction:** 8 👍
    *   **Why it matters:** A fundamental request for core model behavior improvement, highlighting frustration when Claude Code fails to adhere to explicit user instructions.
5.  **[BUG] VS Code extension: clicking chat links to binary files silently fails** ([#81227](https://github.com/anthropics/claude-code/issues/81227))
    *   **Status:** Open | **Reaction:** 9 �m
    *   **Why it matters:** Unhandled rejections when opening images/PDFs from chat break the flow for visual documentation or binary file discussions in the IDE.
6.  **[BUG] Text copied from TUI and pasted into prompt is shown on separate lines** ([#95512](https://github.com/anthropics/claude-code/issues/95512))
    *   **Status:** Open | **Reaction:** 4 👍
    *   **Why it matters:** A recent regression affecting copy-paste fidelity within the Terminal UI, adding unnecessary blank lines and disrupting prompt construction.
7.  **[BUG] Replies drift into English after reading English tool output** ([#96326](https://github.com/anthropics/claude-code/issues/96326))
    *   **Status:** Open | **Reaction:** 4 👍
    *   **Why it matters:** Language consistency is broken in multi-lingual setups; despite `CLAUDE.md` rules and session settings, the model reverts to English after processing English tool outputs.
8.  **[BUG] 1M-context session becomes unrecoverable: ECONNRESET** ([#74544](https://github.com/anthropics/claude-code/issues/74544))
    *   **Status:** Closed | **Reaction:** 0 👍
    *   **Why it matters:** Highlighted a severe reliability issue where large cold-cache requests and `/compact` failures made long sessions unusable.
9.  **[BUG] MCP tools silently dropped when inputSchema uses root-level allOf/if/then** ([#95504](https://github.com/anthropics/claude-code/issues/95504))
    *   **Status:** Open | **Reaction:** 2 👍
    *   **Why it matters:** A compatibility issue with newer MCP specifications (2026-07-28) where complex JSON schemas cause tools to be silently discarded, breaking integrations.
10. **[BUG] CLAUDE.md present in context after /compact but no longer followed** ([#95745](https://github.com/anthropics/claude-code/issues/95745))
    *   **Status:** Open | **Reaction:** 1 👍
    *   **Why it matters:** Demonstrates a gap between context presence and model compliance post-compaction, where imperative hooks still work but project instructions are ignored.

## 4. Key PR Progress
*Note: The provided data lists 5 Pull Requests updated in the last 24h. The following details all available PRs.*

1.  **telemetry: rows carry the engine's version, base version and build time** ([#96487](https://github.com/anthropics/claude-code/pull/96487))
    *   **Detail:** Fixes telemetry for external builds that previously lacked version metadata. Now leverages `$.session.version()` from v2.1.281+ to ensure rows include `version`, `base`, and `builtAt` fields.
2.  **security-guidance: keep denied and secret files out of the reviewer's reach** ([#96434](https://github.com/anthropics/claude-code/pull/96434))
    *   **Detail:** Addresses a security gap where the reviewer could access files (e.g., `secrets.yaml`) via `git diff`/`git show` prompts, bypassing session permission rules that block direct reads.
3.  **diff: pass --no-color so forced git colors do not empty the diff body** ([#96363](https://github.com/anthropics/claude-code/pull/96363))
    *   **Detail:** Fixes an issue where `color.ui=always` in git config caused ANSI escapes in diffs, breaking hunk header matching. Enforces `--no-color` to ensure reliable diff parsing.
4.  **agents-md: an auto-paginated Read of a nested AGENTS.md no longer counts as delivering it** ([#96364](https://github.com/anthropics/claude-code/pull/96364))
    *   **Detail:** Refines how `AGENTS.md` delivery is counted. Ensures that auto-paginated reads (due to token caps) are correctly handled so subsequent reads under the same directory don't incorrectly assume the file was fully delivered.
5.  **docs: align code-review README with the current validation-based command** ([#79150](https://github.com/anthropics/claude-code/pull/79150))
    *   **Detail:** Updates documentation to reflect the current implementation, removing references to deprecated confidence scoring thresholds and git blame agents that no longer exist in the code-review pipeline.

## 5. Feature Request Trends
*   **Granular Plugin/Skill Control:** Strong demand (94+ upvotes) for disabling specific plugin skills rather than entire plugins, indicating a need for more modular customization.
*   **Model Instruction Adherence:** Recurring requests for improved model compliance with `CLAUDE.md` and explicit user rules, particularly in long sessions or post-compaction.
*   **CLI Ergonomics:** Requests for standard developer tools like bash tab-completion for the `claude` CLI to improve workflow efficiency.
*   **Memory Management:** Features for local repo storage of memory directories, moving beyond absolute path constraints.
*   **Cost/Quota Clarity:** Discussions around weekly limit boosts and their integration into baseline usage, suggesting a desire for more predictable quota management.

## 6. Developer Pain Points
*   **MCP Schema Fragility:** Developers are experiencing silent failures when MCP server `inputSchema`s use complex JSON features (like `allOf`/`if`/`then` or non-object roots), causing entire servers or tools to be dropped without error messages.
*   **Configuration Resolution Inconsistencies:** Issues with Cowork sessions ignoring hooks/settings and Windows path casing splitting project keys in `~/.claude.json` highlight inconsistencies in how configuration is resolved across platforms and modes.
*   **UI/UX Friction in IDE/Desktop:** Locked panels in VS Code, unhandled rejections for binary files, and input box refilling bugs in the Desktop app create significant daily friction.
*   **Long-Session Reliability:** Problems with 1M-context sessions, including `ECONNRESET` errors on cold caches and post-compaction instruction drift, make long-running agentic workflows unstable.
*   **Language Consistency:** In multi-lingual environments, models drifting back to English after processing English tool output is a persistent frustration for non-English speakers.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### 1. Today's Highlights
OpenAI Codex shipped `rust-v0.156.1`, introducing GPT-6 Sol and GPT-6 Luna model options and updating rate-limit recommendations. The development push heavily targeted Windows platform stability, specifically addressing sandbox credential repairs and `STATUS_CONTROL_C_EXIT` crashes. A significant batch of PRs solidified the "Guardian" context management architecture and added new extension hooks for model and tool dispatching.

### 2. Releases
*   **rust-v0.156.1**: Added the ability to select GPT-6 Sol or GPT-6 Luna from the model picker; the rate-limit switch prompt now specifically recommends GPT-6 Luna. ([Changelog](https://github.com/openai/codex/compare/rust-v0.156.0...rust-v0.156.1))
*   **Alpha/Prerelease Activity**: Multiple alpha releases for `0.158.0`, `0.157.0`, and `0.155.0` were pushed, indicating rapid internal iteration ahead of stable releases.

### 3. Hot Issues
1.  **[#42215](https://github.com/openai/codex/issues/42215) Windows ChatGPT Work Project Sync Failure**: Reports context sync repeatedly failing at the filesystem stage. Highly relevant due to 38 active comments, indicating a major blockage for Windows users relying on local project context.
2.  **[#45626](https://github.com/openai/codex/issues/45626) Follow-up Messages Disabled After First Turn**: A critical Windows Desktop regression (v26.908.70816) where existing and new threads stop accepting messages after a turn completes. High visibility (30 comments) signals widespread adoption of the desktop app is currently hampered.
3.  **[#44342](https://github.com/openai/codex/issues/44342) Loading-Local-Config Blocking Chat Sends**: Users on Windows 26.903.8094.0 report messages hanging indefinitely on pending configuration states. Reloading the main window temporarily fixes it, but the state machine is clearly fragile.
4.  **[#47357](https://github.com/openai/codex/issues/47357) VS Code Server / Remote Web Activation Failures**: Codex Audio is strictly desktop-only, breaking remote/CI environments. Garnered 9 "thumbs up" as a blocker for remote development setups.
5.  **[#46744](https://github.com/openai/codex/issues/46744) Bundled Plugin Load Failure**: Windows 26.915.4065.0 fails to load openai-bundled plugins, disabling Browser, Computer Use, and Image Gen. A critical regression for core feature availability.
6.  **[#47043](https://github.com/openai/codex/issues/47043) Unrecognized `features.thread_tools` Settings**: The desktop app throws warnings about unknown session-flags. While minor, it highlights growing configuration surface complexity for developers trying to customize agent behavior.
7.  **[#42679](https://github.com/openai/codex/issues/42679) Browser Use Blocks Local File URLs**: Despite "Always allow" settings, the Browser tool blocks local `file://` URLs on macOS. Friction for developers using the browser tool for local testing loops.
8.  **[#47374](https://github.com/openai/codex/issues/47374) 0.156.0 Routing Regression**: Upgrading to 0.156.0 causes the selected workspace to go missing from routing discovery. Indicates recent CLI updates introduced regression bugs for Plus/Pro users.
9.  **[#46299](https://github.com/openai/codex/issues/46299) Windows Follow-up Hangs**: A similar but distinct bug from #45626 where follow-up messages get stuck in an infinite spinner; requires a clean reinstall. A serious usability issue affecting Windows users' trust in the desktop app.
10. **[#38198](https://github.com/openai/codex/issues/38198) MCP OAuth Refresh Permanently Disabled**: If an MCP connector's OAuth token refresh fails, there is no UI affordance to re-authenticate, permanently breaking that integration until a reinstall or manual hack.

### 4. Key PR Progress
*   **[#47695 Repair rejected Windows sandbox credentials](https://github.com/openai/codex/pull/47695)**: Ensures Windows sandbox setup explicitly validates stored account passwords and flags, addressing failures that previously appeared "complete" but failed at runtime logon.
*   **[#47689 & #47688 Make thread-owned Guardian context unconditional](https://github.com/openai/codex/pull/47689)**: Removes legacy session-level context capture in favor of thread-owned retained context, simplifying history management, fork handling, and approval freshness checks.
*   **[#47683 Add executor capability discovery V2 infrastructure](https://github.com/openai/codex/pull/47683)**: Introduces `capabilities/discoverV2` requests to executor metadata, allowing pre-warming of installed plugins and global skill locations at startup.
*   **[#47679 Add extension hooks for model requests and response streams](https://github.com/openai/codex/pull/47679)**: Adds `ModelRequestContributor` and `ModelResponseInterceptor`, enabling extensions to inject `client_metadata` or intercept specific model streams.
*   **[#47662 Expose tool dispatch and timing observations to extensions](https://github.com/openai/codex/pull/47662)**: Adds `on_tool_dispatch` and `on_tool_timing` hooks, allowing tool lifecycle observers to see calls rejected before execution, independent of tracing settings.
*   **[#47672 Fix no-reparse directory opens on Windows 10](https://github.com/openai/codex/pull/47672)**: Resolves a Windows 10 issue where `OBJ_DONT_REPARSE` rejected ordinary local-drive paths by using `QueryDosDeviceW` to resolve drive-letter aliases.
*   **[#47698 & #47696 WebSocket test server & lagged-event test stability](https://github.com/openai/codex/pull/47698)**: Fixes shutdown timeout issues in tests by using `tokio::select!` and immediately dropping unused command receivers, preventing deadlocks in test infrastructure.
*   **[#47670 Support model-specific descriptions for agent message board tools](https://github.com/openai/codex/pull/47670)**: Allows channel tool descriptions to dynamically follow the active model's catalog entries rather than hardcoded bundles, including model changes mid-turn.
*   **[#47663 Preserve managed network policy in route-aware transports](https://github.com/openai/codex/pull/47663)**: Prevents bypassing managed application network policies by forcing the use of `RouteAwareClientPool` when proxy handling or sandbox network restrictions are active.
*   **[#47665 Preserve early unified exec output in completion events](https://github.com/openai/codex/pull/47665)**: Captures the bounded completion transcript directly in `UnifiedExecProcess` so output produced *before* the streaming subscriber attaches is not lost.

### 5. Feature Request Trends
*   **Configuration Separation & Granularity**: Strong demand to decouple user-owned settings (like `config.toml`) from generated runtime/plugin state ([#45627](https://github.com/openai/codex/issues/45627)), as well as specific requests for granular control over TUI timestamps and formats ([#47676](https://github.com/openai/codex/issues/47676)).
*   **Extension & SDK Surface Expansion**: Users are actively exploring the new extension architecture, requesting better visibility into tool dispatch ([#47662](https://github.com/openai/codex/pull/47662) via PR) and model request streams ([#47679](https://github.com/openai/codex/pull/47679) via PR), and demanding remote/VS Code Server compatibility for core features ([#47357](https://github.com/openai/codex/issues/47357)).
*   **Tool Control & Transparency**: Requests to control how tools execute and are authorized, such as MCP resource overrides ([#47677](https://github.com/openai/codex/pull/47677) via PR) and ensuring approval callbacks are properly enforced ([#47692](https://github.com/openai/codex/issues/47692)).

### 6. Developer Pain Points
*   **Windows Desktop App Stability**: The most frequent and high-impact complaint cluster. Issues include app-server crashes (`STATUS_CONTROL_C_EXIT` - [#40231](https://github.com/openai/codex/issues/40231)), renderer state resetting active conversations ([#32917](https://github.com/openai/codex/issues/32917)), and systemic issues where follow-up messages hang or are disabled ([#45626](https://github.com/openai/codex/issues/45626), [#46299](https://github.com/openai/codex/issues/46299)).
*   **Windows Sandbox Configuration Friction**: Recurring failures with Windows sandbox setup, particularly involving WSL2 UNC paths ([#35380](https://github.com/openai/codex/issues/35380)), rejected credentials, and unclear error messaging that wastes user credits/time ([#46668](https://github.com/openai/codex/issues/46668)).
*   **Session & State Management Bugs**: Developers experience data-loss-style bugs where reverting messages can be restored via metadata refresh ([#47056](https://github.com/openai/codex/issues/47056)), and resumed conversations occasionally miss the final answer and report an interruption ([#47124](https://github.com/openai/codex/issues/47124)).

</details>