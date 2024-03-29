import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('migration_up')
  async migrationUp() {
    console.log('WORKER CALL');
    return 'WORKER CALL';
  }
}
