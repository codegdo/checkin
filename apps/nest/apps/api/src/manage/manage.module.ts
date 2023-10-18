import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MigrationModule } from './migration/migration.module';
import { MigrationScriptModule } from './migration/migration-script/migration-script.module';

@Module({
  imports: [
    MigrationModule,
    MigrationScriptModule,
    RouterModule.register([
      {
        path: 'manage',
        module: ManageModule,
        children: [
          {
            path: 'migrations/scripts',
            module: MigrationScriptModule,
          },
          {
            path: 'migrations',
            module: MigrationModule,
          },
        ],
      },
    ])
  ]
})
export class ManageModule { }
