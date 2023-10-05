import * as winston from 'winston';
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
});
