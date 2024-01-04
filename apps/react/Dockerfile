# FROM node:alpine as development

# WORKDIR /usr/src/app

# COPY package.json .
# COPY libs ./libs
# COPY apps/react ./apps/react

# RUN npm run install:react

# EXPOSE 3000

# CMD ["npm", "run", "dev:react"]

FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
CMD "npm" "start"