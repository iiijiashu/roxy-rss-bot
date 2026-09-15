# ArXiv AI Research Digest 2026-09-15

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-15 04:59 UTC

---

## ArXiv AI Research Digest — 2026-09-15

### 1. Today's Highlights
Today's ArXiv submissions focus on agent safety alignment, LLM reasoning efficiency, and multi-agent collaboration. CoT monitoring evasion (#2609.15989), Bellman Policy Optimization (#2609.15987), and Stellar Colosseum multi-agent system (#2609.15983) represent current research frontiers. Discovery Foundation Models (#2609.15973) propose a paradigm shift from "solving problems" to "defining problems."

### 2. Key Papers

#### 🧠 Large Language Models

| Paper | Authors | Summary |
|---|---|---|
| [Corrupt Plans, Clean Traces: Evading Chain-of-Thought Monitoring with Plan Injection](http://arxiv.org/abs/2609.15989v1) | Chidambaram et al. | Demonstrates CoT monitoring可被"benign-sounding reasoning" bypassed, challenging LLM safety evaluation methods. Security researchers must reconsider monitoring strategies. |
| [Inoculation Midtraining with Learned Neologisms](http://arxiv.org/abs/2609.15886v1) | O'Brien et al. | Proposes injecting anti-stigmatization knowledge during midtraining to prevent learning undesirable properties. Novel approach to alignment training. |
| [Disentangling Representation Evolution in Transformers through Directional Decomposition](http://arxiv.org/abs/2609.15975v1) | He et al. | Analyzes Transformer representation evolution mechanics, decomposing parallel/perpendicular components. Important interpretability research progress. |

#### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
|---|---|---|
| [Stellar Colosseum: A Many-Agent Harness for Long-Horizon Research](http://arxiv.org/abs/2609.15983v1) | Lin et al. | Multi-agent math research benchmark evaluating long-horizon reasoning reliability. Valuable for Agentic AI evaluation. |
| [The Router Within: Eliciting Native Skill Routing from a Frozen LLM](http://arxiv.org/abs/2609.15982v1) | Chen et al. | Extracts skill routing能力 from frozen LLM, avoiding full metadata preload. Improves Agent context efficiency. |
| [HypoEvolve: Genetic Algorithms Enable Multi-Agent LLMs to Discover Scientific Hypotheses](http://arxiv.org/abs/2609.15938v1) | Liu et al. | Combines genetic algorithms with multi-agent for scientific hypothesis discovery. AI for Science methodology innovation. |
| [AlgoEvo: Self-Evolving Agentic Search for Automated Algorithm Discovery](http://arxiv.org/abs/2609.15820v1) | Qiu et al. | Self-evolving agentic search for algorithm discovery, breaking fixed pipeline limitations. New paradigm for automated algorithm design. |

#### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
|---|---|---|
| [Bellman Policy Optimization](http://arxiv.org/abs/2609.15987v1) | Song et al. | Critic-free RLVR method based on Policy Mirror Descent. Simplifies LLM reasoning training pipeline. |
| [Discovery Foundation Models: Toward Open-Ended Discovery Intelligence](http://arxiv.org/abs/2609.15973v1) | Yang et al. | Proposes "Discovery Foundation Model" concept, shifting from problem-solving to problem definition. Paradigm-level thinking. |
| [Delegating Authorization to Misaligned Agents: Coalitional Alignment and Safe Control](http://arxiv.org/abs/2609.15803v1) | Collina et al. | Safety control for long-running Agents, proposing coalitional alignment framework. Critical Agent safety paper. |
| [When the World Lies: Backdoor Attacks on Latent World Models](http://arxiv.org/abs/2609.15781v1) | Riaño et al. | Backdoor attack research on pretrained world models, revealing reuse risks. Important security warning. |

#### 📊 Applications

| Paper | Authors | Summary |
|---|---|---|
| [Mind2Dialogue: Training Human-Aware Language Models](http://arxiv.org/abs/2609.15972v1) | Wang et al. | Trains human-aware LLMs by simulating user mental states. Addresses supervision data gaps. |
| [CiteGuard-RAG: A Validation-Centered AI System](http://arxiv.org/abs/2609.15830v1) | Barua et al. | Validation-centered RAG system ensuring citation validity. Practical for clinical QA. |
| [K-Bench: Clinically Calibrated Benchmark for Mental Health Conversations](http://arxiv.org/abs/2609.15855v1) | Vowels et al. | Clinically calibrated benchmark for high-risk mental health conversations. New standard for LLM safety evaluation. |
| [LongAgent: History-Guided Agentic Search for Longitudinal Prediction](http://arxiv.org/abs/2609.15859v1) | Wang et al. | History-guided agentic search for longitudinal medical prediction. Medical AI application innovation. |

### 3. Research Trend Signal
Today's submissions show **agent safety and alignment** as the most active direction (CoT evasion, world model backdoors, authorization delegation). **Discovery-oriented AI** (Discovery Foundation Models) proposes paradigm upgrade from "execution" to "exploration." **Multi-agent collaboration** shows potential in science discovery and algorithm search. Simultaneously, **interpretability research** (Transformer representation decomposition) and **efficient training methods** (BPO, routing optimization) develop in parallel. Privacy preservation (federated learning, differential privacy) remains consistently关注.

### 4. Worth Deep Reading
1. **Corrupt Plans, Clean Traces** — Must-read for security researchers, reveals inherent CoT monitoring vulnerabilities.
2. **Discovery Foundation Models** — Highly forward-looking, defines AI's next development stage.
3. **Delegating Authorization to Misaligned Agents** — Safety cornerstone for long-running Agent systems.