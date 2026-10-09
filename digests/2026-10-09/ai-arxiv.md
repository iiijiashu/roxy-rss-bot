# ArXiv AI 研究日报 2026-10-09

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-09 00:20 UTC

---

# ArXiv AI 研究日报 (2026-10-09)

## 今日速览
今日研究热点集中在**具身智能的实时性优化**（如Long-WAM解决视觉历史处理延迟）与**大规模多智能体系统的机构化设计**。在LLM训练方面，RLVR的探索解耦与后幻觉推理（PHR）成为关键关注点，旨在解决策略发现的瓶颈与幻觉传播问题。此外，针对终端/代码智能体的**协同进化**（Harness-Model Co-Evolution）和**预测性评估**方法显著增加，显示出从“基础模型”向“可靠工程化智能体”转化的趋势。气候建模AI（SciExam）与实时机器人控制框架也表现出跨学科融合的强劲势头。

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Decoupling Exploration from Optimization in RLVR](http://arxiv.org/abs/2610.10536v1) | S. Punjwani, M. Goldblum et al. | 针对RLVR中探索与优化耦合导致的策略停滞问题，提出解耦机制。值得关注，因为它可能突破当前语言模型在可验证奖励下发现新推理策略的瓶颈。 |
| [PHRBench: A Behavioral Evaluation of Post-Hallucination Reasoning in LLMs](http://arxiv.org/abs/2610.10455v1) | L. Meng, F. He et al. | 构建了评估LLM在幻觉信息进入上下文后如何修复或传播错误的行为基准。重要在于它揭示了多阶段LLM系统中幻觉对后续推理的具体影响机制。 |
| [Training Parallel Speculative Draft Models by Directly Minimizing Expected Decoding Rounds](http://arxiv.org/abs/2610.10411v1) | Y. Zhao, C. Cai et al. | 提出通过直接最小化预期解码轮次来训练并行推测草稿模型。该优化策略能显著降低LLM推理成本，提升并行草稿效率。 |
| [ResidualQuant: KV Cache Quantization for Looped Transformers with 2-Bit Residuals](http://arxiv.org/abs/2610.10381v1) | H. Kim, J. Lee et al. | 针对循环Transformer的KV缓存内存瓶颈，提出2位残差量化方法。对于部署高深度、参数高效的模型至关重要。 |
| [Composing What Each Teacher Learned: Multi-Teacher On-Policy Distillation through Teacher-Relative Shifts](http://arxiv.org/abs/2610.10460v1) | H. Sang, Z. Zhou et al. | 在多教师在线策略蒸馏中引入教师相对偏移，解决不同域教师的信号冲突。优化了复杂任务下的知识迁移效率。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [A Society of Researchers: Designing Institutions for Populations of Autonomous Research Agents](http://arxiv.org/abs/2610.10468v1) | A. Asaria, D. Gandhi et al. | 探讨如何将数千个自主研究智能体组织成具有协作结构的“社会”。为大规模多智能体系统的涌现行为提供治理框架。 |
| [Rephrase Before You Act: Characterizing and Mitigating Language Sensitivity in Vision-Language-Action Models](http://arxiv.org/abs/2610.10526v1) | M. Watts, Y. Cui et al. | 发现VLA模型对指令措辞极度敏感（一词之差导致成功率大幅下降）。提出的缓解策略对提升具身智能的鲁棒性具有实际工程价值。 |
| [EmbodiedRSI: Active Continual Robot Learning Through Hypothesis-Guided Co-Evolution](http://arxiv.org/abs/2610.10498v1) | P. Song, Z. Liang et al. | 利用假设引导的协同进化进行主动持续机器人学习，减少对新机器人数据的依赖。解决了机器人在环境变化后性能退化的难题。 |
| [CoTrace: Data Recipes for Training Terminal Agents with Harness-Model Co-Evolution](http://arxiv.org/abs/2610.10426v1) | J. Chen, J. Zhang et al. | 提出终端智能体训练的数据配方，强调运行时Harness与模型权重的协同进化。关注点在于智能体系统的整体工程化能力而非单一模型权重。 |
| [Before They Can Solve: Predicting Post-Training Coding-Agent Performance from Base Models](http://arxiv.org/abs/2610.10478v1) | T. Yu, A. Bukharin et al. | 研究如何从基础模型预测昂贵的代码智能体后训练表现。为资源分配和模型选择提供了早期指标。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Long-WAM: Scaling the Context of World-Action Models](http://arxiv.org/abs/2610.10528v1) | W. Huang, B. Zhang et al. | 提出在实时控制约束下扩展因果世界-动作模型上下文的模型-系统框架。解决了视觉历史处理延迟与实时性之间的核心矛盾。 |
| [RECAST: Learning to Compute the Right Context through Adaptive Evidence Routing](http://arxiv.org/abs/2610.10507v1) | Y. Hao, K. Sayana et al. | 超越固定相似度的RAG，通过自适应证据路由计算“正确上下文”。在处理长异构信息源时显著优于传统检索增强生成。 |
| [RoboJEPA: Scaling Robotic Latent World Models](http://arxiv.org/abs/2610.10515v1) | A. Zholus, N. Beltran-Velez et al. | 建立了评估潜在世界模型随规模（模型、数据、算力）扩展的原则性方法。填补了机器人隐空间学习领域的可扩展性评估空白。 |
| [Why Forget-Only Unlearning Needs Memorization](http://arxiv.org/abs/2610.10519v1) | L. Radić, V. Singhal et al. | 研究“仅遗忘”去训练算法中保留数据/模型状态的必要性。为合规性去训练提供了理论边界条件。 |
| [RunningTab: Direct Workspace Interaction with Environment-Side Tabs](http://arxiv.org/abs/2610.10444v1) | J. Baek, S. Jeong et al. | 允许LLM智能体通过终端直接搜索和阅读工作区文件，无需索引。简化了基于文件的知识工作智能体架构。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [SciExam for ENSO: Can AI Agents Build Climate Models?](http://arxiv.org/abs/2610.10513v1) | Y. Zhang, L. Liu et al. | 针对厄尔尼诺-南方涛动（ENSO）设计AI科学考试，评估智能体构建气候模型的能力。这是AI在气候科学建模应用的重要里程碑。 |
| [FoldBack: Self-Correcting Masked Generative Policy for Long-Horizon Garment Folding](http://arxiv.org/abs/2610.10462v1) | L. Zhuang, S. Fan et al. | 针对长周期衣物折叠任务，提出自我纠正的掩码生成策略。解决了机器人在抓取失败或偏离目标后的恢复机制。 |
| [TaoD2C-Bench: Benchmarking MLLMs for Industrial UI Code Generation Beyond Visual Fidelity](http://arxiv.org/abs/2610.10374v1) | C. Shi, Y. Chen et al. | 基准测试多模态LLM在工业UI代码生成中超越视觉保真度的约束感知推理能力。聚焦于多模态信息的领域规则融合。 |
| [RobotWorld: Benchmarking Multimodal Agents for Robot Use Across Diverse Tasks and Embodiments](http://arxiv.org/abs/2610.10409v1) | Z. Yang, C. Li et al. | 创建模拟测试台，评估通用智能体在物理世界中使用机器人的能力。桥接了数字智能体能力与物理执行器之间的差距。 |

## 研究趋势信号
今日投稿显示，研究重心正从单纯的“模型能力”转向**“系统鲁棒性”与“工程化闭环”**。具体表现为：1）在具身智能领域，关注点从端到端生成转向**实时上下文管理**（Long-WAM）和**语言敏感性缓解**；2）在多智能体领域，开始探索**机构化设计**（Society of Researchers）而非单纯的数量堆叠；3）在LLM应用侧，**去训练理论**和**后幻觉推理**成为安全与可靠性研究的新前沿；4）针对代码/终端智能体，**Harness（运行时环境）与模型权重的协同进化**成为主流方法论，暗示“软件栈”本身成为优化目标。

## 值得精读
1.  **[A Society of Researchers: Designing Institutions for Populations of Autonomous Research Agents](http://arxiv.org/abs/2610.10468v1)**
    *   **理由**：该文超越了传统的多智能体通信机制，探讨了大规模自主研究群体如何自发形成组织结构。对于理解未来AI科研自动化的治理、协作模式以及规模化瓶颈具有前瞻性理论价值。
2.  **[SciExam for ENSO: Can AI Agents Build Climate Models?](http://arxiv.org/abs/2610.10513v1)**
    *   **理由**：这是AI for Science领域的关键评测工作。它不依赖标准答案，而是评估智能体构建物理一致性模型的能力。该基准设计反映了AI评估范式从“问答”向“科学发现”的深刻转变，值得深入研究其评测方法论。
3.  **[Long-WAM: Scaling the Context of World-Action Models](http://arxiv.org/abs/2610.10528v1)**
    *   **理由**：解决了机器人实时控制中的核心痛点：如何在有限的计算延迟内利用足够的视觉历史。该论文提出的模型-系统协同设计框架对实际部署具身智能体具有直接的工程指导意义，且填补了世界模型可扩展性研究的空白。