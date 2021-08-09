import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    const { user: currentUser } = request.session;
    const isPublish = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    console.log('IS_PUBLISH', isPublish);
    console.log(authHeader);

    if (!isPublish) {

      if (currentUser) {
        //return true;
      }

      if (authHeader) {
        try {
          const token = this.jwtService.verify(authHeader);
          const currentTimestamp = new Date().getTime() / 1000;
          const tokenIsNotExpired = token.exp > currentTimestamp;

          console.log(tokenIsNotExpired);
        } catch (err) {
          console.log('ERRRRRRRR', err);
          throw new UnauthorizedException();
        }
      }

      throw new UnauthorizedException();
    }

    return true;
  }
}
