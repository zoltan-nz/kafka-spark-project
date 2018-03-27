import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as cors from 'cors';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  try {
    // quit on ctrl-c when running docker in terminal
    process.on('SIGINT', () => {
      console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
      app.close();
    });

    // quit properly on docker stop
    process.on('SIGTERM', () => {
      console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
      app.close();
    });
  } catch (e) {
    console.error(e);
  }

  await app.listen(process.env.PORT || 3000);
}

bootstrap();