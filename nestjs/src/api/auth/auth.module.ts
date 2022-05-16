import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  FormRepository,
  ContactRepository,
  OrganizationRepository,
  GroupRepository,
  TokenRepository,
  UserRepository,
  EmailRepository
} from 'src/models/main/repositories';
//import { CheckinRepository } from 'src/models/checkin/repositories';
import { LoggerService } from 'src/common';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [FormRepository, OrganizationRepository, UserRepository, ContactRepository, GroupRepository, TokenRepository, EmailRepository],
      'default',
    ),
    //TypeOrmModule.forFeature([CheckinRepository], 'checkin'),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return configService.get('jwt');
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LoggerService],
})
export class AuthModule { }
