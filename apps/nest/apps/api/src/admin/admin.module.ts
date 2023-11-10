import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MigrationModule } from './migration/migration.module';
import { SetupModule } from '../setup/setup.module';

@Module({
  imports: [
    MigrationModule,

    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'migrations',
            module: MigrationModule,
          },
          {
            path: 'setups',
            module: SetupModule,
          }
        ],
      },
    ]),
  ],
})
export class AdminModule { }
