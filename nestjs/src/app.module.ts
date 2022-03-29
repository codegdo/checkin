import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { WinstonModule } from 'nest-winston';

import { MyMiddleware } from './common/middlewares';
import {
  GuardModule,
  SessionModule,
  MessageModule,
  ErrorModule
} from './common/modules';
import {
  AuthModule,
  UserModule,
  CheckinModule,
  ClientModule,
  CalendarModule,
  //LocationModule,
  GroupModule,
  ReloadModule
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

    SessionModule,
    GuardModule,
    MessageModule,
    ErrorModule,

    AuthModule,
    UserModule,
    CheckinModule,
    ClientModule,
    CalendarModule,
    //LocationModule,
    GroupModule,
    ReloadModule
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
