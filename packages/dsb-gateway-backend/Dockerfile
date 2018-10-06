FROM node:10-alpine

LABEL maintainer="Felicitas Pojtinger <felicitas@pojtinger.com>"

RUN mkdir -p /opt/dsb-gateway-service
COPY . /opt/dsb-gateway-service
WORKDIR /opt/dsb-gateway-service

RUN npm install
RUN npm run dev

EXPOSE 3000
EXPOSE 4000