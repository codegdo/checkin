import { Module } from '@nestjs/common';
import * as session from 'express-session';
import { createModule } from 'create-nestjs-middleware-module';
import { ConfigService } from '@nestjs/config';

declare module 'express-session' {
  export interface SessionData {
    data: { [key: string]: any };
  }
}
interface ConfigSession {
  options: session.SessionOptions;
}

const SModule = createModule<ConfigSession>((config) => {
  const { options } = config;
  return session(options);
});


@Module({
  imports: [
    SModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          options: await configService.get('session')(),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: []
})
export class SessionModule { }
