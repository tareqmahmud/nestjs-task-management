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
  appLogger.log('App is on fire');

  const appPort = process.env.APPLICATION_PORT || config.get('server.port');
  await app.listen(appPort);
}

bootstrap();
