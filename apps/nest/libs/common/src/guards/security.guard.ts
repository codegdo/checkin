import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { USER_KEY } from '../constants';
import { Policy } from '../helpers';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // TODO:
    // Check session and token validity
    // Check user access to URL navigation
    // Assign user policies

    const policies: Policy[] = [
      {
        version: '1.0',
        statement: [
          {
            effect: 'Allow',
            action: '*',
            resource: '*',
          },
          {
            effect: 'Deny',
            action: [''],
            resource: ['view:'],
          },
        ],
      },
    ];

    // Assign user information including username, roleType, and policies to the request context
    request[USER_KEY] = {
      username: 'admin',
      roleType: 'system',
      policies,
    };

    return true;
  }
}
