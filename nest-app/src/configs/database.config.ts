import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => {
  const options = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    synchronize: false,
    logging: true,
  };

  const main = {
    ...options,
    database: process.env.DATABASE_MAIN,
    name: 'default',
    entities: [__dirname + '/../models/main/**/*.entity{.ts,.js}'],
  };

  return { main };
});
