# Hugging Face 热门模型日报 2026-10-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-20 00:20 UTC

---

# Hugging Face 热门模型日报（2026-10-20）

## 今日速览
今日榜单由 Qwen3.8 系列主导，其中 [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) 以 18,010 点赞和超 740 万下载量稳居榜首，显示出社区对高性能多模态语言模型的强烈需求。视频生成领域表现强劲，[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) 凭借近 200 万下载量成为视频模型热点。DeepSeek 推出 [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) 系列，主打快速推理能力。图像生成方面，Black Forest Labs 的 Flux 3 系列与 Qwen 的未审核量化版均获得高关注度。此外，百度发布的 [Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) 也进入前列，反映了专用视觉理解模型的持续热度。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,010 | 7,458,401 | 支持图像文本交互的多模态大模型。凭借极高的下载量和点赞数，成为当前生态中最受欢迎的开源基座模型之一。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,334 | 2,494,099 | Qwen3.8 的轻量级快速版本，标签显示为 qwen4_exp。其高达 249 万的下载量表明开发者对低延迟推理场景的需求巨大。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,653 | 1,367,081 | DeepSeek V4.1 系列的快速版本，支持图像文本生成。以 136 万下载量进入前五，突显其在高效能语言模型中的领先地位。 |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 502 | 14,151 | 一个 24B 参数的混合专家（MoE）语言模型。虽然总参数较大，但激活参数仅 2B，旨在平衡性能与推理成本。 |
| [tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 219 | 1,571 | 腾讯发布的记忆增强型 MoE 模型，激活参数为 3B。虽然下载量较低，但代表了大厂在长上下文和记忆能力上的技术探索。 |
| [reflection/Beam-1.0-501B-A23B](https://huggingface.co/reflection/Beam-1.0-501B-A23B) | reflection | 167 | 2,097 | 超大参数量的 MoE 模型，专注于推理和代码任务。其 501B 的总参数量使其成为研究大规模稀疏模型的重要资源。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 569 | 425,513 | 针对本地部署优化的 27B 模型，支持工具调用。极高的下载量显示其在端侧或边缘计算场景中的受欢迎程度。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,486 | 2,019,834 | 先进的图像转视频及文本转视频模型。作为视频生成领域的黑马，其超 200 万的下载量表明视频创作工具的巨大市场潜力。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 769 | 11,795 | 多说话人文本转语音模型，擅长戏剧化叙述。该模型在有声书和叙事音频生成领域提供了高质量的多角色表现力。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 964 | 393,062 | 专为 ComfyUI 优化的 Flux 3 图像编辑模型。高达 39 万的下载量反映了创作者社区对无缝工作流集成的强烈偏好。 |
| [openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) | openbmb | 1,066 | 76,410 | 高效的视觉语言模型，采用 MoE 架构。其 76 千的下载量显示其在端侧多模态应用中的实用价值，兼具精度与效率。 |
| [OpenMOSS-Team/MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 405 | 3,336 | 基于指令微调（SFT）的图像生成模型。该模型强调对复杂指令的理解，旨在提升生成图像与用户意图的一致性。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 998 | 25,033 | Qwen 系列的快速图像生成版本。适合需要实时或近实时图像生成的应用场景，平衡了生成速度与质量。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,822 | 1,799,825 | 百度发布的通用 OCR 模型，支持特征提取。其近 180 万的下载量表明文档数字化和视觉信息提取需求极其旺盛。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,694 | 1,902,371 | 强大的分割模型，支持视频掩码生成。SAM 3 在视觉定位领域的持续迭代，使其成为图像和视频分析基础设施的核心组件。 |
| [nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4) | nvidia | 171 | 9,322 | 面向视觉语言任务的 Nemotron 模型，采用 NVFP4 量化格式。体现了 NVIDIA 在特定硬件上优化多模态模型推理的努力。 |
| [meta-models/Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 580 | 2,109 | Meta 开源的大规模 MoE 多模态模型。尽管下载量尚处起步阶段，但其 816B 的总参数量预示着未来高性能多模态方向的技术趋势。 |
| [openbmb/MiniCPM-V-4.7-1B](https://huggingface.co/openbmb/MiniCPM-V-4.7-1B) | openbmb | 392 | 33,388 | MiniCPM-V 系列的小型 1B 版本。专为移动设备或资源受限环境设计，证明了多模态能力正在向更低算力场景下沉。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,725 | 167,750 | Google 推出的嵌入模型，适用于特征提取任务。作为检索增强生成（RAG）系统的核心组件，其 16 万下载量显示了文本向量化需求的增长。 |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 242 | 2,433 | 支持 CPU 运行的轻量级 OCR 模型，提供 ONNX 格式。适合在不依赖高端 GPU 的环境中进行文本识别，降低了部署门槛。 |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 195 | 2,601 | 专为时间序列预测设计的基础模型。Mistral 进军时序数据领域，展示了基础模型架构在非 NLP/非视觉模态中的应用潜力。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 1,986 | 109,937 | 基于 Gemma4 统一的文本生成模型，标签包含 "humanizer"。该模型可能用于优化文本风格或去 AI 化，其 10 万下载量反映了相关需求的增加。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,631 | 2,739,572 | Qwen 图像模型的未审核量化版本，支持 GGUF 格式。惊人的 273 万下载量显示社区对移除内容限制模型及本地部署工具的高度热情。 |
| [nvidia/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 239 | 6,047 | NVIDIA 官方提供的 Qwen3.8 快速模型 FP4 量化版本。便于在 NVIDIA 硬件上进行本地高性能推理，降低了大模型本地运行的显存需求。 |
| [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF) | LiquidAI | 215 | 120,509 | LiquidAI 模型的 GGUF 量化版本，支持 llama.cpp。12 万下载量证明量化版本在个人开发者和爱好者群体中的广泛普及。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 234 | 673,110 | 针对 ComfyUI 优化的 MOSS-Image 基础模型。67 万下载量表明图像生成模型与工作流工具集成的量化/优化版本需求巨大。 |
| [meta-models/Muse-Spark-Open-816B-A42B-NVFP4](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4) | meta-models | 184 | 3,672 | Meta 大规模 MoE 模型的 NVFP4 量化版本。展示了超大模型在特定硬件架构下的极致优化，旨在提升推理效率。 |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 1,690 | 17,924 | DeepSeek V4.1 的特定日期版本或快照。作为 Flash 系列的变体，满足了用户对稳定版本或特定功能集的需求。 |

## 生态信号

当前模型生态呈现三大显著趋势。首先，**混合专家（MoE）架构成为主流**，Meta、腾讯、Reflection 等大厂纷纷推出高总参、低激活参的 MoE 模型，以平衡算力成本与性能上限。其次，**本地化与量化需求爆发**，GGUF 和 FP4 量化版本（如 Qwen、LiquidAI、NVIDIA 模型）下载量巨大，表明开发者正致力于将高性能模型部署至边缘设备或消费级硬件。最后，**视频生成**成为新的竞争高地，LTX-2.5 的超高人气预示多模态生成正从静态图像向动态视频快速迁移。

## 值得探索

1.  **[abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)**：若研究社区对生成式 AI 内容政策的反应及本地部署技术栈，该模型是最佳案例。其 273 万下载量不仅反映了技术热度，也揭示了用户对无限制生成工具的需求边界。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：对于探索视频生成前沿应用（如实时渲染、视频编辑）的团队，该模型提供了高性能且易于获取的基座，适合用于构建视频理解与生成的原型系统。
3.  **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)**：对于需要处理大规模非结构化文档数据的业务场景，该模型展示了 OCR 技术在特征提取上的深度应用，值得在 RAG 管道中作为关键的数据预处理组件进行集成测试。