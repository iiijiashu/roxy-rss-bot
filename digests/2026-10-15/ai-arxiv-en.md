# ArXiv AI Research Digest 2026-10-15

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-15 00:20 UTC

---

## 1. Today's Highlights
Today's submissions demonstrate a maturation of agentic frameworks, particularly in robotics and long-horizon planning. Researchers are increasingly shifting focus from static model training to "recursive self-improvement" loops, where agents dynamically modify their own scaffolding, memory, and physical capabilities to handle new tasks without human intervention. A significant trend is the integration of dense, verifiable rewards to train agents on economically valuable, multi-day tasks, moving beyond simple chain-of-thought reasoning. Furthermore, the community is addressing the practical bottlenecks of agentic systems, such as token efficiency in reasoning, hardware robustness in robot policies, and the specific challenges of scaling optimal transport in generative models.

## 2. Key Papers

### 🧠 Large Language Models
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning](http://arxiv.org/abs/2610.18862v1) | Luo, Chen, et al. | Proposes a training-free decoding strategy that uses contrastive inputs to shorten reasoning chains. It matters because it reduces token overhead without requiring additional model training or fixed steering vectors. |
| [Jeva: System One Models from First Principles](http://arxiv.org/abs/2610.18773v1) | Li, Wang | Argues that current LLM designs underemphasize structural requirements like null-awareness for direct, low-latency decision-making. It provides a first-principles framework for building efficient System One models. |
| [Read the Room Before Your Model Generates](http://arxiv.org/abs/2610.18820v1) | Kong, Lin | Introduces a geometrically interpretable method for dynamically selecting sampling temperatures based on context. This moves away from fixed heuristics, potentially improving output reliability in diverse tasks. |

### 🤖 Agents & Reasoning
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards](http://arxiv.org/abs/2610.18868v1) | Hu, Pramanick, Singh, et al. | Develops a method for scaling long-horizon agents by providing dense progress rewards rather than sparse final signals. It is significant for enabling autonomous discovery and recursive self-improvement on tasks lasting days. |
| [Hybrid Reasoning Agents](http://arxiv.org/abs/2610.18861v1) | Zou, Qi, Chen, et al. | Bridges text-based LLM agents with latent reasoning to allow internal thought that exceeds natural language constraints. It matters by offering more efficient internal reasoning while maintaining external tool transparency. |
| [Self-Evolving Agent Harness](http://arxiv.org/abs/2610.18813v1) | Wei, Guan, Zhu, et al. | Formalizes a process where an agent revises its own software scaffolding, including prompts and workflows, while keeping weights fixed. This contributes to the understanding of how agents can persistently improve their own operational logic. |
| [Pack Light, CarryOn: Building Object-Oriented Context for Long-Horizon Agents](http://arxiv.org/abs/2610.18784v1) | Lu, McAuley, Zhang | Proposes organizing agent context around reusable "progress" rather than the full history of how that progress was achieved. This is key for reducing token bloat and improving memory management in long-term tasks. |

### 🔧 Methods & Frameworks
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [ChunkAct: Action Chunking for Agentic Robotics](http://arxiv.org/abs/2610.18874v1) | Xu, Bao, Liu, et al. | Addresses the efficiency costs of LLMs in robot control loops by chunking actions and tool compositions. It matters for making agentic robotics viable for real-time task generalization without retraining. |
| [LIBERO-RIG: A Hardware-Setup Robustness Benchmark for Vision-Language-Action Models](http://arxiv.org/abs/2610.18843v1) | Cui, Wang, Wang, et al. | Introduces a benchmark that perturbs robot hardware (cameras, calibration, wear) to test policy generalization. It highlights a critical gap in evaluating whether VLA models can survive physical deployment drift. |
| [Scaling Online Optimal Transport Minibatches for Flow Matching](http://arxiv.org/abs/2610.18838v1) | Chen, Levine | Analyzes how to pair source samples with data in flow matching to maintain training stability at scale. It is important for advancing generative models that rely on optimal transport rather than random pairing. |
| [Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in RLVR](http://arxiv.org/abs/2610.18853v1) | Li, Quan, Qiu, et al. | Investigates the counter-intuitive learning dynamics of large rollout batches in reinforcement learning with verifiable rewards. It provides practical insight into the trade-offs of batch size vs. schedule adherence in RL training. |

### 📊 Applications
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1) | Wang, Li, Wang, et al. | Presents a framework where LLM agents write control code, test it, and retain successful strategies as skills. It matters by demonstrating a closed-loop for physical recursive self-improvement in robotics. |
| [PreciseCoder: Faithful and Generalizable Debugging Beyond Unit-Test Rewards](http://arxiv.org/abs/2610.18755v1) | Zhan, Chai, Wang, et al. | Shows that relying solely on unit tests for RL debugging teaches models superficial fixes. It is crucial for developing code agents that truly understand and generalize program semantics. |
| [Steertuning Policies from a Few Human Videos](http://arxiv.org/abs/2610.18711v1) | Yan, Tu, Lee, et al. | Enables robots to learn new tasks from just five human demonstrations in under five minutes. This application significantly lowers the data barrier for adapting robotic policies to new environments. |
| [SolBehave: Evaluating the Behavioural Correctness of LLM-Generated Smart Contracts](http://arxiv.org/abs/2610.18745v1) | Delvecchio, Fantazzini, Frisoni, et al. | Shifts evaluation from compilation checks to behavioral correctness in Solidity smart contracts. It matters because deployed smart contracts are immutable, making latent faults permanent security risks. |

## 3. Research Trend Signal
The 2026-10-15 batch of papers reveals a distinct pivot toward "Autonomous System Improvement." We are seeing a move beyond simple tool-use agents to frameworks that modify their own internal scaffolding, memory structures, and even physical control code (SEAR, Self-Evolving Agent Harness). A prominent signal is the struggle with "Long-Horizon" tasks, where researchers are no longer just focusing on generating a response, but on maintaining context and progress over hours or days (Tev, Pack Light, CarryOn).

Additionally, there is a strong "Reality Check" trend. The community is aggressively testing the limits of current AI in physical and high-stakes domains. This includes hardware-robustness benchmarks for robots (LIBERO-RIG), behavioral correctness for immutable smart contracts (SolBehave), and efficiency auditing for reasoning (DoubtLess). The focus is shifting from "can the model do it?" to "can the model do it reliably, efficiently, and without catastrophic failure when the environment changes?"

## 4. Worth Deep Reading
1. **[Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards](http://arxiv.org/abs/2610.18868v1)**: This is likely the most methodologically significant paper of the batch. It addresses the "economics" of long-horizon tasks, moving away from binary success/failure rewards. Understanding how to provide dense progress signals is key to the next generation of autonomous agents that can work for days, making it essential for anyone working in RL or agentic planning.
2. **[ChunkAct: Action Chunking for Agentic Robotics](http://arxiv.org/abs/2610.18874v1)**: This paper bridges the gap between the theoretical speed of LLMs and the hard latency constraints of physics. It offers a concrete architectural pattern for reducing the efficiency price of agentic robotics. It is worth reading for its practical implications on how to integrate LLMs into real-time control loops without sacrificing generalizability.
3. **[SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1)**: This paper pushes the boundary of "Recursive Self-Improvement" into the physical world. It is not just a benchmark, but a philosophical and engineering shift toward agents that can improve their own physical capabilities. It deserves deep reading to understand the safety and efficacy implications of robots writing their own control code.