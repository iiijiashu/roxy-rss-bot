# Hugging Face 热门模型日报 2026-10-24

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-24 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-24)

## 今日速览
Meta 推出的 **Qwen3.8-27B** 以近 1.8 万点赞和 770 万下载量霸榜，确立了多模态 LLM 的主流地位；**Lightricks/LTX-2.5** 在视频生成领域表现强劲，下载量突破 200 万；**Black Forest Labs** 的 Flux-3 系列（Klein 及 ComfyUI 版本）持续主导图像编辑市场；社区量化与微调活动活跃，GGUF 格式及“去审查”版本在多个人气榜单位置占据高地。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,294 | 7,710,011 | 支持图像文本的多模态大模型，本周下载量与点赞数均居首，具备强大的对话与推理能力。 |
| [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 2,581 | 57,715 | DeepSeek 最新的 Flash 版本，支持多模态输入，在效率与性能间取得平衡，受开发者青睐。 |
| [Flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 686 | 1,904 | 面向递归应用的文本生成模型，标签显示其具备对话属性，适合特定逻辑链条任务。 |
| [Spark-X2.6-4B](https://huggingface.co/XHToken/Spark-X2.6-4B) | XHToken | 411 | 1,060 | 4B 参数的小型 LLM，主打轻量级文本生成，适合边缘设备或低延迟场景部署。 |
| [Humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,115 | 129,025 | 基于 Gemma4 架构的多模态模型，专门用于“拟人化”文本输出，下载量远超点赞数，实用性高。 |
| [MiniMax-M3.1-Flash](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash) | MiniMaxAI | 257 | 1,096 | MiniMax 的多模态快速响应模型，支持图像与文本交互，定位为高吞吐场景。 |
| [Sage-A1.5](https://huggingface.co/InternScience/Sage-A1.5) | InternScience | 252 | 924 | 基于 Qwen3.5 MoE 架构的模型，标签显示支持多模态与 MoE 技术，探索混合专家路线。 |
| [Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 314 | 6,815 | Mistral 推出的时序预测基础模型，体积小巧（209M），专门用于时间序列数据分析。 |
| [Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 302 | 3,270 | 腾讯发布的对话模型，强调记忆能力（Memory），总参数 30B，激活参数 3B。 |
| [Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 679 | 5,196 | Meta 的大规模 MoE 模型，总参数 816B，激活 42B，面向高端多模态推理场景。 |
| [Dory1.0-4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16) | nvidia | 176 | 3,769 | NVIDIA Nemotron 实验室的小参数模型，采用 BF16 精度，适合本地开发调试。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 9,033 | 2,026,951 | 视频生成模型，支持图生视频、文生视频及视频间转换，下载量超 200 万，极具影响力。 |
| [Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,908 | 2,398,071 | Qwen 图像模型的 GGUF 量化去审查版，下载量超 230 万，社区对无限制生成需求旺盛。 |
| [SAM3](https://huggingface.co/facebook/sam3) | facebook | 4,983 | 1,837,047 | Meta 的分割模型（Segment Anything Model 3），支持视频分割与特征提取，下载近 180 万。 |
| [Flux-3-Image-Klein-Comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,406 | 534,837 | Black Forest Labs 的图像编辑模型 ComfyUI 单文件版，下载量超 53 万，便于工作流集成。 |
| [Drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 947 | 17,017 | Fish Audio 的多说话人语音生成模型，主打戏剧化语音合成，在 TTS 领域热度较高。 |
| [Flux-3-Image-Klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 656 | 105,768 | Flux-3 系列的标准 Diffusers 版本，支持图像生成与编辑，是 Klein 系列的姊妹产品。 |
| [MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 650 | 7,658 | OpenMOSS 团队的文生图指令微调模型，专为提升指令遵循能力而训练。 |
| [MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) | OpenMOSS-Team | 520 | 5,618 | MOSS 图像模型的基础版本，作为其他微调模型的底座，社区关注度稳步上升。 |
| [Indra-OCR](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 391 | 4,033 | 支持 CPU 运行的 OCR 模型，采用 ONNX 格式，适合资源受限环境下的文字识别。 |
| [Kromoss](https://huggingface.co/lodestones/Kromoss) | lodestones | 234 | 16,365 | 基于 MOSS-Image 的社区微调模型，下载量远超点赞数，显示其实用性强。 |
| [OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) | orcarouter | 211 | 22,314 | 专注网络安全的视觉语言模型，支持逆向工程分析，是垂直领域 LLM 的代表。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [EmbeddingGemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,871 | 192,741 | Google 的最新嵌入模型，用于特征提取，下载量近 20 万，是 RAG 和搜索系统的核心组件。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.8...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 2,017 | 1,679,145 | Qwen3.8-27B 的社区“去审查”GGUF 微调版，下载量超 160 万，显示本地用户高度依赖此类优化版。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 395 | 1,606,363 | MOSS-Image 的 ComfyUI 单文件封装，下载量超 160 万，极大降低了工作流使用门槛。 |
| [Flint-GGUF](https://huggingface.co/unsloth/flint-GGUF) | unsloth | 190 | 33,277 | Unsloth 提供的 Flint 模型 GGUF 量化版，便于在消费级硬件上运行。 |
| [Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 327 | 11,197 | NVIDIA 官方提供的 FP4 量化模型，针对本地部署优化，体现硬件厂商对量化生态的支持。 |
| [MOSS-Image-SFT-8-steps-dmd](https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd) | lodestones | 207 | 79,664 | 采用 DMD 技术的 8 步快速生成微调版，下载量近 8 万，主打推理速度优化。 |
| [Fibo-2.0](https://huggingface.co/Comfy-Org/Fibo-2.0) | Comfy-Org | 150 | 70,682 | ComfyUI 对 Fibo-2.0 模型的官方封装，下载量超 7 万，服务于图像生成工作流。 |
| [DeepSeek-V4.1-Flash...](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 296 | 4,141 | DeepSeek V4.1 的 FP8 量化去审查版，在本地部署场景中提供性能与自由度的折中。 |

## 生态信号
当前生态呈现“基座模型巨头主导，社区量化/微调爆发”的格局。**Qwen、Meta（Muse）、DeepSeek** 等大厂基座模型热度极高，但占据下载榜首的多为社区 GGUF 或 FP4/FP8 量化版本（如 DavidAU 的 Qwen、Comfy-Org 的封装），显示开发者强烈倾向本地化部署与低显存占用。**开源权重** 依然是主流，且“去审查”（Uncensored）标签在多个高下载量模型中出现，反映社区对生成自由度的追求。同时，**ComfyUI 单文件模型**（如 Flux、MOSS）的下载量远超标准 Diffusers 版本，表明工作流集成已成为图像生成模型分布的主要渠道。

## 值得探索
1.  **[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为本周绝对热点，它是多模态（图像+文本）能力的标杆，适合研究当前 SOTA 的多模态对齐策略及 27B 参数规模下的效率表现。
2.  **[EmbeddingGemma-2](https://huggingface.co/google/embeddinggemma-2)**：Google 嵌入模型在 RAG 和语义搜索中应用广泛，高下载量表明其在工业界检索增强生成（RAG）管道中的核心地位，值得探索其与 LLM 的联合优化。
3.  **[LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成技术迭代极快，LTX-2.5 的高下载量反映了视频 AI 从文本生成向多模态交互扩展的趋势，适合研究其时序一致性算法及图生视频能力。