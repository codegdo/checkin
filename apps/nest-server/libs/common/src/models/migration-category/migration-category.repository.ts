import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MigrationCategory } from './migration-category.entity';

@Injectable()
export class MigrationCategoryRepository extends Repository<MigrationCategory> {
  constructor(private dataSource: DataSource) {
    super(MigrationCategory, dataSource.createEntityManager());
  }
}
