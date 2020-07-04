# BlockedTODO Backend Service
Backend service to interact with the BlockedTODO database.
Exposes a GraphQL API.

# Required environment variables
Most of these are automatically set when running with docker-compose, but all do need to be set manually on production environments

* `NODE_PATH=src`
* `DATABASE_NAME`
* `DATABASE_USER`
* `DATABASE_PASSWORD`
* `DATABASE_HOST`
* `DATABASE_PORT`
* `TOKEN_SECRET`
* `GITHUB_WEBHOOKS_SECRET`
* `GITHUB_APP_ID`
* `GITHUB_APP_PRIVATE_KEY` Note: replace newlines with `\n`

# Optional environment variables
The environment variables listed below aren't required, and have sensible defaults. Here are some example values.

* `DOMAIN_NAME=blockedtodo.com`
* `PORT=3000`
