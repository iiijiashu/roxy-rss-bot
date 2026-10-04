# Hugging Face 热门模型日报 2026-10-04

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-04 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-04)

## 1. 今日速览
今日 Hugging Face 榜单被 **Qwen 系列**及其生态主导，官方发布的 Qwen3.8-27B 和 Flash-Next 占据了流量前列。社区量化需求爆发，ISTA-DASLab 推出的 GSQ-RCO 量化版 Qwen3.8 系列多个变体下载量均突破百万。多模态生成领域保持活跃，Lightricks 的视频模型 LTX-2.5 与 MiniMax H3 的 LoRA 微调模型受到高度关注。此外，Cloudflare 发布的 CLEF 架构模型及 DeepSeek V4.1 展示了大厂在轻量化多模态推理上的最新动向。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,881 | 6,895,117 | Qwen 官方最新 27B 多模态模型，以近 17k 点赞领跑全榜。极高的下载量显示其作为主力基座模型的广泛采用。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,860 | 1,404,413 | 实验性多模态对话模型，主打“Flash”快速推理能力。下载量超过 140 万，适合对延迟敏感的实时应用。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,060 | 787,841 | DeepSeek 推出的轻量级多模态生成模型，支持图像文本到文本任务。在开源权重中表现强劲，下载量近 80 万。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,076 | 0 | 专注“系统一”校准决策的文本分类模型，点赞高但暂无下载数据。可能是新发布或处于评估阶段的高潜模型。 |
| [SupersonicLabs/Julia-1](https://huggingface.co/SupersonicLabs/Julia-1) | SupersonicLabs | 400 | 3,251 | 多语言决策模型，基于 PyTorch 架构。适用于需要跨语言理解与判断的业务场景。 |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 350 | 50,402 | 基于 GLiNER2.5 架构的令牌分类器，擅长意图与文本分类提取。下载量显著，显示出在 NLP 预处理环节的高需求。 |
| [NaiveAI/Naive-N0.5-Flash](https://huggingface.co/NaiveAI/Naive-N0.5-Flash) | NaiveAI | 145 | 1,497 | 面向长上下文与代码生成的 MoE 模型，强调 AI 研究属性。适合需要处理超长文档的代码辅助场景。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,132 | 1,629,984 | 支持图生视频、文生视频及视频间转换的扩散模型。凭借单文件部署优势获得百万级下载，是视频生成领域的热点。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,899 | 85,895 | 官方图像生成与编辑模型，支持 Diffusers 架构。标签显示其具备强大的图像编辑能力，基础模型吸引力强。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,926 | 1,455,921 | Qwen 图像模型的“无审查”GGUF 版本，下载量高达 145 万。反映了社区对自由生成内容及本地化运行格式的强烈需求。 |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 570 | 257,298 | 基于 Qwen 图像模型的 LoRA 加速变体，旨在提升生成速度。下载量超 25 万，显示了“Turbo”系列在效率上的优势。 |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,143 | 193,270 | 专注于人脸交换的 Diffusers LoRA 模型，基于 Qwen 图像编辑生态。下载量近 20 万，细分功能市场需求旺盛。 |
| [akatz-ai/MiniMax-H3-Character-Swap-LoRA](https://huggingface.co/akatz-ai/MiniMax-H3-Character-Swap-LoRA) | akatz-ai | 270 | 13,258 | MiniMax H3 视频模型的角色交换 LoRA，支持视频间编辑。展示了视频生成向交互式编辑方向发展的趋势。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 649 | 48,784 | NVIDIA 发布的语音活动检测与说话人区分模型，支持 Nemo 框架。音频领域的重要进展，适合会议转录等场景。 |
| [FermionResearch/Phonon-2](https://huggingface.co/FermionResearch/Phonon-2) | FermionResearch | 172 | 2,361 | 基于 Apple Silicon 优化的自动语音识别模型，采用 MLX 框架。体现了边缘设备与语音技术结合的新动向。 |
| [PSRben/VisionHOPE](https://huggingface.co/PSRben/VisionHOPE) | PSRben | 390 | 1,338 | 计算机视觉图像分类模型，关联最新 ArXiv 论文。科研导向明显，适合学术研究与基准测试。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF) | ISTA-DASLab | 240 | 303,256 | 专为代码生成优化的量化模型，结合 GSQ 量化与 RCO 技术。下载量超 30 万，解决了本地代码辅助的性能瓶颈。 |
| [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF) | Venastine-Research | 173 | 11,013 | 基于 Xing4.0 架构的 GGUF 量化模型，可能针对数学或逻辑任务优化。小众但具有研究价值的专用模型。 |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 691 | 3,190 | 基于对比学习的 8B 文本排序与验证模型。可用于 RAG 检索增强或作为 LLM 输出验证器（Verifier）。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,397 | 2,116,212 | 极度个性化的 Qwen3.8 微调量化版，融合多特性且无审查。下载量突破 211 万，显示社区对定制化“满血”体验的狂热追求。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,392 | 3,969,867 | 采用三元（2-bit）量化的 Bonsai 模型，极致压缩体积。近 400 万下载量证明了超轻量模型在端侧部署的巨大市场。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,939 | 1,674,292 | 应用 GSQ 混合精度量化的 Qwen3.8 标准版，平衡速度与精度。下载量近 170 万，是生产级部署的高性价比选择。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 511 | 1,474,719 | Flash-Next 版本的量化模型，延续 GSQ-RCO 技术路线。下载量超 147 万，进一步巩固了该量化方案在社区的地位。 |
| [orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF) | orcarouter | 314 | 11,585 | Orca 系列基于 Qwen3.8 架构的无审查 GGUF 模型。虽下载量适中，但满足了特定垂直领域用户对内容自由的硬性需求。 |
| [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw) | Infatoshi | 177 | 520 | 基于 ExLlamaV3 引擎的 GLM-5.3 量化模型，3.0 bits 精度。代表了对特定推理引擎优化趋势的探索。 |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 163 | 4,924 | 支持首尾帧视频生成的 LoRA 模型，扩展了 MiniMax H3 的视频控制能力。体现了视频生成从单模态向多视角控制的演进。 |

## 3. 生态信号
Qwen 3.8 系列与 MiniMax H3 是当前的两大生态核心，尤其是 ISTA-DASLab 主导的 GSQ-RCO 量化方案在社区中形成了标准化的“高质低价”部署路径，下载量普遍破百万。开源权重绝对主导，即便是“无审查”或“微调”版本也基于开放基座。值得注意的是，三元（Ternary/2-bit）量化技术（如 Ternary-Bonsai）正在打破下限，使得大模型在超低资源环境下变得实用。此外，视频生成 LoRA 的兴起表明社区正从静态图像向动态、交互式视频控制深入。

## 4. 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：对于视频生成研究者，其单文件部署架构与全模态转换能力是重要的工程参考，下载量证明了其易用性。
2.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：探索 2-bit 三元量化在复杂推理任务中的表现极限，对于边缘计算和低成本推理部署具有极高的研究价值。
3.  **[ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)**：作为社区量化标杆，其混合精度策略（GSQ+RCO）可作为后续自研量化算法的对比基准，平衡速度、内存与精度的最佳实践。