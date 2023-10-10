import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

import { ClientService } from '../client/client.service';
import { WinstonTransport } from './winston-transport';
import { ConfigService } from '@nestjs/config';

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

export interface WinstonLoggerOptions {
  instanceName: string;
  configService: ConfigService;
  clientService: ClientService;
}

@Injectable()
export class WinstonLogger extends winston.Logger {
  constructor(private readonly options: WinstonLoggerOptions) {
    super();
    this.configureLogger();
  }

  private configureLogger() {
    this.level = 'info';

    const commonFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('MyApp', {
        colors: true,
        prettyPrint: true,
      })
    );

    this.add(new winston.transports.Console({ format: commonFormat }));

    const lowercaseInstanceName = this.options.instanceName.toLowerCase();

    const logFileOptions = {
      level: LogLevel.INFO,
      filename: `logs/${lowercaseInstanceName}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1m',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
      ),
    };

    this.add(new DailyRotateFile(logFileOptions));

    const errorLogFileOptions = {
      level: LogLevel.ERROR,
      filename: `logs/errors-${lowercaseInstanceName}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
      ),
    };

    this.add(new DailyRotateFile(errorLogFileOptions));

    this.add(new WinstonTransport(this.options.clientService));
  }
}
