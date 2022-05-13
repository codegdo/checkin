import { Controller, Get, Query } from '@nestjs/common';

import { CurrentUser } from 'src/decorators';
import { UserQueryDto } from 'src/models/main/dtos';
import { UserSession } from 'src/models/main/types';

@Controller('admin')
export class OrganizationController {

  @Get('organizations')
  getAllUsers(
    @CurrentUser() user: UserSession,
    @Query() query: UserQueryDto
  ) {
    //return this.userService.getAllUsers({ user, query });
  }
}
