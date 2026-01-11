# Framework Research Notes

**Date**: 2026-01-04
**Author**: Project maintainer

## Idea
Research and select the best framework for an open-source crowdsourced AI knowledge base.

## Requirements
1. **Interactive content** - Embed JS/React demos in pages
2. **GitHub integration** - PRs for edits, easy contribution workflow
3. **Open source** - Community can fork and contribute
4. **Good DX** - Easy for PhD students and researchers to add content

## Frameworks Evaluated

### 1. Gollum ⭐⭐⭐
- Git-backed wiki by GitHub
- Supports Markdown, AsciiDoc
- **Pros**: Simple, git-native
- **Cons**: Strips JS from pages for security, limited interactivity

### 2. Wiki.js ⭐⭐⭐⭐
- Modern wiki with GitHub sync
- Blocks feature for web components (v3.0)
- **Pros**: Beautiful UI, built-in comments
- **Cons**: Less flexible than React for custom demos

### 3. Docusaurus ⭐⭐⭐⭐⭐ ← CHOSEN
- Meta's documentation framework
- **MDX** = Markdown + JSX (React components)
- **Pros**: Full React ecosystem, excellent for interactive content
- **Cons**: More complex than simple wikis

### 4. GitHub Wiki ⭐⭐
- Built into every repo
- **Pros**: Zero setup
- **Cons**: No JS, limited features

### 5. BookStack ⭐⭐⭐
- Hierarchical wiki (Books → Chapters → Pages)
- **Pros**: Beautiful, commenting built-in
- **Cons**: Less flexible for custom components

### 6. Outline ⭐⭐⭐
- Notion-like wiki
- **Pros**: Modern UX, commenting
- **Cons**: Less suited for technical documentation

## Decision
**Docusaurus** wins because:
1. MDX allows embedding React components directly in Markdown
2. "Edit this page" links integrate with GitHub PRs
3. Large ecosystem and community
4. Static site = free hosting on GitHub Pages/Vercel
5. Great for technical documentation

## Package Manager
Chose **bun** over npm/yarn/pnpm:
- ~10x faster than npm
- Modern, like `uv` for Python
- Drop-in replacement

## Next Steps
- [x] Initialize Docusaurus with bun
- [x] Set up planning structure
- [ ] Customize for aipedia.org
- [ ] Create content structure

