import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  ConfigModule,
  DataSourceModule,
  LoggerModule,
  SessionModule,
} from '@app/common';
import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
import { ManageModule } from './manage/manage.module';
import { CustomLoggerService } from '@app/common/logger/custom-logger.service';
//import { PinoLoggerMiddleware } from '@app/common/middlewares/pino-logger.middleware';

@Module({
  imports: [
    DataSourceModule.register('application'),
    SessionModule,
    AuthModule,
    SetupModule,
    ManageModule,
    LoggerModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: Logger, // Replace the default Logger with your custom Winston logger service
      useClass: CustomLoggerService,
    },
  ],
})
export class ApiModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(PinoLoggerMiddleware).forRoutes('*');
  // }
}
