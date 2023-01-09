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

  const checkin = {
    ...options,
    database: process.env.DATABASE_CHECKIN,
    name: 'default',
    entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
  };

  return { checkin };
});
