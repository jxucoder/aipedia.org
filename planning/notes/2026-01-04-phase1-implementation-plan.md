# Phase 1 Implementation Plan

**Date**: 2026-01-04
**Author**: Project maintainer
**Status**: ✅ Completed

---

## Overview

Complete Phase 1 foundation work for aipedia.org:
1. ✅ Customize `docusaurus.config.ts`
2. ✅ Create content structure (flat articles + tags per ADR-003)
3. ✅ Build reusable components
4. ✅ Create example content

---

## Task 1: Customize docusaurus.config.ts

### Changes
- [x] Site title: "aipedia.org"
- [x] Tagline: "Interactive AI/ML Knowledge Base"
- [x] URL: https://aipedia.org
- [x] GitHub org/repo for "Edit this page"
- [x] Navbar: Concepts, Papers, Tutorials, Glossary, Blog, GitHub
- [x] Footer: Docs, Community, More sections
- [x] Enable math (KaTeX)
- [x] Color scheme

### Navbar Structure
```
🧠 aipedia  │ Concepts │ Papers │ Tutorials │ Glossary │ Blog │ [GitHub]
```

---

## Task 2: Create Content Structure

### Directory Structure (per ADR-003: Flat Articles + Tags)
```
docs/
├── index.mdx              # Welcome/home
├── attention.mdx          # Example concept
├── transformer.mdx        # Example concept
└── ...

papers/
├── index.mdx              # Papers listing
├── 2017-attention-is-all-you-need.mdx
└── ...

tutorials/
├── index.mdx              # Tutorials listing
└── getting-started.mdx

glossary/
├── index.mdx              # Glossary home
└── ...
```

### Frontmatter Schema
```yaml
---
title: "Article Title"
description: "SEO description"
tags: [tag1, tag2, tag3]
difficulty: beginner | intermediate | advanced  # optional
---
```

---

## Task 3: Build Components

### Priority 1 - Essential
| Component | File | Purpose |
|-----------|------|---------|
| `TagList` | `src/components/TagList.tsx` | Display tags on articles |
| `PaperMeta` | `src/components/PaperMeta.tsx` | Paper metadata block |
| `InfoBox` | `src/components/InfoBox.tsx` | Callout boxes |

### Priority 2 - Embeds
| Component | File | Purpose |
|-----------|------|---------|
| `HuggingFaceSpace` | `src/components/embeds/HuggingFaceSpace.tsx` | Embed HF Spaces |
| `YouTube` | `src/components/embeds/YouTube.tsx` | Embed videos |

### Component Structure
```
src/components/
├── TagList.tsx
├── TagList.module.css
├── PaperMeta.tsx
├── PaperMeta.module.css
├── InfoBox.tsx
├── InfoBox.module.css
├── embeds/
│   ├── HuggingFaceSpace.tsx
│   └── YouTube.tsx
└── HomepageFeatures/    # (existing, will update)
```

---

## Task 4: Example Content

Create working examples to demonstrate the system:

1. **docs/index.mdx** - Welcome page
2. **docs/attention.mdx** - Example concept article with tags, links, demo
3. **papers/index.mdx** - Papers listing page
4. **papers/2017-attention-is-all-you-need.mdx** - Example paper article
5. **tutorials/index.mdx** - Tutorials listing
6. **glossary/index.mdx** - Glossary home

---

## Task 5: Cleanup

- [ ] Remove default Docusaurus blog posts
- [ ] Remove default tutorial docs
- [ ] Update homepage

---

## Execution Order

```
Step 1: Config & Dependencies
├── Add math dependencies (remark-math, rehype-katex)
├── Update docusaurus.config.ts
└── Update package.json if needed

Step 2: Content Structure
├── Create docs/ with index.mdx
├── Create papers/ with index.mdx
├── Create tutorials/ with index.mdx
├── Create glossary/ with index.mdx
└── Update sidebars.ts

Step 3: Components
├── Create TagList component
├── Create PaperMeta component
├── Create InfoBox component
├── Create embed components
└── Export from index.ts

Step 4: Example Content
├── Create attention.mdx (concept example)
├── Create 2017-attention-is-all-you-need.mdx (paper example)
└── Update homepage

Step 5: Cleanup
├── Remove default blog posts
├── Remove default tutorial docs
└── Test everything
```

---

## Success Criteria

- [ ] Site loads with aipedia.org branding
- [ ] Navbar shows all sections
- [ ] Math equations render (KaTeX)
- [ ] Tags display on articles
- [ ] "Edit this page" links to GitHub
- [ ] Example concept page works
- [ ] Example paper page works
- [ ] Light and dark mode work
- [ ] `bun start` runs without errors
- [ ] `bun run build` succeeds

---

## Estimated Time
- Config: 15 min
- Content structure: 20 min
- Components: 45 min
- Example content: 30 min
- Cleanup & testing: 15 min
- **Total: ~2 hours**
