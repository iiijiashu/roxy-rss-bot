# Hugging Face 热门模型日报 2026-10-05

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-05 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-05)

## 1. 今日速览

本周生态显示 **Qwen 3.5 系列** 具有极强的影响力，不仅原生的 `Qwen3.8-27B` 和 `Flash-Next` 位居下载量前列，更衍生出大量高质量的第三方量化与微调版本。视频生成领域竞争激烈，`LTX-2.5` 和 `MiniMax-H3` 相关的 LoRA 权重占据了大量热度。值得注意的是，模型社区呈现出明显的两极分化：既有针对云端部署的专业多模态基座，也有针对本地硬件优化（如 2-bit 量化、GGUF）的高性能社区版模型。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,939 | 6,821,761 | 本周下载量最高的多模态基座模型。其庞大的下载基数确立了 27B 规格在混合精度部署中的核心地位。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,896 | 1,480,842 | 针对高速推理优化的 Qwen 衍生版本。高下载量表明其对低延迟场景的优化非常成功。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,162 | 3,752 | 专注于“校准决策”的文本分类模型。虽下载量不高，但高点赞率反映了专业领域用户对精准推理的强烈需求。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,093 | 798,422 | DeepSeek 的最新旗舰级多模态快线模型。其 80 万+的下载量展示了该系列在开发者生态中的持续吸引力。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 389 | 1,135 | 基于 MoE 架构的推理型语言模型。作为欧洲厂商发布的代表，其在 vLLM 支持下的部署表现备受关注。 |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 366 | 53,625 | 强大的实体提取与意图分类工具。其下载量远超点赞数，显示其作为 NLP 管道核心组件的高实用价值。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,309 | 1,626,951 | 本周视频生成领域的领跑者。支持多种视频转换任务，160 万+下载量证明了其在短视频制作工具中的普及度。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,947 | 90,003 | 融合了图像生成与编辑能力。高点赞数表明其在 Diffusers 框架下的易用性受到了创作社区的广泛好评。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 672 | 53,014 | 针对语音活动检测优化的专项模型。体现了大厂在将音频处理与多模态对话进行深度融合的趋势。 |
| [FermionResearch/Phonon-2](https://huggingface.co/FermionResearch/Phonon-2) | FermionResearch | 201 | 2,635 | 专为 Apple Silicon 优化的 ASR 模型。其在 M-series 芯片上的部署方案吸引了大量本地化语音开发者。 |
| [PSRben/VisionHOPE](https://huggingface.co/PSRben/VisionHOPE) | PSRben | 402 | 1,516 | 一种新型图像分类模型。基于学术界的最新成果，展示了视觉大模型在垂直分类任务上的高精度潜力。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| *本周暂无纯分类下的专用模型，代码能力已融合至语言模型中。* | | | | |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,136 | 1,553,744 | 本周下载量惊人的“去审查”图像模型。极低的量化门槛使其成为本地部署的首选方案。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,416 | 4,045,810 | 极具前瞻性的 2-bit 三元数量化。通过突破性的压缩技术，让 27B 模型在消费级显卡上实现流畅运行。 |
| [DavidAU/Qwen3.8-27B-TURBO-...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,421 | 2,164,143 | 社区通过 MTP 技术深度合成的超高性能版本。展示了 LLM 领域从单纯量化向“算法+量化”深度优化的演进。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 555 | 1,886,975 | 采用 RCO 混合精度技术的学术量化版。证明了通过复杂位宽映射可进一步提升模型推理精度的极限。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 2,859 | 12,638 | 强调空间推理能力的多模态微调模型。高点赞反映出开发者对小型化专用视觉模型的强烈需求。 |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,179 | 203,086 | 基于 Qwen 图像底座的特效 LoRA。20 万+下载量显示面部编辑是 2026 年图像微调中最热门的垂类。 |

## 3. 生态信号

本周模型生态呈现出显著的**“基座轻量化、应用极客化”**趋势。Qwen 3.5 家族不仅是下载量的绝对统治者，更催生了包括 2-bit 三元数量化（prism-ml）和 MTP 深度合成（DavidAU）在内的复杂社区衍生链，反映了硬件受限环境下的极限探索。与此同时，视频生成赛道（LTX-2.5、MiniMax）从单纯的文生视频向多模态混合控制转型。值得注意的技术信号是 GSQ/RCO 等高级量化算法开始普及，开发者不再满足于简单的 INT4/INT8 缩放，而是转向更复杂的混合精度策略以在本地端保留大模型的推理能力。

## 4. 值得探索

1.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：
    极具科研价值，该模型证明了 2-bit 三元数量化在 27B 规模下仍具备极高效用，是研究“极致压缩”与 LLM 性能平衡的绝佳样本。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：
    作为本周下载量超 160 万的视频基座，探索其对多帧一致性控制的能力，是理解 2026 年视频 AI 产业应用门槛的关键。
3.  **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)**：
    该模型展示了 RCO（残差校正优化）等学术量化方法在工程层面的落地效果，非常适合研究如何在不增加算力消耗的情况下挽回量化损失。