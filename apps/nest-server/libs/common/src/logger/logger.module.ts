import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { CustomTypeOrmLogger } from './custom-typeorm.logger';
import { LoggerService } from './logger.service';
import { CustomStreamLogger } from './custom-stream.logger';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      useFactory: (loggerService: LoggerService) => ({
        pinoHttp: {
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
            },
          },
          stream: new CustomStreamLogger(loggerService),
        },
      }),
    }),
  ],
  providers: [CustomTypeOrmLogger, LoggerService, CustomStreamLogger], // Add CustomStreamLogger to providers
  exports: [CustomTypeOrmLogger, LoggerService],
})
export class LoggerModule { }
