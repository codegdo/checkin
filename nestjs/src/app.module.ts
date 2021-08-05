import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/admin/users/user.module';
import { NestSessionOptions, SessionModule } from './middlewares/session-module.middleware';



@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'configs', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('main-db.config'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('checkin-db.config'),
      inject: [ConfigService],
    }),
    SessionModule.forRootAsync({
      useFactory: async (config: ConfigService): Promise<NestSessionOptions> => {
        return {
          options: await config.get('session.config'),
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('CONSTRUTOR');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
