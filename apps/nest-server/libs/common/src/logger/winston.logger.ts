import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file'; 
import { WinstonTransport } from './winston-transport';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Http({
      level: LogLevel.WARN,
      format: winston.format.json(),
    }),
    new winston.transports.Console({
      level: LogLevel.INFO,
      silent: false,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MM/DD/YYYY, hh:mm:ss A' }),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Application', {
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
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include the timestamp in the log message
        winston.format.json()
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
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include the timestamp in the log message
        winston.format.json()
      ),
    }),
    new WinstonTransport(),
  ],
});

export default logger;













/* import { HttpService } from '@nestjs/axios';
import * as winston from 'winston';
import * as ExpressWinston from 'express-winston';
import { ConfigService } from '@nestjs/config';
import * as DailyRotateFile from 'winston-daily-rotate-file'; 

import { LogLevel, WinstonTransport } from './winston-transport';
import { ClientLoggerService } from './client-logger.service';

// Create an instance of HttpService
const httpService = new HttpService();

// Create an instance of your NestJS service to access the ClientProxy
const configService = new ConfigService(); // Initialize ConfigService

// Create an instance of your NestJS service to access the ClientProxy
const clientLoggerService = new ClientLoggerService(configService);


// Get the current process ID (PID)
const pid = process.pid;

// Configure express-winston logger
const logFormat = winston.format.printf(({ level, message, timestamp, ms }) => {
  return `[Nest] ${pid} - ${timestamp} ${level} [YourModule] ${message} +${ms}ms`;
});

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      level: LogLevel.ERROR,
      filename: 'logs/error.log',
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
        winston.format.timestamp({ format: 'MM/DD/YYYY, hh:mm:ss A' }),
        winston.format.ms(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        //winston.format.simple(),
        logFormat,
      ),
    }),
    // DailyRotateFile transport for application logs (level 'info' and higher)
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1m',
      level: 'info', // Filter by log level
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include the timestamp in the log message
        winston.format.json()
      ),
    }),
    // DailyRotateFile transport for error logs (level 'error' and higher)
    new DailyRotateFile({
      filename: 'logs/errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      level: 'error', // Filter by log level
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include the timestamp in the log message
        winston.format.json()
      ),
    }),
    //new WinstonTransport({}, httpService, clientLoggerService),
    new WinstonTransport({}),
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
export { logger, expressWinstonLogger }; */