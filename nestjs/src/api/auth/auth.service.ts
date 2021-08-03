import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup(): string {
    return 'Signup';
  }

  login(): string {
    return 'Login';
  }
}
