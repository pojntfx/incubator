#! /bin/bash

build_docker_image() {
	docker build \
		mailman-suite \
		-t $1
	DOCKER_IMAGE_ID=$1
}

get_docker_container_id() {
	DOCKER_CONTAINER_ID=$(docker run -d -p 25:25 -p 8000:80 -p 8024:8024 -h $1 $2)
}

send_test_mail() {
	# Sleep 60 seconds so that mailman can start
	sleep 60
	docker exec $1 bash -c "echo \"Test Message Body\" | mail -s \"Test Message Subject\" $2"
}

test_rest_api() {
	docker exec $1 bash -c "apt install -y curl && curl http://localhost:8001/3.1 && apt remove -y curl && apt -y autoremove"
}

echo "Building docker image ..."
build_docker_image "libresat-forum"
echo "Starting docker container ..."
get_docker_container_id "mail.libresat.space" $DOCKER_IMAGE_ID
echo "Testing mail functionality ..."
send_test_mail $DOCKER_CONTAINER_ID "goooglehupf007@gmail.com"
echo "Testing REST API (should return 401) ..."
test_rest_api $DOCKER_CONTAINER_ID
echo "Now open up http://localhost:8000/forum/hyperkitty and/or http://localhost:8000/forum/postorius to test out hyperkitty!"
