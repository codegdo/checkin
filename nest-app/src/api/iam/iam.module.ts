import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { DataSource } from 'typeorm';

import { jwtConfig, sessionConfig } from 'src/configs';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { Session, SessionStore } from 'src/models/main/session';
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
    RoleGuard,
    PermissionGuard,
    IamService,
  ],
  controllers: [IamController],
})
export class IamModule { }
