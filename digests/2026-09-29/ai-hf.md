# Hugging Face 热门模型日报 2026-09-29

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-29 00:20 UTC

---

《Hugging Face 热门模型日报》

**1. 今日速览**
Qwen 生态本周爆发力极强，其旗舰模型 Qwen3.8-27B 以近 1.65 万点赞位居榜首，并带动多个衍生量化版本（如 GSQ-RCO 版）上榜。多模态生成成为另一大焦点，Lightricks LTX-2.5 视频模型和 Qwen-Image-2.1 系列（含官方及社区 GGUF 版）表现抢眼。小米 MiMo 与 Apple 等大厂密集发布多模态小模型，且 2-bit 极限量化技术（Ternary-Bonsai）下载量突破 300 万，显示端侧推理需求激增。

**2. 热门模型**

**🧠 语言模型（LLM、对话模型、指令微调）**

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,495 | 6,844,348 | Qwen 最新旗舰级多模态语言模型，凭借顶尖性能成为本周下载量最大的基础模型，确立了新一代模型标杆。 |
| [Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,799 | 45,834 | 支持文本生成与对话的大语言模型，高点赞反映其在社区基准测试或实际场景中的良好表现。 |
| [MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) | XiaomiMiMo | 584 | 76,518 | 小米 MiMo 系列采用强化学习优化的专业版本，具备多模态处理能力，是小米在 LLM 领域的重要布局。 |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,865 | 668,537 | DeepSeek 的高性能多模态生成模型，以其在快速推理方面的优势和高热度下载量引起关注。 |
| [Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,233 | 3,457,124 | 基于三元数技术的 2-bit 超轻量语言模型，专为本地快速推理设计，极高的下载量证明了端侧极简 LLM 的需求。 |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 4,301 | 0 | 专注系统一思维与校准决策的文本分类模型，虽无下载但点赞极高，代表了对确定性决策 AI 的独特兴趣。 |

**🎨 多模态与生成（图像、视频、音频、文本到X）**

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,423 | 1,595,377 | Lightricks 推出的领先视频生成模型，支持图像到视频转换，高点赞显示其在视频创作领域的强大吸引力。 |
| [Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,590 | 58,693 | 阿里官方发布的强大多模态图像生成与编辑模型，与 LTX-2.5 一同代表了本周视觉生成的最高水平。 |
| [MiMo-V2.6-Flash-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL) | XiaomiMiMo | 512 | 28,842 | 小米 MiMo 的轻量化多模态版本，在保持推理速度的同时集成了视觉理解能力，适合实时应用。 |
| [Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,264 | 1,062,921 | Qwen 图像模型去审查功能的社区量化版本，高下载量表明开发者在追求更高自由度定制时的强烈需求。 |
| [Jev-Omni](https://huggingface.co/akhilaaa3/Jev-Omni) | akhilaaa3 | 296 | 577 | 基于 Gemma 架构的统一多模态模型，尝试将分类与文本处理整合在单一模型中，虽热度不高但体现技术融合趋势。 |
| [Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 444 | 9,336 | 网易有道发布的语音识别 ASR 模型，将语音信号转换为文本，是中文 NLP 领域的重要更新。 |

**🔧 专用模型（代码、数学、医疗、嵌入）**

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,705 | 11,738 | 面向多模态视觉语言模型的专用模型，突出空间推理能力，服务于特定垂直领域的视觉分析任务。 |
| [TeleOCR](https://huggingface.co/XingChen-AGI/TeleOCR) | XingChen-AGI | 783 | 27,904 | 基于 Qwen 架构的图像 OCR 模型，将视觉文字转化为文本，在高下载量支撑下成为文档处理工具。 |
| [MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B) | XiaomiMiMo | 550 | 9,994 | 小米通过知识蒸馏技术优化的小参数多模态模型，旨在以更低成本提供接近旗舰版的性能。 |
| [GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 230 | 24,250 | 专注于 NER 信息抽取与意图分类的专用工具模型，适合需要精细自然语言理解的企业级应用。 |
| [Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 461 | 26,428 | NVIDIA 开发的语音活动检测模型，用于区分音频流中的不同说话人，服务于会议记录与分析。 |
| [LensVLM-9B](https://huggingface.co/apple/LensVLM-9B) | apple | 262 | 1,840 | Apple 发布的视觉语言模型，基于 Qwen 架构进行微调，展示了科技大厂利用开源基座构建专用 VLM 的能力。 |

**📦 微调与量化（社区微调、GGUF、AWQ）**

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,810 | 1,655,818 | 旗舰 Qwen 模型的社区量化版本，采用 GSQ-RCO 技术实现高精度 2-bit 存储，兼顾端侧部署。 |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 825 | 4,351,753 | 针对 ComfyUI 工作流优化的 Qwen 图像模型，极高的下载量说明社区创作工具链的整合需求巨大。 |
| [Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 287 | 220,231 | Unsloth 发布的 Qwen 图像模型量化版本，降低了本地部署图像生成大模型的算力门槛。 |
| [Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 313 | 158,806 | 针对特定场景优化的文本编码器 GGUF 版本，体现了针对模型组件进行极致量化的社区探索。 |
| [OrcaSAQ-2-27B](https://huggingface.co/orcarouter/OrcaSAQ-2-27B) | orcarouter | 191 | 1,663 | 使用 vLLM 服务的 27B 参数量化语言模型，展示了针对服务推理框架的特定量化优化方案。 |
| [Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 1,404 | 19,963 | 支持无限时长流式语音识别的专用 ASR 模型，解决了长音频处理的痛点，获得社区高度评价。 |

**3. 生态信号**
本周生态信号显示 **Qwen 家族**呈现“核心模型+衍生生态”的双重爆发，不仅旗舰模型领跑，多个基于 Qwen 的微调与量化版本（如小米、Apple 及各社区 GGUF）集体上榜，证明了其作为基座模型的强大吸引力。**开源权重**持续主导，但极限量化（如 2-bit 三元模型）的下载量飙升，揭示了“本地化隐私计算”的巨大市场需求。同时，大厂（NVIDIA, Apple, Xiaomi）纷纷基于开源基座微调并发布专用多模态模型，表明“**基座开源 + 垂域微调**”已成为行业标准路径。

**4. 值得探索**
*   **[Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)**：这是探索“如何在本地 PC 上运行 27B 级模型”的最佳路径，其量化技术代表了最新的端侧部署前沿。
*   **[LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：视频生成是继图像后的下一个爆发点，该模型在点赞与下载上的双高意味着其视频生成质量已接近商用水平，值得关注其工作流。
*   **[Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：突破 300 万下载量的“极简”模型，虽牺牲了部分精度，但其证明了在边缘设备上运行数十亿参数模型的技术可行性，值得研究其对模型架构的影响。