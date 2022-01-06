import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  ContactRepository,
  OrganizationRepository,
  RoleRepository,
  TokenRepository,
  UserRepository,
  EmailRepository
} from 'src/models/main/repositories';
import { WorkspaceRepository as CheckinRepository } from 'src/models/checkin/repositories';
import { ErrorService } from 'src/common/modules';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [OrganizationRepository, UserRepository, ContactRepository, RoleRepository, TokenRepository, EmailRepository],
      'default',
    ),
    TypeOrmModule.forFeature([CheckinRepository], 'checkin'),
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
