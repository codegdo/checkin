import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async singupUser() {
    /* return await this.manager.query(`SELECT sp_signupuser($1, $2, $3)`, [
      email,
      username,
      password
    ]); */
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
