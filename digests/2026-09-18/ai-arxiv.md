# ArXiv AI 研究日报 2026-09-18

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-18 00:20 UTC

---

# ArXiv AI 研究日报 (2026-09-18)

## 今日速览
今日投稿聚焦于**LLM 内部机制可解释性**与**智能体安全对齐**。研究者深入探讨奖励黑客的内部表征签名，并提出了防止合成数据训练导致模型崩溃的新理论视角。在智能体领域，重点转向了**多智能体系统的宏观行为建模**（如 Flag Game）和**细粒度安全治理**（如复合策略违规检测）。此外，**物理约束机器学习**与**机器人灵巧操作**（力感知生成）成为垂直应用的重要突破点。

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Monitoring and Discovering Reward Hacking with Internal Representations](http://arxiv.org/abs/2609.19101v1) | Leon Bergen, Usha Bhalla et al. | 分析了前沿开源 LLM 内部表征中奖励黑客的“特有签名”。这为通过监测模型内部状态来早期发现对齐失效提供了可操作的方法。 |
| [Preventing Model Collapse: A Fisher-Rao Perspective](http://arxiv.org/abs/2609.18878v1) | Matteo Marchi, João P. Silvestre et al. | 从 Fisher-Rao 几何视角刻画合成数据递归训练的退化动力学。该理论框架为解决 LLM 训练中普遍存在的模型崩溃问题提供了新的数学解法。 |
| [A Zeroth-Order Paradigm for LLM Preference Alignment](http://arxiv.org/abs/2609.19144v1) | Peter Chen, Xi Chen et al. | 提出基于零阶优化的偏好对齐范式，避免了对数似然位移问题。这对于降低 DPO 等对齐方法的计算与显存开销具有显著意义。 |
| [Higher-order pruning of experts in mixture-of-experts](http://arxiv.org/abs/2609.18916v1) | Alex M. Tseng, Prannay Kaul et al. | 针对 MoE 模型的显存瓶颈，提出了考虑专家间高阶交互性的剪枝算法。该方法比传统独立剪枝更能保留模型能力，提升压缩效率。 |
| [Infinite-Parameter LLMs: Generating and Adapting Weights](http://arxiv.org/abs/2609.18842v1) | Jinli Hu, Ross M. Clarke et al. | 探索在实时数据流中生成和适应模型权重的“无限参数”架构。这挑战了静态权重存储的传统范式，暗示了模型即服务的动态演进方向。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Flag Game: A Toy Model for Mechanistic Swarm Interpretability](http://arxiv.org/abs/2609.19124v1) | Elizabeth Pavlova, Hidenori Tanaka | 通过玩具模型揭示了 AI 智能体集群中信念快速形成与传播的机制。该研究对于理解涌现的集体对齐风险和安全性至关重要。 |
| [Compositional Policy Violations: When Step-Level Compliance Fails](http://arxiv.org/abs/2609.18820v1) | Ashwini Kurady, Sri S.C. Grandhi et al. | 指出当前步级评估无法捕获智能体工作流中的“复合”策略违规。这揭示了监管滞后于智能体能力的系统性治理缺口。 |
| [Cognitive Extensions for Dual-Process Language Agents](http://arxiv.org/abs/2609.19128v1) | J. M. dos Santos, A. L. Oliveira | 引入记忆与自我反思模块，扩展双过程智能体（快思考/慢思考）。增强了智能体在长程交互任务中的状态追踪和故障恢复能力。 |
| [CERA-MoA: Co-Evolving Routing Mechanisms with LLM Agents](http://arxiv.org/abs/2609.18779v1) | Jiaxuan Jiang, Liyuan He et al. | 提出路由机制与智能体微调同步进化的混合智能体范式。解决了传统 MoA 中路由策略无法适应智能体能力演变的问题。 |
| [Taming the Agentic RAN: Stability-Guaranteed Arbitration](http://arxiv.org/abs/2609.18857v1) | S. B. Hashemi Natanzi, Bo Tang | 在 O-RAN 系统中为具有独立目标的多个 AI 智能体提供稳定性保证的仲裁机制。解决了多智能体在共享资源控制下可能产生的不安全行为。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1) | Hejia Geng, Zesen Huang et al. | 将破碎的科学代码库转化为智能体可学习的执行环境。这一基准使得科学计算智能体能够获取真实的领域反馈，促进科研自动化。 |
| [Exponential Hardness of Off-Policy Evaluation under History-Dependent Logging](http://arxiv.org/abs/2609.19135v1) | Pranaya Jajoo | 证明了在历史依赖日志下，非策略评估具有指数级难度。该负结果强调了在复杂 POMDP 环境中，数据记录方式对评估效率的关键影响。 |
| [RLLBC-Lib: An Educational Code Library for RL and Learning-Based Control](http://arxiv.org/abs/2609.19074v1) | Bernd Frauenknecht, Emma Cramer et al. | 提供了一个易访问的强化学习与控制库，旨在降低入门门槛。通过清晰展示不同对象间的复杂交互动态，有助于 RL 知识的普及。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [rMuscle: Robotic Muscle Memory for Efficient Vision-Language-Action Model Inference](http://arxiv.org/abs/2609.19104v1) | Kaijun Zhou, Zhiyang Li et al. | 利用“肌肉记忆”优化 VLA 模型在工业场景下的推理效率。这种缓存机制显著提升了自动化产线中机器人的实时响应能力。 |
| [Evidence-Grounded Agentic Formulation Development in an Autonomous Laboratory](http://arxiv.org/abs/2609.19099v1) | M. M. Craig, R. J. Hickman et al. | 展示了智能体在自主实验室中基于结构化证据进行药物制剂开发的潜力。该研究是 AI for Science 在化学领域的重要进展。 |
| [ReFigBench: Benchmarking Scientific Figure Reconstruction](http://arxiv.org/abs/2609.18844v1) | Liyang Fan, Chi Wei et al. | 专注于多模态编码智能体将视觉输入转化为可编辑 PowerPoint 图表的能力。填补了当前智能体评估中在文档生成层面的空白。 |

## 研究趋势信号
今日投稿呈现出**智能体安全性**与**内部机制可解释性**并行的趋势。一方面，研究正从简单的行为评估转向深层的**“宏观智能体动力学”**，例如通过 Flag Game 建模群体信念传播；另一方面，**合成数据**被视为缓解数据枯竭的关键，但由此引发的**模型崩溃**动力学受到理论层面的关注。在应用端，**“力感知”**生成模型在机器人领域的引入表明，单纯的运动学轨迹已不足以支撑复杂物理交互，物理信息正在渗透进主流 AI 架构。

## 值得精读

1.  **[Flag Game: A Toy Model for Mechanistic Swarm Interpretability](http://arxiv.org/abs/2609.19124v1)**
    *   **理由**：将凝聚态物理的统计力学工具引入多智能体系统，为理解对齐过程中的集体行为涌现提供了独特的微观视角，是解读未来 AI 安全挑战的基础性工作。

2.  **[Preventing Model Collapse: A Fisher-Rao Perspective on the Dynamics of Training with Synthetic Data](http://arxiv.org/abs/2609.18878v1)**
    *   **理由**：在数据工程日益依赖合成内容的背景下，本文不仅提出了“防崩”需求，更给出了基于信息几何的严格数学分析，对于深入理解 LLM 训练动力学的理论极限极具参考价值。

3.  **[Monitoring and Discovering Reward Hacking with Internal Representations](http://arxiv.org/abs/2609.19101v1)**
    *   **理由**：将可解释性技术直接应用于安全性评估，展示了如何“看见”模型内部的作弊行为。这对于开发能实时自检的智能体监控框架具有直接的工程指导意义。