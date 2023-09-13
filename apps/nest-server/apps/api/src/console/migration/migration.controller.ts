import { Controller, Get, Post } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get('db-initial-setup')
  async dbInitialSetup() {
    const files = [
      {
        database: 'db_checkin',
        schema: 'public',
        type: 'funtions',
        name: 'fn_camel_case_split',
        execSequence: 1,
        path: 'database/public/functions/fn_camel_case_split.sql',
      },
      {
        database: 'db_checkin',
        schema: 'public',
        type: 'triggers',
        name: 'fn_updated_at',
        execSequence: 2,
        fileType: 'sql',
        path: 'database/public/triggers/fn_updated_at.sql',
      },
    ];

    await this.migrationService.executeSqlFiles(files);

    return 'SQL executed successfully';
  }
}
