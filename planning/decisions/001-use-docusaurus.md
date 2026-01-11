# ADR-001: Use Docusaurus as the Documentation Framework

## Status
**Status**: Accepted
**Date**: 2026-01-04
**Deciders**: Project maintainers

## Context
We need a framework for building aipedia.org that supports:
1. Markdown/MDX content authoring
2. Interactive React components embedded in pages
3. GitHub-based contribution workflow (PRs)
4. Good SEO and performance
5. Easy for contributors to add content

## Decision
Use **Docusaurus 3.x** with TypeScript as the documentation framework.

## Consequences

### Positive
- **MDX Support**: Can embed React components directly in Markdown
- **GitHub Integration**: Built-in "Edit this page" links
- **Mature Ecosystem**: Large community, good documentation, many plugins
- **Performance**: Static site generation with React hydration
- **Familiar Stack**: React + TypeScript is widely known
- **Versioning**: Built-in docs versioning if needed
- **Search**: Algolia DocSearch integration available

### Negative
- **Build Time**: Can be slow for very large sites
- **Complexity**: More complex than simple static site generators
- **React Lock-in**: Components must be React-based

### Neutral
- Requires Node.js ecosystem knowledge
- Standard Docusaurus styling may need customization

## Alternatives Considered

### Alternative 1: Wiki.js
- Full-featured wiki with built-in comments
- GitHub sync available
- **Why not chosen**: Less flexibility for custom React components, heavier infrastructure

### Alternative 2: VitePress
- Faster build times, Vue-based
- **Why not chosen**: Smaller ecosystem, team more familiar with React

### Alternative 3: Astro
- Very flexible, supports multiple frameworks
- **Why not chosen**: Less mature documentation features, more configuration needed

### Alternative 4: Custom Next.js
- Maximum flexibility
- **Why not chosen**: Too much boilerplate, would reinvent Docusaurus features

## References
- [Docusaurus Documentation](https://docusaurus.io/)
- [MDX Documentation](https://mdxjs.com/)
- Initial discussion in project planning

