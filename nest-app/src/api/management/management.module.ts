import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';

@Module({
  controllers: [ManagementController],
  providers: [ManagementService]
})
export class ManagementModule {}
