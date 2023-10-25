import { Controller, Get, Param, Post } from '@nestjs/common';

import { RoleType, Roles, MigrationPermission, Permissions } from '@app/common';
import { MigrationService } from './migration.service';

@Roles(RoleType.SYSTEM)
@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get()
  @Permissions(MigrationPermission.GET_ALL_MIGRATIONS)
  async getAllMigrations() {
    return this.migrationService.getAllMigrations();
  }

  @Get(':id')
  @Permissions(MigrationPermission.GET_MIGRATION_BY_ID)
  async getMigrationById(@Param('id') id: number) {
    return this.migrationService.getMigrationById(id);
  }

  @Post()
  @Permissions(MigrationPermission.CREATE_NEW_MIGRATION)
  async createNewMigration() {
    return this.migrationService.createNewMigration();
  }

  @Get(':id/scripts')
  @Permissions(MigrationPermission.GET_SCRIPTS_FOR_MIGRATION)
  async getScriptsForMigration(@Param('id') id: number) {
    return this.migrationService.getScriptsForMigration(id);
  }

  @Post(':id/assign-scripts')
  @Permissions(MigrationPermission.ASSIGN_SCRIPTS_FOR_MIGRATION)
  async assignScriptsToMigration() {
    return 'assignScriptsToMigration';
  }

  @Get('run/:id')
  @Permissions(MigrationPermission.MIGRATION_RUN_BY_ID)
  async migrationRunById(@Param('id') id: number) {
    return 'migrationRunById';
  }

  @Get('rollbacks/:id')
  @Permissions(MigrationPermission.MIGRATION_ROLLBACK_BY_ID)
  async migrationRollbackById(@Param('id') id: number) {
    return 'migrationRollbackById';
  }
}
