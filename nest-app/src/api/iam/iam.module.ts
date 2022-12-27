import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig } from 'src/configs';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';

import {
  AuthGuard,
  SecurityGuard,
  PermissionGuard,
  RoleGuard,
} from 'src/guards';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SecurityGuard,
    RoleGuard,
    PermissionGuard,
    IamService,
  ],
  controllers: [IamController],
})
export class IamModule {}
