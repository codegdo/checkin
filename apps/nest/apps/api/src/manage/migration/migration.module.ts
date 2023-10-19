import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { MigrationRepository } from '@app/common';
import { MigrationScriptController } from './migration-script/migration-script.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MigrationRepository]),
  ],
  controllers: [MigrationScriptController, MigrationController],
  providers: [MigrationService, MigrationRepository],
})
export class MigrationModule { }
