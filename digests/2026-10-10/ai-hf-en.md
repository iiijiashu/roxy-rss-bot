# Hugging Face Trending Models Digest 2026-10-10

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-10 00:20 UTC

---

## 1. Today's Highlights
The Qwen 3.8 series dominates the trending landscape, with both the base 27B model and its Flash-Next variant leading in download volume, signaling strong community adoption for the qwen3_5 architecture. A distinct wave of high-quantization community builds, such as the 2-bit Ternary Bonsai and ISTA-DASLab’s GSQ-RCO variants, reflects a major shift toward running large frontier models on consumer-grade hardware. Beyond text, Lightricks’ LTX-2.5 video model and Cloudflare’s new "clef" multimodal models show the ecosystem expanding beyond pure LLMs into visual and audio processing. The presence of numerous "uncensored" and "abliterated" fine-tunes across multiple families indicates a sustained, high-demand niche for unfiltered generative AI.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,349 | 6,783,589 | A flagship 27B multimodal language model from the Qwen team that supports conversational and image-text tasks. It is trending due to massive community adoption, evidenced by nearly 6.8 million downloads. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,060 | 1,751,752 | An experimental qwen4_exp variant designed for rapid, lightweight image-text-to-text processing. It is trending because it offers a fast inference path for developers needing low-latency multimodal performance. |
| [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1) | Aleph-Alpha | 842 | 8,474 | A reasoning-focused Mixture of Experts (MoE) text-generation model that utilizes vLLM for efficient inference. It is trending among researchers interested in structured reasoning capabilities within an open MoE architecture. |
| [LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 236 | 7,302 | A compact 3B parameter liquid multimodal model optimized for on-device or edge image-text tasks. It is trending as a lightweight solution for applications where compute resources are strictly limited. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,064 | 1,687,531 | A single-file diffusion model capable of bidirectional image-to-video and text-to-video generation. It is the top video model on the list, highlighted by its high download count for its comprehensive generation pipeline. |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 1,942 | 12,066 | An edge-optimized image-text-to-text model that processes visual inputs alongside language queries. It is trending as part of Cloudflare’s strategy to bring multimodal AI inference directly to the network edge. |
| [Cloudflare/clef-flash](https://huggingface.co/Cloudflare/clef-flash) | Cloudflare | 713 | 18,971 | A faster, more efficient iteration of the clef model family designed for rapid edge processing. It is trending because it maintains multimodal capabilities while prioritizing lower inference latency. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 3,157 | 122,311 | A high-fidelity text-to-image and image-editing generation model powered by the Qwen architecture. It is trending for its strong performance in both creating and modifying visual content via prompt. |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 288 | 0 | A specialized variant of Qwen's image model explicitly tuned for accelerated, high-speed generation. It is trending as a new release that targets users who prioritize generation speed over maximum detail. |
| [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning) | canberkkkkkk | 321 | 12,118 | A Turkish-focused text-to-speech model that utilizes EMA for high-quality speech synthesis. It is trending as a leading open-resource for localized, natural-sounding voice generation. |
| [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle) | Cactus-Compute | 266 | 5,558 | An on-device automatic speech recognition model designed for privacy-focused environments. It is trending because it enables real-time speech-to-text processing without sending data to the cloud. |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,338 | 245,270 | An image-to-image LoRA designed specifically for high-fidelity face swapping and editing. It is trending within the Qwen-Image ecosystem for its exceptional utility in targeted visual modifications. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,345 | 29,185 | A multimodal feature-extraction model designed to generate rich, unified embeddings for text and images. It is trending as a robust tool for building advanced semantic search and retrieval-augmented generation (RAG) systems. |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 217 | 41,582 | A highly efficient, quantized GGUF conversion of Google's EmbeddingGemma 2 model. It is trending because it allows developers to run powerful multimodal embeddings on local devices with minimal memory overhead. |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,426 | 41,468 | A text-classification model engineered specifically for fast, calibrated "system-one" decision-making. It is trending for its exceptional utility in low-latency classification tasks where accuracy is critical. |
| [Phocinae/Phocinae-Largha-150M-v1](https://huggingface.co/Phocinae/Phocinae-Largha-150M-v1) | Phocinae | 228 | 89 | A compact 150M modernBERT model tuned for fill-mask tasks and specialized decision-making. It is trending among niche developers looking for ultra-lightweight, highly specific text classification tools. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,769 | 2,013,268 | An "uncensored" GGUF quantization of Qwen's image model, optimized for use within the ComfyUI ecosystem. It is the highest-liked quantized model on the list, driven by a demand for unfiltered visual generation. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,980 | 6,452,782 | A massive, highly optimized GGUF conversion of the Qwen3.8-27B model that supports base and quantized architectures. It is the most-downloaded model on the platform this week, enabling easy local deployment of a flagship LLM. |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 747 | 3,559,321 | A highly advanced, mixed-precision GSQ-RCO quantization that pushes the limits of compressing large models. It is trending for its massive download volume, proving high demand for running cutting-edge models with extreme compression. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 2,097 | 1,490,741 | A corresponding GSQ-RCO mixed-precision quantization specifically tailored for the 27B Qwen model. It is trending because it delivers a premium, high-quality compressed experience for local llama.cpp users. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,568 | 4,389,072 | An aggressive 2-bit ternary quantization of a 27B model built for the llama-cpp ecosystem. It is trending for successfully running a near-frontier model on extremely constrained hardware. |
| [orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF) | orcarouter | 487 | 21,406 | An "uncensored" and cyber-themed GGUF build of a 27B model tailored for the llama.cpp ecosystem. It is trending within a specific niche of users seeking highly specialized, unfiltered interactive experiences. |
| [orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF) | orcarouter | 699 | 499,273 | An "abliterated" and uncensored version of Qwen’s Flash-Next model, removing built-in safety constraints. It is trending due to a strong community preference for generating unfiltered text without standard safety blockers. |
| [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw) | Infatoshi | 309 | 2,277 | A 3.0 bits-per-word EXL3 quantization of a GLM MoE model, modified to be "uncensored" for unrestricted use. It is trending among users who prioritize high-resolution quantizations for maximum base-model fidelity. |
| [SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF) | SC117 | 171 | 684,487 | A highly compressed and "abliterated" build of the Qwen Flash-Next model that merges extreme quantization with censorship removal. It is trending as an optimal solution for users wanting both speed and unrestricted output on local setups. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,610 | 2,000,216 | A highly complex community fine-tune that merges uncensored, coding, and MTP features into a single turbocharged GGUF. It is trending for its massive download count, representing the "kitchen sink" approach to maximizing local LLM capabilities. |

## 3. Ecosystem Signal
The Hugging Face ecosystem is clearly shifting toward aggressive local-first deployment, driven by an explosion of community-driven quantizations. Qwen is the clear momentum leader, with multiple entries from the qwen3_5 and qwen4_exp families dominating both the base model and fine-tune categories. While major labs like Google, Cloudflare, and DeepSeek are actively releasing open-weight, specialized, and edge-optimized models, a massive parallel trend is the proliferation of "uncensored" and "abliterated" builds. Community quantization techniques are pushing the boundaries of what is possible on local hardware; the presence of 2-bit Ternary models and advanced GSQ-RCO mixed-precision builds proves that users are highly motivated to run near-frontier models on consumer GPUs without relying on proprietary cloud APIs.

## 4. Worth Exploring
*   **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf):** It is fascinating to study how this 2-bit ternary quantization achieves a massive 4.3M downloads. It serves as a critical case study in how extreme compression techniques are unlocking access to large language models for users with very limited memory.
*   **[google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2):** This model is worth exploring for its unified multimodal embedding capabilities. For developers building advanced retrieval-augmented generation (RAG) systems, it offers a seamless way to embed both text and images into a single semantic space for highly accurate search.
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5):** This single-file diffusion model is a prime example of where video generation is heading. It is worth studying for its bidirectional image-to-video and text-to-video capabilities, making it highly valuable for exploring cutting-edge generative media workflows.