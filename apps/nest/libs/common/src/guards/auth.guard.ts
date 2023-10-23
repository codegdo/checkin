import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthType } from '../enums';
import { AUTH_KEY } from '../decorators/auth.decorator';
import { SessionGuard } from './session.guard';
import { RoleGuard } from './role.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.BEAR;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
      [AuthType.BEAR]: [this.sessionGuard, this.roleGuard],
      [AuthType.NONE]: { canActivate: () => true },
    };

  constructor(
    private readonly reflector: Reflector,
    private readonly sessionGuard: SessionGuard,
    private readonly roleGuard: RoleGuard,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthGuard.defaultAuthType];

    console.log(authTypes);

    const guards = authTypes.flatMap((type) => this.authTypeGuardMap[type]);

    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);

        if (!canActivate) {
          return false;
        }
      } catch (err) {
        console.log();
      }
    }

    return true;
  }
}
