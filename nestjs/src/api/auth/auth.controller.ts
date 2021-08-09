import { Body, Controller, Get, Post, Session, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserDto } from '../../models/main/dtos';
import { Public, Serialize } from 'src/common';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  @Public()
  @Post('signup')
  @Serialize(UserDto)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @Public()
  @Get('login')
  getLogin(@Session() session: any) {

    const token = this.jwtService.sign({ hello: 'me' });
    session.user = 'hello';
    session.token = token;
    console.log('SESSION', session);
    console.log('SECRET', this.configService.get('JWT_SECRET'));
    return this.authService.getLogin();
  }

  @Public()
  @Get('logout')
  async getLogout(@Session() session: any, @CurrentUser() user: string) {

    console.log('SESSION', session);

    try {
      const token = await this.jwtService.verify(session.token);
      const currentTimestamp = new Date().getTime() / 1000;
      const tokenIsNotExpired = token.exp > currentTimestamp;

      console.log(tokenIsNotExpired);
    } catch (err) {
      throw new UnauthorizedException();
    }


    session.destroy();
    return this.authService.getLogout();
  }
}
