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
import { UserCreateDto } from 'src/models/main/dtos';
import { Serialize, CurrentUser } from 'src/decorators';
import { PagingQueryDto } from 'src/dtos';
import { User } from 'src/models/main/entities';
import { SessionUser } from 'src/models/main/user/user.type';

@Controller('setup')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  //@Serialize(UserData)
  getAllUsers(
    @CurrentUser() user: SessionUser,
    @Query() query: PagingQueryDto
  ) {
    const { groupType, orgId, locationId } = user;
    return this.userService.getAllUsers(groupType, orgId, locationId);
  }

  @Get('users/:userId')
  //@Serialize(UserData)
  getUser(
    @CurrentUser() user: SessionUser,
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
  createUser(@CurrentUser() user: SessionUser, @Body() body: UserCreateDto) {
    const { loginId } = user;

    return this.userService.createUser({ ...body, loginId });
  }

  @Patch('users/:id')
  updateUser(
    @CurrentUser() user: SessionUser,
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete('users/:id')
  deleteUser(@CurrentUser() user: SessionUser, @Param('id') id: number) { }
}
