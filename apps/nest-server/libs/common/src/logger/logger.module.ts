import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerService } from './custom-logger.service';
import * as winston from 'winston'; // Import winston for creating the logger

@Module({
  imports: [ConfigModule],
  providers: [
    CustomLoggerService,
    {
      provide: 'winston', // Provide a token for the winston.Logger instance
      useValue: winston.createLogger({
        level: 'info', // Set the log level as needed
        format: winston.format.json(),
        transports: [
          new winston.transports.Console(), // You can configure other transports here
        ],
      }),
    },
  ],
  exports: [CustomLoggerService],
})
export class LoggerModule {}




/* import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { CustomTypeOrmLogger } from './custom-typeorm.logger';
import { LoggerService } from './logger.service';
import { CustomStreamLogger } from './custom-stream.logger';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
            },
          },
          autoLogging: false,
        },
      }),
    }),
  ],
  providers: [CustomTypeOrmLogger, LoggerService, CustomStreamLogger], // Add CustomStreamLogger to providers
  exports: [CustomTypeOrmLogger, LoggerService],
})
export class LoggerModule { } */
