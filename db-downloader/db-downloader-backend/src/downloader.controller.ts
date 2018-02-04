import { Body, Controller, Get, HttpCode } from '@nestjs/common';
import { Post } from '@nestjs/common/utils/decorators/request-mapping.decorator';
import { DownloaderDto } from './dto/downloader.dto';

@Controller('api/downloader')
export class DownloaderController {
  @Post()
  download(@Body() params: DownloaderDto) {
    const date = params.date;
    console.log(date); // tslint:disable-line:no-console
  }
}
