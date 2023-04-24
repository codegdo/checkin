import { ClassSerializerInterceptor, MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AuthModule, IamModule } from './api';
import { databaseConfig } from './configs';
import { LoggingInterceptor } from './interceptors';

import { AccountModule } from './api/account/account.module';
import { WebhookModule } from './api/webhook/webhook.module';
import { BillingModule } from './api/billing/billing.module';

//import { JsonBodyMiddleware } from './middlewares/jsonbody.middleware';
//import { RawBodyMiddleware } from './middlewares/rawbody.middleware';
import { ManagementModule } from './api/management/management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configSerivce: ConfigService) => {
        return configSerivce.get('database.checkin');
      },
      dataSourceFactory: async (options) => {
        console.log(options);
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      }
    }),
    AuthModule,
    AccountModule,
    IamModule,
    BillingModule,
    ManagementModule,
    WebhookModule,
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
