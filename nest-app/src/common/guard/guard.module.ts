import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from 'src/configs';
import { AuthAccess, AuthGuard, AuthPermission, AuthSession } from 'src/guards';
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
    AuthSession,
    AuthAccess,
    AuthPermission,

    CaslAbilityService,
    UtilService,
  ],
  controllers: [],
  exports: [],
})
export class GuardModule { }
