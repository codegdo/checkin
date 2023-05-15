import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessLevel } from 'src/constants';

import { ACCESS_KEY } from 'src/decorators';
import { REQUEST_USER_KEY } from 'src/types';

@Injectable()
export class AuthAccess implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextAccess = this.reflector.getAllAndOverride<AccessLevel[]>(
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
      if (accessLevel === AccessLevel.SYSTEM) {
        return true;
      } else if (accessLevel === AccessLevel.INTERNAL) {
        return level === 'system' ? false : true;
      } else {
        return level === accessLevel;
      }
    });
  }

}
