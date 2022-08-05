FROM node:16.13.0-alpine3.12

ENV NODE_PATH=./src

RUN apk update
RUN apk add --update \
    bash \
    && rm -f /var/cache/apk/*


RUN apk add -U bash

WORKDIR /app
COPY . /app

RUN rm -rf node_modules
RUN npm ci && npm cache clean --force --silent

EXPOSE 80

CMD ["bin/boot.sh"]
