# AIpedia.org

⚠️ **Disclaimer**: Content is AI-generated offline with minimal human editing and supervision. Use with caution and verify information independently.

---

AI/ML wiki with interactive visualizations.

## Quick Start

```bash
bun install
bun dev
```

Visit `http://localhost:4321`

## Tech Stack

- **Astro** - Static site generator
- **React** - Interactive components
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Charts
- **KaTeX** - Math typesetting (self-hosted)

## Structure

```
src/
├── content/wiki/     # MDX articles
├── components/viz/   # Interactive visualizations
├── layouts/          # Page templates
├── lib/              # Search ranking, seeded RNG, motion preferences
├── scripts/          # Client-side behaviour (search)
└── pages/            # Routes, plus rss.xml / robots.txt / search-index.json
```

See `AGENTS.md` for the conventions this codebase relies on.

## License

MIT
