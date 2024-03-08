FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

USER node:node

EXPOSE 3000

CMD ["node", "build/index.js"]