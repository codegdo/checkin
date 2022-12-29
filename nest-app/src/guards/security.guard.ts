import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { jwtConfig } from 'src/configs';
import { Session } from 'src/models/main';
import { REQUEST_USER_KEY } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = request.session;
    const { key, accessToken, refreshToken } = this.extractTokenFromHeader(request);

    console.log('SESSION', data);

    if (data) {
      request[REQUEST_USER_KEY] = data?.user;
    } else if (accessToken) {
      const [sid, isAccessTokenExpired] = await this.verifyToken(accessToken);

      if (isAccessTokenExpired) {
        await this.refreshSession(refreshToken);
      }

      const { data: sessionData } = await this.sessionsRepository.findOneByOrFail({ id: sid });
      const { data: payload } = JSON.parse(sessionData);

      request[REQUEST_USER_KEY] = payload?.user;

    } else {
      await this.refreshSession(refreshToken);
    }

    console.log('Access Token Guard', request.session);
    return true;
  }

  private async refreshSession(token: string) {
    if (token) {
      const [sid, isRefreshTokenExpired] = await this.verifyToken(token);

      if (sid && !isRefreshTokenExpired) {
        // what to do with refresh token???
        console.log('NEED TO REFRESH SESSION');
      }

      sid && await this.sessionsRepository.delete({ id: sid });
      throw new UnauthorizedException();

    } else {
      throw new UnauthorizedException();
    }
  }

  private async verifyToken(token: string) {
    let sid = null;
    let isTokenExpired = false;

    try {
      const verifyToken = await this.jwtService.verifyAsync(token, {
        algorithms: ['RS256'],
        publicKey: this.jwtConfiguration.publicKey,
      });
      sid = verifyToken.sid;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const verifyToken = await this.jwtService.verifyAsync(token, {
          algorithms: ['RS256'],
          publicKey: this.jwtConfiguration.publicKey,
          ignoreExpiration: true
        });
        sid = verifyToken?.sid;
        isTokenExpired = true;
      }
      isTokenExpired = true;
    }

    return [sid, isTokenExpired];
  }

  private extractTokenFromHeader(request: Request) {
    const [key, accessToken] = request.headers.authorization?.split(' ') ?? [];
    //const [_, refreshToken] = (request.headers['x-refresh-token'] as string)?.split(' ') ?? [];
    return { key, accessToken, refreshToken: null };
  }
}
