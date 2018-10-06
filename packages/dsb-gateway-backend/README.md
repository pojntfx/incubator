# DSB Gateway Backend

A simple gateway microservice to the proprietary "Digitales Schwarzes Brett" service used in German schools.

[![Demo Site](https://img.shields.io/badge/Demo%20Site-api.dsb.rvwg.ga-blue.svg)](https://api.dsb.rvwg.ga)
[![Code License AGPL-3.0](https://img.shields.io/badge/Code%20License-AGPL--3.0-brightgreen.svg)](https://www.gnu.org/licenses/agpl-3.0.en.html)
[![Media License CC-BY-SA-4.0](https://img.shields.io/badge/Media%20License-CC--BY--SA--4.0-brightgreen.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Part of Incubator](https://img.shields.io/badge/Part%20Of-%20pojntfx--incubator-blue.svg)](https://gitlab.com/pojntfx/incubator)

## Usage

```bash
# Deploy to Kubernetes
$ helm install --values src/chart/values.yaml --namespace dsb-gateway-backend src/chart
```
