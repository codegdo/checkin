import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @EventPattern('db_seed_schemas')
  async seedSchemas(payload) {
    return this.migrationService.seedSchemas();
  }

  @EventPattern('db_drop_schemas')
  async dropSchemas(payload) {
    return this.migrationService.dropSchemas();
  }
}
