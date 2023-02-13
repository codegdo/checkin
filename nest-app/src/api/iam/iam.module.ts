import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { jwtConfig, sessionConfig } from 'src/configs';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { Session, SessionStore, UserRepository } from 'src/models/main';
import {
  AuthGuard,
  SecurityGuard,
  PermissionGuard,
  RoleGuard,
} from 'src/guards';

import { AccessGuard } from 'src/guards/access.guard';
import { CaslAbilityService, UtilService } from 'src/helpers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    SessionModule.forRootAsync({
      imports: [ConfigModule.forFeature(sessionConfig)],
      inject: [ConfigService, DataSource],
      useFactory: async (
        configService: ConfigService,
        dataSource: DataSource,
      ): Promise<NestSessionOptions> => {
        const config = await configService.get('session');
        const repository = dataSource.getRepository(Session);

        return {
          session: {
            ...config,
            store: new SessionStore({
              cleanupLimit: 10,
              limitSubquery: false,
              //ttl: 3600000,
            }).connect(repository),
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SecurityGuard,
    AccessGuard,
    RoleGuard,
    PermissionGuard,
    IamService,
    CaslAbilityService,
    UtilService,
    UserRepository
  ],
  controllers: [IamController],
  exports: [IamService, CaslAbilityService, UtilService],
})
export class IamModule { }
