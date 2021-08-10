import { Body, Controller, Get, Post, Session, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CreateUserDto, UserDto } from '../../models/main/dtos';
import { Public, Serialize, CurrentUser } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }

  @Public()
  @Post('signup')
  @Serialize(UserDto)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @Public()
  @Get('login')
  getLogin(@Session() session: any) {

    const token = this.jwtService.sign({ sid: session.id });
    session.user = 'hello';

    console.log('TOKEN', token);

    return this.authService.getLogin();
  }

  @Public()
  @Get('logout')
  async getLogout(@Session() session: any, @CurrentUser() user: string) {
    session.destroy();
    return this.authService.getLogout();
  }
}
