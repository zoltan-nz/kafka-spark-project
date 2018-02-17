import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import KafkaService from './kafka.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3000);
  playingWithKafka();
}

bootstrap();

function playingWithKafka() {
  const kafkaService = new KafkaService();

  kafkaService.sendTransaction({data: {message: 'hello'}});
}
