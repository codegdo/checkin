import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig } from 'src/configs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { HashingService } from '../../services/hashing/hashing.service';
import { EncryptService } from '../../services/hashing/encrypt.service';
import { KeyStoreService } from 'src/services/keygen/keystore.service';
import { KeyGenService } from 'src/services/keygen/keygen.service';
import { TypeOrmExModule } from 'src/custom/typeorm/typeorm-ex.module';
import { UserRepository } from 'src/models/main/user/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forFeature([UserRepository]),
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
