# Project proposal 

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
