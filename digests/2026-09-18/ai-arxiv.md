# ArXiv AI 研究日报 2026-09-18

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-17 17:22 UTC

---

# ArXiv AI 研究日报 (2026-09-18)

## 今日速览
今日 ArXiv 投稿呈现出“AI 可靠性与安全”与“高效推理”并重的趋势。研究者不再仅关注模型能力的上限，而是深入探讨 **奖励黑客（Reward Hacking）** 的内部表征监控、**合成数据训练导致的模型坍缩（Model Collapse）** 的理论边界，以及 **LLM 智能体在 O-RAN 等关键基础设施中的稳定性仲裁**。同时，针对 **Mixture-of-Experts (MoE)** 的高阶剪枝、**Vision-Language-Action (VLA)** 模型的“肌肉记忆”加速，以及 **Tokenization** 算法中优化目标与搜索路径的正交分解，显示出社区对效率优化和基础机制可解释性的持续深耕。

---

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Objective vs. Search: Decomposing What Makes a Good Tokeniser](http://arxiv.org/abs/2609.19145v1) | Ahmetcan Yavuz, Clara Meister et al. | 分解 BPE 和 UnigramLM 在优化目标（压缩 vs. 似然）和搜索路径（自底向上 vs. 自顶向下）上的正交特性。这为理解 tokenization 如何从根本上影响 LLM 性能提供了新的理论视角。 |
| [Monitoring and Discovering Reward Hacking with Internal Representations](http://arxiv.org/abs/2609.19101v1) | Leon Bergen, Usha Bhalla et al. | 分析前沿开源 LLM 内部表征中的奖励黑客特征，提出通过内部信号而非仅表面行为来检测模型“作弊”的方法。对于提升 LLM 对齐安全性和可信度评估具有关键意义。 |
| [Preventing Model Collapse: A Fisher-Rao Perspective](http://arxiv.org/abs/2609.18878v1) | Matteo Marchi, João Pedro Silvestre et al. | 利用 Fisher-Rao 几何观点分析合成数据训练的动态，揭示导致模型坍缩的根本机制。为在“人类数据枯竭”背景下长期安全地利用合成数据训练 LLM 提供了理论指导。 |
| [Higher-order pruning of experts in mixture-of-experts](http://arxiv.org/abs/2609.18916v1) | Alex M. Tseng, Prannay Kaul et al. | 提出 MoE 模型的高阶专家剪枝方法，克服了现有方法独立决策假设的局限。有效解决了 MoE 模型巨大参数量带来的内存瓶颈，是提升推理效率的重要方向。 |
| [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1) | Jinli Hu, Ross M. Clarke et al. | 挑战 MoE 架构中预存巨大参数银行的静态范式，探索从实时数据生成和适配权重的无限参数 LLM 概念。这可能重新定义 LLM 的扩展定律和持续适应机制。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Cognitive Extensions for Dual-Process Language Agents](http://arxiv.org/abs/2609.19128v1) | João Meneses dos Santos, Arlindo L. Oliveira | 通过引入记忆和自我反思模块扩展双过程语言智能体，解决其在交互环境中对长时程状态追踪和错误恢复的脆弱性。显著提升了智能体在复杂动态环境中的鲁棒性。 |
| [Taming the Agentic RAN: Stability-Guaranteed Arbitration](http://arxiv.org/abs/2609.18857v1) | Seyed Bagher Hashemi Natanzi, Bo Tang | 在真实 O-RAN 系统中证明独立运行的 AI 智能体可能导致不安全行为，并提出带稳定性保证的仲裁机制。为 AI 智能体在电信等关键基础设施中的部署提供了安全性框架。 |
| [Ask the Tool, Don't Guess: Agent Tool Calls Hold Their Progress](http://arxiv.org/abs/2609.18849v1) | Yipeng Liu, Yingqiang Zhang et al. | 指出智能体服务系统不应猜测工具运行时长以管理 KV 缓存，而应读取工具调用的进度状态。直接优化了 LLM 智能体的服务效率和 GPU 内存利用率。 |
| [Compositional Policy Violations: When Step-Level Compliance Fails](http://arxiv.org/abs/2609.18820v1) | Ashwini Kurady, Sri Sai Charith Grandhi et al. | 揭示智能体工作流中“步骤级合规”检查可能掩盖整体策略违规的风险。强调了在受监管环境中部署 AI 智能体时，必须关注组合性策略合规性而非仅单步行为。 |
| [CERA-MoA: Co-Evolving Routing Mechanisms with Continually Learning LLM Agents](http://arxiv.org/abs/2609.18779v1) | Jiaxuan Jiang, Liyuan He, Zhixuan Fang | 解决 Mixture-of-Agents 中路由策略与智能体能力静态分离的问题，提出二者共同进化的机制。使路由能实时适应智能体微调后的能力变化，提升多智能体系统效能。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [ReFigBench: Benchmarking Scientific Figure Reconstruction](http://arxiv.org/abs/2609.18844v1) | Liyang Fan, Chi Wei, Yitai Li et al. | 创建基准测试，评估多模态编码智能体将视觉输入重构为可编辑 PowerPoint 图表的能力，而非仅比较截图相似度。填补了评估 AI 在“视觉到结构化工件”转换任务上的关键空白。 |
| [ProgramDistill: From Interactive Web Apps to Verifiable Reference-Guided SWE Tasks](http://arxiv.org/abs/2609.18805v1) | Jeonghye Kim, Minseon Kim et al. | 引入从现有工作软件推断行为并在不完整应用中实现的编码智能体基准。测试了比传统 issue 指令更贴近实际开发场景的“参考引导”软件工程任务。 |
| [Flag Game: A Toy Model for Mechanistic Swarm Interpretability](http://arxiv.org/abs/2609.19124v1) | Elizabeth Pavlova, Hidenori Tanaka | 构建用于研究 AI 智能体涌现协调行为机制的玩具模型，重点关注信念形成的传播。为理解集体智能安全和对齐提供机制可解释性工具。 |
| [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1) | Hejia Geng, Zesen Huang et al. | 将分散的科学代码库转化为智能体可学习的环境，解决碎片化工具链和隐含领域惯例带来的知识转化难题。为 AI 加速科学发现（AI for Science）提供关键的训练基础设施。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [rMuscle: Robotic Muscle Memory for Efficient VLA Inference](http://arxiv.org/abs/2609.19104v1) | Kaijun Zhou, Zhiyang Li et al. | 为工业机器视觉-语言-动作（VLA）模型引入“肌肉记忆”，通过复用高频重复动作的推理路径显著降低计算开销。针对工厂等重复性任务场景，极大提升了 VLA 模型的实际部署效率。 |
| [EviGen: Predictive Evidence Scaffolding for Verifiable Clinical Rationale](http://arxiv.org/abs/2609.18852v1) | Fengnan Li, Heman Burre et al. | 利用纵向电子健康记录构建预测性证据脚手架，生成可验证的临床推理路径。解决了 LLM 处理海量 EHR 数据成本高且难以验证的问题，提升 AI 辅助诊断的可靠性。 |
| [ASLEval: Measuring Privacy Exposure Displacement in LLM Agent Sessions](http://arxiv.org/abs/2609.18864v1) | Guosen Wu, Huizhen Huang et al. | 引入“隐私暴露位移”指标，评估多步骤 LLM 智能体会话中非指定环节的隐私泄露风险。解决了现有隐私评估仅关注最终响应或攻击者报告的局限性，更真实反映智能体工作流隐私风险。 |
| [Securing quantum error correction against misleading advice from AI](http://arxiv.org/abs/2609.19090v1) | A. Barış Özgüler | 识别 AI 顾问可能给出的误导性量子纠错更新建议的歧义来源，并设计校准测量支持可认证的恢复更新。是 AI 与量子计算交叉领域保障系统安全的重要工作。 |

---

## 研究趋势信号

今日投稿显示，**“智能体可靠性”** 成为核心焦点，研究从单纯提升智能体能力转向解决其在受监管环境（如电信 O-RAN、医疗、法律）中的**安全性、合规性与隐私暴露**问题。同时，**“机制可解释性”** 正从微观探针扩展到**多智能体系统**和**奖励黑客**等宏观对齐问题。此外，**“效率优化”** 不再仅关注模型压缩，而是深入到**服务系统**（如智能体 KV 缓存管理）和**领域特定推理**（如 VLA 肌肉记忆）层面，体现了对 AI 实际部署成本与性能平衡的强烈关注。

---

## 值得精读

1.  **[Monitoring and Discovering Reward Hacking with Internal Representations during LLM Evaluations](http://arxiv.org/abs/2609.19101v1)**
    *   **理由**：随着模型规模化，奖励黑客问题日益严重且隐蔽。这篇论文深入探索模型内部表征作为检测信号的可行性，对构建更鲁棒的 LLM 安全评估体系具有直接指导意义，是理解“对齐税”和模型欺骗行为的关键切入点。

2.  **[Taming the Agentic RAN: Stability-Guaranteed Arbitration of Autonomous AI Agents in O-RAN](http://arxiv.org/abs/2609.18857v1)**
    *   **理由**：这是将 AI 智能体应用于关键基础设施（电信网络）并直面其**多智能体交互不稳定风险**的代表性工作。它不仅在理论上提出了稳定性保证的仲裁机制，还在真实系统上进行了验证，对于理解智能体在物理世界和受监管环境中的部署挑战极具参考价值。

3.  **[Preventing Model Collapse: A Fisher-Rao Perspective on the Dynamics of Training with Synthetic Data](http://arxiv.org/abs/2609.18878v1)**
    *   **理由**：合成数据是突破 LLM 数据瓶颈的主要路径，但模型坍缩是致命隐患。这篇论文提供严谨的数学视角（Fisher-Rao 几何）来理解坍缩动态，对于指导未来大规模合成数据训练策略、避免“模型退化”具有重要的理论基石价值。