import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import {
  AuthGuard,
  SecurityGuard,
  RoleGuard,
  PermissionGuard,
  PolicyChecker,
} from '@app/common';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SecurityGuard,
    RoleGuard,
    PermissionGuard,
    PolicyChecker,
  ],
})
export class SecurityModule { }
