import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import * as cors from 'cors';
import Kafka from './services/kafka';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3000);
  playingWithKafka();
}

bootstrap();

function playingWithKafka() {
  const kafkaService = new Kafka();

  kafkaService.sendTransaction({data: {message: 'hello'}});
}
