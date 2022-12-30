import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Access } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';

@Access(AccessLevelEnum.External)
@Controller('account')
export class AccountController {

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile() {
    //return this.authService.signup();
  }

  @HttpCode(HttpStatus.OK)
  @Get('invite')
  getInvite() {
    //return this.authService.signup();
  }
}

