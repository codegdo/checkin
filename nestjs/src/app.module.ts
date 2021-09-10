import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/admin/users/user.module';
import {
  GuardModule,
  SessionModule,
  LoggerMiddleware,
} from './common';
import { CustomerModule } from './api/customer/customer.module';
import { EmployeeModule } from './api/employee/employee.module';
import { CheckinModule } from './api/checkin/checkin.module';
import { CheckoutModule } from './api/checkout/checkout.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'configs', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('typeorm.config')['main'],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('typeorm.config')['schedule'],
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
    CustomerModule,
    EmployeeModule,
    CheckinModule,
    CheckoutModule,
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
    }
  ]
})
export class AppModule {
  constructor() { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
