import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from 'src/decorators/auth.decorator';
import { AuthType } from 'src/types/auth.enum';
import { AccessGuard } from './access.guard';
import { PermissionGuard } from './permission.guard';
import { RoleGuard } from './role.guard';
import { SecurityGuard } from './security.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bear;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
      [AuthType.Bear]: [this.securityGuard, this.accessGuard, this.roleGuard, this.permissionGuard],
      [AuthType.None]: { canActivate: () => true },
    };

  constructor(
    private readonly reflector: Reflector,
    private readonly securityGuard: SecurityGuard,
    private readonly accessGuard: AccessGuard,
    private readonly roleGuard: RoleGuard,
    private readonly permissionGuard: PermissionGuard,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();



    let error = new UnauthorizedException();
    let canActivate = true;

    for (const instance of guards) {

      const isGuard = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
        canActivate = false;
      });

      if (!isGuard) {
        canActivate = false;
        break;
      }
    }

    if (canActivate) {
      return true;
    }

    throw error;
  }
}
