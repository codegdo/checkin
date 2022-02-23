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
  @Post('login')
  async login(@Session() session: any, @Body() body: UserLoginDto) {
    const data = await this.authService.login(body);

    console.log(data);

    const { user, policy, nav } = data;
    const { password, bizId, ...rest } = user;
    const accessToken = this.jwtService.sign({ bizId });

    if (bizId) {
      session.data = { user, policy, nav };

      return {
        user: { ...rest },
        policy,
        nav,
        bizId,
        sid: session.id,
        accessToken,
      };
    }

    return {
      user: {
        ...rest,
        emailAddress: maskValue(MaskEnum.EMAIL, rest.emailAddress),
        phoneNumber: maskValue(MaskEnum.PHONE, rest.phoneNumber),
      },
    };
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
    const { user, stores } = await this.authService.setup(body);
    const { password, bizId, ...rest } = user;
    const accessToken = this.jwtService.sign({ bizId });

    session.user = user;

    return {
      user: { ...rest },
      bizId,
      sid: session.id,
      accessToken,
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
