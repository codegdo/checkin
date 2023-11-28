import { Controller, Get, Param, Post } from '@nestjs/common';

import { RoleType, Roles, Permissions } from '../../common';
import { MigrationService } from './migration.service';
import { MigrationAction } from './migration.action';

@Roles(RoleType.SYSTEM)
@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get()
  @Permissions(MigrationAction.GET_ALL_MIGRATIONS)
  async getAllMigrations() {
    //return this.migrationService.getAllMigrations();
    const result = await this.migrationService.getAllMigrations();
    console.log(result);
    return result;
    // return new Promise((resolve, reject) => {
    //   setTimeout(async () => {
    //     try {
    //       resolve(result);
    //     } catch (error) {
    //       reject(error);
    //     }
    //   }, 10000);
    // });
  }

  @Get(':id')
  @Permissions(MigrationAction.GET_MIGRATION_BY_ID)
  async getMigrationById(@Param('id') id: number) {
    return this.migrationService.getMigrationById(id);
  }

  @Post()
  @Permissions(MigrationAction.CREATE_NEW_MIGRATION)
  async createNewMigration() {
    return this.migrationService.createNewMigration();
  }

  @Get(':id/scripts')
  @Permissions(MigrationAction.GET_SCRIPTS_FOR_MIGRATION)
  async getScriptsForMigration(@Param('id') id: number) {
    return this.migrationService.getScriptsForMigration(id);
  }

  @Post(':id/assign-scripts')
  @Permissions(MigrationAction.ASSIGN_SCRIPTS_FOR_MIGRATION)
  async assignScriptsToMigration() {
    return 'assignScriptsToMigration';
  }

  @Get('run/:id')
  @Permissions(MigrationAction.MIGRATION_RUN_BY_ID)
  async migrationRunById(@Param('id') id: number) {
    return 'migrationRunById';
  }

  @Get('rollbacks/:id')
  @Permissions(MigrationAction.MIGRATION_ROLLBACK_BY_ID)
  async migrationRollbackById(@Param('id') id: number) {
    return 'migrationRollbackById';
  }
}
