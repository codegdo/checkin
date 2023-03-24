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
import {
  AuthGuard,
  SecurityGuard,
  PermissionGuard,
  AccessGuard,
  RoleGuard,
} from 'src/guards';
import { CaslAbilityService, UtilService } from 'src/helpers';
import { TypeormStore } from 'src/customs';
import { Session, UserRepository } from 'src/models/main';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, UserRepository]),
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
        const sessionStore = new TypeormStore({
          cleanupLimit: 10,
          limitSubquery: false,
          //ttl: 3600000,
        }).connect(repository);

        return {
          session: {
            ...config,
            store: sessionStore,
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
