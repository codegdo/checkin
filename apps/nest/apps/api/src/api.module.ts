//import { APP_INTERCEPTOR } from '@nestjs/core';
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
import { SetupModule } from './setup/setup.module';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';

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
    DatabaseModule,
    SetupModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RequestInterceptor,
    // },
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExpressWinstonMiddleware).forRoutes('*');
    //consumer.apply(PinoLoggerMiddleware).forRoutes('*');
    //consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
