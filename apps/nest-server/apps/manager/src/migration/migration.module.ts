import { Module } from '@nestjs/common';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [UtilModule],
  controllers: [MigrationController],
  providers: [MigrationService]
})
export class MigrationModule { }
