import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @EventPattern('db_seeding')
  async migrationUp(payload) {
    console.log('SEEDDING', payload);
    return this.migrationService.runSeeding();
  }
}
