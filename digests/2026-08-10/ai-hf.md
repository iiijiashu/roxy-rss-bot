# Hugging Face 热门模型日报 2026-08-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-10 08:31 UTC

---

## Hugging Face 热门模型日报 — 2026-08-10

### 1. 今日速览
今日Hugging Face热门模型呈现"视频生成爆发"与"开源LLM持续迭代"双主线。MiniMax-H3视频生成模型以3,319点赞和35,295下载领跑，社区围绕其ComfyUI集成、LoRA微调、GGUF量化形成完整生态链。DeepSeek-V4-Flash-0731以868,576下载量显示强劲采用势头，LiquidAI的LFM2.5-2.6B体现小模型效率路线。百度Unlimited-OCR以3,994点赞和292万下载成为OCR领域标杆。整体趋势显示视频生成、多模态融合和量化优化是社区关注焦点。

### 2. 热门模型

#### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|------|------|-----:|-----:|----------|
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 2,982 | 868,576 | DeepSeek V4 Flash版本，284B参数架构，在Terminal-Bench 2.1达到82.7%。下载量显示强劲采用势头，社区关注其开源策略和性能竞争力。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,423 | 1,510,032 | Kimi K3多模态模型，支持图像-文本到文本任务。10,423点赞显示社区高度认可，压缩张量技术体现效率优化。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 465 | 85,651 | LiquidAI的2.6B小参数语言模型，体现小模型效率路线。85,651下载显示其在资源受限场景的实用价值。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 276 | 4,747 | Ling 3.0 Flash版本，采用bailing_hybrid架构。4,747下载显示其在特定场景的 niche 应用。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 297 | 1,089 | Maple预览版，Mixture-of-Experts架构。1,089下载显示早期采用阶段。 |

#### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|------|------|-----:|-----:|----------|
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,319 | 35,295 | MiniMax H3图像-文本到视频生成模型，领跑今日热门榜。3,319点赞显示社区高度关注，支持text-to-video、image-to-video、image-text-to-video多模式。 |
| [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,063 | 480,762 | FLUX.1开发版文本到图像生成模型，14,063点赞为今日最高。480,762下载显示其作为基础模型的广泛采用。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 3,994 | 2,921,751 | 百度Unlimited-OCR模型，图像到文本任务。3,994点赞和292万下载使其成为OCR领域标杆，显示工业级应用的成熟度。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 271 | 543 | NVIDIA语音聊天模型，11B参数。543下载显示早期采用阶段，多arxiv引用体现学术背书。 |
| [Audio8/Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b) | Audio8 | 333 | 13,132 | Audio8文本到语音预览版，0.6B小参数。13,132下载显示其在TTS领域的实用价值。 |

#### 🔧 专用模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|------|------|-----:|-----:|----------|
| [Kwaipilot/KAT-Coder-V2.5-Dev](https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev) | Kwaipilot | 555 | 18,574 | KAT Coder V2.5开发版，代码生成专用模型。555点赞和18,574下载显示其在开发者社区的认可。 |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 217 | 5,651 | Mistral安全盾牌模型，3B参数。5,651下载显示其在安全评估场景的应用。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 133 | 482 | BigBang v1多模态模型，qwen3_5_moe架构。482下载显示早期阶段。 |

#### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|------|------|-----:|-----:|----------|
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,100 | 4,947,943 | MiniMax-H3的ComfyUI集成版本，494万下载为今日最高。显示社区对视频生成模型工作流集成的强烈需求。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 631 | 188,761 | DeepSeek V4 Flash的GGUF量化版本，188,761下载显示本地部署需求。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,827 | 2,390,692 | Qwen3.6 27B的无审查GGUF量化版本，239万下载显示社区对定制化模型的需求。 |
| [realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs) | realrebelai | 190 | 160,747 | MiniMax-H3的GGUF量化集合，16万下载显示量化版本的广泛采用。 |
| [Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot) | Abiray | 158 | 511,473 | MiniMax-H3的NVFP4/INT4/INT8量化版本，51万下载显示多精度量化的需求。 |
| [LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF) | LuffyTheFox | 462 | 396,282 | Qwen3.6 35B的Hermes V7无审查GGUF版本，39万下载显示大模型量化需求。 |

### 3. 生态信号
今日Hugging Face生态呈现三大趋势：**视频生成模型家族势头正旺**——MiniMax-H3及其衍生版本（ComfyUI集成、LoRA微调、GGUF量化、NVFP4量化）形成完整生态链，显示视频生成成为社区焦点。**开源权重持续主导**——DeepSeek-V4-Flash、Kimi-K3、Qwen3.6系列均保持开源策略，与闭源模型形成差异化竞争。**量化活动异常活跃**——GGUF、NVFP4、INT4、INT8等多种量化格式并存，反映本地部署和边缘计算需求旺盛。百度Unlimited-OCR的292万下载显示工业级专用模型的市场认可度。

### 4. 值得探索

1. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 今日点赞冠军，视频生成能力的突破性进展，其ComfyUI集成版本（494万下载）显示工作流整合价值，适合探索AI视频生成应用。
2. **[deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)** — 868,576下载量显示强劲采用势头，Terminal-Bench 2.1的82.7%成绩体现代码能力，适合评估开源LLM的性能边界。
3. **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)** — 292万下载和3,994点赞使其成为OCR领域标杆，工业级成熟度值得研究，适合需要高精度文本识别的应用场景。