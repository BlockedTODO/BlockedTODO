.PHONY: show-help build start stop down nuke \
	inspect-backend attach-backend inspect-backend-database \
	inspect-frontend attach-frontend \
	k80s-stop k80s-start

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
	@echo '  k80s-start | runs minikube, rebuilds images, applies kubernetes configuration.'
	@echo '  k80s-stop | deletes running deployments, pods, services.'

build:
	docker-compose --file services/docker-compose.yaml build

start:
	- (smee --url ${SMEE_CHANNEL_URL} --path /github_event_handler --port 3001 > /dev/null 2>&1)&
	- docker-compose --file services/docker-compose.yaml up --renew-anon-volumes

stop:
	docker stop `docker ps -aq`

down:
	docker-compose --file services/docker-compose.yaml down -v

nuke:
	- docker stop `docker ps -aq`
	- @echo 'Note: this may take a while'
	- docker system prune --all --volumes

inspect-backend:
	docker-compose --file services/docker-compose.yaml exec backend /bin/bash

attach-backend:
	docker attach --detach-keys="ctrl-\\" blockedtodo_docker_backend_1

inspect-backend-database:
	docker-compose --file services/docker-compose.yaml exec database psql app-database app-database-user

inspect-frontend:
	docker-compose --file services/docker-compose.yaml exec frontend /bin/sh

attach-frontend:
	docker attach --detach-keys="ctrl-\\" blockedtodo_docker_frontend_1

k80s-start:
	- eval $(minikube -p minikube docker-env)
	- minikube start
	- make build
	- kubectl apply -f kubernetes/.

k80s-stop:
	- kubectl delete deployments --all
	- kubectl delete pods --all
	- kubectl delete replica
	- kubectl delete service frontend-service
	- kubectl delete service backend-service
	- kubectl delete service postgres-service
	- kubectl delete secret frontend-secret
	- kubectl delete secret backend-secret
	- kubectl delete secret postgres-secret
	- kubectl delete configmap backend-configmap
	- kubectl delete configmap postgres-configmap
