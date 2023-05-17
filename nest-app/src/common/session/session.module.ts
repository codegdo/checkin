import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule as NestSessionModule } from 'nestjs-session';
import { databaseConfig, sessionConfig } from 'src/configs';
import { Session } from 'src/models/main';
import { DataSource } from 'typeorm';
import { TypeormStore } from '../store/typeorm.store';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    NestSessionModule.forRootAsync({
      imports: [ConfigModule.forFeature(sessionConfig)],
      inject: [ConfigService, DataSource],
      useFactory: async (
        configService: ConfigService,
        dataSource: DataSource,
      ) => {
        const config = await configService.get('session');
        const repository = dataSource.getRepository(Session);
        const sessionStore = new TypeormStore({
          cleanupLimit: 10,
          limitSubquery: false,
          //ttl: 3600000,
        }).connect(repository);

        return {
          session: {
            ...config,
            store: sessionStore,
          },
        };
      },
    })
  ],
  providers: [],
  controllers: [],
})
export class SessionModule { }
