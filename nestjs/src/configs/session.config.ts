import { TypeormStore } from 'connect-typeorm/out';
import { Session } from 'src/models/main/entities';
import { createConnection, getConnection } from 'typeorm';
import { registerAs } from "@nestjs/config";

export const sessionConfig = registerAs('session', () => ((async () => {

  await createConnection({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    database: 'main',
    name: 'default',
    synchronize: true,
    entities: [__dirname + '/../models/main/session/*.entity{.ts,.js}']
  });

  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    },
    store: new TypeormStore({
      cleanupLimit: 0,
      limitSubquery: false, // If using MariaDB.
      ttl: 360,
    }).connect(getConnection('default').getRepository(Session)),
  };

})));
