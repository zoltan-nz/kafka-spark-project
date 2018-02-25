import { Get, Controller } from '@nestjs/common';

@Controller()
export class App {

  @Get()
  root(): string {
    return 'Backend server is running...';
  }
}
