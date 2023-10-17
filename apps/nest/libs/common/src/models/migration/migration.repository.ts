import {
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { Migration } from './migration.entity';
import { GetMigrationDto } from './migration.dto';

@Injectable()
export class MigrationRepository extends Repository<Migration> {
  constructor(
    dataSource: DataSource,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    super(Migration, dataSource.createEntityManager());
  }

  async getAllMigrations(): Promise<GetMigrationDto[]> {
    try {
      const [rawData] = await this.manager.query(
        `CALL migration_pr_get_all_migrations($1)`,
        [null],
      );

      if (Array.isArray(rawData.result)) {
        // Transform the raw data into instances of GetMigrationDto
        const migrations = rawData.result.map((data: Migration) =>
          plainToInstance(GetMigrationDto, data),
        );

        //const errors = await Promise.all(migrations.map((m) => validate(m)));

        return migrations;
      } else {
        return []; // Return an empty array when there are no migrations.
      }
    } catch (error) {
      // Log the specific database-related error
      this.logger.error(
        `Database error while fetching migrations: ${error.message}`,
        error,
        MigrationRepository.name,
      );
      throw new InternalServerErrorException('Failed to retrieve migrations');
    }
  }

  async getMigrationById(id: number): Promise<GetMigrationDto[]> {
    try {
      const [rawData] = await this.manager.query(
        `CALL migration_pr_get_migration_by_id($1, $2)`,
        [id, null],
      );

      if (Array.isArray(rawData.result)) {
        // Transform the raw data into instances of GetMigrationDto
        const migrations = rawData.result.map((data: Migration) =>
          plainToInstance(GetMigrationDto, data),
        );

        //const errors = await Promise.all(migrations.map((m) => validate(m)));

        return migrations;
      } else {
        return []; // Return an empty array when there are no migrations.
      }
    } catch (error) {
      // Log the specific database-related error
      this.logger.error(
        `Database error while fetching migrations: ${error.message}`,
        error,
        MigrationRepository.name,
      );
      throw new InternalServerErrorException('Failed to retrieve migrations');
    }
  }
}
