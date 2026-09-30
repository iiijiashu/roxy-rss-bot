# Hugging Face 热门模型日报 2026-09-30

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-30 00:20 UTC

---

# Hugging Face 热门模型日报
**日期：** 2026-09-30

## 1. 今日速览
**Qwen/Qwen3.8-27B** 以 16,565 个赞和超过 700 万次下载高居榜首，确立了其在多模态交互领域的绝对领导地位。图像生成赛道异常火热，围绕 **Qwen-Image-2.1** 出现了大量社区衍生版本（如 LoRA、GGUF 量化版），显示出强大的生态延展性。视频生成方面，**Lightricks/LTX-2.5** 表现强劲，下载量接近 160 万，反映了行业向视频内容生成的快速迁移。此外，**unsloth** 和 **DavidAU** 推出的 Qwen 系列 GGUF 量化模型下载量破百万，表明本地化推理需求依然旺盛。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
*注：多模态 VLM 归入下一分类，此处仅包含纯文本生成、排序或分类模型。*

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,808 | 46,557 | 基于 Xing4.0 架构的 29B 参数模型，支持对话生成。其混合专家结构（A4B）可能旨在平衡性能与推理效率。 |
| [Altworld/Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) | Altworld | 772 | 7,880 | 基于 Qwen3.5 文本架构微调的生成模型，标签显示其侧重于纯文本生成任务。上榜原因可能与其社区关注度及轻量级部署需求有关。 |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 527 | 1,910 | 8B 参数的对比语言模型，专注于文本排序与验证器功能。它代表了非生成式 LLM 在检索增强场景下的专业化应用。 |
| [SupersonicLabs/Julia-1](https://huggingface.co/SupersonicLabs/Julia-1) | SupersonicLabs | 292 | 1,725 | 多语言文本分类决策模型，采用 PyTorch 架构。其“decision-model”标签暗示其在自动化业务流中的实用价值。 |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 241 | 29,199 | GLiNER2.5 系列的变体，支持实体抽取、意图分类和文本分类。近 3 万的下载量显示其在 NLP 细分任务中极高的实用性。 |
| [orcarouter/OrcaSAQ-2-27B](https://huggingface.co/orcarouter/OrcaSAQ-2-27B) | orcarouter | 212 | 2,143 | 基于 Qwen3.5 架构的 27B 模型，标签包含 vllm，表明其针对高性能推理服务进行了优化。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）
*注：包含 VLM、图像/视频生成、语音识别等跨模态任务。*

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,565 | 7,020,239 | 本次榜单的绝对王者，支持图像-文本-图像对话的多模态大模型。超过 700 万的下载量印证了其作为开源多模态基准的主流地位。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,558 | 1,589,098 | 视频生成模型，支持图生视频、文生视频及视频到视频转换。高下载量表明视频生成技术已进入大规模落地阶段。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,894 | 690,388 | DeepSeek 最新的 Flash 版本，支持图像理解与文本生成。以较低延迟处理多模态输入，适合实时交互场景。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,656 | 64,362 | Qwen 官方图像生成基础模型，支持文本到图像及图像编辑。它是众多社区微调模型的基底，生态地位关键。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 4,507 | 0 | 文本分类模型，标签涉及“system-one”和“calibrated-decisions”。极高点赞但下载为 0，推测为早期发布或特定封闭场景模型。 |
| [Edge0/Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 1,515 | 23,674 | 流式语音识别模型，支持文本生成输出。专注于边缘设备或长音频处理，下载量稳步增长。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,947 | 11,836 | 9B 参数多模态模型，强调空间推理能力。适合需要视觉理解与逻辑结合的应用场景。 |
| [XingChen-AGI/TeleOCR](https://huggingface.co/XingChen-AGI/TeleOCR) | XingChen-AGI | 868 | 30,354 | 基于 Qwen2.5-VL 的 OCR 模型，实现图像-文本-图像的理解。高下载量反映了对文档数字化需求的持续热度。 |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 425 | 190,649 | Qwen-Image-2.1 的 LoRA 加速版本，支持图生图。近 20 万的下载量证明了社区对生成速度优化的强烈需求。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 518 | 30,931 | NVIDIA 推出的语音活动检测（Diarization）模型。适用于会议转录等多说话人场景，下载量扎实。 |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 852 | 4,699,089 | ComfyUI 平台适配的 Qwen-Image-2.1 模型。超过 460 万的下载量显示 ComfyUI 是图像生成工作流的核心入口。 |
| [XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) | XiaomiMiMo | 600 | 78,135 | 小米 MiMo 系列的强化学习版本，支持多模态。下载量近 8 万，显示国产厂商在 RL 微调方向上的活跃探索。 |
| [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 469 | 10,482 | 网易有道推出的 ASR 模型，标签包含 r2t2（可能指鲁棒文本到文本/语音转换）。基于 Qwen3 ASR 架构。 |
| [apple/LensVLM-9B](https://huggingface.co/apple/LensVLM-9B) | apple | 265 | 1,956 | Apple 发布的 9B 视觉语言模型。作为大厂首次在此榜单出现，其轻量化策略值得关注。 |
| [inclusionAI/Ming-Image-0.1-Design](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design) | inclusionAI | 347 | 0 | 专注设计领域的图像生成模型。点赞尚可但下载为 0，可能处于内测或特定分发渠道阶段。 |
| [akhilaaa3/Jev-Omni](https://huggingface.co/akhilaaa3/Jev-Omni) | akhilaaa3 | 310 | 923 | 基于 Gemma4 Unified 架构的多模态模型，支持文本分类与图像理解。小众社区模型的代表。 |
| [XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B) | XiaomiMiMo | 570 | 11,131 | 基于 Qwen 9B 蒸馏的 MiMo 模型。展示了通过蒸馏降低参数规模的技术路径。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）
*注：本次榜单中无显著偏向代码、数学或医疗的独立模型，相关能力通常融合在通用 LLM 或多模态模型中，故此类省略。*

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,728 | 6,425,606 | 针对 Qwen3.8-27B 的 GGUF 量化版本。超过 640 万的下载量证明本地化部署 Qwen 系列的主流选择。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,267 | 3,581,027 | 2-bit 三值量化模型，支持 Llama.cpp 运行。超过 350 万的下载量显示极致压缩技术在边缘端的需求。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,279 | 1,726,231 | 基于 unsloth 的复杂微调版本，标签包含“uncensored”和“coder”。170 万下载量反映了对特定场景微调的热衷。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,827 | 1,678,861 | 采用混合精度量化（GSQ-RCO）的 Qwen 模型。近 170 万的下载量显示学术界在量化算法上的最新进展正被广泛采用。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,435 | 1,152,523 | Qwen-Image-2.1 的无审查（Uncensored）GGUF 版本。超过 115 万下载，显示社区对去限制化图像生成的强烈需求。 |
| [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 299 | 251,937 | Qwen-Image-2.1 的标准 GGUF 量化版。25 万下载量使其成为本地跑图的最佳入门选择。 |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 322 | 168,249 | 专门量化 Qwen-Image 文本编码器的 FP8 GGUF 版本。16 万下载量表明组件级量化也是社区热点。 |

## 3. 生态信号
**Qwen** 家族是目前开源权重领域最强的引擎，不仅其官方模型（Qwen3.8-27B）占据多模态榜首，更衍生出庞大的量化（unsloth, prism-ml）和微调（Viggle, abenzerps）生态，显示出极强的社区凝聚力。**Lightricks** 和 **DeepSeek** 的进入表明视频生成和高效推理成为新的竞争高地。在量化活动方面，GGUF 格式已成事实标准，不仅服务于 LLM，已大规模渗透到图像生成领域（如 abenzerps 和 pottokao 的作品），表明本地端侧算力正在成为内容创作的重要基础设施。闭源模型在本期榜单中缺失，进一步印证了开源权重在 Hugging Face 社区的绝对统治力。

## 4. 值得探索
1.  **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为当下最热门的多模态开源模型，它是研究当前 VLM 架构、理解多模态对齐的最佳样本，且配套生态（量化、微调）最完善。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成是下一个技术风口，该模型高下载量且支持多种视频转换模式，适合探索视频工作流集成。
3.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：探索 2-bit 极致量化在 LLM 上对性能的影响，对于边缘设备开发者或研究者来说，这是理解精度损失与速度收益边界的关键模型。