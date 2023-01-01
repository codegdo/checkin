import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Access, Permission } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';
import { InviteAction, ProfileAction } from 'src/services/casl/action.type';

@Access(AccessLevelEnum.External)
@Controller('account')
export class AccountController {
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Permission([ProfileAction.GET_PROFILE, 'profile'])
  getProfile() {
    //return this.authService.signup();
  }

  @HttpCode(HttpStatus.OK)
  @Post('profile')
  @Permission([ProfileAction.UPDATE_PROFILE, 'profile'])
  updateProfile() {
    //return this.authService.signup();
  }

  @HttpCode(HttpStatus.OK)
  @Get('invite')
  @Permission([InviteAction.GET_INVITE, 'invite'])
  getInvite() {
    //return this.authService.signup();
  }
}
