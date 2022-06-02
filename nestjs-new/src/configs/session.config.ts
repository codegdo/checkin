
import { registerAs } from "@nestjs/config";
import { TypeormStore } from "connect-typeorm/out";
import { Session } from "src/models/main/session/session.entity";
import { DataSource } from "typeorm";

export const sessionConfig = registerAs('session', () => ((async (config) => {

  const dataSource = await new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    database: process.env.DATABASE_MAIN,

    synchronize: true,
    entities: [__dirname + '/../models/main/session/*.entity{.ts,.js}']
  }).initialize();

  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000 // 60000
    },
    store: new TypeormStore({
      cleanupLimit: 10,
      limitSubquery: false,
      //ttl: 3600000,
    }).connect(dataSource.getRepository(Session))
  }
})));