import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserDto } from '../../models/main/dtos'
import { Serialize } from 'src/interceptors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @Serialize(UserDto)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @Get('login')
  getLogin(@Session() session: any) {
    session.user = "hello";
    console.log('SESSION', session);
    return this.authService.getLogin();
  }

  @Get('logout')
  getLogout(@Session() session: any) {
    session.destroy();
    console.log('SESSION', session);
    return this.authService.getLogout();
  }

}
