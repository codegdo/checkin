import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [MigrationController],
  providers: [MigrationService],
})
export class MigrationModule { }
