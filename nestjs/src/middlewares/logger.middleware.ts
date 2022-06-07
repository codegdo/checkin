import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { ErrorEntity } from 'src/models/main/entities';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { typeormConfig } from 'src/configs';


export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn'
}

dotenv.config();

const { errorConnection } = typeormConfig();
const dataSource = new DataSource(errorConnection as DataSourceOptions);

class WinstonTransport extends Transport {
  private error = null;
  private info = null;

  constructor(private dataSource: DataSource) {
    super();
    this.error = this.error;
    this.info = this.info;
    this.dataSource = dataSource;
  }

  private async insert({ message, stack }, { meta: { req } }) {

    await this.dataSource.initialize();

    const { url, headers: { host } } = req;
    const errorRepository = this.dataSource.getRepository(ErrorEntity);
    const error = new ErrorEntity();
    error.message = message;
    error.host = host;
    error.url = url;
    error.stack = stack;

    await errorRepository.save(error);

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
    new WinstonTransport(dataSource)
  ]
});