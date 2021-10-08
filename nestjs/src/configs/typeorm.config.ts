import { ConnectionOptions } from 'typeorm';

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

const schedule: ConnectionOptions = {
  ...options,
  database: 'scheduler',
  name: 'scheduler',
  entities: [__dirname + '/../models/scheduler/**/*.entity{.ts,.js}'],
};

export default { main, schedule };
