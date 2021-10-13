import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  OrganizationRepository,
  TokenRepository,
  UserRepository,
} from 'src/models/main/repositories';
import { CalendarRepository } from 'src/models/scheduler/repositories';
import { appConfig } from 'src/configs';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganizationRepository,
      UserRepository,
      TokenRepository,
    ], 'default'),
    TypeOrmModule.forFeature([CalendarRepository], 'scheduler'),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return configService.get('jwt');
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
