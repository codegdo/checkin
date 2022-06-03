
import { registerAs } from "@nestjs/config";
import { SessionStore } from "src/common";
import { Session } from "src/models/main/session/session.entity";
import { DataSource } from "typeorm";

export const sessionConfig = registerAs('session', () => ((async (sessionConnection) => {

  const dataSource = await new DataSource(sessionConnection).initialize();

  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000 // 60000
    },
    store: new SessionStore({
      cleanupLimit: 10,
      limitSubquery: false,
      //ttl: 3600000,
    }).connect(dataSource.getRepository(Session))
  }
})));