import * as expressWinston from 'express-winston';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class ExpressWinstonMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: winston.Logger,
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    expressWinston.logger({
      winstonInstance: this.logger,
      meta: true, // error get send with meta from winston-transport
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorize: true,
    })(req, res, next);
  }
}