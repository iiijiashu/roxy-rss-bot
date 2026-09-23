# AI CLI Tools Community Digest 2026-09-23

> Generated: 2026-09-23 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

**Cross-Tool Comparison Report: AI CLI Ecosystem**
**Date:** 2026-09-23

### 1. Ecosystem Overview
The AI CLI tool landscape is characterized by rapid iteration and a strong focus on security hardening, particularly in sandboxing and network policy enforcement. Both major providers are transitioning from basic command-line interfaces to rich TUI experiences with integrated voice capabilities, signaling a shift toward more immersive, multi-modal development environments. Community feedback highlights significant platform-specific friction, especially regarding Windows sandbox initialization and macOS shell mismatches, indicating that cross-platform consistency remains a key differentiator. Simultaneously, both ecosystems are grappling with the integrity of long-running agent sessions, addressing data loss in context compaction and transcript reliability to support autonomous workflows.

### 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Tracked** | 10 | 10 |
| **Key PRs Tracked** | 1 | 10 |
| **Release Status** | Stable (v2.1.280) | Stable (v0.156.0) + 8 Alpha releases |
| **Primary Focus** | Model integration (Opus 5.5), UI fixes | Security hardening, Voice TUI, Windows stability |

*Note: Counts reflect items explicitly detailed in the provided 2026-09-23 digest summaries.*

### 3. Shared Feature Directions

*   **Configuration & Context Management:**
    *   **Custom Instruction Files:** Both communities demand support for `AGENTS.md` alongside proprietary files (e.g., `CLAUDE.md`). Claude Code merged a PR to read `AGENTS.md`, while Codex users are advocating for a `/learn` command and "rule metabolism" in `AGENTS.md` for long-term project memory.
    *   **Worktree & Path Flexibility:** Claude Code users request configurable worktree directories to enforce sibling conventions, while Codex users report issues with worktree ACLs blocking Git operations after updates.
*   **Windows Environment Stability:**
    *   **Sandbox & Setup:** Both tools face critical friction on Windows. Codex users report `helper_unknown_error` and stuck UAC prompts in its MSIX/sandbox implementation. Claude Code users face fchmod errors in VM shared folders and worktree lock leaks.
    *   **Shell & Terminal Integration:** Codex highlights TUI usability issues (e.g., mouse selection in Kitty), while Claude Code reports a critical regression in VS Code WSL2 affecting dictation/paste and shell mismatches (zsh vs. bash on macOS).
*   **Security & Network Policies:**
    *   **Network Enforcement:** Codex is actively enforcing network policies across HTTP/WebSocket requests and bounding inbound requests. Claude Code is navigating security friction related to "cyber-safeguard" false positives and CVP approval delays.

### 4. Differentiation Analysis

*   **Model & Pricing Strategy:**
    *   **Claude Code:** Focuses on model integration and economic efficiency, introducing Claude Opus 5.5 with a 1M token context and optimized cache pricing.
    *   **OpenAI Codex:** Focuses on model catalog evolution, preparing for GPT-6 (Sol/Luna) and retiring GPT-5.4, alongside enabling voice conversations by default.
*   **User Interface & Modality:**
    *   **Claude Code:** Prioritizes traditional TUI enhancements (fullscreen mouse support) and desktop app usability (always-on-top fixes, usage indicators).
    *   **OpenAI Codex:** Pushing a new "Optional Fullscreen TUI" mode with transcript search and mouse selection, heavily integrating voice as a primary input method with continuous dictation requests.
*   **Technical Approach:**
    *   **Claude Code:** Addresses regressions in daemon-based background sessions and monitor timeouts.
    *   **OpenAI Codex:** Focuses on deep security hardening (sandbox object access, proxy fallbacks) and fixing data integrity in context compaction (preventing transcript destruction).

### 5. Community Momentum & Maturity

*   **Active Community & Engagement:**
    *   **Claude Code:** High engagement on specific pain points, with the "Multiple Connector accounts" issue garnering 387 upvotes, indicating a mature user base demanding account management flexibility.
    *   **OpenAI Codex:** High comment volume on RFCs (e.g., 31 comments on Self-Evolving Agents) and critical bugs (e.g., 33 comments on Chrome plugin blocks), suggesting a community deeply involved in both feature design and troubleshooting complex edge cases.
*   **Iteration Speed:**
    *   **OpenAI Codex:** Demonstrates higher rapid iteration velocity with 8 alpha releases pushed within 24 hours, signaling an aggressive development cadence for the next stable train.
    *   **Claude Code:** Releases appear more spaced out, with a focus on stable patches and regression fixes for specific environments (WSL2, macOS).

### 6. Trend Signals

*   **Shift to Long-Term Agent Context:** The community's push for `AGENTS.md` metabolism and `/learn` commands indicates a trend away from ephemeral sessions toward persistent, self-improving agent memory for multi-week projects.
*   **Security as a First-Class Feature:** Both tools are maturing their security models, with Codex explicitly enforcing network policies and sandbox boundaries, and Claude Code dealing with the consequences of security safeguards. This signals that enterprise-grade security is becoming a baseline expectation.
*   **Multi-Modal & Voice Integration:** The default enablement of voice in Codex and the regression in Claude's dictation support highlights that voice-to-text is becoming a core UX layer, not just an experimental feature.
*   **Platform Fragmentation Risks:** The cluster of Windows-specific failures (MSIX, UAC, ACLs) in Codex and WSL2/macOS issues in Claude Code suggests that cross-platform CLI tools are becoming increasingly complex, requiring dedicated platform engineering to maintain parity.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-09-23 | Source: [anthropics/skills](https://github.com/anthropics/skills)*

### 1. Top Skills Ranking
*Note: The provided PR dataset indicates a "Comments: undefined" count for the top 20 PRs sorted by comments. The following analysis identifies the most significant open PRs based on recent activity, complexity, and relevance to core ecosystem workflows.*

1.  **fix(skill-creator): Isolate Trigger Evals & Handle Runtime Failures** ([PR #1298](https://github.com/anthropics/skills/pull/1298))
    *   **Functionality:** Addresses false misses in trigger evaluation and fixes `select()` subprocess failures on Windows. Ensures runtime failures are not misclassified as "non-triggers," which previously skewed optimization data.
    *   **Status:** Open. Active since June 2026, updated September 2026.
2.  **mcp-builder: Support `mcp>=2` Streamable HTTP Client** ([PR #1742](https://github.com/anthropics/skills/pull/1742))
    *   **Functionality:** Updates `mcp-builder` to align with `mcp>=2.0.0` API changes (renaming `streamablehttp_client` to `streamable_http_client` and custom header configuration). Fixes broken integration with modern MCP servers.
    *   **Status:** Open. High relevance for MCP tooling users.
3.  **fix(docx): Create `document.xml.rels` When Missing** ([PR #1790](https://github.com/anthropics/skills/pull/1790))
    *   **Functionality:** Fixes a defect where `comment.py` failed to create `word/_rels/document.xml.rels` if missing, causing comment registration to fail. Registers four critical comment relationships (`rId1`-`rId4`).
    *   **Status:** Open. Recent activity (Sept 2026).
4.  **Add `md2video-audio` Skill** ([PR #1703](https://github.com/anthropics/skills/pull/1703))
    *   **Functionality:** A zero-cost skill that compiles Markdown into MP4 videos with voiceovers using Marp. Bridges the gap between text documentation and video content.
    *   **Status:** Open.
5.  **fix(skill-creator): Trigger Detection Reporting 0% Recall** ([PR #1769](https://github.com/anthropics/skills/pull/1769))
    *   **Functionality:** Fixes a critical bug where `skill-creator` reported `recall=0%` for all skills due to evaluation loop flaws, leading to incorrect description optimization.
    *   **Status:** Open.
6.  **Add `blast-radius` Skill** ([PR #1776](https://github.com/anthropics/skills/pull/1776))
    *   **Functionality:** A checklist for pre-execution safety checks on bulk/ destructive operations (archiving, deleting, revoking access). Focuses on "blast radius" classification before writes.
    *   **Status:** Open.
7.  **Add `scnet-hpc` Skill** ([PR #1615](https://github.com/anthropics/skills/pull/1615))
    *   **Functionality:** Specialized skill for operating SCNet HPC clusters via profile-based SSH and Slurm workflows, including resource discovery and job generation.
    *   **Status:** Open.
8.  **Fix PDF Case-Sensitive File References** ([PR #538](https://github.com/anthropics/skills/pull/538))
    *   **Functionality:** Corrects 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (e.g., `REFERENCE.md` → `reference.md`) to prevent breakage on Linux/macOS.
    *   **Status:** Open. Long-standing (created March 2026).

### 2. Community Demand Trends
*Distilled from high-comment Issues:*

*   **Security & Trust Boundaries:** [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) highlights a critical demand for **namespace integrity**. The community is alarmed by community skills distributing under the `anthropic/` namespace, causing trust boundary abuse. There is strong demand for clear labeling of official vs. community skills.
*   **Context Window Efficiency:** [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports that the `claude-api` skill injects ~156k tokens, exhausting context. This drives demand for **modular, lazy-loading skills** and strict token budget enforcement.
*   **Evaluation & Testing Reliability:** [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments) and [Issue #1390](https://github.com/anthropics/skills/issues/1390) indicate a major pain point in **automated skill validation**. `run_eval.py` and `mcp-builder` evaluation harnesses are failing to trigger skills or scoring MCP servers correctly (0/N). The community wants reliable, CI-friendly testing infrastructure.
*   **Enterprise Sharing & Management:** [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments) calls for **org-wide skill sharing** features within Claude.ai to replace manual file uploads.
*   **Code Quality & Safety:** [Issue #1385](https://github.com/anthropics/skills/issues/1385) proposes a "Reasoning Quality Gate Pipeline" for adversarial review and delivery verification, reflecting demand for **AI output governance** skills.

### 3. High-Potential Pending Skills
*Active-comment PRs not yet merged that may land soon:*

*   **`proofcore-contract-auditor`** ([PR #1771](https://github.com/anthropics/skills/pull/1771)): Adds automated static analysis for Solidity/Rust smart contracts with cryptographic proof anchoring on TON Blockchain. Targets Web3 security.
*   **`awt` (AI Watch Tester)** ([PR #822](https://github.com/anthropics/skills/pull/822)): An E2E testing skill that provides Claude with vision and browser control for zero-code test generation. High utility for frontend QA.
*   **`testing-patterns`** ([PR #723](https://github.com/anthropics/skills/pull/723)): A comprehensive skill covering testing philosophy, unit testing (AAA), and React component testing. Aims to standardize best practices in code generation.
*   **`document-typography`** ([PR #514](https://github.com/anthropics/skills/pull/514)): Focuses on typographic quality control for generated documents (orphan/widow prevention, numbering alignment). Enhances professional output quality.
*   **`odt` (OpenDocument)** ([PR #486](https://github.com/anthropics/skills/pull/486)): Enables creation, filling, and parsing of ODT/ODS files, expanding document support beyond DOCX/PDF.

### 4. Skills Ecosystem Insight
The community's most concentrated demand is for **robust security boundaries and reliable automated evaluation infrastructure**, as current gaps in namespace trust and validation tooling undermine the scalability and safety of the skill ecosystem.

---

# Claude Code Community Digest: 2026-09-23

### 1. Today's Highlights
The release of **v2.1.280** introduces **Claude Opus 5.5** as the default Opus model, offering a 1M token context window with optimized cache read pricing. The community is actively troubleshooting a regression in **2.1.269** affecting voice dictation tools in VS Code WSL2 environments, alongside high-priority demands for multi-account connector support.

### 2. Releases
*   **v2.1.280**:
    *   Added **Claude Opus 5.5** (`claude-opus-5-5`) as the default Opus model.
    *   New pricing: $4/Mtok input, $20/Mtok output, $0.20/Mtok cache reads.
    *   Enhanced fullscreen mouse support: scrolling in `/skills` list and clicking state options in `/plugin`.
    *   [View Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.280)

### 3. Hot Issues
1.  **[#27302] Support multiple Connector accounts** [Enhancement]
    *   **Why it matters:** The most upvoted issue (387 👍), addressing the inability to use the same connector with different accounts simultaneously.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/27302)
2.  **[#89467] Windows: app window always-on-top** [Bug]
    *   **Why it matters:** A persistent UI frustration on Windows where the desktop app cannot be disabled from staying above other windows.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/89467)
3.  **[#76694] Cowork: "Choose a folder" lost** [Bug]
    *   **Why it matters:** Regression in the Cowork feature where the folder selection context menu was replaced by an upload-only menu, hindering project context setup.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/76694)
4.  **[#93782] Dictation tool paste regression in VS Code WSL2** [Bug]
    *   **Why it matters:** Critical regression in v2.1.269 where simulated Ctrl+V (used by voice dictation) fails to insert text in the VS Code integrated terminal.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/93782)
5.  **[#27282] Configurable worktree directory location** [Enhancement]
    *   **Why it matters:** Developers want to enforce the sibling directory convention for worktrees rather than inside the main repository.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/27282)
6.  **[#65051] Background sessions drop text blocks** [Bug]
    *   **Why it matters:** A regression in daemon-based background sessions (v2.1.160+0) where mixed text/tool_use responses lose the text portion in the transcript.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/65051)
7.  **[#94553] Monitor tool capped at 30 minutes** [Bug]
    *   **Why it matters:** `persistent: true` monitors are now silently capping out at 30 minutes in v2.1.26x, breaking long-running watch operations.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/94553)
8.  **[#91498] `Bash` tool executes zsh on macOS** [Bug]
    *   **Why it matters:** The tool claims to run bash but actually executes the user's login shell (e.g., zsh), causing LLM confusion with bash-specific idioms.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/91498)
9.  **[#80261] Show usage limits on main screen** [Enhancement]
    *   **Why it matters:** Users request a persistent indicator in the desktop app to monitor their remaining usage limits without diving into settings.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/80261)
10. **[#95566] Native binary hangs on VMs with kvm64 CPU** [Bug]
    *   **Why it matters:** The native Linux binary hangs at 100% CPU on VMs lacking SSE4/POPCNT instructions, requiring a pre-flight CPU feature check.
    *   [Issue Link](https://github.com/anthropics/claude-code/issues/95566)

### 4. Key PR Progress
*   **Note:** Only 1 PR was updated in the last 24h within the provided dataset.
1.  **[#95409] AGENTS.md project-instructions mod** [Closed]
    *   **Description:** Adds the source for the `agents-md` mod, allowing it to read `AGENTS.md` similarly to how the engine reads `CLAUDE.md` under the `instructionFiles` option.
    *   [PR Link](https://github.com/anthropics/claude-code/pull/95409)

### 5. Feature Request Trends
*   **Configuration Flexibility:** Strong demand for configurable paths (worktree locations) and global configuration support for `AGENTS.md` alongside project-level.
*   **Account & Usage Management:** Requests to gift/pool unused usage limits and support for multiple connector accounts.
*   **UI/UX Visibility:** Persistent usage indicators in the desktop app and improved sidebar grouping logic for sessions.
*   **Plugin Ecosystem:** Requests for plugin-provided inline autocomplete triggers (e.g., `#` for issues).

### 6. Developer Pain Points
*   **Platform Specific Regressions:** Significant issues on **Windows** (always-on-top window, worktree lock leaks on exit, VM shared folder fchmod errors) and **macOS** (zsh vs bash shell mismatch).
*   **VS Code Integration Breakage:** Regression in WSL2 environments affecting dictation/paste functionality and session exit lock handling.
*   **Background/Daemon Reliability:** Loss of transcript data in background sessions and persistent monitor timeouts.
*   **Security & Auth Friction:** CVP approval delays and "cyber-safeguard" false positives blocking legitimate personal account usage.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex Community Digest (2026-09-23)

### 1. Today's Highlights
OpenAI released Codex CLI v0.156.0, introducing an optional fullscreen TUI mode and enabling voice conversations by default. A wave of new alpha releases (v0.157.0-alpha.3 through alpha.10) signals rapid iteration on upcoming features. Significant engineering effort is visible in PRs focusing on Windows sandbox security, network policy enforcement, and voice conversation stability across TUI threads.

### 2. Releases
- **[rust-v0.156.0](https://github.com/openai/codex/releases/tag/rust-v0.156.0)**:
  - **New Features**: Optional fullscreen UI via `/tui` command, including transcript search, mouse selection, and right-click copying ([#46732](https://github.com/openai/codex/pull/46732), [#46734](https://github.com/openai/codex/pull/46734), [#46883](https://github.com/openai/codex/pull/46883), [#46895](https://github.com/openai/codex/pull/46895)).
  - **Voice**: Enabled by default with F8 toggle, `/voice settings` picker, and bundled audio support.
- **Alpha Releases**: v0.157.0-alpha.3 through alpha.10 were pushed within the last 24 hours, indicating active development of the next stable train.

### 3. Hot Issues
1.  **[#29343: Chrome plugin/browser refuses to interact with certain sites](https://github.com/openai/codex/issues/29343)** (33 comments, 👍 12): A critical safety-computer-use bug where Codex silently blocks specific websites. High community engagement indicates widespread impact on browser automation workflows.
2.  **[#40575: RFC: Self-Evolving Agents & Instruction Distillation](https://github.com/openai/codex/issues/40575)** (31 comments): A detailed proposal for `/learn` and `AGENTS.md` rule metabolism. Gaining traction among power users looking for long-term context management for multi-week projects.
3.  **[#42739: Windows desktop update removes local projects from sidebar](https://github.com/openai/codex/issues/42739)** (26 comments): A significant UX regression where projects vanish after desktop updates, causing anxiety about data persistence and workspace integrity.
4.  **[#44696: Windows sandbox helper fails with `helper_unknown_error`](https://github.com/openai/codex/issues/44696)** (16 comments): A blocking bug preventing `exec_command` and file reads on Windows 11, disrupting core CLI functionality for a large user base.
5.  **[#32492: Windows setup stuck on "Finish Windows setup"](https://github.com/openai/codex/issues/32492)** (16 comments, 👍 5): A persistent onboarding failure where the UAC prompt never triggers, leaving users unable to complete initial setup.
6.  **[#44398: TUI sparkle animation prevents mouse text selection in kitty](https://github.com/openai/codex/issues/44398)** (14 comments, 👍 16): A recently closed bug where decorative animations interfered with terminal interaction. High upvotes show sensitivity to TUI usability.
7.  **[#40550: Windows app setup fails with `helper_failed`](https://github.com/openai/codex/issues/40550)** (14 comments): Another variation of the Windows setup/access-denied issue, highlighting instability in the Windows MSIX packaging.
8.  **[#19984: TUI loses active turn timer after state replay](https://github.com/openai/codex/issues/19984)** (10 comments): A session persistence bug where the timer resets or misreports, confusing users monitoring long-running tasks.
9.  **[#32880: Git writes stopped after Windows desktop update](https://github.com/openai/codex/issues/32880)** (9 comments): A regression where `workspace-write` ACLs block Git operations in linked worktrees, breaking autonomous coding workflows.
10. **[#44363: Context compaction permanently destroys conversation transcript](https://github.com/openai/codex/issues/44363)** (9 comments): A severe data-loss bug where rewriting stored rollouts in place makes historical context unrecoverable.

### 4. Key PR Progress
1.  **[#47385: Add GPT-6 Sol and Luna to model catalog](https://github.com/openai/codex/pull/47385)**: Prepares the platform for new GPT-6 model tiers, including migrations from GPT-5.x variants and retiring GPT-5.4 models.
2.  **[#47398: Hotfix 0.155.0-alpha.16 - System proxy fallback](https://github.com/openai/codex/pull/47398)**: Fixes enterprise login failures by enabling `features.system_proxy_fallback` to handle endpoints reachable only through system proxies.
3.  **[#47389: Enforce network policy throughout HTTP/WebSocket requests](https://github.com/openai/codex/pull/47389)**: Strengthened security to ensure destination restrictions and policy revocations survive redirects and WebSocket traffic.
4.  **[#47381: Keep voice conversations running across TUI thread navigation](https://github.com/openai/codex/pull/47381)**: Improves voice UX by allowing users to switch threads without interrupting an active voice call.
5.  **[#47361: Restrict Windows sandbox default object access](https://github.com/openai/codex/pull/47361)**: A security hardening fix preventing shared filesystem capabilities from granting access to other logon sessions' IPC objects.
6.  **[#47365: Resume model context from the latest compaction boundary](https://github.com/openai/codex/pull/47365)**: Fixes context restoration to prevent loading stale state from before a compaction event, addressing issues like #44363.
7.  **[#47362: Bound inbound exec-server requests](https://github.com/openai/codex/pull/47362)**: Adds an 8 KiB limit for messages across all transports to prevent resource exhaustion from malformed requests.
8.  **[#47399: Respect tmux mouse settings in fullscreen](https://github.com/openai/codex/pull/47399)**: Ensures Codex's fullscreen UI does not enable mouse capture if the hosting tmux session has mouse support disabled.
9.  **[#47393: Retry transient OpenAI file blob upload failures](https://github.com/openai/codex/pull/47393)**: Adds retry logic for `503` and connection errors during file uploads, improving reliability for large file attachments.
10. **[#47375: Add opt-in preference for local MXC sandbox](https://github.com/openai/codex/pull/47375)**: Introduces `features.prefer_mxc` to allow local Windows execution when native support is available and network settings permit.

### 5. Feature Request Trends
- **Self-Evolving Agents & Memory**: Strong demand for `/learn` commands and automatic rule metabolism in `AGENTS.md` to handle complex, long-term project context ([#40575](https://github.com/openai/codex/issues/40575)).
- **Continuous Voice Dictation**: Users are requesting a "hands-free" dictation mode where audio is transcribed and processed as prompts without manual stop/start signals ([#47396](https://github.com/openai/codex/issues/47396)).
- **Advanced TUI Controls**: Requests for better remote/touch support in the new fullscreen TUI, including scroll behaviors on remote swipe ([#47372](https://github.com/openai/codex/issues/47372)).

### 6. Developer Pain Points
- **Windows Sandbox Instability**: A cluster of issues (#44696, #32492, #40550, #47383) highlights severe problems with Windows sandbox initialization, UAC prompts, and MSIX packaging, blocking users from using core CLI features.
- **Context & Transcript Integrity**: Users are frustrated by context compactions destroying history (#44363) and session timers/state losing accuracy (#19984), undermining trust in long-running agent sessions.
- **Browser & Computer Use Restrictions**: Ongoing issues with safety checks blocking legitimate sites (#29343) and plugin loading failures on Windows (#46744) limit the utility of computer-use capabilities.

</details>