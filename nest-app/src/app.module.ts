import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { DataSource } from 'typeorm';

import { AuthModule, IamModule } from './api';
import { databaseConfig, sessionConfig } from './configs';
import { SessionStore } from './helpers/session/session-store.helper';
import { Session } from './models/main/session/session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, sessionConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('database.main');
      },
    }),
    SessionModule.forRootAsync({
      inject: [ConfigService, DataSource],
      useFactory: async (
        config: ConfigService,
        dataSource: DataSource,
      ): Promise<NestSessionOptions> => {
        const sessionConfig = await config.get('session');
        const repository = dataSource.getRepository(Session);

        return {
          session: {
            ...sessionConfig,
            store: new SessionStore({
              cleanupLimit: 10,
              limitSubquery: false,
              //ttl: 3600000,
            }).connect(repository),
          },
        };
      },
    }),
    AuthModule,
    IamModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
  controllers: [],
})
export class AppModule {}
