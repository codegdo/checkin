import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { USER_KEY } from '../constants';
import { Policy } from '../helpers'; // Import the Policy type from your helpers
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    this.logger.log(`AuthSecurity {${request.path}}`, 'AuthGuard');

    // TODO:
    // Check session and token validity
    // Check user access to URL navigation
    // Assign user policies

    const policies: Policy[] = [
      {
        version: '1.0',
        statements: [
          {
            effect: 'Allow',
            actions: '*',
            resources: '*',
          },
        ],
      },
    ];

    // Assign user information including username, roleType, and policies to the request context
    request[USER_KEY] = {
      username: 'admin',
      roleType: 'internal',
      policies,
    };

    return true;
  }
}
