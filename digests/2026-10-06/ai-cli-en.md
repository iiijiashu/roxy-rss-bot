# AI CLI Tools Community Digest 2026-10-06

> Generated: 2026-10-06 00:20 UTC | Tools covered: 2

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## 1. Ecosystem Overview
The AI CLI tools landscape in early October 2026 is characterized by a maturing shift from basic code generation to complex autonomous agent orchestration and multi-device workflow integration. Both Claude Code and OpenAI Codex are aggressively addressing the stability challenges inherent in long-running agent sessions, specifically focusing on context preservation, session persistence, and automated maintenance transparency. While Claude Code emphasizes granular hook observability and plugin security to manage subagent actions, OpenAI Codex is prioritizing cross-platform environment propagation (particularly for Windows and Unix remote MCP servers) and robust "Dots" orchestration. The ecosystem is currently grappling with the side effects of automated "stealth" operations, such as idle auto-compaction and background updates, which are causing silent data loss and session drops, prompting intense community discussion around user consent and control.

## 2. Activity Comparison

| Metric | Claude Code | OpenAI Codex |
| :--- | :--- | :--- |
| **Issues Count** | 10 Hot Issues | 10 Hot Issues |
| **PR Count** | 2 Active PRs | 10 Active PRs |
| **Release Status** | **v2.1.290** (Stable) | **v0.160.1** (Stable) <br> **v0.162.0-alpha.14–16** (Alpha) |
| **Primary Focus** | Hook observability & plugin security | Windows stability & env variable preservation |

*Note: Claude Code reported significantly lower PR activity (2 slots filled vs. 10), indicating a period of refactoring or internal stabilization, whereas OpenAI Codex is undergoing intensive internal refactoring with high-frequency commits.*

## 3. Shared Feature Directions
*   **Session Persistence & Context Control:** Both communities are demanding granular control over automated context management. Claude Code users are requesting opt-outs for "idle auto-compaction" to prevent silent data loss ([#98747]), while OpenAI Codex users are reporting "goal-coherence failure" where agents lose track of objectives over long sessions ([#51187]).
*   **Cross-Device & Remote Management:** There is a shared trend toward managing remote or distributed work. Claude Code is pushing mobile-centric features to launch desktop sessions remotely ([#96867]), while OpenAI Codex is enhancing "Dots" orchestration for local/cloud context sharing and remote MCP server management.
*   **Security & Safety Flexibility:** Both tools face friction from over-restrictive safety classifiers. Claude Code users want permission-gated local authentication (e.g., typing passwords) for test environments ([#78160]), while OpenAI Codex users report legitimate defensive security work being blocked by broad safety checks ([#34231]).

## 4. Differentiation Analysis
*   **Technical Approach:**
    *   **Claude Code** is differentiating through **observability and plugin architecture**, introducing specific data points (e.g., `serverToolUses`, `agentId`) to distinguish subagent actions and enforce organizational security policies over individual plugin installs.
    *   **OpenAI Codex** is differentiating through **environment robustness and multi-agent orchestration**, focusing on fixing platform-specific variable propagation (e.g., `SystemRoot` for MCP servers) and enhancing "Dots" for complex, multi-step task coordination.
*   **Target User Pain Points:**
    *   **Claude Code** users are experiencing high friction with **UI/UX regressions** (VS Code text selection, mobile feature gaps) and **platform-specific identity bugs** (Windows MSIX, macOS stealth updates).
    *   **OpenAI Codex** users are facing **severe performance regressions** on Windows (terminal flashing, input lag/white screens) and gaps in **advanced UI features** (missing branch selection in the desktop app).

## 5. Community Momentum & Maturity
*   **OpenAI Codex** appears to have higher **engineering velocity**, evidenced by 10 active PRs and three sequential alpha releases within 24 hours, suggesting a rapid iteration cycle focused on refactoring the "Guardian" review system and standardizing instruction handling.
*   **Claude Code** demonstrates higher **community scrutiny on operational stability**, with hot issues focusing on "silent" background processes (auto-compaction, auto-updates) that degrade user experience. The lower PR count may indicate a shift towards internal stabilization or a release cadence gap.
*   **Maturity:** Both tools are transitioning from "developer-assistant" to "autonomous-agent-platform," but OpenAI Codex is further along in complex orchestration (Dots), while Claude Code is further along in plugin security and governance (web4-governance plugin).

## 6. Trend Signals
*   **The End of "Silent" Automation:** A strong industry trend is emerging against unconsented background operations. Users are no longer tolerating "stealth" updates or auto-compaction that discards context. Developers should prioritize **auditability and user consent** for all automated maintenance tasks.
*   **Cross-Platform Environment Hygiene:** The proliferation of remote MCP servers and cross-device workflows is exposing deep OS-level inconsistencies (e.g., `SystemRoot` on Windows vs. Unix). **Robust environment variable propagation** is becoming a critical differentiator for enterprise-grade CLI tools.
*   **Security as a Feature, Not a Blocker:** Communities are demanding **granular, context-aware security** that allows for legitimate local/test workflows (e.g., password entry, defensive security research) without breaking automation. "One-size-fits-all" safety classifiers are becoming a significant pain point.
*   **Mobile-First Agent Control:** The request for mobile apps to initiate and manage desktop/remote sessions signals a shift in how developers interact with AI agents, moving from "local terminal" to "always-on, cross-device agent management."

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

*Data as of 2026-10-06*

## 1. Top Skills Ranking
*Based on comment activity in anthropics/skills. Note: PR comment counts are not provided in the source data (marked as undefined); ranking below reflects relative attention inferred from issue cross-references, update frequency, and content criticality.*

1. **skill-creator** (PR [#1298](https://github.com/anthropics/skills/pull/1298), [#1681](https://github.com/anthropics/skills/pull/1681); Issues [#1383](https://github.com/anthropics/skills/issues/1383), [#1394](https://github.com/anthropics/skills/issues/1394), [#202](https://github.com/anthropics/skills/issues/202))
   - **Functionality:** Meta-skill for creating, packaging, and evaluating other Skills, including trigger evaluation and benchmarking.
   - **Highlights:** Community reports widespread failures: broken trigger evals on Windows, silent benchmark layout mismatches, inverted delta calculations, and an XSS vulnerability in the `eval-viewer` due to unsafe `innerHTML` usage. PR #1298 addresses trigger eval isolation and runtime failures; PR #1681 fixes `package_skill.py` execution paths. Issue #202 (closed) critiqued the original design as too verbose for token efficiency.
   - **Status:** Open. Multiple critical bugfix PRs pending.

2. **docx** (PR [#1792](https://github.com/anthropics/skills/pull/1792), [#541](https://github.com/anthropics/skills/pull/541))
   - **Functionality:** Create, read, and process Word documents, including accepting tracked changes.
   - **Highlights:** Significant focus on document integrity. PR #541 fixed a corruption bug where tracked change IDs collided with existing bookmark IDs. PR #1792 improves `accept_changes.py` to correctly report LibreOffice timeouts and verify output by checking for residual revision marks in XML.
   - **Status:** Open. Critical bugfixes in progress.

3. **mcp-builder** (PR [#1742](https://github.com/anthropics/skills/pull/1742); Issue [#1390](https://github.com/anthropics/skills/issues/1390))
   - **Functionality:** Build and evaluate Model Context Protocol (MCP) servers.
   - **Highlights:** Severe compatibility breakage with `mcp>=2.0.0` (import renames, custom header changes) remains unfixed. Issue #1390 reports that the evaluation harness silently fails against all real servers due to `TextContent` serialization issues, rendering it useless. PR #1742 addresses the `mcp>=2` import and header fixes.
   - **Status:** Open. High-priority compatibility fix pending.

4. **claude-api** (Issue [#1487](https://github.com/anthropics/skills/issues/1487); PR [#1730](https://github.com/anthropics/skills/pull/1730))
   - **Functionality:** Guides Claude on using the Anthropic API.
   - **Highlights:** Issue #1487 reports the skill eagerly injects ~156k tokens, exhausting the context window. PR #1730 addresses a separate but important maintenance need: replacing 3 dead documentation URLs in the skill and related concepts.
   - **Status:** Open. Both performance and link-rot fixes pending.

5. **skill-creator: Trigger Eval & Benchmarking** (Issue [#556](https://github.com/anthropics/skills/issues/556))
   - **Functionality:** (Part of skill-creator) Automated evaluation of whether a Skill's triggers function correctly.
   - **Highlights:** Issue #556 documents that `run_eval.py` has a 0% trigger rate across all queries, fundamentally breaking the skill-creation workflow. This is a critical blocker for community Skill development.
   - **Status:** Open. A core reliability issue for the primary creation tool.

6. **frontend-design** (PR [#210](https://github.com/anthropics/skills/pull/210))
   - **Functionality:** Improves Claude's ability to generate high-quality, consistent frontend code.
   - **Highlights:** Long-open PR (created 2026-01-05) focusing on clarity and actionability of the skill's instructions. Represents a sustained effort to refine a key productivity Skill.
   - **Status:** Open.

7. **web-artifacts-builder** (Issue [#1362](https://github.com/anthropics/skills/issues/1362))
   - **Functionality:** Bundle self-contained web applications.
   - **Highlights:** Build scripts fail on modern toolchains (pnpm >= 10.1), with additional issues around stale favicons and non-inlined fonts. A hard blocker for users on current environments.
   - **Status:** Open.

## 2. Community Demand Trends
*Derived from high-comment Issues in the Skills repository.*

* **Security & Trust Boundaries:** The most-discussed issue ([#492](https://github.com/anthropics/skills/issues/492), 43 comments) highlights a critical vulnerability: community Skills distributed under the `anthropic/` namespace, creating trust boundary abuse. This signals a strong community demand for **clear namespacing, provenance, and a formal security review process** for third-party Skills.
* **Organizational Workflow & Sharing:** Issue [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) requests native org-wide skill sharing in Claude.ai, moving beyond manual file transfers. This indicates a demand for **enterprise-grade skill distribution and management**.
* **Quality Assurance & Testing:** Beyond Skill-specific fixes, there's clear demand for **cross-Skill QA infrastructure**. Issues like #556 (0% trigger rate) and #1383 (benchmark failures) show that the current evaluation tools are inadequate, driving community calls for more robust, cross-platform testing frameworks for Skills themselves.
* **Context Window Management:** Issue #1487 (156k token injection) represents a growing, high-priority demand for **token-efficient Skill design** that doesn't sacrifice functionality.

## 3. High-Potential Pending Skills
*Active-comment PRs not yet merged, signaling near-term potential additions.*

* **md2video-audio** (PR [#1703](https://github.com/anthropics/skills/pull/1703)): A zero-cost Skill converting Markdown to MP4 videos with voiceovers. Addresses a clear content-creation workflow.
* **blast-radius** (PR [#1776](https://github.com/anthropics/skills/pull/1776)): A pre-flight checklist Skill for destructive/bulk operations (e.g., mass deletions, access revocations). Taps into the security/mindfulness demand.
* **proofcore-contract-auditor** (PR [#1771](https://github.com/anthropics/skills/pull/1771)): A niche Web3 skill for smart contract auditing with cryptographic proof anchoring. Represents the long-tail of specialized developer tools.
* **AWT (AI Watch Tester)** (PR [#822](https://github.com/anthropics/skills/pull/822)): An E2E testing skill using vision and browser control. Fulfills a test-generation demand, though its large size is a consideration.

## 4. Skills Ecosystem Insight
The community's most concentrated demand is for **formal, secure, and organizationally-managed skill distribution and governance**, as the current marketplace model has critical trust and security gaps (Issue #492) and lacks enterprise workflow features (Issue #228), which are more significant bottlenecks than the addition of new individual skills.

---

# Claude Code Community Digest – 2026-10-06

## Today's Highlights
The release of **v2.1.290** introduces granular hook observability by adding `serverToolUses` data to mod hooks and `agentId` to plugin permission checks, allowing developers to better distinguish subagent actions. The community is currently focused on stability issues surrounding **idle auto-compaction** and **desktop app updates**, with multiple reports indicating that automatic maintenance tasks are silently discarding context or dropping active remote sessions without user consent.

## Releases
**v2.1.290**
*   **Hook Observability:** Added `serverToolUses` to the `turn.step` hook result, exposing details of API-ran tools (ID, name, input, timing).
*   **Plugin Security:** Added `agentId` to the `tool.check` event in plugin hooks, enabling distinction between primary and subagent permission checks.
*   [View Release Notes](https://github.com/anthropics/claude-code/releases)

## Hot Issues
1.  **Fable 5 Model Behavior:** [Fable 5 mid-turn assistant text intermittently delivered as summarized thinking blocks](https://github.com/anthropics/claude-code/issues/74558).
    *   *Why it matters:* Users report turns appearing "silent" because text is misclassified as thinking. With 19 comments and 16 upvotes, this is a significant QoL issue for model reliability on Linux/WSL.
2.  **Windows MSIX Identity Bug:** [`git fsmonitor--daemon` inherits AppX container job, blocking relaunch](https://github.com/anthropics/claude-code/issues/91763).
    *   *Why it matters:* A 18-comment thread detailing how a background process survives forced shutdowns, causing error code 0x80070020. Critical for Windows update workflows.
3.  **VS Code Text Selection:** [Can no longer easily select text to copy and paste](https://github.com/anthropics/claude-code/issues/61021).
    *   *Why it matters:* A regression affecting basic TUI interactions in VS Code terminals. 17 comments and 14 upvotes indicate widespread annoyance with clipboard workflow.
4.  **Idle Compaction Data Loss:** [2.1.286 idle compaction silently discards working context](https://github.com/anthropics/claude-code/issues/98747).
    *   *Why it matters:* 13 comments debate the new auto-compaction feature, which lacks an opt-out and destroys session grounding for long-running tasks. High friction for power users.
5.  **Model Picker Logic:** [modelPicker skips `opusplan` row](https://github.com/anthropics/claude-code/issues/89690).
    *   *Why it matters:* 12 comments discuss a logic bug where specific plan modes are incorrectly marked as "covered" by built-in lines, preventing access.
6.  **Password Input Restrictions:** [Hard block on typing passwords breaks dev/test workflows](https://github.com/anthropics/claude-code/issues/78160).
    *   *Why it matters:* 20 upvotes for a request to allow permission-gated password input for local/test environments. A major friction point for automated testing.
7.  **Chrome Extension State:** [Claude in Chrome `list_connected_browsers` is stale/cached](https://github.com/anthropics/claude-code/issues/78096).
    *   *Why it matters:* Users cannot reliably manage browser connections via MCP tools due to caching bugs and misreported host information.
8.  **Desktop Auto-Update:** [Desktop auto-update ("stealth update") quits and relaunches app while user is away](https://github.com/anthropics/claude-code/issues/95364).
    *   *Why it matters:* 5 comments highlight that updates drop every Remote Control session. Users are forced to manually re-establish remote access after idle updates.
9.  **Windows Reinstall Identity Loss:** [Reinstall regenerates `ant-did` but preserves `remoteToolsDeviceName`](https://github.com/anthropics/claude-code/issues/88692).
    *   *Why it matters:* A "silent break" where pre-existing sessions become permanently orphaned ("Can't reach your computer") after a standard reinstall.
10. **Mobile Feature Gap:** [Start new Claude Desktop Code sessions from the mobile app](https://github.com/anthropics/claude-code/issues/96867).
    *   *Why it matters:* 12 upvotes for a mobile-centric feature request to launch desktop sessions remotely, enhancing the "always-on" developer workflow.

## Key PR Progress
*Note: Only 2 Pull Requests were updated in the last 24h. The remaining 8 slots are left blank as no new data is available.*

1.  **[#99540] sec-default: organization tool ceilings hold over plugin installs**
    *   *Description:* Ensures that organizational security policies (e.g., approval requirements for connector tools) remain effective even when individual users install plugins. Adds `.catch` handling to policy hooks to prevent bypass.
    *   [View PR](https://github.com/anthropics/claude-code/pull/99540)
2.  **[#20448] Add web4-governance plugin for AI governance**
    *   *Description:* Introduces a lightweight governance plugin featuring T3 trust tensors, entity witnessing, and R6 audit trails for AI agent provenance and accountability.
    *   [View PR](https://github.com/anthropics/claude-code/pull/20448)
3.  *(No additional PRs updated in the last 24h)*
4.  *(No additional PRs updated in the last 24h)*
5.  *(No additional PRs updated in the last 24h)*
6.  *(No additional PRs updated in the last 24h)*
7.  *(No additional PRs updated in the last 24h)*
8.  *(No additional PRs updated in the last 24h)*
9.  *(No additional PRs updated in the last 24h)*
10. *(No additional PRs updated in the last 24h)*

## Feature Request Trends
Based on the active issue landscape, the community is strongly prioritizing **session persistence and control**. There is a surge in requests for granular control over automated maintenance tasks, specifically the ability to **opt-out of idle auto-compaction** to preserve context for long-running agents. Additionally, there is high demand for **cross-device session management**, particularly features that allow mobile users to initiate or reconnect to desktop sessions without losing state, and for **security flexibility** that allows developers to bypass hard-coded blocks on local authentication (e.g., typing passwords in test environments) when explicitly permitted.

## Developer Pain Points
1.  **Silent Data Loss & Context Degradation:** Developers are frustrated by "stealth" background processes (auto-compaction, auto-updates) that discard working context or terminate sessions without warning or consent. Issues [#98747](https://github.com/anthropics/claude-code/issues/98747) and [#99817](https://github.com/anthropics/claude-code/issues/99817) highlight the lack of visibility into when history is discarded.
2.  **Platform-Specific Stability Bugs:** Windows users face severe update/installation issues due to identity regeneration and process handling bugs ([#91763](https://github.com/anthropics/claude-code/issues/91763), [#88692](https://github.com/anthropics/claude-code/issues/88692)), while macOS users struggle with the "stealth update" relaunching the app and killing remote sessions ([#95364](https://github.com/anthropics/claude-code/issues/95364)).
3.  **Over-Restrictive Safety Classifiers:** Multiple users report that the safety classifier is too aggressive, blocking legitimate local operations such as copying transcript files ([#99230](https://github.com/anthropics/claude-code/issues/99230)) or user-requested merges/deploys in headless mode ([#99813](https://github.com/anthropics/claude-code/issues/99813)), creating friction for advanced automation workflows.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-06

## Today's Highlights
Windows stability and environment propagation remain the primary focus for the OpenAI Codex community, with high-traffic issues detailing terminal flashing after daemon installation and remote MCP servers losing `SystemRoot`. While three alpha builds of Rust v0.162.0 shipped, the stable release v0.160.1 specifically targeted Unix remote environments to preserve Windows executor startup variables. A significant number of closed pull requests this morning indicate intensive internal refactoring of the "Guardian" review system and standardization of instruction handling for Responses Lite.

## Releases
Three alpha versions (`0.162.0-alpha.14`, `0.162.0-alpha.15`, and `0.162.0-alpha.16`) of the Rust CLI were released sequentially without detailed changelogs. The stable Rust v0.160.1 release shipped a critical bug fix ensuring that `SYSTEMROOT`, `TEMP`, and `TMP` are preserved when launching remote stdio MCP servers on Unix hosts with explicitly configured remote environment variables.

## Hot Issues
1.  **[Windows terminal flashing](https://github.com/openai/codex/issues/48074)**: A heavily engaged (144 comments) issue describing Codex daemon activity causing terminal windows to repeatedly flash during requests, impacting Windows productivity.
2.  **[Missing Computer Use in local tasks](https://github.com/openai/codex/issues/49458)**: Users report that dot-started local tasks on Windows lack Computer Use tools, while ordinary Codex sessions function normally, creating a gap in autonomous execution capabilities.
3.  **[Missing Branch selection in Codex App](https://github.com/openai/codex/issues/49532)**: High engagement (80 👍) for an enhancement request to restore the ability to select specific branches directly within the Codex desktop application UI.
4.  **[Dot task creation in saved projects](https://github.com/openai/codex/issues/49729)**: A bug where dots cannot create tasks in existing saved projects and subsequently cannot read or message the threads they created by ID.
5.  **[Windows renderer crashes and input lag](https://github.com/openai/codex/issues/48938)**: A severe performance regression in the Windows desktop app causing white-screen reloads and severe input lag, drawing frustration from paying Pro subscribers.
6.  **[Windows built-in LaTeX failure](https://github.com/openai/codex/issues/48311)**: The built-in LaTeX compiler fails to find standard directories on Windows, a recurring issue that resurfaced in a new ticket today ([#51204](https://github.com/openai/codex/issues/51204)).
7.  **[Cybersecurity false positives for defensive work](https://github.com/openai/codex/issues/34231)**: Reports of safety checks repeatedly blocking legitimate, authorized defensive vulnerability-writeup tasks in local iOS applications.
8.  **[macOS dot thread read rejection](https://github.com/openai/codex/issues/50077)**: Mac dots fail to read explicitly tagged local threads due to an "unsupported placement format version 1" error, breaking local-task coordination.
9.  **[Windows remote MCP missing SystemRoot](https://github.com/openai/codex/issues/49820)**: Dots-connected Windows tasks fail to start native MCP servers because child environments lack `SystemRoot`, an issue now being addressed in the v0.160.1 release.
10. **[Linux TUI fd exhaustion misreported](https://github.com/openai/codex/issues/37971)**: Under certain Linux configurations, file descriptor exhaustion is incorrectly reported by the app-server as a missing requirements file during TUI bootstrap.

## Key PR Progress
1.  **[Gate CLI Daybreak controls](https://github.com/openai/codex/pull/51207)**: Introduces an opt-in `features.cli_daybreak` flag to gate Daybreak controls and access-program selection in the TUI, ensuring it does not impact standard user flows.
2.  **[Preserve line endings in apply_patch](https://github.com/openai/codex/pull/51203)**: Changes the `apply_patch` tool to unconditionally preserve a file's existing line endings, eliminating previous normalization of CRLF to LF.
3.  **[Namespace removals in tool updates](https://github.com/openai/codex/pull/51202)**: Refines Responses Lite to emit separate sections for namespace removals and individual tool removals in incremental update notices.
4.  **[Upgrade Bazel to 9.2.0](https://github.com/openai/codex/pull/51200)**: Updates the Bazel version and refreshes module lockfiles to support format version 28.
5.  **[Serialize publication of release builds](https://github.com/openai/codex/pull/51198)**: Introduces a new CI workflow concurrency scope allowing parallel builds of different tags while strictly serializing publication to prevent release pointer regressions.
6.  **[Browser extension request headers](https://github.com/openai/codex/pull/51194)**: Adds support for `browser_use.extension.request_headers` as name/value pairs and exposes it through configuration requirements for TypeScript compatibility.
7.  **[SIGCONT handler for TUI resume](https://github.com/openai/codex/pull/51192)**: Fixes `Ctrl+Z` suspension by waiting for a `SIGCONT` handler to confirm resumption, preventing premature exit or state desync.
8.  **[Retry transient gRPC session admissions](https://github.com/openai/codex/pull/51185)**: Implements retries on `Unavailable` and `ResourceExhausted` errors during initial code-mode session admission.
9.  **[Sign PowerShell installers](https://github.com/openai/codex/pull/51158)**: Extends the Windows release process to sign `scripts/install/install.ps1` via Azure Trusted Signing, enhancing supply chain security.
10. **[Recover Guardian reviews from parent checkpoints](https://github.com/openai/codex/pull/51137)**: Overhauls the "Guardian" review system to restart compactions from parent checkpoints rather than lossy reviewer summaries, accompanied by related work in [PR #51139](https://github.com/openai/codex/pull/51139) and [PR #51140](https://github.com/openai/codex/pull/51140).

## Feature Request Trends
*   **Granular Git Workflows**: A strong demand for UI-level enhancements to git workflows in the desktop app, specifically re-introducing branch selection ([#49532](https://github.com/openai/codex/issues/49532)).
*   **Advanced "Dots" Orchestration**: Increased requests for complex, multi-step dot coordination, demanding better context sharing across local/cloud environments and improved access to saved project threads ([#49729](https://github.com/openai/codex/issues/49729), [#50077](https://github.com/openai/codex/issues/50077)).
*   **Customized Security and Browsing**: Developers are requesting more granular control over sandbox permissions (e.g., custom profiles on macOS) and the ability to specify browser behaviors such as selecting the preferred browser for inline link resolution ([#50722](https://github.com/openai/codex/issues/50722), [#45953](https://github.com/openai/codex/issues/45953)).

## Developer Pain Points
*   **Windows Environment Degradation**: The most frequent complaint stems from a cluster of Windows-specific bugs, including the `SystemRoot` loss breaking MCP servers, missing standard directories breaking the LaTeX compiler, and severe input lag causing white screens in the desktop app.
*   **Unreliable Long-Running Agent Context**: Developers report "goal-coherence failure" where agents maintain technical competence and local details but gradually lose track of the governing objective over sustained sessions ([#51187](https://github.com/openai/codex/issues/51187)).
*   **Sandbox and Safety Check Conflicts**: Legitimate developer operations are increasingly interrupted by overly broad automated security interventions, such as the safety checks blocking defensive security write-ups ([#34231](https://github.com/openai/codex/issues/34231)) and sandbox environments failing unexpectedly on macOS permissions changes ([#45953](https://github.com/openai/codex/issues/45953)).

</details>