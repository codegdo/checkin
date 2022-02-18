import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { } from 'src/models/main/dtos';
import { Serialize, CurrentUser } from 'src/common/decorators';
import { PaginationQueryDto } from 'src/common/dtos';
import { User } from 'src/models/main/entities';

@Controller('setup')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  //@Serialize(UserData)
  getAllUsers(@CurrentUser() user: User, @Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Get('users/:id')
  //@Serialize(UserData)
  getOneUser(@CurrentUser() user: User, @Param('id') id: number) {
    console.log('GET_CURRENT_USER', user);
    return this.userService.findOne(id);
  }

  @Post('users')
  createUser(@CurrentUser() user: User, @Body() body: any) {
    return this.userService.create(body);
  }

  @Patch('users/:id')
  updateUser(@CurrentUser() user: User, @Param('id') id: number, @Body() body: any) {
    return this.userService.update(id, body);
  }

  @Delete('users/:id')
  deleteUser(@CurrentUser() user: User, @Param('id') id: number) { }
}
