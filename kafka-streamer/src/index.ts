import kafka from "kafka-node";

const client = new kafka.Client("localhost:2181", "kafka-client", {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
});

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
  console.log("Kafka Producer is connected and ready.");
});

producer.on("error", function(error) {
  console.error(error);
});

interface BoerseMessage {
  data: object;
}

export default class KafkaService {

  sendTransaction(data: BoerseMessage) {

    const messages = Buffer.from(JSON.stringify({ data }));

    // Create a new payload
    const record = [
      {
        topic: "deutsdhe-boerse.dev",
        messages,
        attributes: 1 // GZip compression
      }
    ];

    producer.send(record, (err, d) => console.log(err, d));
  }
};

const service = new KafkaService();
service.sendTransaction({ data: { some: 'object' }});
