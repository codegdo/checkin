import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto) {
    const user = await this.create(createUserDto);
    return this.save(user);
  }

  async loginUser(loginUserDto) {
    const { username, password } = loginUserDto;
    const query = this.createQueryBuilder('user');
    const user = await query
      .addSelect(['user.password'])
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      return undefined;
    }

    const { password: _password, ..._user } = user;

    return await user.validatePassword(password) ? _user : null;
  }
}
