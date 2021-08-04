import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/main/user/user.repository';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  signup(): string {
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
