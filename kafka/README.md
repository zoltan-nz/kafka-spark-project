# Kafka

Install Kafka on mac

```
$ brew install kafka
```

Start Zookeeper:

```
$ zookeeper-server-start ./kafka/config/zookeeper.properties 
```

Start Kafka:

```
$ kafka-server-start ./kafka/config/server.properties
```

Kafka topics

```
$ kafka-topics --list --zookeeper localhost:2181
$ kafka-topics --create --zookeeper localhost:2181 --partitions 1 --replication-factor 1 --topic boerse.dev
```

# Dockerization of Kafka

* https://github.com/wurstmeister/kafka-docker
* Difficulties with networking

## Problem with docker-composer network on macOS

Solution:
* Setting up priorities and dependencies, with `depends_on` property in `docker-compose.yml`

**Testing**

* Launch a separate docker container inside the network
* Connect to this container with command line, so we can 


Check the name of the kafka instance for the console.

```
$ docker ps
```

Use that name to run a terminal on it.

```
$ docker exec -it kafka-console /bin/bash
```

Commands for producers and consumers

```
$ /opt/kafka/bin/kafka-console-producer.sh --broker-list kafka-1:9092 --topic boerse.dev
$ /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka-1:9092 --topic boerse.dev --from-beginning
```

** Development

```
$ docker run wurstmeister/zookeeper
$ docker run wurstmeister/kafka
```
