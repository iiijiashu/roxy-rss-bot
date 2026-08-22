# ArXiv AI Research Digest 2026-08-22

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-22 01:52 UTC

---

## ArXiv AI Research Digest (2026-08-22)

### 1. Today's Highlights
Today's ArXiv submissions reveal three dominant research trends: (1) LLM unlearning and context-sensitive benchmarking are moving from theoretical problems to engineering-grade evaluation; (2) Agent self-improvement and cross-task skill transfer are emerging as critical research frontiers; (3) Time series foundation models are seeing concentrated activity with 5+ related papers. Domain-specific benchmarks (medical, legal, multilingual) are also intensifying, signaling a shift from general capability evaluation to specialized domain deepening.

### 2. Key Papers

**🧠 Large Language Models**
| Paper | Authors | Summary |
|:---|:---|:---|
| [ConceptGuard: Benchmarking Context-Sensitive Unlearning in Large Language Models](http://arxiv.org/abs/2608.20338v1) | Sahil Kale, Ian Harris | Introduces the first benchmark for context-sensitive unlearning in LLMs, revealing that current methods using disjoint forget/retain sets fail to comprehensively evaluate selective knowledge removal. Crucial for AI safety and compliance practice. |
| [MemTrapBench: Benchmarking Cognitive Traps in LLM Memory Use](http://arxiv.org/abs/2608.20202v1) | Mengru Wang, Haozhe Luo, Zhenqian Xu et al. | First systematic evaluation of cognitive traps (e.g., misleading retrieval causing erroneous reasoning) in LLM memory usage, filling the gap left by existing benchmarks that only assess extraction and storage accuracy. |
| [Phantom Gains: Auditing Self-Improvement Against a Measured Null](http://arxiv.org/abs/2608.20290v1) | Cheng Xu, Nan Yan, Liming Chen et al. | Proposes an auditing method for LLM self-improvement, showing that mean-accuracy-based improvement judgments are vulnerable to measurement artifacts and individual problem-level tracking is essential. Critical for reproducibility in self-improvement research. |
| [Which Eviction Policy Should an LLM Cache Use? A Systematic Study Across Workloads, Capacities, and Encoders](http://arxiv.org/abs/2608.20280v1) | Yash Kulkarni, Shubham Harkare, Arvind Suresh Yogesh Babu | Systematically compares 7 eviction policies (FIFO, LRU, LFU, ARC, GDSF, SISO adaptation, semantic-redundancy) for semantic caches, providing empirical guidance for LLM caching engineering. |
| [Inject, Align, Recover: Staged Post-Training for Retrieval-Free Document Knowledge Internalization](http://arxiv.org/abs/2608.20281v1) | Qian Kou, Xiaofeng Shi, Xiaosong Qiu et al. | Studies staged post-training to convert document collections into parametric knowledge for retrieval-free question answering, addressing the core limitation of LLMs lacking document-specific knowledge at inference time. |

**🤖 Agents & Reasoning**
| Paper | Authors | Summary |
|:---|:---|:---|
| [Break It Down, Pass It On: Cross-Task Skill Transfer in LLM Agents](http://arxiv.org/abs/2608.20274v1) | Yiyang Feng, Biddut Sarker Bijoy, Niranjan Balasubramanian et al. | Investigates cross-task skill transfer in LLM agents, finding that induced skills may transfer unreliably or even harm the receiving agent, revealing key risks in agent skill reuse mechanisms. |
| [AI4AI-Bench: Benchmarking LLM Agents in Algorithmic Design for Recursive Self-Improvement](http://arxiv.org/abs/2608.20318v1) | Yizhe Chi, Wenyi Li, Deyao Hong et al. | Introduces a benchmark for evaluating LLM agents in algorithmic design for recursive self-improvement (RSI), focusing on improving the training algorithm itself rather than model weights—addressing the core challenge of AI self-evolution. |
| [Task-CoEvolve: Efficient Harness Optimization via Adaptive Validation Task Selection](http://arxiv.org/abs/2608.20169v1) | Atsuyuki Miyai, Kiyoharu Aizawa, Toshihiko Yamasaki | Proposes efficient harness optimization through adaptive validation task selection, achieving significant performance gains without updating model weights—a practical approach to agent deployment efficiency. |
| [Inducing Task Models from Computer-Use Traces](http://arxiv.org/abs/2608.20319v1) | Yucheng Jiang, Zora Zhiruo Wang, Ruishi Chen et al. | Extracts auditable, reusable task models from passively recorded computer-use traces (screenshots, mouse/keyboard actions), enabling agents to learn how humans perform everyday work tasks. |
| [Multi-Agent Orchestration with the Common-Sense Reasoning Capabilities of LLMs for Autonomous Driving](http://arxiv.org/abs/2608.20129v1) | Mehdi Azarafza, Faezeh Pasandideh, Ali Ehteshami Bejnordi et al. | Applies LLM common-sense reasoning to multi-agent autonomous driving coordination,弥补ing the contextual reasoning gaps of pure reinforcement learning approaches. |
| [Reward-Guided Autoregressive Graph Generation for Efficient Multi-Agent Communication Topology Design](http://arxiv.org/abs/2608.20099v1) | Poomphob Suwannapichat, Boonyarit Changaival, Caesar Wu et al. | Uses reward-guided autoregressive graph generation to optimize multi-agent communication topology, significantly reducing token consumption while maintaining LLM multi-agent system performance. |

**🔧 Methods & Frameworks**
| Paper | Authors | Summary |
|:---|:---|:---|
| [Daedalus-150M: A Convolution-Attention Hybrid Designed for CPU Inference](http://arxiv.org/abs/2608.20210v1) | Christos Koutsiaris | A 150M-parameter convolution-attention hybrid designed from the target (4-bit weights, ordinary CPU) upward, filling the gap for efficient edge-device LLM deployment. |
| [Let's Scale Step by Step: Compute-Efficient Hyperparameter Transfer for Large-Scale Mixture-of-Experts](http://arxiv.org/abs/2608.20061v1) | Nayeon Kim, Hojin Lee, Yunju Bak et al. | Proposes efficient hyperparameter transfer for MoE models, avoiding computationally expensive sweeping at extreme scales—practically valuable for large-scale model training. |
| [Discrete Diffusion Inference-Time Control with Nested Sequential Monte Carlo](http://arxiv.org/abs/2608.20123v1) | Lohithsai Yadala Chanchu, Hany Abdulsamad, Christian A. Naesseth | Studies inference-time control for discrete diffusion language models, steering sampling toward sequence-level rewards without retraining—extending diffusion model applications in text generation. |
| [FormalTCS: Benchmarking End-to-End Frontier Formal Theoretical Computer Science Research of Large Language Models](http://arxiv.org/abs/2608.20153v1) | Dingzirui Wang, Xuanliang Zhang, Keyan Xu et al. | First expert-validated end-to-end theoretical computer science (TCS) research benchmark for LLMs, filling the evaluation gap in AI-assisted mathematical research. |

**📊 Applications**
| Paper | Authors | Summary |
|:---|:---|:---|
| [G-CARL: Grounded Checklist-Aligned Reward Learning for Patient-Oriented Medical Report Interpretation](http://arxiv.org/abs/2608.20331v1) | Shiao Xie, Siyu Chen, Jianwei Lv et al. | Addresses personalized medical report interpretation by combining evidence-grounded medical factuality with context-dependent patient communication—filling a gap in existing medical vision-language tasks. |
| [ContractScrub: A benchmark for final review of legal contracts](http://arxiv.org/abs/2608.20204v1) | Yejin Bang, Kirsty Fielding, Brandan Oliver et al. | Benchmark for automated contract "scrubbing" (final review for errors and inconsistencies), a key evaluation tool for legal AI applications. |
| [HealMed: Multilingual Evaluation of Large Language Models in Medicine](http://arxiv.org/abs/2608.19981v1) | Yingjian Chen, Fan Gao, Sherry T. Tong et al. | Expert-reviewed multilingual medical LLM benchmark covering 9 languages, 1,000 examples each, and 3 task formats—advancing cross-lingual fairness research in medical AI. |
| [When Text and Numbers Disagree: Evidence Arbitration in Large Language Models](http://arxiv.org/abs/2608.20116v1) | Mattia Carletti, Edward Phillips, Fredrik K. Gustafsson et al. | Studies how LLMs arbitrate conflicting evidence from textual summaries, numerical observations, and tool outputs—essential for building reliable multimodal AI systems. |
| [Auditing Cross-Lingual Fairness in Language Model Watermarking](http://arxiv.org/abs/2608.20047v1) | Alexander Nemecek, Osama Zafar, Debargha Ganguly et al. | Audits multilingual fairness in LLM watermarking, revealing that English-centric evaluation designs can produce conclusive biases in multilingual deployment—critical for global compliance. |

### 3. Research Trend Signal
Three clear trends emerge from today's submissions: (1) LLM unlearning and knowledge erasure are transitioning from theoretical problems to benchmark-driven engineering evaluation; (2) Agent self-improvement and cross-task skill transfer have become focal points, reflecting growing research attention on long-term agent capability evolution; (3) Time series foundation models are experiencing concentrated activity (5+ related papers on Scale-Aware Pretraining, CLaST, DecoVAE, etc.), signaling time series forecasting as an emerging AI foundation model battleground. Additionally, the dense publication of multilingual fairness (HealMed, Watermarking Auditing) and domain-specific benchmarks (medical, legal, wine) indicates AI evaluation is shifting from general capabilities toward domain specialization.

### 4. Worth Deep Reading
1. **[ConceptGuard](http://arxiv.org/abs/2608.20338v1)** — The first context-sensitive unlearning benchmark, with direct engineering guidance value for AI safety compliance and model update management.
2. **[AI4AI-Bench](http://arxiv.org/abs/2608.20318v1)** — An Agent benchmark for recursive self-improvement, touching the core evaluation challenge of AI self-evolution—one of the most frontier topics in AI research.
3. **[Phantom Gains](http://arxiv.org/abs/2608.20290v1)** — Proposes a methodology for auditing self-improvement measurements; indispensable for any research involving model version iteration and self-improvement claims.