import { registerAs } from "@nestjs/config";
import { Token } from "src/models/main/entities";
import { createConnection, getConnection } from "typeorm";
import { format, transports } from "winston";
import * as Transport from 'winston-transport';

export default class PgTransport extends Transport {

  constructor(connection) {
    super(connection);
  }

  private async insert() {
    console.log('CONNECTION', await getConnection().getRepository(Token).find());
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Perform the writing to the remote service
    this.insert();

    callback();
  }
}

export const winstonConfig = registerAs('winston', async () => {

  const connection = createConnection({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    database: process.env.DATABASE_MAIN,
    name: 'default'
  });

  return {
    exitOnError: false,
    transports: [
      new transports.File({
        filename: 'error.log',
        level: 'error',
        format: format.json()
      }),
      new transports.Http({
        level: 'warn',
        format: format.json()
      }),
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      }),
      new PgTransport(connection)
    ],
  }
});
