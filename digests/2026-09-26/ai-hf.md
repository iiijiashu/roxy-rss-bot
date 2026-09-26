# Hugging Face 热门模型日报 2026-09-26

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-26 00:20 UTC

---

# Hugging Face 热门模型日报

**日期**：2026-09-26

## 1. 今日速览

本期榜单中，阿里通义千问系列占据绝对主导，Qwen3.8-27B 以超过 1.6 万点赞和 650 万下载量登顶下载榜首，显示出其在多模态文本生成领域的强劲势头。视频生成模型 Lightricks/LTX-2.5 表现亮眼，下载量突破 150 万，表明视频生成正成为新的流量入口。社区量化生态极为活跃，Unsloth 提供的 Qwen 系列 GGUF 版本下载量均破百万，极大降低了本地部署门槛。此外，小米 MiMo 系列和网易有道 Confucius 等国产新面孔出现，丰富了多模态与语音识别领域的选择。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,685 | 42,950 | 一款 29B 规模的 MoE 架构语言模型。凭借高关注度上榜，支持文本生成与对话任务。 |
| [Altworld/Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) | Altworld | 676 | 4,978 | 基于 Qwen3.5 架构的语言模型。作为衍生项目上榜，主要面向通用文本生成场景。 |
| [XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) | XiaomiMiMo | 499 | 42,062 | 小米推出的多模态强化学习模型。结合文本生成与多模态能力，下载量表现稳定。 |
| [XiaomiMiMo/MiMo-V2.6-Flash-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL) | XiaomiMiMo | 462 | 20,473 | 小米 MiMo 系列的轻量强化学习版本。适合对延迟敏感的推理场景，具备多模态特性。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,280 | 6,579,319 | 通义千问旗舰级多模态模型，本期点赞与下载双料冠军。支持图像文本交互，生态影响极大。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,701 | 846,820 | 千问系列下一代快速推理模型，标签显示为 qwen4_exp 实验版。兼具高热度与高下载量，适合低延迟对话。 |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 333 | 2,911 | Yandex 推出的 80B 基础模型，激活参数仅 3B。属于典型的稀疏 MoE 架构，侧重基座能力研究。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 3,684 | 0 | 文本分类模型，主打“校准决策”与 System-One 理念。虽无下载量，但凭借高点赞进入热榜。 |
| [convaiinnovations/laya-multilingual](https://huggingface.co/convaiinnovations/laya-multilingual) | convaiinnovations | 276 | 0 | Lay a 模型的多语言版本，基于 MMBERT 架构。扩展了多语言文本分类能力，点赞稳步增长。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,320 | 42,469 | 千问最新图像生成基础模型，支持生成与编辑。是本期多个社区量化版本的源头，生态核心。 |
| [XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B) | XiaomiMiMo | 477 | 6,652 | 基于 Qwen3.5 蒸馏的多模态小模型。在 9B 规模下实现图像文本交互，适合端侧部署。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,049 | 9,498 | 空间推理导向的多模态视觉语言模型。以“空间推理”为标签亮点，关注度高于下载量。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,752 | 621,396 | 深度求索的多模态快速推理模型，下载量超 60 万。兼具图像文本理解与快速响应能力。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,105 | 1,598,133 | 支持图生视频、文生视频等全流程的视频扩散模型。下载量破 150 万，是视频生成领域现象级产品。 |
| [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 410 | 5,827 | 网易有道基于 Qwen3 ASR 架构的语音识别模型。侧重 R2T2 场景，语音处理领域的新锐。 |
| [inclusionAI/Ming-Image-0.1-Design](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design) | inclusionAI | 239 | 0 | 面向设计领域的文本到图像生成模型。虽然暂无下载量，但体现了生成模型向垂直领域细分的趋势。 |
| [Edge0/Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 552 | 2,853 | 支持流式处理的无限音频识别模型。针对长音频场景优化，点赞数较高，显示其实用价值。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 341 | 11,459 | NVIDIA 音频帧分类模型，专门用于语音活动检测。属于音频处理的专用工具型模型。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

*本期榜单未出现明确标注为代码、数学、医疗或嵌入类的专用模型，故省略此分类表格。*
*(注：部分通用模型可能隐含代码能力，但未在标签中明确突出，故不强行归类)*

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 1,785 | 715,906 | 千问图像模型的无审查 GGUF 量化版，下载量超 71 万。满足了本地化及无限制生成的特定需求。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,089 | 3,109,078 | 极致的 2-bit 三值量化模型，下载量超 300 万。展示了 llama.cpp 生态对低精度模型的强烈需求。 |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 734 | 3,266,380 | ComfyUI 官方适配的单文件扩散模型，下载量超 320 万。极大简化了图像模型在工作流引擎中的集成。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,701 | 1,510,016 | 采用混合精度量化技术的 Qwen 大模型 GGUF 版本。下载量破 150 万，平衡了精度与速度。 |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,624 | 6,938,321 | Unsloth 制作的旗舰级量化模型，下载量近 700 万。是 Qwen3.8 系列本地化部署的主力版本。 |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 262 | 126,393 | 图像模型文本编码器的 FP8 量化版，适配 ComfyUI。下载量超 12 万，优化了生成流程中的文本理解环节。 |
| [DavidAU/Qwen3.8-27B-TURBO-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,179 | 1,546,398 | 社区深度定制的“Uncensored”混合量化模型，下载量超 150 万。名称显示其针对代码与无审查场景做了增强。 |
| [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 224 | 130,465 | 千问图像模型的通用 GGUF 量化版，下载量超 13 万。由知名量化团队制作，兼容性好。 |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 226 | 47,873 | 基于 LoRA 技术的图像编辑与生成微调模型。下载量近 5 万，体现了“基础模型+LoRA”的流行玩法。 |
| [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR) | StarDoc-AI | 315 | 32,056 | 基于 Qwen2.5-VL 架构的 OCR 专用微调模型。将视觉模型转化为文字识别工具，下载量 3 万+。 |
| [AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev) | AlexWortega | 577 | 0 | 基于 Qwen3.5 的 NLI 交叉编码器模型。虽然无下载量，但在文本分类社区获得较高点赞。 |
| [akhilaaa3/Jev-Omni](https://huggingface.co/akhilaaa3/Jev-Omni) | akhilaaa3 | 230 | 0 | 基于 Gemma4 统一架构的多任务微调模型。覆盖分类与图文任务，处于早期推广阶段。 |

## 3. 生态信号

**模型家族势头**：Qwen 生态是本周绝对核心，不仅官方旗舰模型（3.8 系列）占据下载榜首，还催生了包括 Unsloth、Comfy-Org、Viggle 在内的大量社区量化与微调分支，形成了“一超多强”的引力场。Lightricks 在视频生成领域也展现出极强的统治力。

**开源趋势**：榜单清一色为开源权重模型，且社区量化版本（GGUF/AWQ）的下载量普遍远超原版 Safetensors 模型，表明用户正加速向边缘计算与本地私有化部署迁移。

**量化活动**：Unsloth 成为量化领域的标杆，其提供的 Qwen 系列 GGUF 版本下载量百万级。同时，出现了 2-bit 三值量化等极限压缩技术，显示“小模型大能力”的探索进入深水区。

## 4. 值得探索

1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成下载量突破 150 万，是目前多模态生成中商业化落地潜力最大的模型之一，值得深入研究其在图生视频（i2v）和文生视频（t2v）中的工作流集成能力。
2.  **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)**：标签显示为 `qwen4_exp`，暗示这是千问下一代架构的实验版本。对于关注 LLM 前沿架构演进的用户，该模型的推理效率与多模态对齐能力极具研究价值。
3.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：该模型将 27B 参数压缩至 2-bit 三值状态，下载量超 300 万。它是探索模型极致压缩、极限硬件部署以及“量化误差容忍度”边界的最典型案例。