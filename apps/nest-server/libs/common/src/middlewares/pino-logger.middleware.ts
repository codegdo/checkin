import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';
import pino from 'pino';

@Injectable()
export class PinoLoggerMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const logStream = this.createLogStream(req, res);

    // Create a custom logger and specify the custom log stream
    const logger = pino(
      {
        level: 'info', // Set the default log level
        prettifier: require('pino-pretty'),
        customLevels: {
          error: 50,
          warn: 40,
        },
      },
      logStream,
    );

    const pinoLogger = require('pino-http')({ logger });

    pinoLogger(req, res);

    next();
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
        pino().info(logData);

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
    this.httpService.post('your-remote-log-endpoint', logData).subscribe({
      next: (response: any) => {
        // Handle success
      },
      error: (error: any) => {
        // Handle error
      },
    });
  }
}
