# Local setup

1. Install Docker (version 20 or higher)
2. Install Smee client `npm install --global smee-client`
3. Start a new channel on [smee.io](https://smee.io)
4. Set the `SMEE_CHANNEL_URL` environment variable to the url of the channel

# Running the code

1. Set environment variables (details in each service's README file)
2. `make build`
3. `make start`

# Kubernetes
For local development, you should be completely fine using docker compose (ie. the aforementioned steps).

However, production code runs on a kubernetes cluster, so you may need to run a kubernetes cluster locally with minikube.
If you want to run the kubernetes cluster locally, follow instructions in the section below.

Note: Unlike the docker compose setup, the kubernetes local setup does not mount a volume.
This means that you need to rebuild an image and restart the running containers for local changes to take effect.

## Local kubernetes setup
1. Install `kubectl`, `minikube`, and `helm`
2. Run `minikube start`, `minikube addons enable ingress`. Then run `minikube ip` take note of this ip address.
3. Append the following line to `/etc/hosts`: `<minikube ip> blockedtodo.local backend.blockedtodo.local app.blockedtodo.local` (replace `<minikube ip>` with the output from the command)
4. Follow the instructions in all the `kubernetes/*-secret-template.yaml` files

## Running the cluster
In a terminal at the root of the repository, run the following commands:

1. `eval $(minikube -p minikube docker-env)`
2. `make k8s-start`
3. Visit [blockedtodo.local](http://blockedtodo.local)

**Other useful commands**

- `kubectl get all` to see the status of the cluster
- `minikube dashboard` to see more detailed information in a browser
- `kubectl get pods -n blockedtodo` followed by `kubectl -n blockedtodo exec --stdin --tty <pod name> -- /bin/sh` to open up a terminal in a running container
- `kubectl -n blockedtodo create job <your-new-job-name> --from=cronjob/<name-of-deployed-cron-job>` to manually trigger a cron job

## Stop the cluster

1. `make k8s-stop`
2. Comment out the line for blockedtodo addresses in `/etc/hosts` if you want to access the live production servers on the browser.
