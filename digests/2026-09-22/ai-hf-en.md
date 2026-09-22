# Hugging Face Trending Models Digest 2026-09-22

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-22 00:20 UTC

---

## Today's Highlights

The Qwen3.8 ecosystem is dominating the trending lists, with the base 27B model achieving over 15,000 likes and millions of downloads, alongside a surge in community quantizations and fine-tunes like the "Heretic Uncensored" GGUF variant. Video generation is seeing strong momentum, driven by MiniMaxAI’s MiniMax-H3 and Lightricks’ LTX-2.5, which offer high-fidelity image-to-video capabilities with significant download traction. Agentic and specialized architectures are emerging, such as m-a-p’s YuE2-3B for symbolic planning and Cactus-Compute’s needle3 for on-device tool-calling, indicating a shift toward more specialized, functional model roles. Additionally, ultra-efficient quantization formats like the 2-bit ternary GGUF variants from prism-ml are trending, signaling a growing demand for running large models on constrained hardware.

## Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,968 | 7,153,238 | A flagship image-text-to-text model that has become the center of the current trend. Its massive download count reflects broad adoption for conversational and multimodal tasks. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,542 | 774,778 | A next-generation experimental variant of the Qwen3.8 line focused on conversational interaction. It offers a faster, lighter alternative for users seeking real-time responsiveness. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,525 | 512,120 | An image-text-to-text model from DeepSeek designed for efficient text generation. It combines strong reasoning capabilities with a lighter footprint for faster inference. |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,120 | 18,394 | A conversational text-generation model that features a specific architectural design. It is trending due to its balance of performance and efficiency in dialogue tasks. |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,640 | 460,533 | A compact 2B parameter language model optimized for edge deployment. Its high download count relative to likes suggests widespread use in resource-constrained environments. |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 992 | 12,260 | A text-generation model with agentic capabilities for structured tasks. It is gaining attention for its ability to execute multi-step workflows autonomously. |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 1,739 | 0 | A text-classification model focused on calibrated decision-making. Its "System One" tag suggests a specialized approach to rapid, intuitive AI reasoning. |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 199 | 676 | A large base language model from Yandex's Alice AI team. It serves as a foundation for further fine-tuning in text-generation applications. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,570 | 4,046,917 | A high-performance video generation model supporting text-to-video and image-to-video. Its massive download volume indicates it is a primary tool for open-source video creation. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,665 | 1,626,742 | A comprehensive video generation suite that handles image, video, and text inputs. It is trending for its versatility in producing high-quality video from various modalities. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 1,439 | 6,523 | An image generation and editing model from the Qwen team. It is valued for its precise control over image modifications and creation. |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 947 | 18,759 | A text-to-audio model specialized in music generation and symbolic planning. It stands out for its agentic editing capabilities in audio workflows. |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 596 | 268,296 | A video generation model focused on image-to-video and video-to-video tasks. It is a community-optimized variant of the MiniMax H3 architecture. |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 219 | 5,078 | A multimodal vision-language model with a focus on spatial reasoning. It is trending for its ability to interpret and reason about complex visual scenes. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Cactus-Compute/needle3](https://huggingface.co/Cactus-Compute/needle3) | Cactus-Compute | 166 | 46,399 | An on-device model designed for tool-calling and function-calling. It is a key component for local agentic AI systems requiring low-latency responses. |
| [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 223 | 1,864 | An automatic speech recognition model from Netease Youdao. It is part of the Confucius series, which focuses on robust multilingual ASR performance. |
| [internlm/Atria-Dawn-Preview](https://huggingface.co/internlm/Atria-Dawn-Preview) | internlm | 225 | 978 | A preview model from InternLM that utilizes a specialized MoE architecture. It is notable for its bilingual support in Chinese and English with a focus on efficient inference. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,471 | 7,039,006 | The most popular quantized version of the Qwen3.8-27B model. Its massive download count underscores the critical demand for local, efficient deployment of large LLMs. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,729 | 2,227,879 | A 2-bit ternary quantization of a 27B model using the Bonsai architecture. It is trending for enabling large-scale model inference on extremely low-power devices. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,045 | 1,348,712 | A complex, "uncensored" fine-tune of Qwen3.8-27B merged with other model traits. It is popular in the community for its lack of typical safety filters in specific contexts. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,534 | 1,292,471 | A mixed-precision quantization using GSQ and RCO techniques. It offers a high fidelity alternative for running Qwen3.8-27B with optimized memory usage. |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 439 | 535,365 | A ComfyUI-optimized single-file version of Qwen's image model. It allows for seamless integration into the ComfyUI workflow for rapid image generation. |
| [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) | ukisai | 344 | 144,372 | An "efficient-thinking" quantized variant of the Qwen3.8-27B model. It is designed to balance reasoning depth with faster inference speeds. |
| [abenzerps/Qwen-Image-2.1-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-GGUF) | abenzerps | 619 | 33,232 | A GGUF quantization of the Qwen-Image-2.1 model for use in ComfyUI. It enables image generation on hardware with limited GPU memory. |

## Ecosystem Signal

The model ecosystem is currently dominated by the Qwen3.8 family, which has sparked a massive wave of community engagement in both quantization and fine-tuning. The presence of multiple high-download GGUF variants—ranging from standard 4-bit to experimental 2-bit ternary formats—indicates that local and edge deployment of large multimodal models is now a primary driver of adoption. Video generation is another critical growth area, with open-weight models like MiniMax-H3 and LTX-2.5 attracting millions of downloads, signaling a shift from text-centric AI to full multimodal creative pipelines. Furthermore, the rise of specialized "agentic" and "tool-calling" models like needle3 suggests the industry is moving toward models that can actively execute workflows rather than just generate text. The open-weight trend remains strong, with proprietary labs like DeepSeek and Qwen releasing their most capable models directly to the public, fostering a highly collaborative and derivative ecosystem.

## Worth Exploring

1.  **Qwen/Qwen3.8-27B**: This model is the clear leader in the current landscape. Exploring its capabilities in multimodal reasoning and its massive ecosystem of community fine-tunes will provide a deep understanding of where large-scale open models are headed in 2026.
2.  **MiniMaxAI/MiniMax-H3**: As one of the highest-downloaded video generation models, it is essential for studying the state-of-the-art in open-weight video synthesis. Its ability to handle multiple input modalities makes it a key benchmark for creative AI workflows.
3.  **prism-ml/Ternary-Bonsai-2-27B-gguf**: For those interested in the limits of hardware efficiency, this 2-bit ternary model is a must-see. It demonstrates how far quantization research has advanced, allowing near-frontier performance on extremely constrained devices.