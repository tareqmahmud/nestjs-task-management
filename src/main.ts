import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const appLogger = new Logger('app');
  const app = await NestFactory.create(AppModule);
  appLogger.log('App is on fire');
  await app.listen(3000);
}

bootstrap();
