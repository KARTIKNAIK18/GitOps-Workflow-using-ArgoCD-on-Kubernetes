FROM node:current-alpine3.22 AS builder

WORKDIR /app

COPY package.json .

RUN npm install

FROM node:current-alpine3.22 

WORKDIR /app

COPY --from=builder /app/node_modules /node_modules

COPY --from=builder /app/package*.json .

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]








