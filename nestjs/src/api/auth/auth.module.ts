import { Module } from '@nestjs/common';
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
import { LoggerService, TypeOrmExModule } from 'src/common';

@Module({
  imports: [
    TypeOrmExModule.forFeature(
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
