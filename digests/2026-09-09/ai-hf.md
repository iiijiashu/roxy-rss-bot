# Hugging Face 热门模型日报 2026-09-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-09 04:48 UTC

---

## Hugging Face 热门模型日报 — 2026-09-09

### 1. 今日速览
今日 HF 热门榜被 Qwen 系列模型强势占据，Qwen3.8-27B 以 14,407 点赞和 671 万下载量稳居榜首，其各种 GGUF 量化版本和社区微调版本热度持续攀升。视频生成领域 MiniMax-H3 和 LTX-2.5 持续受到关注，分别获得 5,051 和 3,189 点赞。开源嵌向量模型 sentence-transformers/all-MiniLM-L6-v2 仍以 2.5 亿下载量展现持久生命力。GLM-5.3 系列新晋上榜，显示智谱 AI 在开源模型赛道的持续发力。

### 2. 热门模型

#### 🧠 语言模型
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,407 | 6,712,160 | Qwen 最新一代 27B 多模态语言模型，支持图像-文本输入。凭借强大的多模态理解和生成能力稳居热门榜首位。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,011 | 503,263 | Qwen3.8 系列的快速推理版本，面向更低延迟的生产部署场景。在保持多模态能力的同时显著优化推理速度。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,173 | 826,875 | 智谱 GLM-5.3 的快速推理版本，支持图像-文本对话。展示 GLM 系列在开源多模态赛道上的持续迭代。 |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,768 | 474,141 | 智谱 GLM-5.3 基础版本，采用 MoE 架构。为中文和多语言场景提供具有竞争力的开源选择。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 740 | 2,879 | 面壁智能的轻量级 2B 语言模型，适合边缘设备和资源受限场景。延续 MiniCPM 系列在小模型性能上的优势。 |

#### 🎨 多模态与生成
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,051 | 4,994,268 | MiniMax 的视频生成模型，支持文本到视频和图像到视频。在视频生成质量与速度之间取得良好平衡。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,189 | 1,644,796 | Lightricks 的单文件扩散视频生成模型，支持多种视频转换模式。以轻量架构实现高质量视频生成能力。 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 820 | 313,547 | DeepSeek V4 系列的视觉实验版本，探索多模态理解的边界。 | DeepSeek 在多模态方向的最新探索性发布。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 644 | 444,052 | Google 的时间序列预测模型 3.0 版本，专为时序数据分析设计。在多个基准上展现出领先的预测精度。 |

#### 🔧 专用模型
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,639 | 253,331,994 | 最流行的句子嵌入模型之一，2.5 亿下载量彰显其持久影响力。广泛用于语义搜索、聚类与相似度计算任务。 |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 158 | 1,449 | 微软的流式自动语音识别模型，支持实时转录。在 ASR 精度与延迟之间取得良好平衡。 |
| [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 488 | 7,243 | Breeze 文本转语音模型的第二个版本，提供高质量语音合成能力。 |

#### 📦 微调与量化
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,714 | 10,675,683 | Unsloth 对 Qwen3.8-27B 的 GGUF 量化版本，支持 llama.cpp 高效推理。超千万下载量显示社区对本地部署的强烈需求。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 1,025 | 1,715,824 | 去限制化的 Qwen3.8-27B 社区微调版本，采用 MTP 多令牌预测技术。反映部分用户对无约束模型的持续需求。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 666 | 479,597 | 采用 GSQ+RCO 混合精度量化的 Qwen3.8-27B 版本，在保留质量的同时大幅降低显存占用。 |
| [unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 840 | 935,568 | Unsloth 对 Qwen3.8-Flash-Next 的 GGUF 量化版本。为 Flash 版本提供高效的本地推理方案。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 319 | 19,433 | 针对网络安全领域微调的 GLM-5.3 FP8 量化版本，移除了拒绝响应机制。展示垂直领域微调的新趋势。 |

### 3. 生态信号
Qwen 模型家族势头最旺，Qwen3.8-27B 及其各类量化版本占据热门榜核心位置，显示国产开源模型在国际社区的持续影响力。MiniMax-H3 和 LTX-2.5 的视频生成热度表明多模态生成仍是社区焦点。GGUF 量化版本的高下载量（Unsloth 的 Qwen3.8-27B-GGUF 超 1000 万下载）反映本地部署需求的强劲增长。去限制化（uncensored/abliterated）微调版本持续存在，显示部分用户群体对无约束模型的稳定需求。GLM-5.3 系列新晋上榜标志着智谱 AI 在开源赛道上的新一轮竞争。

### 4. 值得探索
1. **Qwen/Qwen3.8-27B** — 当前最受欢迎的开源多模态模型，性能和生态支持俱佳，值得作为多模态应用的基础选择。
2. **MiniMaxAI/MiniMax-H3** — 视频生成领域的有力竞争者，下载量近 500 万验证了其社区接受度。
3. **unsloth/Qwen3.8-27B-GGUF** — 本地部署的最佳实践参考，千万级下载量证明 GGUF 量化方案在资源受限环境中的实用性。