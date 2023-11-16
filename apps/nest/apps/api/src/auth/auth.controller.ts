import { Body, Controller, Get, Post } from '@nestjs/common';

export class SignupUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export class LoginUserDto {
  readonly username: string;
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  @Get('signup')
  getSignUpForm() {
    // Handle GET request to render the signup form
    return 'Render the signup form here';
  }

  @Post('signup')
  postSignUpForm(@Body() signupUserDto: SignupUserDto) {
    return `Received signup data: ${JSON.stringify(signupUserDto)}`;
  }

  @Post('login')
  postLoginForm(@Body() loginUserDto: LoginUserDto) {
    return {
      id: '1',
      firstName: 'giang',
      lastName: 'do',
      email: 'giangd@gmail.com',
      phone: '8583571474',
      username: 'gdo',
      role: 'owner',
      roleType: 'Internal',
      companyId: 1,
      isOwner: true,
      isActive: true,
    };
  }
}
