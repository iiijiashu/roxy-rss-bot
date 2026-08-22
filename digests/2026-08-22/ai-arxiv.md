# ArXiv AI 研究日报 2026-08-22

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-22 01:52 UTC

---

## ArXiv AI 研究日报（2026-08-22）

### 1. 今日速览
今日 ArXiv AI 论文呈现三大趋势：一是在大语言模型层面，unlearning（不可学习/知识擦除）、上下文敏感基准测试及缓存驱逐策略成为新热点；二是智能体方向聚焦跨任务技能迁移、自改进审计及 harness 优化；三是时间序列预测、多智能体拓扑设计及医学/法律垂直领域基准测试集中涌现，显示 AI 正加速向专业领域工程化落地渗透。

### 2. 重点论文

**🧠 大语言模型**
| 论文 | 作者 | 简要说明 |
|:---|:---|:---|
| [ConceptGuard: Benchmarking Context-Sensitive Unlearning in Large Language Models](http://arxiv.org/abs/2608.20338v1) | Sahil Kale, Ian Harris | 提出首个评估 LLM 上下文敏感不可学习能力的基准测试，指出当前方法依赖不相交的遗忘/保留集，无法全面评估选择性知识移除能力。对 AI 安全与合规具有重要实践意义。 |
| [MemTrapBench: Benchmarking Cognitive Traps in LLM Memory Use](http://arxiv.org/abs/2608.20202v1) | Mengru Wang, Haozhe Luo, Zhenqian Xu et al. | 首次系统评估 LLM 记忆使用中认知陷阱（如误导性检索导致的错误推理），填补了现有记忆基准仅关注提取存储准确性的空白。 |
| [Phantom Gains: Auditing Self-Improvement Against a Measured Null](http://arxiv.org/abs/2608.20290v1) | Cheng Xu, Nan Yan, Liming Chen et al. | 提出审计 LLM 自改进的方法，指出当前通过均值准确率判断改进易受测量伪影干扰，应追踪个体问题的得失转换。对自改进研究的可重复性至关重要。 |
| [Which Eviction Policy Should an LLM Cache Use? A Systematic Study Across Workloads, Capacities, and Encoders](http://arxiv.org/abs/2608.20280v1) | Yash Kulkarni, Shubham Harkare, Arvind Suresh Yogesh Babu | 系统比较 FIFO、LRU、LFU、ARC 等 7 种语义缓存驱逐策略，为 LLM 缓存工程实践提供了实证依据。 |
| [Inject, Align, Recover: Staged Post-Training for Retrieval-Free Document Knowledge Internalization](http://arxiv.org/abs/2608.20281v1) | Qian Kou, Xiaofeng Shi, Xiaosong Qiu et al. | 研究将文档集合转化为检索自由(parametric)知识的阶段式后训练方法，解决了 LLM 在无检索时无法回答特定文档集合问题的核心痛点。 |

**🤖 智能体与推理**
| 论文 | 作者 | 简要说明 |
|:---|:---|:---|
| [Break It Down, Pass It On: Cross-Task Skill Transfer in LLM Agents](http://arxiv.org/abs/2608.20274v1) | Yiyang Feng, Biddut Sarker Bijoy, Niranjan Balasubramanian et al. | 研究 LLM Agent 从完成任务中诱导技能并跨任务迁移的能力，发现技能迁移可能不可靠甚至损害接收 Agent，揭示了 Agent 技能复用机制的关键风险。 |
| [AI4AI-Bench: Benchmarking LLM Agents in Algorithmic Design for Recursive Self-Improvement](http://arxiv.org/abs/2608.20318v1) | Yizhe Chi, Wenyi Li, Deyao Hong et al. | 提出评估 LLM Agent 在递归自改进（RSI）中算法设计能力的基准，聚焦于改进训练算法本身而非模型权重，直指 AI 自我改进的核心挑战。 |
| [Task-CoEvolve: Efficient Harness Optimization via Adaptive Validation Task Selection](http://arxiv.org/abs/2608.20169v1) | Atsuyuki Miyai, Kiyoharu Aizawa, Toshihiko Yamasaki | 提出通过自适应验证任务选择优化 LLM Agent harness 的方法，无需更新模型权重即可实现显著性能提升，为 Agent 部署效率优化提供了新思路。 |
| [Inducing Task Models from Computer-Use Traces](http://arxiv.org/abs/2608.20319v1) | Yucheng Jiang, Zora Zhiruo Wang, Ruishi Chen et al. | 从被动记录的电脑使用轨迹（截图、鼠标键盘操作）中提取可审计、可复用的任务模型，为 Agent 学习人类日常工作流程提供了新方法。 |
| [Multi-Agent Orchestration with the Common-Sense Reasoning Capabilities of LLMs for Autonomous Driving](http://arxiv.org/abs/2608.20129v1) | Mehdi Azarafza, Faezeh Pasandideh, Ali Ehteshami Bejnordi et al. | 将 LLM 常识推理能力应用于多智能体自动驾驶协同，弥补了纯强化学习在复杂上下文推理场景的不足。 |
| [Reward-Guided Autoregressive Graph Generation for Efficient Multi-Agent Communication Topology Design](http://arxiv.org/abs/2608.20099v1) | Poomphob Suwannapichat, Boonyarit Changaival, Caesar Wu et al. | 用奖励引导的自回归图生成优化多智能体通信拓扑，在保持 LLM 多智能体系统性能的同时显著降低 token 消耗。 |

**🔧 方法与框架**
| 论文 | 作者 | 简要说明 |
|:---|:---|:---|
| [Daedalus-150M: A Convolution-Attention Hybrid Designed for CPU Inference](http://arxiv.org/abs/2608.20210v1) | Christos Koutsiaris | 专为 CPU 推理设计的 1.5 亿参数混合架构小语言模型，采用 4-bit 量化，在普通 CPU 上实现高效推理，填补了边缘设备 LLM 部署的空白。 |
| [Let's Scale Step by Step: Compute-Efficient Hyperparameter Transfer for Large-Scale Mixture-of-Experts](http://arxiv.org/abs/2608.20061v1) | Nayeon Kim, Hojin Lee, Yunju Bak et al. | 提出 MoE 模型超参数（尤其学习率）的高效转移方法，避免在极端规模和 token 预算下的计算密集型搜索，对大规模模型训练具有实用价值。 |
| [Discrete Diffusion Inference-Time Control with Nested Sequential Monte Carlo](http://arxiv.org/abs/2608.20123v1) | Lohithsai Yadala Chanchu, Hany Abdulsamad, Christian A. Naesseth | 研究离散扩散语言模型的推理时控制方法，无需重新训练即可引导采样朝向序列级奖励，扩展了扩散模型在文本生成中的应用边界。 |
| [FormalTCS: Benchmarking End-to-End Frontier Formal Theoretical Computer Science Research of Large Language Models](http://arxiv.org/abs/2608.20153v1) | Dingzirui Wang, Xuanliang Zhang, Keyan Xu et al. | 首个专家验证的端到端理论计算机科学（TCS）研究基准，评估 LLM 在前沿形式化 TCS 研究中的能力，填补了 AI 辅助数学研究的评估空白。 |

**📊 应用**
| 论文 | 作者 | 简要说明 |
|:---|:---|:---|
| [G-CARL: Grounded Checklist-Aligned Reward Learning for Patient-Oriented Medical Report Interpretation](http://arxiv.org/abs/2608.20331v1) | Shiao Xie, Siyu Chen, Jianwei Lv et al. | 面向患者导向的医疗报告解释，结合证据 grounded 的医学事实与上下文依赖的患者沟通，填补了现有医疗视觉语言任务的空白。 |
| [ContractScrub: A benchmark for final review of legal contracts](http://arxiv.org/abs/2608.20204v1) | Yejin Bang, Kirsty Fielding, Brandan Oliver et al. | 针对法律合同最终审查（scrubbing）的基准测试，评估 LLM 在合同错误和不一致性检测中的自动化能力，是法律 AI 领域的重要工具。 |
| [HealMed: Multilingual Evaluation of Large Language Models in Medicine](http://arxiv.org/abs/2608.19981v1) | Yingjian Chen, Fan Gao, Sherry T. Tong et al. | 专家评审的多语言医学 LLM 评估基准，覆盖 9 种语言、1,000 个样本及 MCQA/NLI/开放 QA 三种任务格式，推动医疗 AI 的跨语言公平性研究。 |
| [When Text and Numbers Disagree: Evidence Arbitration in Large Language Models](http://arxiv.org/abs/2608.20116v1) | Mattia Carletti, Edward Phillips, Fredrik K. Gustafsson et al. | 研究 LLM 在文本摘要、数值观察和工具输出冲突时的证据仲裁机制，对构建可靠的混合模态 AI 系统具有重要指导意义。 |
| [Auditing Cross-Lingual Fairness in Language Model Watermarking](http://arxiv.org/abs/2608.20047v1) | Alexander Nemecek, Osama Zafar, Debargha Ganguly et al. | 审计 LLM 水印在多语言环境下的公平性，揭示英语-centric 评估设计在多语言部署中可能导致结论性偏差，对合规水印系统的全球化部署具有警示意义。 |

### 3. 研究趋势信号
今日投稿显示三个明确趋势：一是 LLM 不可学习（unlearning）和知识擦除从理论问题走向基准测试驱动的工程化评估；二是 Agent 自改进和跨任务技能迁移成为热点，反映研究者开始关注 Agent 系统的长期能力演化；三是时间序列基础模型（Scale-Aware Pretraining、CLaST、DecoVAE 等 5 篇相关论文）集中涌现，预示时序预测正成为 AI 基础模型的新战场。此外，多语言公平性（HealMed、Watermarking Auditing）和垂直领域基准（医学、法律、葡萄酒）的密集发布，表明 AI 评估正从通用能力转向领域深耕。

### 4. 值得精读
1. **[ConceptGuard](http://arxiv.org/abs/2608.20338v1)** — 首个上下文敏感不可学习基准，对 AI 安全合规和模型更新管理具有直接的工程指导价值。
2. **[AI4AI-Bench](http://arxiv.org/abs/2608.20318v1)** — 递归自改进的 Agent 基准测试，触及 AI 自我演化这一前沿课题的核心评估挑战。
3. **[Phantom Gains](http://arxiv.org/abs/2608.20290v1)** — 提出审计自改进测量的方法论，对任何涉及模型版本迭代的自改进研究都不可或缺。