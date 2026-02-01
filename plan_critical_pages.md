# AIpedia Critical Pages Plan

**Date**: 2026-02-01  
**POC**: AI Content Expansion  

## TL;DR

AIpedia currently has **33 wiki pages** covering foundational architectures (Transformer, AlexNet, ResNet), attention mechanisms, VAEs, RNNs, and scaling laws. Critical gaps exist in **LLMs/foundation models**, **diffusion models**, **reinforcement learning**, **modern architectures (SSMs/Mamba)**, and **optimization fundamentals**.

---

## Current Coverage Analysis

### ✅ Well Covered
| Category | Pages |
|----------|-------|
| **Attention & Transformers** | transformer, bahdanau-attention, annotated-transformer |
| **CNNs & Vision** | alexnet, resnet, resnet-identity, dilated-convolutions |
| **RNNs & Sequences** | understanding-lstms, rnn-effectiveness, rnn-regularization, relational-rnn |
| **Generative (VAE)** | vae, variational-lossy-autoencoder |
| **Memory & Reasoning** | neural-turing-machines, neural-message-passing, relational-reasoning, pointer-networks |
| **Scaling & Training** | scaling-laws, pre-training, gpipe |
| **Theory** | kolmogorov-complexity, mdl-tutorial, mdl-weights, complexodynamics |

### ❌ Critical Gaps

---

## Priority 1: Foundation Models & LLMs (Highest Impact)

These are the most searched and referenced topics in modern AI:

| Page | Description | Why Critical |
|------|-------------|--------------|
| **gpt** | GPT architecture and autoregressive LMs | Foundation of ChatGPT, most influential LLM architecture |
| **bert** | Bidirectional encoder representations | Revolutionized NLP benchmarks, basis for many models |
| **instruction-tuning** | Fine-tuning for instruction following | Key technique behind helpful AI assistants |
| **rlhf** | Reinforcement Learning from Human Feedback | Core technique for aligning LLMs |
| **in-context-learning** | Learning from examples in the prompt | Emergent ability defining modern LLM use |
| **chain-of-thought** | Step-by-step reasoning in LLMs | Key prompting technique for complex reasoning |

---

## Priority 2: Diffusion Models (High Demand)

Powering image/video generation:

| Page | Description | Why Critical |
|------|-------------|--------------|
| **diffusion-models** | Denoising diffusion probabilistic models | Foundation of Stable Diffusion, DALL-E 2 |
| **score-matching** | Score-based generative modeling | Theoretical foundation for diffusion |
| **classifier-free-guidance** | Guidance without classifiers | Key technique for controllable generation |
| **latent-diffusion** | Diffusion in latent space | Enables high-resolution generation (Stable Diffusion) |

---

## Priority 3: Reinforcement Learning Fundamentals

Currently completely missing:

| Page | Description | Why Critical |
|------|-------------|--------------|
| **reinforcement-learning** | RL overview and MDP framework | Foundational concept |
| **q-learning** | Value-based RL | Classic algorithm, basis for DQN |
| **policy-gradient** | Direct policy optimization | Foundation for modern RL |
| **ppo** | Proximal Policy Optimization | Most widely used RL algorithm |
| **dqn** | Deep Q-Networks | Landmark deep RL result (Atari) |

---

## Priority 4: Modern Architectures

Recent breakthroughs:

| Page | Description | Why Critical |
|------|-------------|--------------|
| **vision-transformer** | ViT - Transformers for images | Unified vision-language architectures |
| **mamba** | State Space Models for sequences | Emerging alternative to Transformers |
| **mixture-of-experts** | MoE / sparse models | Powers GPT-4, Mixtral |
| **flash-attention** | Efficient attention algorithms | Critical for practical LLM training |
| **rotary-embeddings** | RoPE positional encoding | Used in LLaMA, most modern LLMs |

---

## Priority 5: Multimodal & Vision-Language

| Page | Description | Why Critical |
|------|-------------|--------------|
| **clip** | Contrastive Language-Image Pre-training | Foundation of multimodal AI |
| **multimodal-llms** | Vision-language models (GPT-4V, etc.) | Current frontier |
| **image-captioning** | Generating text from images | Classic multimodal task |

---

## Priority 6: Optimization & Training Fundamentals

Surprising gaps in basics:

| Page | Description | Why Critical |
|------|-------------|--------------|
| **backpropagation** | Computing gradients | Most fundamental algorithm |
| **gradient-descent** | Optimization fundamentals | Core training concept |
| **adam** | Adaptive moment estimation | Most used optimizer |
| **batch-normalization** | BatchNorm | Ubiquitous training technique |
| **layer-normalization** | LayerNorm | Essential for Transformers |
| **dropout** | Regularization technique | Foundational technique |

---

## Priority 7: Classic Papers & Historical

| Page | Description | Why Critical |
|------|-------------|--------------|
| **perceptron** | Original neural network | Historical foundation |
| **word2vec** | Word embeddings | Revolutionized NLP |
| **gan** | Generative Adversarial Networks | Major generative paradigm |
| **lstm** | Long Short-Term Memory (dedicated) | Deserves standalone page |
| **batch-size-scaling** | Large batch training | Important for efficiency |

---

## Recommended Implementation Order

### Phase 1: Foundation Models (Weeks 1-2)
1. `gpt.mdx` - GPT architecture
2. `bert.mdx` - BERT
3. `rlhf.mdx` - RLHF
4. `in-context-learning.mdx` - ICL

### Phase 2: Diffusion & Generation (Weeks 3-4)
5. `diffusion-models.mdx` - DDPM
6. `gan.mdx` - GANs
7. `latent-diffusion.mdx` - Latent diffusion

### Phase 3: RL Fundamentals (Weeks 5-6)
8. `reinforcement-learning.mdx` - RL overview
9. `policy-gradient.mdx` - PG methods
10. `ppo.mdx` - PPO

### Phase 4: Modern Techniques (Weeks 7-8)
11. `vision-transformer.mdx` - ViT
12. `clip.mdx` - CLIP
13. `mamba.mdx` - State Space Models

### Phase 5: Fundamentals (Ongoing)
14. `backpropagation.mdx`
15. `adam.mdx`
16. `batch-normalization.mdx`

---

## Notes

- Each page should follow existing format: frontmatter, description, math, interactive visualization
- Prioritize pages that link well to existing content (e.g., GPT builds on Transformer)
- Consider adding a "prerequisites" or "see also" section to connect pages
