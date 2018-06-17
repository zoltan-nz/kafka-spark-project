ENGR 440 - Report of Distributed Streaming Project
===

Author: [Zoltan Debre](http://zoltan.nz) (300360191) - [Victoria University of Wellington](https://www.victoria.ac.nz/), New Zealand

# Abstract

The main goal of this project is to build a basic environment for streaming data from one or more source, pipe through via a stream management platform which can be accessed by different consumer.

Our distributed streaming platform is [Apache Kafka](https://kafka.apache.org/), the main consumer of the streaming data is an [Apache Spark](https://spark.apache.org/) application.

Data source is a freely available financial data stream. The German Stock Exchange daily transaction history is available on an S3 bucket and it is part of the [Amazon Open Data Registry](https://registry.opendata.aws/).

This implementation provides a user interface for downloading and preparing csv files. Furthermore we can select a prepared csv data file as data source for streaming. The streamed data flow consumed by a channel in our Kafka environment. This Kafka topic is watched by our Apache Spark app, which may process, aggregate, modify our distributed data flow.

You can run this project on your local machine if all the required development tool is available and locally installed, or you can just fire up a docker composer process to run all component in an isolated docker cluster.

## Challenges and achievement

During the implementation I learned a lot about the following new technologies, frameworks and programming languages. It was really useful that my learning process was driven by an experiment, an application building project. It means I read a lots of documentation, played with examples and tutorials and finally I adopted and implemented in the project.

* React.js
* TypeScript
* Nginx configuration
* Node.js Streaming
* Nest.js Framework
* Apache Kafka
* Apache Spark
* Scala
* Maven configuration
* Docker Compose

One of a great achievement is a contribution to the open source community. During the implementation, I realized the Node.js Kafka connector TypeScript type definition is not up to date, so I proposed an update. It is part now the main Kafka Connector for Node.js.

Related commits and pull requests:
* https://github.com/SOHU-Co/kafka-node/pull/959/commits/9d878c88616f12c302d76cdfd1d05d56de2b7ace
* https://github.com/SOHU-Co/kafka-node/pull/959
* https://github.com/SOHU-Co/kafka-node/pull/965

# Architecture

## Motivation

The original motivation was to build a cluster which can accept streaming data, can process it, modify and analyse it. The practicality is to create a dashboard platform where a user friendly, visualized environment help for the user to deal with a naturally complex and difficult to understand data stream.   

## System components

In modern cloud based architecture, the user interaction exposed to a frontend web application. The web application connects to a server based backend API, which has access to other part of the cluster. This cluster should be scalable and should manage high frequency data flow.  

The following graph help us to see the individual components of this project and how they connect together.

Main components:
* Frontend application
* Backend application
* Apache Kafka server
* Apache Spark application

![Main components](./images/docker-compose-diagram.jpeg)

## Running the project

You can try out this project running all components in a docker composed cluster, each component will run in a separated container and they will be connected with the default network inside the compose cluster.

Prerequisites:
* Docker
* Port 80 should be available or change the port mapping of the `frontend` app in `docker-compose.yml`

Run the project:
* Clone this repository on your computer
* Fire up the docker compose cluster:
    
```    
$ docker-compose up
```    
    
* Open the frontend application in your browser: `$ open http://localhost:80`

## Run the project in developer mode

You can run all components locally. In this way you can easily debug and add new features.

**Prerequisites:**

* Locally installed Node.js ([How to Install Node.js](http://yoember.com/nodejs/the-best-way-to-install-node-js/))
* Locally installed Java 8 and Maven 3.5
* Locally installed Kafka with Zookeeper ([Kafka Quickstart](https://kafka.apache.org/quickstart))
* Locally installed Spark ([Install Spark](http://spark.apache.org/downloads.html))

The `setup` npm script will install individual packages and prepare the project for you. The `start:dev` will run all component's development script concurrently in the same terminal. 

```
$ npm run setup
$ npm run start:dev
```

# Implementation and challenges

## Finding dataset for streaming experiment

For a streaming experiment we need a dataset which are not static. A good dataflow is more likely a stream of transactional data, like log data, or frequently changing status data, moving objects geolocation data, etc.

In our experiment we focused on something which is related to financial data.

An option could be using crypto currency data streams. For example [CryptoCompare APIs](https://min-api.cryptocompare.com/). We can find example project how can you use it in your application: https://github.com/cryptoqween/cryptoqween.github.io. An other crypto currency API: https://chasing-coins.com/api/

Amazon maintains a nice list of open dataset also: https://registry.opendata.aws/

So an other great option to choose from this list. In this experiment we use the German Stock Exchange, Deutsche Börse Public Dataset: https://registry.opendata.aws/deutsche-boerse-pds/

**Important links**:

* DBG PDS Data Dictionary: https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md
* S3 bucket with list of filenames (xml): https://s3.eu-central-1.amazonaws.com/deutsche-boerse-xetra-pds
* The link format to one individual CSV file: https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/2018-02-01/2018-02-01_BINS_XEUR07.csv

As we can see on the Data Dictonary website, the Deutsche Börse Public Dataset contains XETRA and EUREX datasets with the following fields.

### XETRA

| Column Name | Data Description | Data Dictionary |
|-------------|------------------|-----------------|
|ISIN|ISIN of the security|string|
|Mnemonic|Stock exchange ticker symbol |string|
|SecurityDesc|Description of the security|string|
|SecurityType|Type of security|string|
|Currency|Currency in which the product is traded|ISO 4217 string (see https://en.wikipedia.org/wiki/ISO_4217)|
|SecurityID|Unique identifier for each contract|int|
|Date |Date of trading period |date |
|Time|Minute of trading to which this entry relates|time (hh:mm)|
|StartPrice|Trading price at the start of period|float|
|MaxPrice|Maximum price over the period|float|
|MinPrice|Minimum price over the period|float|
|EndPrice|Trading price at the end of the period|float|
|TradedVolume|Total value traded|float|
|NumberOfTrades|Number of distinct trades during the period|int|

### EUREX

| Column Name | Data Description | Data Dictionary |
|-------------|------------------|-----------------|
|ISIN|ISIN of the security|string|
|MarketSegment|The product market segment, following the convention on http://www.eurexchange.com|string|
|UnderlyingSymbol|The underlying security|string|
|UnderlyingISIN|ISIN of any underlying security|string|
|Currency|Currency in which the product is traded|ISO 4217 string (see https://en.wikipedia.org/wiki/ISO_4217)|
|SecurityType|Type of instrument|string - OPT (option), FUT (future)|
|MaturityDate|Maturity date of the security|date|
|StrikePrice|Strike price|float|
|PutOrCall|Type of option|string - PUT, CALL|
|MLEG|Identifies multi-leg options|string|
|ContractGenerationNumber|The generation number for options contracts|int|
|SecurityID|Unique identifier for each contract|int|
|Date|Date of trading period|date |
|Time|Minute of trading to which this entry relates|time (hh:mm)|
|StartPrice|Trading price at the start of period|float|
|MaxPrice|Maximum price over the period|float|
|MinPrice|Minimum price over the period|float|
|EndPrice|Trading price at the end of the period|float|
|NumberOfContracts|Number of contracts traded during the period|int|
|NumberOfTrades|Number of distinct trades during the period|int|
 
Source: https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md

For a simple experiment, it is enough to download only one or two csv files manually and using them in our application, so it can be a quick solution. However in this project, we build a simple user interface to pick a date in our frontend application, and the backend app downloads all the available csv files from that date, concatenate them to one file. Using an other frontend interface we can choose a downloaded, concatenated csv file for streaming.

## Frontend Application

The frontend application is a single page app. We use React.js view library for building this simple interface.

At this stage the following features are implemented:

* Select date for downloading CSV data set from S3 buckets.
* Select concatenated csv files and start streaming.
* Sending heartbeat requests to checking the backend availability. 

The boilerplate of this application is created by using `Create React App for TypeScript`: https://github.com/wmonk/create-react-app-typescript

The frontend application components are based on Material UI component library: https://material-ui.com/

The app uses `react-router` version 4 and `axios` for managing ajax requests.

We can build a docker container also. It uses the production build of the React app. Basically, it is a simply static web content (html, css, js). We need a webserver for accessing these files. The docker container is a light `nginx` container, based on `nginx:alpine` package. Please note, `nginx.conf` file contains a `proxy_pass` configuration, which redirect `/api` targeted requests to a different port, in this cast to the backend.   

```
        location /api {
          proxy_pass http://backend:3000;
        }
```        

# Deutsche Boerse Public Dataset Downloader

> Data source: https://aws.amazon.com/public-datasets/deutsche-boerse-pds/

The main goal of this service that user can select a day and the selected day's data will be streamed by a Streaming Service. 

## Backend

Requirements:
 
* Download the directory of the csv files
* Download the selected for streaming
* Downloaded raw datafiles will be stored in Volume instance inside a Kubernetes cluster

Backend framework: [Nest.js](https://nestjs.com/) with TypeScript



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

## Backend Application

## Kafka Cluster

## Spark Application

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

