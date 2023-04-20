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
import { AccountService } from './account.service';

@Access(AccessLevelEnum.External)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Permission([ProfileAction.GET_PROFILE, 'account'])
  getProfile() {
    //return this.accountService.signup();
  }

  @HttpCode(HttpStatus.OK)
  @Put('profile')
  @Permission([ProfileAction.UPDATE_PROFILE, 'account'])
  updateProfile() {
    //return this.accountService.signup();
  }

  @Get('subscription')
  addSubscription() {
    return this.accountService.addSubscription();
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
