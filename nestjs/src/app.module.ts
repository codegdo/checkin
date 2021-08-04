import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/admin/users/user.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => await config.get('main-db.config'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => await config.get('checkin-db.config'),
      inject: [ConfigService],
    }),
    SessionModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          session: await config.get('session.config'),
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

  configure(consumer: MiddlewareConsumer) {
    /* consumer.apply(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      })
    ); */
  }
}
