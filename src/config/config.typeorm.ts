import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: config.get('db.type'),
  host: process.env.DB_HOST || config.get('db.host'),
  port: process.env.DB_PORT || config.get('db.port'),
  username: process.env.DB_USERNAME || config.get('db.username'),
  password: process.env.DB_PASSWORD || config.get('db.password'),
  database: process.env.DB_NAME || config.get('db.name'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: config.get('db.synchronize'),
};
