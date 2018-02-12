import {Client, KafkaClient, Producer} from 'kafka-node';

const client: Client = new Client('localhost:9092');
const producer: Producer = new Producer(client);

const payloads = [
  {topic: 'topic1', messages: 'hi', partition: 0},
  {topic: 'topic2', messages: ['hello', 'world']}
];

producer.on('ready', () => {
  producer.send(payloads, (err, data) => console.log(data));
});

producer.on('error', (err) => console.log(err));
