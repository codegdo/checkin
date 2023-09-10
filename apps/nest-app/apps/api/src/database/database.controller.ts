import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) { }

  @Get('seed-schemas')
  async seedSchemas() {
    return this.databaseService.seedSchemas();
  }

  @Get('drop-schemas')
  async dropSchemas() {
    return this.databaseService.dropSchemas();
  }

  @Get('seed-migrations')
  async seedMigrations() {
    return this.databaseService.seedMigrations();
  }

  @Get('drop-migrations')
  async dropMigrations() {
    return this.databaseService.dropMigrations();
  }

  @Get('migrations')
  async getAllMigrations() {
    return 'SQL executed successfully';
  }

  @Get('migration:id')
  async getMigrationById() {
    return 'SQL executed successfully';
  }

  @Get('run-migrations')
  async runMigrations() {
    return this.databaseService.runMigrations();
  }

  @Get('rollback-migrations')
  async rollbackMigrations() {
    return this.databaseService.rollbackMigrations();
  }
}
