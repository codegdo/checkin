FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json .
COPY libs ./libs
COPY apps/react-app ./apps/react-app

RUN npm run install:react

EXPOSE 3000

CMD ["npm", "run", "dev:react"]