import { Controller, Get, Param, Query, Session } from '@nestjs/common';

import { CurrentUser } from 'src/common';
import { User } from 'src/models/main/entities';

@Controller('scheduler')
export class SchedulerController {
  @Get('calendars')
  getAllCalendars(@Session() session: any, @CurrentUser() user: User) {
    console.log(session.id);

    return { calendars: [] };
  }

  @Get('appointments')
  getAllAppointments(
    @Session() session: any,
    @CurrentUser() user: User,
    @Query('calendarId') calendarId: number,
    @Query('employeeId') employeeId: number,
  ) {
    console.log(session.id);
    console.log(calendarId);
    console.log(employeeId);

    return { appointments: [] };
  }

  @Get('appointments/:appointmentId')
  getOneAppointments(
    @Session() session: any,
    @CurrentUser() user: User,
    @Param('appointmentId') appointmentId: number,
  ) {
    console.log(session.id);
    console.log(appointmentId);

    return { appointment: {} };
  }
}
