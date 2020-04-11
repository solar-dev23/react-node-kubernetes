FROM node:alpine as swapi-app-build

WORKDIR /client

COPY package.json yarn.lock README.md ./

RUN yarn

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_baseAPIURL=http://192.168.99.102:32725

RUN yarn build

FROM nginx:latest

LABEL maintainer=Ihor-Balabai

COPY --from=swapi-app-build /client/build/ /usr/share/nginx/html

EXPOSE 80
