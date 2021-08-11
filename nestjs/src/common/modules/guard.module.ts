import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiGuard } from '../guards/api.guard';
import { AuthGuard } from '../guards/auth.guard';
import { SessionRepository } from 'src/models/main/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionRepository]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => config.get('jwt.config'),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiGuard,
      inject: [SessionRepository]
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
      inject: []
    }
  ]
})
export class GuardModule { }
