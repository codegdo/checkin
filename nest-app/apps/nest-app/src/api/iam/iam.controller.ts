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

//@Access(AccessLevelEnum.Internal)
@Controller()
export class IamController {


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

