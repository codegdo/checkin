import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  FormRepository,
  ContactRepository,
  BusinessRepository,
  GroupRepository,
  TokenRepository,
  UserRepository,
  EmailRepository
} from 'src/models/main/repositories';
//import { CheckinRepository } from 'src/models/checkin/repositories';
import { ErrorService } from 'src/common/modules';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [FormRepository, BusinessRepository, UserRepository, ContactRepository, GroupRepository, TokenRepository, EmailRepository],
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
  providers: [AuthService, ErrorService],
})
export class AuthModule { }
