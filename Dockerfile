# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app
ARG NUXT_PUBLIC_VERSION='0.1.3'

COPY ./app/package.json ./app/bun.lock ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY ./app/ ./

RUN bun --bun run build

# copy production dependencies and source code into final image
FROM oven/bun:1 AS production
WORKDIR /app

LABEL org.opencontainers.image.title="homelense"
LABEL org.opencontainers.image.description="Selfhosted metasearch for other selfhosted applications."
LABEL org.opencontainers.image.version=${NUXT_PUBLIC_VERSION}
LABEL org.opencontainers.image.authors="Tobias Mainka <tobi.mainka@me.com>"
LABEL org.opencontainers.image.licenses="AGPL-3.0"
LABEL org.opencontainers.image.url="https://github.com/neok0/homelense"
LABEL org.opencontainers.image.source="https://github.com/neok0/homelense"
LABEL org.opencontainers.image.documentation="https://github.com/neok0/homelense#readme"


# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app

# run the app
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]
