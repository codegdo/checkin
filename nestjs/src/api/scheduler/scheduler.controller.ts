import { Controller, Get, Session } from '@nestjs/common';

import { CurrentUser } from 'src/common';
import { User } from 'src/models/main/entities';

@Controller('scheduler')
export class SchedulerController {

  @Get('/')
  getAllCalendars(@Session() session: any, @CurrentUser() user: User) {
    console.log(session.id);

    return {};
  }

  @Get(':id/appointments')
  getAllAppointments(@Session() session: any, @CurrentUser() user: User) {
    console.log(session.id);

    return {};
  }

}
