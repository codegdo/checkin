import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationCategoryController } from './migration-category.controller';
import { MigrationCategoryService } from './migration-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [MigrationCategoryController],
  providers: [MigrationCategoryService],
})
export class MigrationCategoryModule { }
