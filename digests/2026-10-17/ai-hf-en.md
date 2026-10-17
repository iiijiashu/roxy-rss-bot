# Hugging Face Trending Models Digest 2026-10-17

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-17 00:20 UTC

---

## 1. Today's Highlights

Qwen dominates the trend list with multiple top-ranked entries, including Qwen3.8-27B and Qwen3.8-Flash-Next, indicating a strong shift toward large, multimodal-capable open-weights from Alibaba. The Qwen-Image 2.1 series continues to drive massive adoption, evidenced by the top 10 presence of official and community GGUF/uncensored variants. Video generation models like LTX-2.5 and MiniCPM-V-4.7 show consistent momentum, blending image and video pipelines. Community "uncensored" fine-tunes and quantizations are a notable sub-trend, with high download counts for abliterated and GGUF versions of major model families.

## 2. Trending Models

### 🧠 Language Models
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,854 | 7,516,626 | A flagship multimodal LLM capable of handling image-text conversations. It leads the list in likes and downloads due to its strong conversational benchmark performance. |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 6,286 | 2,379,596 | An experimental, fast inference variant of the Qwen3.8 family optimized for speed. It is trending for its balance of high capability and low latency in text and image tasks. |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 4,566 | 1,276,459 | A high-performance open-weights model from DeepSeek supporting both text and image inputs. It gains traction for its efficient architecture and strong reasoning capabilities. |
| [LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B) | LiquidAI | 428 | 9,356 | A Mixture of Experts (MoE) language model from LiquidAI with 24B total parameters. It is trending for its efficient active parameter count, allowing high performance on consumer hardware. |
| [d1-3B](https://huggingface.co/LiquidAI/d1-3B) | LiquidAI | 438 | 17,820 | A compact 3B parameter multimodal model designed for edge deployment. It is notable for its low resource footprint while retaining image-text understanding capabilities. |

### 🎨 Multimodal & Generation
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,087 | 1,920,611 | A diffusion model supporting image-to-video, text-to-video, and video-to-video generation. It is the top trend in video generation, praised for its single-file format ease of deployment. |
| [MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) | openbmb | 848 | 17,553 | A MoE vision-language model with 35B total parameters and 3B active. It trends for its high efficiency, delivering strong image understanding on modest compute budgets. |
| [flux-3-image-klein](https://huggingface.co/black-forest-labs/flux-3-image-klein) | black-forest-labs | 398 | 22,790 | An image generation and editing model from Black Forest Labs. It is gaining attention for its integration with Diffusers and strong control over image-to-image tasks. |
| [drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 556 | 6,158 | A text-to-speech model specialized in multi-speaker dialogue generation. It is trending for its "fish-omni" architecture, enabling realistic role-playing voice synthesis. |
| [sam3](https://huggingface.co/facebook/sam3) | facebook | 4,510 | 2,033,919 | A mask generation model supporting video segmentation (SAM3 Video). It stands out for its ability to produce precise object masks across multiple video frames. |
| [iris-3b](https://huggingface.co/speridlabs/iris-3b) | speridlabs | 299 | 1,320 | A small 3B parameter text-to-image diffusion model operating in pixel space. It is of interest for researchers studying minimal-footprint image generation architectures. |

### 🔧 Specialized Models
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,512 | 151,258 | A feature-extraction model from Google designed for high-quality embeddings. It is the top trend in this category, favored for its strong performance in semantic search tasks. |
| [Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,749 | 1,262,307 | A feature-extraction model for Optical Character Recognition. It is trending for its high accuracy in converting image text to structured data, suitable for document processing. |
| [laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 5,657 | 49,816 | A text classification model focused on "system-one" calibrated decision making. It is notable for its low-latency classification, ideal for real-time response applications. |
| [vllm-sr/d3](https://huggingface.co/vllm-sr/d3) | vllm-sr | 218 | 3,565 | A zero-shot classification model leveraging Qwen3.5 architecture features. It is trending for its ability to classify unstructured text without task-specific fine-tuning. |

### 📦 Fine-tunes & Quantizations
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,437 | 2,477,554 | A community fine-tune of Qwen-Image 2.1 that removes content restrictions. It has the highest download count in this category, driven by demand for unrestricted image generation. |
| [Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 515 | 327,786 | A GGUF quantized version of the Qwen-Image 2.1 Turbo model. It is popular for local, offline image generation using llama.cpp or compatible runtimes. |
| [DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 678 | 57,191 | An FP8 quantized, abliterated variant of DeepSeek-V4.1-Flash. It trends among users seeking high-performance, locally-hosted models without safety filters. |
| [Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 515 | 327,786 | A GGUF format quantization of the Qwen-Image 2.1 Turbo model. It is a key release for enabling local image generation on consumer-grade hardware without cloud dependency. |

## 3. Ecosystem Signal

The Hugging Face ecosystem is seeing a significant momentum shift toward **Qwen** and **DeepSeek** open-weights families, which are dominating both language and multimodal trends. These models are increasingly being adopted not just as base models but through a vibrant community of **fine-tunes and quantizations**. A notable sub-trend is the high demand for "uncensored" or abliterated versions, particularly in GGUF and FP8 formats, indicating a user base prioritizing local, unrestricted inference. 

Video generation remains a hot area, with LTX-2.5 and MiniCPM-V maintaining high engagement. The prevalence of MoE (Mixture of Experts) architectures, such as in LiquidAI and Qwen releases, suggests the community is optimizing for performance-per-parameter, allowing large model capabilities on consumer hardware. The open-weight trend is clearly favored, with proprietary systems absent from the top trending lists.

## 4. Worth Exploring

*   **LTX-2.5**: Best for creative developers wanting a robust, single-file video generation model that supports multiple input types (image, text, video). Its diffusion-single-file format makes integration into local pipelines very simple.
*   **embeddinggemma-2**: Ideal for building search and RAG applications. As the top feature-extraction trend, it offers a proven, high-quality embedding standard from a major model family.
*   **MiniCPM-V-4.7-35B-A3B**: Worth studying for its MoE efficiency. It demonstrates how to achieve strong multimodal performance with a very low active parameter count (3B), making it a great candidate for edge deployment where total model size matters less than active inference cost.