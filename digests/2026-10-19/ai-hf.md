# Hugging Face 热门模型日报 2026-10-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-19 00:20 UTC

---

# Hugging Face 热门模型日报（2026-10-19）

## 今日速览

今日 Hugging Face 趋势显著偏向 Qwen3.8 与 Lightricks 视频模型生态，其中 Lightricks LTX-2.5 以 2,012,496 周下载量居首。DeepSeek-V4.1 系列与腾讯 Hy-Memory 展示了国产大模型在长文本与多模态方向的持续迭代。多模态图像生成领域竞争白热化，Black Forest Labs 与 Qwen 的视觉模型占据显著份额。同时，gguf 量化与社区微调活动活跃，本地部署（Local）需求旺盛。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,958 | 7,695,206 | 本周点赞与下载双料冠军。Qwen 家族主力中尺寸模型，以极高的社区热度引领交互体验升级。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,635 | 1,316,711 | DeepSeek 旗舰迭代版本。以高效性能著称，下载量突破百万，显示其作为开发者首选底座的地位。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,328 | 2,485,835 | 主打极致低延迟的 Qwen 下一代模型。下载量仅次于 LTX-2.5，体现了对轻量化推理体验的强烈需求。 |
| [tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 188 | 1,187 | 腾讯发布的新晋对话模型。虽数据量较小，但作为大厂新发作品，代表了国内模型厂商的竞争动向。 |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 470 | 13,007 | LiquidAI 推出的紧凑型模型。聚焦于低资源消耗场景，适合边缘计算部署尝试。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,377 | 2,012,496 | 周下载量榜眼（按下载量）。支持图生视频与文生视频，是目前视频生成领域最受关注的模型之一。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,792 | 1,652,742 | 百度推出的图像理解模型。下载量超 160 万，解决了复杂版面下的文字提取痛点，应用性极强。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,622 | 1,945,717 | Meta 发布的新一代分割模型。作为视觉基础模型标杆，其下载量持续位居前列，生态插件丰富。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 809 | 338,036 | 专为 ComfyUI 优化的图像生成模型。下载量极高，表明 AIGC 工具链与工作流社区的深度融合。 |
| [openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) | openbmb | 1,008 | 57,935 | 面向端侧的多模态模型。平衡了体积与视觉理解能力，适合移动设备端的视觉交互场景。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 692 | 9,620 | 鱼音频的多说话人 TTS 模型。支持角色情感表现，丰富了音视频生成的音频模态选项。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,661 | 164,339 | Google 的嵌入模型。用于 RAG 检索增强生成，高下载量显示了向量数据库与搜索场景的旺盛需求。 |
| [nvidia/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 213 | 4,876 | 面向本地 N 卡优化的 Qwen 模型。结合 NVIDIA 推理引擎，代表了“模型+显卡”软硬结合的优化方向。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 542 | 410,558 | 专注于工具调用与函数执行能力的模型。下载量高企，侧面印证了 Agent（智能体）开发需求的增长。 |
| [vllm-sr/d3](https://huggingface.co/vllm-sr/d3) | vllm-sr | 238 | 4,532 | 结合 vLLM 推理加速的分类模型。体现了推理框架与模型部署的紧密结合，服务于高效能在线服务。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,556 | 2,661,687 | 周下载量榜首。去限制的 Qwen 图像模型 gguf 版，高下载量反映了社区对自由创作与本地生图工具的狂热。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 1,946 | 103,709 | 基于 Gemma 的社区微调模型。用于提升文本自然度（去 AI 味），展示了微调在处理特定文体任务中的价值。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 554 | 387,254 | Qwen 图像模型的未审查 gguf 版本。与 abenzerps 版形成竞争，满足了不同参数偏好下的本地部署需求。 |
| [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF) | LiquidAI | 206 | 107,599 | 官方提供的 GGUF 量化版本。下载量较高，说明该模型在消费级硬件上具备不错的可运行性与普及潜力。 |

## 生态信号

Qwen3.8 与 LTX-2.5 确立了多模态与大模型双主线。一方面，Qwen 系列在语言对话与图像生成（通过衍生模型）均占据主导；另一方面，LTX 视频模型打破了纯文本模型下载量的垄断。开源权重依然是绝对主流，但本地化趋势显著，大量下载量流向 GGUF 量化版本与 NVIDIA 优化版，表明用户正从“云端 API 调用”转向“本地私有化部署”。社区微调方面，“去审查”与“拟人化”成为特定垂直社区（如内容创作）的热门标签。

## 值得探索

1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：作为当前下载量最高的视频模型，它是探索 AIGC 视频叙事流与多模态交互的切入点，适合测试图像到视频的生成质量。
2. **[jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer)**：展示了“去 AI 味”的微调潜力，对于从事新闻写作、网文创作的用户，其文本风格转换效果值得研究。
3. **[nvidia/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local)**：结合了芯片厂商的推理优化，是探索本地化高性能推理边界的最佳案例，适合部署在拥有 NVIDIA 显卡的开发者工作站测试。