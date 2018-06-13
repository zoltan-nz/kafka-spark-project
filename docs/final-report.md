ENGR 440 - Report of Distributed Streaming Project
===

Zoltan Debre (300360191)

# Abstract

The main goal of this project is to build a basic environment for streaming data from one or more source, pipe through via a stream management platform which can be accessed by different consumer.

Our distributed streaming platform is [Apache Kafka](https://kafka.apache.org/), the main consumer of the streaming data is an [Apache Spark](https://spark.apache.org/) application.

Data source is a freely available financial data stream. The German Stock Exchange daily transaction history is available on an S3 bucket and it is part of the [Amazon Open Data Registry](https://registry.opendata.aws/).

This implementation provides a user interface for downloading and preparing csv files. Furthermore we can select a prepared csv data file as data source for streaming. The streamed data flow consumed by a channel in our Kafka environment. This topic is watched by our Apache Spark app, which can process, aggregate, modify our distributed data flow.

You can run this project on your local machine if all the required development tool is available and locally installed, or you can just fire up a docker composer process to run all component in an isolated docker cluster. 

# Architecture

The following graph help us to see the different component of this project.

Main components:
* Frontend application

# Appendix 1 - Original project proposal

## Problem to solve

* Providing data for a real-time networking/financial/e-commerce data dashboard which will be visualized on a website
* Using Apache Kafka and Apache Spark to process data
* The sample data can be for example network traffic details from a router, or buy and sell transaction of an online stock market or transactions about selling products in an online store or change of shipment status of ordered products.

## Milestones

### Introduction and fixing the data set, setup data stream using sample data (3 weeks)

* Creating a more detailed system plan and data structure
* Fixing the data set. [Possible raw data set](https://www.unsw.adfa.edu.au/australian-centre-for-cyber-security/cybersecurity/ADFA-NB15-Datasets/)
* Creating a sample data service to emulate realtime data stream.
* In case, that we can use a third-party data set, we don’t have to generate our random raw data. (Otherwise we should write a Node.js app, which generates a high frequency data stream randomly. A data record or log would be data about the transaction date and time, transaction type, transaction amount.)
* Optional: the real-time data will be stored in MongoDB/Cassandra cluster.
* Output: data structure, associated documentation, test suit

### Apache Kafka setup (3 weeks)

* Configure an Apache Kafka environment in docker
* Setup consumption and streaming of the real-time data set
* The result of this phase: a working Kafka environment which streaming data so other consumers can use this stream.
* Output: baseline performance valuation, unit tests, functional tests

### Apache Spark setup (3 weeks)

* Configure an Apache Spark environment in docker
* Setup data aggregation with Spark
* The output of this phase is an environment which provide an aggregated data in JSON format which can be consumed by a client application.
* Additional output: unit and acceptance tests for testing the API interface

### Client application (2 weeks)

* Assessing and selecting a client solution. Good candidates: Tableau, PowerBI
* Get JSON data via API
* Visualize the real-time data in Tableau or PowerBI.

### Documentation and presentation (1 week)

### Suggested technologies

* Each component containerized with Docker
* Optionally using Kubernetes to manage containers and deployment
* Tools: Apache Kafka, Apache Spark, Node.js, Cassandra (preferred, maybe MongoDB)

# Notes about finding financial data stream

* Option 1: crypto currency data stream: https://min-api.cryptocompare.com/
* Option 2: Deutsche Borse Public Dataset: https://aws.amazon.com/public-datasets/deutsche-boerse-pds/

**Crypto currency data streaming**

* Examples: https://github.com/cryptoqween/cryptoqween.github.io

Streaming data:

```
* Market (Bitfinex, Coinbase, ...)
* Type (BUY / SELL / UNKNOWN)
* ID
* Price
* Quantity
* Total
```

Schema example 2:

```
24h Change: $ 89.73 (1.13%)
Last Market: Bitfinex 
Trade ID: 218755598
Open Hour: Ƀ 7,808.48
High Hour: Ƀ 8,117.79
Low Hour: Ƀ 7,752.6
Open Day: Ƀ 7,960.33
High Day: Ƀ 8,163.11
Low Day: Ƀ 7,751.01
Last Trade Volume: Ƀ 0.1000
Last Trade Volume To: $ 803.2
24h Volume: Ƀ 93,824.02
24h VolumeTo: 
```



**Deutsche Borse Dataset Schema:**

* https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md

* [Raw data](https://s3.eu-central-1.amazonaws.com/deutsche-boerse-xetra-pds)
* [csv](https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/2018-02-01/2018-02-01_BINS_XEUR07.csv)

The dataset contains the following fields:

| Column Name | Data Description | Data Dictionary |
|-------------|------------------|-----------------|
|ISIN|ISIN of the security|string|
|Mnemonic|Stock exchange ticker symbol |string|
|SecurityDesc|Description of the security|string|
|SecurityType|Type of security|string|
|SecurityID|Unique identifier for each contract|int|
|Date |Date of trading period |date |
|Time |Hour and Minute of Trading Activity |time |
|Currency|Currency in which the product is traded|string - GBP (British Pounds Sterling); USD (US Dollar) TWD (Taiwan Dollar); CHF (Swiss franc); GBX (British Pence Sterling); EUR (Euro); KRW (Korean Won)|
|StartPrice|Trading price at the start of period|float|
|MaxPrice|Maximum price over the period|float|
|MinPrice|Minimum price over the period|float|
|EndPrice|Trading price at the end of the period|float|
|TradedVolume|Total value traded|float|
|NumberOfTrades|Number of distinct transactions during the period|int|

More links:

* https://chasing-coins.com/api/

Meeting notes with supervisors:
 
* Let's go with Deutsche Borse data
* Container 1: Load the cvs => HDFS, KAFKA
* Container 2: Spark streamer
* Analytics 

# DB Downloader Frontend API

Next steps:
* Add material design
* Check backend availability
* Add calendar widget
* Send the selected date to the backend

## Material Design

Popular Material Design Addon: [Material-UI](http://www.material-ui.com/#/)

```
$ npm i -S material-ui typeface-roboto
$ npm i -D @types/material-ui
```

Add `import 'typeface-roboto';` to `src/index.tsx`.

Simple material button in `App.tsx`:

```
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <RaisedButton label="Default"/>
      </MuiThemeProvider>
    );
  }
}

export default App;
```

* State and Prop management
* Change event
* Click event
* Ajax library

## Add Footer and check server status

* Create a new component: `Footer`
* Using `axios` to check server availability.

## Restructuring default layout

* Separate code in subfolders.
* Update Material UI

## Add router

* react-router v4

## Docker build

* Using `nginx:alpine`
* Add nginx configuration

```
$ docker build -t zoltannz/kafka-spark-project-frontend .
```

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

CSV columns: https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md#eurex

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

Extra steps:

* From the type definition was missing the `ProducerStream` class declaration.
* Suggested to the project maintainer, that we should keep the type definition directly in the project.

## Add Dockerfile

* Check `Dockerfile`
* Using `node:alpine` package
* Add `/healthz` endpoint
* Add graceful shutdown based on [these suggestions](https://github.com/BretFisher/node-docker-good-defaults)
* Add `pm2` for running and restarting node process

