import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import {
  ClientModule,
  ConfigModule,
  LoggerModule,
  DataSourceModule,
  SessionModule,
  ExpressWinstonMiddleware,
  InstanceName,
  AuthGuard,
  SecurityGuard,
  RoleGuard,
  PermissionGuard,
  PolicyChecker,
} from '@app/common';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // Shared
    DataSourceModule.register(InstanceName.API),
    LoggerModule.register(InstanceName.API),
    ConfigModule,
    ClientModule,
    SessionModule,
    //
    AuthModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RequestInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SecurityGuard,
    RoleGuard,
    PermissionGuard,
    PolicyChecker,
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExpressWinstonMiddleware).forRoutes('*');
    //consumer.apply(PinoLoggerMiddleware).forRoutes('*');
    //consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
