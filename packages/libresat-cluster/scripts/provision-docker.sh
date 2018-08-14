#! /bin/bash

# To start this on any system, run:
# curl https://gitlab.com/snippets/1741909/raw | bash -s -- "https://gitlab.com/snippets/1741925/raw" "libresat-platform"
# First parameter is the stack to deploy on the swarm, second parameter the name of the stack

LIBRESAT_PLATFORM_VERSION="0.0.1-0"

start() {
	printf "\033[0;32mLibreSat Platform Setup v.${LIBRESAT_PLATFORM_VERSION}\033[0m\n"
	install_dependencies
	get_sources $1 $2
	create_swarm
	deploy_stack $2
	show_worker_token
	show_manager_token
	printf "\033[0;32mEnd of LibreSat Platform Setup v.${LIBRESAT_PLATFORM_VERSION}\033[0m\n"
	printf "\033[0;32mHave a nice day!\033[0m\n"
}

install_dependencies() {
	printf "\033[0;32mInstalling dependencies ...\033[0m\n"
	DEBIAN_FRONTEND="noninteractive"
	debconf-set-selections <<<"unattended-upgrades unattended-upgrades/enable_auto_updates boolean true"
	debconf-set-selections <<<"unattended-upgrades unattended-upgrades/origins_pattern string origin=Debian,codename=${distro_codename},label=Debian-Security"
	apt update && apt upgrade -y && apt install -y curl docker-compose unattended-upgrades apt-listchanges
	curl https://get.docker.com | bash
}

get_sources() {
	printf "\033[0;32mGetting sources ...\033[0m\n"
	mkdir -p /opt/$2
	curl $1 -o /opt/$2/stack.yml
	mkdir -p /etc/traefik
	curl https://gitlab.com/.../traefik.toml -o /etc/traefik/traefik.toml
}

create_swarm() {
	printf "\033[0;32mCreating swarm ...\033[0m\n"
	LIBRESAT_PLATFORM_HOST_IP=$(hostname -I | cut -d" " -f1)
	docker swarm init --advertise-addr ${LIBRESAT_PLATFORM_HOST_IP}
}

show_worker_token() {
	printf "\033[0;32mRun this on all additional workers: "
	LIBRESAT_PLATFORM_WORKER_JOIN_TOKEN=$(docker swarm join-token worker -q)
	printf "docker swarm join --token ${LIBRESAT_PLATFORM_WORKER_JOIN_TOKEN} ${LIBRESAT_PLATFORM_HOST_IP}:2377 \033[0m\n"
}

show_manager_token() {
	printf "\033[0;32mRun this on all additional managers: "
	LIBRESAT_PLATFORM_MANAGER_JOIN_TOKEN=$(docker swarm join-token manager -q)
	printf "docker swarm join --token ${LIBRESAT_PLATFORM_MANAGER_JOIN_TOKEN} ${LIBRESAT_PLATFORM_HOST_IP}:2377 \033[0m\n"
}

deploy_stack() {
	printf "\033[0;32mDeploying stack ...\033[0m\n"
	docker stack deploy -c /opt/$1/stack.yml $1
}

start $1 $2
