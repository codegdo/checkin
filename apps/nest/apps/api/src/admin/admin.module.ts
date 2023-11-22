import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MigrationModule } from './migration/migration.module';
import { SetupModule } from './setup/setup.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    MigrationModule,
    SetupModule,
    ClientModule,
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
          },
          {
            path: 'clients',
            module: ClientModule,
          },
        ],
      },
    ]),
  ],
})
export class AdminModule { }
