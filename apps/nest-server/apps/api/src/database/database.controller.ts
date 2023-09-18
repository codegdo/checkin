import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';

export class RunMigrationDto {
  readonly id: number;
}

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

  @Get('seed-initial-setup')
  async seedMigrations() {
    return this.databaseService.seedInitialSetup();
  }

  @Get('drop-initial-setup')
  async dropMigrations() {
    return this.databaseService.dropInitialSetup();
  }

  @Get('migrations')
  async getAllMigrations() {
    return 'SQL executed successfully';
  }

  @Get('migrations/:id')
  async getMigrationById() {
    return 'SQL executed successfully';
  }

  @Get('run-migration/:id')
  async runMigrationById(@Param('id') id: number) {
    return this.databaseService.runMigrationById(id);
  }

  @Get('rollback-migration/:id')
  async rollbackMigrationById(@Param('id') id: number) {
    return this.databaseService.rollbackMigrationById(id);
  }
}
