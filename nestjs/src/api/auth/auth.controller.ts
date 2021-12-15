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
  //@Serialize(UserDto)
  async signup(@Body() body: ISignup) {
    const { username, emailAddress = '', phoneNumber = '', isActive }: UserDto = await this.authService.signup(body);

    return {
      username,
      emailAddress: emailAddress.replace(/^(.{2})[^@]+/, "$1***"),
      phoneNumber: phoneNumber.replace(/^(.{3})+/, "******$1"),
      isActive
    };
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() loginUserDto: LoginUserDto) {
    const user: UserDto = await this.authService.login(loginUserDto);
    const { password, orgId, orgActive, ...rest } = user;
    const accessToken = this.jwtService.sign({ orgId });

    if (orgId) {
      session.user = user;

      return {
        user: { ...rest },
        orgId,
        sid: session.id,
        accessToken
      };
    }

    const { username, emailAddress = '', phoneNumber = '', isActive } = rest;

    return {
      user: {
        username,
        emailAddress: emailAddress.replace(/^(.{2})[^@]+/, "$1***"),
        phoneNumber: phoneNumber.replace(/^(.{3})+/, "******$1"),
        isActive
      }
    }

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
