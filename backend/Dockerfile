## === FIRST STAGE ===
FROM node:11-alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN apk add --no-cache curl git python make g++

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN which yarn
RUN yarn --version
RUN yarn

## === SECOND STAGE ===
FROM node:11-alpine
# Backend services running on port 3000 as default, debug ports also exposed
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

ARG KAFKA_CONNECT=localhost:9092
ARG ZOOKEEPER_CONNECT=localhost:2181
ENV KAFKA_CONNECT $KAFKA_CONNECT
ENV ZOOKEEPER_CONNECT $ZOOKEEPER_CONNECT

# checking every 30s to ensure this service returns HTTP 200
HEALTHCHECK CMD curl -fs http://localhost:$PORT/api/heartbeat || exit 1

RUN mkdir -p /app
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules

ENV PATH /app/node_modules/.bin:$PATH

COPY ./dist ./dist
CMD ["pm2-docker", "dist/main.js"]
