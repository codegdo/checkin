import { Controller, Delete, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { AccessLevel, UserAction } from 'src/constants';
import { Access, Permission } from 'src/decorators';

@Access(AccessLevel.INTERNAL)
@Controller('user')
export class UserController {


  @Get('users')
  @Permission([UserAction.GET_ALL_USER, 'iam'])
  getAllUser() {
    //return this.iamService.getAllUser();
  }

  @Get('users')
  @Permission([UserAction.GET_USER, 'iam'])
  getUser() {
    //return this.iamService.getUser();
  }

  @Post('users')
  @Permission([UserAction.CREATE_USER, 'iam'])
  createUser() {
    //return this.iamService.createUser();
  }

  @Put('users')
  @Permission([UserAction.UPDATE_USER, 'iam'])
  updateUser() {
    //return this.iamService.updateUser();
  }

  @Delete('users')
  @Permission([UserAction.DELETE_USER, 'iam'])
  deleteUser() {
    //return this.iamService.updateUser();
  }

}
