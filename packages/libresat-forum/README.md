# LibreSat Forum

[GNU Mailman](http://www.list.org/) distribution for the [LibreSat](http://libresat.space/) project.

> Consider reading the [infrastructure overview](https://github.com/opensdcp/opensdcp-infrastructure#overview) before continuing.

## Overview

This setup uses a microservice-like architecture, which means that each service is run independendly in it's own Docker container wherever possible, which allows for them to be scaled individually.

```text
                                                                                 +-------------+
                                                                                 |             |
                                                                      +----------+  Postorius  <-----------+
                                                                      |          |             |           |
+----------------------------------+           +-----------------------------+   +-------------+    +------+-------+
|                                  |           |                      v      |                      |              |
| External SMTP Server (Smarthost) <-------------+ Exim <-----+ Mailman Core |                      |     User     |
|                                  |           |                      ^      |                      |              |
+----------------------------------+           +-----------------------------+   +-------------+    +------+-------+
                                                                      |          |             |           |
                                                                      +----------+  Hyperkitty <-----------+
                                                                                 |             |
                                                                                 +-------------+
```

## Demo

Visit [forum.libresat.space](https://forum.libresat.space) and take a look at our instance.

## Usage

### Preparation

> TODO: Add preparation

### Configuraton

> TODO: Add configuration

### Building

### Exim Smarthost with Mailman

#### Build, Run, Test

```bash
chmod +x exim-smarthost-mailman/run.sh
exim-smarthost-mailman/run.sh
```

#### Alternative: Manual

> Container's hostname must be a FQDN and has to be publicly reachable, otherwise mail delivery will fail. The container itself however does not have to be publicly reachable.

```bash
# Build the container
docker build \
--build-arg EXIM_DOMAIN="mail.domain.tld" \
--build-arg EXTERNAL_SMTP_DOMAIN="mail.mailhost.tld" \
--build-arg EXTERNAL_SMTP_USERNAME="noreply@domain.tld" \
--build-arg EXTERNAL_SMTP_PASSWORD="securepassword1" \
--build-arg MAILMAN_DOMAIN="lists.domain.tld" \
--build-arg MAILMAN_ADMIN_EMAIL="admin@domain.tld" \
--build-arg MAILMAN_ADMIN_USERNAME="secureusername"  \
--build-arg MAILMAN_ADMIN_PASSWORD="securepassword2" \
--build-arg MAILMAN_DEFAULT_LANGUAGE="en" \
exim-smarthost-mailman \
-t exim-smarthost-mailman
# Create volume for data
docker volume create exim-smarthost-mailman-data
# Run the container (remember: hostname must be FQDN and exist)
docker run \
-d \
-h "mail.domain.tld" \
-v exim-smarthost-mailmand-data:/var/tmp/mailman/data \
exim-smarthost-mailman
# Test the email capabilities
docker exec YOUR_CONTAINER_ID bash -c "echo \"Test Message Body\" | mail -s \"Test Message Subject\" admin@domain.tld"
# Test the REST API (should return 401)
docker exec YOUR_CONTAINER_ID bash -c "apt install -y curl && curl http://localhost:8001/3.1 && apt remove -y curl && apt -y autoremove"
```

### Exim Smarthost

> Container's hostname must be a FQDN and has to be publicly reachable, otherwise mail delivery will fail. The container itself however does not have to be publicly reachable.

```bash
# Build the container
docker build \
--build-arg EXIM_DOMAIN="mail.libresat.space" \
--build-arg EXTERNAL_SMTP_DOMAIN="mail.gandi.net" \
--build-arg EXTERNAL_SMTP_USERNAME="noreply@libresat.space" \
--build-arg EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234" \
exim-smarthost \
-t libresat-forum-exim-smarthost
# Run the container
ID=$(docker run -td -h "mail.libresat.space" libresat-forum-exim-smarthost)
# Send email using the container
docker exec $ID bash -c "echo \"Test Message Body\" | mail -s \"Test Message Subject\" user@domain.tld"
```

### Exim without Smarthost

> Use this if [Exim Smarthost](#exim%20smarthost) does not work. This does not require a smarthost, but is less performant.
> Container's hostname must be a FQDN and has to be publicly reachable, otherwise mail delivery will fail. The container itself however does not have to be publicly reachable.

```bash
# Build the container
docker build \
--build-arg EXIM_DOMAIN="mail.libresat.space" \
--build-arg EXTERNAL_SMTP_DOMAIN="mail.gandi.net" \
exim-smarthost \
-t libresat-forum-exim-no-smarthost
# Run the container
ID=$(docker run -td -h "mail.libresat.space" libresat-forum-exim-no-smarthost)
# Send email using the container
docker exec $ID bash -c "echo \"Test Message Body\" | mail -s \"Test Message Subject\" user@domain.tld"
```

### Startup

> TODO: Add startup

### Setup

> TODO: Add setup

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
Copyright (C) 2018 Felix Pojtinger

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

### Media

Media of LibreSat Forum (C) 2018 Felix Pojtinger

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png"/>
</a>

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
