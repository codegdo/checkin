import { registerAs } from '@nestjs/config';
import * as mainEntities from 'src/models/main/entities';

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
    database: process.env.DATABASE_CHECKIN,
    name: 'default',
    entities: [...Object.values(mainEntities)],
    autoLoadEntities: true,
  };

  return { checkin: checkinDatabaseOptions };
});
