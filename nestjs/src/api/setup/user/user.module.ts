import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FormRepository, UserRepository } from 'src/models/main/repositories';
import { TypeOrmExModule } from 'src/common';

@Module({
  imports: [
    TypeOrmExModule.forFeature([FormRepository, UserRepository], 'default'),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
