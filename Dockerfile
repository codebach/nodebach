FROM node:latest

MAINTAINER codebach

ADD package.json /app/package.json
RUN cd /app && npm install

# Setup
WORKDIR /app
ADD . /app

ENV NODE_ENV production

EXPOSE 3000