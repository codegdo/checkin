import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { User } from 'src/models/main/entities';

@Controller('setup')
export class GroupController {

  @Get('groups/:groupId')
  getGroup(
    @CurrentUser() user: User,
    @Param('groupId') groupId: number,
    @Query('formId') formId: number | string,
  ) {
    const { id: loginId, orgId } = user;

    if (formId) {

      // getFormForGroup
      if (isNaN(groupId)) {
        groupId = 0;
      }

      //return this.userService.getForm({ formId, groupId, loginId, orgId });
      return { formId };
    }

    // getUser
    return { formId };
  }
}
