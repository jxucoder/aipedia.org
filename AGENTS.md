# aipedia.org - AI Agent Instructions

## Quick Commands

```bash
bun dev      # Start dev server (port 4321)
bun build    # Build for production
npx tsc --noEmit   # Typecheck (should report zero errors)
```

## Content

- Wiki pages: `src/content/wiki/*.mdx`
- Visualizations: `src/components/viz/*.tsx`
- Frontmatter: `title`, `description`, `tags`, `date`, optional `draft`

## Adding New Pages

1. Create `src/content/wiki/topic-name.mdx`
2. Add frontmatter with title, description, tags, date
3. Import React components with `client:visible` for interactivity

## File Naming

- Pages: `kebab-case.mdx`
- Components: `PascalCase.tsx`

## Conventions that matter

- **Hydrate with `client:visible`, not `client:load`.** Most visualizations sit
  below the fold; deferring them keeps React off the critical path.
- **Never call `Math.random()` on a React render path.** Astro server-renders
  every island and renders it more than once per build, so random values differ
  between the server HTML and the browser's first render and React throws the
  whole island away (hydration error #418). Use `createRng(seed)` from
  `src/lib/rng.ts`, created *inside* the function that draws from it. Randomness
  inside effects, intervals and click handlers runs after hydration, so plain
  `Math.random()` is correct there.
- **Import `src/lib/motion.ts` in any component that animates.** It switches
  Framer Motion off for visitors who ask for reduced motion; the CSS media query
  in `global.css` only reaches CSS transitions.
- **Don't add third-party stylesheet or font CDNs.** KaTeX and the web fonts are
  bundled from `node_modules` — without its stylesheet KaTeX expands the page to
  several thousand pixels wide, so a CDN outage is a broken site.
- Keep `--color-text-secondary` at or above 4.5:1 against both `--color-bg` and
  `--color-bg-secondary` in each theme.

## Layout

- `src/layouts/Base.astro` — shell, metadata, ⌘K search dialog, theme toggle
- `src/layouts/WikiPage.astro` — article scaffold, breadcrumb, TOC, related pages
- Shared page width is `max-w-5xl`; prose is capped at 68ch by the typography config
- Search is plain TypeScript (`src/scripts/search.ts` + `src/lib/search.ts`) and
  fetches `/search-index.json` on first use, so no page ships React just to search
