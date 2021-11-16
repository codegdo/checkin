import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import {
  GuardModule,
  SessionModule,
  LoggerMiddleware,
  MailModule,
} from './common';

import {
  AuthModule,
  UserModule,
  CheckinModule,
  ClientModule,
  CalendarModule,
  LocationModule,
} from './api';

import {
  appConfig,
  dbConfig,
  jwtConfig,
  mailerConfig,
  pinoConfig,
  sessionConfig,
  winstonConfig,
} from './configs';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, sessionConfig, mailerConfig, jwtConfig, pinoConfig, winstonConfig],
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
    SessionModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          options: await configService.get('session')(),
        };
      },
      inject: [ConfigService],
    }),
    WinstonModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('winston'),
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('pino'),
      inject: [ConfigService],
    }),
    // LoggerModule.forRoot({
    //   pinoHttp: [
    //     {
    //       transport: process.env.NODE_ENV !== 'production' ?
    //         {
    //           target: 'pino-pretty',
    //           options: {
    //             colorize: true,
    //             levelFirst: true,
    //             translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z'
    //           }
    //         } : {}
    //     }
    //   ]
    // }),
    GuardModule,
    MailModule,
    AuthModule,
    UserModule,

    CheckinModule,
    ClientModule,
    CalendarModule,
    LocationModule,
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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
