import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';

import { AuthType } from '../enums';
import { AUTH_KEY } from '../constants';
import { SecurityGuard } from './security.guard';
import { RoleGuard } from './role.guard';
import { PermissionGuard } from './permission.guard';

interface AllowedGuard {
  name: string;
  isAllowed: boolean | Observable<boolean>;
}

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
    const request = context.switchToHttp().getRequest();
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthGuard.defaultAuthType];

    const guards = authTypes.flatMap((type) => this.authTypeGuardMap[type]);

    const allowedGuards: AllowedGuard[] = [];
    let isAllowed = true;

    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);

        allowedGuards.push({
          name: this.getGuardName(guard),
          isAllowed: canActivate,
        });

        if (!canActivate) {
          isAllowed = false;
          break;
        }
      } catch (error) {
        this.logger.error(error, AuthGuard.name);
      }
    }

    this.logger.log(
      `{${request.path}} (${this.generateLogMessage(allowedGuards)})`,
      AuthGuard.name,
    );

    return isAllowed;
  }

  private getGuardName(guard: CanActivate): string {
    return guard.constructor.name;
  }

  private generateLogMessage(allowedGuards: AllowedGuard[]): string {
    return allowedGuards
      .map((guard) => `${guard.name}: ${guard.isAllowed}`)
      .join(', ');
  }
}
