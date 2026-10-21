# ArXiv AI Research Digest 2026-10-21

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-21 00:20 UTC

---

## 1. Today's Highlights
The recent batch of submissions reveals a strong pivot toward **agent-centric infrastructure and memory architectures**, with research moving beyond simple retrieval to "memory-native" models and reusable context compression for multi-agent systems. There is a notable surge in **verification and safety**, including rigorous observational scaling laws for physical recursive self-improvement (RSI) and proactive, game-theoretic countermeasures against phone scams. Methodologically, the focus on **efficiency** persists, with new techniques for token pruning in prefill and novel approaches to lifelong learning that prevent catastrophic forgetting in continuous-time generative models. Furthermore, the domain is expanding into specialized applications, offering graph-structured benchmarks for life sciences and precise, causal-constrained reinforcement learning for commercial decision-making.

## 2. Key Papers

### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Text-to-Image Generative Modeling Without Language Pretraining](http://arxiv.org/abs/2610.26863v1) | Chandrasegaran, Zhao, Thomas et al. | Introduces "Halcyon," an early-fusion multimodal model that questions if internet-scale language pretraining is required for high-quality image generation. It matters because it tests if strong T2I systems can be built from scratch, potentially reducing dependency on massive text corpora. |
| [MemT-1.0: Towards Memory-Native Evolution](http://arxiv.org/abs/2610.26825v1) | Li, Zhang, Liu et al. | Proposes a foundation model architecture that internalizes memory as a core computational component rather than an external tool. This is significant for evolving LLMs that can continuously accumulate information across long-term interactions. |
| [TokenGate: Adapting LLMs for Fast and Memory-Efficient Prefill](http://arxiv.org/abs/2610.26754v1) | Patel, Ranjan, Stoica et al. | Uses a learned token pruning method to have the LLM "skim" input to process only relevant parts during the prefill stage. It offers a practical method to lower the computational cost of long-context inputs by simulating human reading habits. |
| [Safety Mid-Training: Internalizing LLM Safety](http://arxiv.org/abs/2610.26809v1) | Zhao, Jiang, Choi et al. | Shifts safety alignment into the "mid-training" phase to make it a foundational model capability. This approach aims to preserve safety properties during later training stages where they often degrade. |

### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Same Simulation, Different Evidence: Where Retrieved Tool Output Costs LLM Agents Accuracy](http://arxiv.org/abs/2610.26836v1) | Zhang, Chundur, Owusu et al. | Investigates how agent harnesses that store long tool outputs in external files can inadvertently reduce answer accuracy. It highlights the "cost" of memory saving, showing that searching for evidence can derail models that already possess the correct answer. |
| [Where is Physical RSI capability from? An Observational Scaling Law of LLM-as-policy](http://arxiv.org/abs/2610.26848v1) | Li, Yu, Zhang et al. | Introduces "PhysRSI-eval," a five-axis metric to quantify how LLMs perform as policies for physical recursive self-improvement. This provides the first systematic look at the scaling and generalization of physical RSI capabilities. |
| [Game of Phones: Harnessing Game Theory and LLMs to Counteract Phone Scams](http://arxiv.org/abs/2610.26781v1) | Basta, Carpentier, Zhao et al. | Develops a "strategic scam-baiting" framework where automated agents engage scammers to exhaust their resources. It provides a proactive security countermeasure that imposes a resource cost on perpetrators. |
| [AnyGoal: On World Model Generalization Beyond Expert Rollouts](http://arxiv.org/abs/2610.26844v1) | Nam, Mahajan, Le Lidec et al. | Focuses on ensuring that learned world model dynamics remain reliable when used for planning beyond the specific state-action distributions seen during training. It is critical for building agents that can safely simulate new courses of action. |

### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [OpenVLHarness: Real World Visual Agentic Tool-Use with Multimodal Memory](http://arxiv.org/abs/2610.26860v1) | Zhou, Yang, Sun et al. | Develops a real-world visual agentic tool-use system enhanced by multimodal memory. It demonstrates that providing external evidence to MLLMs is more effective than simply increasing the model's internal inference budget. |
| [LatComm: Reusable Context Compression for Latent Communication between LLMs](http://arxiv.org/abs/2610.26840v1) | Lin, Liu, Yu et al. | Proposes a compact, reusable context representation for passing information between multiple LLMs. This significantly reduces the redundant processing costs associated with shared contexts in multi-model systems. |
| [Keep-Bench: Evaluating Evidence Preservation in Context Compression](http://arxiv.org/abs/2610.26827v1) | Man, Wu, Gu et al. | Introduces a benchmark to assess the "information bottleneck" of context compression by focusing on evidence preservation. It addresses the risk that compression can lead to unfaithful context, which is often missed by standard QA metrics. |
| [HarnessPro: Recursive Harness Self-Improvement with Pareto Optimization](http://arxiv.org/abs/2610.26770v1) | Pan, Feng, Cen et al. | Presents a label-free method for evolving AI agent harnesses to optimize the trade-off between task performance and execution cost. It aims to improve agent capabilities through self-improvement without the associated financial overhead. |

### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [LG-Bench: A Graph-Structured Evaluation Benchmark for Life Sciences](http://arxiv.org/abs/2610.26787v1) | Sun, Zhang, Zhu et al. | Creates a benchmark of over 10,000 questions that captures the topological, interconnected structure of life sciences knowledge. It moves beyond flat Q&A lists to better evaluate how models navigate complex scientific domains. |
| [Next Best Action: Causal Constrained Offline RL for Business Action Targeting](http://arxiv.org/abs/2610.26817v1) | Ramachandiran, Li, Mancilla-Caceres et al. | Develops a rigorous framework for offline reinforcement learning that selects customer interventions (e.g., discounts) while remaining causally grounded. It helps maximize long-term economic value under strict operational constraints. |
| [Cooperative Multi-Agent RL for Market Making on Prediction-Market Order Books](http://arxiv.org/abs/2610.26789v1) | Lejmi | Applies multi-agent reinforcement learning to manage liquidity and inventory risk in thin prediction markets like Polymarket. It offers a specialized approach to market making in environments with distinct order-book challenges. |

## 3. Research Trend Signal
Emerging trends indicate a fundamental shift from **passive memory retrieval to "memory-native" model architectures** (e.g., MemT-1.0) and **reusable latent communication** between LLMs (LatComm). The research community is actively solving the inefficiencies of long-context processing, moving from simply reading more to "skimming" via learned token pruning (TokenGate). Simultaneously, a strong push for **verifiable and safe agent capabilities** is evident, as seen in the rigorous "PhysRSI-eval" for physical RSI and "Keep-Bench" for compression faithfulness. We are also seeing a move toward **proactive, strategic interaction**, where agents don't just execute tasks but engage in complex, goal-directed "bot wars" to mitigate threats like phone scams. Finally, there is a drive toward more **causal and structured domains**, such as causal-constrained RL for business and graph-structured benchmarks for life sciences, reflecting a maturing focus on domain-specific reliability.

## 4. Worth Deep Reading
*   **[MemT-1.0: Towards Memory-Native Evolution](http://arxiv.org/abs/2610.26825v1):** This paper represents a conceptual leap in foundation model design. Reading how memory is internalized as part of the model's computation (rather than a tool) will be crucial for understanding the next generation of continuous-learning AI systems.
*   **[Where is Physical RSI capability from? An Observational Scaling Law of LLM-as-policy](http://arxiv.org/abs/2610.26848v1):** As AI agents move into the physical world, understanding the mechanisms and scaling laws of physical recursive self-improvement is vital. This paper's five-axis metric (PhysRSI-eval) is a foundational tool for evaluating this critical capability.
*   **[Safety Mid-Training: Internalizing LLM Safety as a Foundational Capability](http://arxiv.org/abs/2610.26809v1):** With the rise of powerful agents, safety alignment is no longer just a post-training checkbox. This paper explores how to bake safety into the core of the model, making it resilient against "safety degradation" that occurs in later training stages—a key challenge for robust AI deployment.