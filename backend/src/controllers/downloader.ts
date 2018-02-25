import { Body, Controller, Get, HttpCode } from '@nestjs/common';
import { Post } from '@nestjs/common/utils/decorators/request-mapping.decorator';
import { DownloadDto } from '../dto/download-dto';
import S3Downloader from '../services/s3-downloader';

@Controller('api/downloader')
export class Downloader {

  constructor(private readonly s3DownloaderService: S3Downloader) {
  }

  @Post()
  async download(@Body() params: DownloadDto) {
    const date = params.date;
    console.log(date); // tslint:disable-line:no-console
    await this.s3DownloaderService.download(date);
  }
}
