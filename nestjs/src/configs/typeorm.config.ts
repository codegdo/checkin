import { ConnectionOptions } from 'typeorm';

const options: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  synchronize: true,
  logging: true,
  cli: {
    migrationsDir: 'src/database/migrations',
  }
};

const main: ConnectionOptions = {
  ...options,
  database: 'main',
  name: 'default',
  entities: [__dirname + '/../models/main/**/*.entity{.ts,.js}'],
};

const schedule: ConnectionOptions = {
  ...options,
  database: 'schedule',
  name: 'schedule',
  entities: [__dirname + '/../models/schedule/**/*.entity{.ts,.js}'],
};

export default { main, schedule };
