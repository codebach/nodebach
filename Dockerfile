FROM node:latest

MAINTAINER codebach

# To not use cache on package update
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Setup
WORKDIR /app
ADD . /app

ENV NODE_ENV production

EXPOSE 3000