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
import { UserSignupBody, UserSignupDto } from 'src/models/main/user/user.dto';
import { SESSION_DATA_KEY } from 'src/types';
import { AuthType } from 'src/types/auth.enum';
import { AuthService } from './auth.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: UserSignupBody) {
    const { data } = body;
    return this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Session() session) {
    session[SESSION_DATA_KEY] = {
      user: { id: session.id },
    };
    return this.authService.login();
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Session() session) {
    const { data } = session;

    if (data) {
      session.destroy();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-session')
  refresh() {
    //return this.authService.login();
  }
}
