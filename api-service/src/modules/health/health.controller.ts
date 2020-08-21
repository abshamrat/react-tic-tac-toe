import { Controller, Get } from '@nestjs/common';
import { Health } from './health.interface'

@Controller('healths')
export class HealthController {

  @Get('/')
  async healthy(): Promise<Health> {
    return { healthy: true };
  }
}
