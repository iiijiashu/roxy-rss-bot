# Hugging Face 热门模型日报 2026-10-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-21 00:20 UTC

---

# Hugging Face 热门模型日报 (2026-10-21)

## 今日速览
本周 Hugging Face 榜单由 Qwen 和 Lightricks 主导，[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) 以 18,061 点赞和 700 万+ 下载量稳居榜首，显示其对开源社区的强劲吸引力。视频生成领域出现巨大流量，[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) 获得超过 200 万次下载，成为视频创作的新宠。Qwen 的图像生成模型 [Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) 同样表现抢眼，下载量接近 280 万次。此外，DeepSeek 和 Black Forest Labs 的多模态与图像模型也持续占据热门位置。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,061 | 7,586,857 | 本周热度最高模型，通用对话能力强。庞大的下载量表明其在通用 LLM 任务中的核心地位。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,360 | 2,530,599 | Qwen 的轻量化推理版本，下载量超 250 万。专为低延迟场景优化，适合对速度有要求的部署。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,672 | 1,431,582 | DeepSeek 家族的新成员，支持多模态输入。作为 Flash 版本，兼顾了性能与推理速度。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,022 | 115,341 | 基于 Gemma 的统一多模态模型，标签显示其用于"人性化"文本生成。较高的点赞数反映了特定社区的需求。 |
| [Qwen/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 263 | 7,345 | NVIDIA 提供的本地量化版本，采用 FP4 格式。专为边缘端或低显存设备的本地部署设计。 |
| [reflection/Beam-1.0-501B-A23B](https://huggingface.co/reflection/Beam-1.0-501B-A23B) | reflection | 184 | 2,930 | 一款 500B 参数量的 MoE 推理模型。标签显示其在代码和数学推理方面进行了针对性优化。 |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 522 | 15,410 | LiquidAI 的多模态模型，参数规模适中。适合在资源受限环境下进行多模态任务处理。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,623 | 2,039,447 | 视频生成模型，支持图生视频、文生视频及视频到视频。下载量突破 200 万，是该领域的流量霸主。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,768 | 1,902,047 | Meta 的 SAM 3 分割模型，用于掩码生成与特征提取。广泛的下载量印证了其在计算机视觉应用中的基础地位。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,844 | 1,981,704 | 百度推出的 OCR 模型，具备图像到文本转换能力。高下载量反映了文本识别需求的持续增长。 |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 1,952 | 27,737 | 支持图文到文本的多模态模型。作为 DeepSeek 家族的特定版本，其点赞数依然可观。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,091 | 439,528 | BFL 的 Flux 3 模型，为 ComfyUI 优化。下载量近 44 万，说明开发者社区正积极集成该模型。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 836 | 13,495 | 多说话人 TTS 模型，标签包含"剧本/戏剧"相关能力。适合有声书或播客等多角色语音合成。 |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 1,013 | 27,652 | 阿里 Qwen 的图像生成模型，支持文生图及图像编辑。Turbo 后缀表明其侧重于推理速度。 |
| [OpenMOSS-Team/MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 495 | 4,547 | 指令微调版的图像生成模型，基于开源的 MOSS 基础模型。适合进行特定风格的图像生成。 |
| [Lightricks/LTX-2.5 补充: black-forest-labs/flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 565 | 78,897 | Flux 3 的 Diffusers 格式版本，区别于 ComfyUI 版本。方便研究者直接在 Python 环境中调用。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,766 | 172,474 | 用于特征提取的嵌入模型。接近 17 万的下载量使其成为构建 RAG 或搜索系统的常用工具。 |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 290 | 3,111 | 专注于 CPU 推理的 OCR 模型，支持 ONNX 格式。适合在纯 CPU 环境下进行文档数字化处理。 |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 230 | 4,008 | 时序预测基础模型，参数规模较小（209M）。适合在边缘设备上进行简单的时间序列预测。 |
| [tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 247 | 2,145 | 腾讯的对话模型，30B 总参数量激活 3B。这种 MoE 架构旨在降低推理成本，适合长对话。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,707 | 2,788,283 | 社区量化的 Qwen 图像模型，采用 GGUF 格式。近 280 万下载量表明本地化部署需求极强。 |
| [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF) | LiquidAI | 226 | 132,848 | LFM2.5 的 GGUF 量化版本，支持 llama.cpp 等工具。方便在本地设备上进行轻量级多模态推理。 |
| [dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 189 | 2,803 | 去限制化的 FP8 量化版本，基于 DeepSeek V4.1。主要面向需要更高灵活性的特定使用场景。 |
| [meta-models/Muse-Spark-Open-816B-A42B-NVFP4](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4) | meta-models | 192 | 5,553 | 针对 NVIDIA 硬件优化的 NVFP4 量化模型。由官方直接提供量化版本，简化了高性能推理的部署流程。 |
| [lodestones/MOSS-Image-SFT-8-steps-dmd](https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd) | lodestones | 179 | 54,814 | 社区微调项目，基于 MOSS 图像模型进行优化。8 步采样标签显示其专注于生成速度的提升。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 294 | 924,574 | 将 MOSS 图像模型集成到 ComfyUI 环境的工作流配置。近 93 万下载量说明 ComfyUI 社区高度活跃。 |
| [lodestones/Kromoss](https://huggingface.co/lodestones/Kromoss) | lodestones | 171 | 5,365 | 基于 MOSS 图像模型的社区微调变体。体现了开源社区围绕基础模型进行多样化探索的趋势。 |

## 生态信号
本周 Hugging Face 榜单反映出多模态与视频生成生态的爆发。Qwen 和 Lightricks 家族的势头最为强劲，尤其在视频和图像生成领域展现出统治力。开源权重模型占据绝对主导地位，社区高度热衷于对大型模型进行本地化优化，这从 [Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) 和 [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) 的超高下载量可见一斑。量化格式（如 GGUF、NVFP4）已成为模型发布的标准配置之一，旨在降低用户的部署门槛。这种"基座模型+社区量化"的模式，极大地推动了 AI 在边缘设备和消费级硬件上的普及。

## 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：作为视频生成的流量霸主，它不仅是技术趋势的领先者，更是研究视频生成模型架构与优化方向的绝佳样本。
2.  **[abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)**：其惊人的下载量证明了将大模型量化至本地运行（如通过 ComfyUI 和 GGUF）的巨大市场需求，是部署工程化研究的重点。
3.  **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)**：OCR 领域的高热度模型，对于依赖文档数字化和数据处理的应用场景具有极高的实用价值，值得集成测试。