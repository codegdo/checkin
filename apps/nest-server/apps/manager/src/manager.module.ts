import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataSourceModule } from '@app/common';
import { MigrationModule } from './migration/migration.module';
import { SetupModule } from './setup/setup.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DataSourceModule.register('manager'),
    MigrationModule,
    SetupModule,
    UtilModule,
  ],
  controllers: [],
  providers: [],
})
export class ManagerModule { }
