import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/models/main/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';


@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'configs', '**/!(*.d).{ts,js}')),

    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => config.get('jwt.config'),
      inject: [ConfigService]
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
