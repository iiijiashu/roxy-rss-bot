# ArXiv AI 研究日报 2026-10-01

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-01 00:20 UTC

---

### 1. 今日速览
今日 ArXiv 投稿显示，**推理时计算与测试时扩展**（Test-Time Scaling）正成为提升模型能力的核心路径，重点集中在智能体元推理与线性注意力量化优化。同时，**可解释性与可靠性**备受关注，研究者们开始深入审视思维链（CoT）逻辑与模型内部表征的解耦问题。针对长上下文和多模态场景，**记忆架构与KV缓存压缩**技术显著进步，旨在解决效率瓶颈。此外，多智能体协作与 LTL 强化学习基准的兴起，标志着智能体研究正从单任务向复杂、可验证的通用目标演进。

### 2. 重点论文

#### 🧠 大语言模型（架构、训练、对齐、评估）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [LeapQuant: Efficient Linear Attention with Accurate Recurrent State Quantization](http://arxiv.org/abs/2609.38166v1) | Yi Pan et al. | 针对线性注意力架构的固有缺陷，提出了一种能够显著降低低精度量化误差的递归状态压缩方法。该方法有效解决了长上下文并发服务中的内存瓶颈，是平衡计算效率与模型精度的关键优化。 |
| [Pretraining Latent Information Feedback Transformers with Teacher Supervision](http://arxiv.org/abs/2609.38149v1) | Dor Tirosh et al. | 通过引入教师监督的潜空间反馈机制，打破了传统 Transformer 仅从高层向低层传输解码 token 的信息瓶颈。这项技术减少了中间结果的重复计算和丢弃，有望在预训练阶段提升信息利用效率和模型性能。 |
| [Correct Answers, Invalid Traces: What Verifiable Grade-School Math Reveals About Chain-of-Thought Traces](http://arxiv.org/abs/2609.38107v1) | Ratish Puduppully et al. | 该研究指出，即便答案正确，思维链（CoT）中的推理步骤仍可能存在逻辑错误，且现有模型很难通过自然语言自动验证推理路径的有效性。这对依赖 CoT 进行审计和调试的系统提出了严峻挑战，呼吁建立更严格的推理轨迹评估标准。 |
| [Breaking the Uniformity Trap: Scaling Video Diffusion Model via SplitMoE](http://arxiv.org/abs/2609.38140v1) | Yu Xu et al. | 针对视频生成中 MoE 架构路由均匀化带来的表达力局限，提出了分裂专家机制。通过匹配视觉生成特性，它打破了标准 MoE 在复杂多模态分布生成上的限制，是视觉生成模型扩展的有效范式。 |

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Thinking Before Thinking: Scaling Agentic Inference Through Meta-Reasoning](http://arxiv.org/abs/2609.38147v1) | Paras Dahal et al. | 引入“智能体元推理”概念，将推理时的执行控制本身作为推理任务。通过这种元层面决策（如决定是否重新开始、基于何种部分构建），有效提升了长任务智能体的执行质量与鲁棒性。 |
| [Do LLM Agents Execute the Plans They Declare? From Planning-Mode Declaration to Pattern-Specific Execution](http://arxiv.org/abs/2609.38108v1) | Subba Reddy Oota et al. | 研究聚焦于 LLM 智能体“规划”与“执行”两种能力的解耦。分析发现规划模式的特定性与执行模式之间存在差异，为设计更可靠的规划-执行系统架构提供了关键的理论洞察。 |
| [Multi-Agent Flow Matching with Decoupled Generative Guidance](http://arxiv.org/abs/2609.38133v1) | Ruoyu Lin et al. | 解决多智能体生成任务中满足硬约束的难题，提出了一种解耦的生成引导方法。这种方法保证了生成结果不仅满足多样性要求，还严格符合给定的物理或逻辑硬约束。 |
| [AdviSD: Learning to Advise Frontier LLMs via Targeted Multi-Turn Self-Distillation](http://arxiv.org/abs/2609.38142v1) | Rishabh Agrawal et al. | 训练一个小型可训练的“顾问”模型，通过自然语言向冻结的大模型执行器提供针对性指导。该框架利用多轮交互自我蒸馏，显著提升了小模型引导大模型（Executor）的效率与精准度。 |

#### 🔧 方法与框架（新技术、基准测试、效率优化）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [LongHarness Bench: Stress-Testing Language Model Harnesses for Long-Context Reasoning](http://arxiv.org/abs/2609.38137v1) | Quang Hieu Pham et al. | 现有的长上下文评估基准已失效（准确度饱和），该研究开发了新的长上下文压力测试基准。它能更有效地区分现有长上下文智能体框架（Harness）的真实推理能力与计算成本。 |
| [WUSH-KV: KV Cache Quantization with Data-Adaptive Transforms](http://arxiv.org/abs/2609.38121v1) | Jiale Chen et al. | 提出了基于二阶统计数据自适应变换的 KV 缓存低比特量化方法。该技术方案旨在解决长上下文和大批量服务带来的内存与带宽瓶颈，从而提升推理效率。 |
| [Jaxolotl: A Unified High-Performance Benchmark Suite for LTL-Based Multi-Task RL](http://arxiv.org/abs/2609.38065v1) | Mathias Jackermeier et al. | 提供了一个统一的、高性能的 LTL（线性时序逻辑）多任务强化学习基准测试框架。这使得训练能够遵循任意复杂指令的通用智能体成为可能，并填补了相关评估工具的空白。 |
| [Probe-Space Preconditioning for Fast and Stable Zero-Order Training](http://arxiv.org/abs/2609.38095v1) | Francois Chaubard et al. | 针对零阶优化器在大规模模型（如 30B 参数模型）训练中内存占用极高且更新缓慢的问题，提出了一种探针空间预条件技术。它显著降低了无需反向传播的训练内存开销，并提升了收敛稳定性。 |

#### 📊 应用（垂直领域、多模态、代码生成）
| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Beyond the Timeline: Augmenting Long-Video Memory with Grounded Entity Biographies](http://arxiv.org/abs/2609.38155v1) | Hui Ren et al. | 解决长视频问答中涉及物理实体身份识别的难题，通过构建基于物理身份（而非单纯时间线）的实体传记图谱。该方法能有效将数小时内的同一对象观察事件进行关联，提升了多模态长视频理解能力。 |
| [EmoRES-TTS: Residual-Enhanced Vector Steering for Emotional Speech Generation](http://arxiv.org/abs/2609.38157v1) | Kuan-Po Huang et al. | 提出了一种免训练的向量引导（Vector Steering）方法，以增强带有情感条件文本转语音（TTS）模型的表达可靠性。该方法避免了高成本的情感标签数据训练，降低了部署门槛。 |
| [Auditable Long-Term Memory: A Deterministic Retrieval Chain Measured at 479/475 of 500 on LongMemEval-S](http://arxiv.org/abs/2609.38021v1) | Christopher J. Chanhnourack | 评估了一种可审计的长期记忆系统，其检索链仅将 LLM 作为可替换的最终阅读器，采用确定性逻辑进行重新排序与推理脚手架。该方法在长期记忆基准测试中取得了显著高分，提升了系统的可验证性。 |

### 3. 研究趋势信号
今日投稿中，**“测试时计算”（Test-time Compute）**的边界正在快速扩展，从单纯的推理时间扩展至智能体在运行时的“控制”与“环境构建”（如 #11、#12、#48）。另一显著信号是**架构效率的极致压缩**，尤其是线性注意力机制与 KV Cache 的低精度量化（#4、#5、#18、#33），表明长上下文推理的内存瓶颈正成为核心攻关领域。同时，**形式化与可审计性**（#40、#50）开始融入 LLM 评估体系，反映出模型研究正从黑盒性能转向白盒可靠性。

### 4. 值得精读
1.  **[Thinking Before Thinking: Scaling Agentic Inference Through Meta-Reasoning](http://arxiv.org/abs/2609.38147v1)**
    *理由*：这篇论文提出将执行控制作为独立于任务推理的推理任务（Meta-reasoning），对于理解未来复杂智能体系统如何自我调节、避免长任务中迷航具有前瞻性价值。
2.  **[Do LLM Agents Execute the Plans They Declare?](http://arxiv.org/abs/2609.38108v1)**
    *理由*：深入剖析了 LLM 规划与执行两种能力的差异，这是构建高可靠性自动化工作流的关键痛点。理解这一“声明-执行”脱节的规律，对设计安全可靠的智能体架构至关重要。
3.  **[Jaxolotl: A Unified High-Performance Benchmark Suite for LTL-Based Multi-Task RL](http://arxiv.org/abs/2609.38065v1)**
    *理由*：将形式语言（LTL）与强化学习结合，为“让模型遵循任意复杂指令”提供了可操作的评测基准。它是连接 NLP 与逻辑严谨性的一个重要桥梁，适合研究指令遵循和逻辑推理的学者阅读。