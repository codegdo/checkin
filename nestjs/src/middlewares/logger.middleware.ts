import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { ErrorEntity } from 'src/models/main/entities';

export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn'
}

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

    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }

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

export const createLogger = (configService: ConfigService) => {

  const configOption = configService.get<DataSourceOptions>('database.errorConnection');
  const dataSource = new DataSource(configOption);

  return winston.createLogger({
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
          winston.format.colorize(),
        ),
      }),
      new WinstonTransport(dataSource)
    ]
  });
} 