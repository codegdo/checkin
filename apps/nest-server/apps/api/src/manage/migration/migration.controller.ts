import { Controller, Get } from '@nestjs/common';

@Controller()
export class MigrationController {
  @Get('migrations')
  async getAllMigrations() {
    return 'SQL executed successfully';
  }
}
