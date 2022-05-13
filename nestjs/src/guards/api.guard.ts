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
  ) {}

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

    const accessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJCYWpjWEpYd21PRHVNdmswWFM3c0dYWnl4RnlBRjEtZyIsImlhdCI6MTY1MjQxODYwOSwiZXhwIjoxNjUyNDIyMjA5fQ.KTTWY8bTo7TCOBnihNVZMZbxq6biywzfBJOgLXlBbhFLqXgeuO7nG9trYXPH3w4GVl_t3RPeNcLwuNJz2ojl2b2MHTQrumhvB_IzFAxSzt5Bay1lTZkS27TyYndi_DCL2hPL6LOvtJLhCI9_FcCIign5FqBgbJwvh-KkCFVYI68HO1Ymsl-tVpfWHd1_OF0I5U63SKyaAr50lNFAW_IrCk_owwU4htNwxjZEdtvE20Nw6lc3wO_N8TZdyr24UHryOc-9uLaJvg8aYtKWUeUq9fG6vplIK9N00a2iK6Vn3QWYnbkU0QIqJxGAIxCSx3sz6juBM2Lb9YHjpb_s0niilg';

    try {
      const token = await this.jwtService.verify(accessToken, {
        algorithms: ['RS256'],
      });
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
            request.currentUser = { ...jsonData?.user };
            return true;
          }
        }
      }
    }

    throw new HttpException('Session Timeout', 404);
  }
}
