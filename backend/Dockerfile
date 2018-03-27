FROM node:alpine

RUN apk add --no-cache curl git

RUN mkdir -p /app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Backend services running on port 3000 as default, debug ports also exposed
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

ARG KAFKA_CONNECT=localhost:9092
ARG ZOOKEEPER_CONNECT=localhost:2181
ENV KAFKA_CONNECT $KAFKA_CONNECT
ENV ZOOKEEPER_CONNECT $ZOOKEEPER_CONNECT

# checking every 30s to ensure this service returns HTTP 200
HEALTHCHECK CMD curl -fs http://localhost:$PORT/healthz || exit 1

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

COPY ./dist ./dist
CMD ["pm2-docker", "dist/main.js"]