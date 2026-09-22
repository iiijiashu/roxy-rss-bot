# Hugging Face 热门模型日报 2026-09-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-22 00:20 UTC

---

# Hugging Face 热门模型日报
**日期**: 2026-09-22

## 1. 今日速览
本期榜单中，Qwen 系列模型占据主导地位，不仅包括旗舰版 Qwen3.8-27B 及其多种量化微调版本，还涵盖了图像生成与推理加速模型。多模态视频生成成为另一大热点，MiniMax-H3 和 Lightricks/LTX-2.5 的高下载量表明视频创作需求激增。此外，DeepSeek 新推出的 V4.1-Flash 模型也展现出强劲的多模态能力。生态趋势显示，GGUF 量化社区活动极为活跃，大量第三方作者正在优化主流大模型的本地部署体验。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,968 | 7,153,238 | 本期榜单最高人气模型，支持多模态输入。其极高的下载量显示出作为基准旗舰模型的强大吸引力。 |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,525 | 512,120 | 集成了文本与图像理解能力的快速推理模型。标签显示其侧重于高效的多模态交互场景。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,542 | 774,778 | Qwen 系列的实验性快速版本，旨在优化响应速度。标签提及 "conversational"，适合实时对话应用。 |
| [Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,120 | 18,394 | 来自 XingChen-AGI 的文本生成模型，标签包含 "conversational"。作为独立于大厂的模型，展现了其对话能力。 |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,640 | 460,533 | 基于 Llama 架构的小型模型，由高下量证明其适合边缘设备部署。主打轻量级文本生成任务。 |
| [AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 199 | 676 | 由 Yandex 推出的基础语言模型，标签显示其使用自定义代码实现。虽然点赞不高，但代表了特定技术路线的探索。 |
| [openjev](https://huggingface.co/AlexWortega/openjev) | AlexWortega | 416 | 0 | 基于 Qwen3.5 的自然语言推断（NLI）模型。作为交叉编码器，主要用于文本分类和逻辑判断任务。 |
| [Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) | Altworld | 378 | 834 | 基于 Qwen3.8 架构的文本生成模型，标签明确指出了其对 Qwen3.5 文本组件的使用。属于社区衍生模型。 |
| [NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 992 | 12,260 | 支持 Agent 能力的文本生成模型，标签包含 "agentic"。基于 Qwen3.5 文本架构，专注于任务执行。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,570 | 4,046,917 | 高性能的视频生成模型，支持文本转视频和图像转视频。极高的下载量使其成为本期多模态类别的领跑者。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,665 | 1,626,742 | 支持多种视频转换模式的扩散模型，包括图像到视频和文本到视频。标签显示其采用单文件扩散架构。 |
| [Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 1,439 | 6,523 | Qwen 系列的文本生成图像模型，支持图像编辑功能。虽然下载量相对较低，但代表了 Qwen 在视觉生成领域的拓展。 |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 947 | 18,759 | 专注于音乐生成的音频模型，标签提及 "symbolic-planning"。这是一个在文本转音频领域具有独特技术的模型。 |
| [Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 223 | 1,864 | 网易有道推出的自动语音识别（ASR）模型，标签显示其基于 Qwen3 ASR 架构。专注于语音转文本任务。 |
| [ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 219 | 5,078 | 多模态视觉语言模型，标签强调 "spatial-reasoning" 空间推理能力。适合需要理解空间关系的视觉任务。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 1,739 | 0 | 文本分类模型，标签提及 "system-one" 和 "calibrated-decisions"。虽然下载为 0，但高点赞表明其在决策支持领域的关注度。 |
| [needle3](https://huggingface.co/Cactus-Compute/needle3) | Cactus-Compute | 166 | 46,399 | 专为设备端优化的模型，标签强调 "tool-calling" 和 "function-calling"。适合需要本地工具调用的场景。 |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,534 | 1,292,471 | 基于 GSQ 和 RCO 技术的量化模型，标签提及 "mixed-precision"。由研究机构发布，侧重量化效率。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,471 | 7,039,006 | 针对 Qwen3.8-27B 的高人气 GGUF 量化版本。极高的下载量反映了社区对本地运行大模型的巨大需求。 |
| [DavidAU/Qwen3.8-27B-TURBO-...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,045 | 1,348,712 | 名称极长的微调模型，标签包含 "uncensored" 和 "heretic"。表明这是去审查化或特定风格微调的版本。 |
| [Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,729 | 2,227,879 | 2-bit 三值量化模型，标签提及 "llama.cpp"。展示了极端量化技术在保持模型可用性上的突破。 |
| [Qwen-Image-2.1-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-GGUF) | abenzerps | 619 | 33,232 | 图像生成模型的 GGUF 版本，标签包含 "comfyui-gguf"。允许在 ComfyUI 环境中以量化格式运行图像模型。 |
| [Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) | ukisai | 344 | 144,372 | 基于 llama.cpp 的高效思考量化模型。标签提及 "efficient-thinking"，旨在优化推理过程中的资源消耗。 |
| [Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 315 | 36,744 | 针对 Apple Silicon 优化的 MLX 格式三值量化模型。展示了跨平台量化生态的多样性。 |
| [Swift-Qwen3.8-27B](https://huggingface.co/ukisai/Swift-Qwen3.8-27b) | ukisai | 528 | 16,514 | Qwen3.8-27B 的非量化微调版本，标签包含 "qwen3_8"。代表了基础模型的直接社区再分发。 |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 596 | 268,296 | 基于 MiniMax-H3 的视频生成微调模型。标签显示其延续了视频生成的多模式转换能力。 |
| [Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 518 | 0 | 针对 Apple Silicon 优化的 MLX 模型，标签包含 "parallel-decoding"。虽然下载为 0，但展示了低层优化的尝试。 |
| [Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 214 | 53,094 | 快速版模型的量化变体，由 ISTA-DASLab 发布。进一步降低了快速推理模型的部署门槛。 |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 439 | 535,365 | ComfyUI 官方组织的单文件扩散模型封装。高下载量证明了其在 ComfyUI 工作流中的核心地位。 |
| [Atria-Dawn-Preview](https://huggingface.co/internlm/Atria-Dawn-Preview) | internlm | 225 | 978 | 基于 GLM 架构的预览版模型，标签包含 arXiv 论文链接。代表了学术预研成果的早期公开。 |

## 3. 生态信号
Qwen 家族在本期榜单中展现出压倒性的势能，从原始模型到各类 GGUF 量化及微调版本，形成了完整的生态闭环，显示其已成为社区微调的底层标准。同时，视频生成领域爆发明显，MiniMax 和 Lightricks 的高下载量表明“文本/图像转视频”正成为 AI 消费级应用的新前沿。值得注意的是，极端量化技术（如 2-bit、三值）和 Apple Silicon (MLX) 适配正在加速，这预示着 AI 模型正迅速下沉至本地个人设备，追求更低的显存占用与更高的推理效率。

## 4. 值得探索
1. **[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为本期人气王，它是理解当前多模态大模型能力边界和生态衍生（如上述众多 GGUF 版本）的核心入口。
2. **[MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：在视频生成领域，该模型极高的下载量暗示其在视频连贯性和质量上具有竞争力，适合视频创作者和技术研究者深入测试。
3. **[Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：代表了激进量化的前沿，对于研究如何在极低比特数（2-bit）下保留大模型能力，以及在资源受限设备上运行 LLM 具有重要参考价值。