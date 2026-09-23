# Hugging Face Trending Models Digest 2026-09-23

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-23 00:20 UTC

---

### 1. Today's Highlights

Qwen's latest releases, particularly the `Qwen3.8-27B` and `Qwen-Image-2.1`, are dominating the ecosystem with massive download volumes, signaling strong community adoption for both efficient multimodal text generation and advanced image synthesis. The rise of `DeepSeek-V4.1-Flash` highlights a growing preference for high-performance, specialized image-text-to-text models that balance capability with responsiveness. A significant trend toward local execution is evident, with multiple top-tier models offering `GGUF` and `MLX` quantizations, such as `Ternary-Bonsai-2-27B` and various community fine-tunes of the Qwen 3.8 family. Furthermore, video generation is seeing a surge with `Lightricks/LTX-2.5` and `MiniMaxAI/MiniMax-H3`, indicating a shift toward more robust open-weight video synthesis tools.

### 2. Trending Models

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,608 | 542,014 | A high-performance flash model designed for image-text-to-text tasks. It is trending due to its efficient architecture and strong performance metrics. |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,075 | 7,079,646 | A large-scale multimodal LLM capable of conversational image-text-to-text processing. It leads the trending list with over 7 million downloads, reflecting its status as a versatile foundation model. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,603 | 787,525 | An experimental next-generation flash model optimized for speed and conversational flow. Its high like count suggests strong community anticipation for its reduced latency features. |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,383 | 30,627 | A conversational text-generation model with a 29B parameter base and 4B active parameters. It is trending for its balance between model depth and inference efficiency. |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,663 | 508,950 | A compact 2B LLM designed for resource-constrained environments. Its high download count indicates widespread use in edge computing and mobile applications. |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 1,008 | 12,574 | A 9B parameter model specialized for agentic text generation. It is gaining traction among developers building autonomous agents and workflow automation tools. |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 275 | 1,516 | An 80B parameter foundation model with an active 3B layer configuration. It represents a new entry in the space of large-scale active parameter models. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 1,794 | 16,242 | An advanced image generation and editing model. It is trending for its high fidelity output and support for complex image manipulation tasks. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,793 | 1,630,125 | A comprehensive video generation suite supporting image-to-video, text-to-video, and video-to-video pipelines. It is a top trending model due to its versatility and high download volume. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,599 | 3,766,997 | A state-of-the-art text-to-video and image-to-video generation model. It leads the video category with nearly 4 million downloads, highlighting its popularity among creators. |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 969 | 20,904 | A music generation model featuring symbolic planning and agentic editing capabilities. It stands out for its approach to structured audio synthesis. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,881 | 2,569,604 | A 2-bit ternary quantization of a 27B model optimized for llama.cpp. Its massive download count shows strong demand for efficient local inference. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,524 | 7,019,401 | The official community quantization of the Qwen 3.8 27B model. It mirrors the high popularity of the base model, facilitating easy local deployment. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,086 | 1,397,909 | A highly specific community fine-tune combining uncensored, coder, and turbo features. It is trending among users seeking specialized, less restricted model behavior. |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 337 | 43,477 | An MLX-optimized 2-bit ternary quantization for Apple Silicon devices. It is notable for providing efficient local performance on Macs. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,579 | 1,363,176 | A mixed-precision quantization using the GSQ-RCO method. It is popular among researchers and power users seeking optimal accuracy-per-byte in GGUF format. |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 621 | 283,359 | A community fine-tune of the MiniMax H3 video model. It is trending for specific aesthetic or functional modifications to the base video generation pipeline. |

### 3. Ecosystem Signal

The Qwen model family is clearly gaining the most momentum, with multiple variants spanning text, image, and quantized formats occupying top trending spots. The ecosystem shows a strong shift toward open-weight models, where community efforts like `unsloth` and `prism-ml` are critical in making large models accessible on consumer hardware through aggressive quantization techniques (ternary, 2-bit, mixed-precision). While proprietary models exist, the trend favors open-source multimodal architectures that support local inference, evidenced by the high download counts for `GGUF` and `MLX` versions. This democratization of access is driving rapid adoption of complex tasks like video generation (`Lightricks`, `MiniMax`) and agentic workflows, indicating a maturing ecosystem that balances performance with practical deployment constraints.

### 4. Worth Exploring

*   **Qwen/Qwen3.8-27B:** The most significant model on the list, offering a robust multimodal capability for image-text-to-text tasks. Its high like and download counts make it the essential baseline for current LLM research and application development.
*   **prism-ml/Ternary-Bonsai-2-27B-gguf:** Highly relevant for developers interested in the cutting edge of model compression. It demonstrates how ternary quantization can maintain utility at 2-bit, a critical trend for efficient local AI deployment.
*   **Lightricks/LTX-2.5:** A standout in the video generation space. Its support for multiple pipelines (text-to-video, image-to-video) makes it a versatile tool for creative and technical experimentation with open-weight video models.