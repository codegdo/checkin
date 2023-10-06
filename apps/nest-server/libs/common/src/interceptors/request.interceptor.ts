import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    const meta = this.buildMeta(req, res, startTime);

    (global as any).requestContext = { meta };

    return next.handle();
  }

  private buildMeta(req: Request, res: Response, startTime: number) {
    const httpVersion = 'HTTP/1.1';
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      req: {
        headers: req?.headers || {},
        httpVersion,
        method: req?.method || '',
        originalUrl: req?.originalUrl || '',
        query: req?.query || {},
        url: req?.url || '',
      },
      res: {
        statusCode: res?.statusCode || null,
        responseTime,
      },
    };
  }
}
