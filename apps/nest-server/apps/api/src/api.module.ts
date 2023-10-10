//import { APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import {
  ClientModule,
  ConfigModule,
  LoggerModule,
  DataSourceModule,
  SessionModule,
  ExpressWinstonMiddleware,
  InstanceNameEnum,
} from '@app/common';

import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
import { ManageModule } from './manage/manage.module';

@Module({
  imports: [
    // Shared
    DataSourceModule.register(InstanceNameEnum.Application),
    LoggerModule.register(InstanceNameEnum.Application),
    ConfigModule,
    ClientModule,
    //
    SessionModule,
    AuthModule,
    SetupModule,
    ManageModule,
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
