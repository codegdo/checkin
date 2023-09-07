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
    console.log(this.configService.get<boolean>('DB_DROP_ACTION_IS_ENABLED'));
    try {
      return this.migrationService
        .send('db_seed_schemas', {})
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
        .send('db_drop_schemas', {})
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async seedMigrations(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_seed_migrations', {})
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async dropMigrations(): Promise<Observable<{ message: string }>> {
    try {
      return this.migrationService
        .send('db_drop_migrations', {})
        .pipe(map((response: { message: string }) => response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
