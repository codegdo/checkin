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
import { CustomerModule } from './src/api/customer/customer.module';
import { CustomerModule } from './api/customer/customer.module';
import { EmployeeModule } from './api/employee/employee.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'configs', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('typeorm.config')[0],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('typeorm.config')[1],
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
