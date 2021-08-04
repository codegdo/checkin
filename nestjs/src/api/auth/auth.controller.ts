import { Controller, Get, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(): string {
    return this.authService.signup();
  }

  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @Get('login')
  getLogin(@Session() session: any): string {
    session.user = "hello";
    console.log('SESSION', session);
    return this.authService.getLogin();
  }

  @Get('logout')
  getLogout(@Session() session: any): string {
    session.destroy();
    console.log('SESSION', session);
    return this.authService.getLogout();
  }

}
