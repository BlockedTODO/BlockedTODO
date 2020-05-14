# BlockedTODO Backend Service
Backend service to interact with the BlockedTODO database.
Exposes a GraphQL API.

# Required environment variables
All of these are already set in development mode when running with docker & docker-compose.

* `NODE_PATH=src`
* `DATABASE_NAME`
* `DATABASE_USER`
* `DATABASE_PASSWORD`
* `DATABASE_HOST`
* `DATABASE_PORT` (usually 5432 for postgres)

# Optional environment variables
The environment variables listed below aren't required, and have sensible defaults. Here are some example values.

* `DOMAIN_NAME=BlockedTODO.com`
* `PORT=3000`
