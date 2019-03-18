import { Body, Controller, Post } from '@nestjs/common';
import { DownloadDto } from '../dtos/download.dto';
import { S3DownloaderService } from '../services/s3-downloader.service';

@Controller('api/downloader')
export class DownloaderController {
  constructor(private readonly s3DownloaderService: S3DownloaderService) {}

  @Post()
  async download(@Body() params: DownloadDto) {
    const date = params.date;
    console.log(date); // tslint:disable-line:no-console
    await this.s3DownloaderService.download(date);
  }
}
