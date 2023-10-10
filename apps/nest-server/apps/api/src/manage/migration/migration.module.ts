import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { MigrationRepository } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([MigrationRepository])],
  controllers: [MigrationController],
  providers: [MigrationService, MigrationRepository],
})
export class MigrationModule { }
