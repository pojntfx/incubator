# LibreSat Forum

[GNU Mailman](http://www.list.org/) distribution for the [LibreSat](http://libresat.space/) project.

> Consider reading the [infrastructure overview](https://github.com/opensdcp/opensdcp-infrastructure#overview) before continuing.

## Overview

This setup uses a microservice-like architecture, which means that each service is run independendly in it's own Docker container, which allows for them to be scaled individually.

```text
                                                                                  Postorius
                                                                                       +
                                                                                       |
                                                                                       |
                                                            +--------------------------+
                                                            |
                                                            v
                               +----------------------------+--------------+
                               |                                           |
External SMTP Server  <--------+    Postfix (Satellite) + Mailman Core     |
                               |                                           |
                               +----------------------------+--------------+
                                                            ^
                                                            |
                                                            +--------------------------+
                                                                                       |
                                                                                       |
                                                                                       +
                                                                                  HyperKitty
```

## Demo

Visit [forum.libresat.space](https://forum.libresat.space) and take a look at our instance.

## Usage

### Preparation

> TODO: Add preparation

### Configuraton

> TODO: Add configuration

### Building

#### Postfix (Satellite) + Mailman Core

```bash
docker build \
--build-arg EXTERNAL_SMTP_DOMAIN="mail.gandi.net" \
--build-arg EXTERNAL_SMTP_USERNAME="noreply@libresat.space" \
--build-arg EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234" \
--build-arg LIST_DOMAIN="forum.libresat.space" \
--build-arg LIST_PASSWORD="sad83545dfsdf" \
postfix-mailman-core \
-t libresat-forum-postfix-mailman-core
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
