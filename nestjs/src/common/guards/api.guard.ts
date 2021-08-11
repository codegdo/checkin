import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { SessionRepository } from 'src/models/main/repositories';

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
    const { user: currentUser } = request.session;
    const isPublish = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    console.log('API_GUARD', isPublish);

    if (!isPublish) {
      //
      if (currentUser) {
        return true;
      }
      //
      if (authHeader) {
        const token = await this.jwtService.verify(authHeader.split(' ')[1]);
        const currentTimestamp = new Date().getTime() / 1000;
        const isNotExpired = token.exp > currentTimestamp;

        if (isNotExpired) {
          const found = await this.sessionRepository.findOne({ id: token.sid });

          if (!found) {
            return false;
          }

          return true;
        }
      }

      return false;
    }

    return true;
  }
}
