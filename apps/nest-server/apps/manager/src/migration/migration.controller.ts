import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @EventPattern('init_seed_schemas')
  async seedSchemas() {
    return this.migrationService.seedSchemas();
  }

  @EventPattern('init_drop_schemas')
  async dropSchemas() {
    return this.migrationService.dropSchemas();
  }

  @EventPattern('init_seed_migrations')
  async seedMigrations() {
    return this.migrationService.seedMigrations();
  }

  @EventPattern('init_drop_migrations')
  async dropMigrations() {
    return this.migrationService.dropMigrations();
  }

  @EventPattern('db_run_migrations')
  async runMigrations(migrationId) {
    return this.migrationService.runMigrations(migrationId);
  }

  @EventPattern('db_rollback_migrations')
  async rollbackMigrations(migrationId) {
    return this.migrationService.rollbackMigrations(migrationId);
  }
}
