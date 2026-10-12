# Hugging Face 热门模型日报 2026-10-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-12 00:20 UTC

---

## Hugging Face 热门模型日报（2026-10-12）

### 1. 今日速览

今日 Hugging Face Hub 上，Qwen 模型家族占据了绝对主导地位，多个变体（包括 27B 基座、Flash 系列及大量社区微调版）位居下载量前列。Google 发布的 embeddinggemma-2 和 Facebook 的 SAM 3 显示主流大厂在嵌入模型与视频分割/生成领域持续发力。社区量化活动极为活跃，特别是针对 Qwen 3.8 系列的 GGUF 量化版本由 unsloth 等开发者主导，下载量巨大。此外，Lightricks 的视频生成模型 LTX-2.5 表现亮眼，显示视频生成赛道竞争加剧。

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,505 | 6,843,108 | 强大的多模态大语言模型，周点赞数最高，下载量破 600 万。其“image-text-to-text”任务标签显示其具备视觉理解能力，是本周生态的核心基座模型。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,112 | 1,870,465 | Qwen 系列的快速迭代版本，定位轻量高效。下载量接近 190 万，显示开发者对低延迟、高效率模型变体的强烈需求。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 887 | 12,550 | 支持 vLLM 推理且具备推理（reasoning）和 MoE 架构的语言模型。作为欧洲 AI 代表，其在高性能推理领域的尝试值得关注。 |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 300 | 10,843 | 基于 Liquid Network 架构的小型视觉语言模型（3B 参数）。适合边缘计算场景，展示了小模型在多模态理解上的潜力。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,363 | 1,382,367 | DeepSeek 的最新 Flash 版本，兼具文本生成与图像理解能力。其开源权重策略使其成为高性能开源 LLM 的重要竞品。 |

#### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,316 | 1,726,683 | 领先的视频生成模型，支持图生视频和文生视频。高达 170 万的下载量表明视频生成是当前多模态领域最热的落地场景之一。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,066 | 2,081,596 | Meta 的新一代分割模型，支持视频掩码生成。下载量超 200 万，成为计算机视觉领域的基础设施级工具。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,225 | 136,103 | Qwen 官方图像生成模型，支持文本到图像及图像编辑。与社区微调版配合，构成了完整的图像生成生态链。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,027 | 14,351 | Cloudflare 推出的视觉语言模型，专注于图像到文本任务。云服务商直接发布多模态模型，体现了 AI 能力向边缘/云端集成的趋势。 |
| [FrancisRing/Prism](https://huggingface.co/FrancisRing/Prism) | FrancisRing | 161 | 0 | 探索联合视频与音频生成的 Diffusion Transformer。虽下载量极低，但其多模态同步生成的创新方向值得关注。 |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 335 | 16,434 | 专为本地设备设计的语音识别（ASR）模型。强调“on-device”能力，适合隐私敏感或离线场景的语音交互。 |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 356 | 18,079 | 针对土耳其语的文本转语音（TTS）模型。展示了非英语语种在语音合成领域的专业化需求。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,696 | 98,829 | Google 推出的嵌入模型，用于特征提取。9.8 万的下载量显示其在 RAG 和检索增强生成场景的高实用性。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,491 | 44,088 | 专注于“校准决策”和 System-1 快速思维模式的文本分类模型。其独特的心理学导向标签使其在特定决策场景下脱颖而出。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,026 | 6,488,262 | unsloth 团队发布的 Qwen 3.8 27B 量化版，下载量高达 640 万。是本周下载量最高的模型，证明了社区量化工具对降低部署门槛的巨大影响。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,630 | 4,549,911 | 采用 2-bit 三值量化的 27B 模型，下载量近 450 万。极端的量化压缩使其能在资源受限设备上运行，吸引了大量边缘计算用户。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 798 | 4,189,006 | 结合 GSQ 和 RCO 量化技术的混合精度模型，下载量超 400 万。展示了学术界在无损/低损量化算法上的最新进展。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,981 | 2,188,658 | 去除了安全限制的图像生成模型 GGUF 版。超 200 万下载量显示了对未审查生成模型的高需求，尤其在本地部署场景。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable...MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,657 | 2,016,567 | 针对编程（Coder）和未审查场景的深度微调 GGUF 模型。200 万下载量表明“Coder”标签成为社区微调的一大卖点。 |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 757 | 614,193 | Qwen Flash 系列的“abliterated”（去审查）版本，下载量超 60 万。社区持续推动模型对齐边界的探索。 |

### 3. 生态信号

**模型家族势头：** Qwen 3.8 系列无疑是当前的生态核心，从官方基座到无数社区量化、微调版本（如 Coder、Uncensored），形成了完整的衍生生态。Google 和 Meta 分别通过嵌入模型和视觉模型巩固其基础设施地位。

**开源 vs 闭源：** 尽管 Big Tech 发布了基座模型，但社区量化（GGUF）和微调版本占据了下载量榜单的前列（如 unsloth, prism-ml, ISTA-DASLab）。这表明高价值场景正加速向本地/边缘部署迁移，开发者更青睐可完全离线控制且资源占用低的开源权重变体。

**量化与微调活动：** “Uncensored”（去审查）和“Coder”（编程优化）是社区微调的两大显性标签。量化技术也在进化，从简单的 GGUF 向 GSQ、RCO 等混合精度、三值量化等更复杂的算法演进，旨在极致压缩比与性能平衡。

### 4. 值得探索

1.  **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**：作为下载量之王，它是测试 Qwen 3.8 能力的最快捷径，适合大多数具备中端 GPU 或 CPU 推理环境的开发者快速上手。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：对于视频生成应用开发者，该模型的高下载量验证了其可靠性。建议探索其在图像到视频转换中的稳定性及参数调节对生成质量的影响。
3.  **[convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)**：这是一个独特的“System-1”分类模型，探索人类直觉式快速决策在 AI 分类任务中的应用。适合对认知科学交叉领域或高效分类推理感兴趣的研究者。