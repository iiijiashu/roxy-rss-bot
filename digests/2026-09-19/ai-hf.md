# Hugging Face 热门模型日报 2026-09-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-19 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-09-19)

## 1. 今日头条速览
今日 Hugging Face 榜首由 **Edge0/Edge0-35B-A3B-preview** 占据，其 MoE 架构与边缘推理标签显示出端侧大模型的热度持续攀升。值得注意的是，**Qwen 3.8 系列**（含原版及多种 GGUF 量化变体）在本期榜单中占据了显著席位，下载量级巨大，反映出该模型家族在开发者社区中的统治力。**MiniMax H3** 和 **LTX-2.5** 的表现则突显了多模态视频生成领域的激烈竞争。此外，**DeepSeek V4.1 Flash** 的高下载量（429,865 次）表明高效推理模型依然是企业级部署的重点关注对象。

## 2. 热门模型分类

### 🧠 语言模型（LLM、对话模型、指令微调）
该类别涵盖了通用文本生成、对话及指令遵循模型。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,397 | 52,519 | 基于 Qwen3.5 MoE 架构的 35B 模型，主打边缘推理与本地部署，是本期点赞数最高的模型。其混合专家设计旨在平衡性能与资源消耗，适合端侧场景。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,168 | 429,865 | DeepSeek 推出的高速多模态模型，支持图像文本交互。42万+的下载量显示其高吞吐特性深受开发者喜爱，适用于对延迟敏感的实时应用。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,649 | 7,358,662 | 本期下载量冠军，Qwen 3.8 系列的 27B 多模态版本。超过 730 万的下载量确立了其作为主流开源基座模型的领先地位，社区活跃度极高。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 2,368 | 22,666 | 基于 Qwen3.5 文本版的 4B 小模型，强调智能体（Agentic）能力。适合在资源受限环境中构建自主代理工作流，标签显示其注重任务执行而非单纯生成。 |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 438 | 3,073 | XingChen AGI 发布的 29B MoE 模型，仅激活 4B 参数以优化效率。虽然下载量目前较低，但其稀疏激活架构值得关注，有望在长文本处理中展现优势。 |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 373 | 0 | 基于 Qwen 2.5 的 1B 模型，专注于 Apple Silicon 架构与并行解码。0 下载量可能反映其刚发布或处于测试阶段，重点在于结构化生成与约束解码。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,560 | 357,166 | OpenBMB 推出的 2B 轻量级对话模型，下载量超 35 万。延续了 MiniCPM 系列的高性价比路线，适合移动端或嵌入式设备的本地化部署。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,403 | 724,142 | Qwen 4 实验系列中的 Flash 版本，旨在提供快速响应。72 万的下载量表明开发者对高速、低延迟推理模型的强劲需求，是多模态对话的高效选择。 |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 224 | 1,357 | Sapiens AI 开发的多模态模型，支持图像文本交互。作为相对新的加入者，其上榜体现了 AI 模型生态的多元化竞争格局。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,718 | 5,934,139 | 经典 Llama 3.1 8B 指令版，长期保持高热度。近 600 万的下载量证明其作为行业标准基座模型的地位依然稳固，广泛用于微调与评估基准。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 280 | 33,065 | DeepSeek 模型的社区无审查量化版本，采用 FP8 精度。3 万下载量显示部分开发者对更高自由度和特定精度格式的需求。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 305 | 3,184 | 腾讯推出的语音合成模型，支持零样本 TTS 与声音克隆。尽管下载量不高，但大厂介入语音交互领域值得后续关注。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 181 | 1,802 | 专注于空间推理的 9B 多模态模型。标签显示其在视觉语言模型领域有特定侧重点，适合需要空间理解能力的场景。 |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 887 | 10,746 | NeoHorse 系列的 9B 版本，同样主打智能体能力。与 4B 版相比，提供更强推理能力的中间尺寸选择，适合更复杂的代理任务。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,272 | 29,684 | XHToken 推出的 4B 文本生成模型。近 3 万的下载量表明小模型在大模型生态中仍有稳定的细分市场需求。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,446 | 2,669,173 | 智谱 GLM 系列的 5.3 Flash 版本，下载量超 260 万。多模态对话能力与高下载量结合，显示其在中文社区及企业级应用中的广泛接受度。 |
| [internlm/Atria-Dawn-Preview](https://huggingface.co/internlm/Atria-Dawn-Preview) | internlm | 167 | 711 | 上海 AI Lab 发布的预览版模型，标签提及 GLM MoE DSA 架构。低下载量符合预览版特征，主要供研究早期参考。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）
涵盖视频生成、音频合成及复杂多模态任务。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 803 | 13,668 | 支持音乐生成与符号规划的多模态模型。标签中的“agentic-editing”显示其不仅在生成音频，还具备基于代理的编辑能力，是音频 AI 的新方向。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,332 | 1,590,087 | 强大的视频生成模型，支持图生视频、文生视频及视频转视频。159 万的下载量使其成为视频生成领域的头部开源解决方案之一。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,458 | 4,449,605 | MiniMax 推出的高热度视频模型，下载量超 440 万。其多模态能力在图像到视频转换方面表现突出，是本期下载量第二高的模型。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 495 | 217,900 | 基于 MiniMax H3 的微调版本，命名为“Singularity”。21 万下载量表明社区对特定风格或增强功能微调版有实际部署需求。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）
专注于特定领域任务，如嵌入、相似度计算等。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 6,061 | 255,050,544 | 经典的句子嵌入模型，下载量高达 2.55 亿次。作为 RAG 和搜索系统的基石组件，其使用频率远超生成式大模型，体现了基础设施型模型的持久价值。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）
涵盖 GGUF 格式转换、量化压缩及社区微调变体。

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 914 | 405,609 | 采用 2-bit 三值量化的 27B 模型，GGUF 格式。40 万下载量证明极致压缩模型在本地 LLM 爱好者中的受欢迎程度，平衡了精度与内存占用。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,329 | 1,078,301 | 使用 GSQ 和 RCO 技术的混合精度量化版本。超百万下载量显示学术界与工程界对高精度量化算法的关注，旨在保留原模型大部分性能的同时大幅缩减体积。 |
| [ukisai/Swift-Qwen3.8-27b](https://huggingface.co/ukisai/Swift-Qwen3.8-27b) | ukisai | 438 | 6,293 | 基于 Qwen 3.8 27B 的微调模型，标签强调“Swift”特性。虽然下载量不高，但代表了针对特定效率或场景优化的社区定制版本。 |
| [DavidAU/Qwen3.8-27B-TURBO-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 900 | 1,197,378 | 一个复合名称的 GGUF 模型，整合了“Uncensored”、“Coder”等多个特性。119 万的高下载量反映了社区对去审查化和特定领域增强（如代码）模型的强烈需求。 |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,318 | 7,628,907 | Unsloth 团队提供的 Qwen 3.8 27B 量化版。762 万的下载量位居量化模型之首，证明了主流工具链提供的易用量化的巨大市场价值。 |
| [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) | ukisai | 281 | 100,177 | Swift 版本的 GGUF 量化文件，下载量破 10 万。作为上述微调模型的量化落地形式，满足了希望在本地运行特定微调模型的用户需求。 |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 174 | 5,056 | 针对 MLX 框架优化的 2-bit 三值模型。虽然下载量较低，但针对 Apple Silicon 生态的专用优化是未来端侧推理的重要方向。 |
| [Comfy-Org/YuE2](https://huggingface.co/Comfy-Org/YuE2) | Comfy-Org | 186 | 102,247 | ComfyUI 支持的 YuE2 模型变体，基础模型来自 m-a-p。10 万下载量显示音频生成工作流在 ComfyUI 社区中的普及，尽管许可证限制为 CC BY-NC。 |

## 3. 生态信号

本期榜单揭示了几个关键的生态趋势。首先，**Qwen 家族**展现了压倒性的统治力，不仅原版模型下载量破 700 万，其衍生的 GGUF 量化版（Unsloth）和微调版也占据多个高位，显示其作为开发者首选基座模型的地位。其次，**视频生成**领域竞争加剧，MiniMax H3 和 LTX-2.5 的下载量均超过百万，表明多模态生成正从文本主导转向视听融合。在量化方面，**GGUF 格式**依然是本地部署的主流选择，Unsloth 提供的便捷量化工具带来了极高的下载转化。值得注意的是，**小模型**（如 2B-4B）在端侧和智能体场景中依然活跃，Edge0 和 MiniCPM5 的热度证明轻量级高性能模型具有持续的市场需求。

## 4. 值得探索

1.  **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**: 作为本期下载量之王（730万+），它是构建生产级多模态应用的最安全选择。建议探索其 image-text-to-text 能力，特别是结合其高并发特性进行大规模推理部署。
2.  **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**: 对于希望在本地工作站或边缘设备运行 Qwen 3.8 的用户，这是效率与兼容性最佳的路径。760万+的下载量证明了其易用性，值得尝试不同的量化等级以平衡速度与精度。
3.  **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**: 视频生成领域的重要开源代表。440万的下载量显示其社区认可度极高，建议研究其 image-to-video 和 text-to-video 的质量，以及与 LTX-2.5 在风格控制上的差异，用于创意内容生成项目。