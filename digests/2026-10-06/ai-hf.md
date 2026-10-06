# Hugging Face 热门模型日报 2026-10-06

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-06 00:20 UTC

---

# Hugging Face 热门模型日报
**日期：** 2026-10-06

## 今日速览
本周 Hugging Face 生态中，Qwen 3.8 系列表现极为强劲，基础模型及其高度定制的 GGUF 量化版占据榜单前列，显示出巨大的社区参与度。Lightricks 发布的 LTX-2.5 视频生成模型凭借超过 160 万次下载成为生成式 AI 领域的最大流量入口。此外，云厂商（Cloudflare）开始涉足多模态基座模型，而针对本地部署的“无审查”和“2-bit”极端量化模型持续受到特定用户群体的追捧。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,238 | 11,733 | 专注系统一（System 1）的快速决策与校准分类。以高点赞率体现其在特定推理任务中的精准度口碑。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,035 | 6,758,884 | 本周点赞最高的多模态基座模型，支持对话与图文处理。近 700 万的下载量使其成为当前生态的绝对核心。 |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 628 | 2,453 | 基于 MoE 架构的推理型文本生成模型。虽下载量适中，但代表了老牌 AI 实验室在新兴架构上的最新尝试。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,130 | 869,321 | 具备快速响应能力的多模态模型，兼顾文本生成与图像理解。高下载量表明其在开发工具链中的高集成度。 |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 740 | 3,715 | 专注于对比学习和重新排序（Reranker）的专用模型。为检索增强生成（RAG）场景提供了高效的轻量级验证器。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,496 | 1,645,444 | 支持图生视频及文生视频的生成模型。单文件扩散架构大幅降低了部署门槛，下载量破 160 万。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,002 | 94,556 | 强大的图像生成与编辑模型，支持 Diffusers 框架。作为 Qwen 系列在视觉生成领域的代表性作品。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,938 | 1,530,359 | 实验性（qwen4_exp）的高速度多模态模型。近 150 万下载显示开发者对 Flash 系列高性能需求的旺盛。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 1,485 | 5,416 | 云厂商推出的多模态模型，基于 Qwen 3.5 架构。体现了边缘计算大厂在 AI 基座模型上的定制化探索。 |
| [autotrust/JEV-27B-VL](https://huggingface.co/autotrust/JEV-27B-VL) | autotrust | 566 | 1,278,569 | 支持图文理解的视觉语言模型。超过 120 万的下载量使其成为本地视觉部署的主流选择之一。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 701 | 55,491 | 专注于语音活动检测与说话人区分的音频模型。为多说话人场景提供高精度的音频帧分类能力。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,457 | 4,120,718 | 采用 2-bit 三元量化的 Llama.cpp 模型。近 400 万下载表明极小内存占用需求正推动 2-bit 技术普及。 |
| [DavidAU/Qwen3.8-27B-...-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,464 | 2,134,360 | 高度定制且“无审查”的 Qwen 3.8 融合版本。通过冷融合技术提升编码能力，深受本地社区喜爱。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,262 | 1,638,838 | 面向 ComfyUI 生态的无审查图像生成模型。近 160 万下载显示其在创作自由度和易用性上的优势。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 616 | 2,244,732 | 应用 GSQ 与 RCO 混合精度技术的量化模型。兼顾速度与精度，下载量突破 220 万大关。 |

*注：本次数据中“专用模型”分类无上榜模型。*

## 生态信号
Qwen 3.8/4.0 家族无疑是本周的绝对王者，不仅占据基座模型首位，更衍生出大量高质量量化与微调版本，显示出极高的生态生命力。模型权重正快速向“无审查”和“极致量化（2-bit）”两极分化，反映出终端用户追求本地部署极致性价比与内容自由度的双重需求。开源权重依然是主流，但云厂商（如 Cloudflare）开始发布基座模型，预示着基础设施巨头正从单纯提供算力转向直接提供模型资产。

## 值得探索
1.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：2-bit 量化技术的先锋，适合在资源受限的边缘设备上测试大模型的极限表现。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：单文件架构的视频生成模型极大简化了部署流程，是探索多模态视频生成应用的极佳起点。
3.  **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)**：融合了 GSQ 与 RCO 等高级量化算法，代表了当前平衡推理速度与模型精度的技术前沿。