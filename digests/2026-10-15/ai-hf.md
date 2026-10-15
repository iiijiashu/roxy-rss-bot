# Hugging Face 热门模型日报 2026-10-15

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-15 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-15)

## 1. 今日速览
本次榜单由 **Qwen3.8** 系列主导，其原生模型、Flash 版本及大量社区微调/GGUF 量化变体占据了显著席位，显示出极高的生态活跃度。**Lightricks/LTX-2.5** 和 **facebook/sam3** 在视频生成与分割领域表现抢眼，下载量均突破百万。值得注意的是，**Uncensored** 和 **High-performance GGUF** 版本在社区中极受欢迎，反映了用户对本地部署及无过滤能力的强烈需求。**Baidu** 发布的 **Unlimited-OCR** 也跻身前列，展示了中文大厂在专用视觉模型上的持续投入。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,698 | 7,221,327 | Qwen3.8 系列的主力 27B 稠密模型，支持图文理解。极高的下载量表明其是当前最热门的开源基座模型之一。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,208 | 2,185,644 | Qwen4 实验系列中的高速推理模型，主打低延迟对话。下载量超过 218 万，显示了社区对高效能模型的巨大需求。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,500 | 1,262,357 | DeepSeek 最新版本的轻量级 Flash 模型，支持图文输入。下载量突破百万，是国产大模型中重要的竞争者。 |
| [openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) | openbmb | 614 | 4,157 | MiniCPM 系列的大型 MoE 视觉语言模型。虽然在下载量上不如头部 LLM，但其 35B 参数规模吸引了特定领域的关注。 |
| [autotrust/JEV-35B](https://huggingface.co/autotrust/JEV-35B) | autotrust | 718 | 27,970 | 基于 Qwen3.5 MoE 架构的分类/系统一模型。标签显示其侧重于“system-one”快速反应能力，下载量近 3 万。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,601 | 47,754 | 一个专注于校准决策（calibrated-decisions）的文本分类模型。高点赞数反映了其在可靠性评估方面的独特价值。 |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 303 | 4,067 | Liquid AI 推出的 MoE 语言模型，属于 LFM2 系列。标签包含“liquid”，可能指其动态计算特性。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 458 | 311,969 | 支持工具调用（tool-calling）的 27B 模型，提供 2-bit 量化版本。超过 31 万的下载量证明了边缘端智能的需求。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,794 | 1,823,507 | 强大的视频生成模型，支持图生视频、文生视频等。近 182 万的下载量使其成为视频生成领域的标杆。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,333 | 2,019,842 | Meta 发布的第三代 Segment Anything 模型，支持视频分割。超过 200 万的下载量确立了其在分割任务上的统治地位。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 772 | 12,704 | Qwen 团队最新的图像生成与编辑模型，基于 Diffusers。虽然下载量目前较低，但官方 Turbo 标签暗示其高速度特性。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 312 | 839 | 专注于多角色配音和语音生成的 TTS 模型。标签显示其支持“multi-speaker”，适合有声书或动画场景。 |
| [openbmb/MiniCPM-V-4.7-1B](https://huggingface.co/openbmb/MiniCPM-V-4.7-1B) | openbmb | 330 | 2,543 | MiniCPM 系列的小参数视觉语言模型。1B 的参数量使其适合在移动端部署进行视觉理解。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,637 | 1,154,213 | 百度发布的 OCR 专用模型，功能类似视觉特征提取。超过 115 万的下载量显示了实际文档处理场景的巨大需求。 |
| [speridlabs/iris-3b](https://huggingface.co/speridlabs/iris-3b) | speridlabs | 257 | 1,132 | 一个 3B 参数的像素空间扩散图像生成模型。标签“pixel-space”表明其不同于常见的潜空间扩散模型。 |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 447 | 16,890 | 针对 MiniMax H3 视频模型的 LoRA 适配器，支持首尾帧生成（flf2v）。社区用户正在通过 LoRA 丰富官方视频模型的功能。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 395 | 23,589 | 专注于设备端（on-device）的语音识别模型。标签“cactus-needle”暗示其轻量化架构，适合边缘部署。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,261 | 135,175 | Google 官方发布的嵌入模型，用于特征提取。作为 Gemini 系列衍生的嵌入模型，其在 RAG 应用中的地位显著。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 396 | 14,854 | Liquid AI 的视觉语言模型（VL），属于 LFM2_VL 系列。小参数设计使其适合特定视觉理解任务。 |
| [vllm-sr/d3](https://huggingface.co/vllm-sr/d3) | vllm-sr | 160 | 1,805 | 基于 Qwen3.5 架构的零样本分类模型。虽然下载量低，但代表了特定垂直领域的分类需求。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,306 | 2,315,771 | Qwen 图像模型的“无审查”量化版本。惊人的 230 万下载量和 4300+ 点赞，反映了社区对解除内容限制模型的极高热情。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,768 | 1,900,731 | 复杂的 Qwen3.8 混合微调 GGUF 版本，整合了多种技术标签。近 190 万的下载量显示高阶社区用户对模型优化的深度参与。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 642 | 78,156 | DeepSeek Flash 模型的无审查 FP8 量化版本。标签“dealign”暗示去对齐化，下载量近 8 万，是本地部署的热门选择。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 873 | 4,894,108 | 采用 GSQ 和 RCO 混合精度技术的 GGUF 量化版本。高达 489 万的下载量，表明极致的量化技术正在被大规模采用。 |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 861 | 692,812 | Qwen Flash 系列的无审查 GGUF 版本。近 70 万的下载量显示“Uncensored”已成为量化模型的重要卖点。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 451 | 258,320 | 支持 ComfyUI 的 Qwen 图像无审查 GGUF 版本。超过 25 万的下载量，主要面向使用 ComfyUI 工作流的创作者。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 1,632 | 65,616 | 基于 Gemma4 Unified 的“Humanizer”模型，旨在生成更像人类的文章。高点赞和下载量反映了去 AI 化写作的趋势。 |
| [nerkyor/Qwen3.8-27B-Coder390-EfficientThink...](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 331 | 114,351 | 名称极长的 Qwen3.8 强化学习与 SFT 混合微调版本。近 11 万下载量显示社区在尝试融合多种训练策略以提升推理效率。 |
| [autotrust/JEV-35B-NVFP4](https://huggingface.co/autotrust/JEV-35B-NVFP4) | autotrust | 306 | 33,343 | JEV 35B 模型的 NVFP4 量化版本，针对 NVIDIA 硬件优化。近 3.3 万下载量表明专用量化格式正获得关注。 |

## 3. 生态信号
当前生态呈现**Qwen 家族全面统治**的局面，不仅官方模型下载量领先，社区更衍生出大量“Uncensored”（无审查）和极致量化（如 GSQ/RCO、NVFP4）版本，显示**开源权重 + 社区再加工**是主流趋势。视频生成（LTX-2.5）和分割（SAM3）领域由大厂主导，下载量数百万级。同时，“去 AI 化”写作工具（Humanizer）和特定垂直领域的 OCR 模型（Baidu）也在细分赛道占据头部位置，反映出市场正从通用大模型转向**场景化与本地化部署**的深度融合。

## 4. 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：作为视频生成领域的下载量冠军（182万+），它是研究当前开源视频扩散模型最佳实践的首选对象，特别是在单文件扩散架构上的突破。
2.  **[abenzers/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)**：拥有榜单最高的下载量（230万+）和极高的点赞数，是探索社区如何微调并量化大型图像生成模型以满足特定合规或创意需求的典型案例。
3.  **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)**：高达 489 万的下载量使其成为最活跃的量化模型，适合研究混合精度量化技术（GSQ/RCO）在保持性能的同时大幅降低推理门槛的效果。