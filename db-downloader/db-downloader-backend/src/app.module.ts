import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HeartbeatController } from './heartbeat.controller';

@Module({
  imports: [],
  controllers: [AppController, HeartbeatController],
  components: [],
})
export class AppModule {}
