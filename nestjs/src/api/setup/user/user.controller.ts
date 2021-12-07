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
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/models/main/dtos';
import { Serialize, CurrentUser } from 'src/common/decorators';
import { PaginationQueryDto } from 'src/common/dtos';
import { User } from 'src/models/main/entities';

@Controller('setup')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  @Serialize(UserDto)
  getAllUsers(@CurrentUser() user: User, @Query() paginationQuery: PaginationQueryDto) {

    return this.userService.findAll(paginationQuery);
  }

  @Get('users/:id')
  @Serialize(UserDto)
  getOneUser(@CurrentUser() user: User, @Param('id') id: number) {
    console.log('GET_CURRENT_USER', user);
    return this.userService.findOne(id);
  }

  @Post('users')
  createUser(@CurrentUser() user: User, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('users/:id')
  updateUser(@CurrentUser() user: User, @Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  deleteUser(@CurrentUser() user: User, @Param('id') id: number) { }
}
