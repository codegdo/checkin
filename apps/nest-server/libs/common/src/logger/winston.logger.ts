import * as winston from 'winston';
import * as ExpressWinston from 'express-winston';

const logger = winston.createLogger({
    level: 'info', // Set the log level as needed
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(), // You can configure other transports here
    ],
  });

// Configure express-winston for request logging
const expressWinstonLogger = ExpressWinston.logger({
    winstonInstance: logger,
    meta: true, // Log additional metadata like req.headers, req.body, etc.
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: true, // Enable colored output
  });

// ... Rest of your NestJS setup

// Export the logger for use in other parts of your application
export { logger, expressWinstonLogger };