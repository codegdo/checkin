import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { WinstonTransport } from './winston-transport';

export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

@Injectable()
export class CustomLoggerService {
  private readonly logger: winston.Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    this.logger = this.createLogger();
  }

  private createLogger(): winston.Logger {
    return winston.createLogger({
      exitOnError: false,
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: LogLevel.ERROR,
          format: winston.format.json(),
        }),
        new winston.transports.Http({
          level: LogLevel.WARN,
          format: winston.format.json(),
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.colorize(),
          ),
        }),
        new WinstonTransport(this.dataSource),
      ],
    });
  }

  logInfo(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  logError(message: string, error: any, context?: string) {
    this.logger.error(message, { error, context });
  }

  logWarning(message: string, context?: string) {
    this.logger.warn(message, { context });
  }
}


/* import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CustomLoggerService extends PinoLogger {
  constructor(private readonly configService: ConfigService) {
    super({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    });
  }

  logInfo(message: string, context?: string) {
    this.info({ message, context });
  }

  logError(message: string, error: any, context?: string) {
    this.error({ message, error, context });
  }

  logWarning(message: string, context?: string) {
    this.warn({ message, context });
  }
}
 */