FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .