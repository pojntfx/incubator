# Base image
FROM node:11.3.0-alpine

# Metadata
LABEL maintainer="Felicitas Pojtinger <felicitas@pojtinger.com> @pojntfx"
LABEL license="AGPL-3.0"

# Update the system
RUN apk update

# Setup work dir
RUN mkdir -p /opt/social-media-feeds/frontend
WORKDIR /opt/social-media-feeds/frontend

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Add source code
COPY src src
COPY manifest.webmanifest .
COPY tsconfig.json .
COPY README.md .

# Build the app
RUN npm run build

# Configure the app
ENV PORT=5000
ENV NODE_ENV="production"
ENV HTTP_GATEWAY_URL="https://gateway.social-media-feeds.exoframe.services.learn-chinese.tk"

# Start the app
CMD npm start

# Expose HTTP gateway
EXPOSE 5000
