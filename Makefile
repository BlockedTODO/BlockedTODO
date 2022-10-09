.PHONY: show-help build start stop down nuke \
	inspect-backend attach-backend inspect-database \
	inspect-frontend attach-frontend \
	inspect-website attach-website \
	k8s-stop k8s-start

.DEFAULT_GOAL := show-help

show-help:
	@echo 'Available Commands:'
	@echo '  build | Build all containers.'
	@echo '  start | Starts all containers.'
	@echo '  stop | Stops all running containers.'
	@echo '  down | Stops containers, clears volumes & networks. If things are not working as expected, you likely want to run this command.'
	@echo '  nuke | Clears all images, containers, networks, and volumes. If all else fails, run this command.'
	@echo '  inspect-SERVICE | Runs bash inside the running service container.'
	@echo '  attach-SERVICE | attach local standard input, output, and error streams to the running service container.'
	@echo '  inspect-SERVICE-database | Runs psql in the dev database of the service.'
	@echo '  k8s-start | runs minikube, rebuilds images, applies kubernetes configuration.'
	@echo '  k8s-stop | deletes running deployments, pods, services.'

build:
	docker compose --file services/docker-compose.yaml build --parallel

start:
	- (smee --url ${SMEE_CHANNEL_URL} --path /github_event_handler --port 3000 > /dev/null 2>&1)&
	- docker compose --file services/docker-compose.yaml up --renew-anon-volumes

stop:
	docker stop `docker ps -aq`

down:
	docker compose --file services/docker-compose.yaml down -v

nuke:
	- docker stop `docker ps -aq`
	- @echo 'Note: this may take a while'
	- docker system prune --all --volumes

inspect-database:
	docker compose --file services/docker-compose.yaml exec database psql app-database app-database-user

inspect-backend:
	docker compose --file services/docker-compose.yaml exec backend /bin/bash

attach-backend:
	docker attach --detach-keys="ctrl-\\" blockedtodo_docker_backend_1

inspect-frontend:
	docker compose --file services/docker-compose.yaml exec frontend /bin/sh

attach-frontend:
	docker attach --detach-keys="ctrl-\\" blockedtodo_docker_frontend_1

inspect-website:
	docker compose --file services/docker-compose.yaml exec website /bin/sh

attach-website:
	docker attach --detach-keys="ctrl-\\" blockedtodo_docker_website_1

k8s-start:
	- eval $(minikube -p minikube docker-env)
	- minikube start --kubernetes-version=v1.22.12
	- make build
	- helm upgrade \
		--set backend.secrets.github_app_private_key='${GITHUB_APP_PRIVATE_KEY}' \
		--set backend.secrets.github_app_id='${GITHUB_APP_ID}' \
		--set backend.secrets.github_webhooks_secret='${GITHUB_WEBHOOKS_SECRET}' \
		--set backend.secrets.github_client_id='${GITHUB_CLIENT_ID}' \
		--set backend.secrets.github_client_secret='${GITHUB_CLIENT_SECRET}' \
		--install blockedtodo ./helm

k8s-stop:
	- helm uninstall blockedtodo
	- kubectl delete namespace blockedtodo
