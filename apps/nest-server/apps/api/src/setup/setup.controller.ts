import { Controller, Get } from '@nestjs/common';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @Get('database/seed-schemas')
  async seedSchemas() {
    return this.setupService.seedSchemas();
  }

  @Get('database/drop-schemas')
  async dropSchemas() {
    return this.setupService.dropSchemas();
  }

  @Get('database/seed-initial-setup')
  async seedMigrations() {
    return this.setupService.seedInitialSetup();
  }

  @Get('database/drop-initial-setup')
  async dropMigrations() {
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
