import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, SessionGuard, RoleGuard } from '@app/common';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SessionGuard,
    RoleGuard,
  ],
})
export class SecurityModule { }
