import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';


@Controller('iam')
export class IamController {
  @HttpCode(HttpStatus.OK)
  @Get('users')
  getAll() {
    //return this.authService.signup();
  }
}
