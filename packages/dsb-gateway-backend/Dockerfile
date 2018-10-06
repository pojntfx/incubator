FROM node:10-alpine

LABEL maintainer="Felix Pojtinger <felix@pojtinger.com>"

RUN mkdir -p /opt/dsb-gateway-backend
COPY . /opt/dsb-gateway-backend
WORKDIR /opt/dsb-gateway-backend

RUN npm install
RUN npm run build
CMD npm start

EXPOSE 3000
EXPOSE 4000