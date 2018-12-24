# Base image
FROM node:10.14.2-alpine

# Metadata
LABEL maintainer="Felix Pojtinger <felix@pojtinger.com> @pojntfx"
LABEL license="AGPL-3.0"

# Update the system
RUN apk update

# Setup work dir
RUN mkdir -p /opt/social-media-feeds/gateway
WORKDIR /opt/social-media-feeds/gateway

# Add source code
COPY src src
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Configure the app
ENV SECRET_KEY="asdf"
ENV TWITTER_API_KEY="serg5e645"
ENV TWITTER_API_SECRET_KEY="ssdfg45et455"
ENV FACEBOOK_ACCESS_KEY="sdgsdfgdsfg"
ENV INSTAGRAM_SESSION_TOKEN="dgfsdgdsfgffff%3fAqzRialBUeGqiQ3%3A26"

# Start the app
CMD npm start

# Expose the app
EXPOSE 3000
