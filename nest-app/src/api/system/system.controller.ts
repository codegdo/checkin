import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('system')
export class SystemController {

  @HttpCode(HttpStatus.OK)
  @Get('clients')
  getAll() {
    //return this.authService.signup();
  }

}
