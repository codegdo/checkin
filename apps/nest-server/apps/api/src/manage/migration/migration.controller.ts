import { Controller, Get } from '@nestjs/common';

@Controller()
export class MigrationController {
  @Get('runs/:id')
  async runMigrationById() {
    return 'runMigrationById';
  }

  @Get('rollbacks/:id')
  async rollbackMigrationById() {
    return 'rollbackMigrationById';
  }
}
