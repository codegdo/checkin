import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';
import { REQUEST_USER_KEY } from 'src/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<AccessLevelEnum[]>(ROLES_KEY, [
      context.getHandler(), context.getClass()
    ]);

    if (!contextRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest()[REQUEST_USER_KEY];

    console.log('CONTEXT ROLE', contextRoles);
    console.log('USER ROLE', user.accessLevel);

    return contextRoles.some((role) => user.accessLevel === role);

  }
}
