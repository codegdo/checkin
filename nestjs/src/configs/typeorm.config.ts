import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('database', () => {
  const options: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    synchronize: false,
    logging: true,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };

  const main: ConnectionOptions = {
    ...options,
    database: process.env.DATABASE_MAIN,
    name: 'default',
    entities: [__dirname + '/../models/main/**/*.entity{.ts,.js}'],
  };

  const checkin: ConnectionOptions = {
    ...options,
    database: process.env.DATABASE_CHECKIN,
    name: process.env.DATABASE_CHECKIN,
    entities: [__dirname + '/../models/checkin/**/*.entity{.ts,.js}'],
  };

  return { main, checkin };
});