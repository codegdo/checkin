import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import {
  ClientModule,
  ConfigModule,
  LoggerModule,
  DataSourceModule,
  SessionModule,
} from '@app/common';
//import { expressWinstonMiddleware } from '@app/common/middlewares';
import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
import { ManageModule } from './manage/manage.module';
import { ExpressWinstonMiddleware } from '@app/common/middlewares';

//import { RequestContextMiddleware } from '@app/common/middlewares/request-context.middleware';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { RequestInterceptor } from '@app/common/interceptors/request.interceptor';
//import { PinoLoggerMiddleware } from '@app/common/middlewares/pino-logger.middleware';

@Module({
  imports: [
    DataSourceModule.register('application'),
    SessionModule,
    AuthModule,
    SetupModule,
    ManageModule,
    // Shared
    LoggerModule,
    ConfigModule,
    ClientModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: Logger, // Replace the default Logger with your custom Winston logger service
    //   useClass: LoggerService,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RequestInterceptor,
    // },
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExpressWinstonMiddleware).forRoutes('*');
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RequestContextMiddleware).forRoutes('*');
  // }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(PinoLoggerMiddleware).forRoutes('*');
  // }
}
