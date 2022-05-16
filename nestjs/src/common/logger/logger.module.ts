import { Global, Logger, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [Logger, LoggerService],
  exports: [Logger, LoggerService]
})
export class LoggerModule { }
