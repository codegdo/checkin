import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { WinstonModule } from 'nest-winston';

import { MyMiddleware } from './middlewares';

import {
  GuardModule,
  SessionModule,
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
  dbConfig,
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
        dbConfig,
        sessionConfig,
        mailerConfig,
        jwtConfig,
        winstonConfig,
        twilioConfig,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database.main'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: 'checkin',
      useFactory: (configService: ConfigService) =>
        configService.get('database.checkin'),
      inject: [ConfigService],
    }),
    // common
    LoggerModule,
    GuardModule,
    MessageModule,
    SessionModule,
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
