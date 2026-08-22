# Hugging Face 热门模型日报 2026-08-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-22 01:52 UTC

---

## Hugging Face 热门模型日报（2026-08-22）

### 1. 今日速览
今日 Hugging Face 热门模型呈现两大核心趋势：Qwen3.8 系列（27B 参数量级）占据下载榜主导，社区围绕其进行了大量 uncensored/abliterated/GGUF 微调与量化活动，总下载量达数千万次；MiniMaxAI 的视频生成模型 MiniMax-H3 以 4,295 点赞和 361 万下载位居多模态首位，显示视频生成赛道热度持续攀升。Moonshot AI 的 Kimi-K3 以 10,913 点赞成为语言模型中最受关注模型，DeepSeek-V4-Flash 以 283 万下载显示其性价比优势。整体生态呈现开源权重活跃、量化技术多元化、视频生成模型爆发式增长的特征。

### 2. 热门模型

**🧠 语言模型**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|:---|:---|---:|---:|:---|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,970 | 1,726,651 | Qwen3.8 系列旗舰模型，11,970 周点赞领跑全平台，支持 image-text-to-text 多模态对话，是今日最热门的开源语言模型。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,913 | 2,448,810 | 月之暗面发布的 Kimi-K3 以近 1.1 万点赞紧随 Qwen，压缩张量技术显著降低部署门槛，下载量超 240 万。 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,140 | 15,702 | Qwen3.8 系列 2.4 万亿参数 MoE 模型，专家数 95B，代表 Qwen 在超大参数规模上的布局。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,739 | 505,113 | Muse Glimmer 30B 以 1,739 点赞表现亮眼，image-text-to-text 多模态能力获社区认可。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 709 | 49,601 | DeepSeek V4 Pro 版本，专注高质量推理与对话，下载量虽不大但技术定位清晰。 |

**🎨 多模态与生成**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|:---|:---|---:|---:|:---|
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,295 | 3,614,443 | MiniMax 最新视频生成模型，支持 text-to-video 和 image-to-video，4,295 点赞和 361 万下载使其成为今日最热多模态模型。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,494 | 654,175 | LTX-2.5 视频生成模型支持 text/image/video 多种输入模式，65 万下载显示其在创作者群体中的渗透。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,164 | 15,678 | MiniMax 音乐生成模型，text-to-audio 能力获 1,164 点赞，音频生成赛道关注度持续提升。 |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 311 | 0 | 基于 MiniMax-H3 的微调视频生成模型，尚处于早期阶段但体现了 H3 生态的扩展能力。 |

**🔧 专用模型**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|:---|:---|---:|---:|:---|
| [ornith-ai/Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 291 | 9,165 | Ornith 1.5 采用 35B 总参数、激活 3B 的 MoE 架构，兼顾性能与效率，Qwen3.5 系列新竞争者。 |
| [superwhisper/s1-mini](https://huggingface.co/superwhisper/s1-mini) | superwhisper | 191 | 1,136 | 小型 ASR+text-generation 混合模型，面向语音识别与生成的轻量级应用场景。 |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,371 | 0 | 修复 Qwen 聊天模板的 MLX/Jinja 配置包，1,371 点赞说明模板问题是社区高频痛点。 |

**📦 微调与量化**
| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
|:---|:---|---:|---:|:---|
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,511 | 5,804,917 | unsloth 对 Qwen3.8-27B 的 GGUF 量化版本，580 万下载是全平台最高，反映社区对本地高效推理的强烈需求。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,613 | 2,833,064 | DeepSeek V4 Flash 以 3,613 点赞和 283 万下载成为性价比标杆，平衡了性能与推理速度。 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 824 | 107,520 | Qwen3.8-27B 的 uncensored FP8 量化版本，abliterated 技术去除安全对齐，满足特定用户需求。 |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 821 | 18,193 | 同上游模型但针对 Apple Silicon MLX 框架优化的 uncensored 版本。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 572 | 1,126,222 | 另一款 uncensored GGUF 量化版本，112 万下载显示 uncensored 模型在社区中的持续需求。 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 232 | 338,221 | huihui-ai 的 abliterated GGUF 版本，33.8 万下载体现 abliteration 技术的社区接受度。 |
| [0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 213 | 421,918 | Heretic 方法的 abliterated 版本，42.2 万下载是 abliteration 技术多样性的体现。 |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 328 | 1,013,917 | unsloth 的 NVFP4 量化版本，101 万下载反映 NVIDIA 专有量化格式在本地推理中的流行。 |
| [Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 201 | 197,667 | Blackfrost 的 abliterated GGUF 版本，进一步丰富了 Qwen3.8 的量化生态。 |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 238 | 74,038 | Ridge 正则化微调的 Qwen3.8 GGUF 版本，探索微调与量化的结合路径。 |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 444 | 123,956 | OBLITERATED 技术的 mlx/gguf 双格式版本，展示消融技术的多样化实现。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 424 | 357,225 | Aggressive MTP（Multi-Token Prediction）+ uncensored 的 GGUF 版本，35.7 万下载体现对加速推理的需求。 |
| [z-lab/Qwen3.8-27B-DFlash2](https://huggingface.co/z-lab/Qwen3.8-27B-DFlash2) | z-lab | 176 | 21,092 | DFlash2 投机解码优化版本，探索 speculative decoding 在 Qwen3.8 上的应用。 |
| [DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 171 | 155,208 | Cold Fusion + GAIN Training + MTP 多重技术融合的 GGUF 版本，15.5 万下载展示社区技术创新的多样性。 |

### 3. 生态信号
Qwen3.8-27B 家族是今日绝对的流量中心：基础模型 +13 个社区微调/量化变体，累计下载超 1,200 万次。uncensored/abliterated 类微调占比极高（超过一半），反映社区对去除安全对齐的持续需求，同时也引发了对模型安全边界的讨论。GGUF 格式仍是本地推理的首选，unsloth 的量化版本下载量突破 580 万。视频生成领域，MiniMax-H3 以 361 万下载确立领先位置，LTX-2.5 紧随其后。Kimi-K3 以 10,913 点赞显示中国厂商在开源语言模型竞争中的强劲势头。整体生态呈现「基座模型集中化（Qwen/D深/MiniMax）+ 微调生态高度碎片化」的格局。

### 4. 值得探索
1. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 4,295 点赞 361 万下载的视频生成标杆，代表了当前开源视频生成模型的最高水平，值得研究与集成。
2. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — 580 万下载的全平台最高，是本地高效推理的首选方案，其量化策略值得深入分析。
3. **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — 10,913 点赞、压缩张量技术降低部署成本，是中国大模型厂商在开源生态中的重要布局，值得关注其长期发展。