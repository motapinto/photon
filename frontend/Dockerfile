FROM node:13.12.0-alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . .