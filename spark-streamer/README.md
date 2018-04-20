# Spark Streamer implementation

Using macOS.

Install dependencies:

```
$ brew install maven
$ brew install apache-spark
```

```
$ mvn package
$ spark-submit --class "zoltan.nz.App" --master local[4] target/spark-streamer-1.0-SNAPSHOT.jar
```

Important:

* Use Scala v2.12

Connect to Apache Kafka on PORT `9092`

Launch Kafka Producer