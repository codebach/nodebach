FROM node:latest

MAINTAINER codebach

RUN npm install -g nodemon

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

EXPOSE 3000