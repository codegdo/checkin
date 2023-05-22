import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { Auth } from 'src/decorators';
import { AuthType } from 'src/constants';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Auth(AuthType.None)
@UseInterceptors(CacheInterceptor)
@Controller()
export class MigrationController {
  constructor(
    private readonly migrationService: MigrationService
  ) { }

  @Get()
  async migrationUp() {
    //return { ok: true }
    console.log('MIGRATION UP');
    const value = this.migrationService.migrationUp();

    if (value !== undefined) {
      // Cache the value only if it's not undefined
      return value;
    } else {
      // Handle the case when the value is undefined
      return 'Default Value';
    }
  }
}
