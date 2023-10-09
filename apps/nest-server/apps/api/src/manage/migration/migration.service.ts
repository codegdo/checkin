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

import { MANAGER_CLIENT } from '@app/common';
import { MigrationRepository } from '@app/common/models/migration/migration.repository';

@Injectable()
export class MigrationService {
  constructor(
    //private readonly configService: ConfigService,

    @InjectRepository(MigrationRepository)
    private readonly migrationRepository: MigrationRepository,

    //@Inject(MANAGER_SERVICE)
    //private readonly clientService: ClientProxy,
    //@Inject(WORKER_SERVICE) private readonly workerClient: ClientProxy,

    @Inject(MANAGER_CLIENT)
    private readonly managerClient: ClientProxy,

    //private readonly loggerService: LoggerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async getMigrationById(id: number) {
    try {
      this.logger.log('Calling getHello()', MigrationService.name);
      this.logger.debug('Calling getHello()', MigrationService.name);
      this.logger.verbose('Calling getHello()', MigrationService.name);
      this.logger.warn('Calling getHello()', MigrationService.name);

      const [result] = await this.migrationRepository.manager.query(
        `CALL pr_migration_get_scripts_by_ids($1, $2)`,
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
