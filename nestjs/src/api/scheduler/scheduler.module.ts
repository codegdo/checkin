import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  controllers: [SchedulerController],
  providers: [SchedulerService],
  imports: [AppointmentModule]
})
export class SchedulerModule {}
