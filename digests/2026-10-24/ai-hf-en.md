# Hugging Face Trending Models Digest 2026-10-24

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-24 00:20 UTC

---

1. **Today's Highlights**
The Qwen3.8-27B model dominates the leaderboard with over 7.7 million downloads, signaling a massive surge in adoption for this new version of Alibaba’s Qwen family. In the generative video space, Lightricks’ LTX-2.5 stands out with 2 million downloads, establishing itself as a leading open-weight image-to-video engine. A distinct trend is the explosion of "uncensored" and community-modified variants, such as the heavily downloded abenzerps/Qwen-Image-2.1-Uncensored-Quantized and dealignai’s DeepSeek derivatives. NVIDIA is also making waves by releasing optimized FP4 local quantizations of Qwen models, catering to the local inference market. Finally, specialized domains are seeing growth with Tencent’s Hy-Memory model for conversational memory and Mistral’s time-series forecasting foundation model.

2. **Trending Models**

### 🧠 Language Models (LLMs, chat models, instruction-tuned)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,294 | 7,710,011 | This flagship 27B parameter multimodal LLM is the top-trending model on the platform. Its massive download count indicates rapid integration into developer stacks for high-performance text and image understanding. |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 2,581 | 57,715 | A new iteration of the DeepSeek V4.1 Flash series offering efficient image-text-to-text generation. It is trending due to its balance of speed and capability in the 1017 release window. |
| [meta-models/Muse-Spark-Open-816B-A42B](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | meta-models | 679 | 5,196 | Meta’s massive open-weight model featuring an 816B parameter scale with 42B active parameters. It is gaining attention for its extreme scale and potential for high-end reasoning tasks. |
| [tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 302 | 3,270 | A specialized conversational model designed to handle long-term memory contexts efficiently. It targets applications requiring persistent state across multi-turn interactions. |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,115 | 129,025 | Based on the Gemma 4 unified architecture, this model is fine-tuned specifically to make AI-generated text sound more human. Its high download count reflects strong demand for "de-AI"ing content. |
| [orcarouter/OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) | orcarouter | 211 | 22,314 | A vision-language model specialized in cybersecurity, reverse engineering, and security analysis. It serves the niche but critical need for AI-assisted security operations. |
| [nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16) | nvidia | 176 | 3,769 | A compact 4B parameter model from NVIDIA’s Nemotron Labs series. It offers high performance for its size, suitable for edge devices and constrained local deployments. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 9,033 | 2,026,951 | A state-of-the-art video generation model supporting image-to-video and text-to-video workflows. Its 2M download volume highlights a massive shift toward open-weight video synthesis. |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,908 | 2,398,071 | An uncensored quantized variant of Qwen’s image generation model, popular among creators looking to bypass content restrictions. Its download count surpasses the base model's in some metrics due to high utility in ComfyUI. |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,983 | 1,837,047 | Meta’s Segment Anything Model 3, now extended for video and feature extraction. It is a fundamental tool for modern computer vision pipelines, driving its high adoption. |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,406 | 534,837 | The ComfyUI-native version of Flux 3 Klein, optimized for workflow integration. It is trending because it lowers the barrier to entry for professional-grade image editing and generation. |
| [OpenMOSS-Team/MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 650 | 7,658 | The supervised fine-tuned version of the MOSS Image model, ready for high-quality text-to-image generation. It is part of a broader push by the OpenMOSS team to open-source strong image models. |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 947 | 17,017 | A multi-speaker text-to-speech model designed for dramatic and narrative audio generation. It targets content creators needing realistic, multi-voice synthesis for audiobooks or video. |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 391 | 4,033 | A CPU-optimized OCR model using ONNX runtime, making it accessible for lightweight devices. It is trending among developers needing robust text extraction without heavy GPU resources. |

### 🔧 Specialized Models (code, math, medical, embeddings)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,871 | 192,741 | The second generation of Google’s embedding models based on Gemma, optimized for feature extraction. It is a key component for RAG and search systems requiring high-quality semantic vectors. |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 314 | 6,815 | A specialized foundation model for time-series forecasting with a compact 209M parameter size. It targets industrial and financial applications needing efficient predictive analytics. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 2,017 | 1,679,145 | A heavily modded, uncensored GGUF quantization of Qwen3.8-27B with multiple community "fusions." Its massive download count reflects the high demand for modified local LLMs. |
| [nvidia/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 327 | 11,197 | An official NVIDIA quantization of Qwen in FP4 format for local inference. It demonstrates the push toward extreme compression to run large models on consumer hardware. |
| [dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 296 | 4,141 | An FP8 quantized, uncensored version of the DeepSeek Flash model. It appeals to users who want the efficiency of quantization without safety filters. |
| [unsloth/flint-GGUF](https://huggingface.co/unsloth/flint-GGUF) | unsloth | 190 | 33,277 | The Unsloth team's optimized GGUF version of the Flint model. It lowers the hardware requirements for running this conversational model, driving steady adoption. |
| [lodestones/MOSS-Image-SFT-8-steps-dmd](https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd) | lodestones | 207 | 79,664 | A fine-tune of MOSS-Image-SFT using 8-step DMD for faster image generation. It is trending among ComfyUI users looking to reduce inference time while maintaining quality. |

3. **Ecosystem Signal**
The ecosystem is currently defined by the rapid adoption of the Qwen3.8 series, which has sparked a secondary market of high-impact community modifications. Notably, "uncensored" variants and aggressive quantizations (FP4, GGUF) are driving the majority of download volume, indicating a user base prioritizing local control and reduced restrictions over official safety guidelines. Open-weight models are dominating the narrative, with Meta, Google, and Lightricks releasing assets that are immediately integrated into ComfyUI and other local frameworks. There is a clear trend toward specialized, smaller models like Timestral for time-series and IndrOCR for CPU-based tasks, suggesting a maturation of the ecosystem beyond general LLMs. Furthermore, the momentum behind video generation (LTX-2.5) signals that the next frontier of open consumer AI is shifting from static images to dynamic media.

4. **Worth Exploring**
*   **Qwen/Qwen3.8-27B**: Essential for understanding the current state-of-the-art in open multimodal LLMs. Its sheer download volume and 18k likes make it the benchmark for performance/size tradeoffs in the 27B range.
*   **Lightricks/LTX-2.5**: A must-try for video generation. With 2M downloads, it represents the most accessible high-quality open-weight video engine available, crucial for anyone building or studying video synthesis pipelines.
*   **nvidia/Qwen3.8-Flash-Next-FP4-Local**: Highly valuable for studying extreme quantization. This model showcases how NVIDIA is enabling large language models to run on local hardware with minimal memory footprint, a key trend for the future of decentralized AI.