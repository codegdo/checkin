import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { SignupUserDto } from './dtos/signup-user.dto';
import { LoginUserDto } from '../dtos';

const scrypt = promisify(_scrypt);

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async hashPassword(password) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hash.toString('hex') + '.' + salt;
  }

  /*  async validatePassword(password: string) {
     const [hashPassword, salt] = this.password.split('.');
     const hash = (await scrypt(password, salt, 32)) as Buffer;
     return hashPassword === hash.toString('hex');
   }
  */
  async singupUser(signupUserDto: SignupUserDto) {
    const {
      firstName,
      lastName,
      emailAddress,
      username,
      password,
      data,
      expiredAt,
    } = signupUserDto;

    const hashedPassword = await this.hashPassword(password);

    const [result] = await this.manager.query(
      `SELECT * FROM sec.fn_user_signup($1, $2, $3, $4, $5, $6, $7)`,
      [
        firstName,
        lastName,
        emailAddress,

        username,
        hashedPassword,

        data,
        expiredAt,
      ],
    );

    //return result[0].fn_signupuser;
    return result;
  }

  async loginUser(loginUserDto: LoginUserDto) {
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

    return (await user.validatePassword(password)) ? _user : null;
  }
}
