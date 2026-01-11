# AI/ML Knowledge Structure

**Date**: 2026-01-04
**Author**: Project maintainer
**Status**: Draft (Revised)

---

## Philosophy: Articles First, Not Categories

### ❌ Avoid: Rigid Category Hierarchy
```
# Too rigid, creates artificial boundaries
concepts/
├── architectures/
│   └── transformers/
│       └── attention.mdx   # Where does this really belong?
```

### ✅ Prefer: Flat Articles + Links + Tags
```
# Simple and flexible
docs/
├── attention.mdx           # Article about attention
├── transformer.mdx         # Article about transformers
├── bert.mdx               # Article about BERT
├── self-attention.mdx     # Article about self-attention
└── ...
```

**Why?**
- Concepts don't fit neatly into one category
- "Attention" belongs to: architectures, transformers, NLP, vision, etc.
- Flat structure = easier to contribute
- Links create organic relationships
- Tags enable multiple discovery paths

---

## Article Structure

### Every Article Has:

```yaml
---
title: "Attention Mechanism"
description: "How neural networks learn to focus on relevant information"
tags: [architecture, transformer, nlp, vision, foundational]
---
```

### Articles Link to Each Other (Wiki-style)

```mdx
The **attention mechanism** was introduced in the 
[Attention Is All You Need](/papers/2017-attention-is-all-you-need) paper.

It's the core building block of [Transformers](/transformer), 
used in models like [BERT](/bert) and [GPT](/gpt).

## Prerequisites
If you're new to this, start with:
- [Neural Networks](/neural-networks)
- [Sequence Models](/sequence-models)

## See Also
- [Self-Attention](/self-attention) - when Q, K, V come from the same source
- [Multi-Head Attention](/multi-head-attention) - parallel attention heads
- [Cross-Attention](/cross-attention) - attention between two sequences
```

---

## Content Types

Instead of categories, we have **content types**:

### 1. Concepts (docs/)
Core ideas and techniques
```yaml
---
title: "Attention Mechanism"
type: concept
tags: [architecture, transformer, attention]
difficulty: intermediate
---
```

### 2. Papers (papers/)
Research paper explanations
```yaml
---
title: "Attention Is All You Need"
type: paper
year: 2017
authors: ["Vaswani et al."]
arxiv: "https://arxiv.org/abs/1706.03762"
tags: [transformer, attention, nlp, foundational]
---
```

### 3. Tutorials (tutorials/)
Step-by-step learning guides
```yaml
---
title: "Build a Transformer from Scratch"
type: tutorial
tags: [transformer, pytorch, hands-on]
difficulty: advanced
estimated_time: "2 hours"
---
```

### 4. Glossary (glossary/)
Quick definitions
```yaml
---
title: "Softmax"
type: glossary
tags: [activation, basics]
---
```

---

## Directory Structure (Simplified)

```
docs/
├── index.mdx                 # Home/welcome page
├── attention.mdx
├── transformer.mdx
├── self-attention.mdx
├── bert.mdx
├── gpt.mdx
├── neural-network.mdx
├── backpropagation.mdx
├── diffusion.mdx
└── ...                       # Flat list of articles

papers/
├── index.mdx                 # Papers listing
├── 2017-attention-is-all-you-need.mdx
├── 2018-bert.mdx
├── 2020-gpt-3.mdx
└── ...

tutorials/
├── index.mdx                 # Tutorials listing
├── intro-to-transformers.mdx
├── build-attention-from-scratch.mdx
└── ...

glossary/
├── index.mdx                 # A-Z glossary
└── terms.mdx                 # Or individual term pages
```

---

## Tags (Multi-dimensional Discovery)

Articles have **multiple tags** for discovery:

```yaml
# attention.mdx
tags: 
  - architecture      # What kind of thing
  - transformer       # Related architecture
  - nlp              # Domain
  - vision           # Domain
  - foundational     # Importance
  - intermediate     # Difficulty
```

### Tag-based Pages (Auto-generated)
- `/tags/transformer` → All articles tagged "transformer"
- `/tags/foundational` → All foundational articles
- `/tags/beginner` → Beginner-friendly content

---

## Link Types

### 1. Inline Links (Natural flow)
```mdx
The [attention mechanism](/attention) allows models to focus...
```

### 2. Prerequisites Section
```mdx
## Prerequisites
- [Neural Networks](/neural-network) - understand basic NN first
- [Matrix Multiplication](/matrix-multiplication) - attention uses matrix ops
```

### 3. See Also Section
```mdx
## See Also
- [Self-Attention](/self-attention)
- [Multi-Head Attention](/multi-head-attention)
- [Transformer](/transformer)
```

### 4. Papers Section
```mdx
## Key Papers
- [Attention Is All You Need (2017)](/papers/2017-attention-is-all-you-need) - introduced the concept
- [BERT (2018)](/papers/2018-bert) - bidirectional attention
```

---

## Components for Navigation

### 1. Tag Cloud / Filter
```
┌─────────────────────────────────────────────────────────────┐
│ Filter by tag:                                              │
│ [transformer] [attention] [nlp] [vision] [beginner] ...    │
└─────────────────────────────────────────────────────────────┘
```

### 2. Related Articles (Auto-generated from shared tags)
```
┌─────────────────────────────────────────────────────────────┐
│ 📚 Related Articles                                         │
│ Based on shared tags: transformer, attention                │
│                                                             │
│ • Self-Attention                                           │
│ • Multi-Head Attention                                     │
│ • Transformer Architecture                                 │
│ • BERT                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 3. Backlinks (Wikipedia-style "What links here")
```
┌─────────────────────────────────────────────────────────────┐
│ 🔗 Pages that link to this article                          │
│                                                             │
│ • Transformer                                              │
│ • BERT                                                     │
│ • GPT                                                      │
│ • Vision Transformer                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Benefits of This Approach

| Aspect | Rigid Categories | Flat + Tags + Links |
|--------|------------------|---------------------|
| **Flexibility** | ❌ One home per article | ✅ Multiple tags |
| **Contribution** | ❌ Where does this go? | ✅ Just create article |
| **Discovery** | ❌ Must know hierarchy | ✅ Tags, search, links |
| **Relationships** | ❌ Parent-child only | ✅ Any-to-any links |
| **Maintenance** | ❌ Reorg is painful | ✅ Just update tags |

---

## Implementation Plan

1. **Simple folder structure**: `docs/`, `papers/`, `tutorials/`, `glossary/`
2. **Rich frontmatter**: tags, type, difficulty, related
3. **In-content links**: Wiki-style linking between articles
4. **Tag pages**: Auto-generated from frontmatter
5. **Related articles**: Component that shows articles with shared tags
6. **Backlinks**: Component showing "what links here"

---

## Example Article

```mdx
---
title: "Attention Mechanism"
description: "How neural networks learn to focus on relevant information"
tags: [architecture, transformer, attention, nlp, vision, foundational]
difficulty: intermediate
---

# Attention Mechanism

The **attention mechanism** allows neural networks to focus on relevant 
parts of the input when producing an output.

## Prerequisites
New to this? Start with:
- [Neural Networks](/neural-network)
- [Sequence-to-Sequence Models](/seq2seq)

## TL;DR
Attention computes a weighted sum of values, where weights are based 
on how relevant each value is to a query.

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

## Interactive Demo
<AttentionDemo />

## How It Works
...

## See Also
- [Self-Attention](/self-attention)
- [Multi-Head Attention](/multi-head-attention)
- [Cross-Attention](/cross-attention)

## Key Papers
- [Attention Is All You Need](/papers/2017-attention-is-all-you-need)
- [Neural Machine Translation by Jointly Learning to Align and Translate](/papers/2014-bahdanau-attention)

## References
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
```

---

## Questions Resolved

| Question | Answer |
|----------|--------|
| Categories vs flat? | **Flat articles + tags** |
| How to organize? | **By content type** (docs, papers, tutorials) |
| How to discover? | **Tags + links + search** |
| How to relate? | **Wiki-style links + shared tags** |
