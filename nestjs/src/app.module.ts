import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
//import { WinstonModule } from 'nest-winston';

import { MyMiddleware } from './middlewares';

import {
  GuardModule,
  //SessionModule,
  MessageModule,
  LoggerModule
} from './common';

import {
  AuthModule,

  CheckinModule,
  ClientModule,
  ReloadModule,

  SetupCalendarModule,
  //LocationModule,
  GroupModule,
  UserModule,

  OrganizationModule
} from './api';

import {
  appConfig,
  typeormConfig,
  jwtConfig,
  mailerConfig,
  sessionConfig,
  twilioConfig,
  winstonConfig,
} from './configs';

import { HomeModule } from './api/home/home.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        typeormConfig,
        sessionConfig,
        mailerConfig,
        jwtConfig,
        winstonConfig,
        twilioConfig,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('database.mainConnection');
      }
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('database.checkinConnection');
      }
    }),
    SessionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<NestSessionOptions> => {
        const sessionConnection = config.get('database.sessionConnection');
        const session = await config.get('session')(sessionConnection);

        return { session };
      },
    }),
    // common
    LoggerModule,
    GuardModule,
    MessageModule,
    //SessionModule,
    // api
    AuthModule,
    CheckinModule,
    ClientModule,
    ReloadModule,

    SetupCalendarModule,
    //LocationModule,
    GroupModule,
    UserModule,

    OrganizationModule,
    HomeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule {
  constructor() { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes('*');
  }
}
