import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ACCESS_KEY } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';
import { REQUEST_USER_KEY } from 'src/types';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextAccess = this.reflector.getAllAndOverride<AccessLevelEnum[]>(
      ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!contextAccess) {
      return true;
    }

    const { accessLevel } = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    return contextAccess.some((level) => {
      if (accessLevel === 'system') {
        return true;
      } else if (accessLevel === 'internal') {
        return level === 'system' ? false : true;
      } else {
        return level === accessLevel;
      }
    });
  }
}