import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionType, PERMISSION_KEY } from 'src/decorators';
import { CaslAbilityService } from 'src/helpers';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbility: CaslAbilityService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextPermissions = this.reflector.getAllAndOverride<PermissionType[]>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!contextPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const { ability } = await this.caslAbility.createForUser(user, contextPermissions);

    const allow = contextPermissions.every(permission => this.isAllowed(ability, permission));

    return allow;
  }

  private isAllowed(ability, permission) {
    const [action, resource] = permission;
    return ability.can(action, resource);
  }

  private extractRoutes(request) {
    const { pathname } = new URL(request.originalUrl, `http://${request.headers.host}`);
    const [, api, ...routes] = pathname.split('/');
    return routes;
  }
}
