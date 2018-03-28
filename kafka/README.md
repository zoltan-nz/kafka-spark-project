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
