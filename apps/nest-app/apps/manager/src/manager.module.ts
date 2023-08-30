import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@app/common';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MigrationModule],
  controllers: [],
  providers: [],
})
export class ManagerModule { }
