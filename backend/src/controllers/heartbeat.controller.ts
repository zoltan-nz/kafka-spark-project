import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('api/heartbeat')
export class HeartbeatController {
  @HttpCode(200)
  @Get()
  beat() {}
}
