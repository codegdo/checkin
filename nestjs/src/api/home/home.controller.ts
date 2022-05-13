import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { UserSession } from 'src/models/main/user/user.type';

@Controller('home')
export class HomeController {
  constructor() { }

  @Post('reload')
  async reload(
    @CurrentUser() user: UserSession,
    @Body() body: any
  ) {
    return user;
  }
}
