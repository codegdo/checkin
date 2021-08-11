import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from 'src/models/main/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signup(createUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  login(): string {
    return 'Login';
  }

  getLogin(): { [x: string]: string } {
    return { message: 'Get Login' };
  }

  getLogout(): string {
    return 'Get Logout';
  }
}
