import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { jwtConfig } from 'src/configs';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import {
  AuthGuard,
  SessionGuard,
  PermissionGuard,
  AccessGuard,
  RoleGuard,
} from 'src/guards';
import { CaslAbilityService, UtilService } from 'src/helpers';
import { Session, UserRepository } from 'src/models/main';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Session, UserRepository]),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
    // ConfigModule.forFeature(jwtConfig),
    // UserModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },

    // SecurityGuard,
    // AccessGuard,
    // RoleGuard,
    // PermissionGuard,
    IamService,
    // CaslAbilityService,
    // UtilService,
    // UserRepository
  ],
  controllers: [IamController],
  exports: [IamService], //, CaslAbilityService, UtilService
})
export class IamModule { }
