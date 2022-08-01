import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { typeormConfig, sessionConfig } from './configs';
import { UserModule } from './api';
import { AuthModule } from './api/auth/auth.module';

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
        const sessionConnection = config.get('database.sessionConnection');
        const session = await config.get('session')(sessionConnection);

        return { session };
      },
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
