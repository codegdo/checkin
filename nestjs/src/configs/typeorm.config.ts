import { registerAs } from '@nestjs/config';

export const typeormConfig = registerAs('database', () => {
  const defaultOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    synchronize: false,
    logging: true,
  }

  const mainConnection = {
    ...defaultOptions,
    database: process.env.DATABASE_MAIN,
    name: 'default',
    entities: [__dirname + '/../models/main/**/*.entity{.ts,.js}'],
  }

  const sessionConnection = {
    ...defaultOptions,
    database: process.env.DATABASE_MAIN,
    name: 'default',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../models/main/session/*.entity{.ts,.js}']
  }

  const errorConnection = {
    ...defaultOptions,
    database: process.env.DATABASE_MAIN,
    name: 'default',
    synchronize: false,
    logging: false,
    entities: [__dirname + '/../models/main/error/*.entity{.ts,.js}']
  }

  const checkinConnection = {
    ...defaultOptions,
    database: process.env.DATABASE_CHECKIN,
    name: process.env.DATABASE_CHECKIN,
    entities: [__dirname + '/../models/checkin/**/*.entity{.ts,.js}'],
  }

  return { mainConnection, sessionConnection, errorConnection, checkinConnection }
});