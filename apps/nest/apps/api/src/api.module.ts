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
} from '@app/common';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import {
  AuthGuard,
  PermissionGuard,
  RoleGuard,
  SecurityGuard,
  PolicyChecker,
} from './common';
import { BuilderModule } from './builder/builder.module';

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
    BuilderModule,
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
