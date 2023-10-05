import * as Transport from 'winston-transport';
import { DataSource } from 'typeorm';

export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

export class WinstonTransport extends Transport {
  private error: any = null;
  private info: any = null;

  constructor() {
    super();
  }

  private async insert({ message, stack }: any, { meta: { req } }: any) {
    // if (!this.dataSource.isConnected) {
    //   await this.dataSource.connect();
    // }

    // const { url, headers: { host } } = req;
    // const errorRepository = this.dataSource.getRepository(ErrorEntity);
    // const error = new ErrorEntity();
    // error.message = message;
    // error.host = host;
    // error.url = url;
    // error.stack = stack;

    // await errorRepository.save(error);

    this.info = null;
    this.error = null;
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);

      console.log('AAAA', info);

      if (info.level === LogLevel.INFO) {
        this.info = info;
      }

      if (info.level === LogLevel.ERROR) {
        this.error = info;
      }

      // Include the request object in the log message
      if (info.level === LogLevel.ERROR && this.info) {
        this.insert({ ...info, req: this.info.meta.req }, this.info);
      }

      if (info.level === LogLevel.INFO && this.error) {
        this.insert({ ...info, req: this.error.meta.req }, this.error);
      }
    });

    callback();
  }
}
