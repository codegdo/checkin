import { ClassSerializerInterceptor, MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AuthModule, IamModule } from './api';
import { LoggingInterceptor } from './interceptors';

import { AccountModule } from './api/account/account.module';
import { WebhookModule } from './api/webhook/webhook.module';
import { BillingModule } from './api/billing/billing.module';
import { ConsoleModule } from './api/console/console.module';

import {
  //CacheModule,
  DatabaseModule,
  GuardModule,
  SessionModule
} from './common';

import { BullModule } from './common/bull/bull.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

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
    // CacheModule.registerAsync({
    //   useFactory: async (): Promise<RedisClientOptions & { store: any; host: string; port: number }> => ({
    //     store: redisStore,
    //     host: 'localhost',
    //     port: 6379,
    //   }) as RedisClientOptions & { store: any; host: string; port: number },
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
