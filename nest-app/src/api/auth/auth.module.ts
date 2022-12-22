import { Module } from '@nestjs/common';
import { HashingService } from '../../services/hashing/hashing.service';
import { EncryptService } from '../../services/hashing/encrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

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
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
