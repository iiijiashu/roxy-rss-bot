# Hugging Face 热门模型日报 2026-10-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-22 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-22)

### 1. 今日速览
今日榜单由 Qwen 家族强势主导，其中 `Qwen3.8-27B` 以 18,138 个赞位居榜首，`Qwen3.8-Flash-Next` 也展现出极高的社区热度。视觉生成与理解领域竞争激烈，`facebook/sam3` 和 `baidu/Unlimited-OCR` 凭借数百万级的下载量成为多模态领域的标杆。DeepSeek 的 V4.1 系列及其社区去审查量化版本受到大量开发者关注，显示出高性能开源 LLM 在本地部署和自由化改造上的强劲需求。

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,138 | 7,729,432 | 旗舰级多模态对话模型，下载量破 770 万，确立其作为生态核心地位。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,390 | 2,633,567 | 高速推理版本，标签显示为 qwen4_exp，适合对延迟敏感的场景。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,063 | 120,930 | 基于 Gemma4 的“去 AI 味”工具，通过生成更自然的人类语言风格获得关注。 |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 2,161 | 42,122 | DeepSeek 最新 Flash 系列，支持图像文本理解，具备极强的长上下文处理能力。 |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 550 | 16,939 | 采用 MoE 架构的紧凑型 LLM，旨在平衡推理效率与模型性能。 |
| [reflection/Beam-1.0-501B-A23B](https://huggingface.co/reflection/Beam-1.0-501B-A23B) | reflection | 208 | 3,555 | 超大参数 MoE 模型，专注于深度推理与代码生成任务。 |
| [tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 272 | 2,682 | 腾讯发布的对话模型，强调记忆能力与交互体验。 |
| [nvidia/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 289 | 9,340 | NVIDIA 官方针对本地部署优化的 FP4 量化版本，降低硬件门槛。 |
| [RecursiveSI/flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 238 | 0 | 新兴对话模型，目前虽无下载记录，但已引起早期用户兴趣。 |

#### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,755 | 2,057,942 | 高性能视频生成模型，支持图生视频与文生视频，下载量超 200 万。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,845 | 1,906,176 | Meta 的分割一切模型最新迭代，大幅提升视频分割与特征提取精度。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,853 | 2,127,860 | 百度出品的 OCR 模型，下载量超过 210 万，具备强大的文档理解能力。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 1,022 | 29,826 | Qwen 图像生成模型的高效版本，支持快速图像生成与编辑。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 888 | 15,274 | 多角色 TTS 模型，专为音频叙事与有声剧场景优化。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,187 | 490,447 | FLUX 3 系列的 ComfyUI 集成版，极大简化了图像生成工作流。 |
| [OpenMOSS-Team/MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 533 | 5,840 | MOSS 图像模型的 SFT 版本，在指令遵循上表现优异。 |
| [OpenMOSS-Team/MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) | OpenMOSS-Team | 465 | 4,344 | MOSS 基础模型，为后续微调提供高质量基座。 |
| [black-forest-labs/flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 599 | 92,604 | FLUX 3 核心模型，支持高质量的图像编辑与生成。 |
| [lodestones/Kromoss](https://huggingface.co/lodestones/Kromoss) | lodestones | 203 | 11,608 | 基于 MOSS 架构的文生图模型，具备较强的风格迁移能力。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,805 | 179,734 | Google 推出的新一代嵌入模型，在 RAG 与检索任务中表现卓越。 |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 260 | 5,488 | Mistral 的时序预测基础模型，专为时间序列数据分析设计。 |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 341 | 3,588 | 轻量级 CPU 友好型 OCR 模型，适用于边缘设备部署。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,765 | 2,738,344 | 社区去除审查的 Qwen 图像模型 GGUF 量化版，下载量极高。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 329 | 1,290,080 | MOSS 图像的 ComfyUI 专用格式，下载量破 120 万，工作流友好。 |
| [meta-models/Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 636 | 2,891 | Meta 开源的超大参数多模态模型，代表当前开源上限。 |
| [meta-models/Muse-Spark-Open-816B-A42B-NVFP4](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4) | meta-models | 202 | 6,507 | Muse-Spark 的 NVFP4 量化版本，便于在高端 GPU 集群中部署。 |
| [nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4) | nvidia | 202 | 12,910 | Nemotron 多模态模型的量化版，结合 NVIDIA 硬件优化加速推理。 |
| [dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 210 | 3,458 | DeepSeek 模型的 FP8 去审查版本，兼顾性能与自由化需求。 |
| [lodestones/MOSS-Image-SFT-8-steps-dmd](https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd) | lodestones | 193 | 68,289 | MOSS SFT 模型的加速微调版，仅需 8 步即可生成高质量图像。 |
| [orcarouter/OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) | orcarouter | 170 | 19,697 | 专注于网络安全与逆向工程的视觉语言模型 GGUF 版本。 |

### 3. 生态信号
当前生态呈现三大趋势：首先，**Qwen 家族**势头最旺，从 27B 基础模型到 Flash 推理版再到图像生成，覆盖全链路且下载量断层领先；其次，**多模态与 OCR/分割**成为刚需，百度和 Meta 的模型下载量超百万，显示企业级文档理解需求爆发；最后，**量化与去审查**活动活跃，社区对 FP4/FP8 量化及 Uncensored 版本的高关注度，反映出开发者对“本地高性能”与“内容自由化”的双重追求。

### 4. 值得探索
1.  **[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为点赞与下载双冠王，它是构建通用 AI 应用最稳妥的基座，值得研究其多模态对齐机制。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成领域的强力选手，其单文件扩散架构适合探索短视频自动化的生产管线。
3.  **[abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)**：下载量突破 270 万，代表了用户对于打破生成限制与本地量化部署的极致需求，适合研究社区微调的伦理与技术边界。