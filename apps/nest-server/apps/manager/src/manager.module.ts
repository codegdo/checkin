import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@app/common';
import { MigrationModule } from './migration/migration.module';
import { SetupModule } from './setup/setup.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.register('manager'),
    MigrationModule,
    SetupModule,
  ],
  controllers: [],
  providers: [],
})
export class ManagerModule { }
