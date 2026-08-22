# Hugging Face Trending Models Digest 2026-08-22

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-22 01:52 UTC

---

## Hugging Face Trending Models Digest (2026-08-22)

### 1. Today's Highlights
Today's Hugging Face trending models reveal two dominant trends: the Qwen3.8 family (27B parameter class) dominates the download charts, with the community producing extensive uncensored/abliterated/GGUF fine-tunes totaling tens of millions of downloads; MiniMaxAI's video generation model MiniMax-H3 leads the multimodal category with 4,295 likes and 3.61M downloads, showing sustained heat in the video generation track. Moonshot AI's Kimi-K3 tops language models with 10,913 likes, while DeepSeek-V4-Flash demonstrates cost-performance advantage with 2.83M downloads. The overall ecosystem shows active open-weight development, diversified quantization techniques, and explosive growth in video generation models.

### 2. Trending Models

**🧠 Language Models**
| Model | Author | Likes | Downloads | Summary |
|:---|:---|---:|---:|:---|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,970 | 1,726,651 | The flagship of the Qwen3.8 series with 11,970 weekly likes leading the entire platform; supports image-text-to-text multimodal conversation, making it today's most popular open-source language model. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,913 | 2,448,810 | Moonshot AI's Kimi-K3 follows closely with nearly 11K likes; compressed tensor technology significantly lowers deployment barriers with over 2.4M downloads. |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,140 | 15,702 | Qwen3.8's 2.4-trillion-parameter MoE model with 95B experts, representing Qwen's布局 at extreme parameter scales. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,739 | 505,113 | Muse Glimmer 30B stands out with 1,739 likes; its image-text-to-text multimodal capability is well recognized by the community. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 709 | 49,601 | DeepSeek V4 Pro targets high-quality reasoning and conversation; modest download numbers reflect its specialized positioning. |

**🎨 Multimodal & Generation**
| Model | Author | Likes | Downloads | Summary |
|:---|:---|---:|---:|:---|
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,295 | 3,614,443 | MiniMax's latest video generation model supporting text-to-video and image-to-video; 4,295 likes and 3.61M downloads make it today's hottest multimodal model. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,494 | 654,175 | LTX-2.5 supports text/image/video input modes for video generation; 654K downloads show strong penetration among creator communities. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,164 | 15,678 | MiniMax's music generation model with text-to-audio capability; 1,164 likes signal growing interest in audio generation. |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 311 | 0 | A fine-tune of MiniMax-H3 for video generation; still early but demonstrates the extensibility of the H3 ecosystem. |

**🔧 Specialized Models**
| Model | Author | Likes | Downloads | Summary |
|:---|:---|---:|---:|:---|
| [ornith-ai/Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 291 | 9,165 | Ornith 1.5 uses a 35B total / 3B activated MoE architecture balancing performance and efficiency; a new Qwen3.5-series competitor. |
| [superwhisper/s1-mini](https://huggingface.co/superwhisper/s1-mini) | superwhisper | 191 | 1,136 | A lightweight ASR + text-generation hybrid model targeting speech recognition and generation scenarios. |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,371 | 0 | MLX/Jinja chat template fix for Qwen; 1,371 likes indicate template issues are a frequent community pain point. |

**📦 Fine-tunes & Quantizations**
| Model | Author | Likes | Downloads | Summary |
|:---|:---|---:|---:|:---|
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,511 | 5,804,917 | unsloth's GGUF quantization of Qwen3.8-27B; 5.8M downloads is the highest on the entire platform, reflecting strong community demand for efficient local inference. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,613 | 2,833,064 | DeepSeek V4 Flash is a cost-performance benchmark with 3,613 likes and 2.83M downloads, balancing performance and inference speed. |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 824 | 107,520 | Uncensored FP8 quantization of Qwen3.8-27B using abliteration; meets specific user demands for unrestricted output. |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 821 | 18,193 | Same upstream model but optimized for Apple Silicon MLX framework. |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 572 | 1,126,222 | Another uncensored GGUF variant; 1.12M downloads shows sustained community demand for uncensored models. |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 232 | 338,221 | huihui-ai's abliterated GGUF version; 338K downloads reflect growing acceptance of abliteration technology. |
| [0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 213 | 421,918 | Heretic-method abliterated variant; 422K downloads showcases diversity in abliteration implementations. |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 328 | 1,013,917 | unsloth's NVFP4 quantization; 1M+ downloads reflects popularity of NVIDIA's proprietary quantization format for local inference. |
| [Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 201 | 197,667 | Blackfrost's abliterated GGUF variant; further enriches the Qwen3.8 quantization ecosystem. |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 238 | 74,038 | Ridge-regularized fine-tune of Qwen3.8 GGUF; explores the combination of fine-tuning and quantization. |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 444 | 123,956 | OBLITERATED technique in both MLX and GGUF formats; demonstrates diverse implementation of abliteration. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 424 | 357,225 | Aggressive MTP (Multi-Token Prediction) + uncensored GGUF; 357K downloads reflects demand for accelerated inference. |
| [z-lab/Qwen3.8-27B-DFlash2](https://huggingface.co/z-lab/Qwen3.8-27B-DFlash2) | z-lab | 176 | 21,092 | DFlash2 speculative decoding optimization; explores speculative decoding applications on Qwen3.8. |
| [DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 171 | 155,208 | Cold Fusion + GAIN Training + MTP multi-technique fusion GGUF; 155K downloads showcases community technical innovation diversity. |

### 3. Ecosystem Signal
The Qwen3.8-27B family is today's absolute traffic center: the base model plus 13 community fine-tune/quantization variants account for over 12 million cumulative downloads. Uncensored/abliterated variants exceed half of all variants, reflecting sustained community demand for removing safety alignment—and simultaneously sparking discussion about model safety boundaries. GGUF remains the preferred format for local inference, with unsloth's quantization version exceeding 5.8M downloads. In video generation, MiniMax-H3 establishes leadership with 3.61M downloads, followed by LTX-2.5. Kimi-K3's 10,913 likes demonstrate the strong momentum of Chinese model makers in the open-source ecosystem. The overall ecosystem shows a pattern of "base model centralization (Qwen/DeepSeek/MiniMax) + highly fragmented fine-tune ecology."

### 4. Worth Exploring
1. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 4,295 likes, 3.61M downloads. The benchmark for open-source video generation, representing the current highest level in the category. Essential for research and integration.
2. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — 5.8M downloads, the highest on the platform. The premier solution for efficient local inference; its quantization strategy warrants deep analysis.
3. **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — 10,913 likes with compressed tensor technology lowering deployment costs. An important战略布局 by a Chinese model maker in the open-source ecosystem worth watching long-term.