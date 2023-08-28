import { Controller, Get } from '@nestjs/common';
import { MigrationService } from './migration.service';

import * as path from 'path';

@Controller()
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get('up')
  async executeSqlFile() {
    const filePath = path.join(
      __dirname,
      '../../../',
      'dbs/public/triggers',
      'fn.updated_at.sql',
    );

    console.log(path.join(__dirname));

    //await this.migrationService.executeSqlFile(filePath);
    return 'SQL executed successfully';
  }
}
