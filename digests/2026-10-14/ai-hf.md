# Hugging Face 热门模型日报 2026-10-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-14 00:20 UTC

---

**今日速览**
2026年10月14日，Hugging Face 热门模型榜单显示 Qwen3.8-27B 以 17,638 个点赞和 710 万下载量领跑，确立了其在多模态文本交互领域的霸主地位。Lightricks 发布的 LTX-2.5 视频生成模型获得 7,644 个点赞，显示多模态生成向视频领域强势扩张。Qwen 图像系列（Qwen-Image-2.1-Turbo 及其社区去审查版本）占据图像生成榜前列，反映出社区对高效、无限制生成工具的高需求。同时，Facebook SAM3 和 DeepSeek V4.1-Flash 的高下载量表明分割与推理模型持续获得企业级关注。

**热门模型**

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,638 | 7,119,569 | 该模型支持图像文本到文本交互，是当下最热门的开源 LLM 之一。其极高的下载量反映了开发者对高质量多模态推理工具的强烈需求。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,143 | 17,173 | 基于 Qwen3.5 架构的混合专家模型，擅长图像文本到文本任务。Cloudflare 的推出表明云服务提供商正在深入基础模型层。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,472 | 1,272,612 | 定位为快速推理的文本生成模型，支持多模态输入。其“Flash”版本强调响应速度，适合对延迟敏感的生产环境。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 928 | 15,335 | 采用 MoE 架构的推理模型，支持 vLLM 部署。其出现代表了欧洲 AI 实验室在开放权重 MoE 模型上的持续探索。 |
| [Cloudflare/clef-flash](https://huggingface.co/Cloudflare/clef-flash) | Cloudflare | 804 | 24,809 | clef 的高性能变体，针对边缘计算场景优化。下载量高于主版本表明边缘部署需求正在快速增长。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,644 | 1,724,548 | 强大的图像到视频生成模型，支持多模态视频转换。高点赞数表明其在创意视频制作领域的影响力。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 709 | 9,665 | 面向快速生成与编辑的图像模型，采用 Diffusers 架构。其“Turbo”命名暗示了推理速度的显著提升。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,283 | 147,995 | Qwen 图像系列的主力模型，支持生成与编辑双任务。相比 Turbo 版本，其更高的点赞数显示标准版仍具广泛用途。 |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 414 | 15,540 | 基于 MiniMax-H3 的视频生成 LoRA，支持首尾帧视频生成。体现了社区对特定视频生成风格的高效微调需求。 |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 403 | 22,641 | 专注于土耳其语文本到语音合成的 TTS 模型。其上榜说明非英语语音 AI 正在细分市场中获得关注。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 382 | 21,005 | 面向设备端部署的自动语音识别模型。其标签显示其优势在于边缘计算与低延迟处理。 |
| [speridlabs/iris-3b](https://huggingface.co/speridlabs/iris-3b) | speridlabs | 233 | 889 | 使用 PyTorch 像素空间扩散的轻量级图像生成模型。尽管数据量较小，但代表了对高效像素空间生成技术的探索。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,250 | 2,037,775 | 支持视频理解的图像分割模型（SAM3）。高下载量显示其在计算机视觉自动化任务中的工业级应用。 |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,102 | 124,930 | Google 发布的多模态嵌入模型，支持特征提取。其热度反映了对文本、图像、音频统一向量化的需求。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,615 | 1,175,446 | 百度推出的文档 OCR 模型，擅长复杂场景文本提取。高下载量说明其在企业级文档数字化中应用广泛。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,573 | 46,160 | 一个专注于校准决策的系统级文本分类模型。高点赞数体现了社区对可解释性与决策逻辑匹配的关注。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,202 | 2,247,929 | 针对 ComfyUI 优化的去审查量化版本，支持 GGUF 格式。极高的下载量说明用户追求无过滤且易部署的本地生成。 |
| [Qwen/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 307 | 83,887 | 融合了多种高级提示与微调策略的 Qwen3.8 深度变体。其超长名称展示了社区对模型组合优化的极致追求。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,740 | 1,940,062 | 针对本地推理优化的去审查 GGUF 版本，集成了多项优化技术。极高的下载量显示其在本地部署社区的强大吸引力。 |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 300 | 81,504 | 针对 GGUF 格式的嵌入模型量化版本。方便用户在 CPU 或边缘设备上运行 Google 的高级嵌入能力。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 380 | 13,190 | 支持图像文本到文本的混合专家架构模型，侧重边缘计算。其小型化设计适合资源受限的设备场景。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 421 | 269,829 | 支持工具调用的 2-bit 极致量化 GGUF 模型。体现了在极低资源环境下对函数调用能力的探索。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 853 | 4,675,423 | 采用混合精度与 RCO 技术的加速 GGUF 版本。其超常的下载量（近 468 万）表明其在性能与效率平衡上非常成功。 |
| [autotrust/JEV-35B](https://huggingface.co/autotrust/JEV-35B) | autotrust | 492 | 17,426 | 基于 Qwen3.5 MoE 的系统级多模态微调模型。其关注“System One”快速思考路径，适合需要快速决策的场景。 |
| [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF) | Venastine-Research | 710 | 58,000 | 激活参数仅 4B 的 29B 模型，采用 MoE 架构的高效 GGUF 版本。展示了稀疏模型在保持性能的同时减少计算量的潜力。 |

**生态信号**
Qwen 模型家族在当前榜单中势头最猛，不仅在核心多模态模型（Qwen3.8-27B）占据下载量榜首，还衍生出大量针对不同量化（GGUF）、去审查、工具调用等细分需求的社区变体，体现了开源权重模型强大的生态延展性。多模态交互（图像文本到文本）已取代纯文本生成成为主流，且模型架构正从稠密向混合专家（MoE）及高效推理（Flash/Turbo）演进。

值得注意的量化与微调活动包括：ComfyUI 生态中针对图像模型的“去审查”微调与 GGUF 量化版本获得极高关注（如 abenzerps 与 AtomicChat 的模型）；同时，混合精度量化（如 GSQ-RCO）和极简位宽（2-bit）工具调用模型成为边缘部署的新焦点。

**值得探索**
1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** — 这是视频生成领域的标杆开源模型，支持图像、视频到视频的转换。若团队有视频内容生成需求，它是目前性能与易用性平衡的绝佳起点。
2. **[google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)** — 支持多模态（文本、图像、音频）的统一嵌入模型，能极大简化 RAG 系统架构。结合 [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) 可在本地低成本部署高级检索功能。
3. **[DavidAU/Qwen3.8-27B-TURBO-Fable...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)** — 近 194 万下载量证明了其在本地推理社区的巨大影响力。对于追求极致本地部署且需要去审查、代码强化的用户，这是值得研究的社区工程化范式。