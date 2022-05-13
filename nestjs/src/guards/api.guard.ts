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
    const isRestrict = this.reflector.get(
      IS_RESTRICT_KEY,
      context.getHandler(),
    );

    if (isPublish) {
      return true;
    }

    console.log('REQUEST URL', request.url);

    // 1. BROWSER - check request use session
    if (sessionData) {
      const { user, locationId, orgId } = sessionData;
      request.currentUser = { ...user, locationId, orgId };
      return true;
    }

    // 2. MOBILE APP - check request header with jwt auth token
    if (authToken) {
      const accessToken = authToken.replace('Bearer', '').trim();
      let token;

      try {
        token = await this.jwtService.verify(accessToken, {
          algorithms: ['RS256'],
        });
      } catch (e) {
        console.log(e);
        return false;
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
            const { user, locationId, orgId } = jsonData;
            request.currentUser = { ...user, locationId, orgId };
            return true;
          }
        }
      }
    }

    throw new HttpException('Session Timeout', 404);
  }
}
