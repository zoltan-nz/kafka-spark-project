# Spark Streamer implementation

Using macOS.

Install dependencies:

```
$ brew install maven
$ brew install apache-spark
```

Important if you use `jenv`:

```
$ jenv enable-plugin maven
$ echo 'JAVA_HOME=$(/usr/libexec/java_home -v $(jenv version-name))' >> ~/.mavenrc
```

or use maven with `jenv exec`, for example: `jenv exec mvn clean install`

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

## Experiment #01 - Install Spark from Source

I tried the standard installation process, but Kafka and Spark did not work together as expected. Various errors blocked running of the basic examples. Issues with libraries, problem with unsolvable AbstractClasses, etc.

Instead of playing with standard installation methods, I started to build Spark from source code.

Cloning the original project

```
$ git clone git@github.com:apache/spark.git
``` 

Try to build

```
$ cd spark
$  build/mvn -DskipTests clean package
```

Failing with this issue:

```
[INFO] Using zinc server for incremental compilation
[info] 'compiler-interface' not yet compiled for Scala 2.11.8. Compiling...
error: scala.reflect.internal.MissingRequirementError: object java.lang.Object in compiler mirror not found.

```

A suggested solution:

Removing `scala-compile-first` and `scala-test-compile-first` from `pom.xml`

```
<execution>
  <id>scala-compile-first</id>
  <goals>
    <goal>compile</goal>
  </goals>
</execution>
<execution>
  <id>scala-test-compile-first</id>
  <goals>
    <goal>testCompile</goal>
  </goals>
</execution>
```

The above approach worked, I had a new build, but it was not working properly.

Found an other approach:
https://github.com/davidB/scala-maven-plugin/issues/185

So I added back the above compilation steps and I used the following command to run the build:

```
$ ./build/zinc-0.3.15/bin/zinc -shutdown
$ build/mvn -DskipTests -DrecompileMode=all clean package
```

Checking the build:

```
$ ./bin/spark-shell
> sc.parallelize(1 to 1000).count() 
```

We have access to Web UI: http://localhost:4040

So Experiment #01 is ready, we have a working Spark implementation.

## Experiment #02 - Playing with basic examples

```
$ ./bin/run-example JavaSparkPi
```

**Running basic streaming example:**

Run Netcat server in a separate terminal:
```
$ nc -lk 9999
```
Run Spark's example:
```
$ ./bin/run-example org.apache.spark.examples.streaming.JavaCustomReceiver localhost 9999
```

**Running the Kafka example:**

Run Kafka separately.

The following is the suggested example:

```
$ bin/run-example streaming.JavaDirectKafkaWordCount localhost:9092 test
```

Running the above I get the following error:

```
Exception in thread "main" java.lang.NoClassDefFoundError: org/apache/spark/streaming/kafka010/LocationStrategies
```

## Experiment #03 - Trying to solve the above problem

* How to build Spark: http://spark.apache.org/docs/latest/building-spark.html
* Similar issue on StackOverflow: https://stackoverflow.com/questions/25904809/spark-kafka-streaming-issue?rq=1
* My question on StackOverflow: https://stackoverflow.com/questions/50637266/how-could-we-run-the-kafka-example-in-the-official-spark-project

No solution yet.
