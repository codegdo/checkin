import { InternalServerErrorException } from '@nestjs/common';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as session from 'express-session';
import {
  AsyncOptions,
  createModule,
  SyncOptions,
} from 'create-nestjs-middleware-module';

interface ConfigSession {
  options: session.SessionOptions;
  retries?: number;
  retriesStrategy?: Parameters<typeof createRetriesMiddleware>[2];
}

type WaitingStrategy = (attempt: number) => number;

export type NestSessionOptions = SyncOptions<ConfigSession>;
export type NestSessionAsyncOptions = AsyncOptions<ConfigSession>;

function createRetriesMiddleware(
  middleware: RequestHandler,
  retries: number,
  retriesStrategy: WaitingStrategy,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    let attempt = 0;

    async function lookupSession(error?: any) {
      if (error) {
        return next(error);
      }

      if (req.session !== undefined) {
        return next();
      }

      if (attempt > retries) {
        return next(new InternalServerErrorException('Cannot create session'));
      }

      if (attempt !== 0) {
        await new Promise((r) => setTimeout(r, retriesStrategy(attempt)));
      }

      attempt++;
    }

    lookupSession();
  };
}

export const SessionModuleMiddleware = createModule<ConfigSession>((config) => {
  const { options, retries, retriesStrategy } = config;

  let middleware = session(options);

  if (retries !== undefined) {
    middleware = createRetriesMiddleware(middleware, retries, retriesStrategy);
  }

  return middleware;
});
