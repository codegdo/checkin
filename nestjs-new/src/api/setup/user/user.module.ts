import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/models/main';
import { TypeOrmExModule } from 'src/common';

@Module({
  imports: [
    TypeOrmExModule.forFeature([UserRepository], 'default'),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
