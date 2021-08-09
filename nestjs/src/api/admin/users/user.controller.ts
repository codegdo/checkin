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
import { Serialize, PaginationQueryDto, Public } from 'src/common';

@Controller('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @Serialize(UserDto)
  getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Public()
  @Get('users/:id')
  @Serialize(UserDto)
  getOneUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {}
}
