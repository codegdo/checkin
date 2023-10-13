import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    RouterModule.register([
      {
        path: 'setup',
        module: SetupModule,
        children: [
          {
            path: 'databases',
            module: DatabaseModule,
          },
        ],
      },
    ]),
  ]
})
export class SetupModule { }
