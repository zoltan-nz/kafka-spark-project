package nz.zoltan;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.streaming.StreamingQuery;
import org.apache.spark.sql.streaming.StreamingQueryException;


public class SparkStreamer {

  public static void main(String[] args) throws StreamingQueryException {

    SparkSession spark = SparkSession
      .builder()
      .appName("SparkStreamer")
      .config("spark.master", "local")
      .getOrCreate();

    // Create DataFrame representing the stream of input lines from connection to localhost:9999
    Dataset<Row> df = spark
      .readStream()
      .format("kafka")
      .option("kafka.bootstrap.servers", "localhost:9092")
      .option("subscribe", "boerse.dev")
      .load();

    StreamingQuery query = df.writeStream()
      .outputMode("append")
      .format("console")
      .start();

    query.awaitTermination();
  }
}
