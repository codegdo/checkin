import {
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, map } from 'rxjs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { MANAGER_CLIENT, MigrationRepository } from '@app/common';

@Injectable()
export class MigrationService {
  constructor(
    @InjectRepository(MigrationRepository)
    private readonly migrationRepository: MigrationRepository,

    @Inject(MANAGER_CLIENT)
    private readonly managerClient: ClientProxy,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async getAllMigrations() {
    try {
      const [result] = await this.migrationRepository.manager.query(
        `CALL pr_migration_get_all_migrations($1)`,
        [null],
      );
      return result;
    } catch (error) {
      this.logger.error('ERROR', error, MigrationService.name);
      throw new UnauthorizedException();
    }
  }

  async createNewMigration() {
    try {
      const [result] = await this.migrationRepository.manager.query(
        `CALL pr_migration_get_all_migrations($1)`,
        [null],
      );
      return result;
    } catch (error) {
      this.logger.error('ERROR', error, MigrationService.name);
      throw new UnauthorizedException();
    }
  }

  async getMigrationById(id: number) {
    try {
      const [result] = await this.migrationRepository.manager.query(
        `CALL migration_pr_get_scripts_by_id($1, $2)`,
        [id, null],
      );
      return result;
    } catch (error) {
      this.logger.error('ERROR', error, MigrationService.name);
      throw new UnauthorizedException();
    }
  }

  async getScriptsForMigration(id: number) {
    try {
      const [result] = await this.migrationRepository.manager.query(
        `CALL migration_pr_get_scripts_for_migration($1, $2)`,
        [id, null],
      );
      return result;
    } catch (error) {
      this.logger.error('ERROR', error, MigrationService.name);
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
      return this.managerClient
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
      return this.managerClient
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
