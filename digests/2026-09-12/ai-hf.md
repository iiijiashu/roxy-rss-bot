# Hugging Face 热门模型日报 2026-09-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-12 04:41 UTC

---

## Hugging Face 热门模型日报（2026-09-12）

### 1. 今日速览
Hugging Face 本周最引人注目的趋势是**Qwen3.8 系列的全面爆发**：27B 基础模型获得 14,769 赞，Flash-Next 变体和 GGUF 量化版本下载量均突破百万；**MiniMax-H3 视频生成模型**以 5,159 赞和近 500 万下载量稳居多模态榜首；**DeepSeek-V4.1-Flash** 和 **GLM-5.3-Flash** 分别以 1,813 赞和 2,253 赞进入前 5，显示中国模型厂商持续领跑。同时，社区量化活动极为活跃，多个 GGUF 变体下载量超过 60 万。

### 2. 热门模型

**🧠 语言模型**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,769 | 7,563,763 | Qwen3.8 旗舰模型，多模态对话能力突出，14K+ 点赞创榜单新高 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,109 | 586,040 | Flash-Next 加速版本，兼顾性能与速度，适合实时应用场景 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 1,813 | 75,774 | DeepSeek V4.1 快速版，图像文本联合推理能力，周涨 1,813 赞 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,253 | 1,173,520 | GLM 系列最新 Flash 版本，中英文多模态对话表现优异 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,199 | 67,550 | 2B 轻量级模型，适合边缘设备本地部署，性价比突出 |

**🎨 多模态与生成**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,159 | 4,970,363 | 文本/图像到视频生成模型，近 500 万下载量验证市场认可度 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,508 | 1,669,564 | 工业级视频生成模型，支持多格式输入输出，专业创作者首选 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 864 | 443,954 | DeepSeek V4 视觉实验版，图像理解能力持续提升 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 232 | 971 | 3B 音乐生成模型，支持符号规划和智能编辑，音频生成新秀 |

**🔧 专用模型**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,826 | 254,035,929 | 经典文本嵌入模型，2.5 亿下载量稳坐嵌入模型头把交椅 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 735 | 633,239 | Google 时间序列预测模型 3.0，企业级预测任务首选 |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 203 | 2,279 | 微软流式语音识别模型，支持实时转录场景 |
| [Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 169 | 3,271 | 自动驾驶专用模型，融合视觉与运动规划能力 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 455 | 12,081 | Meta 多语言语音预训练模型，覆盖 200+ 语言 |

**📦 微调与量化**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,903 | 11,339,637 | 1100 万+ 下载量的 GGUF 量化版本，本地推理效率标杆 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 840 | 682,187 | GSQ+RCO 混合精度量化，在质量和效率间寻求平衡 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 1,103 | 1,999,181 | 去审查版本，199 万下载量显示无约束模型需求旺盛 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...] | DavidAU | 485 | 606,200 | 多重微调叠加版本，展示社区对极致定制的追求 |

### 3. 生态信号
**Qwen 家族**是当前绝对的主力：基础模型 + Flash 版本 + 多个 GGUF 量化变体占据榜单前列，显示 Qwen 3.8 系列在性能和可用性上的全面突破。**MiniMax-H3** 在视频生成赛道一骑绝尘，验证了开源视频模型的巨大市场需求。量化活动异常活跃——仅 Qwen3.8 相关的 GGUF 版本下载量就超过 1,300 万，表明**本地推理需求**仍是社区核心驱动力。

### 4. 值得探索
1. **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)** — 速度和质量的平衡典范，适合生产环境部署
2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 视频生成领域开源最强选手，500 万下载量验证实力
3. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — 本地推理必备，1100 万下载量是最权威的口碑认证