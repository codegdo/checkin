import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import logger from './winston.logger';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = logger; // Use the same logger instance
  }

  log(message: string, context?: string) {
    this.logger.info(message);
  }

  error(message: string, error: any, context?: string) {
    this.logger.error(message, error);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message);
  }

  info(message: string, context?: string) {
    this.logger.info(message);
  }

}


// import { Injectable, Inject } from '@nestjs/common';
// import { PinoLogger, PARAMS_PROVIDER_TOKEN, Params } from 'nestjs-pino';

// @Injectable()
// export class LoggerService extends PinoLogger {
//   constructor(@Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
//     super(params);
//   }

//   error(message: string, trace?: string) {
//     super.error({ message, trace });
//   }

//   warn(message: string) {
//     super.warn({ message });
//   }

//   debug(message: string) {
//     super.debug({ message });
//   }

//   info(message: string) {
//     super.info({ message });
//   }

//   log(message: string) {
//     super.info({ message });
//   }

  // private getRequestContext(): RequestContextMeta {
  //   const context = (global as any).requestContext;
  //   return context || { meta: {} };
  // }
// }
