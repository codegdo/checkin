import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('migration')
export class MigrationController {

  @EventPattern('db_initial_setup')
  async migrationUp(payload) {
    console.log('WORKER CALL', payload);
    return 'WORKER CALL';
  }
}
