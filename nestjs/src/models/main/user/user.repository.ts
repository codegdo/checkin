import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto) {
    const user = await this.create(createUserDto);
    return this.save(user);
  }
}
