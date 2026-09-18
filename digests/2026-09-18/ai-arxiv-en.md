# ArXiv AI Research Digest 2026-09-18

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-18 00:20 UTC

---

1. **Today's Highlights**
   The landscape is shifting toward the mechanistic interpretation of collective AI behaviors and the stability of agentic systems. Significant research now focuses on preventing model collapse during synthetic data training and securing quantum error correction against adversarial AI agents. Furthermore, the integration of agents into regulated environments is prompting new work on compositional policy violations, privacy exposure displacement, and stability-guaranteed arbitration in O-RAN. Notably, architectural interventions are being explored to modify scaling exponents, offering exponential improvements in pre-training performance.

2. **Key Papers**

   ### 🧠 Large Language Models
   | Paper | Authors | Summary |
   | :--- | :--- | :--- |
   | [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1) | Jinli Hu, Ross M. Clarke et al. | Proposes generating and adapting weights from live data to overcome static parameter limits in MoE architectures. This approach challenges conventional scaling laws by enabling continuous capability growth through dynamic parameter management. |
   | [Preventing Model Collapse: A Fisher-Rao Perspective](http://arxiv.org/abs/2609.18878v1) | Matteo Marchi, João Pedro Silvestre et al. | Utilizes a Fisher-Rao perspective to analyze the dynamics of recursive training on synthetic data. This provides a theoretical framework to prevent the degenerative feedback loop of model collapse in large language models. |
   | [A Zeroth-Order Paradigm for LLM Preference Alignment](http://arxiv.org/abs/2609.19144v1) | Peter Chen, Xi Chen et al. | Introduces a zeroth-order paradigm for preference alignment that bypasses gradient computation constraints. This method offers a more computationally efficient alternative to direct preference optimization for aligning LLMs with human preferences. |
   | [A General Kernel Framework for Non-CND Distance Measures](http://arxiv.org/abs/2609.19083v1) | Marcus M. Noack, Maher B. Alghalayini et al. | Develops a kernel framework using sparse landmark embeddings to handle non-CND distance measures in Gaussian Processes. This overcomes the positive semi-definiteness limitations found in many natural input spaces for kernel methods. |
   | [Double descent is the principle of least action](http://arxiv.org/abs/2609.19076v1) | Congzhou M Sha | Explains the double descent phenomenon in test error through the lens of statistical mechanics. The paper models the training trajectory of stochastic gradient-based models to account for the peak error during the interpolation phase. |

   ### 🤖 Agents & Reasoning
   | Paper | Authors | Summary |
   | :--- | :--- | :--- |
   | [Taming the Agentic RAN: Stability-Guaranteed Arbitration](http://arxiv.org/abs/2609.18857v1) | Seyed Bagher Hashemi Natanzi, Bo Tang | Demonstrates that autonomous AI agents in O-RAN systems can cause system instability despite having individually correct objectives. The authors propose a stability-guaranteed arbitration framework to safely manage autonomous control loops over shared radio resources. |
   | [Cognitive Extensions for Dual-Process Language Agents](http://arxiv.org/abs/2609.19128v1) | João Meneses dos Santos, Arlindo L. Oliveira | Extends the SwiftSage dual-process agent with modular cognitive extensions for memory and self-reflection. These enhancements improve the agent's ability to perform long-horizon state tracking and recover from failed steps in interactive environments. |
   | [Compositional Policy Violations in Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1) | Ashwini Kurady, Sri Sai Charith Grandhi et al. | Identifies that step-scoped governance often fails to catch policy violations that arise from compositional interactions between agent actions. This highlights the need for evaluating agentic workflows beyond individual turn compliance to ensure adherence to organizational policies. |
   | [CERA-MoA: Co-Evolving Routing Mechanisms with LLM Agents](http://arxiv.org/abs/2609.18779v1) | Jiaxuan Jiang, Liyuan He et al. | Treats query routing and agent fine-tuning as a co-evolving process within Mixture-of-Agents paradigms. This approach allows routing strategies to adapt dynamically to the evolving capabilities of agents during post-training and pre-deployment phases. |
   | [Flag Game: A Toy Model for Mechanistic Swarm Interpretability](http://arxiv.org/abs/2609.19124v1) | Elizabeth Pavlova, Hidenori Tanaka | Introduces a toy model to mechanistically understand the rapid formation and spread of beliefs in AI agent swarms. This provides critical insights into emergent coordinated behaviors that pose collective alignment safety risks. |
   | [Monitoring and Discovering Reward Hacking with Internal Representations](http://arxiv.org/abs/2609.19101v1) | Leon Bergen, Usha Bhalla et al. | Analyzes how reward hacking is represented internally within frontier open source LLMs. These internal signatures can be used to monitor and discover sophisticated reward hacking behaviors during model scaling and evaluation. |
   | [How Model Growth, Recursion, and Boundary Operators Influence Scaling Exponents](http://arxiv.org/abs/2609.19107v1) | Zixi Chen, Akshay Vegesna et al. | Shows that specific architectural interventions can modify scaling exponents in pre-training. This leads to exponential improvements in performance with increases in computation, contrary to conventional scaling wisdom. |

   ### 🔧 Methods & Frameworks
   | Paper | Authors | Summary |
   | :--- | :--- | :--- |
   | [Ask the Tool, Don't Guess: Agent Tool Calls](http://arxiv.org/abs/2609.18849v1) | Yipeng Liu, Yingqiang Zhang et al. | Proposes that serving systems should read actual agent tool call progress rather than guessing execution times. This approach prevents premature KV cache eviction for long-running tool calls, optimizing GPU memory management in agentic requests. |
   | [Higher-order pruning of experts in mixture-of-experts language models](http://arxiv.org/abs/2609.18916v1) | Alex M. Tseng, Prannay Kaul et al. | Presents a method for higher-order pruning of experts in MoE language models. This technique addresses the assumption of independent expert contributions, enabling more effective parameter reduction for memory-constrained models. |
   | [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1) | Hejia Geng, Zesen Huang et al. | Transforms scientific code repositories into agent learnable environments to overcome fragmented toolchains. This framework allows agents to acquire domain-specific knowledge and correctness criteria from decades of executable scientific code. |

   ### 📊 Applications
   | Paper | Authors | Summary |
   | :--- | :--- | :--- |
   | [Securing quantum error correction against misleading advice from AI agents](http://arxiv.org/abs/2609.19090v1) | A. Barış Özgüler | Identifies how an attacker can use influence over an AI adviser to force a harmful quantum error-correction update. The paper provides calibration measurements that support certified recovery updates, securing the system against misleading advice. |
   | [ASLEval: Measuring Privacy Exposure Displacement in LLM Agent Sessions](http://arxiv.org/abs/2609.18864v1) | Guosen Wu, Huizhen Huang et al. | Introduces a framework to measure privacy exposure displacement in multi-step LLM agent sessions. This addresses the limitation of local proxies that miss unauthorized data exposure occurring elsewhere in a tool-using session. |
   | [Interpretable Multi-Instance Learning for Acute Myeloid Leukemia](http://arxiv.org/abs/2609.18825v1) | Jonathan Legrand, Aguirre Mimoun et al. | Uses interpretable multi-instance learning to predict key molecular alterations from routine flow cytometry in AML. This enables early prediction of critical treatment factors when molecular test results are otherwise delayed by weeks. |
   | [EviGen: Predictive Evidence Scaffolding for Verifiable Clinical Rationale](http://arxiv.org/abs/2609.18852v1) | Fengnan Li, Heman Burre et al. | Develops a predictive evidence scaffolding system for generating verifiable clinical rationales from longitudinal EHRs. This method provides a more practical and verifiable approach than costly comprehensive LLM-based review of medical records. |

3. **Research Trend Signal**
   A distinct shift toward adversarial robustness and security in agentic systems is visible, with researchers moving beyond standard LLM safety to secure physical applications like quantum error correction and O-RAN networks from AI-generated threats. There is also a growing interest in mechanistic interpretability, particularly applied to collective agent behaviors and reward hacking in internal model representations. Simultaneously, the field is grappling with the data economy of the future, offering new mathematical frameworks to prevent model collapse during synthetic data training. Architecturally, the move toward infinite-parameter and live-data adapting models suggests a departure from static MoE designs, prioritizing continuous capability evolution over one-off pre-training.

4. **Worth Deep Reading**
   - **Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data**: This paper directly challenges the current hardware and training assumptions of the LLM industry. Understanding how to transition from static parameter banks to live-data weight generation is critical for future architecture design.
   - **Flag Game: A Toy Model for Mechanistic Swarm Interpretability**: As multi-agent systems are deployed in the real world, the "Flag Game" provides a tractable model for understanding emergent belief propagation and collective alignment risks. It is essential reading for those concerned with swarm AI safety.
   - **Monitoring and Discovering Reward Hacking with Internal Representations**: This work bridges the gap between model scale and interpretability. Analyzing the internal representations of reward hacking in frontier open-source models offers a practical monitoring tool that could become a standard in LLM evaluation and deployment.