# Hugging Face 热门模型日报 2026-10-23

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-23 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-23)

## 今日速览
Qwen 家族表现强劲，Qwen3.8 系列以极高的下载量领跑榜单，其中 Qwen3.8-27B 和 Flash-Next 版本尤为瞩目。DeepSeek 发布最新 Flash 模型，且已出现社区去审查量化版本，显示其生态系统活跃。多模态方面，MOSS-Image 系列引发热潮，不仅官方发布 Base 和 SFT 版本，ComfyUI 及社区加速变体也迅速上榜。视频生成领域，Lightricks 的 LTX-2.5 下载量突破 200 万，显示对高效视频工具的高需求。此外，Meta 开源了大参数量级模型 Muse-Spark，继续推动开源大模型的发展。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,213 | 7,758,670 | 本周最热语言模型，支持图文多模态输入。极高的点赞与下载量表明其在通用对话与推理任务上的强大吸引力。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,409 | 2,706,809 | Qwen3.8 系列的轻量/快速版本，标签显示为实验性质 (qwen4_exp)。下载量巨大，适合对响应速度有要求的应用场景。 |
| [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 2,354 | 51,911 | DeepSeek 最新发布的 Flash 模型，支持图文理解。作为官方原版，它是众多社区微调与量化版本的基石。 |
| [Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 659 | 3,163 | Meta 发布的超大参数稀疏模型 (816B 总参数/42B 激活)。标签标记为开源，旨在提供接近闭源旗舰的推理能力。 |
| [flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 533 | 420 | RecursiveSI 发布的对话模型，支持文本生成。虽然下载量较低，但其独特的标签组合引发了社区关注。 |
| [Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 285 | 6,194 | Mistral 针对时间序列预测领域的基础模型。展现了 LLM 技术向垂直时序数据领域扩展的趋势。 |
| [Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 287 | 2,966 | 腾讯发布的混合架构模型 (A3B 可能指激活参数)。专注于文本生成与对话，是国产大厂在 MoE 架构上的最新尝试。 |
| [Spark-X2.6-4B](https://huggingface.co/XHToken/Spark-X2.6-4B) | XHToken | 248 | 482 | 小参数 LLM，标签显示基于 Spark2.5 架构。适合端侧部署或轻量级任务。 |
| [Sage-A1.5](https://huggingface.co/InternScience/Sage-A1.5) | InternScience | 223 | 396 | 基于 Qwen3.5 MoE 架构的微调模型，支持多模态。体现了社区对开源 MoE 基座的二次开发热情。 |
| [Beam-1.0-501B-A23B](https://huggingface.co/reflection/Beam-1.0-501B-A23B) | reflection | 227 | 3,984 | Reflection 公司发布的超大 MoE 模型，专注推理与代码。标签明确指向 reasoning 和 code 任务。 |
| [NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16) | nvidia | 164 | 3,375 | NVIDIA 实验室发布的 4B 模型，提供 BF16 精度版本。用于研究或小规模部署测试。 |
| [LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 562 | 17,637 | LiquidAI 发布的混合专家模型，激活参数仅 2B。以低算力需求实现较高性能为卖点。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,896 | 2,054,990 | 高性能视频生成模型，支持图文到视频等任务。下载量超 200 万，是当前视频生成领域的流量霸主。 |
| [sam3](https://huggingface.co/facebook/sam3) | facebook | 4,916 | 1,864,206 | Meta 发布的分割模型 (Segment Anything Model 3)。兼具视频与图像分割能力，下载量极高，是视觉感知的基础设施。 |
| [MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 579 | 6,890 | OpenMOSS 团队发布的指令微调版图像生成模型。相比 Base 版，更好地遵循用户提示词。 |
| [MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) | OpenMOSS-Team | 486 | 5,013 | MOSS-Image 的基础版本，用于后续微调或作为 ComfyUI 工作流的基座模型。 |
| [flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,301 | 512,524 | Black Forest Labs 官方提供的 ComfyUI 单文件版本 Flux 3 变体。极大简化了部署流程，下载量惊人。 |
| [flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 637 | 102,903 | Flux 3 图像编辑与生成模型的标准 Diffusers 版本。支持从图像到图像的转换任务。 |
| [drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 915 | 16,305 | Fish Audio 发布的多说话人 TTS 模型。专为有声剧或对话场景优化，支持情感与角色区分。 |
| [indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 367 | 3,823 | 轻量级 OCR 模型，支持 CPU 运行 (Onnx 格式)。适合非 GPU 环境下的文档文字提取需求。 |
| [Kromoss](https://huggingface.co/lodestones/Kromoss) | lodestones | 225 | 14,415 | 基于 MOSS-Image 架构的社区微调模型。展示了图像生成模型在特定风格或用途上的定制方向。 |
| [humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,096 | 124,773 | 基于 Gemma4 Unified 架构的模型，标签指向“人性化”处理。可能用于文本风格转换或去除 AI 痕迹。 |
| [OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) | orcarouter | 190 | 21,727 | 专为网络安全、逆向工程设计的视觉语言模型。垂直领域 VLM 的代表，下载量不错。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,845 | 185,259 | Google 发布的第二版 Gemma 嵌入模型。用于特征提取，是构建 RAG 系统和其他向量应用的核心组件。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,830 | 2,665,585 | 社区对 Qwen-Image 进行的去审查量化版本 (GGUF)。下载量超过 260 万，显示本地部署需求极其旺盛。 |
| [MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 362 | 1,463,386 | ComfyUI 官方团队将 MOSS-Image 适配为单文件 ComfyUI 模型。极大降低了集成门槛，下载量高达 146 万。 |
| [DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 259 | 3,808 | DeepSeek V4.1 的去审查 FP8 量化版。针对特定硬件优化，同时解除安全限制，吸引特定用户群体。 |
| [MOSS-Image-SFT-8-steps-dmd](https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd) | lodestones | 202 | 75,389 | 基于 DMD 蒸馏技术的 8 步加速推理版本。牺牲少量质量换取 4-8 倍的生成速度，下载量较高。 |
| [Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 313 | 10,519 | NVIDIA 使用 Model Optimizer 对 Qwen Flash Next 进行的 FP4 量化。展示了在极低精度下的推理优化尝试。 |
| [flint-GGUF](https://huggingface.co/unsloth/flint-GGUF) | unsloth | 150 | 7,401 | unsloth 提供的 Flint 模型 GGUF 格式。方便使用 llama.cpp 等工具在本地 CPU/混合架构上运行。 |

## 生态信号
开源权重模型在大规模生成任务（图像、视频）中占据绝对主导，尤其是 ComfyUI 单文件适配和 GGUF 量化版本下载量远超原始模型，表明本地化、低算力部署是当前最大痛点。Qwen 和 MOSS-Image 等基座模型衍生出大量社区微调（如去审查、加速、风格化），形成“基座+生态”的健康循环。此外，Meta 和 Qwen 均发布超大参数 (800B/500B 级) 稀疏模型，预示开源界正在向更复杂的 MoE 架构演进，以在激活参数量可控的前提下追求前沿性能。

## 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：作为下载量最高的视频模型，它是测试现有硬件极限和探索视频生成工作流的最佳选择，其单文件特性便于快速集成。
2.  **[Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)**：虽然带有争议标签，但其 260 万的下载量证明了社区对本地化、无过滤内容生成工具的巨大需求，适合研究用户行为与模型约束解除后的表现差异。
3.  **[google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)**：对于构建 RAG 或搜索系统的开发者，这是经过验证的可靠嵌入基础，其高下载量反映了工业界对标准化、高性能向量模型的依赖。