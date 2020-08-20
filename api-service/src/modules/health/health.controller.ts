import { Controller, Get } from '@nestjs/common';

@Controller('healths')
export class HealthController {

  @Get('/')
  async healthy(): Promise<Object> {
    return { healthy: true };
  }
}
