import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  NestSessionOptions,
  SessionModule as NestSessionModule,
} from 'nestjs-session';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    NestSessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configSerivce: ConfigService,
      ): Promise<NestSessionOptions> => {
        return {
          session: {
            secret: configSerivce.get('SESSION_SECRET'),
            resave: true,
            saveUninitialized: true,
            cookie: {
              secure: false,
              maxAge: parseInt(process.env.SESSION_MAX_AGE ?? '3600000', 10), // 60000
            },
          },
        };
      },
    }),
  ],
})
export class SessionModule { }
