import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationScriptController } from './migration-script.controller';
import { MigrationScriptService } from './migration-script.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [MigrationScriptController],
  providers: [MigrationScriptService],
})
export class MigrationScriptModule { }
