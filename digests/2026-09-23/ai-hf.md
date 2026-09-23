# Hugging Face 热门模型日报 2026-09-23

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-23 00:20 UTC

---

## Hugging Face 热门模型日报（2026-09-23）

### 1. 速览
- **Qwen 家族霸榜**：Qwen3.8-27B（16,075 赞）及多个其衍生 GGUF/微调版本占据前 30 名中约一半席位，显示其生态活跃度极高。
- **视频生成热度高**：MiniMax-H3（5,599 赞）与 LTX-2.5（4,793 赞）双双上榜，视频生成模型成为当前多模态领域的热点。
- **本地化/轻量化需求强劲**：大量 gguf、mlx 格式量化模型（如 Ternary-Bonsai、Qwen3.8 GGUF）获得数百万下载，反映社区对边缘设备部署的需求。
- **DeepSeek-V4.1-Flash** 以 3,608 赞位居高点赞行列，显示其在推理效率方面的受关注度。

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,075 | 7,079,646 | 本周最热门语言模型，支持对话与图像理解，下载量超 700 万。高点赞数显示其作为通用基座模型的广泛认可度。 |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,608 | 542,014 | 多模态文本理解模型，擅长图像+文本任务。以“Flash”命名暗示其推理效率优势，下载量达 54 万。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,603 | 787,525 | Qwen 4 系列实验性快思考模型，支持对话。78 万下载量表明开发者正积极测试其新一代架构。 |
| [Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,383 | 30,627 | 29B 参数量的 MoE 架构语言模型，专注对话生成。作为新兴厂商的代表，在中文社区获得不错口碑。 |
| [Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) | Altworld | 493 | 2,745 | 基于 Qwen3.8 基座微调的语言模型，标签显示用于文本生成。下载量较低，属于垂直领域微调产物。 |
| [MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) | XiaomiMiMo | 385 | 985 | 小米发布的强化学习微调模型，支持多模态文本生成。下载量尚少，处于早期社区测试阶段。 |
| [openjev](https://huggingface.co/AlexWortega/openjev) | AlexWortega | 483 | 0 | 针对自然语言推理（NLI）任务的交叉编码器模型。0 下载量显示其可能刚发布或仅限本地研究使用。 |

#### 🎨 多模态与生成（图像、视频、音频、文本到X）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,599 | 3,766,997 | 领先的文本/图像转视频生成模型。近 380 万下载量使其成为本周视频生成领域的绝对主力。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,793 | 1,630,125 | 支持文/图/视频转视频的多模态生成模型。160 万下载量显示其在视频编辑场景的普及度。 |
| [Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 1,794 | 16,242 | 图像生成与编辑模型，支持 diffusers 生态。虽下载量不如视频模型，但点赞数高，社区评价积极。 |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 969 | 20,904 | 小型音频生成模型，支持象征规划与智能体编辑。3B 参数量级使其适合本地音频创作任务。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| *本期无显著纯专用模型上榜，部分语言模型隐含代码能力但未单独列出* | | | | |

#### 📦 微调与量化（社区微调、GGUF、AWQ）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,524 | 7,019,401 | 针对本地运行优化的 GGUF 量化版 Qwen3.8。下载量与原始模型持平，证明本地化部署需求巨大。 |
| [Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 1,099 | 182,313 | 去除内容限制的图像生成量化模型，支持 ComfyUI。18 万下载量显示对无审查生成工具的特定需求。 |
| [Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,881 | 2,569,604 | 采用 2-bit 三值量化的极致压缩模型，支持 llama.cpp。256 万下载量表明超低比特量化的实用性。 |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,579 | 1,363,176 | 使用混合精度 GSQ/RCO 技术的量化模型。136 万下载量，代表更精细的量化策略需求。 |
| [Qwen3.8-27B-TURBO...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,086 | 1,397,909 | 复杂的社区堆叠微调模型，融合多种特性。139 万下载量显示社区对定制化“超级模型”的兴趣。 |
| [Swift-Qwen3.8-27b](https://huggingface.co/ukisai/Swift-Qwen3.8-27b) | ukisai | 551 | 17,256 | 针对“高效思考”优化的微调模型。下载量较少，属于特定推理优化方向的尝试。 |
| [Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 337 | 43,477 | 面向 Apple Silicon 优化的 MMLX 格式 2-bit 模型。4.3 万下载量，反映 Mac 用户群的专用需求。 |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,663 | 508,950 | 5B 以下的小模型代表，基于 Llama 架构。50 万下载量显示小模型在边缘计算的持续热度。 |

### 3. 生态信号
*   **家族势头**：Qwen 家族（含基座、Flash、微调、量化版）和 MiniMax 视频家族是本周最强双引擎。Qwen3.8 几乎垄断了大型 LLM 下载榜，而 MiniMax-H3 主导了视频生成下载榜。
*   **开源趋势**：所有上榜模型均为开源权重。社区偏好“基座 + 高质量社区量化/微调”的模式，闭源 API 模型不在 HF 榜单中体现。
*   **量化活动**：GGUF 和 MLX 格式模型合计下载量超过 1500 万。2-bit 和混合精度量化（如 Ternary-Bonsai, GSQ-RCO）表明用户正追求在消费级硬件上运行 27B 级别模型，量化技术成为生态核心基础设施。

### 4. 值得探索
*   [Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)：探索 2-bit 三值量化对 27B 模型能力保留的极限，适合研究极低比特推理效率。
*   [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)：当前视频生成领域下载量最高的开源模型，适合体验最新的图/文转视频多模态生成质量。
*   [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)：作为 Qwen4 实验性快思考模型，值得研究其在推理速度与准确性之间的新平衡点，预示下一代 LLM 架构方向。