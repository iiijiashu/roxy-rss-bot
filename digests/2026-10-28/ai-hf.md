# Hugging Face 热门模型日报 2026-10-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-28 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-28)

## 1. 今日速览
今日 Hugging Face 榜单呈现出明显的**视频生成**与**端侧量化**热潮。Lightricks 的 LTX-2.5 视频模型以近 100 万下载量遥遥领先，成为本周最热门的生成式资产。Qwen3.8 系列表现强劲，不仅原始模型下载量巨大，其衍生出的未审查/融合版本（如 DavidAU 的 Turbo 版本）也获得了高关注度。DeepSeek V4.1 Flash 的多个社区量化与修改版（GGUF、FP8、Abliterated）集体上榜，显示出开发者对本地化部署和自由度的极高需求。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 3,378 | 105,667 | DeepSeek 最新发布的 Flash 版本，主打高性能与多模态支持。以最高的点赞数之一成为本期 LLM 焦点，下载量破 10 万。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,536 | 7,522,728 | 阿里通义千问 3.8 系列的 27B 参数模型。凭借近 750 万的下载量和全榜单第一的点赞数，确立了其在开源 LLM 市场的主导地位。 |
| [Nanbeige/Nanbeige4.3-33B](https://huggingface.co/Nanbeige/Nanbeige4.3-33B) | Nanbeige | 667 | 4,785 | 纳米比亚（Nanbeige）团队推出的 33B 参数 LLM。基于 LLaMA 架构，以适中的参数规模提供了不错的文本生成能力。 |
| [XHToken/Spark-X2.6-4B](https://huggingface.co/XHToken/Spark-X2.6-4B) | XHToken | 782 | 6,191 | 专为端侧或轻量级场景优化的 4B 小模型。虽参数小，但凭借高效的推理特性获得了较高的社区点赞。 |
| [KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview) | KRAFTON | 208 | 2,208 | 韩国游戏公司 KRAFTON 开源的 Raon 系列 Mini 版。代表了游戏巨头在 LLM 领域的最新尝试。 |
| [LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B) | LiquidAI | 160 | 6,311 | 极小尺寸的 1.7B 模型，适合边缘计算研究。以极低的资源占用率成为微型 LLM 的代表。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 9,575 | 2,163,739 | 强大的图像转视频及文生视频模型。拥有全榜单第二高的下载量（超 216 万），是目前视频生成领域的热门引擎。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,853 | 750,694 | BFL 推出的 Flux 3 系列变体，集成 ComfyUI 工作流。极高的下载量显示其在专业图像生成工作流中的普及度。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-1) | Comfy-Org | 502 | 2,760,550 | MOSS 图像模型的 ComfyUI 兼容版本。下载量突破 270 万，成为社区图像生成节点的基础设施。 |
| [Comfy-Org/Fibo-2.0](https://huggingface.co/Comfy-Org/Fibo-2.0) | Comfy-Org | 206 | 170,383 | 基于 Bria AI Fibo 2.0 的 ComfyUI 封装。支持文本到图像生成，下载量近 17 万，是创意社区的常用工具。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 1,059 | 24,996 | 领先的 TTS 模型，支持多说话人角色演绎。在有声书和影视配音生成领域表现优异，点赞破千。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 5,240 | 1,876,779 | Meta 发布的 Segment Anything Model 3。用于高精度的掩码生成与视频分割，下载量近 188 万，是 CV 领域标杆。 |
| [OpenMOSS-Team/MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 779 | 13,253 | 针对图像生成进行 SFT 微调的模型。提升了生成图像的对齐能力，适合需要高质量图文对齐的场景。 |
| [baidu/Unlimited-OCR-2](https://huggingface.co/baidu/Unlimited-OCR-2) | baidu | 228 | 513 | 百度推出的 OCR 模型。旨在解决长文档或复杂版式的识别问题，代表了大厂在专用 CV 任务上的投入。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,966 | 256,852 | Google 的 Gemma 2 嵌入模型。为 RAG 应用提供高质量的文本向量，下载量破 25 万，是搜索领域的核心组件。 |
| [ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder) | ccore | 166 | 3,544 | 专用于生成 Three.js 3D 代码的微调模型。结合 Qwen3.5 基座，填补了 3D 开发辅助模型的空白。 |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 415 | 12,334 | Mistral AI 的时序预测基础模型。以极小的 209M 参数量实现时间序列分析，展示了小模型在垂直领域的潜力。 |
| [HuggingFaceBio/Carbon-X](https://huggingface.co/HuggingFaceBio/Carbon-X) | HuggingFaceBio | 224 | 1,595 | 基于 Qwen3 架构的 DNA 序列分析模型。探索 LLM 在生物信息学及基因组学研究中的应用。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.8-27B-TURBO-Fable...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 2,158 | 1,713,544 | 基于 Qwen3.8 的“混合”微调版本。集成了未审查、代码增强等多重特性，下载量超 170 万，深受本地化玩家喜爱。 |
| [unsloth/flint-GGUF](https://huggingface.co/unsloth/flint-GGUF) | unsloth | 289 | 149,888 | 知名量化工具 Unsloth 对 Flint 模型的 GGUF 处理。旨在降低显存占用，提升本地推理速度。 |
| [ RecursiveSI/flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 972 | 10,574 | 对话型 LLM，常被用作社区量化的底模。原模型与量化版共同上榜，反映了良好的生态配合。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 5,187 | 2,201,569 | Qwen 图像模型的未审查量化版。下载量超 220 万，是“自由生成”社区的重要资源。 |
| [dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 415 | 8,282 | DeepSeek V4.1 的 FP8 量化未审查版。保留了模型性能同时降低精度损失，适合拥有消费级显卡的用户。 |
| [ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF) | ISTA-DASLab | 392 | 1,105,751 | 采用 GSQ-RCO 混合精度策略的 GGUF 量化版。下载量破百万，证明了高效量化算法的主流地位。 |
| [orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF](https://huggingface.co/orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF) | orcarouter | 270 | 13,441 | 经过“去审查”（Abliterated）处理的 DeepSeek 版本。去除了原模型的安全限制层，适合科研或特定开发用途。 |
| [nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB) | nvidia | 181 | 44,651 | NVIDIA 推出的 4GB 显存适配模型。针对低显存设备进行优化，是端侧 AI 的典型案例。 |
| [XHToken/Spark-X2.6-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.6-4B-GGUF) | XHToken | 193 | 104,927 | Spark-X 2.6 模型的官方 GGUF 格式发布。方便用户直接在 llama.cpp 等框架中加载。 |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 454 | 5,368 | 基于 ONNX 和 CPU 的 OCR 模型。无需 GPU 即可运行，适合资源受限的边缘识别任务。 |
| [InternScience/Sage-A1.5](https://huggingface.co/InternScience/Sage-A1.5) | InternScience | 336 | 6,613 | 基于 Qwen3.5 MoE 架构的科研导向模型。引入了多专家混合（MoE）机制，以提升多模态理解能力。 |
| [MiniMaxAI/MiniMax-M3.1-Flash](https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash) | MiniMaxAI | 413 | 11,075 |  MiniMax 的多模态 LLM（含视觉）。以 Flash 版本形式发布，强调了处理速度。 |

## 3. 生态信号
本周期显示**小参数模型与大模型量化**的双向扩张。一方面，如 LTX-2.5 等视频模型展示了重型生成式 AI 的商业落地需求；另一方面，DeepSeek V4.1 的多款 GGUF/FP8 变体（如 ISTA-DASLab 的 GSQ-RCO 版本）下载量破百万，表明“本地化、轻量化、去审查”已成为社区的核心诉求。模型家族方面，**Qwen 3.8** 和 **DeepSeek V4** 占据绝对主导，且衍生生态（ComfyUI 封装、Unsloth 量化、DavidAU 融合版）极其繁荣。开源权重依然是主流，连闭源趋势明显的 NVIDIA Nemotron 也在通过量化版本寻求社区渗透，而“去审查/未审查”（Uncensored/Abliterated）版本的高热度反映了用户对模型控制权及合规边界的强烈博弈。

## 4. 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：作为本期下载量最高的非 LLM 模型，LTX-2.5 在视频生成的速度/质量平衡上可能取得了突破，适合用于视频创作流水线。
2.  **[DavidAU 的 Qwen3.8 Turbo 混合版](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**：这款“缝合怪”模型集成了代码、多模态、未审查等特性，且下载量高达 170 万，是研究社区如何自行优化基础模型、挖掘潜在能力上限的极佳案例。
3.  **[google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)**：随着 RAG 应用的普及，嵌入模型成为瓶颈。探索 Gemma 2 嵌入模型在垂直领域检索准确率上的表现，有助于构建更轻量的检索增强生成架构。