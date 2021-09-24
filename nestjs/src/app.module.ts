import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import {
  GuardModule,
  SessionModule,
  LoggerMiddleware
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

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'configs', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get('typeorm.config')['main'],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: 'schedule',
      useFactory: (config: ConfigService) =>
        config.get('typeorm.config')['schedule'],
      inject: [ConfigService],
    }),
    SessionModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          options: await config.get('session.config'),
        };
      },
      inject: [ConfigService],
    }),
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
