import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { HashingService } from '../../services/hashing/hashing.service';
import { EncryptService } from '../../services/hashing/encrypt.service';
import { KeyStoreService } from 'src/services/keygen/keystore.service';
import { KeyGenService } from 'src/services/keygen/keygen.service';

@Module({
  imports: [
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
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
