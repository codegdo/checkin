import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule as NestSessionModule } from 'nestjs-session';
import { databaseConfig, sessionConfig } from 'src/configs';
import { DataSource } from 'typeorm';
import { Cache } from 'cache-manager';

import { TypeormStore } from '../store/typeorm.store';
import { RedisStore } from '../store/redis.store';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Session } from 'src/models/main';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    NestSessionModule.forRootAsync({
      imports: [ConfigModule.forFeature(sessionConfig)],
      inject: [ConfigService, DataSource, CACHE_MANAGER],
      useFactory: async (
        configService: ConfigService,
        dataSource: DataSource,
        cacheManager: Cache
      ) => {
        const config = await configService.get('session');

        //await cacheManager.set('cache_session', 'hello cache');
        //await cacheManager.del('cache_session');

        const repository = dataSource.getRepository(Session);

        // const store = new TypeormStore({
        //   cleanupLimit: 10,
        //   limitSubquery: false,
        //   //ttl: 3600000,
        // }).connect(repository);

        // store.on('connect', () => {
        //   console.log('TypeormStore connected!');
        // });

        // store.connect(repository);

        const store = new RedisStore({});

        store.on('connect', () => {
          console.log('RedisStore connected!');
        });

        store.connect(cacheManager);

        return {
          session: {
            ...config,
            store,
          },
        };
      },
    })
  ],
  providers: [],
  controllers: [],
})
export class SessionModule { }
