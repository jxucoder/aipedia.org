# ADR-002: Use Bun as Package Manager

## Status
**Status**: Accepted
**Date**: 2026-01-04
**Deciders**: Project maintainers

## Context
We need a fast, modern package manager for the project. The JavaScript ecosystem has several options:
- npm (default, slow)
- yarn (faster, established)
- pnpm (fast, disk-efficient)
- bun (fastest, all-in-one)

## Decision
Use **bun** as the package manager and runtime.

## Consequences

### Positive
- **Speed**: ~10x faster installs than npm
- **All-in-one**: Package manager + bundler + runtime
- **Compatibility**: Drop-in replacement for npm/yarn
- **Modern**: Active development, growing ecosystem
- **Developer Experience**: Like `uv` for Python - fast and pleasant

### Negative
- **Maturity**: Newer than npm/yarn, potential edge cases
- **CI Support**: May need extra setup in some CI environments
- **Team Familiarity**: Some contributors may not have bun installed

### Neutral
- Lockfile format differs from npm/yarn
- Some npm scripts may need minor adjustments

## Alternatives Considered

### Alternative 1: npm
- Universal compatibility
- **Why not chosen**: Too slow, poor developer experience

### Alternative 2: pnpm
- Fast, mature, disk-efficient
- **Why not chosen**: bun is faster and offers more features

### Alternative 3: yarn
- Established, good monorepo support
- **Why not chosen**: bun is faster, yarn has fragmented versions (v1 vs berry)

## Implementation Notes

### Installation
Contributors can install bun via:
```bash
curl -fsSL https://bun.sh/install | bash
```

### CI Configuration
GitHub Actions should use:
```yaml
- uses: oven-sh/setup-bun@v1
  with:
    bun-version: latest
```

## References
- [Bun Documentation](https://bun.sh/)
- [Bun GitHub](https://github.com/oven-sh/bun)

