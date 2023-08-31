import { Controller, Get } from '@nestjs/common';

@Controller('database')
export class DatabaseController {
  @Get('migrations')
  async getAllMigrations() {
    return 'SQL executed successfully';
  }

  @Get('migration:id')
  async getMigrationById() {
    return 'SQL executed successfully';
  }

  @Get('seeding')
  async runSeeding() {
    return 'run Seeding successfully';
  }
}
