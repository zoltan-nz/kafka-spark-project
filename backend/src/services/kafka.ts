import { Client, HighLevelProducer, KafkaClient } from 'kafka-node';

const KAFKA_TOPIC = 'boerse.dev';

const client = new KafkaClient();

const producer = new HighLevelProducer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
  console.error(error);
});

interface BoerseMessage {
  data: object;
}

export default class Kafka {

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

// const service = new KafkaService();
// service.sendTransaction({ data: { some: 'object' } });
