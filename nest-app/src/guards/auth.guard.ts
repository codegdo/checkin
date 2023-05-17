import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { AuthType } from 'src/constants';
import { AUTH_TYPE_KEY } from 'src/decorators';

import { SessionGuard } from './session.guard';
import { AccessGuard } from './access.guard';
import { PermissionGuard } from './permission.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bear;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
      [AuthType.Bear]: [this.authSession, this.authAccess, this.authPermission],
      [AuthType.None]: { canActivate: () => true },
    };

  constructor(
    private readonly reflector: Reflector,
    private readonly authSession: SessionGuard,
    private readonly authAccess: AccessGuard,
    private readonly authPermission: PermissionGuard,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthGuard.defaultAuthType];

    const guards = authTypes.flatMap(type => this.authTypeGuardMap[type]);

    let error: Error | null = null;

    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);
        if (!canActivate) {
          return false;
        }
      } catch (err) {
        error = err;
      }
    }

    if (error) {
      throw error;
    }

    return true;
  }

}
