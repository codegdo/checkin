import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLE_KEY } from '../decorators';
import { RoleType } from '../enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [RoleType.EXTERNAL];

    console.log('ROLE_GUARD', requiredRoles);

    // Replace this logic with your actual user role retrieval
    const userRole = 'internal'; // Example user role, replace with actual role

    // Implement the role-based authorization logic
    switch (userRole) {
      case 'system':
        // System can access both INTERNAL and EXTERNAL
        return (
          requiredRoles.includes(RoleType.SYSTEM) ||
          requiredRoles.includes(RoleType.INTERNAL) ||
          requiredRoles.includes(RoleType.EXTERNAL)
        );
      case 'internal':
        // Internal can access both INTERNAL and EXTERNAL
        return (
          requiredRoles.includes(RoleType.INTERNAL) ||
          requiredRoles.includes(RoleType.EXTERNAL)
        );
      case 'external':
        // External can only access EXTERNAL
        return requiredRoles.includes(RoleType.EXTERNAL);
      default:
        return false; // Deny access for unknown roles
    }
  }
}
