import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

import { typeormConfig, sessionConfig } from './configs';
import { UserModule } from './api/setup/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [typeormConfig, sessionConfig], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('database.mainConnection');
      }
    }),
    SessionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<NestSessionOptions> => {
        const dbConfig = config.get('database.mainConnection');
        const session = await config.get('session')(dbConfig);

        return { session };
      },
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
