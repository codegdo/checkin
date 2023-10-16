import { Controller, Get, Param, Post } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get()
  async getAllMigrations() {
    return this.migrationService.getAllMigrations();
  }

  @Get(':id')
  async getMigrationById(@Param('id') id: number) {
    return this.migrationService.getMigrationById(id);
  }

  @Post()
  async createNewMigration() {
    return this.migrationService.createNewMigration();
  }

  @Get(':id/scripts')
  async getScriptsForMigration(@Param('id') id: number) {
    return this.migrationService.getScriptsForMigration(id);
  }

  @Post(':id/assign-scripts')
  async assignScriptsToMigration() {
    return 'assignScriptsToMigration';
  }

  @Get('run/:id')
  async migrationRunById(@Param('id') id: number) {
    return 'migrationRunById';
  }

  @Get('rollbacks/:id')
  async migrationRollbackById(@Param('id') id: number) {
    return 'migrationRollbackById';
  }
}
