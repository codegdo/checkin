import { Body, Controller, Get, Post, Session, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CreateUserDto, UserDto, LoginUserDto } from '../../models/main/dtos';
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
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  /* @Public()
  @Get('login')
  getLogin(@Session() session: any) {

    const token = this.jwtService.sign({ sid: session.id });
    session.user = 'hello';

    console.log('TOKEN', token);

    return this.authService.getLogin();
  }

  @Get('logout')
  async getLogout(@Session() session: any, @CurrentUser() user: string) {
    session.destroy();
    return this.authService.getLogout();
  } */
}
