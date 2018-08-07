#! /bin/bash

build_docker_image() {
  docker build \
  exim-smarthost-mailman \
  -t $1
  DOCKER_IMAGE_ID=$1
}

get_docker_container_id() {
  DOCKER_CONTAINER_ID=$(docker run -d -p 8001:8001 -p 25:25 -p 8024:8024 -h $1 $2)
}

send_test_mail() {
  docker exec $1 bash -c "echo \"Test Message Body\" | mail -s \"Test Message Subject\" $2"
}

test_rest_api() {
  # Sleep 10 seconds so that mailman can start
  sleep 10
  docker exec $1 bash -c "apt install -y curl && curl http://localhost:8001/3.1 && apt remove -y curl && apt -y autoremove"
}

echo "Building docker image ..."
build_docker_image "libresat-forum-exim-mailman"
echo "Starting docker container ..."
get_docker_container_id "mail.libresat.space" $DOCKER_IMAGE_ID
echo "Testing mail functionality ..."
send_test_mail $DOCKER_CONTAINER_ID "goooglehupf007@gmail.com"
echo "Testing REST API (should return 401) ..."
test_rest_api $DOCKER_CONTAINER_ID