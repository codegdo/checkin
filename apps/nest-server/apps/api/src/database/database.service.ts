import { ConfigService, MANAGER_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(MANAGER_SERVICE)
    private readonly migrationService: ClientProxy,
  ) { }

  async seedSchemas(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_seed_schemas', { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async dropSchemas(): Promise<Observable<{ message: string }>> {
    const isDropActionEnabled =
      this.configService.get<string>('DB_DROP_ACTION_IS_ENABLED') === 'true';

    if (!isDropActionEnabled) {
      return new Observable((observer) => {
        observer.next({ message: 'Not Allowed' });
        observer.complete();
      });
    }

    try {
      return this.migrationService
        .send('db_drop_schemas', { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async seedInitialSetup(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_seed_initial_setup', { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async dropInitialSetup(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_drop_initial_setup', { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.log(error);
      throw error;
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
