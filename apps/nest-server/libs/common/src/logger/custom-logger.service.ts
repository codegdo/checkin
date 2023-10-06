import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { logger } from './winston.logger';

@Injectable()
export class CustomLoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = logger; // Use the same logger instance
  }

  log(message: string, context?: string) {
    this.logger.info(message);
  }

  error(message: string, error: any, context?: string) {
    this.logger.error(message, error);
  }

  warning(message: string, context?: string) {
    this.logger.warn(message);
  }

  // private getRequestContext(): RequestContextMeta {
  //   const context = (global as any).requestContext;
  //   return context || { meta: {} };
  // }
}
