# Hugging Face Trending Models Digest 2026-09-27

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-27 00:20 UTC

---

1. **Today's Highlights**
The release of Qwen/Qwen3.8-27B dominates the leaderboard with over 16,000 likes and 6.6 million downloads, signaling a major shift toward efficient, high-capability open-weights multimodal models. A distinct ecosystem of community GGUF quantizations and LoRAs has rapidly emerged around Qwen-Image-2.1, indicating heavy local deployment demand for image generation. Xiaomi’s MiMo-V2.6 series showcases aggressive iteration, with multiple RL and distilled variants trending simultaneously. Specialized utility models like Lightricks/LTX-2.5 for video and nvidia/Nemotron-3-Diarization for audio are gaining traction, highlighting the expansion of open models into time-series and media processing.

2. **Trending Models**

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,350 | 6,652,309 | A flagship image-text-to-text model that tops the likes chart. It offers strong conversational capabilities with a massive user adoption rate. |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,725 | 43,947 | A transformers-based text-generation model focused on conversational tasks. It is trending due to its balanced size and performance for local use. |
| [Altworld/Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) | Altworld | 710 | 5,590 | An instruction-tuned model built on the qwen3_5_text architecture. It is gaining attention for its specialized text-generation performance. |
| [XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) | XiaomiMiMo | 526 | 74,497 | A multimodal text-generation model enhanced via reinforcement learning. It stands out for its high download volume relative to its likes. |
| [XiaomiMiMo/MiMo-V2.6-Flash-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL) | XiaomiMiMo | 479 | 23,000 | A lighter RL-tuned variant of the MiMo-V2.6 series for faster inference. It is trending among users seeking efficiency in multimodal tasks. |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 338 | 3,336 | A large foundation text-generation model with custom code requirements. It is notable for its significant parameter count from a major tech company. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,771 | 640,577 | An image-text-to-text model optimized for speed. It is trending due to its strong utility in high-volume inference scenarios. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,399 | 48,361 | While primarily an image model, its base architecture is driving LLM-like text-encoder interest. It is trending as the foundation for many downstream text-aligned tools. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,224 | 1,604,804 | A diffusion-single-file model supporting image-to-video and text-to-video. It is trending for its comprehensive video generation capabilities. |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,505 | 11,063 | A multimodal vision-language model focused on spatial reasoning. It is notable for its compact size and strong spatial understanding. |
| [XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B) | XiaomiMiMo | 497 | 7,905 | An image-text-to-text model distilled from larger architectures. It is trending for its efficient multimodal processing in low-resource settings. |
| [Edge0/Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 779 | 7,859 | An automatic speech recognition model capable of streaming and text generation. It is interesting for its "infinite" context handling in audio tasks. |
| [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) | netease-youdao | 426 | 7,155 | An ASR model based on qwen3_asr architecture. It is trending due to its robust raw-to-text conversion performance. |
| [inclusionAI/Ming-Image-0.1-Design](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design) | inclusionAI | 254 | 0 | A custom text-to-image generation model focused on design aesthetics. It is emerging as a specialized tool for creative applications. |
| [apple/LensVLM-9B](https://huggingface.co/apple/LensVLM-9B) | apple | 225 | 1,432 | An image-text-to-text vision-language model. It is noteworthy as a major tech release focusing on visual understanding. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 3,894 | 0 | A text-classification model tagged for "system-one" calibrated decisions. It is trending for its utility in rapid, reliable automated decision-making. |
| [AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev) | AlexWortega | 595 | 0 | An NLI cross-encoder based on qwen3.5. It is useful for natural language inference and semantic similarity tasks. |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 371 | 19,620 | A voice-activity-detection and audio-frame-classification model. It is notable for speaker diarization in audio processing pipelines. |
| [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR) | StarDoc-AI | 407 | 26,152 | An OCR model built on qwen2_5_vl architecture. It is trending for its accuracy in extracting text from medical and telehealth documents. |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 270 | 434 | A text-ranking and verifier model using contrastive learning. It is specialized for reranking search results or document relevance. |
| [akhilaaa3/Jev-Omni](https://huggingface.co/akhilaaa3/Jev-Omni) | akhilaaa3 | 255 | 128 | A text-classification model based on gemma4_unified. It offers a unified approach to classification and multimodal input handling. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,134 | 3,247,527 | A 2-bit ternary quantization optimized for llama.cpp. It is trending due to its extreme efficiency for edge and local deployment. |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 776 | 3,641,785 | A ComfyUI-ready integration of the Qwen-Image-2.1 base model. It is highly downloaded for use in node-based generation workflows. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,651 | 6,832,629 | A high-quality GGUF quantization of the trending Qwen3.8-27B model. It dominates the downloads chart for local LLM inference. |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 1,931 | 876,673 | An uncensored GGUF variant of Qwen-Image-2.1 for ComfyUI. It is popular for users seeking less restrictive image generation. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,732 | 1,560,929 | A mixed-precision quantization using GSQ and RCO techniques. It offers a balance between performance and memory footprint. |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 281 | 137,283 | A quantized FP8 text-encoder component for Qwen-Image-2.1. It is useful for lightweight ComfyUI setups. |
| [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 246 | 170,469 | Another unsloth community quantization of the Qwen-Image model. It provides additional options for local image generation. |

3. **Ecosystem Signal**
The Qwen3.8-27B and Qwen-Image-2.1 families are the primary drivers of current momentum, with the community rapidly producing high-quality GGUF quantizations (unsloth, ISTA-DASLab) to enable local deployment. There is a clear trend toward "efficient multimodality," where smaller models (9B–27B) are being heavily adopted for both text and vision tasks, reducing the barrier to entry for multimodal AI. Open-weight models remain dominant in every category, with proprietary or custom-code models (like yandex/AliceAI) appearing less frequently in top trends. The ecosystem is seeing significant fine-tuning activity around image generation (Viggle, Comfy-Org) and specialized utility (diarization, OCR), indicating a maturation phase where users are moving from general chat to specific, high-value use cases.

4. **Worth Exploring**
*   **Qwen/Qwen3.8-27B**: The sheer volume of likes and downloads makes this the essential baseline for current multimodal research and deployment. Its efficiency at 27B parameters sets a new standard.
*   **prism-ml/Ternary-Bonsai-2-27B-gguf**: For enthusiasts of extreme quantization, this 2-bit ternary model is a fascinating data point on how far small-model performance can be pushed on consumer hardware.
*   **Lightricks/LTX-2.5**: The video generation space is moving fast, and this model's support for multiple video modalities (image-to-video, video-to-video) in a single-file format makes it highly practical for integration.