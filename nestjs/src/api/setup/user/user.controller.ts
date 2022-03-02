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
  getAllUsers(
    @CurrentUser() user: User,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.userService.getAllUsers(paginationQuery);
  }

  @Get('users/:userId')
  //@Serialize(UserData)
  getUser(
    @CurrentUser() user: User,
    @Param('userId') userId: number,
    @Query('formId') formId: number | string,
  ) {

    const { id: loginId, orgId } = user;

    if (formId) {

      // getFormForUser
      if (isNaN(userId)) {
        userId = 0;
      }

      return this.userService.getForm({ formId, filterId: userId, loginId, orgId });
    }

    // getUser
    return { formId };

  }

  @Post('users')
  createUser(@CurrentUser() user: User, @Body() body: any) {
    return this.userService.createUser(body);
  }

  @Patch('users/:id')
  updateUser(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete('users/:id')
  deleteUser(@CurrentUser() user: User, @Param('id') id: number) { }
}
