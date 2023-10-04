import { Injectable, Inject } from '@nestjs/common';
import { PinoLogger, PARAMS_PROVIDER_TOKEN, Params } from 'nestjs-pino';

@Injectable()
export class LoggerService extends PinoLogger {
  constructor(@Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
    super(params);
  }

  error(message: string, trace?: string) {
    super.error({ message, trace });
  }

  warn(message: string) {
    super.warn({ message });
  }

  debug(message: string) {
    super.debug({ message });
  }

  info(message: string) {
    super.info({ message });
  }

  log(message: string) {
    super.info({ message });
  }

  customLog(logMessage: string) {
    // Process the log message as needed
    console.log('Captured Log:', logMessage);
  }
}
