FROM node:12.14.0-alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=8192

RUN npm run build

EXPOSE 8080

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENTRYPOINT ["node", "dist/main"]
