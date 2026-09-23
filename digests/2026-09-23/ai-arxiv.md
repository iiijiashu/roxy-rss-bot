# ArXiv AI 研究日报 2026-09-23

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-23 00:20 UTC

---

以下是基于 2026-09-23 ArXiv 最新论文生成的《ArXiv AI 研究日报》。

### 1. 今日速览

今日研究聚焦于**智能体（Agent）的系统性进化与安全治理**，大量论文探讨了如何通过递归自改进（RSI）和自动化框架优化智能体性能。在模型层面，**推理效率与鲁棒性**成为热点，包括端侧 LLM 个性化、扩散模型在机器人控制中的应用以及量化对可解释性的影响。此外，**多模态世界模型**和**长时程一致性**在视频生成与机器人操控中取得进展，旨在解决跨视角和长尾场景下的记忆与预测难题。

### 2. 重点论文

#### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [LoRA-generating hypernetworks for efficient on-device LLM generative personalization](http://arxiv.org/abs/2609.24979v1) | Sean Augenstein, Li Ding, Jihwan Lee et al. | 提出利用超网络生成 LoRA 权重以实现端侧 LLM 的生成式个性化。解决了移动设备算力受限下高质量个性化模型的部署难题，对隐私保护型端侧 AI 具有重要意义。 |
| [Pinocchio: Fast Uncertainty Estimates for Black-Box Language Models](http://arxiv.org/abs/2609.24881v1) | Kevin David Hayes, Arka Pal, Haosong Zhang et al. | 针对黑盒 LLM 提供快速的预测不确定性估计，无需访问日志概率。该工具对于高 stakes 决策场景下的可信 AI 部署至关重要，弥补了现有方法的计算开销缺陷。 |
| [The Answer-Basin Representation Hypothesis: We Are Not Probing or Steering Concepts](http://arxiv.org/abs/2609.24821v1) | Manjiang Yu, Hongji Li, Zihan Wang et al. | 挑战了“线性表示假设”，提出“答案盆地”假说，重新审视概念在语言模型中的几何组织方式。为理解模型内部表征提供了新的理论视角，有助于更精准地分析模型思维。 |
| [Decoding Guardrails: XAI-Guided Perturbation Analysis of Prompt Injection Detection](http://arxiv.org/abs/2609.24801v1) | Fernando Outeda, Gustavo Betarte, Juan Diego Campo et al. | 利用可解释 AI（XAI）指导提示注入检测的扰动分析，增强防御机制的透明度。在 LLM 广泛应用的生产环境中，提升了针对越狱攻击的安全防护能力。 |
| [When Quantization Preserves Accuracy but Not Evidence: Explanation-Aware Post-Training Quantization for Medical LLMs](http://arxiv.org/abs/2609.24799v1) | Yeji Kim, Mi-Young Kim, Randy Goebel | 指出传统量化仅保留答案准确性而可能破坏推理证据链，提出解释感知的后训练量化方法。在医疗等高敏感领域，确保了压缩模型不仅“答得对”而且“说得通”。 |

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [RRSI: Regularized Recursive Self-Improvement of Agent Harnesses](http://arxiv.org/abs/2609.24972v1) | Peng Xia, Rujun Han, Zifeng Wang et al. | 提出递归自改进框架，自动迭代优化智能体的提示、工具和上下文管理。通过正则化避免性能退化，展示了智能体“自我进化”提升通用任务解决能力的新范式。 |
| [MedRSI: Recursive Self-Improvement for Medical Agents via Clinically Aligned Self-Evolution](http://arxiv.org/abs/2609.24838v1) | Junde Wu, Jiayuan Zhu, Minghao Hu et al. | 将递归自改进应用于医疗智能体，使其能从自身失败中学习并进化临床推理能力。突破了传统医疗 AI 静态能力的局限，提高了诊断工具的持续适应性。 |
| [Et Tu, Brute? Economic Misalignment in Personal AI Agents](http://arxiv.org/abs/2609.24927v1) | Aman Priyanshu, Supriti Vijay, Brian Jabarian et al. | 研究个人 AI 代理在经济决策中的潜在“错配”风险，如购买保险或选择项目时的利益冲突。揭示了自主代理在现实经济情境中可能产生的有害协调问题。 |
| [GRUET: Quantifying Uncertainty of Agentic Reasoning-and-Acting Processes](http://arxiv.org/abs/2609.24831v1) | Shuang Liang, Xin-Yu Hu, Shao-Qun Zhang | 针对 ReAct 多轮轨迹，提出量化推理与行动过程不确定性的方法。帮助开发者识别代理在动态环境中哪些步骤容易出错，增强了智能体系统的可靠性评估。 |
| [Small-world Networks of Agents Brainstorm AI Risks to Support Ideation](http://arxiv.org/abs/2609.24859v1) | Ke Zhou, Edyta Bogucka, Daniele Quercia | 利用多智能体小世界网络模拟头脑风暴，以识别参与式 AI 风险评估中的间接和系统性危害。为 AI 安全对齐提供了创新的社会技术混合方法，支持更全面的伦理审查。 |

#### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [OSWorld-Pro: Process-based Evaluation for Computer Use Agents](http://arxiv.org/abs/2609.24890v1) | Zhilin Wang, Shaokun Zhang, Yifan Zhang et al. | 提出基于过程的计算机使用智能体评估框架，而非仅关注最终结果。通过深入分析失败步骤，提供了比 OSWorld 等现有基准更透明、更具诊断性的评估视角。 |
| [SPECTRA: Adaptive Execution of Speculative Decoding on a Runtime-Reconfigurable Tiled Architecture](http://arxiv.org/abs/2609.24847v1) | Gabriele Tombesi, William Baisi, Je Yang et al. | 设计了一种可在运行时重构的平铺架构，自适应执行推测解码。显著提升了边缘设备上 LLM 推理的效率，解决了算力与内存受限下的自回归解码瓶颈。 |
| [Rare Event Estimation via Iterative Unalignment](http://arxiv.org/abs/2609.24969v1) | Hanming Yang, Daksh Mittal, Jing Dong et al. | 研究如何通过迭代非对齐来估计智能体输出中的极罕见事件概率。对于确保自主智能体安全部署至关重要，提供了量化“黑天鹅”风险的新数学工具。 |
| [Complex KDA: Understanding and Enhancing the Expressivity of Kimi Delta Attention](http://arxiv.org/abs/2609.24797v1) | Julien Siems, Riccardo Grazzi, Korbinian Pöppel et al. | 分析并增强了 Kimi Delta Attention 线性 RNN 的表达能力，通过复合更新机制降低秩约束。为高效序列建模提供了更强大的理论基础和架构改进方向。 |
| [Conformalized Quantile Regression and Minimax Limits of Fixed-Score Calibration under Known Covariate Shift](http://arxiv.org/abs/2609.24929v1) | Rustam Isaev, Anton Conrad, Denis Belomestny et al. | 研究了在已知协变量偏移下的保形分位数回归的非渐近界。为在数据分布变化时保持预测区间覆盖率提供了严格的统计保证，适用于鲁棒性要求高的场景。 |

#### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [WorldCrafter: Consistent Video World Model with Implicit 3D-aware Memory](http://arxiv.org/abs/2609.24984v1) | Wangbo Yu, Kunhao Liu, Wenbo Hu et al. | 提出具有隐式 3D 感知记忆的视频世界模型，解决长时程和跨视角的一致性问题。这对于构建可交互、物理一致的动态环境模拟至关重要，推动视频生成向世界模型迈进。 |
| [DexTacWAM: A Visuo-Tactile World-Action Model for Dexterous Manipulation](http://arxiv.org/abs/2609.24976v1) | Haoran Yuan, Zekai Wang, Boning Shao et al. | 结合视觉与触觉信号构建灵巧操纵的世界-行动模型，弥补纯视觉模型在接触动力学上的不足。显著提升了机器人处理复杂物理交互（如抓取、装配）的能力。 |
| [Uranus: Building the Next-Generation Simulation Infrastructure for Embodied AI](http://arxiv.org/abs/2609.24815v1) | Wenkang Qin, Yukun Zhou, Noah Shen et al. | 构建了基于数据驱动的机器人模拟器，用于生成轨迹、策略训练及安全迭代。降低了具身智能研究中构建仿真环境的劳动强度，加速了从仿真到实物的迁移。 |
| [MSI-Bench: Evaluating Multi-Speaker Voice Interaction for Collaborative AI Agents](http://arxiv.org/abs/2609.24812v1) | Chenxu Xiong, Dongming Shen, Yuzhi Tang et al. | 提出评估多说话人语音交互基准，解决会议、家庭等协作场景下的语音代理挑战。填补了现有单对一语音交互评估在多模态协作环境中的空白。 |
| [JAREX: An Acquisition Function for Multi-Objective Algorithmic Process Characterization](http://arxiv.org/abs/2609.24954v1) | Xinyang Li, Kevin Stone, Ajit Vikram | 设计用于药物研发过程表征的多目标获取函数，支持质量 by 设计。通过优化过程参数变异对产品质量的影响，助力制药行业实现稳健制造和可接受范围验证。 |

### 3. 研究趋势信号

今日投稿显示，**“智能体自进化”**正从概念走向系统化，RSI（递归自改进）成为提升 LLM 和垂直领域代理能力的核心范式，且开始引入正则化以保证稳定性。同时，**安全与对齐的研究粒度变细**，从宏观伦理转向微观的不确定性量化、罕见事件估计及量化压缩中的可解释性保护。在基础设施层面，**具身智能的仿真效率**和**端侧推理架构**（如推测解码、超网络个性化）成为解决资源瓶颈的关键技术路径。

### 4. 值得精读

1.  **[RRSI: Regularized Recursive Self-Improvement of Agent Harnesses](http://arxiv.org/abs/2609.24972v1)**：该文不仅提出了自动优化智能体框架的方法，还深入探讨了“Harness”概念，对于理解未来 LLM 应用架构（模型与外部系统解耦）的演进方向极具参考价值，是智能体系统设计的重要前沿工作。
2.  **[WorldCrafter: Consistent Video World Model with Implicit 3D-aware Memory](http://arxiv.org/abs/2609.24984v1)**：视频世界模型是通往通用人工智能感知的关键路径。该论文提出的隐式 3D 记忆机制解决了长时程一致性这一核心痛点，对于从事视频生成、机器人感知模拟的研究者必读，其方法论可能启发新的表征学习思路。
3.  **[Et Tu, Brute? Economic Misalignment in Personal AI Agents](http://arxiv.org/abs/2609.24927v1)**：随着个人 AI 代理介入经济决策，其潜在的利益冲突风险被忽视。这篇论文从经济学与 AI 对齐交叉视角揭示了“隐性错配”问题，对于关注 AI 社会影响、政策制定及高风险应用场景的安全评估具有重要的警示意义。