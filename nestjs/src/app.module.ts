import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { WinstonModule } from 'nest-winston';

import { GuardModule, SessionModule, MessageModule } from './common/modules';

import { LoggerMiddleware } from './common/middlewares';

import {
  AuthModule,
  UserModule,
  CheckinModule,
  ClientModule,
  CalendarModule,
  StoreModule,
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
import { ErrorModule } from './common/modules/error/error.module';
import { GroupModule } from './api/setup/group/group.module';

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
    SessionModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          options: await configService.get('session')(),
        };
      },
      inject: [ConfigService],
    }),

    // WinstonModule.forRootAsync({
    //   useFactory: async (configService: ConfigService) =>
    //     configService.get('winston'),
    //   inject: [ConfigService],
    // }),

    GuardModule,
    MessageModule,
    AuthModule,
    UserModule,

    CheckinModule,
    ClientModule,
    CalendarModule,
    StoreModule,
    ErrorModule,
    GroupModule,
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
