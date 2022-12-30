import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CaslAbilityService } from 'src/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly caslAbility: CaslAbilityService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const ability = await this.caslAbility.defineAbilityForUser(1);
    const routes = this.extractRoutes(request)

    const allow = routes.every(route => this.isAllowed(ability, route));

    console.log('Permission Guard', allow);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private isAllowed(ability, permission) {
    return ability.can(permission, 'external')
  }

  private extractRoutes(request) {
    const route = request.originalUrl.split("?").shift();
    const [_, api, ...routes] = route.split('/');
    return routes;
  }
}
