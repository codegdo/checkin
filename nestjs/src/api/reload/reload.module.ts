import { Module } from '@nestjs/common';
import { ReloadService } from './reload.service';
import { ReloadController } from './reload.controller';

@Module({
  providers: [ReloadService],
  controllers: [ReloadController]
})
export class ReloadModule {}
