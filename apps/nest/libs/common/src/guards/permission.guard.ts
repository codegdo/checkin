import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { PERMISSION_KEY, USER_KEY } from '../constants';
import { PermissionType } from '../types';
import { PolicyChecker, Policy, RequestContext } from '../helpers';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyChecker: PolicyChecker,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request[USER_KEY]) {
      return false;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionType[] | undefined
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const { policies } = request[USER_KEY];

    const requestContextArray: string[] = requiredPermissions;

    // Use the PolicyChecker to verify Module and View
    const isAllowed = this.verifyModuleAndViewPermissions(
      policies,
      requestContextArray,
    );

    if (!isAllowed) {
      return false;
    }

    // check Object and Field

    return true;
  }

  private verifyModuleAndViewPermissions(
    policies: Policy[],
    requestContextArray: string[],
  ): boolean {
    const [requestContext] =
      this.convertRequestContextArrayToObject(requestContextArray);

    return this.policyChecker.verifyPermissions(policies, requestContext);
  }

  private convertRequestContextArrayToObject(
    requestContextArray: string[],
  ): RequestContext[][] {
    const result: RequestContext[][] = requestContextArray.map((request) => {
      const [module, view, action] = request.split(':');

      return [
        {
          actions: `${module}:Access`,
          resources: `module:${module}`,
        },
        {
          actions: `${view}:${action}`,
          resources: `view:${view}`,
        },
      ];
    });

    return result;
  }
}
