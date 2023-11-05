import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MigrationModule } from './migration/migration.module';
import { MigrationCategoryModule } from './migration-category/migration-category.module';
import { MigrationScriptModule } from './migration-script/migration-script.module';

@Module({
  imports: [
    MigrationModule,
    MigrationCategoryModule,
    MigrationScriptModule,
    RouterModule.register([
      {
        path: 'database',
        module: DatabaseModule,
        children: [
          {
            path: 'migrations',
            module: MigrationModule,
          },
          {
            path: 'migration-categories',
            module: MigrationCategoryModule,
          },
          {
            path: 'migration-scripts',
            module: MigrationScriptModule,
          },
        ],
      },
    ]),
  ],
})
export class DatabaseModule { }
