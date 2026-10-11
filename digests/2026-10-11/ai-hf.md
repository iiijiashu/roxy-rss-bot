# Hugging Face 热门模型日报 2026-10-11

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-11 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-11)

## 1.  今日速览

Qwen3.8 系列（27B 及 Flash-Next）以压倒性的下载量和点赞数主导榜单，其中基座模型 Qwen3.8-27B 点赞数高达 17,424，显示其在多模态对话领域的强劲势头。图像生成领域竞争激烈，Lightricks 的 LTX-2.5 视频模型与多个版本 Qwen-Image-2.1（含 Uncensored 版）表现优异，下载量均突破百万级。量化与本地部署需求旺盛，unsloth 和 ISTA-DASLab 提供的 GSQ/RCO 量化 GGUF 版本占据多个席位，反映出社区对低比特高效推理的强烈偏好。此外，DeepSeek-V4.1-Flash 和 Cloudflare 的 clef 系列多模态模型进入前列，显示大厂在轻量级多模态模型上的布局加速。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,424 | 6,768,654 | 榜单点赞与下载双料冠军，具备多模态对话能力。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,079 | 1,798,393 | 主打快速响应的多模态变体，下载量近 180 万。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,325 | 1,355,278 | DeepSeek 最新的轻量多模态模型，兼顾文本生成与图像理解。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 860 | 10,496 | 支持 vLLM 推理的 MoE 架构模型，侧重推理能力。 |
| [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF) | Venastine-Research | 679 | 45,199 | 采用稀疏激活（A4B）设计的 GGUF 格式模型，适合本地部署。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 264 | 9,088 | 3B 参数量的多模态小模型，支持图像到文本转换。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,172 | 1,720,888 | 视频生成领域明星模型，支持图生视频及文生视频。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,462 | 42,936 | 基于 System-One 架构的文本分类模型，强调校准决策。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 1,987 | 13,579 | 基于 Qwen3.5 基底的边缘计算多模态模型。 |
| [Cloudflare/clef-flash](https://huggingface.co/Cloudflare/clef-flash) | Cloudflare | 731 | 20,670 | CLEF 的快速版变体，优化了推理速度。 |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 336 | 15,710 | 专注于土耳其语的高保真文本转语音模型。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 306 | 12,816 | 面向端侧设备的语音识别模型，强调低延迟。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 444 | 2,138 | 快速图像生成版本，支持 Diffusers 和图像编辑。 |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,354 | 248,475 | 基于 Qwen-Image-2.1 的人脸交换 LoRA，下载量超 24 万。 |
| [FrancisRing/Prism](https://huggingface.co/FrancisRing/Prism) | FrancisRing | 145 | 0 | 联合视频音频生成的新模型，目前处于早期探索阶段。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

*本分类下无直接匹配的模型，嵌入模型归入微调与量化或独立展示。*

*(注：根据输入数据，嵌入模型 `embeddinggemma-2` 及其 GGUF 版本更偏向工具化部署，故归入微调与量化章节)*

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,002 | 6,449,020 | Qwen3.8-27B 的官方推荐量化版本，下载量巨大。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,871 | 2,096,562 | 去审查化的图像生成模型，在 ComfyUI 社区极受欢迎。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,191 | 128,839 | 官方基础图像生成模型，常被用作微调基底。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,593 | 4,457,576 | 采用三元量化技术，主打 2-bit 极致压缩。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 2,116 | 1,484,655 | 使用 GSQ/RCO 混合精度量化技术的社区精品版。 |
| [DavidAU/Qwen3.8-27B-TURBO...NEO-CODER-MAX...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,632 | 1,960,274 | 复杂的微调组合模型，整合了多种优化策略。 |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,506 | 45,605 | Google 推出的第二代嵌入模型，用于特征提取。 |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 727 | 520,450 | Flash-Next 的去审查化 GGUF 版本，下载量超 50 万。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 951 | 33,664 | 旨在生成更自然、人性化文本的多模态模型。 |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 227 | 50,551 | EmbeddingGemma-2 的 GGUF 量化版，方便本地运行。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 266 | 59,191 | 2-bit 量化模型，支持工具调用与函数调用。 |
| [nerkyor/Qwen3.8-27B-Coder390...](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 190 | 42,336 | 命名极其复杂的多代融合微调模型，侧重高效思考。 |
| [SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF) | SC117 | 186 | 765,376 | 结合去审查化与混合精度量化的实验性版本。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 201 | 7,314 | 快速图像生成模型的去审查化 GGUF 版本。 |
| [Qwen/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 767 | 3,922,328 | *注：此为链接指向 ISTA-DASLab，但名称含 Qwen。* 高性能量化版本，下载量近 400 万。 |

## 3. 生态信号

Qwen3.8 系列无疑是当前的生态霸主，不仅基座模型表现强劲，其衍生出的 Flash-Next 变体及大量社区量化版本（GGUF）占据了榜单半壁江山，反映出开源权重生态向“轻量化、本地化”深度转移。大厂方面，DeepSeek、Google 和 Cloudflare 均在布局多模态专用模型，其中 Google 的嵌入模型和 Cloudflare 的边缘端模型显示出对垂直场景的重视。值得注意的是，“Uncensored”（去审查化）和 2-bit/三元量化模型的高下载量表明，用户群体正强烈追求无限制输出与极端资源优化下的推理能力，量化技术已成为模型分发的核心标准。

## 4. 值得探索

*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为榜单顶流，它是研究当前 SOTA 多模态对话能力的首选基座，其庞大的社区生态（unsloth 等）意味着极佳的可扩展性。
*   **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：对于关注超低比特推理的研究者，该模型展示了三元量化在保持 27B 模型性能方面的潜力，适合研究模型压缩极限。
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成领域的高关注度模型，适合探索长视频生成及图生视频技术的最新进展。