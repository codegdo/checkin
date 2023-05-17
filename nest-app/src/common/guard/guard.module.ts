import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from 'src/configs';
import { AccessGuard, AuthGuard, PermissionGuard, SessionGuard } from 'src/guards';
import { CaslAbilityService, UtilService } from 'src/helpers';
import { Session, UserRepository } from 'src/models/main';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, UserRepository]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SessionGuard,
    AccessGuard,
    PermissionGuard,

    CaslAbilityService,
    UtilService,
  ],
  controllers: [],
  exports: [],
})
export class GuardModule { }
