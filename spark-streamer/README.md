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


https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html
https://databricks.com/blog/2016/07/28/structured-streaming-in-apache-spark.html
https://spark.apache.org/docs/2.2.0/structured-streaming-kafka-integration.html

Add SQL Kafka maven package

