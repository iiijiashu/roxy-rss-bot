# Hugging Face 热门模型日报 2026-10-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-09 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-09)

## 今日速览
本期榜单展示了开源多模态与大语言模型的持续火热，**Qwen 系列**以超过 600 万的下载量占据绝对主导地位，尤其在本地量化部署（GGUF）方面表现强劲。视频生成领域的 **Lightricks/LTX-2.5** 成为现象级模型，下载量突破 168 万。同时，**DeepSeek-V4.1-Flash** 和 **Aleph-Alpha** 的新架构也展示了推理效率的新高度。值得注意的是，围绕主流模型的“无审查版”（Uncensored）与社区微调版本（如 DavidAU 和 abenzerps 的作品）占据了半壁江山，反映出社区对模型可控性的强烈需求。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
主要包含通用对话、逻辑推理及文本生成模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,280 | 6,841,660 | 阿里最新旗舰级多模态语言模型，本期下载量之王。其极高的性能与开放权重使其成为社区开发首选。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,260 | 1,282,524 | DeepSeek 推出的高速推理版本，主打低延迟。适合对响应速度有严苛要求的实时应用场景。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,042 | 1,640,938 | Qwen 系列下一代实验性模型，标签显示 qwen4_exp。旨在探索未来对话架构的可能性。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 813 | 6,777 | 采用 MoE（混合专家）架构的推理模型。以高质量的逻辑推理见长，适合复杂任务。 |
| [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF) | Venastine-Research | 669 | 36,481 | 一款针对端侧优化的 MoE 模型（A4B 激活参数）。在有限算力下实现了不错的生成质量。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 190 | 5,370 | LiquidAI 发布的轻量化 LFM2-VL 模型。虽然参数小，但兼顾了多模态理解能力。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）
涵盖图像、视频、音频等多模态生成与识别模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,940 | 1,688,807 | 本期视频生成领域的“顶流”，支持图生视频与文生视频。其惊人的下载量证明了视频 AI 的需求爆发。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,675 | 1,933,066 | Qwen 图像模型的无审查 GGUF 版本，下载量超 190 万。社区热衷于在本地部署无限制版生成模型。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,123 | 116,957 | 官方发布的 Qwen 图像生成 2.1 版本。在图像编辑与生成质量上均有显著提升。 |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,319 | 243,910 | 基于 Qwen-Image 的人脸交换 LoRA。下载量高企，说明面部编辑是目前的热点应用。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,386 | 36,328 | 专注于“校准决策”的分类模型。虽然下载量一般，但高点赞表明其在特定逻辑判断任务中备受关注。 |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 301 | 9,467 | 一款土耳其语文本转语音（TTS）模型。展现了小语种语音合成在本地社区的活力。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 184 | 2,594 | 面向端侧部署的语音识别模型。专注于 On-device 场景，适合隐私敏感应用。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）
聚焦特定功能、效率优化或基础能力（Embeddings）的模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,191 | 21,148 | 谷歌推出的最新嵌入模型。作为 Embedding 领域的标杆，常用于 RAG 等检索任务。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 1,886 | 10,874 | 面向云边端协同的边缘计算模型。虽然下载量不高，但在 Edge AI 领域值得关注。 |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 200 | 29,692 | Unsloth 转换的嵌入模型 GGUF 版。使得在本地 LLM 工具链中也能高效运行嵌入任务。 |
| [autotrust/GEV-26B-Decide](https://huggingface.co/autotrust/GEV-26B-Decide) | autotrust | 1,815 | 903,866 | 基于 Gemma4 的“System-One”分类模型。下载量近 90 万，显示出在快速决策任务中的广泛使用。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）
主要展示社区开发者对官方模型的二次开发、量化压缩及去审查（Abliterated）版本。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,548 | 4,345,410 | 一款极具创新性的二值/三元量化模型。极高的下载量证明了极小比特数模型的市场需求。 |
| [orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF) | orcarouter | 470 | 20,613 | 基于 Orca 架构的无审查版 GGUF 模型。结合了高性能推理框架与去审查微调。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,569 | 2,037,446 | 一个功能极其复杂的社区定制版，融合了多种微调目标（Turbo, Coder, Uncensored）。名称展示了社区命名的“缝合怪”风格。 |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 678 | 492,022 | 针对 Qwen 下一代模型的无审查量化版。下载量近 50 万，反映了去审查模型的高热度。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 721 | 3,405,442 | 采用 GSQ 与 RCO 技术进行混合精度量化的学术/工业级作品。高达 340 万的下载量展示了其量化效率。 |
| [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw) | Infatoshi | 302 | 2,091 | 使用 ExLlamaV3 引擎优化的 GLM 模型，采用 3.0bpw 量化。适合追求特定量化平衡的用户。 |

## 生态信号

Qwen 3.8 系列无疑是当前的绝对核心，无论是原版还是其海量的衍生量化版（GGUF），下载量都遥遥领先，显示其在开源生态中的统治力。DeepSeek 和 Aleph-Alpha 在推理效率上持续发力，证明了 MoE 架构的主流化趋势。值得注意的是，“无审查”（Uncensored/Abliterated）标签在多个高下载量模型中出现，这表明社区对 AI 对齐策略的博弈仍在持续，且本地化部署场景对这种“原生”行为的接受度较高。在量化领域，不仅是常规的 GGUF 8/4bit，更激进的二元/三元（Ternary）量化和特定引擎优化（如 ExLlamaV3、GSQ）正成为新的增长点。

## 值得探索

1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成模型的下载量已反超部分 LLM，值得测试其在 ComfyUI 工作流中的稳定性与生成质量，是构建 AIGC 视频应用的强力基石。
2.  **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为下载量最大的基座模型，它是所有微调、量化实验的源头，深入理解其架构与能力边界是当前开发者的高性价比选择。
3.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：探索极低比特量化的极限。在算力受限的端侧设备（如高端手机或边缘盒子）上，这类模型可能带来“能用”与“好用”之间的突破，是端侧推理的必看模型。