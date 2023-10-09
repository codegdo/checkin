import { Module } from '@nestjs/common';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationRepository } from '@app/common/models/migration/migration.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MigrationRepository]),
  ],
  controllers: [MigrationController],
  providers: [MigrationService, MigrationRepository],
})
export class MigrationModule { }
