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
import { CurrentUser, Public, Serialize } from 'src/decorators';
import { MaskEnum, maskValue } from 'src/utils';
import { ThisMonthList } from 'twilio/lib/rest/api/v2010/account/usage/record/thisMonth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  private async getToken(sid: number) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync({ sid }, { algorithm: 'RS256', expiresIn: 60 * 60 })
    ]);

    return { accessToken }
  }

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
    const { password, orgId, ..._user } = user;
    const { accessToken } = await this.getToken(session.id);

    session.data = { user: _user, ...rest };

    return {
      ...session.data,
      orgId,
      accessToken
    };
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() body: UserLoginDto) {
    console.log(body);
    const { user, ...rest } = await this.authService.login(body);
    const { password, orgId, ..._user } = user;
    const { accessToken } = await this.getToken(session.id);

    if (orgId) {
      session.data = {
        user: _user,
        locationId: rest.locations.length > 1 ? null : rest.locations[0].id,
        orgId,
        ...rest
      };

      return {
        ...session.data,
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
  logout(
    @Session() session: any
  ) {
    console.log(session.id);

    if (session.data) {
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
