import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('api/heartbeat')
export class HeartbeatController {
  @HttpCode(200)
  @Get()
  beat() {
    console.log('heartbeat was called'); // tslint:disable-line:no-console
  }
}
