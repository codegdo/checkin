import { ClassSerializerInterceptor, MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-store';

import { AuthModule, IamModule } from './api';
import { LoggingInterceptor } from './interceptors';

import { AccountModule } from './api/account/account.module';
import { WebhookModule } from './api/webhook/webhook.module';
import { BillingModule } from './api/billing/billing.module';
import { ConsoleModule } from './api/console/console.module';

import {
  CacheModule,
  //ClientModule,
  DatabaseModule,
  GuardModule,
  SessionModule
} from './common';

import { BullModule } from './common/bull/bull.module';
//import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
//import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
//import { RedisClientOptions } from 'redis';
//import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    BillingModule,
    ConsoleModule,
    IamModule,
    WebhookModule,
    DatabaseModule,
    GuardModule,
    SessionModule,
    BullModule,
    CacheModule,
    // CacheModule.register({
    //   // @ts-ignore
    //   store: async () => await redisStore({
    //     // Store-specific configuration:
    //     socket: {
    //       host: 'localhost',
    //       port: 6379,
    //     }
    //   }),
    //   isGlobal: true
    // }),

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
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
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
