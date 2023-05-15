import { registerAs } from '@nestjs/config';
import * as entities from 'src/models';

import * as fs from 'fs';
import * as path from 'path';


export const databaseConfig = registerAs('database', () => {

  const databaseOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    synchronize: false,
    logging: true,
    max: 10,
    min: 2
  };

  const checkinDatabaseOptions = {
    ...databaseOptions,
    database: process.env.POSTGRES_DB_CHECKIN,
    name: 'default',
    entities: [...Object.values(entities)],
    autoLoadEntities: true,
  };

  return { checkin: checkinDatabaseOptions };
});
