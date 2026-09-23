# AI 开源趋势日报 2026-09-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-23 00:20 UTC

---

### AI 开源趋势日报 (2026-09-23)

#### 1. 今日速览

今日 AI 开源生态的核心焦点从单纯的大模型权重转向了**Agent 运行时**与**工具标准化**的深层基础设施。Google 开源的 `ax` 以单日 +2305 Star 的惊人增速登榜，标志着巨头正式入场 Agentic Orchestration 赛道。与此同时，办公场景（`univer`）和视频处理（`video-use`）等垂直领域开始通过“Coding Agent 驱动”的方式重构传统软件交互逻辑，显示 Agent 正从聊天机器人向系统级操作工具演进。此外，针对 Agent 记忆管理的专用数据库（`cognee`, `qdrant`）持续升温，反映出“状态持久化”已成为多智能体系统的刚需。

#### 2. 各维度热门项目

**🔧 AI 基础工具**

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [google/ax](https://github.com/google/ax) | Go | 0（+2305） | Google 推出的开源 Agentic 编排运行时。今日单日增长超 2300 Star，显示巨头正试图标准化 Agent 之间的通信与执行协议。 |
| [agent-substrate/substrate](https://github.com/agent-substrate/substrate) | Go | 0（+245） | 专注于 Agent 核心系统基础的 Substrate 项目。作为今日热榜新兴项目，主要解决 Agent 状态管理与底层隔离问题。 |
| [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | Python | 0（+64） | 用于配置和监控 Claude Code 的 CLI 工具。随着 Coding Agent 普及，针对特定 AI 工具的调优与运维工具链开始独立成生态。 |
| [superdesigndev/treg](https://github.com/superdesigndev/treg) | Python | 0（+230） | 被称为“Agent 工具的 OpenRouter”。今日热度上升，旨在解决 Agent 调用第三方工具时的路由、聚合与兼容性问题。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 166,539 | 主流 ML 模型定义框架，支持文本、视觉及多模态模型。作为行业基石，持续集成最新模型架构与推理优化技术。 |

**🤖 AI 智能体/工作流**

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 248,109 | 强调“随用户成长”的 Agent 框架。高 Star 量表明其在个性化记忆与长期交互方面具备强大的社区认可度。 |
| [browser-use/video-use](https://github.com/browser-use/video-use) | Python | 191 | 允许使用 Coding Agent 编辑视频的新兴项目。展示了 Agent 能力从代码生成向多媒体内容生成与编辑的跨界扩展。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 52,084 | 集聊天、自主 Agent 和 300+ 助手于一体的 AI 生产力工作室。适合作为个人 AI 助手的统一入口与多模型聚合平台。 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Python | 42,150 | 构建具有韧性的 Agent 的官方框架。目前已是构建复杂状态化多智能体工作流的事实标准之一。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 183,424 | 大规模 Web 数据搜索、抓取与交互 API。为 Agent 提供关键的实时外部信息获取能力，是 RAG 数据源的重要组件。 |

**📦 AI 应用**

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [dream-num/univer](https://github.com/dream-num/univer) | TypeScript | 0（+255） | 为 AI Agent 打造的“办公 Harness”，支持电子表格、文档及幻灯片。今日热榜显示 Agent 开始接管传统 SaaS 办公套件的市场。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 108,137 | 基于多智能体 LLM 的金融交易框架。利用多个 Agent 协作进行市场分析，代表了垂直金融领域深度应用的前沿。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 125,156 | 利用 LLM 和自动化工作流一键生成高清短视频。极低门槛的 AIGC 视频生成工具，在社区中保持极高热度。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 72,444 | 开源 AI 求职工具，本地运行于 AI CLI 中。展示 AI 如何深度嵌入个人职业管理流程，实现简历优化与职位追踪。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 152,848 | 用户友好的 AI 界面，支持 Ollama 及 OpenAI API。持续作为本地部署大模型的首选交互前端，生态集成度不断扩展。 |

**🧠 大模型/训练**

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 62,190 | 可在 2 小时内从零训练 64M 参数 LLM 的项目。非常适合教学及在边缘设备上理解模型构建原理，降低了准入门槛。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter | 105,402 | 基于 PyTorch 从零实现 ChatGPT 类 LLM 的教程。作为经典学习资源，其高 Star 数证明了系统性学习底层逻辑的需求。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 103,182 | 具有强 GPU 加速的张量与动态神经网络框架。作为 AI 计算核心底座，持续更新以支持更高效的大模型训练范式。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,699 | 构建模块化、可扩展 LLM 应用的 Rust 框架。反映了 AI 开发工具链向高性能系统语言（如 Rust）延伸的趋势。 |

**🔍 RAG/知识库**

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 120,567 | 将代码库及 SQL 转化为可查询知识图谱的 RAG 工具。无需向量库即可实现确定性解析，适合复杂的代码检索场景。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 91,174 | 领先的开源 RAG 引擎，融合了 RAG 与 Agent 能力。通过创建优质上下文层提升 LLM 表现，是当前企业级 RAG 的首选方案。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,756 | 高性能、大规模向量数据库。专为下一代 AI 设计，提供极低延迟的向量检索，支撑大规模知识库应用。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 73,532 | 压缩工具输出、日志及 RAG 块的工具。在数据进入 LLM 前优化 Token 效率，解决了上下文窗口限制的关键痛点。 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,921 | 为 Agent 提供长期持久记忆的开源 AI 内存平台。基于知识图谱引擎，解决多轮对话中状态遗忘的行业难题。 |

#### 3. 趋势信号分析

今日热榜最显著的信号是 **Agentic Infrastructure（智能体基础设施）** 的爆发。Google `ax` 的激增表明，社区不再满足于单纯的 LLM 调用，而是迫切寻找标准化的运行时来协调多个 Agent 协作。同时，“Agent 驱动的传统软件”成为新叙事，如 `univer`（办公）和 `video-use`（视频）证明了 AI 正在将 SaaS 产品重新封装为 Agent 的 Harness。在技术栈方面，Rust 语言在 LLM 工具链（如 `qdrant`、`rig`）中的渗透率持续上升，暗示对性能与内存安全的高要求正在改变 AI 开发范式。此外，针对 Agent 的 Token 压缩（`headroom`）与记忆管理（`cognee`）成为独立赛道，显示精细化工程已成为提升 Agent 效能的关键瓶颈。

#### 4. 社区关注热点

*   **[google/ax](https://github.com/google/ax)**：作为 Google 开源的 Agentic 运行时，其设计哲学与 API 标准将直接影响未来智能体生态的兼容性，值得所有 Agent 开发者第一时间研读。
*   **[dream-num/univer](https://github.com/dream-num/univer)**：这是办公自动化与 AI 结合的典型代表，通过 Agent 操作电子表格和文档，预示着 Excel 等办公软件的下一代交互形态。
*   **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)**：在企业级应用中，RAG 的质量决定了 LLM 的上限。RAGFlow 将 RAG 与 Agent 深度结合，是当前构建高可靠知识检索系统的标杆。
*   **[superdesigndev/treg](https://github.com/superdesigndev/treg)**：被称为“Agent 的 OpenRouter”，随着 MCP 等协议的普及，工具调用的路由与聚合层将成为新的关键节点，该项目的增长具有风向标意义。