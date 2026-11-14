# Project Notes for Agents

## Overview

HomeLense is a Nuxt metasearch UI for self-hosted services. Search providers are implemented as server API routes and exposed through the shared search selector.

## Important Structure

- `app/nuxt.config.ts` — runtime configuration and public provider flags.
- `app/server/api/search/*.get.ts` — server-side provider integrations. Keep API tokens here; never expose them to client code.
- `app/server/utils/search.ts` — shared query validation, session enforcement, upstream fetch timeout, and error logging.
- `app/components/search/Search.vue` — provider registry, selection state, weights, and search orchestration.
- `app/components/search/SearchSelection.vue` — provider selection menu.
- `app/components/search/SearchResults*.vue` — result rendering.
- `app/public/images/icons/` — provider icons.
- `env.sample` and `README.md` — configuration documentation.

## Provider Pattern

To add a provider:

1. Add server-only API settings and public enabled/weight settings in `app/nuxt.config.ts`.
2. Add `app/server/api/search/<provider>.get.ts`.
3. Call `requireSearchSession(event)` before upstream requests.
4. Read the query with `getSearchQuery(event)` and use `fetchJson()` for bounded upstream requests.
5. Return normalized `SearchResult` objects: `{ id, title, link }`.
6. Register the provider in `app/components/search/Search.vue`.
7. Add an icon, environment examples, README documentation, and a feature spec under `docs/specs/` when behavior is non-trivial.

## Configuration and Secrets

- Use `NUXT_SEARCH_*` for server-only URLs and tokens.
- Use `NUXT_PUBLIC_SEARCH_PLUGIN_*` only for non-secret enablement and weight settings.
- Keep local secrets in `app/.env`; do not commit them.
- OAuth-protected search routes must retain `requireSearchSession()`.

## Versioning

`app/package.json` is canonical application version source. Nuxt config falls back to its version, and release workflows read it for Docker tags/build arguments.

## Commands

Run from `app/`:

```bash
pnpm run build
```

The project uses Bun lockfile/install behavior in Docker. `pnpm run build` is available locally when pnpm is installed.

## Known Build Warnings

Nuxt currently reports duplicate component names because UI directories contain both `index.ts` and same-named Vue components. Avoid expanding this pattern, but do not delete generated/vendor UI files without checking usage.
