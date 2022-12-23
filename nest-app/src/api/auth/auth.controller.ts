import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { AuthType } from 'src/types/auth.enum';
import { AuthService } from './auth.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
