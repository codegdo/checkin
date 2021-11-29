import { ConnectionOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('database', () => {
  const options: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    synchronize: false,
    logging: true,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };

  const main: ConnectionOptions = {
    ...options,
    database: 'main',
    name: 'default',
    entities: [__dirname + '/../models/main/**/*.entity{.ts,.js}'],
  };

  const checkin: ConnectionOptions = {
    ...options,
    database: 'checkin',
    name: 'checkin',
    entities: [__dirname + '/../models/checkin/**/*.entity{.ts,.js}'],
  };

  return { main, checkin };
});
