import { HttpService } from '@nestjs/axios';
import * as winston from 'winston';
import * as ExpressWinston from 'express-winston';
import { ConfigService } from '@nestjs/config';

import { LogLevel, WinstonTransport } from './winston-transport';
import { ClientLoggerService } from './client-logger.service';

// Create an instance of HttpService
const httpService = new HttpService();

// Create an instance of your NestJS service to access the ClientProxy
const configService = new ConfigService(); // Initialize ConfigService

// Create an instance of your NestJS service to access the ClientProxy
const clientLoggerService = new ClientLoggerService(configService);

const logFormat = winston.format.printf(({ level, message, timestamp, ms, meta }) => {
  const metaString = meta ? ` - ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level}]: ${message} ${metaString} ${ms ? `(${ms})` : ''}`;
});

const logger = winston.createLogger({
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
      level: LogLevel.INFO,
      silent: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        logFormat,
      ),
    }),
    new WinstonTransport(httpService, clientLoggerService),
  ],
});

// Configure express-winston for request logging
const expressWinstonLogger = ExpressWinston.logger({
  winstonInstance: logger,
  meta: true, // Log additional metadata like req.headers, req.body, etc.
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  colorize: true, // Enable colored output
});

// Export the logger for use in other parts of your application
export { logger, expressWinstonLogger };