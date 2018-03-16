import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { HeartbeatController } from '../controllers/heartbeat.controller';
import { DownloaderController } from '../controllers/downloader.controller';
import S3DownloaderService from '../services/s3-downloader.service';
import KafkaService from '../services/kafka.service';
import { DataFilesController } from '../controllers/data-files.controller';
import { HealthzController } from '../controllers/healthz.controller';

@Module({
  imports: [],
  controllers: [AppController, HeartbeatController, HealthzController, DownloaderController, DataFilesController],
  components: [S3DownloaderService, KafkaService],
})
export class AppModule {}
