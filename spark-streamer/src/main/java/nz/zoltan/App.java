package nz.zoltan;

import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.streaming.StreamingQuery;
import org.apache.spark.sql.streaming.StreamingQueryException;

import java.util.Arrays;

public class App {

  public static void main(String[] args) throws StreamingQueryException {

    SparkSession spark = SparkSession
      .builder()
      .appName("JavaStructuredNetworkWordCount")
      .getOrCreate();

    // Create DataFrame representing the stream of input lines from connection to localhost:9999
    Dataset<Row> df = spark
      .readStream()
      .format("kafka")
      .option("kafka.bootstrap.servers", "localhost:9092")
      .option("subscribe", "boerse.dev")
      .load();
    df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)");

    // Split the lines into words
    Dataset<String> words = df
      .as(Encoders.STRING())
      .flatMap((FlatMapFunction<String, String>) x -> Arrays.asList(x.split(" ")).iterator(), Encoders.STRING());

    // Generate running word count
    Dataset<Row> wordCounts = words.groupBy("value").count();

    // Start running the query that prints the running counts to the console
    StreamingQuery query = wordCounts.writeStream()
      .outputMode("complete")
      .format("console")
      .start();

    query.awaitTermination();
  }
}
