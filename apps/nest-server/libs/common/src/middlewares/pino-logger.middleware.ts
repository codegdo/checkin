import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//import { HttpService } from '@nestjs/axios';
import pino from 'pino';
import pinoHttp from 'pino-http';

@Injectable()
export class PinoLoggerMiddleware implements NestMiddleware {
  private logger: pino.Logger;

  constructor() {
    // Create a custom logger instance
    this.logger = pino({
      level: 'info', // Set the default log level
      prettifier: require('pino-pretty'),
      customLevels: {
        error: 50,
        warn: 40,
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Create a custom log stream
    const logStream = this.createLogStream(req, res);

    // Create pino-http middleware with the custom logger
    const pinoLogger = pinoHttp({ logger: this.logger });

    // Intercept and manipulate logs using the logger instance
    this.logger.info('Intercepted pino-http log.');

    // Use the pino-http middleware
    pinoLogger(req, res, next);
  }

  private createLogStream(req: Request, res: Response) {
    return {
      write: (chunk: any) => {
        // Extract log data from the chunk
        const logData = {
          method: req.method,
          url: req.url,
          headers: req.headers,
          message: chunk, // Assuming the log message is in the 'msg' field
        };

        // Log data using the pino logger
        this.logger.info(logData);

        // Check log level and send log data to a remote server conditionally
        if (chunk.level === 40 || chunk.level === 50) {
          this.logRequestToRemoteServer(logData);
        }
      },
    };
  }

  private logRequestToRemoteServer(logData: any) {
    // Send log data to a remote server using HTTP service or any other method.
    // Customize this according to your requirements.
    // this.httpService.post('your-remote-log-endpoint', logData).subscribe({
    //   next: (response: any) => {
    //     // Handle success
    //   },
    //   error: (error: any) => {
    //     // Handle error
    //   },
    // });
  }
}
