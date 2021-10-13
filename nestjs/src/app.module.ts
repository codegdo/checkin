import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import {
  GuardModule,
  SessionModule,
  LoggerMiddleware,
  MailModule
} from './common';

import {
  AuthModule,
  UserModule,
  CheckinModule,
  CheckoutModule,
  ClientModule,
  SchedulerModule,
  CalendarModule,
  LocationModule
} from './api';

import {
  appConfig,
  dbConfig,
  jwtConfig,
  mailerConfig,
  sessionConfig
} from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, sessionConfig, mailerConfig, jwtConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('database.main'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: 'scheduler',
      useFactory: (configService: ConfigService) => configService.get('database.scheduler'),
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
    MailModule,
    GuardModule,
    AuthModule,
    UserModule,
    CheckinModule,
    CheckoutModule,
    ClientModule,
    SchedulerModule,
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
