# 18.17.1
FROM node:lts-alpine3.18

WORKDIR /shortify

COPY ["package.json", "yarn.lock", "./"]


RUN yarn install --immutable

COPY . ./

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
