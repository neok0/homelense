[private]
default:
    just -l

# install dependencies
install:
    cd app && bun install

# run the development server
dev:
    cd app && bun run dev

# run the production server docker image
build:
    docker compose build
