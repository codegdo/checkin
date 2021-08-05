import { TypeormStore } from "connect-typeorm/out";
import { Session } from "src/models/main/entities";
import { createConnection, getConnection } from "typeorm";

export default (async () => {

  try {

    await createConnection({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
      database: 'main',
      name: 'default',
      entities: [Session],
      synchronize: true,
    });

    return {
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 0,
        limitSubquery: false, // If using MariaDB.
        ttl: 360,
      }).connect(getConnection().getRepository(Session))
    }

  } catch (err) {
    console.log('SESSION', err);
  }

})()