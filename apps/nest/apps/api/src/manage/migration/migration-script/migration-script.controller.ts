import { Controller, Get } from '@nestjs/common';

@Controller()
export class MigrationScriptController {
  @Get('migration-scripts')
  async getAllMigrationScripts() {
    return 'getAllMigrationScripts';
  }
}
