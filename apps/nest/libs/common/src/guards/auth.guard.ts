import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthType } from '../enums';
import { AUTH_KEY } from '../constants';
import { SecurityGuard } from './security.guard';
import { RoleGuard } from './role.guard';
import { PermissionGuard } from './permission.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.BEAR;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
      [AuthType.BEAR]: [this.securityGuard, this.roleGuard, this.permissionGuard],
      [AuthType.NONE]: { canActivate: () => true },
    };

  constructor(
    private readonly reflector: Reflector,
    private readonly securityGuard: SecurityGuard,
    private readonly roleGuard: RoleGuard,
    private readonly permissionGuard: PermissionGuard,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthGuard.defaultAuthType];

    this.logger.log(`AuthType {${authTypes[0]}}`, 'AuthGuard');

    const guards = authTypes.flatMap((type) => this.authTypeGuardMap[type]);

    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);

        if (!canActivate) {
          return false;
        }
      } catch (error) {
        this.logger.error('ERROR', error);
      }
    }

    return true;
  }
}
