import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [
    MigrationModule,
    RouterModule.register([
      {
        path: 'console',
        module: ConsoleModule,
        children: [
          {
            path: 'migrations',
            module: MigrationModule,
          },
        ],
      },
    ])
  ]
})
export class ConsoleModule { }
