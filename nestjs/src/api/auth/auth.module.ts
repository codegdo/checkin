import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  OrganizationRepository,
  TokenRepository,
  UserRepository,
} from 'src/models/main/repositories';
import { CalendarRepository } from 'src/models/scheduler/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationRepository, UserRepository, TokenRepository]),
    TypeOrmModule.forFeature([CalendarRepository], 'schedule'),

    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('jwt.config');
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
