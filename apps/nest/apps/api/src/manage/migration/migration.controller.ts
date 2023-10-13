import { Controller, Get, Param, Post } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get()
  async getAllMigrations() {
    return this.migrationService.getAllMigrations();
  }

  @Post()
  async createNewMigration() {
    return this.migrationService.createNewMigration();
  }

  @Get(':id/scripts')
  async getMigrationScriptsByMigrationId(@Param('id') id: number) {
    return this.migrationService.getMigrationScriptsByMigrationId(id);
  }

  @Get('runs/:id')
  async runMigrationById(@Param('id') id: number) {
    return 'runMigrationById';
  }

  @Get('rollbacks/:id')
  async rollbackMigrationById(@Param('id') id: number) {
    return 'rollbackMigrationById';
  }
}
