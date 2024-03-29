import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ROLE_KEY, USER_KEY } from '../constants';
import { RoleType } from '../enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request[USER_KEY]) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<
      RoleType[] | undefined
    >(ROLE_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    // Define a mapping of user role types to their associated roles
    const roleMapping: Record<RoleType, RoleType[]> = {
      [RoleType.SYSTEM]: [RoleType.SYSTEM, RoleType.INTERNAL],
      [RoleType.INTERNAL]: [RoleType.INTERNAL],
      [RoleType.EXTERNAL]: [],
    };

    const { roleType } = request[USER_KEY];
    const userRoles = roleMapping[roleType];

    const isAllowed = requiredRoles.some((requiredRole) =>
      userRoles.includes(requiredRole),
    );

    return isAllowed;
  }
}
