import { Controller, Get } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { Auth } from 'src/decorators';
import { AuthType } from 'src/constants';

@Auth(AuthType.None)
@Controller()
export class MigrationController {
  constructor(
    private readonly migrationService: MigrationService
  ) { }

  @Get()
  migrationUp() {
    //return { ok: true }
    console.log('MIGRATION UP');
    return this.migrationService.migrationUp();
  }
}
