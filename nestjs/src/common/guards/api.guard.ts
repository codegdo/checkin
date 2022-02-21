import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { SessionRepository } from 'src/models/main/repositories';
import { IS_RESTRICTED_KEY } from '../decorators/restricted.decorator';

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
    private sessionRepository: SessionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.header('Authorization');
    const apiToken = request.header('X-Api-Token');
    const refererHeader = request.header('Referer');

    const isPublish = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    const isRestricted = this.reflector.get(
      IS_RESTRICTED_KEY,
      context.getHandler(),
    );

    if (isPublish) {
      return true;
    }

    if (isRestricted) {
      if (!apiToken) {
        return false;
      }

      try {
        const api = await this.jwtService.verify(apiToken);
        console.log('API GUARD', api);

        return true;
      } catch (err) {
        console.log('API TOKEN ERROR', err);
        return false;
      }
    }

    const { data } = request.session;

    console.log('API GUARD SESSION USER', data);

    //
    if (data) {
      request.currentUser = data.user;
      return true;
    }

    //
    if (authToken) {
      //const token = await this.jwtService.verify(authHeader.split(' ')[1]);
      //const currentTimestamp = new Date().getTime() / 1000;
      //const isNotExpired = token.exp > currentTimestamp;
      //const sid = authHeader.split(' ')[1];

      const found = await this.sessionRepository.findOne({ id: authToken });

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

    //return false;
    //console.log('SESSION TIMEOUT');
    throw new HttpException('Session Timeout', 404);
  }
}
