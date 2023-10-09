import { Injectable } from '@nestjs/common';
import * as Transport from 'winston-transport';
//import { HttpService } from '@nestjs/axios';
//import { AxiosError, AxiosResponse } from 'axios';
//import { map } from 'rxjs';
//import { ClientLoggerService } from './client-logger.service';
import { LogEntry } from 'winston';
import { ClientService } from '../client/client.service';

export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

@Injectable()
export class WinstonTransport extends Transport {
  private errorInfo: any = null;
  private infoLog: any = null;
  private requestMeta: any = null;

  constructor(
    //options: Transport.TransportStreamOptions,
    //private readonly httpService: HttpService,
    //private readonly clientService: ClientLoggerService,
    //private readonly clientService: ClientService
  ) {
    super();
  }

  // Implement the log method to handle log messages
  log(info: LogEntry, callback: () => void): any {
    setImmediate(() => {
      // Emit the 'logged' event
      this.emit('logged', info);

      // Store meta data
      if (info?.meta?.req) {
        this.requestMeta = info.meta;
      }

      // Check log level and store info/error data
      if (info.level === LogLevel.INFO) {
        this.infoLog = info;
      }

      if (info.level === LogLevel.ERROR) {
        this.errorInfo = info;
      }

      // Check if there is an error and a request (req) object in meta
      if (
        info.level === LogLevel.ERROR &&
        this.infoLog &&
        this.requestMeta &&
        this.requestMeta.req
      ) {
        const logData = {
          ...this.errorInfo,
          meta: this.requestMeta,
        };
        this.logRequestToRemoteServer(logData);
      }

      // Check if there is an info log with a request (req) object in meta
      if (
        info.level === LogLevel.INFO &&
        this.errorInfo &&
        this.requestMeta &&
        this.requestMeta.req
      ) {
        const logData = {
          ...this.infoLog,
          meta: this.requestMeta,
        };
        this.logRequestToRemoteServer(logData);
      }
    });

    if (callback) {
      callback();
    }
  }

  private async logRequestToRemoteServer(logData: any) {
    console.log('SEND ERROR LOG AA', logData);

    // Send log data to a remote server using HTTP service.
    // Customize the URL according to your remote logging endpoint.
    // const remoteLogEndpoint = 'your-remote-log-endpoint';

    // this.httpService.post(remoteLogEndpoint, logData).subscribe({
    //   next: (response: AxiosResponse) => {
    //     // Handle success
    //   },
    //   error: (error: AxiosError) => {
    //     // Handle error
    //   },
    // });

    // Use .subscribe() with an observer object
    // await this.clientService.client
    //   .send('error-test', {})
    //   .pipe(map((response: { message: string }) => response))
    //   .subscribe({
    //     next: (result) => {
    //       console.log('Microservice response:', result);
    //     },
    //     error: (error) => {
    //       console.error('Microservice error:', error);
    //     },
    //   });

    // Reset stored log data
    this.infoLog = null;
    this.errorInfo = null;
    this.requestMeta = null;
  }
}
