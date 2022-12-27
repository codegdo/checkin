import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { jwtConfig } from 'src/configs';
import { REQUEST_USER_KEY } from 'src/types';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = request.session;
    const token = this.extractTokenFromHeader(request);

    if (data) {
      request[REQUEST_USER_KEY] = data?.user;
    } else if (token) {
      try {
        const sessionId = await this.jwtService.verifyAsync(token, {
          secret: this.jwtConfiguration.publicKey,
        });

        request[REQUEST_USER_KEY] = data?.user;
      } catch {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }

    // const token = this.extractTokenFromHeader(request);

    // if (!token) {
    //   throw new UnauthorizedException();
    // }

    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: this.jwtConfiguration.publicKey,
    //   });
    //   request[REQUEST_USER_KEY] = payload;
    // } catch {
    //   throw new UnauthorizedException();
    // }
    console.log('Access Token Guard', request.session);
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
