import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CreateUserDto, UserDto, LoginUserDto } from '../../models/main/dtos';
import { CurrentUser, Public, Serialize } from 'src/common/decorators';
import { User } from 'src/models/main/entities';
import { ISignup } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Public()
  @Post('signup')
  @Serialize(UserDto)
  signup(@Body() body: ISignup) {
    return this.authService.signup(body);
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);
    const { id, username, roleType, isActive, isOwner, orgId } = user;
    let accessToken = null;

    if (orgId) {
      session.user = user;
      accessToken = this.jwtService.sign({ orgId })
    }

    return {
      user: {
        id,
        username,
        roleType,
        isOwner,
        isActive
      },
      orgId,
      sid: session.id,
      accessToken
    };
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

  @Public()
  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    await this.authService.verify(token);
    return {};
  }

  @Public()
  @Post('resend')
  async resend(@Body('username') username: string) {
    return this.authService.resend(username);
  }

  /*@Get('logout')
  async getLogout(@Session() session: any, @CurrentUser() user: string) {
    session.destroy();
    return this.authService.getLogout();
  } */
}
