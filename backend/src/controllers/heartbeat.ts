import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('api/heartbeat')
export class Heartbeat {

  @HttpCode(200)
  @Get()
  beat() {}
}
