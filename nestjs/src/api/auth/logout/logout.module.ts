import { Module } from '@nestjs/common';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';

@Module({
  controllers: [LogoutController],
  providers: [LogoutService]
})
export class LogoutModule {}
