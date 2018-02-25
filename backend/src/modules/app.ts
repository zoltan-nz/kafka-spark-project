import { Module } from '@nestjs/common';
import { App } from '../controllers/app';
import { Heartbeat } from '../controllers/heartbeat';
import { Downloader } from '../controllers/downloader';
import S3Downloader from '../services/s3-downloader';
import Kafka from '../services/kafka';
import { DataFiles } from '../controllers/data-files';

@Module({
  imports: [],
  controllers: [App, Heartbeat, Downloader, DataFiles],
  components: [S3Downloader, Kafka],
})
export class AppModule {}
