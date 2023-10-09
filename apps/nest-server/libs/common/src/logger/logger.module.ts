import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import logger from './winston.logger';
import { TypeOrmLogger } from './typeorm.logger';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => logger,
      inject: [],
    }),
  ],
  providers: [TypeOrmLogger],
  exports: [WinstonModule, TypeOrmLogger],
})
export class LoggerModule {}







/* import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { CustomLoggerService } from './custom-logger.service';
import { CustomTypeOrmLogger } from './custom-typeorm.logger';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [LoggerService, CustomTypeOrmLogger],
  exports: [ LoggerService, CustomTypeOrmLogger],
})
export class LoggerModule { } */

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
