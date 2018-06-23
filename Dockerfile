FROM node:8.9-alpine

RUN mkdir -p /app
WORKDIR /app
COPY ["package.json", "yarn.lock", "/app/"]
RUN yarn install

ADD . /app
RUN yarn run build

EXPOSE 3300

CMD ["node", "dist/main.js"]