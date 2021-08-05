import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UserRepository } from 'src/models/main/user/user.repository';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async signup(emailAddress: string, password: string) {
    // check user
    const users = await this.userRepository.find(emailAddress);

    if (users.length) {
      throw new BadRequestException('Email in use.');
    }

    //
    const salt = randomBytes(8).toString('hex');

    const hash = await (scrypt(password, salt, 32)) as Buffer;

    const hashPassword = salt + '.' + hash.toString('hex');

    return 'Signup';
  }

  login(): string {
    return 'Login';
  }

  getLogin(): string {
    return 'Get Login';
  }

  getLogout(): string {
    return 'Get Logout';
  }
}
