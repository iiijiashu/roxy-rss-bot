# Hugging Face 热门模型日报 2026-09-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-21 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-09-21)

## 今日速览
本次榜单展示了 Hugging Face 生态中 **Qwen3.8** 与 **DeepSeek-V4.1** 系列的强劲势头，其中 Qwen3.8-27B 以超过 700 万的下载量占据绝对主导位置。视频生成领域迎来 MiniMax-H3 与 Lightricks LTX-2.5 的双雄争霸，下载量均突破百万级，显示多模态视频生成的热度持续攀升。量化版本（GGUF/2-bit）需求激增，社区对本地部署高效推理的关注度极高，prism-ml 的三元组量化方案及 unsloth 的 Qwen 量化包成为热门选择。此外，轻量级边缘模型（如 Edge0 与 MiniCPM5）开始崭露头角，暗示端侧 AI 正在从概念走向实战。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,861 | 7,331,932 | 多模态图文对话模型，凭借 15,861 个点赞登顶周榜，下载量超 700 万，是本周最核心的旗舰模型。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,492 | 761,112 | 强调高效思考的轻量级视觉语言模型，下载量迅速突破 76 万，适合对延迟敏感的实时应用。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,768 | 5,910,102 | 经典的 8B 指令微调基座模型，下载量接近 600 万，依然保持着作为通用基座的高活跃度。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,499 | 3,109,084 | 基于 GLM 5 系列的快速迭代版本，下载量突破 310 万，主打高响应速度的多模态交互。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,627 | 420,622 | 专为端侧设计的 2B 参数模型，凭借 42 万下载量证明了小模型在本地部署市场的巨大潜力。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,549 | 76,669 | 支持 MoE 架构的边缘推理模型，预览版即获 3,500+ 点赞，展示了对极致边缘部署的探索。 |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 980 | 11,913 | 基于 Qwen3.5 架构的 9B 文本生成模型，标签强调“agentic”特性，侧重智能体工作流应用。 |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 883 | 12,617 | 29B 总参数/4B 激活的 MoE 对话模型，虽然下载量较低，但社区关注度（点赞）尚可。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,526 | 4,057,444 | 支持文/图生视频的旗舰扩散模型，下载量突破 400 万，是本周视频生成领域最热门的资源。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,552 | 1,609,559 | 多模态视频生成模型，支持多种视频转换任务，下载量超 160 万，生态位稳固。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 734 | 183 | 新一代文生图与图像编辑模型，尽管下载量暂时较低，但作为 Qwen 图像基线备受期待。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,430 | 496,684 | 具备视觉理解能力的多模态 LLM，下载量近 50 万，在图文问答场景中表现强劲。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 915 | 17,403 | 音乐生成与智能编辑模型，标签包含“symbolic-planning”，探索符号化音频生成新方向。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 212 | 3,750 | 主打空间推理能力的多模态视觉语言模型，下载量较小，处于早期测试阶段。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| *本周榜单中无明确的医疗、数学或特定领域嵌入模型上榜* | N/A | N/A | N/A | *注：部分多模态模型可能包含通用能力，但未标注专用任务标签。* |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,428 | 6,941,478 | 旗舰模型的 GGUF 量化版本，下载量近 700 万，是本地部署 Qwen3.8 的首选通道。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,493 | 1,908,396 | 创新的三元组（Ternary）2-bit 量化方案，以极低精度实现高效推理，下载量破 190 万。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,478 | 1,217,204 | 采用混合精度量化技术的 GGUF 模型，下载量超 120 万，追求性能与精度的平衡。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,002 | 1,301,417 | 社区深度微调与量化结合的模型，包含“Uncensored”标签，下载量突破 130 万。 |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 284 | 30,043 | 针对 Apple Silicon (MLX) 优化的三元组量化模型，展示了跨平台量化的扩展。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 570 | 242,751 | 基于 MiniMax-H3 的视频生成微调版本，下载量 24 万，反映了视频模型的 LoRA 热度。 |

## 生态信号
当前模型生态呈现出“**基座稳、量化热、视频兴**”的显著特征。Qwen 3.8 系列与 DeepSeek V4.1 确立了多模态对话的主导地位，而社区对 2-bit 及三元组量化（Ternary）的关注度暴涨，表明开发者正极力在消费级硬件上落地 27B 级别的大模型。开源权重方面，视频生成赛道竞争加剧，MiniMax 与 Lightricks 的双高下载量显示该领域正处于爆发前夜。值得注意的是，LLM 的本地化部署已从单纯的 GGUF 转换，进化为针对 Apple Silicon 等特定硬件架构的定制化优化。

## 值得探索
1.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：探索三元组量化在保持 27B 模型推理效率上的极限，是研究极致压缩技术的绝佳样本。
2.  **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：作为下载量最高的视频生成模型，适合研究当前开源视频扩散模型在图像/视频转换任务上的最新表现。
3.  **[Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview)**：虽然预览状态，但其 35B 参数在边缘端的 MoE 设计思路值得深入研究，可能预示了未来端侧 AI 的架构方向。