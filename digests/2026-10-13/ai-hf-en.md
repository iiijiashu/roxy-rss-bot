# Hugging Face Trending Models Digest 2026-10-13

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-13 00:20 UTC

---

1. **Today's Highlights**
The Hugging Face trending ecosystem this week is heavily dominated by the Qwen 3.8 family, with multiple variants ranging from base 27B models to specialized "Flash" and "Uncensored" quantizations capturing the highest volume of likes and downloads. A significant portion of the top 30 list consists of community-generated GGUF quantizations and fine-tunes, indicating strong demand for local and edge-device deployment of large language and multimodal models. Google’s latest EmbeddingGemma-2 is making a notable entry in the feature extraction space, drawing attention for its embedding capabilities alongside third-party quantized versions. Additionally, major corporate releases from Cloudflare, Lightricks, and Facebook are highlighting active expansion in on-device, video generation, and segmentation tasks.

2. **Trending Models**

### 🧠 Language Models (LLMs, chat models, instruction-tuned)
*Note: The following multimodal text-generation models are categorized here due to their `image-text-to-text` pipeline, but they are primarily LLMs with vision capabilities.*

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,576 | 6,895,303 | This flagship image-text-to-text model is the most popular release of the week, establishing a strong baseline for conversational and multimodal tasks. Its high download count indicates widespread adoption for local and production environments. |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 1,320 | 46,070 | A specialized text-generation model designed to modify outputs to appear more human-written. It is trending for its utility in content creation and AI-detection evasion. |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 371 | 242,329 | This 27B text-generation model emphasizes efficient 2-bit quantization and robust tool-calling capabilities. It is trending among developers seeking lightweight, functional LLMs for agentic workflows. |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 342 | 11,866 | A compact 3B parameter model utilizing LiquidAI's Liquid Foundation Model architecture for vision-language tasks. It is trending for its ability to run on mobile or on-device hardware. |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 914 | 14,018 | An Mixture-of-Experts text-generation model optimized for reasoning tasks. It is gaining traction for its support of vLLM inference in production pipelines. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,148 | 1,934,542 | A faster, "Flash" variant of the Qwen 3.8 architecture designed for low-latency image-text interactions. It is trending for its balance of speed and conversational quality. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,058 | 6,597,425 | A community-quantized GGUF version of the Qwen 3.8 27B model created by unsloth. It is trending for its ease of use with llama.cpp for local, consumer-hardware deployment. |
| [Qwen/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 283 | 75,302 | A highly optimized Qwen fine-tune focused on efficient reasoning and coding benchmarks. It is trending among power users looking to maximize specific task performance without extra hardware. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,694 | 2,025,498 | A merged, uncensored GGUF quantization that combines multiple Qwen and reasoning enhancements. It is trending for its "heretic" fine-tuning style that removes typical safety constraints. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,658 | 4,615,462 | An aggressive 2-bit ternary quantization of a 27B model designed for extreme resource constraints. It is trending for proving that high-performance LLMs can run on minimal hardware. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 632 | 6,787 | A fast, turbo variant of Qwen's image generation and editing pipeline. It is trending for its speed advantages over its base model in high-frequency generation tasks. |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,096 | 2,188,658 | A quantized, uncensored version of the Qwen-Image-2.1 model compatible with ComfyUI. It is trending for its massive download volume among AI art practitioners using local nodes. |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 373 | 161,715 | A specialized GGUF quantization of the Turbo image model that removes standard content filters. It is trending for local, uncensored image generation using llama.cpp-style tooling. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,261 | 142,375 | The foundational release for Qwen's second-generation image pipeline, supporting both generation and editing. It is trending as the baseline model for most subsequent fine-tunes and quantizations. |
| [speridlabs/iris-3b](https://huggingface.co/speridlabs/iris-3b) | speridlabs | 196 | 706 | A small 3B text-to-image model operating in the pixel space rather than latent space. It is trending for its novel architectural approach to diffusion models. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,481 | 1,719,766 | An advanced video model supporting image-to-video, text-to-video, and video-to-video transformations. It is trending for its support of a unified "diffusion-single-file" format that simplifies deployment. |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 360 | 18,643 | An automatic speech recognition model specifically designed for on-device and edge computing. It is trending among developers looking for robust, low-latency STT solutions. |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 390 | 20,310 | A text-to-speech model with specific optimizations for the Turkish language. It is trending for its localized voice synthesis capabilities in non-English markets. |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,155 | 2,054,071 | Facebook's latest segmentation model extending the SAM architecture to include video support. It is trending for its massive utility in computer vision pipelines and feature extraction. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,414 | 1,294,550 | A "Flash" image-text-to-text model from DeepSeek aimed at fast inference. It is trending for its open-weight status and rapid adoption in conversational applications. |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,092 | 15,064 | Cloudflare's open image-text-to-text model built on a Qwen 3.5 base architecture. It is trending for its enterprise-backed development and integration into WebAssembly and edge computing. |
| [Cloudflare/clef-flash](https://huggingface.co/Cloudflare/clef-flash) | Cloudflare | 785 | 23,285 | A lighter, faster variant of Cloudflare's CLEF model designed for low-resource environments. It is trending for its focus on on-device multimodal inference. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,935 | 115,763 | Google's next-generation embedding model designed for feature extraction and multimodal tasks. It is trending as a highly-accurate, open-source alternative to proprietary embedding APIs. |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 283 | 71,914 | A quantized GGUF version of Google's EmbeddingGemma-2 model for local deployment. It is trending among RAG developers who need powerful embeddings without cloud dependencies. |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,514 | 1,205,646 | A specialized image-to-text model designed for highly accurate and scalable OCR tasks. It is trending for its massive download volume among enterprise document-processing pipelines. |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,535 | 45,062 | A text-classification model built around a "system-one" architecture for calibrated, rapid decision-making. It is trending among cognitive science and AI researchers looking for non-hallucinatory classifiers. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 829 | 4,413,142 | A quantized GGUF version of the Qwen 3.8 Flash-Next model using GSQ and RCO mixed-precision techniques. It is trending among advanced users optimizing performance-to-memory ratios. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 2,177 | 1,482,471 | An academic research quantization of the 27B Qwen model using advanced mixed-precision algorithms. It is trending as a highly efficient alternative to standard quantization methods. |
| [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF) | Venastine-Research | 705 | 52,788 | A 29B parameter text-generation model quantized to a 4B active-parameter configuration. It is trending among efficiency-focused developers maximizing output per compute cycle. |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 811 | 629,886 | An "abliterated" and uncensored GGUF version of the Qwen 3.8 Flash-Next model. It is trending among users seeking unrestricted multimodal text generation for local deployment. |

3. **Ecosystem Signal**
The model ecosystem is currently experiencing a massive consolidation around the Qwen 3.8 family, which is dominating across every category. The sheer volume of community fine-tunes—particularly the "Uncensored" and "Flash" variants—indicates a strong desire for local, unrestricted, and high-speed multimodal capabilities that can bypass enterprise-level hardware requirements. A clear trend is shifting from proprietary, cloud-dependent models to open-weight architectures that are specifically designed for on-device deployment. This is evidenced by the popularity of Cloudflare's CLEF models, LiquidAI's edge-optimized architectures, and Cactus-Compute's on-device speech recognition. 

Quantization techniques are evolving beyond simple bit-reduction; advanced mixed-precision methods like GSQ and RCO, as well as aggressive 2-bit ternary quantizations, are rapidly becoming the standard for running 27B+ parameter models on consumer hardware. The RAG and embedding ecosystem is also maturing, with the widespread adoption of Google's EmbeddingGemma-2 showing that open-source multimodal embeddings are now viable primary alternatives to proprietary APIs for production search and retrieval applications.

4. **Worth Exploring**
*   **google/embeddinggemma-2**: This model is a must-try for anyone building RAG or search systems. It offers a massive leap in open-source embedding quality, making it highly attractive for reducing cloud API costs while improving retrieval accuracy.
*   **Lightricks/LTX-2.5**: For video developers, this model is worth studying because of its support for a "diffusion-single-file" format. This significantly simplifies the deployment and integration of complex video generation pipelines into local environments.
*   **convaiinnovations/laya**: This classifier is highly interesting for those exploring AI interpretability and cognitive science. Its focus on "system-one" rapid decisions and calibrated outputs makes it a compelling alternative to probabilistic, token-based LLM classifiers in fast-paced tasks.