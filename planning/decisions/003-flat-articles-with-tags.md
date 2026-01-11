# ADR-003: Use Flat Articles with Tags and Links (Not Category Hierarchies)

## Status
**Status**: Accepted
**Date**: 2026-01-04
**Deciders**: Project maintainers

## Context
We need to organize AI/ML knowledge in a way that:
1. Is easy for contributors to add content
2. Allows concepts to belong to multiple topics
3. Enables organic discovery through relationships
4. Doesn't require reorganization as content grows

Wikipedia uses a similar challenge - concepts don't fit neatly into single categories. "Attention mechanism" relates to: transformers, NLP, computer vision, neural networks, etc.

## Decision
Use **flat articles with multi-tags and wiki-style links** instead of rigid category hierarchies.

### Structure
```
docs/           # Flat list of concept articles
├── attention.mdx
├── transformer.mdx
├── bert.mdx
└── ...

papers/         # Paper explanations (by year prefix)
tutorials/      # Learning guides
glossary/       # Quick definitions
```

### Article Connections
1. **Tags** (multiple per article) - for discovery and filtering
2. **Wiki-style links** - inline links to other articles
3. **See Also sections** - explicit related content
4. **Prerequisites** - learning path links

### Example Frontmatter
```yaml
---
title: "Attention Mechanism"
description: "How neural networks learn to focus on relevant information"
tags: [architecture, transformer, attention, nlp, vision, foundational]
difficulty: intermediate
---
```

## Consequences

### Positive
- **Flexibility**: Articles can belong to multiple topics via tags
- **Easy contribution**: No debate about "where does this go?"
- **Organic growth**: New articles just link to existing ones
- **No reorganization**: Adding content doesn't break structure
- **Wikipedia-proven**: This model scales to millions of articles
- **Better discovery**: Tags enable multiple entry points to content
- **Simpler mental model**: Articles are the unit, not categories

### Negative
- **No built-in hierarchy**: Must rely on tags/links for structure
- **Tag management**: Need consistent tagging conventions
- **Potential orphans**: Articles without links may be hard to discover
- **Index pages needed**: Must manually curate topic landing pages

### Neutral
- Sidebar will show flat list or tag-based grouping
- Search becomes more important for navigation
- Related articles component needed for discovery

## Alternatives Considered

### Alternative 1: Deep Category Hierarchy
```
concepts/
├── architectures/
│   └── transformers/
│       └── attention.mdx
```

- **Pros**: Clear organization, familiar folder structure
- **Cons**: 
  - Where does "attention" live? (architectures? nlp? vision?)
  - Forces single categorization
  - Reorganization breaks links
  - Harder for contributors to know where to add
- **Why not chosen**: Too rigid, doesn't match how knowledge relates

### Alternative 2: Category + Subcategory (2 levels max)
```
docs/
├── architectures/
│   ├── attention.mdx
│   └── transformer.mdx
├── training/
│   └── optimization.mdx
```

- **Pros**: Some organization without deep nesting
- **Cons**: Still forces primary category choice, duplication questions
- **Why not chosen**: Still has the "where does this belong" problem

### Alternative 3: Pure Wiki (no structure at all)
- All content in one folder, no types
- **Pros**: Maximum flexibility
- **Cons**: No distinction between concepts, papers, tutorials
- **Why not chosen**: Some structure helps (papers vs concepts is useful)

## Implementation

### Folder Structure
```
docs/           # Concept articles (flat)
papers/         # Paper articles (flat, year-prefixed filenames)
tutorials/      # Tutorial articles (flat)
glossary/       # Quick definitions
```

### Tagging Convention
Tags should cover:
- **Topic**: transformer, attention, diffusion, llm
- **Domain**: nlp, vision, audio, multimodal
- **Type**: foundational, technique, architecture
- **Difficulty**: beginner, intermediate, advanced

### Components Needed
- `TagList` - Display tags on articles
- `RelatedArticles` - Show articles with shared tags
- `TagPage` - List all articles with a given tag
- `Backlinks` - Show "what links here" (optional)

### Navigation
- Sidebar: Grouped by content type (Concepts, Papers, Tutorials)
- Tags page: Browse by tag
- Search: Full-text search across all content
- Landing pages: Curated entry points for major topics

## References
- [Wikipedia Category System](https://en.wikipedia.org/wiki/Wikipedia:Categorization)
- [Zettelkasten Method](https://zettelkasten.de/posts/overview/) - Note-linking approach
- Planning note: `planning/notes/2026-01-04-ontology-structure.md`

