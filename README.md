# API-NODE-JS-SDK
node SDK to Hyperledge fabric
#npm install
npm install fabric-ca-client
npm install fabric-network

# swagger
npm install body-parser
npm install swagger-ui-express
npm install swagger-ui-dist

# docker build images
touch Dockerfile
touch .dockerignore

##Dockerfile
FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

##dockerignore
blockchain/config/walletOrg1
blockchain/config/walletOrg2
blockchain/config/walletOrg3
node_modules
npm-debug.log
Dockerfile
.dockerignore
.gitignore
README.md

##build docker images
docker build -t server/api-node-js-sdk:test . 