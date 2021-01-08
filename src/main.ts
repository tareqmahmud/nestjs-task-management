import * as dotenv from 'dotenv';
// Enable process dotenv
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const appLogger = new Logger('app');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: process.env.CORS_ORIGIN,
    });
  }

  // Cors
  appLogger.log('App is on fire');

  const appPort = process.env.APPLICATION_PORT || config.get('server.port');
  await app.listen(appPort);
}

bootstrap();
