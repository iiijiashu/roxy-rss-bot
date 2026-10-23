# AI Open Source Trends 2026-10-23

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-10-23 00:20 UTC

---

**Step 1 (Filter)**
- **From Trending List:**
  - Included: `anthropics/knowledge-work-plugins`, `DietrichGebert/ponytail`, `cloudflare/security-audit-skill`, `Graphify-Labs/graphify`, `supabase/supabase`, `luongnv89/claude-howto`.
  - Excluded: `php/php-src` (general web interpreter), `Meloong-Git/PCL` (game launcher), `fastapi/fastapi` (general web framework not specific to AI).
- **From Topic Search:** All 81 repositories are explicitly AI/ML-related based on their topic tags and descriptions.

**Step 2 (Categorize)**
- **🔧 AI Infrastructure**:
  - `supabase/supabase`, `ollama/ollama`, `huggingface/transformers`, `pytorch/pytorch`, `tensorflow/tensorflow`, `langchain-ai/langchain`, `open-compass/opencompass`, `f/prompts.chat`
- **🤖 AI Agents / Workflows**:
  - `anthropics/knowledge-work-plugins`, `DietrichGebert/ponytail`, `cloudflare/security-audit-skill`, `NousResearch/hermes-agent`, `Panniantong/Agent-Reach`, `CherryHQ/cherry-studio`, `langgenius/dify`
- **📦 AI Applications**:
  - `Shubhamsaboo/awesome-llm-apps`, `career-ops-hq/career-ops`, `harry0703/MoneyPrinterTurbo`, `browser-use/browser-use`
- **🧠 LLMs / Training**:
  - `harry0703/MoneyPrinterTurbo` is better in applications. `picollm`, `tiny-llm`, `OpenEBFM`
- **🔍 RAG / Knowledge**:
  - `Graphify-Labs/graphify`, `thedotmack/claude-mem`, `mem0ai/mem0`, `infiniflow/ragflow`, `HKUDS/LightRAG`, `volcengine/OpenViking`

**Step 3 (Output Report)**

### 1. Today's Highlights
Today's GitHub trending list signals a distinct shift from building raw LLM wrappers to optimizing the "agentic layer" around them. Notable entries like [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) (+2,979 stars today) and [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (+1,948 stars today) demonstrate that the community is actively engineering specific "skills" to control agent behavior, making them safer and more resource-efficient. The explosive interest in [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) (+1,408 stars today) highlights a growing demand for structural, deterministic knowledge graphs over traditional vector stores. Furthermore, official tooling like [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) points to a maturation phase where enterprise productivity integrations are becoming the standard entry point for AI agents.

### 2. Top Projects by Category

#### 🔧 AI Infrastructure
| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | :--- | :--- |
| [supabase/supabase](https://github.com/supabase/supabase) | TypeScript | 693 (+693 today) | A Postgres development platform explicitly built to host AI applications. Its trending status indicates a steady convergence of traditional relational database infra with agentic workloads. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 184,339 | The definitive tool for running diverse open-source models (Kimi, DeepSeek, etc.) locally. It remains the backbone of local LLM inference due to its seamless handling of multiple architectures. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 148,292 | An agent engineering platform providing the foundational plumbing for orchestration and tool-calling. Its massive star count reflects its status as an industry standard for LLM app development. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,536 | An LLM evaluation platform covering 100+ datasets for knowledge, reasoning, and safety. Worth attention for teams needing to benchmark models before integrating them into workflows. |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 174,006 | A self-hostable, open-source alternative to prompt libraries (formerly Awesome ChatGPT Prompts). It offers organizations a private way to centralize and manage their prompt repositories. |

#### 🤖 AI Agents / Workflows
| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | :--- | :--- |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | JavaScript | 2,979 (+2,979 today) | A multi-phase coding-agent skill that produces machine-readable security audit findings. Its rapid star growth highlights the enterprise push to automate and verify AI-generated code security. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 173,440 (+1,948 today) | An agent optimization layer that forces AI to "think like the laziest senior dev" to avoid over-engineering code. It addresses a critical inefficiency in LLM coding agents, reducing token usage and complexity. |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Python | 303 (+303 today) | Official open-source plugins for knowledge workers in Claude Cowork. This signals a major strategic move by Anthropic to standardize enterprise workflows for AI-assisted productivity. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 256,246 | An autonomous agent that "grows with you," integrating deep memory and multi-tool capabilities. It is one of the largest open-source agent frameworks, serving as a primary testbed for long-term agent memory. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 52,892 | A desktop AI productivity studio providing unified access to 300+ assistants and autonomous agent workflows. It bridges the gap between raw LLM APIs and user-friendly agentic execution. |

#### 📦 AI Applications
| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | :--- | :--- |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 142,729 | A massive repository containing over 100 free, open-source AI agent and RAG application templates. It serves as a primary resource for developers bootstrapping new LLM-based features quickly. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 76,614 | A local AI job search agent that scores job listings against a CV and tailors applications. It demonstrates the shift of AI agents from general assistants to highly specific, high-value vertical automations. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 134,240 | An automated workflow to generate high-definition short videos from a single topic or keyword. Its popularity underscores the rapid commoditization of AI-driven media production pipelines. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 118,890 | A library for building AI browser agents, including stealth features for interacting with web interfaces. It provides a core building block for the next generation of digital labor automation. |

#### 🔍 RAG / Knowledge
| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | :--- | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 132,929 (+1,408 today) | Translates codebases and documents into deterministic, queryable knowledge graphs without a vector store. Its trending status proves a strong developer preference for verifiable, edge-explained data structures in RAG. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 102,335 | A persistent memory layer that compresses agent session data using AI for future context injection. It solves the critical "context window" limitation for long-running autonomous agents. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 40,273 | An EMNLP 2025 paper implementation offering fast retrieval-augmented generation. It continues to gain traction as a highly efficient, academic-grade RAG engine for production systems. |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | 40,600 | A self-evolving context database that unifies agent memory, knowledge RAG, and skills. It represents an emerging infrastructure layer designed specifically for agent-centric data management. |

### 3. Trend Signal Analysis
Today's trending data reveals that the center of gravity in the AI open-source ecosystem has decisively shifted from "model building" to "agent engineering." The explosive attention on tools like [ponytail](https://github.com/DietrichGebert/ponytail) and [security-audit-skill](https://github.com/cloudflare/security-audit-skill) indicates that developers are no longer just calling LLMs; they are actively building specialized "skills" to constrain, verify, and optimize agent behavior. This is a maturation of the agentic stack, moving toward deterministic safety and resource efficiency. 

A notable new direction is the move away from opaque vector searches toward deterministic knowledge graphs, highlighted by [Graphify](https://github.com/Graphify-Labs/graphify). The community is signaling a desire for transparency and verifiability in retrieval processes, where "every edge is explained" rather than relying on fuzzy semantic similarity. This architectural choice is closely tied to the industry's scaling phase, where agentic systems are now running complex, multi-step software engineering and security audits that require high-stakes reliability. Additionally, [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) suggests that the frontier is expanding into specific enterprise verticals (knowledge work), meaning agentic frameworks are finding their final resting places inside daily operational workflows rather than just serving as research prototypes.

### 4. Community Hot Spots
*   **Deterministic RAG / Knowledge Graphs**: [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) is rapidly displacing pure vector-DB approaches by offering queryable, AST-parsed knowledge graphs that are easier to debug and trust in production codebases.
*   **Agent "Skill" Modularity**: [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) and [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) show that decoupling specific capabilities into installable skills is becoming the preferred distribution model for advanced agent features.
*   **Agent Token Efficiency**: [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) is a vital developer tool for solving the "over-coding" problem in LLMs, which is now a top priority for developers building scalable, low-cost agentic workflows.
*   **Persistent Agent Memory**: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) and [mem0ai/mem0](https://github.com/mem0ai/mem0) are crucial for developers building long-running agents that must maintain context across multiple disconnected sessions and tasks.