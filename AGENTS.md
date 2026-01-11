# aipedia.org - AI Agent Instructions

## Quick Commands

```bash
bun dev      # Start dev server (port 4321)
bun build    # Build for production
```

## Content

- Wiki pages: `src/content/wiki/*.mdx`
- Visualizations: `src/components/viz/*.tsx`
- Frontmatter: `title`, `description`, `tags`

## Adding New Pages

1. Create `src/content/wiki/topic-name.mdx`
2. Add frontmatter with title, description, tags
3. Import React components with `client:load` for interactivity

## File Naming

- Pages: `kebab-case.mdx`
- Components: `PascalCase.tsx`
