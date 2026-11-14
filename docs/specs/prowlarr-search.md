# Spec: Prowlarr Search Plugin

## Objective
Add an optional Prowlarr search source to the unified search UI. Users can search configured Prowlarr indexers through the server-side API without exposing the Prowlarr API key to browsers.

## API Contract
- Upstream: `GET {NUXT_SEARCH_PROWLARR_API_URL}/api/v1/search`
- Required query: `query`, `type=search`, `limit=50`
- Authentication: `X-Api-Key` request header
- Returned result: Prowlarr `title`, preferring `infoUrl` and falling back to `guid`/`downloadUrl` for its link.

## Configuration
- `NUXT_PUBLIC_SEARCH_PLUGIN_PROWLARR_ENABLED`
- `NUXT_PUBLIC_SEARCH_PLUGIN_PROWLARR_WEIGHT`
- `NUXT_SEARCH_PROWLARR_API_URL`
- `NUXT_SEARCH_PROWLARR_API_TOKEN`

Plugin is disabled by default and follows existing OAuth/session protection on search endpoints.

## Success Criteria
- Plugin appears in app selection only when enabled.
- Search requests reach Prowlarr server-side with the API key in `X-Api-Key`.
- Empty or malformed upstream results do not break unified search.
- Build passes with no new runtime dependencies.
