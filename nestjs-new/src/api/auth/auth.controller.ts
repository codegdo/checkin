import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  async login(@Session() session: any, @Body() body: any) {

    const result = this.authService.login(body);
    session.data = result;

    return result;
  }

  @Get('logout')
  logout(@Session() session: any) {

    if (session?.data) {
      session.destroy();
    }

    return { ok: true };
  }
}
