import { Controller, Get } from '@nestjs/common';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @Get('database/seed-initial-functions')
  async seedInitialFunctions() {
    return this.setupService.seedInitialFunctions();
  }

  @Get('database/drop-initial-functions')
  async dropInitialFunctions() {
    return this.setupService.dropInitialFunctions();
  }

  @Get('database/seed-initial-schemas')
  async seedInitialSchemas() {
    return this.setupService.seedInitialSchemas();
  }

  @Get('database/drop-initial-schemas')
  async dropInitialSchemas() {
    return this.setupService.dropInitialSchemas();
  }

  @Get('database/seed-initial-setup')
  async seedInitialSetup() {
    return this.setupService.seedInitialSetup();
  }

  @Get('database/drop-initial-setup')
  async dropInitialSetup() {
    return this.setupService.dropInitialSetup();
  }

  /*  @Get('migrations')
   async getAllMigrations() {
     return 'SQL executed successfully';
   }
 
   @Get('migrations/:id')
   async getMigrationById() {
     return 'SQL executed successfully';
   }
 
   @Get('run-migration/:id')
   async runMigrationById(@Param('id') id: number) {
     return this.setupService.runMigrationById(id);
   }
 
   @Get('rollback-migration/:id')
   async rollbackMigrationById(@Param('id') id: number) {
     return this.setupService.rollbackMigrationById(id);
   } */
}
