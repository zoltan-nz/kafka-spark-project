import * as KafkaNode from 'kafka-node';

const KAFKA_TOPIC = 'boerse.dev';
const client = new KafkaNode.KafkaClient();
const producer = new KafkaNode.HighLevelProducer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
  console.error(error);
});

interface BoerseMessage {
  data: object;
}

export default class KafkaService {

  stream() {
    return new KafkaNode.ProducerStream();
  }

  sendTransaction(data: BoerseMessage) {

    const messages = Buffer.from(JSON.stringify({ data }));

    // Create a new payload
    const record = [
      {
        topic: KAFKA_TOPIC,
        messages,
        attributes: 1, // GZip compression
      },
    ];

    producer.send(record, (err, d) => console.log(err, d));
  }
}
