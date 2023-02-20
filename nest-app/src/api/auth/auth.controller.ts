import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Session,
  Body,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import {
  UserLoginDto,
  UserSignupBody,
  UserSignupDto,
} from 'src/models/main/user/user.dto';
import { SESSION_DATA_KEY } from 'src/types';
import { AuthType } from 'src/types/auth.enum';
import { AuthService } from './auth.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() body: UserSignupBody) {
    console.log(body);
    const { data } = body;
    return this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify')
  verify() {

  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Session() session, @Body() body: UserLoginDto) {
    const { accessToken, refreshToken, current, user } =
      await this.authService.login(body, session.id);

    session[SESSION_DATA_KEY] = { current, user };

    return { accessToken, refreshToken, current, user };
  }

  @HttpCode(HttpStatus.OK)
  @Get('login')
  getlogin() { return { message: 'hey!' } }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Session() session) {
    const { data } = session;

    if (data) {
      session.destroy();
    }

    return { ok: true };
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh/:tokenId')
  refresh() {
    //return this.authService.login();
  }
}
