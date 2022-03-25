import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import {
  UserLoginDto,
  UserSetupDto,
  UserSignupDto,
  UserVerifyDto,
} from '../../models/main/dtos';
import { User } from 'src/models/main/entities';
import { CurrentUser, Public, Serialize } from 'src/common/decorators';
import { MaskEnum, maskValue } from 'src/common/utils';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Public()
  @Get('signup')
  async getFormSignup(@Query('formName') formName: string) {
    const form = await this.authService.getForm(formName);

    return form;
  }

  @Public()
  @Post('signup')
  //@Serialize(UserData)
  async signup(@Body() body: UserSignupDto) {
    const data = await this.authService.signup(body);

    return {
      ...data,
      emailAddress: maskValue(MaskEnum.EMAIL, data.emailAddress),
      phoneNumber: maskValue(MaskEnum.PHONE, data.phoneNumber),
    };
  }

  @Public()
  @Post('verify')
  async verify(@Body() body: UserVerifyDto) {
    return this.authService.verify(body);
  }

  @Public()
  @Post('confirm')
  async confirm(@Body('key') key: string) {
    return this.authService.confirm(key);
  }

  @Public()
  @Get('setup')
  async getSetup(@Query('formName') formName: string) {
    const form = await this.authService.getForm(formName);

    return form;
  }

  @Public()
  @Post('setup')
  async setup(@Session() session: any, @Body() body: UserSetupDto) {
    const { user, ...rest } = await this.authService.setup(body);

    const { password, ..._user } = user;
    const { orgId } = _user;
    const accessToken = this.jwtService.sign({ orgId });

    session.data = { user: _user, ...rest };

    return {
      ...session.data,
      orgId,
      sid: session.id,
      accessToken
    };
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() body: UserLoginDto) {
    const { user, ...rest } = await this.authService.login(body);
    const { locations } = rest;

    const { password, ..._user } = user;
    const { orgId } = _user;
    const accessToken = this.jwtService.sign({ orgId });

    if (orgId) {
      session.data = {
        user: _user,
        orgId,
        locationId: locations[0]?.id,
        ...rest
      };

      return {
        ...session.data,
        orgId,
        sid: session.id,
        accessToken
      };
    }

    return {
      user: {
        ..._user,
        emailAddress: maskValue(MaskEnum.EMAIL, _user.emailAddress),
        phoneNumber: maskValue(MaskEnum.PHONE, _user.phoneNumber),
      },
    };
  }

  @Public()
  @Get('logout')
  logout(@Session() session: any, @CurrentUser() user: User) {
    console.log(session.id);

    if (session.user) {
      session.destroy();
    }

    return { ok: true };
  }

  // @Public()
  // @Post('resend')
  // async resend(@Body('username') username: string) {
  //   return this.authService.resend(username);
  // }

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
