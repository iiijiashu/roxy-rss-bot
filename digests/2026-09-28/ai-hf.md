# Hugging Face 热门模型日报 2026-09-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-28 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-09-28)

### 1. 速览
Qwen3.8-27B 以 16,424 点赞和近 670 万下载量领跑榜单，展现出强大的 VLM 吸引力；Lightricks 的 LTX-2.5 在视频生成领域表现强劲，下载量突破 160 万；Ternary-Bonsai-2-27B-gguf 等 2-bit/3-bit 量化模型下载量惊人，显示端侧极致压缩技术受到社区追捧；小米 MiMo V2.6 系列多模态模型占据多个席位，强化中文开源生态地位；DeepSeek V4.1-Flash 保持高热度，持续在轻量级推理能力上树立标杆。

### 2. 热门模型分类

#### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,780 | 45,028 | 29B 总参数/4B 激活的 MoE 架构，兼顾性能与推理效率；因其在对话场景中的流畅表现而受到社区关注。 |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | 80B 总参/A3B 激活的 Foundation 模型，采用 custom_code；代表大厂在超大规模 MoE 基座模型上的最新开源探索。 |
| [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 437 | 8,243 | 基于 Qwen3 ASR 架构的语言模型，用于文本-文本交互；适合中文多轮语音交互场景，因网易有道的品牌背书而受到关注。 |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 207 | 19,757 | 面向意图分类和实体提取的 GLiNER2 架构；因在 NER/Intent 任务中的高精度和通用性，成为 NLP 应用首选轻量级工具。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,810 | 651,078 | 强调极速推理能力的 DeepSeek 旗舰版，支持多模态输入；凭借在低延迟场景下的卓越表现，持续保持高下载量。 |

#### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,487 | 52,804 | 通义万相最新图像生成模型，支持图像编辑与生成；作为 Qwen 官方旗舰视觉模型，质量与可控性显著提升，是 AIGC 社区核心资产。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,424 | 6,727,629 | 27B 参数规模的视觉语言模型，支持多轮对话；以极高的点赞同步刷新榜单，显示其在图像理解与推理上的突破。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,328 | 1,601,089 | 支持图文视频互转的扩散单文件模型；因视频生成质量与推理速度的平衡出色，成为 LTX-Video 系列最受关注的版本。 |
| [Edge0/Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 1,026 | 19,434 | 支持流式识别的自动语音识别模型；其 Infinite 变体在处理长音频和实时场景时表现优异，受到语音应用开发者青睐。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 405 | 22,514 | 基于 Nemotron 3 的语音活动检测与说话人日志模型；用于区分谁在何时说话，在会议系统和语音分析中是关键组成部分。 |
| [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR) | StarDoc-AI | 592 | 27,837 | 基于 Qwen2.5-VL 优化的文档与图表 OCR 模型；以精准的结构化信息提取能力上榜，是医疗、金融等数据密集型场景的实用工具。 |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 341 | 133,151 | 专为快速生成优化的 Qwen-Image 微调版；针对实时性要求高的应用场景进行了 LoRA 调优，平衡了速度、效果与显存占用。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,680 | 11,612 | 9B 规模的视觉语言模型，强调空间推理；以出色的几何理解能力和多模态性能，在科研和教育场景中表现突出。 |
| [inclusionAI/Ming-Image-0.1-Design](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design) | inclusionAI | 301 | 0 | 面向 UI 和平面设计生成的扩散模型；因专注于特定设计领域的图像生成能力而受到关注，适合垂直场景应用。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

*本分类今日无上榜模型*

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,188 | 3,343,748 | 2-bit 三值量化的 27B LLM 模型；以极致低显存需求支持端侧运行，300 万+ 的惊人下载量印证了极致压缩的刚需。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,777 | 1,608,439 | 采用 GSQ 和 RCO 技术的混合精度 GGUF 量化模型；兼顾压缩比与保留精度，是社区实现 Qwen3.8 本地部署的关键版本。 |
| [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 269 | 194,341 | Qwen-Image 2.1 的 GGUF 格式量化版本；降低了图像模型在边缘设备运行的门槛，使其在本地 AI 工作站更易用。 |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 299 | 145,246 | 针对文本编码器模块的 FP8 量化版本；专门优化了提示词理解环节的显存占用，适合追求低内存占用的生成工作流。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,079 | 964,220 | 去除安全限制的 GGUF 变体；因满足特定社区对无约束生成内容的需求，拥有极高的下载量和关注度。 |

### 3. 生态信号
当前生态显示 **Qwen 3.8** 已成为视觉语言多模态领域的绝对核心，围绕其衍生的图像生成、量化与微调版本密集，反映出极强的社区粘性。**极致端侧部署** 是另一大趋势，2-bit/3-bit 三值量化模型下载量数百万级别，表明硬件资源受限是主要痛点。大厂开源权重（DeepSeek、Apple、Yandex）继续占据高点赞区间，而 **NLP 任务专用化**（OCR/ASR）正融入主流 LLM 架构。值得关注的是，**GGUF 量化** 已成为 AIGC 多模态模型（图像/视频）生态的标准交付格式，而非仅限于 LLM。

### 4. 值得探索

*   **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：作为 2-bit 三值化先驱，该模型对于研究极端低比特下的 LLM 性能边界及嵌入式端侧部署具有极高参考价值。
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：在视频生成赛道竞争激烈之际，LTX-2.5 以 160 万下载量证明了其在多模态互转（图/文/视频）领域的实际生产力，是 AIGC 应用的优质备选。
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：以 1.6 万点赞的统治级数据，不仅展示了视觉语言模型的 SOTA 水平，也标志着社区对于“原生多模态”交互范式需求的爆发。