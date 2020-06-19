# Local setup

1. Install docker and docker-compose
2. Install smee client `npm install --global smee-client`
3. Start a new channel on [smee.io](https://smee.io)
4. Set the `SMEE_CHANNEL_URL` environment variable to the url of the channel

# Running the code

1. Set environment variables (details in each service's README file)
2. `make build`
3. `make start`

# Kubernetes
For local development, you should be completely fine using docker-compose (ie. the aforementioned steps).

However, production code runs on a kubernetes cluster, so you may need to run a kubernetes cluster locally with minikube.
If you want to run the kubernetes cluster locally, follow instructions in the section below.

Note: Unlike the docker-compose setup, the kubernetes local setup does not mount a volume.
This means that you need to rebuild an image and restart the running containers for local changes to take effect.

The locally running frontend also cannot communicate with the backend on a browser at the moment.

## Local kubernetes setup
1. Install `kubectl` and `minikube`
2. Follow the instructions in all the `kubernetes/*-secret-template.yaml` files

## Running the cluster
In a terminal at the root of the repository, run the following commands:

1. `make k80s-start`
2. Urls will be output to the terminal for each service accessible outside the cluster
3. `kubectl get all` to see the status of the cluster
4. `minikube dashboard` to see more detailed information in a browser
5. `kubectl get pods` followed by `kubectl exec --stdin --tty <pod name> -- /bin/bash` to open up a terminal in a running container

## Stop the cluster

1. `make k80s-stop`
