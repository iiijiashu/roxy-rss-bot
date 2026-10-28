# ArXiv AI 研究日报 2026-10-28

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-28 00:20 UTC

---

## ArXiv AI 研究日报 (2026-10-28)

### 今日速览
今日研究焦点显著转向**智能体可靠性与评估**，包括针对长时程任务的信用分配、自主研究系统的基准测试以及多模态机器人在垂直领域的闭环规划。同时，**扩散语言模型（dLLM）的高效生成**和**检索增强生成（RAG）的范式转变**（如 DecisionRAG）成为核心关注点。在安全与对齐领域，研究深入至防止越狱攻击的主动探查及人类监督的强制性机制。此外，理论界对**线性循环神经网络的稳定性**及**Transformer 泛化界**进行了新的数学探讨。

### 重点论文

#### 🧠 大语言模型（架构、训练、对齐、评估）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Retriever-Free Retrieval: Navigating Documents with Decision Models](http://arxiv.org/abs/2610.35868v1) | Chao Wan et al. | 提出 DecisionRAG，利用决策模型导航文档以解决传统检索器与生成器之间的能力不对称。值得关注的因为它有望突破固定嵌入空间检索的瓶颈，使强生成器能恢复检索失败的信息。 |
| [Learning When to Commit: Schedule Distillation for Fast Diffusion Language Models](http://arxiv.org/abs/2610.35804v1) | Aidar Myrzakhan et al. | 针对 dLLM 解码轮次多的问题，通过日程蒸馏学习何时对 token 进行承诺。这对提高并行生成效率至关重要，特别是在预测剩余位置时利用已承诺 token 辅助推理。 |
| [Quantitative Generalization Bounds for Multi-Layer Transformers](http://arxiv.org/abs/2610.35715v1) | Marius Henry et al. | 探讨了 Transformer 泛化到比训练数据更长、更难实例的理论边界。值得阅读，因为它试图解释为何“少数长字符串”可能胜过“许多短字符串”这一反直觉现象。 |
| [Understanding Jev-Style System One Models](http://arxiv.org/abs/2610.35826v1) | Mingyang Song et al. | 研究了通过直接预测候选项概率的“系统一”模型结构，旨在减少 LLM 中的选择偏差。这为理解模型内部决策机制及消除呈现顺序偏见提供了新视角。 |

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [FOCUS: Active Critic Learning for Long-Horizon Language Model Agents](http://arxiv.org/abs/2610.35801v1) | Zhengping Jiang et al. | 解决长时程智能体中稀疏结果奖励导致的信用分配困难问题。通过主动学习者训练批评者来估计中间状态价值，避免了重复采样带来的不准确估计。 |
| [MiRL: Error-Targeted Reinforcement Learning for Correcting Terminal Agent Misbehaviors](http://arxiv.org/abs/2610.35697v1) | Runchu Tian et al. | 将误差目标学习应用于终端智能体，通过识别特定弱点并针对性训练来修复它们。这种可读性强且能验证弱点是否修复的方法对调试长时程任务很有价值。 |
| [EvoRouter: Cost-Efficient Multi-Agent Routing via Insight-Guided On-Policy Distillation](http://arxiv.org/abs/2610.35690v1) | Yitao Xiao et al. | 应对多智能体系统配置空间组合爆炸及奖励稀疏问题。通过洞察引导的在线策略蒸馏优化路由，平衡了成本效率与多智能体协作效果。 |
| [I-HITL: Inalienable Human-in-the-Loop](http://arxiv.org/abs/2610.35835v1) | Samuel Breckenridge et al. | 引入“不可剥夺的人类在环”概念，以应对智能体绕过护栏的问题。这在 AI 安全中至关重要，提供了强制人类监督关键动作的鲁棒机制。 |

#### 🔧 方法与框架（新技术、基准测试、效率优化）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Auto-Research Arena: Benchmarking and Advancing Auto-Research in Language Modeling](http://arxiv.org/abs/2610.35866v1) | Xi Chen et al. | 引入多目标基准测试，评估自主研究系统并在语言建模中发现新想法。随着自主研究能力提升，该基准对推动有意义研究进展具有支撑作用。 |
| [Reva: Real-Time Vulnerability Detection through Contextual Probing of LLMs](http://arxiv.org/abs/2610.35829v1) | Amine Lbath et al. | 利用 LLM 对每个新函数进行实时上下文探查，作为编码智能体生成代码后的第一道防线。对于解决代码生成速度快于人工审查速度的痛点非常关键。 |
| [Audit Where Hacks Pay: Budgeted Strong-Verifier Audits Against Reward Hacking in GRPO](http://arxiv.org/abs/2610.35716v1) | Shurun Li et al. | 研究在 GRPO 中如何有限度地分配强验证器预算，以审计那些被弱检查通过但可能利用漏洞的rollout。这对防止强化学习中的奖励作弊具有直接应用价值。 |
| [Triage: Skip, Skim, or Refine Attention Tiles in Video Diffusion Transformers](http://arxiv.org/abs/2610.35706v1) | Yeonjae Kim et al. | 观察视频 DiT 中近似误差随输出变化的特性，对注意力块进行“跳过、略读或细化”的分诊处理。通过差异化精度降低推理成本，优于现有的单一精度稀疏方法。 |

#### 📊 应用（垂直领域、多模态、代码生成）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [FLORE: Learning Force-Reactive Humanoid Loco-Manipulation](http://arxiv.org/abs/2610.35862v1) | Sihang Li et al. | 提出 FLORE 框架，使人形机器人能够学习协调双手和全身力的力反应式任务。突破了仅靠运动学轨迹无法指定接触力的局限，适用于日常复杂操作。 |
| [NPC-RubricBench: Patient-specific rubric-based evaluation of LLMs](http://arxiv.org/abs/2610.35847v1) | Wei-Wei Zhang et al. | 引入阶段感知基准，评估 LLM 在纵向癌症护理路径中如何跟踪临床责任的演变。弥补了现有评估仅关注孤立临床场景的不足，更贴近真实医疗流程。 |
| [Explainable Multimodal AI Approach to Reduce Unnecessary Breast Biopsies](http://arxiv.org/abs/2610.35704v1) | Sadam Hussain et al. | 结合 Grad-CAM 的可解释多模态方法用于预测活检结果。旨在通过透明化 AI 决策来减少不必要的乳腺活检，提升临床辅助诊断的可信度。 |
| [From Self-Confidence to Statistical Accuracy: Scaling HITL Evaluation](http://arxiv.org/abs/2610.35698v1) | Harine Choi et al. | 探索如何利用 LLM 作为法官辅助直接人工审计，以扩展人类在环评估的规模。解决了模型自我置信度校准不佳但仍可用于高效评估的实用问题。 |

### 研究趋势信号
今日投稿显示出**智能体系统工程化**的明显趋势，研究不再仅关注能力上限，而是深耕于长时程任务的信用分配、多智能体路由的成本效率以及防止智能体“作弊”或绕过安全机制的鲁棒性设计。同时，**评估基准的纵向化**（如医疗护理、自主研究）和**多模态在特定垂直领域（如机器人力控、病理诊断）的闭环落地**成为热点，表明 AI 正在从通用能力展示转向解决具体工作流中的可靠性与可解释性问题。

### 值得精读
1.  **[FOCUS: Active Critic Learning for Long-Horizon Language Model Agents](http://arxiv.org/abs/2610.35801v1)**：长时程智能体的核心痛点是中间状态的价值估计。这篇论文提出的主动批评者学习机制对于理解如何解决稀疏奖励下的信用分配具有方法论上的重要参考价值，适合希望深入 Agent 内部训练机制的研究者。
2.  **[Retriever-Free Retrieval: Navigating Documents with Decision Models](http://arxiv.org/abs/2610.35868v1)**：DecisionRAG 挑战了“检索-生成”分离的传统 RAG 范式。若决策模型能直接导航文档，可能从根本上改变大模型处理长文档或知识库的方式，值得探索其具体架构及与现有检索器的差异。
3.  **[Quantitative Generalization Bounds for Multi-Layer Transformers](http://arxiv.org/abs/2610.35715v1)**：Transformer 的泛化能力一直是理论界的未解之谜。该文提供了关于长序列泛化的定量边界，解释了训练数据长度对泛化到更难实例的影响，是理解 LLM 内在推理能力极限的重要理论读物。