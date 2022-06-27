FROM node:16.13-alpine

RUN mkdir app

WORKDIR /app

COPY . /app

RUN npm install -g npm@8.13.1

RUN npm install

CMD ["npm","start"]