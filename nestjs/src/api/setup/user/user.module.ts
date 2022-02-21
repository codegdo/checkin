import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FormRepository, UserRepository } from 'src/models/main/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormRepository, UserRepository], 'default'),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
