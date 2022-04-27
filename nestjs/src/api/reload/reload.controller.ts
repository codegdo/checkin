import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { UserSession } from 'src/models/main/user/user.type';
import { ReloadService } from './reload.service';

@Controller('reload')
export class ReloadController {
  constructor(
    private readonly reloadService: ReloadService
  ) { }

  @Post('session')
  async session(
    @CurrentUser() user: UserSession,
    @Body() body: any
  ) {
    return user;
  }
}
