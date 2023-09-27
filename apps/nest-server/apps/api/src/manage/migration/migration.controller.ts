import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class MigrationController {
  @Get('runs/:id')
  async runMigrationById(@Param('id') id: number) {
    return 'runMigrationById';
  }

  @Get('rollbacks/:id')
  async rollbackMigrationById(@Param('id') id: number) {
    return 'rollbackMigrationById';
  }
}
