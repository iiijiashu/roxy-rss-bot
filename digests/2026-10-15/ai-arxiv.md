# ArXiv AI 研究日报 2026-10-15

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-15 00:20 UTC

---

## ArXiv AI 研究日报

**日期：** 2026-10-15
**数据来源：** ArXiv (cs.AI, cs.CL, cs.LG)
**论文数量：** 50

### 今日速览
今日研究热点集中在**长程自主智能体**（Long-horizon Agents）与**物理世界的递归自我改进**（Physical RSI），旨在解决开源模型在长期任务中的瓶颈。
**强化学习**（RL）领域显著关注可验证奖励（RLVR）下的策略优化、奖励信号分解及离策略学习，以提升模型在数学与代码任务中的可靠性。
**具身智能**方面，VLA（视觉-语言-动作）模型的预训练数据质量、硬件鲁棒性及从人类视频到机器人的快速迁移成为核心议题。
此外，**推理效率优化**（如免训练解码、投机解码）与**模型可解释性/监控**（如激活解释器）也呈现活跃趋势。

### 重点论文

#### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning](http://arxiv.org/abs/2610.18862v1) | Luo et al. | 提出一种免训练的对比解码方法，有效缩短思维链（CoT）长度。值得关注其无需额外训练即可提升推理效率的通用性。 |
| [SP$^2$ec: Adaptive Self-Speculative Decoding for Vision-Language Models](http://arxiv.org/abs/2610.18735v1) | Huang et al. | 针对 VLM 模态多样性难题，提出自适应自投机解码。旨在通过复用部分计算显著加速视觉语言模型的推理过程。 |
| [Statistical Vignettes on the Grokking Phenomenon](http://arxiv.org/abs/2610.18811v1) | Gning et al. | 在解析可处理的场景中解构 Grokking 现象，分离初始化、信号强度等因素影响。为理解深度学习中的延迟泛化提供统计视角。 |
| [Depth Memory](http://arxiv.org/abs/2610.18809v1) | González-Martínez et al. | 对比残差连接与流形约束超连接等深度聚合机制。旨在提升语言模型的信息传播效率与表达能力。 |
| [On the Monitorability of Natural Language Autoencoders: Identification vs Discrimination](http://arxiv.org/abs/2610.18727v1) | Denamganaï | 探讨自然语言自编码器作为模型监督工具的局限性，特别是可监控性问题。为基于激活解释的 AI 对齐技术提供重要参考。 |
| [Looking Complete Is Not Being Grounded: Evaluating LLM Sitreps Against Human-Authored Situation Reports](http://arxiv.org/abs/2610.18762v1) | Kumar | 评估 LLM 生成的危机报告（Sitrep）与人类专家报告的差距。指出自动化评估需关注实际从业者需求而非简单对比。 |

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards](http://arxiv.org/abs/2610.18868v1) | Hu et al. | 通过密集进度奖励扩展长程智能体环境，解决开源模型在长期任务上的弱点。对实现自动化发现与递归自我改进至关重要。 |
| [Hybrid Reasoning Agents](http://arxiv.org/abs/2610.18861v1) | Zou et al. | 结合文本交互与潜空间推理，构建能超越人类语言限制的智能体。旨在平衡推理效率、工具访问与透明性。 |
| [Pack Light, CarryOn: Building Object-Oriented Context for Long-Horizon Agents](http://arxiv.org/abs/2610.18784v1) | Lu et al. | 将长程上下文重组为可复用的进度对象而非原始历史。旨在解决智能体处理冗长交互历史带来的效率瓶颈。 |
| [BLADE: Auditing Information Use for Failure Attribution in LLM Multi-Agent Systems](http://arxiv.org/abs/2610.18780v1) | Guo et al. | 针对多智能体系统故障难诊断问题，提出信息使用审计方法。有助于定位错误传播源头，提升协作系统的可靠性。 |
| [Beyond the Verdict: Agentic Code Judging with Verifiable Feedback](http://arxiv.org/abs/2610.18760v1) | Deng et al. | 在代码测试时缩放中引入可验证反馈的验证器。不仅评估候选正确性，还提供失败证据以指导修订。 |
| [Rubrics from the Task, Verdicts from Evidence: Pointwise Rubric Rewards with Tool-Augmented Judges](http://arxiv.org/abs/2610.18766v1) | Liu et al. | 提出基于任务的标准（Rubric）奖励模型，避免响应诱导偏差。结合工具增强的评判者提升机械约束下的评估准确性。 |

#### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in RLVR](http://arxiv.org/abs/2610.18853v1) | Li et al. | 分析可验证奖励强化学习（RLVR）中更大批次导致学习缓慢的原因。深化对平方根学习率规则在实践中失效的理解。 |
| [Enabling Token-wise Importance Sampling in Off-Policy RLVR with Proximal KL Regularization](http://arxiv.org/abs/2610.18738v1) | Bai et al. | 证明在 proximal KL 正则化下可实现无偏的 token 级重要性加权。解决离策略 RLVR 中的梯度偏差问题。 |
| [Unlocking Token Rewards via Training-Free Reward Attribution](http://arxiv.org/abs/2610.18704v1) | Wu et al. | 提出免训练方法从现有奖励模型中提取 token 级奖励信号。通过估算 token 影响实现极高效的细粒度信用分配。 |
| [Self-Evolving Agent Harness](http://arxiv.org/abs/2610.18813v1) | Wei et al. | 形式化了一种反馈驱动的智能体脚手架自我进化过程。在固定模型权重下，通过修订提示、记忆和工作流实现持续改进。 |
| [Jeva: System One Models from First Principles](http://arxiv.org/abs/2610.18773v1) | Li et al. | 从第一性原理重构“系统一”模型，强调对决策问题结构（如空值感知）的尊重。旨在提升低延迟决策的直接性与结构合理性。 |
| [Where Do LLM Ensemble Gains Come From? Decomposing Candidate Value, Diversity, and Aggregation](http://arxiv.org/abs/2610.18786v1) | Kim | 分解 LLM 集成增益的来源，区分候选价值、多样性与聚合策略。为优化集成方法提供实证依据。 |

#### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1) | Wang et al. | 引入 SEAR 框架，让智能体自主编写、测试并保留控制代码作为技能。探索智能体在机器人领域是否真正实现了学习。 |
| [Who Improves the Robot? Toward Physical Recursive Self-Improvement](http://arxiv.org/abs/2610.18842v1) | Zhou et al. | 研究物理递归自我改进（Physical RSI），让物理经验指导机器人能力及其改进程序的更新。标志着从人工驱动到自主进化的转变。 |
| [LIBERO-RIG: A Hardware-Setup Robustness Benchmark for Vision-Language-Action Models](http://arxiv.org/abs/2610.18843v1) | Cui et al. | 建立 LIBERO-RIG 基准，专门测试 VLA 模型对硬件设置变化（如相机校准、控制器速率）的鲁棒性。填补了部署环境一致性评估的空白。 |
| [Steertuning Policies from a Few Human Videos](http://arxiv.org/abs/2610.18711v1) | Yan et al. | 提出 Steertuning 系统，允许机器人从少于 5 段人类视频中快速学习新任务。极大降低了机器人策略学习的示教数据需求。 |
| [The Last Remote Sensing Model Built by Humans? Casting Any Earth Observation Task as Recursive Self-Improvement](http://arxiv.org/abs/2610.18845v1) | Zhao et al. | 将地球观测任务重构为验证器与执行器的递归自我改进循环。展示了智能体替代专家设计训练食谱的可能性。 |
| [SolBehave: Evaluating the Behavioural Correctness of LLM-Generated Smart Contracts](http://arxiv.org/abs/2610.18745v1) | Delvecchio et al. | 引入 SolBehave 基准，评估 LLM 生成智能合约的行为正确性而非仅编译通过。针对不可修补合约的永久故障风险提供安全评估。 |
| [PreciseCoder: Faithful and Generalizable Debugging Beyond Unit-Test Rewards](http://arxiv.org/abs/2610.18755v1) | Zhan et al. | 分析仅使用单元测试奖励进行 RL 训练的缺陷，提出更忠实且可泛化的调试方法。避免模型学到仅通过测试但逻辑错误的捷径。 |

### 研究趋势信号
今日投稿凸显“**可验证性**”作为提升 AI 能力的关键杠杆：无论是在 RLVR 中的奖励信号精细化（token-level rewards）、智能体环境中的进度奖励设计，还是代码/合约生成的行为正确性评估，均强调以可检验标准替代模糊的人类偏好。同时，“**递归自我改进**（RSI）”从抽象概念走向物理实体（机器人）与具体领域（遥感、药物发现），表明 AI 系统正从单纯执行任务转向优化自身改进流程。此外，针对**长程任务**的效率优化（上下文压缩、高效推理）成为解决自主智能体实用化瓶颈的核心方向。

### 值得精读
1.  **[SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1)**：该论文将递归自我改进引入具身智能领域，不仅提供了框架，还通过基准测试验证了智能体是否真正在“学习”而非过拟合，对理解 AI 自主进化的边界具有开创性意义。
2.  **[Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards](http://arxiv.org/abs/2610.18868v1)**：直接应对当前开源模型在长期自主任务上的失败，其提出的密集进度奖励机制可能是构建经济价值高的长期智能体的关键技术组件。
3.  **[Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in RLVR](http://arxiv.org/abs/2610.18853v1)**：深入剖析了 RLVR 训练中的反直觉现象，对于所有从事基于验证奖励的强化学习研究的团队，理解批次大小与学习率的交互作用至关重要，可避免常见的实践陷阱。