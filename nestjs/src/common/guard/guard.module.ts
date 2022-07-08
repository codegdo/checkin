import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ApiGuard } from '../../guards/api.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { SessionRepository } from 'src/models/main/repositories';
import { Session } from 'src/models/main/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session], 'default'),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class GuardModule { }
