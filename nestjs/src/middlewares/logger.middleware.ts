import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { getConnection } from 'typeorm';

import { ErrorEntity } from 'src/models/main/entities';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn'
}

class WinstonTransport extends Transport {
  private error = null;
  private info = null;

  constructor() {
    super();
    this.error = this.error;
    this.info = this.info;
  }

  private async insert({ message, stack }, { meta: { req } }) {

    const { url, headers: { host } } = req;

    const connection = await getConnection();
    const repository = connection.getRepository(ErrorEntity);
    const data = repository.create({ message, host, url, stack });

    await repository.save(data);

    this.info = null;
    this.error = null;
  }

  log(info, callback) {

    setImmediate(() => {
      this.emit('logged', info);

      if (info.level === LogLevel.INFO) {
        this.info = info;
      }

      if (info.level === LogLevel.ERROR) {
        this.error = info;
      }

      if (info.level === LogLevel.ERROR && this.info) {
        this.insert(info, this.info);
      }

      if (info.level === LogLevel.INFO && this.error) {
        this.insert(this.error, info);
      }
    });

    callback();
  }
}

export const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: LogLevel.ERROR,
      format: winston.format.json()
    }),
    new winston.transports.Http({
      level: LogLevel.WARN,
      format: winston.format.json()
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('App', { prettyPrint: true }),
      ),
    }),
    new WinstonTransport()
  ]
});