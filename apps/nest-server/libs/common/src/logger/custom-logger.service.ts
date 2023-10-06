import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { logger } from './winston.logger';
import { IncomingHttpHeaders } from 'http';

interface RequestContextMeta {
  meta: {
req: {
      headers: IncomingHttpHeaders;
      httpVersion: string;
      method: string;
      originalUrl: string;
      query: QueryString.ParsedQs;
      url: string;
  };
  res: {
    statusCode: number;
    responseTime: number;
  }
  }
  
};

@Injectable()
export class CustomLoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = logger; // Use the same logger instance
  }

  log(message: string, context?: string) {
    const {meta} = this.getRequestContext();
    this.logger.info(message, meta);
  }

  error(message: string, error: any, context?: string) {
    const {meta} = this.getRequestContext();
    meta.error = error; // Include error conditionally
    this.logger.error(message, meta);
  }

  warning(message: string, context?: string) {
    const {meta} = this.getRequestContext();
    this.logger.warn(message, meta);
  }

  private getRequestContext(): RequestContext {
    const context = (global as any).requestContext;
    return context || { meta: {} };
  }
}
