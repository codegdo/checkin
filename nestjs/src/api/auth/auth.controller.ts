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
import { LoginUserDto, VerifyUserDto } from '../../models/main/dtos';
import { CurrentUser, Public, Serialize } from 'src/common/decorators';
import { User } from 'src/models/main/entities';
import { ISignup } from './types/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Public()
  @Post('signup')
  //@Serialize(UserData)
  async signup(@Body() body: ISignup) {
    const {
      username,
      emailAddress = '',
      phoneNumber = '',
      isActive,
    } = await this.authService.signup(body);

    return {
      username,
      emailAddress: emailAddress.replace(/^(.{2})[^@]+/, '$1***'),
      phoneNumber: phoneNumber.replace(/^(.{3})+/, '******$1'),
      isActive,
    };
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);
    const { password, orgId, orgActive, ...rest } = user;
    const accessToken = this.jwtService.sign({ orgId });

    if (orgId) {
      session.user = user;

      return {
        user: { ...rest },
        orgId,
        sid: session.id,
        accessToken,
      };
    }

    const { username, emailAddress = '', phoneNumber = '', isActive } = rest;

    return {
      user: {
        username,
        emailAddress: emailAddress.replace(/^(.{2})[^@]+/, '$1***'),
        phoneNumber: phoneNumber.replace(/^(.{3})+/, '******$1'),
        isActive,
      },
    };
  }



  @Public()
  @Post('verify')
  async verify(@Body() body: VerifyUserDto) {
    await this.authService.verify(body);
    return { ok: true };
  }

  @Public()
  @Post('confirm')
  async verifyConfirm(@Body('key') key: string) {
    await this.authService.confirm(key);
    return { ok: true };
  }

  @Public()
  @Post('resend')
  async resend(@Body('username') username: string) {
    return this.authService.resend(username);
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


  // @Public()
  // @Get('verify/:token')
  // async verify(@Param('token') token: string) {
  //   await this.authService.verify(token);
  //   return {};
  // }

  /*@Get('logout')
  async getLogout(@Session() session: any, @CurrentUser() user: string) {
    session.destroy();
    return this.authService.getLogout();
  } */
}
