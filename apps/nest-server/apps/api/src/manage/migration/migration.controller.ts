import { Controller, Get, Param } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get(':id')
  async getMigrationById(@Param('id') id: number) {
    await this.migrationService.getMigrationById(id);
    return 'getMigrationById';
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
