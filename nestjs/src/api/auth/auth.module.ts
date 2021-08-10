import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/models/main/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('jwt.config')
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
