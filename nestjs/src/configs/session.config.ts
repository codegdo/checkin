import { TypeormStore } from 'connect-typeorm/out';
import { Session } from 'src/models/main/entities';
import { createConnection } from 'typeorm';
import { registerAs } from "@nestjs/config";

export const sessionConfig = registerAs('session', () => ((async () => {

  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
      database: process.env.DATABASE_MAIN,

      synchronize: true,
      entities: [__dirname + '/../models/main/session/*.entity{.ts,.js}']
    });

    return {
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 3600000 // 60000
      },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        //ttl: 3600000,
      }).connect(connection.getRepository(Session)),
    };
  } catch (err) {
    console.log(err);
  }

})));
