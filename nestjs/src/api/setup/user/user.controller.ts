import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserQueryDto } from 'src/models/main/dtos';
import { Serialize, CurrentUser } from 'src/decorators';
import { User } from 'src/models/main/entities';
import { UserSession } from 'src/models/main/user/user.type';

@Controller('setup')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  getAllUsers(
    @CurrentUser() user: UserSession,
    @Query() query: UserQueryDto
  ) {
    return this.userService.getAllUsers({ user, query });
  }

  @Get('users/:userId')
  getUser(
    @CurrentUser() user: UserSession,
    @Param('userId') userId: number,
    @Query('formId') formId: number | string,
  ) {
    const { loginId, orgId } = user;

    if (formId) {
      // getFormForUser
      if (isNaN(userId)) {
        userId = 0;
      }

      return this.userService.getForm({
        formId,
        filterId: userId,
        loginId,
        orgId,
      });
    }

    // getUser
    return { formId };
  }

  @Post('users')
  createUser(@CurrentUser() user: UserSession, @Body() body: UserCreateDto) {
    const { loginId } = user;
    return this.userService.createUser({ ...body, loginId });
  }

  @Patch('users/:id')
  updateUser(
    @CurrentUser() user: UserSession,
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete('users/:id')
  deleteUser(@CurrentUser() user: UserSession, @Param('id') id: number) { }
}
