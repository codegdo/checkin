import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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
    console.log('Role Guard');

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;

    // const contextRoles = this.reflector.getAllAndOverride<AccessLevelEnum[]>(
    //   ROLES_KEY,
    //   [context.getHandler(), context.getClass()],
    // );

    // if (!contextRoles) {
    //   return true;
    // }

    // const { accessLevel } = context.switchToHttp().getRequest()[
    //   REQUEST_USER_KEY
    // ];

    // return contextRoles.some((role) => {
    //   if (accessLevel === 'system') {
    //     return true;
    //   } else if (accessLevel === 'internal') {
    //     return role === 'system' ? false : true;
    //   } else {
    //     return role === accessLevel;
    //   }
    // });
  }
}
