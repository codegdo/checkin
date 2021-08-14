import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { SessionRepository } from 'src/models/main/repositories';

declare module 'express' {
  export interface Request {
    currentUser: any;
  }
}

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private sessionRepository: SessionRepository
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    const sid = request.header('X-Auth-Token');
    const refererHeader = request.header('Referer');
    const { user } = request.session;
    const isPublish = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    console.log('API_GUARD', isPublish);
    console.log(request.header('Referer'));

    if (!isPublish) {

      //
      if (user) {
        request.currentUser = user;
        return true;
      }

      //
      if (sid) {
        //const token = await this.jwtService.verify(authHeader.split(' ')[1]);
        //const currentTimestamp = new Date().getTime() / 1000;
        //const isNotExpired = token.exp > currentTimestamp;
        //const sid = authHeader.split(' ')[1];

        const found = await this.sessionRepository.findOne({ id: sid });

        if (!found) {
          return false;
        }

        return true;

        /* if (isNotExpired) {
          const found = await this.sessionRepository.findOne({ id: token.sid });

          if (!found) {
            return false;
          }

          return true;
        } */
      }

      return false;
    }

    return true;
  }
}
