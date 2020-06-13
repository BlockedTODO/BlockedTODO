# BlockedTODO
Code comment watcher that notifies when an issue is closed.

# Local setup

1. Install docker, docker-compose, and terraform
2. Install smee client `npm install --global smee-client`
3. Start a new channel on [smee.io](https://smee.io)
4. Set the `SMEE_CHANNEL_URL` environment variable to the url of the channel

# Running the code

1. Set environment variables (details in each service's README file)
2. `make build`
3. `make start`
