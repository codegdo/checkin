import { EntityRepository, Repository } from 'typeorm';
import { randomBytes, randomInt, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { LoginUserDto, SignupUserDto } from '../dtos';
import { trimUnderscoreObjectKey } from 'src/common/utils/trim-underscore-object-key.util';
import { SignupUserData } from './user.dto';

const scrypt = promisify(_scrypt);

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async hashPassword(password) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hash.toString('hex') + '.' + salt;
  }

  async validatePassword(password: string, _password: string) {
    const [hashPassword, salt] = _password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hashPassword === hash.toString('hex');
  }

  async signupUser(signupUserDto: SignupUserDto): Promise<SignupUserData> {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      username,
      password,
    } = signupUserDto;

    const hashedPassword = await this.hashPassword(password);

    // const [result] = await this.manager.query(
    //   `SELECT * FROM sec.fn_user_signup($1, $2, $3, $4, $5, $6)`,
    //   [
    //     firstName,
    //     lastName,
    //     emailAddress,
    //     phoneNumber,

    //     username,
    //     hashedPassword
    //   ],
    // );

    const [result] = await this.manager.query(
      `CALL sec.pr_user_signup($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        firstName,
        lastName,
        emailAddress,
        phoneNumber,

        username,
        hashedPassword,

        'null',
        'null',
        'null',
        '0'
      ],
    );

    return trimUnderscoreObjectKey<SignupUserData>(result);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const [user] = await this.manager.query(`SELECT * FROM sec.fn_user_login($1)`, [username]);

    // const query = this.createQueryBuilder('user');
    // const user = await query
    //   .addSelect(['user.password'])
    //   .leftJoinAndSelect('user.role', 'role')
    //   .leftJoinAndSelect('role.roleType', 'roleType')
    //   .where('user.username = :username', { username })
    //   .getOne();

    if (!user) {
      return undefined;
    }

    const { password: _password, ..._user } = user;

    return (await this.validatePassword(password, _password)) ? _user : null;
  }

  async verifyUser(username: string) {
    // await randomBytes(6).toString('base64');
    // await randomInt(100000, 999999);

    const key = await randomInt(100000, 999999).toString();
    const data = { username };
    const expiredAt = Math.floor(new Date().getTime() / 1000 + 300000); // 5 mins

    const [result] = await this.manager.query(
      `SELECT * FROM sec.fn_user_verify($1, $2, $3, $4)`,
      [
        username,
        key,
        data,
        expiredAt
      ],
    );

    return result;
  }

  async confirmUser(key: string) {
    const [result] = await this.manager.query(
      `SELECT is_active AS "isActive" FROM sec.fn_user_confirm($1)`,
      [key],
    );

    return result;
  }

  async getUser(username: string) {
    const [user] = await this.manager.query(`SELECT * FROM sec.fn_get_user($1)`, [username]);
    return user;
  }
}
