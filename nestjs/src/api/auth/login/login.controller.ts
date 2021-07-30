import { Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  login(): string {
    return this.loginService.login();
  }
}
