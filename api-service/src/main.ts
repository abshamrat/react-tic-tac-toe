import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/modules';

const APP_PORT = process.env.APP_PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1');
  await app.listen(APP_PORT);
}
bootstrap();
