import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionType, PERMISSION_KEY } from 'src/decorators';
import { CaslAbilityService } from 'src/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbility: CaslAbilityService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextPermission = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!contextPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const { ability } = await this.caslAbility.defineAbilityForUser(
      user,
      contextPermission,
    );

    const allow = contextPermission.every((permission) =>
      this.isAllowed(ability, permission),
    );

    return allow;
  }

  private isAllowed(ability, permission) {
    console.log(permission);

    return ability.can(...permission);
  }

  private extractRoutes(request) {
    const route = request.originalUrl.split('?').shift();
    const [_, api, ...routes] = route.split('/');
    return routes;
  }
}
