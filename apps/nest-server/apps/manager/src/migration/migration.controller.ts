import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @EventPattern('db_seed_schemas')
  async seedSchemas(payload) {
    console.log('MIGRATION');
    //return this.migrationService.seedSchemas(payload);
  }

  @EventPattern('db_drop_schemas')
  async dropSchemas(payload) {
    return this.migrationService.dropSchemas(payload);
  }

  @EventPattern('db_seed_initial_setup')
  async seedIntialSetup(payload) {
    return this.migrationService.seedIntialSetup(payload);
  }

  @EventPattern('db_drop_initial_setup')
  async dropIntialSetup(payload) {
    return this.migrationService.dropIntialSetup(payload);
  }

  @EventPattern('db_run_migration_by_id')
  async runMigrationById(payload) {
    console.log(payload);
    return this.migrationService.runMigrationById(payload);
  }

  @EventPattern('db_rollback_migration_by_id')
  async rollbackMigrationById(payload) {
    return this.migrationService.rollbackMigrationById(payload);
  }
}
