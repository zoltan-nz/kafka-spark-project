# DB Downloader Backend API

Next steps:
* Add `GET http://localhost:3000/api/heartbeat` endpoint and respond with `200`
* Add `POST http://localhost:3000/api/download-date` endpoint and download raw data

## Implementation Log

* Install `cors` package and added to Express.
* Create `heartbeat.controller.ts`
* Add controller to the `app.module.ts`
* Accept POST request on `/api/downloader`

## Amazon AWS S3 downloader

https://aws.amazon.com/sdk-for-node-js/

```
$ npm install -S aws-sdk
```

Add credentials to `~/.aws/credentials`

```
[default]
aws_access_key_id =
aws_secret_access_key =
```

CSV example:

`s3://deutsche-boerse-eurex-pds/2018-02-14/2018-02-14-BINS-XEUR13.csv`

GET example for a csv:

https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/2017-05-01/2017-05-01_BINS_XEUR00.csv
https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/2018-02-14/2018-02-14-BINS-XEUR13.csv


Getting the list of keys of a bucket documentation: https://docs.aws.amazon.com/AmazonS3/latest/API/v2-RESTBucketGET.html

Deutsche Borse S3 dataset GitHub: https://github.com/Deutsche-Boerse/dbg-pds

Use EUREX data, it is up-to-date.

https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/?list-type=2&continuation-token=
https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/?list-type=2&prefix=2018-03-2

## Kafka Node

* Using `kafka-node` package (require Python 2.7)

Kafka-node documentation: https://github.com/SOHU-Co/kafka-node

```
$ pyenv local 2.7
$ npm i -S kafka-node
$ npm i -D @types/kafka-node
```

##* Install Kafka on mac

```
$ brew install kafka
```

### Zookeeper & Kafka

```
$ zookeeper-server-start ~/.brew/etc/kafka/zookeeper.properties
```

```
$ kafka-server-start ~/.brew/etc/kafka/server.properties
```

### Kafka topics

```
$ kafka-topics --list --zookeeper localhost:2181
$ kafka-topics --create --zookeeper localhost:2181 --partitions 1 --replication-factor 1 --topic boerse.dev
```