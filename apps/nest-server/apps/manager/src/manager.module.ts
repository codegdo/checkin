import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataSourceModule, LoggerModule } from '@app/common';
import { MigrationModule } from './migration/migration.module';
import { SetupModule } from './setup/setup.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    // GLOBAL
    ConfigModule.forRoot(),
    DataSourceModule.register('manager'),
    // Events
    MigrationModule,
    SetupModule,
    // Utils
    UtilModule,
    // Shared
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class ManagerModule { }
