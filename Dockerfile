FROM node:boron-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 7777

CMD ["npm","run","start1"]
# CMD ["npm run start2"]
# CMD ["npm run start3"]