import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { UtilService } from '../util/util.service';

interface MigrationOperationPayload {
  data: {
    migrationId: number;
  };
  operation: string;
  userId: string;
}

enum MigrationOperation {
  RUN = 'run',
  ROLLBACK = 'rollback',
}

interface MigrationStatusPayload {
  status: string;
  migrationId: number;
}

interface MigrationCompletePayload {
  migrationId: number;
  startedAt: Date;
  completedAt: Date;
  duration: number;
}

@Injectable()
export class MigrationService {
  constructor(
    private dataSource: DataSource,
    private utilService: UtilService,
  ) { }

  async performMigrationOperation({
    data,
    userId,
  }: MigrationOperationPayload): Promise<{ message: string }> {
    const { migrationId, operation } = data;

    switch (operation) {
      case MigrationOperation.RUN:
        return this.runMigrationById(data);
      case MigrationOperation.ROLLBACK:
        return this.rollbackMigrationById(data);
      default:
        return { message: 'Not found perform migration operation.' };
    }
  }

  async runMigrationById({
    data,
    userId,
  }: MigrationOperationPayload): Promise<{ message: string }> {
    const { migrationId } = data;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Call the stored procedure to retrieve migration scripts
      const [storedProcResult] = await queryRunner.manager.query(
        `CALL main_sys.pr_migration_get_scripts($1, $2)`,
        [migrationId, null],
      );

      // Extract the migration scripts from the stored procedure result
      const { migrationScripts } = storedProcResult?.result;

      if (migrationScripts) {
        const migrationStatusPayload: MigrationStatusPayload = {
          migrationId,
          status: 'InProgress',
        };

        // Update status
        await this.executeMigrationStatus(
          queryRunner,
          migrationStatusPayload,
          userId,
        );

        // Calculate startedAt
        const startedAt = new Date();

        // Run migration
        await this.utilService.executeScript(queryRunner, migrationScripts);

        // Calculate completedAt
        const completedAt = new Date();

        // Calculate duration in milliseconds
        const duration = completedAt.getTime() - startedAt.getTime();

        const migrationCompletePayload: MigrationCompletePayload = {
          migrationId,
          startedAt,
          completedAt,
          duration,
        };

        // Update migration table with the new values
        await this.executeMigrationComplete(
          queryRunner,
          migrationCompletePayload,
          userId,
        );

        return { message: 'Run migration successfully.' };
      } else {
        // Handle the case where no result is returned
        console.log('No migration scripts found.');
        return { message: 'No migration scripts found.' };
      }
    } catch (error) {
      console.error('Error getting migration:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async rollbackMigrationById({
    data,
    userId,
  }): Promise<{ message: string }> {
    const { migrationId } = data;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Implement your logic here
      console.log('rollbackMigrationById:', migrationId);
      return { message: 'Rollback migration successfully.' };
    } catch (error) {
      console.error('Error getting migration:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async executeMigrationStatus(
    queryRunner: QueryRunner,
    payload: MigrationStatusPayload,
    updatedBy: string,
  ): Promise<void> {
    await queryRunner.manager.query(
      `CALL main_sys.pr_migration_update_status($1, $2)`,
      [payload, updatedBy],
    );
  }

  private async executeMigrationComplete(
    queryRunner: QueryRunner,
    payload: MigrationCompletePayload,
    updatedBy: string,
  ): Promise<void> {
    await queryRunner.manager.query(
      `CALL main_sys.pr_migration_update_complete($1, $2)`,
      [payload, updatedBy],
    );
  }
}
