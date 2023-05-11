import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('iam')
export class UserController {
  
  @HttpCode(HttpStatus.OK)
  @Get('users')
  getUser() {}
}
