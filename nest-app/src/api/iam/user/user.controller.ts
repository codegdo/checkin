import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {

  @HttpCode(HttpStatus.OK)
  @Get('users')
  getUser() {
    //return this.iamService.getUser();
  }

}
