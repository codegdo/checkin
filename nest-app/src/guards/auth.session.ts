import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { jwtConfig } from 'src/configs';
import { Session } from 'src/models/main';
import { REQUEST_USER_KEY } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthSession implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Security Guard');

    const request = context.switchToHttp().getRequest();
    const sessionData = request.session?.data;
    const { accessToken, refreshToken } = this.extractTokenFromHeader(request);

    if (sessionData) {
      request[REQUEST_USER_KEY] = sessionData.user;
      return true;
    }

    if (!accessToken) {
      await this.refreshSession(refreshToken);
      return true;
    }

    const [sessionId, isAccessTokenExpired] = await this.verifyToken(accessToken, {
      algorithms: ['RS256'],
      publicKey: this.jwtConfiguration.publicKey,
    });

    if (isAccessTokenExpired) {
      await this.refreshSession(refreshToken);
      return true;
    }

    const session = await this.sessionsRepository.findOneByOrFail({ id: sessionId });
    const { data } = JSON.parse(session.data);

    request[REQUEST_USER_KEY] = data.user;
    return true;
  }

  private async refreshSession(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    const [sessionId, isRefreshTokenExpired] = await this.verifyToken(token, {});

    if (!sessionId || !isRefreshTokenExpired) {
      throw new UnauthorizedException();
    }

    await this.sessionsRepository.delete({ id: sessionId });
    // TODO: generate new access and refresh tokens and return them
  }

  private async verifyToken(token: string, options: JwtVerifyOptions) {
    try {
      const verifyToken = await this.jwtService.verifyAsync(token, options);
      return [verifyToken.sid, false];
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const verifyToken = await this.jwtService.verifyAsync(token, {
          ...options,
          ignoreExpiration: true,
        });
        return [verifyToken?.sid, true];
      }
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request) {
    const authHeader = request.headers.authorization;
    const refreshTokenHeader = request.headers['x-refresh-token'];

    const authParts = typeof authHeader === 'string' ? authHeader.split(' ') : [];
    const refreshParts = typeof refreshTokenHeader === 'string' ? refreshTokenHeader.split(' ') : [];

    const authType = authParts.length > 0 ? authParts[0] : null;
    const accessToken = authParts.length > 1 ? authParts[1] : null;
    const refreshToken = refreshParts.length > 1 ? refreshParts[1] : null;

    return { authType, accessToken, refreshToken };
  }
}

// if(req.headers?.authorization?.startWith('Bearer '))
