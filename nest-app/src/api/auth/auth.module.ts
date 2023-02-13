import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConfig } from 'src/configs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import {
  EncryptService,
  HashingService,
  KeyStoreService,
  KeyGenService,
  UtilService
} from '../../helpers';

import { UserRepository } from 'src/models/main/user/user.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: EncryptService,
    },
    {
      provide: KeyGenService,
      useClass: KeyStoreService,
    },
    UtilService,
    AuthService,
    UserRepository
  ],
  controllers: [AuthController],
})
export class AuthModule { }
