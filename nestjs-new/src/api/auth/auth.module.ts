import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmExModule } from 'src/common';
import { UserRepository } from 'src/models/main';

@Module({
  imports: [
    TypeOrmExModule.forFeature([UserRepository], 'default'),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
