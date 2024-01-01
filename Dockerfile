FROM node:lts

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333
