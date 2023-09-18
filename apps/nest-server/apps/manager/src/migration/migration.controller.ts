import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @EventPattern('db_seed_schemas')
  async seedSchemas() {
    return this.migrationService.seedSchemas();
  }

  @EventPattern('db_drop_schemas')
  async dropSchemas() {
    return this.migrationService.dropSchemas();
  }

  @EventPattern('db_seed_initial_setup')
  async seedIntialSetup() {
    return this.migrationService.seedIntialSetup();
  }

  @EventPattern('db_drop_initial_setup')
  async dropIntialSetup() {
    return this.migrationService.dropIntialSetup();
  }

  @EventPattern('db_run_migration_by_id')
  async runMigrationById(migrationId) {
    return this.migrationService.runMigrationById(migrationId);
  }

  @EventPattern('db_rollback_migration_by_id')
  async rollbackMigrationById(migrationId) {
    return this.migrationService.rollbackMigrationById(migrationId);
  }
}
