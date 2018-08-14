apt update && apt install -y curl docker-compose && curl https://get.docker.com/ | bash

mkdir -p /opt/traefik/

echo \
	'
[[acme.domains]]
  main = "libresat.space"

[entryPoints]
  [entryPoints.http]
  address = ":80"
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]

[acme]
email = "felicitas@pojtinger.com"
storage = "acme.json"
entryPoint = "https"
  [acme.httpChallenge]
  entryPoint = "http"

[api]

[docker]
endpoint = "unix:///var/run/docker.sock"
domain = "test.libresat.space"
watch = true
exposedByDefault = false
' >/opt/traefik/traefik.toml

echo \
	'version: "2"

services:
  traefik:
    image: traefik:latest
    restart: always
    ports:
      - 80:80
      - 443:443
      - 8080:8080
    networks:
      - web
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /opt/traefik/traefik.toml:/traefik.toml
      - /opt/traefik/acme.json:/acme.json
    container_name: traefik

networks:
  web:
    external: true
' >stack.yml

touch /opt/traefik/acme.json && chmod 600 /opt/traefik/acme.json

docker network create web

docker-compose -f stack.yml up

# docker run -d -p 8080:8080 -p 80:80 \
# -v $PWD/traefik.toml:/etc/traefik/traefik.toml \
# -v /var/run/docker.sock:/var/run/docker.sock \
# traefik

# docker run -d -p 8080:8080 -p 80:80 \
# -v $PWD/traefik.toml:/etc/traefik/traefik.toml \
# -v /var/run/docker.sock:/var/run/docker.sock \
# traefik

wget https://github.com/containous/traefik/releases/download/v1.7.0-rc3/traefik && chmod +x traefik

./traefik \
	--acme \
	--acme.storage=/etc/traefik/acme/acme.json \
	--acme.entryPoint=https \
	--acme.httpChallenge.entryPoint=http \
	--acme.email=felicitas@pojtinger.com

./traefik \
	--entryPoints=Name:http Address::80 Redirect.EntryPoint:https \
	--acme.email="felicitas@pojtinger.com" \
	--acme.storage="/opt/traefik/acme.json" \
	--acme.entrypoint="https" \
	--acme.httpchallenge.entrypoint="http"

./traefik \
	--acme.domains=libresat.space
