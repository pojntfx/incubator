# LibreSat Forum

[LibreSat](http://libresat.space/)'s [GNU Mailman](http://www.list.org/) distribution.

> Consider reading the [infrastructure overview](https://github.com/opensdcp/opensdcp-infrastructure#overview) before continuing.

## Overview

> TODO: Add overview

## Demo

Visit [forum.libresat.space](https://forum.libresat.space) and take a look at our instance.

## Usage

### Preparation

```bash
# Create volume for mailman-core's data
docker volume create mailman-core-data
# Create volume for hyperkitty's data
docker volume create hyperkitty-data
```

### Configuraton

You can use [custom templates for Mailman](http://docs.mailman3.org/en/latest/config-core.html#configure-templates) by putting them into the `mailman-suite/assets/mailman-core/templates` folder.

### Building

#### With the build script

If you want to customize the containers, consider using the `build-run-test.sh` script:

```bash
# Make it executable
chmod +x mailman-suite/build-run-test.sh
# Run it
mailman-suite/build-run-test.sh
```

#### Without the build script

```bash
docker build \
--build-arg EXIM_DOMAIN="mail.libresat.space" \
--build-arg EXTERNAL_SMTP_DOMAIN="mail.gandi.net" \
--build-arg EXTERNAL_SMTP_USERNAME="noreply@libresat.space" \
--build-arg EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234" \
--build-arg MAILMAN_DOMAIN="forum.libresat.space" \
--build-arg MAILMAN_ADMIN_EMAIL="felicitas@pojtinger.com" \
--build-arg MAILMAN_ADMIN_USERNAME="pojntfx" \
--build-arg MAILMAN_ADMIN_PASSWORD="asdfasdf123" \
--build-arg MAILMAN_DEFAULT_LANGUAGE="en" \
--build-arg HYPERKITTY_ADMIN_USERNAME="Felicitas Pojtinger" \
--build-arg HYPERKITY_ADMIN_EMAIL="felicitas@pojtinger.com" \
--build-arg HYPERKITTY_API_KEY="asdfasdf474" \
mailman-suite \
-t "libresat-forum"
```

### Startup

```bash
docker run \
-d \
-h "mail@domain.tld" \
-p "8000:80" \
-v "mailman-core-data:/var/tmp/mailman/data" \
-v "hyperkitty-data:/hyperkitty/example_project" \
libresat-forum
# Now open up http://localhost:8000/hyperkitty and sign up!
```

### Setup

When signing up, confirm your registration by running the following:

```bash
docker exec DOCKER_CONTAINER_ID bash -c "less /hyperkitty/example_project/emails/*.log"
```

Open the verification link, but use `http` instead of `https`.

### Debugging

```bash
# Get docker container id
docker ps | grep libresat-forum
# Test exim by sending a mail
docker exec DOCKER_CONTAINER_ID bash -c 'echo "Test Message Body" | mail -s "Test Message Subject" user@domain.tld'
# Test mailman-core REST api (should return "401 Unauthorized")
docker exec DOCKER_CONTAINER_ID bash -c "apt install -y curl && sleep 15 && curl http://localhost:8001/3.1 && apt remove curl"
# Look at exim's logs
docker exec DOCKER_CONTAINER_ID bash -c "tail -f /var/log/exim4/mainlog" # This will log all mail traffic
# Look at mailman-core's logs
docker exec DOCKER_CONTAINER_ID bash -c "tail -f /var/tmp/mailman/logs/mailman.log" # When you sign up and verify using hyperkitty, the REST actions will show up here
# Look at mailman-core's logs
docker exec DOCKER_CONTAINER_ID bash -c "tail -f /var/log/apache2/error.log" # Hyperkitty's wsgi server logs here
# Use interactive bash inside the container
docker exec -it DOCKER_CONTAINER_ID bash
```

## Screenshots

> TODO: Add screenshots

## Documentation

Visit the [official GNU Mailman documentation](http://docs.mailman3.org/en/latest/) to learn more about GNU Mailman.

## Deployment

### Kubernetes

> TODO: Add Kubernetes deployment

### Docker Swarm

> TODO: Add Docker Swarm deployment

## License

### Source Code

<a rel="license" href="https://www.gnu.org/licenses/agpl.html">
  <img alt="AGPL-3.0 License" style="border-width:0" src="https://www.gnu.org/graphics/agplv3-155x51.png"/>
</a>

LibreSat Forum
Copyright (C) 2018 Felicitas Pojtinger

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

### Media

Media of LibreSat Forum (C) 2018 Felicitas Pojtinger

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png"/>
</a>

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
