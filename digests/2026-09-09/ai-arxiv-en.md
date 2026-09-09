# ArXiv AI Research Digest 2026-09-09

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-09 04:48 UTC

---

## ArXiv AI Research Digest — 2026-09-09

### 1. Today's Highlights
Today's ArXiv submissions show a notable rise in AI agent engineering and interpretability research, with papers like Procedural Graphs, MeClear, and SAEScientist-Bench focusing on long-horizon memory, tool-use reliability, and autonomous research capability evaluation. In foundational models, Learning Length-Extrapolatable Recurrent Models and Silver Rate optimization provide new theoretical perspectives on long-context modeling and training efficiency. The multimodal and robotics domains see TANGO and DeCAL pushing vision-language-action models toward contact-rich physical interaction scenarios.

### 2. Key Papers

#### 🧠 Large Language Models
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1) | Hanwen Jiang | Proposes a training method for recurrent models that can extrapolate beyond their training horizon, addressing BPTT failure beyond trained context lengths. Offers an efficient alternative to standard Transformers for long-context modeling. |
| [It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention](http://arxiv.org/abs/2609.09085v1) | Raito Kiya et al. | Identifies self-concentration and value-non-mixing effects as the root cause of attention sinks rather than RoPE itself. Provides important guidance for low-bit quantization design. |
| [Everything in Moderation: Per-Domain Coverage Optima and Alignment-Resistant Domain Gaps in Multi-Domain Mid-Training](http://arxiv.org/abs/2609.09081v1) | Yunpeng Xu, Kun Zheng | Systematically studies data composition optimization in multi-domain mid-training, revealing domain gaps that alignment cannot fix. Provides theoretical basis for mid-training phase design in large-scale model training. |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey et al. | Shows that the lowest pretraining-loss checkpoint is not necessarily the best starting point for SFT, verified in a 30B MoE pipeline. Challenges the prevailing checkpoint selection practice. |

#### 🤖 Agents & Reasoning
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu et al. | Introduces procedural graph structures enabling agents to explicitly manage execution flow rather than relying on implicit history accumulation. Addresses the core problem of missing procedural knowledge in long-horizon planning. |
| [MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1) | Boyu Yang et al. | Applies game-theoretic attribution to agent long-horizon memory management, solving the problem of outdated information from semantics-only retrieval. |
| [SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?](http://arxiv.org/abs/2609.09113v1) | Yuqiao Tan et al. | Introduces the first benchmark for evaluating AI agents' autonomous SAE interpretability research capabilities, filling the gap in post-hoc monitoring for recursive self-improvement. |
| [Copying explains the collective behavior of AI agents in the wild](http://arxiv.org/abs/2609.09150v1) | Giordano De Marzo et al. | Reveals collective copying behavior of AI agents in uncoordinated settings through a wiki experiment, providing empirical basis for understanding emergent multi-agent collaboration. |
| [ReCite: Agentic Reasoning for Faithful Citation](http://arxiv.org/abs/2609.09156v1) | Yuyang Huang et al. | Applies agentic reasoning to ensure faithful academic citations, addressing accuracy issues in automatic citation recommendation across large literature corpora. |

#### 🔧 Methods & Frameworks
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1) | Yuhan Ye, Kaizhao Liu | Proves that the Silver rate approaches the theoretical limit for gradient descent acceleration in smooth convex optimization. Provides precise theoretical bounds for optimizer step-size scheduling. |
| [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](http://arxiv.org/abs/2609.09075v1) | Tommy Sha et al. | Proposes a zero-rollout difficulty prior method for cold-start prompt selection in RLVR, overcoming the vanishing gradient problem when all rollouts in a group succeed or fail. |
| [ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1) | Min Zeng et al. | Achieves closed-loop tool-use data synthesis via decomposed generation and dynamic self-feedback, solving inefficiency and imbalanced feature distribution in existing methods. |
| [ExecCritic: Learn to Test, Test to Improve for Coding Agents](http://arxiv.org/abs/2609.09133v1) | Leitian Tao et al. | Introduces an execution-feedback-driven iterative improvement framework for coding agents, addressing the problem of incomplete behavioral targets in agent-generated tests. |
| [Curriculum Learning as Transport: Understanding Curricula with Wasserstein Geodesics](http://arxiv.org/abs/2609.09099v1) | Changho Shin, David Alvarez-Melis | Reformulates curriculum learning using optimal transport theory, providing Wasserstein geodesic paths to dissect the coupled effects of curriculum design choices. |

#### 📊 Applications
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body VLA Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li et al. | Applies whole-body VLA models to humanoid robot navigation in cluttered indoor environments, breaking through the limitations of conventional 2D path planning. |
| [DeCAL: Towards Physically-Grounded Dexterous VLA via Contact-Aware Latent Co-Imagination](http://arxiv.org/abs/2609.09119v1) | Yankai Fu et al. | Introduces contact-aware latent co-imagination to improve dexterous manipulation VLA models under visual occlusion and complex contact dynamics. |
| [NOAH: Longitudinal Multimodal Time-Aware Model for Patient Journey Representation](http://arxiv.org/abs/2609.09140v1) | Tobias Susetzky et al. | Builds a longitudinal multimodal time-aware model for patient trajectory representation and forecasting, addressing the challenge of capturing irregular temporal patterns. |
| [Performance of Clinical AI System and Physicians in Primary Care Diagnostics](http://arxiv.org/abs/2609.09070v1) | Andy Nkansah et al. | Compares Doctorina, physicians, and frontier LLMs across 150 synthetic Polish primary-care consultations, with Doctorina achieving 82% Top-1 diagnostic concordance. |
| [SQLMorph: Query Mutation and Fine-Grained Metrics for Text-to-SQL Evaluation](http://arxiv.org/abs/2609.08950v1) | Mohammadhossein Malekpour et al. | Introduces query mutation and fine-grained metrics to address text-to-SQL evaluation bottlenecks,弥补ing the gap where public benchmarks fail to capture enterprise schema complexity. |

### 3. Research Trend Signal
Today's submissions reveal three emerging directions: first, agent engineering is shifting from pure performance gains to reliability and auditability, with Procedural Graphs, MeClear, and SAEScientist-Bench jointly pointing to the interpretability needs of long-running agents. Second, training theory is deepening — Silver Rate, Curriculum as Transport, and Good Pretraining Bad SFT indicate research moving from engineering practice into foundational theory. Third, physical world interaction is becoming a new frontier for VLA models, with TANGO and DeCAL unifying dexterous manipulation and complex environment navigation.

### 4. Worth Deep Reading
1. **Procedural Graphs** — Directly addresses the core pain point of agent long-horizon planning with an innovative explicit procedural structure approach.
2. **SAEScientist-Bench** — The first systematic evaluation of AI agents' autonomous research capabilities, highly relevant to recursive self-improvement pathways.
3. **Copying explains collective behavior** — Provides empirical insights into the underlying mechanisms of multi-agent emergent behavior, offering new perspectives for agent system design.