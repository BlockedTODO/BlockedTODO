.PHONY: show-help build start stop down nuke \
	inspect-backend attach-backend inspect-backend-database \
	inspect-frontend attach-frontend

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

build:
	docker-compose --file services/docker-compose.yaml build

start:
	docker-compose --file services/docker-compose.yaml up --renew-anon-volumes

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
