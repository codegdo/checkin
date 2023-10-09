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

@Injectable()
export class WinstonLogger extends winston.Logger {
  constructor(
    private readonly configService: ConfigService,
    private readonly clientService: ClientService,
  ) {
    super({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('MyApp', {
          colors: true,
          prettyPrint: true,
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        // DailyRotateFile transport for application logs (level 'info' and higher)
        new DailyRotateFile({
          level: LogLevel.INFO,
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '1m',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.json(),
          ),
        }),
        // DailyRotateFile transport for error logs (level 'error' and higher)
        new DailyRotateFile({
          level: LogLevel.ERROR,
          filename: 'logs/errors-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.json(),
          ),
        }),
        new WinstonTransport(clientService),
      ],
    });
  }
}
