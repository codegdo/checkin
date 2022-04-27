import { EntityRepository, Repository } from 'typeorm';
import { randomInt } from 'crypto';

import {
  encryptKeyValue,
  trimObjectKey,
  validatePassword,
} from 'src/utils';

import { User } from './user.entity';
import { TokenEnum } from '../token/token.type';

import {
  UserSignupDto,
  UserSetupDto,
  UserLoginDto,
  UserCreateDto,
} from './user.dto';

import {
  UserSignupData,
  UserVerifyData,
  UserSetupData,
  UserLoginData,
  UserQueryAll,
} from './user.type';
import { ConflictException } from '@nestjs/common';
import { ErrorMessageEnum } from 'src/common/error/error.type';
import { FormTypeEnum } from '../form/form.type';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser(dto: UserSignupDto): Promise<UserSignupData> {
    let { data } = dto;

    // encrypt password
    data = await encryptKeyValue(2, data);

    const [result] = await this.manager.query(
      `CALL sec.pr_user_signup($1, $2)`,
      [data, null],
    );

    return result.data;
  }

  async verifyUser(loginId: number): Promise<UserVerifyData> {
    const key = await randomInt(100000, 999999).toString();
    const type = TokenEnum.VERIFY;
    const expiredAt = new Date().getTime() + 300000; // 5 mins

    const [result] = await this.manager.query(
      `CALL sec.pr_user_verify($1, $2, $3, $4, $5)`,
      [loginId, key, type, expiredAt, null],
    );

    return result.data;
  }

  async setupUser(dto: UserSetupDto): Promise<UserSetupData> {
    const { data, loginId } = dto;

    const [result] = await this.manager.query(
      `CALL sec.pr_user_setup($1, $2, $3, $4, $5, $6, $7, $8)`,
      [data, loginId, null, null, null, null, null, null],
    );

    return result;
  }

  async loginUser(dto: UserLoginDto): Promise<UserLoginData> {
    const { username, password } = dto;

    const [result] = await this.manager.query(
      `CALL sec.pr_user_login($1, $2, $3, $4, $5, $6, $7)`,
      [username, null, null, null, null, null, null],
    );

    const {
      user: { password: _password, ..._user },
      ...rest
    } = result;

    const isValidate = await validatePassword(password, _password);

    if (isValidate) {
      return { user: _user, ...rest };
    } else {
      throw new ConflictException(ErrorMessageEnum.NOT_MATCH);
    }
  }

  async confirmUser(key: string): Promise<any> {
    const [result] = await this.manager.query(
      `CALL sec.pr_user_confirm($1, $2)`,
      [key, null],
    );

    return result;
  }

  async createUser(dto: UserCreateDto) {
    let { data, formId, userId, loginId } = dto;

    // encrypt password
    data = await encryptKeyValue(2, data);

    const [result] = await this.manager.query(
      `CALL sec.pr_user_save($1, $2, $3, $4, $5)`,
      [data, formId, userId, loginId, null],
    );

    return result.data;
  }

  async getUser(username: string) {
    const [user] = await this.manager.query(
      `SELECT * FROM sec.fn_user_get($1)`,
      [username],
    );
    return user;
  }

  async getAllUsers({ user, query }: UserQueryAll) {
    const { groupType, orgId } = user;
    const { username, firstName, lastName, emailAddress, phoneNumber, location, group, type, limit, offset, sortColumn, sortDirection } = query;
    const [result] = await this.manager.query(
      `CALL sec.pr_user_get_all($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
      [groupType, orgId, username, firstName, lastName, emailAddress, phoneNumber, location, group, type, limit, offset, sortColumn, sortDirection, null, null, null],
    );

    return result;
  }
}

/*
const {
      username,
      orgName,
      subdomain,
      locationName,
      streetAddress,
      country,
      state,
      city,
      postalCode,
    } = dto;

    const [result] = await this.manager.query(
      `CALL sec.pr_user_setup($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        username,
        orgName,
        subdomain,
        locationName,
        streetAddress,
        country,
        state,
        city,
        postalCode,

        'null',
        '0',
        '0',
      ],
    );

    return trimObjectKey<SetupUserData>(result); 

  // await randomBytes(6).toString('base64');
  // await randomInt(100000, 999999);

  // signup
  const [result] = await this.manager.query(
    `SELECT * FROM sec.fn_user_signup($1, $2, $3, $4, $5, $6)`,
    [
      firstName,
      lastName,
      emailAddress,
      phoneNumber,

      username,
      hashedPassword
    ],
  );

  // login
  const query = this.createQueryBuilder('user');
  const user = await query
    .addSelect(['user.password'])
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('role.roleType', 'roleType')
    .where('user.username = :username', { username })
    .getOne();
*/
