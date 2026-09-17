# AI CLI Tools Community Digest 2026-09-18

> Generated: 2026-09-17 17:22 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool Comparison Report: AI Developer CLI Ecosystem
**Date:** 2026-09-18

## 1. Ecosystem Overview
The AI CLI tool ecosystem is currently transitioning from simple chat interfaces to complex, sandboxed development environments, with both major players heavily investing in extension systems and operational stability. A significant portion of community feedback across both Claude Code and OpenAI Codex focuses on platform-specific reliability issues, particularly on Windows, where sandbox provisioning and update mechanisms remain fragile. Simultaneously, a strong demand for multi-account management and granular cost/limit visibility is emerging, reflecting a user base that is increasingly enterprise-oriented and power-user focused. The industry is moving toward deeper integration of "hooks" and extension systems (e.g., Claude's "Mods" vs. Codex's "Skills/Guardians") to enhance flexibility, though this complexity is introducing new bugs in state management and discovery.

## 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Tracked** | 10 | 10 |
| **PRs Tracked** | 4 | 10 |
| **Release Activity** | **v2.1.274** (Stable: Config/Safety fixes) | **0.155.0-alpha.12–16** (Rapid Alpha: Windows Sandbox/Guardian) |
| **Primary Focus** | Extension System ("Mods"), Memory/MCP Stability | Windows Sandbox Repair, Rate-Limit/Quota Bugs, Guardian Safety |

*Note: Counts reflect the specific high-signal items provided in the digest for the day.*

## 3. Shared Feature Directions

*   **Multi-Account & Workspace Switching:**
    *   **Claude Code:** High demand (378 upvotes) for supporting multiple Connector accounts in a single session to avoid context loss.
    *   **OpenAI Codex:** Strong request (22 upvotes) for in-app account/workspace switching without signing out.
    *   *Insight:* Both ecosystems are moving toward "pro-grade" workflows where users juggle multiple contexts.

*   **Infrastructure Control & Daemon Management:**
    *   **OpenAI Codex:** Introduction of `--no-daemon` flag and opt-in auto-start for background servers.
    *   **Claude Code:** Tunable MCP startup latency (`CLAUDE_CODE_MCP_STARTUP_WAIT_MS`) and safe restart mechanisms.
    *   *Insight:* Developers are demanding explicit control over background processes and startup overhead to integrate these CLIs into CI/CD or constrained environments.

*   **State Persistence & Caching Issues:**
    *   **OpenAI Codex:** Stale skill resolution bugs where new installs don't override old caches.
    *   **Claude Code:** Truncated skill descriptions and session data loss due to invisible cost limits.
    *   *Insight:* Both tools struggle with local state management, leading to inconsistent user experience between sessions or updates.

## 4. Differentiation Analysis

| Aspect | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Extension Model** | **"Mods" System:** Focus on making Claude "10x more extensible" via function hooks and pane-based UI integration. | **Guardian/Skills:** Focus on safety delegation (Guardian) and marketplace-based skill plugins. |
| **Platform Pain Point** | **macOS Resource Leaks:** Unbounded `rootfs.img` growth and memory warnings. | **Windows Sandbox Fragility:** Helper failures, registry cleanup, and permission inheritance on Win 10/11. |
| **User Base Signal** | **Power User/Enterprise:** Concerns about "Cost Transparency," subscription limits, and complex monorepo directory traversal. | **Developer/Productivity:** Concerns about "Capacity Limits," auto-resolution timeouts, and tiled/split-view UI. |
| **Technical Approach** | **Safety & Visibility:** Emphasis on visible warnings for memory/cost and explicit configuration for MCP. | **Atomicity & Performance:** Emphasis on atomic publishing of safety scores, reducing stack usage in TUI, and fast sandbox setup. |

## 5. Community Momentum & Maturity

*   **OpenAI Codex (Rapid Iteration):** The release cycle is faster, with 5 distinct alpha releases (`v0.155.0-alpha.12` to `alpha.16`) targeted specifically at fixing Windows sandbox issues and Guardian logic. This suggests a high-velocity iteration process focused on stabilizing the new architecture.
*   **Claude Code (Mature Ecosystem):** The activity is centered around a major architectural shift ("Mods") with 192 comments of feedback, indicating a large, engaged community shaping the next version. The presence of high-upvote issues (378 upvotes for multi-account) suggests a very active user base with deep needs.
*   **Maturity Indicator:** Both tools are maturing beyond "chat completion" into "agentic workspaces." Claude Code is dealing with the complexity of that shift (memory leaks, directory traversal), while Codex is dealing with the infrastructure of that shift (daemons, sandbox permissions).

## 6. Trend Signals

1.  **Windows is the New Bottleneck:** Both tools have significant, unresolved Windows-specific issues (Codex sandbox helpers, Claude update loops). As enterprise adoption grows, Windows reliability will be a primary differentiator for adoption.
2.  **Safety as a Feature, Not a Bug:** OpenAI's "Guardian" delegation and Claude's "Cyber Guardrails" (even when causing false positives) show that safety review is becoming a core, complex subsystem that impacts usability and speed.
3.  **Cost & Limit Transparency is Critical:** The "invisible handoff" problem (Claude) and "quota drain" bugs (Codex) are top-priority user complaints. Developers are no longer just measuring token count; they are measuring *effective utility per dollar* and are demanding transparent limit management.
4.  **From Monolithic to Modular:** The push for "Mods" in Claude and "Skills" in Codex indicates the end of the monolithic CLI era. The future will likely be defined by how well these tools support third-party extension marketplaces and local customization without breaking core stability.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of:** 2026-09-18
**Source:** [anthropics/skills](https://github.com/anthropics/skills)

## 1. Top Skills Ranking
*Note: The provided data does not include specific comment counts for Pull Requests (all listed as "undefined"), so ranking is based on activity level, recency, and thematic significance of the top 20 listed PRs.*

| Skill / Component | Functionality | Status | Highlights & Links |
| :--- | :--- | :--- | :--- |
| **skill-creator** | Meta-skill for generating and optimizing other skills. | [OPEN](https://github.com/anthropics/skills/pull/1298) | Active fixes addressing Windows runtime failures, trigger evaluation false misses, and YAML parsing issues. <br>• [PR #1298: Fix trigger evals & Windows](https://github.com/anthropics/skills/pull/1298)<br>• [PR #1769: Fix 0% recall reporting](https://github.com/anthropics/skills/pull/1769)<br>• [PR #539: YAML validation](https://github.com/anthropics/skills/pull/539) |
| **mcp-builder** | Tools for building and evaluating Model Context Protocol servers. | [OPEN](https://github.com/anthropics/skills/pull/1742) | Ongoing maintenance for compatibility with `mcp>=2.0.0` (import renames, custom headers) and default model updates to `claude-sonnet-5`. <br>• [PR #1742: Fix streamable_http_client](https://github.com/anthropics/skills/pull/1742)<br>• [PR #1724: Update default model](https://github.com/anthropics/skills/pull/1724) |
| **docx / office** | Document creation, editing, and redlining for Word/Excel/PowerPoint. | [OPEN](https://github.com/anthropics/skills/pull/1765) | Critical fixes for document corruption (bookmark ID collisions), UTF-8 decoding of diffs on non-UTF8 locales, and detecting orphaned comments. <br>• [PR #1765: UTF-8 decode redlining](https://github.com/anthropics/skills/pull/1765)<br>• [PR #541: Fix w:id collision](https://github.com/anthropics/skills/pull/541)<br>• [PR #1734: Detect orphaned comments](https://github.com/anthropics/skills/pull/1734) |
| **claude-api** | Reference skill for Claude API models and capabilities. | [OPEN](https://github.com/anthropics/skills/pull/1607) | Community is actively correcting outdated information regarding retired model IDs (e.g., `claude-opus-4-1`). <br>• [PR #1607: Mark retired models](https://github.com/anthropics/skills/pull/1607) |
| **pdf** | PDF generation and manipulation. | [OPEN](https://github.com/anthropics/skills/pull/538) | Fixing case-sensitivity mismatches in file references that break on Linux/macOS. <br>• [PR #538: Case-sensitive file refs](https://github.com/anthropics/skills/pull/538) |
| **frontend-design** | UI/UX design and frontend implementation guidance. | [OPEN](https://github.com/anthropics/skills/pull/210) | Improvement PR focused on clarity, actionability, and internal coherence to ensure instructions are followable in a single conversation. <br>• [PR #210: Improve clarity/actionability](https://github.com/anthropics/skills/pull/210) |
| **odt / odf** | OpenDocument Format creation, parsing, and conversion. | [OPEN](https://github.com/anthropics/skills/pull/486) | New community-proposed skill for creating, filling, and reading `.odt`/`.ods` files. <br>• [PR #486: Add ODT skill](https://github.com/anthropics/skills/pull/486) |

## 2. Community Demand Trends
Based on the most-commented Issues, the community is demanding:
*   **Security & Trust Boundaries:** The top issue ([#492](https://github.com/anthropics/skills/issues/492), 43 comments) highlights a critical demand for clear namespace separation between official Anthropic skills and community skills to prevent impersonation and unauthorized permission escalation.
*   **Enterprise/Team Sharing:** High demand ([#228](https://github.com/anthropics/skills/issues/228), 16 comments) for natively shareable skill libraries within an organization (Claude.ai), moving beyond manual file uploads.
*   **Skill Lifecycle Management:** Requests for meta-skills that analyze skill quality, security, and governance ([#83](https://github.com/anthropics/skills/pull/83), [#412](https://github.com/anthropics/skills/issues/412)), as well as "compact-memory" skills to manage context limits in long-running agent tasks ([#1329](https://github.com/anthropics/skills/issues/1329)).
*   **Performance/Context Optimization:** Urgent need to address skills that inject excessive tokens, such as the `claude-api` skill exhausting the context window ([#1487](https://github.com/anthropics/skills/issues/1487)).

## 3. High-Potential Pending Skills
Active, recently updated Pull Requests that indicate likely near-term integrations:
*   **Hivemind** ([PR #1628](https://github.com/anthropics/skills/pull/1628)): A multi-agent orchestration skill that delegates mechanical work to headless `opencode` workers on free models, preserving the main model's context.
*   **md2video-audio** ([PR #1703](https://github.com/anthropics/skills/pull/1703)): A zero-cost skill to compile Markdown directly into MP4 videos with voiceovers via Marp.
*   **proofcore-contract-auditor** ([PR #1771](https://github.com/anthropics/skills/pull/1771)): Web3 skill for static analysis of Solidity/Rust contracts and anchoring audit proofs to the TON blockchain.
*   **buffer-api** ([PR #1627](https://github.com/anthropics/skills/pull/1627)): A portable skill for managing social media scheduling via Buffer's GraphQL API across multiple AI agents.
*   **scnet-hpc** ([PR #1615](https://github.com/anthropics/skills/pull/1615)): Skill for operating High-Performance Computing clusters via SSH and Slurm workflows.
*   **pyxel** ([PR #525](https://github.com/anthropics/skills/pull/525)): Skill for retro game development in Python, including headless testing and frame inspection.

## 4. Skills Ecosystem Insight
The community's most concentrated demand at the Skills level is **enterprise-grade security, trust, and organization-wide sharing mechanisms**, alongside the urgent need to optimize token efficiency and fix foundational tooling bugs (like `skill-creator` and `mcp-builder`) to ensure the reliability of the agent ecosystem.

---

**Today's Highlights**
Community activity remains centered on the "Mods" extension system, which is nearing a shipping milestone after 192 comments of high-signal feedback, alongside critical operational fixes in v2.1.274 for memory warnings and MCP startup latency. On the stability front, developers are reporting severe platform-specific regressions, including a Windows update loop preventing app launch and a macOS memory leak in the local agent VM that silently consumes disk space.

**Releases**
**v2.1.274** introduced critical safety and configuration updates:
*   Added a visible warning and safe restart steps when memory usage is critical.
*   Introduced `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` to control how long the first non-interactive turn waits for MCP servers to connect (setting to `0` bypasses waiting).
*   Added an `effort` attribute to the `cl` command (details truncated in source).
[View Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.274)

**Hot Issues**
1.  **[FEATURE] Support multiple Connector accounts** [#27302](https://github.com/anthropics/claude-code/issues/27302)
    *   **Why it matters:** 378 upvotes highlight a critical lack of multi-account support for web-based connectors, forcing users to juggle sessions or lose context.
2.  **Mods - make Claude 10x more extensible** [#91870](https://github.com/anthropics/claude-code/issues/91870)
    *   **Why it matters:** The "Mods" extension proposal is shipping in weeks. 192 comments indicate active community collaboration is shaping the function hook design.
3.  **Windows desktop: stealth update leaves orphaned processes** [#89680](https://github.com/anthropics/claude-code/issues/89680)
    *   **Why it matters:** A blocking issue for Windows users; auto-updates leave old AppX containers active, causing error `0x80070020` and requiring a reboot to launch new versions.
4.  **skills/, agents/, commands/ should traverse parent directories** [#26489](https://github.com/anthropics/claude-code/issues/26489)
    *   **Why it matters:** 49 upvotes for a logical consistency fix; developers expect local resources to behave like `CLAUDE.md` by inheriting from parent directories.
5.  **AskUserQuestion dialog auto-submits on mouse click** [#71547](https://github.com/anthropics/claude-code/issues/71547)
    *   **Why it matters:** 22 upvotes for a UX bug where a single click confirms an answer without an explicit "Enter" or "Confirm" action, leading to unintended inputs.
6.  **Session-start skill listing silently truncates descriptions** [#81081](https://github.com/anthropics/claude-code/issues/81081)
    *   **Why it matters:** A visibility bug where the size budget truncates most skill descriptions, reducing discoverability of installed capabilities.
7.  **Claude desktop local-agent VM grows unboundedly** [#65577](https://github.com/anthropics/claude-code/issues/65577)
    *   **Why it matters:** The sandboxed `rootfs.img` in `~/Library/Application Support/Claude/vm_bundles/` is never reclaimed, causing out-of-space failures on macOS.
8.  **Cowork (macOS): new projects bind ONE folder only** [#92710](https://github.com/anthropics/claude-code/issues/92710)
    *   **Why it matters:** A regression since Sept 6 that breaks multi-folder projects; the UI silently removes the ability to link multiple documents/folders.
9.  **Hitting the weekly limit cost me a second subscription** [#93799](https://github.com/anthropics/claude-code/issues/93799)
    *   **Why it matters:** Cost visibility gap; users on Max subscriptions lose work mid-task because session costs are invisible and handoffs are not automated before limit resets.
10. **Monitor tool: doesn't respect persistent flag and timeout_ms** [#94393](https://github.com/anthropics/claude-code/issues/94393)
    *   **Why it matters:** 10 upvotes for a schema mismatch where the 1-hour timeout cap is ignored, and persistent flags fail, limiting long-running monitoring tasks to ~30 minutes.

**Key PR Progress**
*Note: Only 4 open PRs were provided in the source data; the digest reflects all available items.*

1.  **mods/diff: type openPane's answer as unknown** [#95198](https://github.com/anthropics/claude-code/pull/95198)
    *   **Description:** Updates the host contract for the diff mod so `openPane` returns `Promise<unknown>`. This allows the richer `$.ui.open` result object to compile against both current and next engine typings without breaking existing callers.
2.  **diff: the first edit opens the pane only when it has a file to list** [#94847](https://github.com/anthropics/claude-code/pull/94847)
    *   **Description:** Fixes the diff pane's auto-open behavior to prevent empty panes when editing files outside the repository, ignored files, or different worktrees. The pane now only opens when there is actually content to list.
3.  **fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents** [#87077](https://github.com/anthropics/claude-code/pull/87077)
    *   **Description:** Corrects invalid YAML parsing where dialogue lines in agent descriptions were interpreted as nested mappings. This ensures agents load with correct name, description, and model frontmatter.
4.  **diff: the prompt hint reads the viewport's layout through a type that may lack it** [#94843](https://github.com/anthropics/claude-code/pull/94843)
    *   **Description:** Resolves a typecheck failure in `mods/diff` where the prompt hint hook accessed `viewport.isFullscreen`. The fix ensures compatibility with engines where `RenderViewport` does not yet declare that field, while maintaining runtime correctness.

**Feature Request Trends**
*   **Multi-Environment & Multi-Account Support:** Strong demand for managing multiple accounts/connectors within a single session or web interface, particularly for enterprise or multi-project workflows.
*   **Advanced Customization (Mods/Plugins):** The community is actively shaping the "Mods" extension system, with specific interest in function hooks and making Claude 10x more extensible.
*   **Cost Transparency & Limit Management:** Users are requesting better visibility into session costs and automated handoff mechanisms when approaching or hitting subscription limits.
*   **Directory Hierarchy Consistency:** A recurring request for `skills/`, `agents/`, and `commands/` to traverse parent directories, matching the behavior of `CLAUDE.md` for monorepos.
*   **Cross-Platform Hook Consistency:** Demand for hooks (specifically path-guard and shell execution) to behave identically on Windows and Linux, currently causing shared config files to fail on one platform.

**Developer Pain Points**
*   **Windows Instability:** A cluster of issues points to significant Windows reliability problems, including installation hangs with zero network activity, hook execution failures when `pwsh` is missing, and update processes that leave orphaned system resources.
*   **macOS Resource Leaks:** The local agent VM and desktop app are causing disk space exhaustion due to unbounded growth of `rootfs.img` and lack of reclamation mechanisms.
*   **Session Management Friction:** Users are losing work due to lack of automatic handoffs when limits are hit, and "Esc" key behavior in agent views is irrecoverably killing background subagents.
*   **Security Guardrail False Positives:** Legitimate defensive security tooling (domain trust auditing, subdomain takeover detection) is triggering cyber guardrails, blocking valid research workflows.
*   **Plugin/State Removal:** Account-synced plugins and knowledge-work plugins cannot be effectively removed or disabled from any surface (CLI or Desktop), leading to persistent unwanted configurations.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## 1. Today's Highlights
The community focus remains heavily centered on **Windows sandbox and provisioning stability**, with multiple active issues and corresponding PRs addressing helper failures, registry cleanup, and permission inheritance. Simultaneously, users are reporting widespread **rate-limit and capacity errors** on Pro/Plus accounts, describing consistent "Selected model is at capacity" or unusual usage drains. **Guardian delegation and TUI performance** are also undergoing significant refinements to improve safety review context and reduce stack usage.

## 2. Releases
Several alpha releases for `codex-cli` were published on the 0.155.0 branch:
*   **rust-v0.155.0-alpha.16** - Latest alpha build.
*   **rust-v0.155.0-alpha.15** - Alpha build.
*   **rust-v0.155.0-alpha.14** - Alpha build.
*   **rust-v0.155.0-alpha.13** - Alpha build.
*   **rust-v0.155.0-alpha.12** - Alpha build.
*   **rust-v0.155.0-alpha.2.6** - Alpha build.

## 3. Hot Issues
1.  [#25178] **Windows Computer Use screenshot fails on Windows 10 22H2**
    A highly engaging issue (65 comments, 27 👍) detailing how `SetIsBorderRequired` calls fail on Windows 10 22H2, blocking Computer Use screenshots despite basic window activation working.
2.  [#29702] **Add a setting to disable timed auto-resolution**
    A strong feature request (40 👍) for users to prevent the app from automatically resolving AI questions after a timeout, allowing longer thinking times.
3.  [#30684] **Add account/workspace switching support**
    A widely upvoted request (22 👍) to support quick switching between multiple accounts or workspaces rather than signing out and back in.
4.  [#41779] **Local API launch rejected with "blocked by policy"**
    A critical bug where Codex Desktop rejects local development API launches through `exec_command` with a policy block before the command even executes.
5.  [#44736] **Windows ChatGPT project prewarming locks local mirrors**
    A complex setup issue where desktop startup erases workarounds, and project prewarming locks `node_repl` working directories, causing persistent startup failures.
6.  [#45613] **GPT-5.3-Codex-Spark quota visible but model unavailable**
    Users are reporting that their Pro accounts show quota for `gpt-5.3-codex-spark`, but the model itself cannot be selected or used in Codex.
7.  [#46185] & [#46231] **Account-level "Selected model is at capacity" errors**
    Multiple Pro accounts are experiencing 100% failure rates with "at capacity" errors across all models. Cross-over testing suggests the block is account-scoped rather than machine or network-related.
8.  [#45073] **Severe 5-hour usage drain**
    A Plus user reports that 86% of their 5-hour usage quota was consumed in just 26 minutes with only 2 prompts, indicating a potential billing or token-consumption bug.
9.  [#44696] **Windows sandbox helper fails with `helper_unknown_error`**
    A persistent bug affecting Windows 11 where every `exec_command` and even plain file reads fail during sandbox initialization due to setup refresh errors.
10. [#30993] **$skill invocation resolves stale cached plugin skill**
    Users who install newer marketplace versions (like Superpowers) are experiencing "stale" behavior where the CLI still resolves old cached skills, conflicting with the new version.

## 4. Key PR Progress
1.  [#46241] **Repair Windows sandbox access to existing runtime children**
    Fixes an issue where read/execute access at the root directory did not correctly inherit permissions for files and subdirectories, making them inaccessible to the sandbox.
2.  [#46239] **Prefer the provisioning service for automatic Windows sandbox setup**
    Updates the setup flow to prioritize the installed provisioning service over the elevated helper, falling back only when the service is unavailable to improve reliability.
3.  [#46237] **Improve Windows sandbox error details and registry cleanup**
    Enhances provisioning by including underlying error chains in failure logs and ensures empty registry keys are properly cleaned up during legacy installation removal.
4.  [#46245] **Publish Guardian cached scores and coverage atomically**
    Resolves an inconsistency where approval checks could read out-of-sync risk scores and tool-call coverage. Now, the score, authorization, and coverage are published atomically.
5.  [#46122] **Route filesystem reads and writes by their own sandbox permissions**
    Optimizes sandboxing by decoupling read permissions from write restrictions, preventing permitted reads from failing when the sandbox is unavailable for writes.
6.  [#46107] **Box app-server request handler futures to reduce stack usage**
    Addresses a performance bottleneck by using `Box::pin` for request handling, significantly reducing stack temporaries and memory usage during high-queue scenarios.
7.  [#46117] **Add opt-in automatic background server startup**
    Introduces `features.daemon_auto_start`, allowing the shared local server to automatically start for eligible sessions, with a fallback to prevent forced startup on incompatible systems.
8.  [#46125] **Fix daemon socket isolation checks for private tmp mounts**
    Resolves a Linux sandbox bug where private `/tmp` bind mounts caused false-positive rejection of safe socket isolation layouts during preflight checks.
9.  [#46179] **Include sender user messages in Guardian delegation reviews**
    Updates the safety engine to capture context from the sender's user messages, ensuring Guardian has full context when reviewing delegated tasks in receiving threads.
10. [#46088] **Add `--no-daemon` to bypass the shared background server**
    Adds a new CLI flag to explicitly prevent the startup or probing of the shared background server, ensuring isolated execution even if a daemon is already running.

## 5. Feature Request Trends
*   **Multi-account & Workspace Management:** Strong demand for in-app account switching and clearly identifying which workspace is active.
*   **Granular UI & Interaction Control:** Requests to disable timed auto-resolution for prompts and to support tiled/split-view for multiple independent chats.
*   **Opt-in Infrastructure Features:** Demand for more control over the daemon (e.g., `--no-daemon`) and background server behaviors.
*   **Custom Tool/Skill Resolution:** Users want better ways to manage skill discovery, including symlink support and explicit uninstalls for stale plugins.

## 6. Developer Pain Points
*   **Windows Sandbox Fragility:** A high volume of issues (e.g., #44696, #44736, #32315) highlight that Windows sandboxing is prone to path-length limits, registry errors, and permission inheritance failures.
*   **Capacity & Rate-Limit Uncertainty:** Pro/Plus users are struggling with unexplained "at capacity" errors and massive, sudden drops in their weekly or 5-hour usage quotas.
*   **Stale Caching:** The combination of skill marketplace updates and plugin resolution is leading to developers using outdated logic instead of their newly installed versions.
*   **Session Persistence Bugs:** Reports of "failed to read thread" (CRC errors) and hooks silently failing when working directories are deleted are disrupting long-form workflows.

</details>