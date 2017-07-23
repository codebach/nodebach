FROM node:latest

MAINTAINER codebach

ENV NODE_ENV development

RUN npm install -g nodemon

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

EXPOSE 3000