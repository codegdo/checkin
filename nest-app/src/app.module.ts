import { ClassSerializerInterceptor, MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AuthModule, IamModule } from './api';
import { LoggingInterceptor } from './interceptors';

import { AccountModule } from './api/account/account.module';
import { WebhookModule } from './api/webhook/webhook.module';
import { BillingModule } from './api/billing/billing.module';

import {
  DatabaseModule,
  GuardModule,
  SessionModule,
  ClientModule
} from './common';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    BillingModule,
    IamModule,
    WebhookModule,
    DatabaseModule,
    GuardModule,
    SessionModule,
    ClientModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        //skipMissingProperties: true,
        //skipUndefinedProperties: true,
        //skipNullProperties: true,
        //whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  controllers: [],
})
export class AppModule {
  constructor() { }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(RawBodyMiddleware)
  //     .forRoutes({
  //       path: '/webhook/stripe',
  //       method: RequestMethod.POST
  //     })
  //     .apply(JsonBodyMiddleware)
  //     .forRoutes('*');
  // }
}
