# Hugging Face 热门模型日报 2026-10-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-13 00:20 UTC

---

## 1. 今日速览
Qwen 模型家族占据主导地位，`Qwen3.8` 系列及多个社区微调版本在榜单上形成矩阵式分布。`unsloth` 的 GGUF 量化版本下载量极高，反映出本地部署需求旺盛。除了文本模型，多模态生成（如 `Lightricks` 视频模型）和前沿的 VLM（视觉语言模型）如 `Cloudflare/clef` 也表现强劲，显示生态正从单一文本向全模态扩展。

## 2. 热门模型

### 🧠 语言模型
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,576 | 6,895,303 | 多模态对话基础模型，拥有全榜最高点赞数。其 27B 规模在效率与性能间取得平衡，成为社区微调基石。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,148 | 1,934,542 | 下一代快速响应多模态模型，下载量近 200 万。主打低延迟交互，适合实时应用场景。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 914 | 14,018 | 基于 MoE 架构的推理型模型，支持 vllm 部署。强调逻辑推理能力，是德国 AI 公司的最新开源成果。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 371 | 242,329 | 专为端侧优化的 2-bit 量化模型，支持工具调用。极低的比特数使其适合资源受限设备运行。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 342 | 11,866 | 3B 参数的小型多模态模型，基于 LFM2-VL 架构。旨在轻量级硬件上提供视觉理解能力。 |
| [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF) | Venastine-Research | 705 | 52,788 | 29B 激活量的 MoE 文本生成模型，提供 GGUF 格式。混合架构设计旨在平衡推理成本与模型能力。 |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 390 | 20,310 | 专注土耳其语的轻量级文本转语音（TTS）模型。填补了特定小语种在开源 TTS 领域的空白。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 360 | 18,643 | 端侧语音识别（ASR）模型，基于 Cactus-Needle 架构。优化了本地处理效率，保护用户隐私数据。 |

### 🎨 多模态与生成
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,481 | 1,719,766 | 全能视频生成模型，支持图生视频与文生视频。下载量超 170 万，是短视频创作领域的热门选择。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,261 | 142,375 | 强大的文生图与图像编辑模型，由 Diffusers 社区提供支持。在细节保持和指令遵循上表现优异。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 632 | 6,787 | Qwen 图像模型的快速版，牺牲部分细节换取生成速度。适合对实时性要求较高的交互式图像生成。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,514 | 1,205,646 | 百度推出的大规模 OCR 识别模型，支持复杂文档结构化。下载量突破 120 万，显示工业界对文档 AI 的巨大需求。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,155 | 2,054,071 | 第三代 Segment Anything 模型，专注于视频掩码生成。下载量超 200 万，是视觉感知和分割任务的标准件。 |
| [speridlabs/iris-3b](https://huggingface.co/speridlabs/iris-3b) | speridlabs | 196 | 706 | 像素空间扩散模型，支持文本到图像生成。虽然下载量低，但其在特定扩散架构上的实验性质值得关注。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,092 | 15,064 | 基于 Qwen3.5 的多模态模型，擅长图像文本交互。作为云服务商发布，侧重边缘计算场景的集成。 |
| [Cloudflare/clef-flash](https://huggingface.co/Cloudflare/clef-flash) | Cloudflare | 785 | 23,285 | clef 的快速响应版本，优化了推理延迟。适合需要实时视觉反馈的用户端应用。 |

### 🔧 专用模型
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,935 | 115,763 | Google 发布的新一代嵌入模型，用于特征提取。作为榜首，其强大的语义理解能力使其成为 RAG 系统首选。 |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 283 | 71,914 | Google 嵌入模型的本地量化版，支持多模态嵌入。7 万+ 下载证明了在私有服务器上部署嵌入服务的趋势。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,535 | 45,062 | 专注“系统一”快速校准决策的文本分类模型。高点赞数表明其在低延迟分类场景下具有独特价值。 |

### 📦 微调与量化
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,058 | 6,597,425 | 社区最活跃的 Qwen3.8 量化版本，下载量近 660 万。Unsloth 的高效量化流程是本地部署 Qwen 的首选路径。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 829 | 4,413,142 | 采用 GSQ 和 RCO 技术的先进量化模型，下载量超 440 万。展示了混合精度量化在速度上的极致优化。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,658 | 4,615,462 | 三元化（2-bit）大模型，极度精简内存占用。下载量 460 万+，适合树莓派等超轻量设备运行 27B 模型。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,694 | 2,025,498 | 深度社区微调的“Uncensored”版本，移除部分内容安全限制。下载量超 200 万，反映了对无审查模型的高需求。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,096 | 2,188,658 | 图像模型的无审查量化版，支持 ComfyUI 和 GGUF。下载量超 210 万，说明生成类模型的本地化与去限制化并行。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 373 | 161,715 | Turbo 版本的无审查 GGUF 格式，便于本地快速生成。16 万下载量显示社区对即时、自由图像生成的偏好。 |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 811 | 629,886 | Flash-Next 的快速无审查版本，支持 LoRA 消融。60 万+ 下载量，结合速度与自由度，是极客群体的热门选择。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 1,320 | 46,070 | 基于 Gemma4 架构的“人性化”文本生成模型。旨在模仿人类写作风格，去除 AI 痕迹，适合内容创作场景。 |
| [nerkyor/Qwen3.8-27B-Coder390-EfficientThink...](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 283 | 75,302 | 融合多种训练策略（SFT/RLOO）的深度微调模型。名称冗长反映了复杂的混合优化过程，侧重新颖的推理效率。 |

## 3. 生态信号
模型生态呈现明显的“Qwen 中心化”趋势，不仅官方模型下载量巨大，社区围绕其进行的去审查（Uncensored）及轻量化（GGUF）微调活动也极其活跃。开源权重模型的本地部署需求持续高涨，尤其是 2-bit 和三元化技术使得 27B 级模型能在端侧运行。同时，生成模型正从单纯的“文生图”向“视频生成”和“无审查”方向演进，反映出用户在创意自由度与实用效率上的双重追求。

## 4. 值得探索
1.  **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**：作为下载量最高且社区支持最广的量化版本，它是体验 Qwen3.8 能力在本地硬件上的最佳入口，适合开发者调试和部署。
2.  **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)**：文档处理是企业级 AI 的核心痛点。该模型结合了百度在中文理解上的优势，对于构建自动化数据处理流水线的团队具有极高的研究价值。
3.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成是目前多模态领域最前沿的方向。LTX-2.5 支持多种输入模态且下载量破百万，是探索低成本、高质量视频内容生成的必测模型。