import { Injectable } from '@nestjs/common';
import { Writable } from 'stream';
import { LoggerService } from './logger.service';

@Injectable()
export class CustomStreamLogger extends Writable {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  _write(chunk: any, encoding: string, callback: () => void): void {
    const logMessage = chunk.toString();

    // Log the message to the console
    console.log('Custom Log:', logMessage);

    // You can also log the message using your logger service if needed
    // this.loggerService.customLog(logMessage);

    callback();
  }
}
