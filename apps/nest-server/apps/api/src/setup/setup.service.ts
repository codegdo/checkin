import { ConfigService, MANAGER_SERVICE, MANAGER_SERVICE_DROP_INITIAL_SETUP, MANAGER_SERVICE_DROP_SCHEMAS, MANAGER_SERVICE_SEED_GLOBAL_FUNTIONS, MANAGER_SERVICE_SEED_INITIAL_SETUP, MANAGER_SERVICE_SEED_SCHEMAS } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

@Injectable()
export class SetupService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(MANAGER_SERVICE)
    private readonly migrationService: ClientProxy,
  ) { }

  async seedGlobalFunctions(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send(MANAGER_SERVICE_SEED_GLOBAL_FUNTIONS, { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async seedSchemas(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send(MANAGER_SERVICE_SEED_SCHEMAS, { userId: 'sysadmin' })
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
        .send(MANAGER_SERVICE_DROP_SCHEMAS, { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async seedInitialSetup(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send(MANAGER_SERVICE_SEED_INITIAL_SETUP, { userId: 'sysadmin' })
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async dropInitialSetup(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send(MANAGER_SERVICE_DROP_INITIAL_SETUP, { userId: 'sysadmin' })
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
