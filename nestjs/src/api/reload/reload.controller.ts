import { Body, Controller, Post, Session } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { UserSession } from 'src/models/main/user/user.type';
import { ReloadService } from './reload.service';

@Controller('reload')
export class ReloadController {
  constructor(
    private readonly reloadService: ReloadService
  ) { }

  @Post('location')
  async location(
    @Session() session: any,
    @Body('locationId') locationId: number
  ) {

    session.data.locationId = locationId;

    return { locationId };
  }

}
