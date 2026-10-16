# Hugging Face 热门模型日报 2026-10-16

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-16 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-16)

## 今日速览
Qwen 系列持续主导榜单，其 **Qwen3.8** 系列（包括 27B 旗舰版和 Flash-Next）包揽了高下载量和高点赞量的核心席位，显示出该家族在开源生态中的统治力。视频生成领域迎来 **Lightricks LTX-2.5** 和 **DeepSeek V4.1** 等模型的爆发，下载量均突破百万级，显示社区对高质量多模态生成的强劲需求。同时，社区对 Qwen 模型的“去审查化”（Uncensored）及高效量化变体（如 2-bit GGUF）表现出极高热情，相关衍生模型占据了半壁江山，反映了本地化部署与自由化应用的强烈趋势。

## 热门模型

### 🧠 语言模型
主要包含纯文本生成、对话及指令遵循模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 388 | 6,286 | Liquid AI 发布的 MoE 架构语言模型，专注于高效推理。作为新兴实验室的作品，其 24B 参数规模兼顾了性能与速度。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 497 | 344,177 | 专注于工具调用和函数执行的 27B 模型。极高的下载量表明其在 Agent 自动化任务场景下的实用性极高。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,627 | 48,894 | 一款基于“系统一”思维模式的分类模型，强调校准决策。高点赞数反映出社区对高效、低资源消耗文本分类器的关注。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,537 | 1,238,583 | DeepSeek 最新发布的 Flash 版本语言模型。超过 120 万的下载量证明其已成为该版本最主流的基础底座模型之一。 |

### 🎨 多模态与生成
涵盖图像生成、视频生成、语音合成及跨模态理解模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,786 | 7,363,968 | Qwen 旗舰级多模态对话模型，支持图像文本交互。超 700 万下载量和近 1.8 万点赞使其成为本期榜单的绝对“顶流”。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,951 | 1,866,657 | 强大的视频扩散模型，支持图转视频及文转视频。近 190 万下载量显示其在视频生成领域的爆发式增长。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,252 | 2,290,500 | Qwen 系列的轻量化快速迭代版本。超 220 万下载量表明社区对低延迟、高效率多模态体验的巨大需求。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,702 | 1,163,009 | 百度推出的 OCR 特征提取模型。百万级下载量印证了其在文档数字化和视觉理解领域的强大落地能力。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,434 | 2,034,602 | Meta 推出的分割模型，支持视频分割与特征提取。超 200 万下载量显示其在计算机视觉基础任务中的核心地位。 |
| [openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) | openbmb | 793 | 9,278 | OpenBMB 的大型多模态视觉模型，支持图文混合输入。高参数量级（35B）体现了其在复杂视觉理解任务上的深度探索。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 475 | 4,048 | 支持多说话人的文本转语音（TTS）模型。针对内容创作者设计，展现了音频生成领域在自然度上的新突破。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 419 | 38,794 | 端侧（On-device）自动语音识别模型。强调了在设备本地运行语音转文本的隐私与低延迟优势。 |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 472 | 18,202 | 基于 MiniMax H3 的视频生成 LoRA 适配器，支持首尾帧控制。社区创作类模型的热度体现了 AI 视频制作的精细化趋势。 |

### 🔧 专用模型
侧重于嵌入（Embedding）、分类、OCR 等特定任务优化的模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,398 | 144,280 | Google 最新发布的嵌入模型，用于特征提取。作为权威厂商出品，其在 RAG 检索和向量数据库应用中的性能备受推崇。 |
| [vllm-sr/d3](https://huggingface.co/vllm-sr/d3) | vllm-sr | 197 | 2,747 | 基于 Qwen3.5 架构的零样本分类模型。展示了将语言模型能力迁移至特定分类任务的可能性，适合快速原型开发。 |

### 📦 微调与量化
包括社区微调版本、GGUF 量化版本及去审查化变体。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,385 | 2,415,278 | Qwen 图像模型的量化且去审查版本。超 240 万下载量显示“自由化+轻量化”组合是本榜单最热门的社区变体。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,795 | 1,856,283 | 基于 Qwen3.8 的复杂命名 GGUF 量化版，融合了多种特性。近 190 万下载量证明社区对复杂工程化微调和格式转换的高参与度。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 490 | 296,253 | Qwen 图像 Turbo 版的去审查 GGUF 格式。近 30 万下载量显示本地运行去审查图像模型的稳定需求。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 662 | 78,283 | DeepSeek V4.1 Flash 的 FP8 量化且去审查版本。展示了大模型在保持低精度（FP8）的同时进行安全限制移除的技术路径。 |
| [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF) | LiquidAI | 168 | 45,676 | LFM2.5 模型的官方 GGUF 量化版。便于在 llama.cpp 等轻量推理框架上部署，提升了模型的易用性。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 1,730 | 75,253 | 基于 Gemma4 Unified 架构的“人性化”文本生成模型。旨在让 AI 输出更接近人类自然表达，反映了消除“AI 味”的需求。 |
| [nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 365 | 148,660 | 集成了多种前沿技术标签（如 EfficientThinking）的 Qwen3.8 微调版。体现了社区通过混合不同技术路径来提升模型特定能力的实验精神。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 203 | 39 | Flux 3 的 ComfyUI 适配单文件版。专为工作流自动化设计，降低了对复杂环境依赖的要求。 |
| [speridlabs/iris-3b](https://huggingface.co/speridlabs/iris-3b) | speridlabs | 285 | 1,257 | 3B 参数量的像素空间扩散模型。小参数量意味着其更适合作为研究型模型或嵌入到更大系统中作为子模块。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 422 | 16,731 | Liquid AI 的多模态视觉语言模型（VLM）。小体量但具备视觉理解能力，适合边缘侧的多模态应用部署。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,180 | 19,314 | Cloudflare 基于 Qwen3.5 架构的多模态模型。云厂商介入模型训练，可能暗示其在边缘计算或特定云服务场景下的应用优化。 |
| [meta-models/Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 234 | 402 | Meta 推出的超大规模 MoE 模型（816B 参数）。虽然当前下载量较低，但其参数量级代表了开源模型在规模上限上的探索。 |
| [black-forest-labs/flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 215 | 3,241 | Flux 3 系列的基础图像编辑与生成模型。作为 Black Forest Labs 的迭代产品，它在图像编辑精度上保持了竞争力。 |

*(注：Qwen-Image-2.1-Turbo 归类于多模态与生成，因其主要任务为 text-to-image)*

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 875 | 15,315 | Qwen 快速图像生成模型，支持生成与编辑。Turbo 后缀暗示其针对速度进行了优化，适合实时图像应用。 |

## 生态信号

本期榜单显示 **Qwen** 家族处于绝对风口，不仅旗舰版下载量破 700 万，其 Flash 变体也占据核心位置。开源权重趋势明显，尤其是 **DeepSeek** 和 **Meta** 的大模型均在榜。值得注意的量化活动集中在 **GGUF** 格式，大量社区成员致力于将热门模型转化为低比特（如 2-bit、FP8）及去审查版本，以适配本地硬件。这表明“本地化+自由化”已成为 2026 年模型生态的重要驱动力，社区不仅仅消费模型，更在深度改造模型以符合特定部署场景。

## 值得探索

1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成领域的强力竞争者，下载量近 190 万，适合探索最新视频扩散架构及 ComfyUI 工作流集成。
2.  **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)**：兼顾性能与速度的多模态模型，下载量超 220 万，是研究低延迟多模态交互的绝佳基准。
3.  **[google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)**：作为 Google 最新嵌入模型，适合构建高精度 RAG 系统，值得对比测试其在特定领域检索任务中的表现。