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
import {
  LoginUserDto,
  SetupUserDto,
  SignupUserDto,
  VerifyUserDto,
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
  @Post('signup')
  //@Serialize(UserData)
  async signup(@Body() body: SignupUserDto) {

    const data = await this.authService.signup(body);

    console.log('SIGNUP', data);

    return {
      id: data.id,
      username: data.username,
      emailAddress: maskValue(MaskEnum.EMAIL, data.emailAddress),
      phoneNumber: maskValue(MaskEnum.PHONE, data.phoneNumber),
      isActive: data.isActive,
    };
  }

  @Public()
  @Get('form/:name')
  async form(@Param('name') name: string) {
    const form = await this.authService.form(name);

    console.log('CONTROLLER', form);
    return form;
  }

  @Public()
  @Post('login')
  async login(@Session() session: any, @Body() body: LoginUserDto) {
    const user = await this.authService.login(body);
    const { password, orgId, ...rest } = user;
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

    return {
      user: {
        ...rest,
        emailAddress: maskValue(MaskEnum.EMAIL, rest.emailAddress),
        phoneNumber: maskValue(MaskEnum.PHONE, rest.phoneNumber)
      },
    };
  }

  @Public()
  @Post('verify')
  async verify(@Body() body: VerifyUserDto) {
    return this.authService.verify(body);
  }

  @Public()
  @Post('confirm')
  async confirm(@Body('key') key: string) {
    return this.authService.confirm(key);
  }

  @Public()
  @Post('setup')
  async setup(@Session() session: any, @Body() body: SetupUserDto) {
    const user = await this.authService.setup(body);

    const { password, orgId, ...rest } = user;
    const accessToken = this.jwtService.sign({ orgId });

    session.user = user;

    return {
      user: { ...rest },
      orgId,
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
