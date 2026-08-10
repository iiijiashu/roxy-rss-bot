# AI 开源趋势日报 2026-08-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-10 08:31 UTC

---

# AI 开源趋势日报 — 2026-08-10

## 1. 今日速览
今日 AI 开源领域呈现三大趋势：Agent Skills 生态爆发（Google 和 Addy Osmani 相继发布官方/社区 Skills 仓库）、RAG 知识库方案持续领跑 star 榜、本地化 AI 工具链（Ollama、llama.cpp 生态）保持强劲增长。同时，代码级 RAG（code-graph-rag）和 Agent 性能优化（ECC、headroom）成为新热点，反映开发者对生产级 AI 应用可靠性的迫切需求。

## 2. 各维度热门项目

### 🔧 AI 基础工具
| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,176 | 本地运行大模型的首选工具，支持 Kimi-K2.6、GLM-5.2、DeepSeek 等主流模型，今日无新增但长期保持热度。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,520 | Hugging Face 模型库核心框架，支持文本/视觉/音频多模态模型的推理与训练，仍是 AI 开发基础设施。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter | 102,163 | 从零实现 ChatGPT 风格 LLM 的教程仓库，PyTorch 实现，适合学习 LLM 内部原理。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,513 | 2 小时从 0 训练 64M 参数小模型的教学项目，降低 LLM 训练门槛。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,225 | 用 Rust 构建模块化可扩展 LLM 应用的框架，Rust 生态中的 LLM 工具链新成员。 |

### 🤖 AI 智能体/工作流
| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | 0 (+2,356 今日) | 自改进 RLM 智能体，专注编码工作流和长期自主任务，今日爆发性增长 2,356 stars。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0 (+858 今日) | 完整 AI agency 框架，提供前端专家、Reddit 社区专家等专业化 agent，今日增长 858 stars。 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | JavaScript | 0 (+680 今日) | 生产级 AI 编码 agent 工程 skills，由知名前端开发者 Addy Osmani 发布，今日增长 680 stars。 |
| [google/skills](https://github.com/google/skills) | Python | 0 (+528 今日) | Google 官方 Agent Skills 仓库，为 Google 产品和技术提供 skills，今日增长 528 stars。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 228,114 | "与你共同成长的 agent"，Nous Research 出品的自进化智能体框架。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,476 | 经典自主 AI agent 项目， mission 是提供 accessible AI 工具。 |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 46,814 | 超轻量级开源自托管个人 AI agent 框架，支持 WebUI、MCP、多 agent 工作流。 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Python | 46,438 | 开源超级 AI 助手 & Agent Harness，支持多模型多频道，一键安装。 |

### 📦 AI 应用
| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 0 (+306 今日) / 61,550 | LLM 驱动的多市场股票智能分析系统，支持多源行情、实时新闻、自动推送，今日增长 306 stars。 |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Python | 0 (+365 今日) | 最强大的模块化扩散模型 GUI，节点式界面，今日增长 365 stars。 |
| [goauthentik/authentik](https://github.com/goauthentik/authentik) | Python | 0 (+310 今日) | 开源身份认证平台，今日增长 310 stars（AI 安全基础设施）。 |
| [harveyai/harvey-labs](https://github.com/harveyai/harvey-labs) | Python | 0 (+47 今日) | 评估 AI agent 法律工作支持能力的 benchmark，今日增长 47 stars。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,554 | 让网站可被 AI agent 访问，自动化网页任务。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,404 | AI 一键生成高清短视频，自动化工作流。 |

### 🧠 大模型/训练
| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,944 | Google 开源机器学习框架，经典 ML/DL 基础设施。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,308 | Meta 开源深度学习框架，动态计算图，AI 研究主流选择。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,449 | YOLOv8/YOLO11/YOLO26 目标检测、分割、姿态估计工具包。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,288 | 开源 LLM 评估平台，支持 100+ 数据集和主流模型评测。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 316 | 基于 X-Bit 量化的端侧 LLM 推理引擎，边缘 AI 新方向。 |

### 🔍 RAG/知识库
| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 151,929 | Agentic workflows + RAG pipelines，支持云/VPC/自托管部署，RAG 领域领跑者。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,354 | 用户友好的 AI 接口，支持 Ollama、OpenAI API，本地部署首选。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 143,857 | Agent 工程平台，RAG 领域最流行的开发框架。 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 131,836 | 100+ AI Agent、Skill 和 RAG 应用开源集合。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 104,760 | 将代码库/文档/SQL schema 转为可查询知识图谱，AST 解析无向量存储，今日无新增但存量庞大。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,258 | 跨会话持久化上下文，AI 压缩并注入相关上下文，支持 Claude Code/Codex/Gemini 等。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,162 | 开源 RAG 引擎，融合 RAG 与 Agent 能力， superior context layer。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 62,920 | AI Agent 通用记忆层，跨会话持久化记忆。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 65,709 | 在数据到达 LLM 前压缩工具输出/日志/RAG chunks，编码 agent 减少 20% tokens。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,088 | Agent harness 性能优化系统，skills/memory/security，支持 Claude Code/Codex/Cursor。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,582 | 高性能云原生向量数据库，支持可扩展向量 ANN 搜索。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,897 | 高性能大规模向量数据库和搜索引擎，提供云服务。 |
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | Rust | 58,921 | 闪电级搜索引擎 API，AI 驱动混合搜索。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,115 | 无向量数据库的基于推理的 RAG 文档索引。 |

## 3. 趋势信号分析
今日最显著的趋势是 **Agent Skills 生态的爆发式增长**。Google 官方发布 skills 仓库（+528 stars）、Addy Osmani 发布生产级 agent skills（+680 stars）、PrimeIntellect 的自改进 RLM agent（+2,356 stars）和 agency-agents（+858 stars）同日登榜，表明社区对"可复用、可组合的 agent 能力单元"的需求急剧上升。同时，**代码级 RAG**（code-graph-rag +96 stars、graphify 104k stars）和 **agent 性能优化**（ECC 239k stars、headroom 65k stars）反映开发者从"能用 agent"转向"让 agent 高效可靠"的阶段。RAG 领域仍由 dify、open-webui、langchain 等成熟项目领跑，但新兴的"无向量存储"方案（graphify、PageIndex）值得关注。

## 4. 社区关注热点
- **[PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent)**：今日增长 2,356 stars，自改进 RLM agent，编码工作流和长期自主任务，爆发式增长信号强烈。
- **[google/skills](https://github.com/google/skills)**：Google 官方 Agent Skills 仓库上线，+528 stars，标志大厂入局 skills 生态。
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**：知名开发者发布生产级 engineering skills，+680 stars，社区对高质量 agent 能力单元需求旺盛。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**：104k stars，无向量存储的代码库知识图谱方案，代表 RAG 新方向。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)**：239k stars，agent harness 性能优化系统，反映社区对 agent 效率和可靠性的关注。