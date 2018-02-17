# Apache Kafka and Apache Spark Project

* [Proposal](docs/proposal.md)
* [Notes about finding datasource](docs/finding-datastream-notes.md)

## Project components

* [Backend](backend/README.md)
* [Frontend](frontend/README.md)
* [Kafka](kafka/README.md)

## Research

### Useful links

* [Awesome Streaming](https://github.com/manuzhang/awesome-streaming)
* [Exactly-once Support in Apache Kafka](https://medium.com/@jaykreps/exactly-once-support-in-apache-kafka-55e1fdd0a35f)
* [Understanding When to use RabbitMQ or Apache Kafka](https://content.pivotal.io/blog/understanding-when-to-use-rabbitmq-or-apache-kafka)
* [Why need Zookeeper for Kafka?](https://www.quora.com/What-is-the-actual-role-of-Zookeeper-in-Kafka-What-benefits-will-I-miss-out-on-if-I-don%E2%80%99t-use-Zookeeper-and-Kafka-together)

# Deutsche Boerse Public Dataset Downloader

> Data source: https://aws.amazon.com/public-datasets/deutsche-boerse-pds/

The main goal of this service that user can select a day and the selected day's data will be streamed by a Streaming Service. 

## Backend

Requirements:
 
* Download the directory of the csv files
* Download the selected for streaming
* Downloaded raw datafiles will be stored in Volume instance inside a Kubernetes cluster

Backend framework: [Nest.js](https://nestjs.com/) with TypeScript

## Frontend

* Select a date for streaming

Frontend framework: [React.js with TypeScript](https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/README.md)

## Implementation Log


### Create frontend app

```
$ npm install -g create-react-app
$ create-react-app db-downloader-frontend --scripts-version=react-scripts-ts
```

Start frontend app

```
$ cd ./db-downloader-frontend
$ npm start
```

### Create backend API

```
$ git clone https://github.com/nestjs/typescript-starter.git db-downloader-backend
$ cd db-downloader-backend
$ rm -rf .git
$ npm i
```

development
```
$ npm run start
```

watch mode
```
$ npm run start:dev
$ open http://localhost:3000
```

production mode
```
npm run start:prod
```

### Changing development port

Changing the start script in frontend package.json: `"start": "PORT=3001 react-scripts-ts start"`

## Documentation

* [API framework, Nest.js original README](backend/FRAMEWORK_README.md)
* [Frontend framework, React.js original README](frontend/FRAMEWORK_README.md)
* [Backend documentation](backend/README.md)
* [Frontend documentation](frontend/README.md)
