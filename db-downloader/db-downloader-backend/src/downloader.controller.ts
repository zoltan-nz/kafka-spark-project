import { Body, Controller, Get, HttpCode } from '@nestjs/common';
import { Post } from '@nestjs/common/utils/decorators/request-mapping.decorator';
import { DownloaderDto } from './dto/downloader.dto';
import { S3DownloaderService } from './s3-downloader.service';

@Controller('api/downloader')
export class DownloaderController {

  constructor(private readonly s3DownloaderService: S3DownloaderService) {
  }

  @Post()
  async download(@Body() params: DownloaderDto) {
    const date = params.date;
    console.log(date); // tslint:disable-line:no-console
    await this.s3DownloaderService.download(date);
  }
}
