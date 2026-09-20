# Hugging Face 热门模型日报 2026-09-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-20 00:20 UTC

---

《Hugging Face 热门模型日报》

### 1. 每日速览
今日 Hugging Face 热门榜由 **Qwen3.8** 家族主导，其 27B 版本及衍生量化模型占据多个席位，显示出极强的生态粘性。**DeepSeek-V4.1-Flash** 凭借多模态能力和社区衍生版（去审查版）获得高关注度。视频生成领域 **Lightricks LTX-2.5** 与 **MiniMax-H3** 竞争激烈，前者在视频生成领域持续领跑。此外，针对 Apple Silicon 和边缘设备的 **MLX** 量化版本（如 Ternary-Bonsai、Edge0）热度上升，反映出本地化推理需求旺盛。

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,759 | 7,365,368 | 原生多模态文本生成模型，下载量突破700万，是今日生态中心。作为 Qwen3.5 系列的强化版，其对话能力与推理性能成为基准测试热门。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,741 | 5,919,746 | 经典的开源指令微调模型，下载量近600万，仍是大量企业应用的基座选择。其稳定的 API 兼容性和庞大的社区支持使其长期保持高热度。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,446 | 742,586 | Qwen4 实验系列的快速响应模型，针对低延迟场景优化。其“Flash”特性使其在实时对话应用中具备显著优势，点赞数增长迅速。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,299 | 482,270 | 支持图像和文本的多模态生成模型，强调推理效率。今日同时出现多个社区衍生版（如 FP8 量化），显示其在特定垂直领域的开发活跃度。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,473 | 2,905,932 | GLM 系列的新一代多模态对话模型，下载量接近300万。其“Flash”版本在保持高推理速度的同时，提升了中文语境下的交互体验。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,589 | 389,555 | 专为移动端和边缘设备设计的超小型多模态模型。以 2B 参数实现高效文本生成，适合资源受限场景下的嵌入式 AI 部署。 |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 629 | 7,278 | 采用 MoE 架构的对话模型，激活参数仅为 4B。虽然下载量尚处于早期，但其高参数量与低激活量的比例设计受到关注。 |

#### 🎨 多模态与生成（图像、视频、音频、文本到X）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,484 | 4,299,737 | 文生视频与图生视频模型，下载量超过420万，占据视频生成榜首。其高质量的动态生成能力使其成为创意工具开发者的首选基座。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,437 | 1,607,815 | 单文件扩散模型，支持图像到视频及视频到视频的转换。其轻量化架构和跨模态一致性表现优异，社区衍生版（如 Singularity）进一步拓展了其应用场景。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 871 | 15,446 | 专注于音乐生成与符号化规划的音频模型。作为“Agentic editing”的代表，它展示了 AI 从单纯生成向结构化编辑能力的演进。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 324 | 3,355 | 支持零样本语音克隆的 TTS 模型。腾讯在语音合成领域的最新探索，强调音色保持与情感表达的均衡。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 6,079 | 254,149,235 | 经典的句子嵌入模型，下载量高达2.5亿，是 RAG 系统的基石组件。尽管发布时间较早，其极高的稳定性和轻量级特性使其在工业界不可替代。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,202 | 1,516,960 | 基于 2-bit 三元量化的 GGUF 模型，下载量破150万。证明极低比特量化在消费级硬件上运行大模型的可行性，极大降低了入门门槛。 |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,373 | 7,118,363 | Unsloth 团队提供的 Qwen3.8 高效量化版，下载量与原版持平。其高效的权重转换工具链使得该模型在 Llama.cpp 生态中极为流行。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 958 | 1,256,962 | 社区深度微调的“去审查”代码增强版。虽然命名复杂，但反映了开发者对 Qwen 模型在编码和特定风格控制上的强烈定制需求。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,417 | 1,154,265 | 采用 GSQ 和 RCO 技术的混合精度量化模型。学术团队主导的量化方案，旨在平衡精度损失与推理速度，适合对延迟敏感的生产环境。 |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 242 | 23,111 | 针对 Apple Silicon 优化的 MLX 格式量化模型。与 GGUF 版本对应，进一步证明 2-bit 量化在多种硬件后端上的通用性。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 300 | 34,230 | DeepSeek 模型的 FP8 量化去审查版本。FP8 量化在保持模型能力最小损失的同时，提升了在高端 GPU 上的推理吞吐量。 |

### 3. 生态信号
**Qwen3.8 家族** 是今日最强势的模型族群，不仅官方版本下载量巨大，其社区量化版（GGUF/MLX）和微调版（去审查/代码增强）也占据多个头部位置，显示其已成为开源界的“默认选择”。**DeepSeek-V4.1** 紧随其后，但更多以特定微调变体形式出现。
在趋势上，**本地化推理** 需求明显，GGUF 和 MLX 格式的热度极高，2-bit 和 FP8 量化技术成为平衡性能与资源消耗的主流方案。
**闭源 vs 开源**：虽然榜单多为开源模型，但 **MiniMax** 和 **Lightricks** 的商业视频生成模型占据多模态头部，显示商业厂商在特定生成任务上仍具技术壁垒。值得注意 **sentence-transformers** 模型虽旧但下载量破亿，表明基础嵌入技术已沉淀为行业基础设施。

### 4. 值得探索
1.  **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为生态核心，研究其多模态架构及如何高效微调（参考 Unsloth 或 DavidAU 的版本）是理解当前 LLM 应用最佳实践的关键。
2.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：探索 2-bit 三元量化在消费级硬件上的极限性能，适合边缘计算场景的技术评估。
3.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：对于视频生成开发者，该模型提供了高效的图生视频能力，结合其社区衍生版（如 WarmBloodAban/Minimax-h3_Singularity 的思路），可研究如何在单文件扩散模型上实现更连贯的时序生成。