import { Body, Controller, Get, Post } from '@nestjs/common';

export class SignupUserDto {
  readonly username: string;
  readonly email: string;
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
    // Handle POST request to process the signup form data
    // createUserDto should contain the data from the form submission
    // You can then create a user in your service and redirect or return a response
    return `Received signup data: ${JSON.stringify(signupUserDto)}`;
  }
}
