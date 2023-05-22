import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { Auth } from 'src/decorators';
import { AuthType } from 'src/constants';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Auth(AuthType.None)
@Controller()
export class MigrationController {
  constructor(
    private readonly migrationService: MigrationService
  ) { }

  @Get('up')
  async migrationUp() {
    return this.migrationService.migrationUp();
  }

  @Get('down')
  async migrationDown() {
    return this.migrationService.migrationDown();
  }
}
