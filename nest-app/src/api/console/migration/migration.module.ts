import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { SENDER_SERVICE, WORKER_SERVICE } from 'src/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
//import { RedisClientOptions } from 'redis';
//import { redisStore } from 'cache-manager-redis-store';
//import { IoredisStore } from 'cache-manager-ioredis';
//import { redisStore } from 'cache-manager-ioredis-yet';
import * as redisStore from 'cache-manager-ioredis';
import {Redis} from 'ioredis';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SENDER_SERVICE,
        useFactory: (configSerivce: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configSerivce.get('SENDER_HOST'),
            port: configSerivce.get('SENDER_PORT')
          }
        }),
        inject: [ConfigService]
      },
      {
        name: WORKER_SERVICE,
        useFactory: (configSerivce: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configSerivce.get('WORKER_HOST'),
            port: configSerivce.get('WORKER_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ]),
    CacheModule.register({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        client: new Redis({
            host: configService.get('REDIS_HOST'),
            port: +configService.get('REDIS_PORT'),
        })
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MigrationController],
  providers: [
    MigrationService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ]
})
export class MigrationModule { }
