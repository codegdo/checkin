import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule as NestCacheModule } from '@nestjs/cache-manager';
//import { redisStore } from 'cache-manager-ioredis-yet';
//import Redis from 'ioredis';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports:[
    NestCacheModule.register({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        socket: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
        }
        // client: new Redis({
        //     host: configService.get('REDIS_HOST'),
        //     port: +configService.get('REDIS_PORT'),
        // })
      }),
      inject: [ConfigService],
    }),
		// NestCacheModule.register({
		// 	store: redisStore,
		// 	client: new Redis({
		// 			host: 'localhost',
		// 			port: 6379,
		// 	})
		// }),
	],
	providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },

  ]
})
export class CacheModule {}
