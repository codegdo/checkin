import { Module } from '@nestjs/common';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [MigrationModule]
})
export class ConsoleModule {}
