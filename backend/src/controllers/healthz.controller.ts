import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('healthz')
export class HealthzController {

  @HttpCode(200)
  @Get()
  beat() {}
}
