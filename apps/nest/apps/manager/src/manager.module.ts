import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataSourceModule, InstanceNameEnum, LoggerModule } from '@app/common';
import { MigrationModule } from './migration/migration.module';
import { SetupModule } from './setup/setup.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    // Shared
    ConfigModule.forRoot(),
    DataSourceModule.register(InstanceNameEnum.Manager),
    LoggerModule.register(InstanceNameEnum.Manager),
    // Events
    MigrationModule,
    SetupModule,

    UtilModule,
  ],
  controllers: [],
  providers: [],
})
export class ManagerModule { }
