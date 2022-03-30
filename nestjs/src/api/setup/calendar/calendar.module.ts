import { Module } from '@nestjs/common';
import { SetupCalendarController } from './calendar.controller';
import { SetupCalendarService } from './calendar.service';

@Module({
  controllers: [SetupCalendarController],
  providers: [SetupCalendarService]
})
export class SetupCalendarModule { }
