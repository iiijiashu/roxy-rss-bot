# Hugging Face Trending Models Digest 2026-09-28

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-28 00:20 UTC

---

1. **Today's Highlights**
The Qwen ecosystem continues to dominate the Hugging Face hub, with the flagship Qwen3.8-27B attracting massive adoption through both native and community-optimized variants. Lightricks' LTX-2.5 stands out as a significant leap in open-weight video generation, demonstrating the shift toward high-fidelity, single-file diffusion models. The "uncensored" and local-first trend is evident, with multiple GGUF quantizations of Qwen-Image-2.1 tailored for ComfyUI workflows. Xiaomi's MiMo V2.6 series is gaining traction by providing both high-end Pro and efficient Flash variants, emphasizing reinforcement learning approaches.

2. **Trending Models**

🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,424 | 6,727,629 | A top-tier open-weight LLM serving as a foundational chat model. Its massive download volume indicates it is the current industry standard for high-performance local and server-side inference. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,810 | 651,078 | A fast, optimized variant of DeepSeek's latest architecture designed for low-latency tasks. It appeals to developers seeking a balance between reasoning capability and inference speed. |
| [XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) | XiaomiMiMo | 557 | 75,079 | A multimodal language model enhanced with Reinforcement Learning. It represents a significant step in applying RL to large-scale model fine-tuning for improved task adherence. |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,780 | 45,028 | A conversational text-generation model with a unique parameter activation strategy. It is trending due to its efficiency in maintaining high quality while reducing active compute. |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | A massive 80B parameter foundation model from Yandex. It is notable for its extreme sparsity, activating only 3B parameters, which challenges traditional scaling laws. |

🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,328 | 1,601,089 | A state-of-the-art video generation model supporting image-to-video and text-to-video. Its single-file diffusion architecture makes it exceptionally easy to deploy and integrate into existing pipelines. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,487 | 52,804 | A high-fidelity text-to-image and editing model from the Qwen team. It is the native source for numerous trending community fine-tunes and GGUF conversions, making it the central hub for image generation. |
| [Edge0/Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 1,026 | 19,434 | An automatic speech recognition model optimized for streaming audio input. Its "infinite" capability suggests it is designed for real-time transcription without fixed-length constraints, a key feature for live applications. |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 405 | 22,514 | A voice-activity detection model specifically focused on speaker diarization. It is essential for meeting transcription and multi-speaker audio processing tasks, offering high precision in identifying who is speaking. |

📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,188 | 3,343,748 | A 2-bit ternary quantization of a 27B model, enabling extreme efficiency. Its massive download count highlights the community's demand for running large models on consumer-grade hardware with minimal resources. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,777 | 1,608,439 | A mixed-precision quantization of the Qwen3.8-27B model using advanced RCO techniques. It provides a better quality-to-memory trade-off than standard GPTQ, making it a preferred choice for prosumer setups. |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 806 | 3,987,373 | The official ComfyUI-compatible version of Qwen's image model. Its download volume far exceeds the native release, proving that workflow integration is the primary driver for adoption in the creative coding space. |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,079 | 964,220 | A community-quantized, "uncensored" variant of the Qwen image model. It caters to a specific niche seeking models without standard content filters, reflecting a persistent demand for unrestricted creative tools. |

3. **Ecosystem Signal**
The Hugging Face ecosystem is currently defined by the "Qwen effect," where a single strong open-weight family spawns a vast ecosystem of specialized fine-tunes and quantizations. We see a clear shift toward efficiency; models like yandex's 80B-A3B and prism-ml's ternary GGUFs demonstrate that the community is prioritizing sparsity and extreme low-bit quantization over raw parameter count. The dominance of "GGUF" in the trending list confirms that local-first, consumer-hardware inference is the primary use case for most users, driving the development of tools like Comfy-Org and unsloth. Proprietary models are largely absent from the "top likes" tier, indicating that open-weights remain the standard for innovation and community contribution. There is also a notable surge in video generation, with Lightricks' LTX-2.5 setting a new benchmark for single-file diffusion architectures.

4. **Worth Exploring**
*   **Lightricks/LTX-2.5:** This is the most significant video generation model on the list. Its single-file diffusion architecture offers a glimpse into the future of lightweight, high-quality video synthesis that is easy to deploy.
*   **prism-ml/Ternary-Bonsai-2-27B-gguf:** A fascinating experiment in extreme quantization. Studying how a 27B model performs at 2-bit ternary precision provides valuable insights into the limits of model compression and hardware constraints.
*   **Qwen/Qwen3.8-27B:** As the "base" model for many other trends, it is the essential tool for understanding the current state-of-the-art in open-weight LLMs. Its performance and licensing make it the most versatile model for both research and production.