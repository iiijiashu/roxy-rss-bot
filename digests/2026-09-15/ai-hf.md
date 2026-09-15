# Hugging Face 热门模型日报 2026-09-15

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-15 04:59 UTC

---

# Hugging Face 热门模型日报 — 2026-09-15

## 今日速览
Qwen 家族持续主导 HF 热门榜，Qwen3.8-27B 以 15,161 点赞和 770 万下载位居多模态榜首。DeepSeek-V4.1-Flash 以 2,492 点赞紧随其后。视频生成领域 MiniMax-H3（5,293 点赞）和 LTX-2.5（3,881 点赞）竞争激烈。边缘推理模型 Edge0-35B-A3B-preview 和轻量级 MiniCPM5-2B 显示端侧部署趋势。

## 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|---|---|---:|---:|---|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,161 | 7,703,400 | Qwen3.5 系列 27B 多模态模型，支持图像文本理解。下载量超 770 万，验证 Qwen 生态统治力。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,492 | 288,414 | DeepSeek V4.1 快速版，image-text-to-text 任务。周增 2,492 点赞，增长迅猛。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,405 | 206,774 | 2B 轻量级指令模型，适合边缘部署。下载量超 20 万，证明小模型需求旺盛。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,606 | 5,620,539 | Llama 3.1 8B 指令版，经典开源模型持续受欢迎。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,336 | 1,770,038 | GLM-5.3 快速版，多模态对话能力。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|---|---|---:|---:|---|
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,293 | 4,827,156 | 视频生成模型，支持 text/image-to-video。下载近 500 万，视频 AI 竞争白热化。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,881 | 1,559,653 | 图像到视频生成模型，单文件扩散架构。技术路线轻量化。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 483 | 5,186 | 音乐生成模型，支持 symbolic planning 和 agentic editing。音频 AI 新势力。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 227 | 1,928 | 腾讯零样本 TTS 模型，支持 voice cloning。 |

### 🔧 专用模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|---|---|---:|---:|---|
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,970 | 252,806,720 | 嵌入模型下载量超 2.5 亿，RAG 系统标配。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 791 | 826,017 | Google 时间序列预测模型，工业应用潜力大。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,529 | 21,349,787 | CLIP 视觉-语言模型，多模态检索基础组件。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|---|---|---:|---:|---|
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,105 | 10,077,938 | Qwen3.8-27B GGUF 量化版，下载超 1000 万，本地部署首选。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,060 | 819,784 | 混合精度量化 Qwen3.8，平衡性能与资源。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 2,156 | 8,109 | MLX 格式 MoE 模型，面向边缘推理优化。 |

## 生态信号
**Qwen 家族**（Qwen3.8、Qwen3.5）持续霸榜，显示国产开源模型影响力扩大。**视频生成**成为新竞争焦点，MiniMax-H3 与 LTX-2.5 下载量均超百万。**边缘推理**需求上升，Edge0 MLX 格式和 MiniCPM5-2B 反映端侧部署趋势。**量化活动**活跃，unsloth GGUF 版本下载量超越原版，本地部署生态成熟。

## 值得探索
1. **Qwen/Qwen3.8-27B**：多模态能力全面，生态支持完善，适合生产部署。
2. **MiniMaxAI/MiniMax-H3**：视频生成标杆，技术迭代快，值得关注。
3. **Edge0/Edge0-35B-A3B-preview**：边缘推理新选择，MLX 格式适配 Apple Silicon。