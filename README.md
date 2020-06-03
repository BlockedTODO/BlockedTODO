# BlockedTODO
Code comment watcher that notifies when an issue is closed.

# Local setup

1. Install docker and docker-compose
2. Install smee client `npm install --global smee-client`

# Running the code
Requires docker and docker-compose.

1. Set environment variables (details in each service's README file)
2. `make build`
3. `make start`
4. `smee --url <smee webhooks url> --path /github_event_handler --port 3001`
