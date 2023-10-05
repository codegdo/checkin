import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerService } from './custom-logger.service';
import { winstonConfig } from './winston-config';

@Module({
  imports: [ConfigModule],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(winstonConfig).forRoutes('*'); // Apply the Winston configuration as middleware for all routes
  }
}


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
