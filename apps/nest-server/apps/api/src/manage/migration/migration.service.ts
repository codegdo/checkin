import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, map } from 'rxjs';

import { ConfigService, MANAGER_SERVICE } from '@app/common';
import { MigrationRepository } from '@app/common/models/migration/migration.repository';

@Injectable()
export class MigrationService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(MigrationRepository)
    private readonly migrationRepository: MigrationRepository,

    @Inject(MANAGER_SERVICE)
    private readonly migrationService: ClientProxy,
  ) { }

  async getMigrationById(id: number) {
    try {
      const [result] = await this.migrationRepository.manager.query(
        `CALL pr_migration_get_scripts_by_id($1, $2)`,
        [id, null],
      );
      return result;
    } catch (error) {
      console.error('ERRRRRR', error);
      throw new UnauthorizedException();
    }
  }

  async getScriptsByMigrationId(id: number): Promise<void> {
    try {
      const [result] = await this.migrationRepository.manager.query(
        `CALL pr_migration_get_scripts_by_id($1, $2)`,
        [id, null],
      );
      console.log(result);
    } catch (error) {
      console.error('ERRRRRR', error);
      throw new UnauthorizedException();
    }
  }

  async runMigrationById(id: number): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_run_migration_by_id', {
          data: { migrationId: id },
          userId: 'sysadmin',
        })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async rollbackMigrationById(
    id: number,
  ): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_rollback_migration_by_id', {
          data: { migrationId: id },
          userId: 'sysadmin',
        })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
