# Hugging Face 热门模型日报 2026-09-18

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-18 00:20 UTC

---

《Hugging Face 热门模型日报》

**今日速览**
Qwen 3.8 系列衍生生态爆发，包括社区微调的 Turbo 变体与大规模 GGUF 量化版，占据榜单前列，显示出极高的本地化部署需求。视频生成领域迎来 MiniMax H3 与 Lightricks LTX-2.5 的双雄对决，下载量均突破百万。DeepSeek V4.1 Flash 以 39 万下载量领跑多模态文本模型，而 Edge0 35B 预览版则代表了边缘 MoE 推理的最新风向。

**热门模型**

🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,532 | 7,456,257 | 榜首基础模型，以超 700 万下载量印证其作为社区微调与量化底座的统治力。支持图像与文本多模态输入。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,004 | 390,657 | 主打高效推理的旗舰版本，近 40 万下载显示其在企业级应用中的快速渗透。具备优秀的文本到多模态处理能力。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,695 | 5,887,953 | 经典的小尺寸指令微调标杆，持续保持数百万级别的高下载量。生态兼容性极强，是各类 RAG 应用的首选。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,427 | 2,446,115 | 对话能力突出的轻量级模型，下载量突破 240 万。旨在提供更流畅的交互式用户体验。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,364 | 706,052 | 面向未来的快速响应实验版，下载量迅速突破 70 万。体现了厂商在迭代速度上的竞争策略。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,135 | 15,558,794 | 历史悠久的基础语言模型，拥有全榜单最高的 1500 万+下载量。常作为基准测试与教学的标准参照物。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 2,312 | 19,789 | 专注代理（Agentic）能力的小参数模型，基于 Qwen3.5 架构。适合本地运行自动化任务流。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,261 | 28,347 | 紧凑型的通用文本生成模型，性能表现优于同量级竞品。适合资源受限的边缘端场景。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,537 | 329,713 | 极小尺寸的端侧语言模型，超 32 万下载量印证了移动端 LLM 的热度。以 Llama 架构为基础优化。 |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 258 | 0 | 针对 Apple Silicon 优化的强化学习约束解码模型。下载为 0 说明处于早期发布或小众研究领域。 |
| [nex-agi/Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 832 | 7,347 | 结合 MoE 架构的迷你多模态模型，兼顾效率与理解力。适合多模态轻量级代理开发。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 171 | 476 | 强调空间推理能力的多模态视觉语言模型。新上榜，下载量较低，需进一步社区验证。 |

🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,418 | 4,576,471 | 视频生成领域的重要选手，近 460 万下载量显示其在影视创作中的广泛应用。支持图像到视频的高保真转换。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,233 | 1,602,865 | 专注图像、视频多向转换的扩散模型，160 万下载量居视频类前列。提供单文件部署，降低集成难度。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 719 | 11,626 | 创新的音乐生成模型，结合符号规划能力。下载量虽小但代表音频生成技术的前沿探索。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 289 | 3,024 | 腾讯推出的零样本文本转语音模型，支持克隆功能。下载量较低，可能尚处于早期测试或特定区域推广阶段。 |

🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 6,047 | 255,618,777 | 嵌入模型中的“常青树”，惊人的 2.5 亿下载量反映了 RAG 技术的普及度。多框架支持使其成为行业事实标准。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 565 | 22,039 | 基于 wav2vec2 的多语言语音预训练模型。2.2 万下载量稳定，是语音处理任务的常用基础组件。 |

📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,267 | 8,205,000 | 820 万下载量表明 Qwen3.8 极受本地推理引擎（如 llama.cpp）用户青睐。unsloth 作为量化权威，提供了最高效的部署方案。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,303 | 37,131 | 榜单第一的 MoE 架构预览版，专为边缘推理设计。3.7 万下载量显示开发者对端侧高性能模型的高度期待。 |
| [DavidAU/Qwen3.8-27B-TURBO...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 844 | 1,116,038 | 社区创作的“无审查”深度微调版本，超百万下载量揭示了个性化与自由生成需求的巨大缺口。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,259 | 1,027,602 | 采用 G SQ 与 RCO 混合精度的实验性量化模型。百万级下载说明学术界对极致压缩技术的探索热度。 |
| [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) | ukisai | 234 | 72,862 | 强调“高效思考”的微调变体，7 万下载量适中。适合追求速度与质量平衡的开发者。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 478 | 181,811 | 基于 MiniMax-H3 的社区视频生成微调版。18 万下载量证明其在特定视频风格生成上的独特价值。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 149 | 0 | 尝试三位数（2-bit）量化的极端压缩模型。下载量归零提示该激进技术尚存稳定性或精度争议。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 265 | 32,011 | 提供 FP8 格式的 DeepSeek 无审查版本。3 万下载量显示对开源模型“解禁”需求的持续存在。 |
| [ukisai/Swift-Qwen3.8-27b](https://huggingface.co/ukisai/Swift-Qwen3.8-27b) | ukisai | 392 | 3,221 | 非量化格式的 Swift 微调版，下载量较低。表明用户更倾向于直接使用 GGUF 格式的部署方案。 |
| [Comfy-Org/YuE2](https://huggingface.co/Comfy-Org/YuE2) | Comfy-Org | 168 | 79,302 | 针对 ComfyUI 工作流优化的音频模型，近 8 万下载量得益于其便捷的可视化界面集成。 |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 214 | 1,223 | 新晋多模态指令模型，下载量较低。作为独立厂商模型，正在积累早期社区认知度。 |

**生态信号**
Qwen 3.8 家族展现出极强的生态粘性，通过 unsloth 和 DavidAU 等社区的量化与微调，衍生出百万级下载的子模型，确立了其作为“社区底座”的地位。开源权重在本地部署（GGUF）和边缘推理（MoE、小参数）领域的热度持续攀升，尤其是“无审查”与“Agentic”标签受到追捧。量化技术向 2-bit 极致压缩和 FP8 高效推理两个方向分化，反映了算力限制下的多样化需求。

**值得探索**
1. [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview)：探索 MoE 架构在端侧推理的最新边界，关注其激活参数与延迟平衡。
2. [DavidAU/Qwen3.8-27B-TURBO...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)：研究社区“无审查”微调的具体方法及其在创意写作与代码生成中的实际表现差异。
3. [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)：分析混合精度量化在保持模型性能与降低显存占用之间的折中效果。