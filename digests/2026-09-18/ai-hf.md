# Hugging Face 热门模型日报 2026-09-18

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-17 17:22 UTC

---

### 1. 今日速览
本日榜单显示 Qwen 3.8 系列成为社区绝对热点，其 27B 版本及衍生量化模型占据多个席位，下载量突破百万级。DeepSeek-V4.1-Flash 与 MiniMax-H3 分别引领文本多模态与视频生成赛道，展现强劲实力。此外，针对 Qwen 和 MiniMax 模型的社区微调（Uncensored/Fine-tune）及 GGUF 量化活动极其活跃，反映出本地化部署与去审查化需求的增长。经典基础模型如 GPT-2 和 BERT 依旧保持高下载量，作为研究基准未被淘汰。

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,969 | 390,657 | DeepSeek 最新旗舰 Flash 版本，支持多模态输入。凭借高性能比支持了极高下载量，旨在平衡速度与效果。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,501 | 7,456,257 | 阿里巴巴 Qwen 家族主力模型，具备强大对话能力。极高的下载量使其成为当前社区最广泛的部署选择之一。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,355 | 706,052 | Qwen 下一代 Flash 实验版本，注重推理效率。适合对延迟敏感的应用场景，展示了 Qwen4 架构的初步成果。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,417 | 2,446,115 | 智谱 AI 最新模型，擅长多模态理解与生成。下载量极高，显示其在中文生态及企业级应用中的广泛渗透。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,689 | 5,887,953 | Meta 的经典开源 LLM，生态成熟稳定。作为长期使用的基准模型，其稳定性使其持续保有巨大社区流量。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 2,260 | 19,789 | 基于 Qwen3.5 文本架构的小型模型，强调代理能力。适合作为轻量级 Agent 任务的边缘计算底座。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,284 | 37,131 | 专注于边缘端推理的 MoE 模型，激活参数仅 3B。旨在通过稀疏化技术实现大模型在终端设备的运行。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,533 | 329,713 | 面壁智能的超小型模型，Llama 架构兼容。极致轻量化设计，适合资源受限的移动端或嵌入式场景部署。 |

#### 🎨 多模态与生成（图像、视频、音频、文本到X）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,202 | 1,602,865 | 高性能视频生成模型，支持文生视频及图生视频。在保持高速度的同时提升了生成内容的连贯性与质量。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,410 | 4,576,471 | MiniMax 最新 H3 视频模型，下载量位居生成类榜首。擅长长时长视频生成，社区热度极高，广泛用于创意内容制作。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 700 | 11,626 | 新兴的音频生成模型，支持符号规划与代理编辑。代表了生成式 AI 向复杂音频结构控制领域扩展的新趋势。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 287 | 3,024 | 腾讯开源的 TTS 模型，支持零样本语音克隆。主要面向高保真语音合成场景，体现了大厂在语音交互方向的布局。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 6,045 | 255,618,777 | 业界标准的文本嵌入模型，下载量破亿。是 RAG 和语义搜索任务中最常用的基础组件之一。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,557 | 21,776,108 | 经典的视觉-语言对比学习模型。虽已发布较久，但在零样本图像分类领域仍是许多管道的核心骨干。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,363 | 47,631,021 | NLP 领域的里程碑模型，用于填充掩码任务。作为学术基线，其极高的下载量反映了其在教学与基准测试中的地位。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,134 | 15,558,794 | GPT 架构的开山之作，文本生成经典。至今仍是许多多语言或特定领域微调的起点模型。 |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,470 | 7,456,019 | BERT 的蒸馏版本，以 60% 体积保留 97% 性能。适合对延迟敏感的生产环境进行 NLP 任务部署。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,255 | 8,205,000 | Qwen 27B 的高质量量化版本，下载量惊人。Unsloth 的量化方案极大降低了本地运行门槛，是社区部署首选。 |
| [DavidAU/Qwen3.8-27B-TURBO-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 834 | 1,116,038 | 深度定制的“去审查”代码增强版 Qwen。下载量超百万，显示用户对无限制代码生成与自由对话的强烈需求。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,241 | 1,027,602 | 采用 GSQ 混合精度量化技术的实验性模型。展示了前沿量化算法在保持模型精度方面的技术进步。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 259 | 32,011 | DeepSeek 的去审查版本，使用 FP8 格式。满足开发者对模型安全性解除及低比特部署的双重需求。 |
| [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) | ukisai | 214 | 72,862 | 针对 Swift 生态优化的 Qwen 量化模型。虽然下载量不及 Unsloth，但为特定开发栈提供了便捷入口。 |

### 3. 生态信号
当前生态显示 **Qwen 3.8** 家族势头最猛，不仅官方模型下载量高，更衍生出大量量化与微调变体，表明其已成为社区事实标准。趋势上，**开源权重**依然主导流量，尤其是“去审查”（Uncensored）和“代码增强”类微调模型下载量激增，反映出用户对本地控制权的追求。量化方面，**GGUF 格式**因兼容本地推理而占据主导，Unsloth 等工具极大地降低了 27B 等大模型的本地部署门槛，同时前沿的混合精度量化（如 GSQ）也开始进入大众视野。

### 4. 值得探索
1.  **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**：目前本地部署 27B 级别模型的最佳性价比选择，800 万+ 下载量验证了其稳定性和易用性，适合个人开发者快速体验最新开源大模型能力。
2.  **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：视频生成领域的当红炸子鸡，450 万下载量极具说服力。若需构建视频生成应用，该模型在速度与质量平衡上表现优异，值得深入测试其多模态一致性。
3.  **[m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B)**：音频生成赛道的新星，支持符号规划与代理编辑。对于探索语音合成从“文本转波形”向“结构化音乐/语音生成”演进的研究者来说，这是一个极具前瞻性的探索对象。