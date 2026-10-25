# Hugging Face 热门模型日报 2026-10-25

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-25 00:20 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-25**

## 今日速览
本日 Hugging Face 生态呈现“多模态视频爆发”与“LLM 轻量化社区深耕”并行的趋势。Lightricks 的视频生成模型与 Qwen 的多模态大模型占据下载量榜首，显示市场对高效多模态能力的强烈需求。与此同时，DeepSeek 和 Qwen 的开源权重引发了大量社区驱动的 GGUF 量化与“去审查”微调热潮。Facebook 发布的 SAM3 在分割任务上表现强劲，而 Google 的新版嵌入模型也显示出在特征提取领域的持续领先地位。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,340 | 7,851,161 | 基于 Qwen3.5 架构的多模态 LLM，凭借极高的下载量成为本日生态核心。其 image-text-to-text 能力使其成为开发多模态应用的首选基座。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,456 | 3,035,077 | Qwen4 实验性系列的快速版本，以极低的延迟和高效的 token 处理能力上榜。适合对实时性要求高且需要多模态理解的边缘或轻量级部署场景。 |
| [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 2,772 | 73,215 | DeepSeek 最新的多模态快速推理模型，支持图像理解与文本生成。其简洁的架构设计使其在开发者中获得了快速传播与高度关注。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,129 | 138,556 | 基于 Gemma4 架构的“人性化”写作模型，旨在消除 AI 痕迹并优化自然语言表达。极高的下载量反映了用户对去除 AI 写作僵化感的迫切需求。 |
| [DavidAU/Qwen3.8-27B-TURBO...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 2,053 | 1,679,051 | 针对 Qwen3.8 的深度社区微调版本，融合了代码增强与“去审查”特性。该 GGUF 版本因其在保持高性能的同时提供无限制创作空间而备受追捧。 |
| [RecursiveSI/flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 771 | 4,795 | 专注于对话能力的轻量级 LLM，设计用于高响应性的交互场景。其简洁的标签与社区关注度表明其在特定对话垂直领域具备竞争力。 |
| [XHToken/Spark-X2.6-4B](https://huggingface.co/XHToken/Spark-X2.6-4B) | XHToken | 444 | 2,537 | 4B 参数规模的紧凑型 LLM，支持文本生成与多模态初步理解。小模型的高效能使其成为端侧 AI 与低算力设备部署的热门选择。 |
| [MiniMaxAI/MiniMax-M3.1-Flash](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash) | MiniMaxAI | 307 | 5,789 | MiniMax 团队推出的多模态快速模型，强化了图文对齐能力。其低延迟特性使其非常适合集成到需要即时反馈的智能终端系统中。 |
| [Ornith-1.5-122B](https://huggingface.co/ornith-ai/Ornith-1.5-122B) | ornith-ai | 157 | 30,407 | 基于 Qwen3.5-MoE 架构的大规模 Mixture-of-Experts 模型。通过稀疏激活在保持大模型性能的同时显著降低了推理成本。 |
| [KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview) | KRAFTON | 164 | 917 | KRAFTON 发布的预览版小型 LLM，展示了游戏巨头在文本生成领域的探索。尽管下载量尚小，但其背后大厂背景值得关注。 |
| [InternScience/Sage-A1.5](https://huggingface.co/InternScience/Sage-A1.5) | InternScience | 267 | 2,033 | 结合了 Qwen3.5 与 MoE 技术的科研导向模型，强调在特定学术任务上的表现。适合研究机构用于探索多模态与大规模参数高效结合。 |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 338 | 8,731 | 专注于时间序列预测的微小基础模型，展示了 LLM 架构在非文本领域的拓展。其 209M 的体量使其极易集成到任何需要实时时序分析的系统。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 9,174 | 2,087,721 | 领先的单文件视频生成与编辑模型，支持图生视频、文生视频及视频间转换。超两百万的下载量彰显了其在视频创作工作流中的统治地位。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 5,028 | 1,863,670 | 强大的图像分割基础模型，支持特征提取与掩码生成。作为 Meta 开源生态的重要组件，它在视频理解与目标检测领域具有极高的应用价值。 |
| [Qwen-Image-2.1-Uncensored...](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,965 | 2,303,585 | 基于 Qwen 图像模型的量化去审查版本，专为 ComfyUI 工作流优化。其 GGUF 格式与宽松的内容策略使其成为创意社区的热门工具。 |
| [flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,496 | 590,742 | Black Forest Labs 最新图像生成与编辑模型，深度适配 ComfyUI。单文件扩散模型架构降低了部署门槛，使其在 AIGC 社区广泛流行。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 981 | 19,831 | 多角色文本转语音（TTS）模型，擅长通过音色区分不同叙述者。在有声书、播客及互动叙事领域提供了高质量的情感化语音解决方案。 |
| [flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 671 | 112,091 | Flux 3 系列的基础版本，支持高质量的图像生成与局部编辑。相比 Comfy 版本，它更适合标准的 HuggingFace Diffusers 工作流集成。 |
| [MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 688 | 9,717 | 经指令微调的图像生成模型，在遵循复杂文本提示方面表现优异。SFT 版本的精准度使其成为商业级图像生成任务的可靠选择。 |
| [MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) | OpenMOSS-Team | 534 | 6,943 | MOSS 图像模型的基座版本，为社区微调提供了强大的起点。其开放权重策略促进了大量衍生模型在 Hugging Face 上的涌现。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 425 | 1,944,278 | 官方 ComfyUI 工作流版本，旨在降低 MOSS 图像模型的使用门槛。近两百万的下载量反映了 Comfy 生态在图像生成社区的绝对影响力。 |
| [indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 401 | 4,436 | 支持 CPU 运行的 ONNX 格式 OCR 模型，具备高效的图像转文本能力。轻量化与无需 GPU 的特性使其成为文档数字化场景的理想轻量级方案。 |
| [Fibo-2.0](https://huggingface.co/Comfy-Org/Fibo-2.0) | Comfy-Org | 161 | 111,611 | 基于 Bria 模型的 ComfyUI 适配版本，强调生成图像的逻辑连贯性。作为单文件模型，它简化了高质量图像生成的部署与维护流程。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,893 | 206,909 | Google 推出的高性能文本嵌入模型，显著提升了语义搜索与 RAG 效率。作为基础模型，它为众多 AI 应用提供了标准化的向量化基础设施。 |
| [OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) | orcarouter | 227 | 27,054 | 专注于网络安全与逆向工程的垂直领域模型，支持视觉语言任务。其 GGUF 格式使得安全研究人员能在本地环境高效分析复杂的系统行为。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/flint-GGUF](https://huggingface.co/unsloth/flint-GGUF) | unsloth | 218 | 78,891 | 由 Unsloth 团队优化的 Flint 模型 GGUF 量化版。凭借其高效的量化技术，该版本在保持原模型性能的同时极大地提升了本地部署速度。 |
| [DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 332 | 5,583 | 基于 FP8 精度量化的 DeepSeek 去审查版本，平衡了性能与安全性边界。该模型满足了开发者对无限制交互需求的同时保持了较高的推理效率。 |
| [Kromoss](https://huggingface.co/lodestones/Kromoss) | lodestones | 246 | 21,143 | 针对 MOSS 图像模型进行的特定风格微调版本。该微调模型在特定图像生成任务上展现出更强的可控性与艺术表现力。 |
| [DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF) | ISTA-DASLab | 198 | 32,479 | 采用 GSQ 混合精度量化技术的 DeepSeek 变体，旨在最小化量化带来的精度损失。它是追求极致本地推理性能的量化方案代表。 |
| [Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 686 | 6,811 | Meta 发布的超大规模 MoE 模型，通过稀疏激活实现高效推理。作为开放权重模型，它为探索前沿 AI 架构与极限算力部署提供了基准。 |

## 生态信号
Qwen 与 DeepSeek 家族占据绝对主导，社区对其衍生模型（如“去审查”与量化版）的极高热情反映了开发者对开源权重的绝对偏好。Mistral 与 Meta 通过垂直领域（时序、大规模 MoE）和官方开源策略保持竞争力。生态趋势显示，单纯的 LLM 竞争已转向“多模态+本地化”双引擎：一方面，视频与分割模型（LTX, SAM3）下载量激增，表明生成式多模态进入实用化阶段；另一方面，GGUF 量化与 Unsloth 生态的繁荣证明了去中心化本地部署已是刚性需求。

## 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：本日下载量最高，单文件视频模型。建议探索其在 AIGC 工作流中对复杂视频叙事与局部重绘的控制能力。
2.  **[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：多模态 LLM 标杆。适合作为本地多模态 Agent 的基座，研究其在复杂图文指令下的逻辑稳定性。
3.  **[unsloth/flint-GGUF](https://huggingface.co/unsloth/flint-GGUF)**：量化工具与社区微调的典范。可用于研究 Unsloth 量化技术在保持对话模型“智力”与“速度”平衡上的具体优势。