import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file'; 
import { WinstonTransport } from './winston-transport';

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

// Get the current process ID (PID)
const pid = process.pid;

// Configure express-winston logger
const logFormat = winston.format.printf(({ level, message, timestamp, ms }) => {
  return `[Nest] ${pid} - ${timestamp} ${level} [YourModule] ${message} ${ms}`;
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
    new WinstonTransport({}),
  ],
});

export default logger;

/* import * as winston from 'winston';
import * as expressWinston from 'express-winston';

export const winstonConfig = expressWinston.logger({
  transports: [
    new winston.transports.Console(), // You can add other transports as needed
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
  winstonInstance: winston.createLogger(), // Use a new instance of Winston logger
  expressFormat: true,
}); */
