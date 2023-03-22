import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule, IamModule } from './api';
import { databaseConfig } from './configs';
import { AccountModule } from './api/account/account.module';
import { MonitorModule } from './api/monitor/monitor.module';
import { DataSource } from 'typeorm';

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
    MonitorModule,
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
    }
  ],
  controllers: [],
})
export class AppModule { }
