import { Module } from '@nestjs/common';
import { MigrationScriptController } from './migration-script.controller';
import { MigrationScriptService } from './migration-script.service';

@Module({
  controllers: [MigrationScriptController],
  providers: [MigrationScriptService]
})
export class MigrationScriptModule {}
