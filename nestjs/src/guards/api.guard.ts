import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as jose from 'node-jose';
import * as fs from 'fs';
import * as jwktopem from 'jwk-to-pem';

import { IS_PUBLIC_KEY, IS_RESTRICT_KEY } from '../decorators';
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
    private sessionRepository: SessionRepository,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { data: sessionData } = request.session;
    const authToken = request.header('Authorization');
    const apiToken = request.header('X-Api-Token');
    const refererHeader = request.header('Referer');

    const isPublish = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    const isRestrict = this.reflector.get(IS_RESTRICT_KEY, context.getHandler());

    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJscVRBZjZYS0s2YW1jd2JCZmlqeEZuMDRyV0lpRk5VaSIsImlhdCI6MTY1MjM5NDc5NCwiZXhwIjoxNjUyMzk4Mzk0fQ.CgUxiEZi8ulEh10ozD0dYL1IhR9dWFRnmiw_ZGzMJTLOEarsaIDZiF2oxQp4iL7NqX6wteWYfftrJ01XBSPPGCM5-i17IotWNEjwzjZ0XVMFfJvPQok4aHIBKCTm8oYGGI7-_3kV1LD6_Gz-eEQhetatZpzdGm01NJt033JZzZupCtNDneft6N9FJJrfqA4MmxULt0YhXCgba07ptIzNICZYhEfUbnEe6B1qN454FzB8De2bkCeSf2VmzQ3tTubCc1nIk6S4ZCuZ7JZ-KqOS_Z5ulkbbeZJUDf_sq031eGbrDEi6LGjXoUeLYEJAhSL7zOcq5wbuA5F4o4uGfoXTpw';

    try {
      const token = await this.jwtService.verify(accessToken);
      console.log('VERIFY TOKEN', token);
    } catch (e) {
      console.log(e);
    }

    if (isPublish) {
      return true;
    }

    console.log('REQUEST URL', request.url);

    // 1. BROWSER - check request use session
    if (sessionData) {
      request.currentUser = { ...sessionData.user };
      return true;
    }

    // 2. MOBILE APP - check request header with jwt auth token
    if (authToken) {
      const key = authToken.replace('Bearer', '').trim();
      let token;

      try {
        token = await this.jwtService.verify(key);
      } catch (e) {
        console.log(e);
      }

      if (token) {
        const { sid, exp } = token;

        const currentTimestamp = new Date().getTime() / 1000;
        const isExpired = exp < currentTimestamp;

        if (!isExpired) {
          const found = await this.sessionRepository.findOne({ id: sid });

          if (found) {
            const { json } = found;
            const { data: jsonData } = JSON.parse(json);
            request.currentUser = { ...jsonData?.user }
            return true;
          }
        }
      }

    }

    throw new HttpException('Session Timeout', 404);
  }
}