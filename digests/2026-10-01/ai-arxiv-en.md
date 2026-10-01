# ArXiv AI Research Digest 2026-10-01

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-01 00:20 UTC

---

### Today's Highlights
This batch of research strongly emphasizes the evolution of agentic systems, moving beyond simple tool use to include meta-reasoning, self-distillation, and the design of agent "harnesses" that shape execution environments. Significant progress is being made in model efficiency, with multiple papers addressing the memory bottlenecks of linear attention, recurrent state quantization, and Mixture-of-Experts architectures for resource-constrained deployment. There is also a growing focus on reliability and safety, particularly in verifying that LLM agents actually execute their declared plans and in managing gender bias across diverse model families. Finally, the boundary between language models and physical domains is expanding, with new work applying agent frameworks to autonomous driving and robot policy improvement.

### Key Papers

🧠 **Large Language Models (architecture, training, alignment, evaluation)**

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Pretraining Latent Information Feedback Transformers with Teacher Supervision](http://arxiv.org/abs/2609.38149v1) | Tirosh et al. | Proposes a mechanism to feed deep-layer representations back to shallower layers in Transformers. This addresses the "narrow channel" issue where models must recompute intermediate results, improving information flow. |
| [Gender bias across LLMs is common and highly heterogenous](http://arxiv.org/abs/2609.38036v1) | Bolzoni et al. | Analyzes gender biases in large language models, revealing that these biases are common but highly heterogeneous across different model architectures. This is crucial for organizations integrating LLMs into decision-support tools. |
| [Probability is Not Enough: Exploring and Counting Divergent Tokens for Reasoning Uncertainty Quantification in LLMs](http://arxiv.org/abs/2609.38070v1) | Li et al. | Introduces a method for quantifying reasoning uncertainty by counting divergent tokens, rather than relying solely on probability estimates. This helps in calibrating the confidence of LLMs on complex reasoning tasks. |
| [Correct Answers, Invalid Traces: What Verifiable Grade-School Math Reveals About Chain-of-Thought Traces](http://arxiv.org/abs/2609.38107v1) | Puduppully et al. | Investigates whether chain-of-thought traces are reliable records of a model's reasoning process. It highlights that even with correct answers, the traces may contain invalid steps, complicating auditing and debugging. |

🤖 **Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)**

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Thinking Before Thinking: Scaling Agentic Inference Through Meta-Reasoning](http://arxiv.org/abs/2609.38147v1) | Dahal et al. | Introduces agentic meta-reasoning to control the execution of complex tasks. This inference-time harness helps agents decide whether to build on partial work or start fresh, improving control over long-running processes. |
| [Learning Meta-Skills for Agent Harness Design in Test-Time AI4AI](http://arxiv.org/abs/2609.38143v1) | Qian et al. | Studies how a "Builder" model can learn to construct better execution environments for a "Target" model without updating weights. This test-time AI-for-AI approach makes the Builder's experience reusable for creating superior agent harnesses. |
| [AdviSD: Learning to Advise Frontier LLMs via Targeted Multi-Turn Self-Distillation](http://arxiv.org/abs/2609.38142v1) | Agrawal et al. | Demonstrates that a small, trainable advisor can steer a frozen, large language model using natural-language advice. By using self-distillation from completed interactions, the advisor learns to provide more effective guidance. |
| [Do LLM Agents Execute the Plans They Declare? From Planning-Mode Declaration to Pattern-Specific Execution](http://arxiv.org/abs/2609.38108v1) | Oota et al. | Analyzes the gap between the plans LLM agents declare and their actual execution. This study identifies specific patterns where execution fails to align with the selected plan, a critical issue for reliable long-horizon task completion. |
| [UserProxyBench: Evaluating LLM User Simulators for Agent Benchmarks and Training](http://arxiv.org/abs/2609.38043v1) | Jain et al. | Proposes a benchmark to evaluate the quality of LLMs acting as user simulators in agent environments. It addresses the gap in current benchmarks that score agents but do not verify if the simulated users are consistent and realistic. |

🔧 **Methods & Frameworks (new techniques, benchmarks, efficiency improvements)**

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [STEPQuant: When and Where Errors Matter in Delta-Rule Recurrent State Quantization](http://arxiv.org/abs/2609.38169v1) | Yao et al. | Tackles the memory bottleneck of linear attention models by identifying where quantization errors in recurrent states are most impactful. This allows for more effective low-precision serving without severe accuracy degradation. |
| [LeapQuant: Efficient Linear Attention with Accurate Recurrent State Quantization](http://arxiv.org/abs/2609.38166v1) | Pan et al. | Presents a method for accurate quantization of recurrent states in hybrid linear attention models. This is significant for reducing the cost of long-context processing in modern architectures like Gated DeltaNet. |
| [Mira: Memory-Efficient MoE Inference Using Adaptive Caching and Predictive Expert Staging](http://arxiv.org/abs/2609.38090v1) | Yadav et al. | Addresses the challenge of deploying Mixture-of-Experts models on resource-constrained systems. It uses adaptive caching and predictive staging to manage the dominant memory footprint of expert parameters. |
| [Jaxolotl: A Unified High-Performance Benchmark Suite for LTL-Based Multi-Task RL](http://arxiv.org/abs/2609.38065v1) | Jackermeier et al. | Introduces a benchmark suite for training reinforcement learning agents to follow instructions specified in Linear Temporal Logic (LTL). This provides a structured way to evaluate generalist multi-task policies. |
| [WUSH-KV: KV Cache Quantization with Data-Adaptive Transforms](http://arxiv.org/abs/2609.38121v1) | Chen et al. | Proposes a low-bit quantization method for the KV cache that adapts its transform based on the data's second-order statistics. This is designed to address the memory and bandwidth costs associated with long-context inference. |

📊 **Applications (domain-specific, multimodal, code generation)**

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [doPlan: A Variable-Horizon Dataset for Multi-Stage Language-Conditioned Planning in Autonomous Driving](http://arxiv.org/abs/2609.38028v1) | Roy et al. | Develops a dataset for autonomous vehicles to handle multi-stage passenger commands that depend on future events. This is essential for systems that must reason beyond immediate natural-language interactions. |
| [Beyond the Timeline: Augmenting Long-Video Memory with Grounded Entity Biographies](http://arxiv.org/abs/2609.38155v1) | Ren et al. | Introduces "grounded entity biographies" to improve long-video memory in vision models. This helps resolve physical identity over time, which is often lost in simple chronological descriptions. |
| [A foundation model for energy and radiation systems built on heterogeneous scientific interfaces](http://arxiv.org/abs/2609.38067v1) | Roy et al. | Presents a scientific foundation model that accounts for heterogeneous interfaces in energy and radiation problems. This advances the auditability of what is actually reused across different physical problem translations. |

### Research Trend Signal
A dominant trend is the maturation of the "agent" concept. The focus has shifted from simple single-turn tool use to more complex system-level design, including building the "harness" or execution environment around the model, as seen in works on meta-reasoning and AI-for-AI. This signals a move towards creating more controllable and reliable agentic systems.

Simultaneously, there is a clear push for efficiency in model architecture, particularly around the challenges of scaling to long contexts. The proliferation of papers on quantizing recurrent states, KV caches, and MoE models suggests the community is focused on making advanced architectures practical for real-world, resource-constrained deployment. Finally, a strong undercurrent of reliability and safety is evident, with researchers probing the limits of LLMs' reasoning traces and bias, indicating a growing recognition that "correct answers" are not sufficient without a trustworthy process.

### Worth Deep Reading
*   **[Thinking Before Thinking: Scaling Agentic Inference Through Meta-Reasoning](http://arxiv.org/abs/2609.38147v1)**: This paper addresses a fundamental challenge in scaling agent systems: how to control the execution process itself. The proposed meta-reasoning harness is likely to be a key component in future robust AI agents.
*   **[Learning Meta-Skills for Agent Harness Design in Test-Time AI4AI](http://arxiv.org/abs/2609.38143v1)**: The concept of a "Builder" model learning to design a better environment for a "Target" model is a novel and powerful paradigm. This could be a major breakthrough in creating more effective and generalizable agent systems without retraining the core models.
*   **[Do LLM Agents Execute the Plans They Declare?](http://arxiv.org/abs/2609.38108v1)**: As LLM agents are tasked with more critical, long-horizon goals, the reliability of their execution is paramount. This paper's analysis of the gap between declared plans and actual execution is critical for anyone building trustworthy agentic workflows.