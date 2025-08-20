FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM node:18
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
ENV SHELL=/bin/bash
ENV BROWSER=none
CMD ["npm", "start"]
