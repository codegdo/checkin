import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ApiGuard } from '../guards/api.guard';
import { AuthGuard } from '../guards/auth.guard';
import { SessionRepository } from 'src/models/main/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionRepository]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get('jwt'),
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
