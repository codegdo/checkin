import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Access, Permission } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';
import { ProfileAction } from 'src/helpers';

@Access(AccessLevelEnum.External)
@Controller('account')
export class AccountController {
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Permission([ProfileAction.GET_PROFILE, 'account'])
  getProfile() {
    //return this.authService.signup();
  }

  @HttpCode(HttpStatus.OK)
  @Put('profile')
  @Permission([ProfileAction.UPDATE_PROFILE, 'account'])
  updateProfile() {
    //return this.authService.signup();
  }

}
/*
export enum ProfileAction {
  GET_PROFILE = 'profile:getProfile',
  UPDATE_PROFILE = 'profile:updateProfile',
}


service:
  account

action:
  account:* = all action
  
  profile
    getProfile
    updateProfile
  invite

resource:
  account
*/
