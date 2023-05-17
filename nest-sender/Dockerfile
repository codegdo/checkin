FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5001