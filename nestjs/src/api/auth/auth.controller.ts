import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CreateUserDto, UserDto, LoginUserDto } from '../../models/main/dtos';
import { CurrentUser, Public, Serialize } from 'src/common';
import { User } from 'src/models/main/entities';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Public()
  @Post('signup')
  @Serialize(UserDto)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);
    const accessToken = this.jwtService.sign({ orgId: user.orgId });
    session.user = user;

    return { user, sid: session.id, accessToken };
  }

  @Public()
  @Get('logout')
  logout(@Session() session: any, @CurrentUser() user: User) {
    console.log(session.id);

    if (session.user) {
      session.destroy();
    }

    return {};
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
