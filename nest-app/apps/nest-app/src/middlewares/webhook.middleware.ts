import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class WebHookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // do some tasks
    console.log('Executing request...');
    next();
  }
}