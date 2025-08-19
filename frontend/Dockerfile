FROM node:alpine3.22 AS builder

WORKDIR /app

COPY /package.json .

RUN npm install



FROM node:alpine3.22

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY . .

EXPOSE 3000

CMD ["npm","start"]
