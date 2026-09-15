# ArXiv AI 研究日报 2026-09-15

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-15 04:59 UTC

---

# ArXiv AI 研究日报 — 2026-09-15

## 今日速览
今日 ArXiv 投稿聚焦于智能体安全对齐、大模型推理效率与多智能体协作三大方向。CoT 监控逃逸（#2609.15989）、Bellman Policy Optimization（#2609.15987）和 Stellar Colosseum 多智能体系统（#2609.15983）代表当前研究前沿。发现型基础模型（#2609.15973）提出从"解决问题"到"定义问题"的范式转移。

## 重点论文

### 🧠 大语言模型

| 论文 | 作者 | 简要说明 |
|---|---|---|
| [Corrupt Plans, Clean Traces: Evading Chain-of-Thought Monitoring with Plan Injection](http://arxiv.org/abs/2609.15989v1) | Chidambaram et al. | 揭示 CoT 监控可被"良性外观推理"绕过，对 LLM 安全评估方法提出挑战。安全研究者需重新审视监控策略。 |
| [Inoculation Midtraining with Learned Neologisms](http://arxiv.org/abs/2609.15886v1) | O'Brien et al. | 提出在中期训练阶段注入"反污名化"知识，防止模型学习不良属性。为对齐训练提供新思路。 |
| [Disentangling Representation Evolution in Transformers through Directional Decomposition](http://arxiv.org/abs/2609.15975v1) | He et al. | 分析 Transformer 表示演化机制，分解平行/垂直分量。可解释性研究的重要进展。 |

### 🤖 智能体与推理

| 论文 | 作者 | 简要说明 |
|---|---|---|
| [Stellar Colosseum: A Many-Agent Harness for Long-Horizon Research](http://arxiv.org/abs/2609.15983v1) | Lin et al. | 多智能体数学研究测试平台，评估长周期推理可靠性。对 Agentic AI 基准测试有参考价值。 |
| [The Router Within: Eliciting Native Skill Routing from a Frozen LLM](http://arxiv.org/abs/2609.15982v1) | Chen et al. | 从冻结 LLM 中提取技能路由能力，避免预加载所有元数据。提升 Agent 上下文效率。 |
| [HypoEvolve: Genetic Algorithms Enable Multi-Agent LLMs to Discover Scientific Hypotheses](http://arxiv.org/abs/2609.15938v1) | Liu et al. | 结合遗传算法与多智能体的科学假设发现框架。AI for Science 方法创新。 |
| [AlgoEvo: Self-Evolving Agentic Search for Automated Algorithm Discovery](http://arxiv.org/abs/2609.15820v1) | Qiu et al. | 自进化智能搜索用于算法发现，突破固定搜索管道的限制。自动化算法设计新范式。 |

### 🔧 方法与框架

| 论文 | 作者 | 简要说明 |
|---|---|---|
| [Bellman Policy Optimization](http://arxiv.org/abs/2609.15987v1) | Song et al. | 无 Critic 的 RLVR 方法，基于策略镜像下降。简化大模型推理训练流程。 |
| [Discovery Foundation Models: Toward Open-Ended Discovery Intelligence](http://arxiv.org/abs/2609.15973v1) | Yang et al. | 提出"发现型基础模型"概念，从解决问题转向参与问题定义。范式级思考。 |
| [Delegating Authorization to Misaligned Agents: Coalitional Alignment and Safe Control](http://arxiv.org/abs/2609.15803v1) | Collina et al. | 长期运行 Agent 的安全控制问题，提出联盟对齐框架。Agent 安全关键论文。 |
| [When the World Lies: Backdoor Attacks on Latent World Models](http://arxiv.org/abs/2609.15781v1) | Riaño et al. | 预训练世界模型的后门攻击研究，揭示重用风险。安全领域重要警示。 |

### 📊 应用

| 论文 | 作者 | 简要说明 |
|---|---|---|
| [Mind2Dialogue: Training Human-Aware Language Models](http://arxiv.org/abs/2609.15972v1) | Wang et al. | 通过模拟用户心理状态训练人性化语言模型。解决监督数据缺口。 |
| [CiteGuard-RAG: A Validation-Centered AI System](http://arxiv.org/abs/2609.15830v1) | Barua et al. | 以验证为中心的 RAG 系统，确保引用有效性。临床问答场景实用。 |
| [K-Bench: Clinically Calibrated Benchmark for Mental Health Conversations](http://arxiv.org/abs/2609.15855v1) | Vowels et al. | 临床校准的高风险心理健康对话基准。评估 LLM 安全性的新标准。 |
| [LongAgent: History-Guided Agentic Search for Longitudinal Prediction](http://arxiv.org/abs/2609.15859v1) | Wang et al. | 历史引导的智能搜索用于纵向医学预测。医疗 AI 应用创新。 |

## 研究趋势信号
今日投稿显示**智能体安全与对齐**成为最活跃方向（CoT 逃逸、世界模型后门、授权委托）。**发现型 AI**（Discovery Foundation Models）提出从"执行"到"探索"的范式升级。**多智能体协作**在科学发现和算法搜索中展现潜力。同时，**可解释性研究**（Transformer 表示分解）与**高效训练方法**（BPO、路由优化）并行发展。隐私保护（联邦学习、差分隐私）持续受关注。

## 值得精读
1. **Corrupt Plans, Clean Traces**：安全研究者必读，揭示 CoT 监控的固有漏洞。
2. **Discovery Foundation Models**：前瞻性强，定义 AI 下一阶段发展方向。
3. **Delegating Authorization to Misaligned Agents**：长期运行 Agent 系统的安全基石。