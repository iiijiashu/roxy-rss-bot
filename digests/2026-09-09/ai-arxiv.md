# ArXiv AI 研究日报 2026-09-09

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-09 04:48 UTC

---

## ArXiv AI 研究日报 — 2026-09-09

### 1. 今日速览
今日 ArXiv 投稿展现出 AI 智能体工程化与可解释性研究的显著升温，Procedural Graphs、MeClear、SAEScientist-Bench 等论文聚焦 Agent 的长期记忆、工具调用可靠性及自主研究能力评估。在基础模型方向，Learning Length-Extrapolatable Recurrent Models 和 Silver Rate 优化算法论文为长上下文建模与训练效率提供新的理论视角。多模态与机器人领域，TANGO 和 DeCAL 将视觉-语言-动作模型推向接触丰富的物理交互场景。

### 2. 重点论文

#### 🧠 大语言模型
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1) | Hanwen Jiang | 提出可外推长度的循环模型训练方法，解决 BPTT 在超出训练视界后失效的问题。为长上下文建模提供了优于标准 Transformer 的效率路径。 |
| [It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention](http://arxiv.org/abs/2609.09085v1) | Raito Kiya et al. | 深入分析注意力 Sink 现象的根本原因，指出自集中和值非混合效应而非 RoPE 本身是主因。对低比特量化设计具有重要指导意义。 |
| [Everything in Moderation: Per-Domain Coverage Optima and Alignment-Resistant Domain Gaps in Multi-Domain Mid-Training](http://arxiv.org/abs/2609.09081v1) | Yunpeng Xu, Kun Zheng | 系统研究多领域中期训练中的数据配比优化问题，揭示对齐阶段难以弥补的域间隙。为大规模模型训练的中间阶段设计提供理论依据。 |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey et al. | 发现预训练损失最低的 checkpoint 未必是 SFT 的最佳起点，在 30B MoE 训练中验证了这一现象。挑战了当前 checkpoint 选择的主流实践。 |

#### 🤖 智能体与推理
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu et al. | 提出程序化图结构使 Agent 能够显式管理执行流程，而非依赖隐式历史累积。解决长 horizon 规划中 Procedural knowledge 缺失的核心问题。 |
| [MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1) | Boyu Yang et al. | 引入博弈论方法对 Agent 长期记忆进行归因与风险评估，解决传统检索机制忽视下游效用导致的信息过时问题。 |
| [SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?](http://arxiv.org/abs/2609.09113v1) | Yuqiao Tan et al. | 构建首个评估 AI Agent 自主进行稀疏自编码器可解释性研究能力的基准。填补了递归自我改进中后验监控与审计的缺失环节。 |
| [Copying explains the collective behavior of AI agents in the wild](http://arxiv.org/abs/2609.09150v1) | Giordano De Marzo et al. | 通过 Wiki 实验揭示 AI Agent 在无显式协调下的集体复制行为，为多 Agent 系统的涌现协作提供实证基础。 |
| [ReCite: Agentic Reasoning for Faithful Citation](http://arxiv.org/abs/2609.09156v1) | Yuyang Huang et al. | 将 Agent 推理能力应用于学术引用的忠实性保障，解决大规模文献中自动引用推荐准确性不足的问题。 |

#### 🔧 方法与框架
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Silver Rate Is (Almost) Optimal for Gradient Descent Acceleration](http://arxiv.org/abs/2609.09152v1) | Yuhan Ye, Kaizhao Liu | 证明 Silver 速率在平滑凸优化中接近梯度下降加速的理论极限。为优化器步长调度设计提供精确的理论边界。 |
| [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](http://arxiv.org/abs/2609.09075v1) | Tommy Sha et al. | 提出无需 rollouts 的难度先验方法解决 RLVR 中冷启动 prompt 选择问题，克服组内奖励变化为零的梯度消失困境。 |
| [ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1) | Min Zeng et al. | 通过分解生成与动态自反馈实现工具使用数据的闭环合成，解决现有方法生成效率低、特征分布失衡的问题。 |
| [ExecCritic: Learn to Test, Test to Improve for Coding Agents](http://arxiv.org/abs/2609.09133v1) | Leitian Tao et al. | 提出执行反馈驱动的编码 Agent 迭代改进框架，解决 Agent 生成测试可能编码不完整行为目标的问题。 |
| [Curriculum Learning as Transport: Understanding Curricula with Wasserstein Geodesics](http://arxiv.org/abs/2609.09099v1) | Changho Shin, David Alvarez-Melis | 用最优传输理论重新形式化课程学习，提供 Wasserstein 测地线路径来解析课程设计的耦合效应。 |

#### 📊 应用
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body VLA Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li et al. | 将全身视觉-语言-动作模型应用于杂乱室内环境的人形机器人导航，突破传统 2D 路径规划的局限。 |
| [DeCAL: Towards Physically-Grounded Dexterous VLA via Contact-Aware Latent Co-Imagination](http://arxiv.org/abs/2609.09119v1) | Yankai Fu et al. | 引入接触感知的潜在共想象机制，提升灵巧操作 VLA 模型在视觉遮挡和复杂接触动力学下的表现。 |
| [NOAH: Longitudinal Multimodal Time-Aware Model for Patient Journey Representation](http://arxiv.org/abs/2609.09140v1) | Tobias Susetzky et al. | 构建纵向多模态时间感知模型用于患者全程轨迹表示与预测，解决现有 AI 模型难以捕捉不规则时间序列的难题。 |
| [Performance of Clinical AI System and Physicians in Primary Care Diagnostics](http://arxiv.org/abs/2609.09070v1) | Andy Nkansah et al. | 在 150 个波兰语初级医疗咨询中比较 Doctorina、医生与前沿 LLM 的诊断表现，Doctorina 达 82% Top-1 一致性。 |
| [SQLMorph: Query Mutation and Fine-Grained Metrics for Text-to-SQL Evaluation](http://arxiv.org/abs/2609.08950v1) | Mohammadhossein Malekpour et al. | 提出查询变异与细粒度指标体系解决文本到 SQL 评估瓶颈，弥补公共基准无法捕捉企业 Schema 复杂性的缺陷。 |

### 3. 研究趋势信号
今日投稿显示三个新兴方向：一是 Agent 工程化从单纯的性能提升转向可靠性与可审计性，Procedural Graphs、MeClear、SAEScientist-Bench 共同指向 Agent 长期运行的可解释需求；二是训练理论精细化，Silver Rate、Curriculum as Transport、Good Pretraining Bad SFT 等论文表明研究正从工程实践深入理论基础；三是物理世界交互成为 VLA 模型的新前沿，TANGO 和 DeCAL 将灵巧操作与复杂环境导航纳入统一框架。

### 4. 值得精读
1. **Procedural Graphs** — 直击 Agent 长 horizon 规划的核心痛点，提出显式程序结构的创新方案。
2. **SAEScientist-Bench** — 首次系统评估 AI Agent 自主科研能力，对递归自我改进路径具有重要参考价值。
3. **Copying explains collective behavior** — 通过实证实验揭示多 Agent 涌现行为的底层机制，为 Agent 系统设计提供新视角。