FROM node:10-alpine

LABEL maintainer="Felix Pojtinger <felix@pojtinger.com>"

RUN mkdir -p /opt/dsb-gateway-frontend
COPY . /opt/dsb-gateway-frontend
WORKDIR /opt/dsb-gateway-frontend

RUN npm install
RUN npm run build
CMD npm start

EXPOSE 5000
