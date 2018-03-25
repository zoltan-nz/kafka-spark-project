import * as KafkaNode from 'kafka-node';
import { Component } from '@nestjs/common';

const KAFKA_TOPIC = 'boerse.dev';

interface BoerseMessage {
  data: object;
}

@Component()
export default class KafkaService {

  client: KafkaNode.KafkaClient;
  producer: KafkaNode.HighLevelProducer;

  constructor() {
    this.client = new KafkaNode.KafkaClient();
    this.producer = new KafkaNode.HighLevelProducer(this.client);

    this.producer.on('ready', () => {
      console.log('Kafka Producer is connected and ready.');
    });

    this.producer.on('error', (error) => {
      console.error(error);
    });
  }

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

    this.producer.send(record, (err, d) => console.log(err, d));
  }
}
