import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HeartbeatController } from './heartbeat.controller';
import { DownloaderController } from './downloader.controller';

@Module({
  imports: [],
  controllers: [AppController, HeartbeatController, DownloaderController],
  components: [],
})
export class AppModule {}
