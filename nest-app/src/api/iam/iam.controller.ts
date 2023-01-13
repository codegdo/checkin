import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Access, Permission } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';
import { UserAction } from 'src/helpers';

@Access(AccessLevelEnum.Internal)
@Controller('iam')
export class IamController {
  @HttpCode(HttpStatus.OK)
  @Get('users')
  @Permission([UserAction.GET_ALL_USER, 'iam'])
  getAllUser() {
    //return this.iamService.getAllUser();
  }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  @Permission([UserAction.GET_USER, 'iam'])
  getUser() {
    //return this.iamService.getUser();
  }

  @HttpCode(HttpStatus.OK)
  @Post('users')
  @Permission([UserAction.CREATE_USER, 'iam'])
  createUser() {
    //return this.iamService.createUser();
  }

  @HttpCode(HttpStatus.OK)
  @Put('users')
  @Permission([UserAction.UPDATE_USER, 'iam'])
  updateUser() {
    //return this.iamService.updateUser();
  }

  @HttpCode(HttpStatus.OK)
  @Delete('users')
  @Permission([UserAction.DELETE_USER, 'iam'])
  deleteUser() {
    //return this.iamService.updateUser();
  }
}
/*
enum UserAction {
  GET_ALL_USER = 'users:getAllUser',
  GET_USER = 'users:getUser',
  CREATE_USER = 'users:createUser',
  UPDATE_USER = 'users:updateUser',
  DELETE_USER = 'users:deleteUser',
}
*/

