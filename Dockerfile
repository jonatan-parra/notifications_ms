FROM node:6.11.3

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .
