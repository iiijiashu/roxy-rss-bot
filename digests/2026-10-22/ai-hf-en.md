# Hugging Face Trending Models Digest 2026-10-22

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-22 00:20 UTC

---

# Hugging Face Trending Models Digest
*As of 2026-10-22*

## 1. Today's Highlights
The Hugging Face hub is currently driven by a significant push in high-efficiency multimodal language models, particularly from Qwen and DeepSeek, with the new **Qwen3.8** family dominating the top rankings. A strong trend toward "Flash" and "Next" variants indicates a focus on real-time inference capabilities for vision-language tasks. The image generation sector is highly active, with multiple entries for the **MOSS-Image** ecosystem and Black Forest Labs' **Flux-3**, suggesting intense competition in open-weight image diffusion. Video generation remains a major draw, anchored by Lightricks' **LTX-2.5**, which holds the highest download count on the list. Additionally, there is a notable rise in specialized OCR and time-series models, indicating that utility-focused open models are gaining traction alongside large generative architectures.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,138 | 7,729,432 | A 27B parameter multimodal model capable of image-text-to-text interactions. Its massive download volume and high like count signal it is becoming the standard open-weight choice for general multimodal chat. |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,390 | 2,633,567 | An experimental variant of the Qwen3.8 series designed for faster inference. It focuses on conversational performance with image-text inputs, offering a balance between speed and capability. |
| [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 2,161 | 42,122 | A flash variant of the DeepSeek V4.1 architecture optimized for multimodal processing. It supports image-text-to-text pipelines and represents a newer iteration in the DeepSeek line. |
| [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 550 | 16,939 | A Mixture-of-Experts model with 24B total parameters and 2B active parameters. It aims for high-efficiency text generation and conversation through its liquid architecture design. |
| [tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B) | tencent | 272 | 2,682 | A Tencent model featuring 30B total parameters with 3B active, specialized for memory-intensive tasks. It targets conversational text generation with improved contextual retention. |
| [reflection/Beam-1.0-501B-A23B](https://huggingface.co/reflection/Beam-1.0-501B-A23B) | reflection | 208 | 3,555 | A massive Mixture-of-Experts model with 501B parameters and 23B active. It is tuned specifically for reasoning and code generation tasks. |
| [RecursiveSI/flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 238 | 0 | A text-generation model tagged for conversational use. Despite zero downloads, its presence in the trending list suggests early interest or promotional activity from the community. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,755 | 2,057,942 | A comprehensive video model supporting image-to-video, text-to-video, and video-to-video tasks. It holds the highest download count on this list, indicating widespread adoption for video generation workflows. |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,845 | 1,906,176 | The third generation of Segment Anything Model, designed for mask generation and feature extraction. It extends segmentation capabilities to video, marking a major milestone for open computer vision tools. |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,853 | 2,127,860 | A transformer-based OCR model that processes images to extract text. Its high download count highlights the critical demand for open, high-accuracy document parsing tools. |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,187 | 490,447 | A single-file diffusion model optimized for ComfyUI workflows. It supports image generation and editing, making it highly popular among users who prefer node-based pipelines. |
| [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo) | Qwen | 1,022 | 29,826 | A fast inference variant of Qwen's image model for text-to-image and editing. It balances speed with quality, appealing to users needing rapid image generation. |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 888 | 15,274 | A multi-speaker text-to-speech model designed for dramatic or narrative audio. It caters to content creators needing distinct voices for different characters in a single model. |
| [OpenMOSS-Team/MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 533 | 5,840 | A supervised fine-tuned version of the MOSS image model for text-to-image generation. It is part of a broader open ecosystem aiming to rival major closed image generators. |
| [black-forest-labs/flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 599 | 92,604 | The standard diffusers version of the Flux 3 Klein model. It offers image generation and editing capabilities and is a key competitor in the open-weight diffusion space. |
| [OpenMOSS-Team/MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) | OpenMOSS-Team | 465 | 4,344 | The base checkpoint for the MOSS image model suite. It serves as the foundation for further fine-tuning and community development in text-to-image tasks. |
| [lodestones/Kromoss](https://huggingface.co/lodestones/Kromoss) | lodestones | 203 | 11,608 | A text-to-image model built on the MOSS-Image architecture. It represents community experimentation with the MOSS framework for stylized or specific niche image generation. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,805 | 179,734 | A feature-extraction model for generating text embeddings. It is the latest iteration of Google's open embedding models, widely used for RAG and semantic search. |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 341 | 3,588 | A lightweight OCR model optimized for CPU inference using ONNX. It targets accessibility and local deployment of text extraction without requiring heavy GPU resources. |
| [mistralai/Timestral-209M](https://huggingface.co/mistralai/Timestral-209M) | mistralai | 260 | 5,488 | A small foundation model (209M parameters) specialized for time-series forecasting. It brings Mistral's capabilities to quantitative analysis and predictive data tasks. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,765 | 2,738,344 | A GGUF-quantized, uncensored fine-tune of Qwen-Image-2.1. Its massive download count reflects the community's demand for unrestricted, local-friendly image generation tools. |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,063 | 120,930 | A GGUF model based on Gemma 4 Unified, specifically tuned to "humanize" text outputs. It removes AI-like stylistic markers, catering to users needing natural-sounding writing. |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 329 | 1,290,080 | An official integration of MOSS-Image for the ComfyUI ecosystem. It allows seamless use of the MOSS base model within node-based image generation workflows. |
| [nvidia/Qwen3.8-Flash-Next-FP4-Local](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local) | nvidia | 289 | 9,340 | An FP4 quantized version of Qwen3.8-Flash-Next optimized for local NVIDIA hardware. It uses Model Optimizer for extreme compression while maintaining usability. |
| [lodestones/MOSS-Image-SFT-8-steps-dmd](https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd) | lodestones | 193 | 68,289 | A distilled fine-tune of MOSS-Image-SFT that generates high-quality images in just 8 steps. It significantly reduces computational cost for image generation. |
| [dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8) | dealignai | 210 | 3,458 | An FP8 quantized, uncensored version of DeepSeek V4.1 Flash. It targets users who want locally runnable, unfiltered large language models. |
| [meta-models/Muse-Spark-Open-816B-A42B-NVFP4](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4) | meta-models | 202 | 6,507 | An NVFP4 quantized variant of Meta's Muse-Spark open model. It is designed to fit on newer NVIDIA GPUs that support FP4 precision for efficient inference. |

## 3. Ecosystem Signal

The current ecosystem signals a strong maturation of "efficient multimodality." Model families like **Qwen** and **MOSS** are dominating not just by size, but by their "Flash" and "Turbo" variants, which prioritize inference speed and local deployability. This suggests the industry is shifting from merely releasing massive parameter counts to optimizing utility-per-watt for real-world applications. 

Open-weight models continue to capture significant market share, particularly in specialized domains like OCR (**baidu**) and embeddings (**google**), which were previously locked behind proprietary APIs. A notable trend is the aggressive quantization of these large open models (e.g., FP4, FP8, GGUF), driven by both hardware manufacturers like NVIDIA and community groups. This quantization activity allows high-end capabilities to run on consumer hardware, lowering the barrier to entry. The popularity of "uncensored" fine-tunes indicates a persistent community demand for model autonomy and lack of content filtering, especially in local, on-premise deployments.

## 4. Worth Exploring

*   **Lightricks/LTX-2.5**: This is the standout video model on the list. With over 2 million downloads, it represents the current state-of-the-art for open-weight video generation. Exploring its `image-to-video` and `video-to-video` capabilities would be valuable for anyone building video-centric AI applications.
*   **Qwen/Qwen3.8-27B**: As the highest-liked model on the list, this 27B parameter multimodal LLM is likely the best balance of performance and accessibility for general-purpose chat and vision tasks. It is a strong candidate for a primary reasoning engine in a multimodal agent.
*   **mistralai/Timestral-209M**: A unique entry focused on time-series forecasting. Most trending models are generative or conversational, but Timestral addresses a critical enterprise need. It is worth studying for its application in data analysis, predictive maintenance, or financial forecasting tasks.