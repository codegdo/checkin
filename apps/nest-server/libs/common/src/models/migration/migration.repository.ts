import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Migration } from './migration.entity';

@Injectable()
export class MigrationRepository extends Repository<Migration> {
  constructor(private dataSource: DataSource) {
    super(Migration, dataSource.createEntityManager());
  }
}
