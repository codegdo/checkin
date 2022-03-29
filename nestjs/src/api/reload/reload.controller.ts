import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators';
import { SessionUser } from 'src/models/main/user/user.type';
import { ReloadService } from './reload.service';

@Controller('reload')
export class ReloadController {
  constructor(
    private readonly reloadService: ReloadService
  ) { }

  @Post('session')
  async session(
    @CurrentUser() user: SessionUser,
    @Body() body: any
  ) {
    return user;
  }
}
