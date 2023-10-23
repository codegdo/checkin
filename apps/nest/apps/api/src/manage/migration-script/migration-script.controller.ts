import { Controller, Get } from '@nestjs/common';

@Controller()
export class MigrationScriptController {
  @Get()
  async getAllMigrationScripts() {
    return 'getAllMigrationScripts';
  }
}
