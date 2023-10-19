import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MigrationRepository } from '@app/common';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

import { MigrationScriptController } from './migration-script/migration-script.controller';
import { MigrationCategoryController } from './migration-category/migration-category.controller';
import { MigrationCategoryService } from './migration-category/migration-category.service';
import { MigrationScriptService } from './migration-script/migration-script.service';

@Module({
  imports: [TypeOrmModule.forFeature([MigrationRepository])],
  controllers: [
    // The order in which controllers are listed here can be important.
    MigrationCategoryController,
    MigrationScriptController,
    MigrationController,
  ],
  providers: [
    MigrationCategoryService,
    MigrationScriptService,
    MigrationService,
    MigrationRepository,
  ],
})
export class MigrationModule { }
