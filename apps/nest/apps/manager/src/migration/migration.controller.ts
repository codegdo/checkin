import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MigrationService } from './migration.service';
import { MANAGER_SERVICE_MIGRATION_OPERATION } from '@app/common';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @EventPattern(MANAGER_SERVICE_MIGRATION_OPERATION)
  async performMigrationOperation(payload) {
    return this.migrationService.performMigrationOperation(payload);
  }
}
