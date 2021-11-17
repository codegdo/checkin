import * as winston from 'winston';
import { createModule } from 'create-nestjs-middleware-module';

export const LoggerModule = createModule((config) => {

  return winston.createLogger({
    exitOnError: false,
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: winston.format.json()
      }),
      new winston.transports.Http({
        level: 'warn',
        format: winston.format.json()
      }),
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ]
  });
});
