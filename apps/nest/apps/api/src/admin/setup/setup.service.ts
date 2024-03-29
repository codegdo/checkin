import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import {
  MANAGER_CLIENT,
  MANAGER_SERVICE_DATABASE_OPERATION,
} from '@app/common';

@Injectable()
export class SetupService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(MANAGER_CLIENT)
    private readonly managerClient: ClientProxy,
  ) { }

  async performDatabaseOperation(
    databaseName: string,
    operation: string,
  ): Promise<Observable<{ message: string }>> {
    const isDropActionEnabled =
      this.configService.get<string>('DATABASE_OPERATION_IS_ENABLED') ===
      'true';

    if (!isDropActionEnabled) {
      return new Observable((observer) => {
        observer.next({ message: 'Not Allowed' });
        observer.complete();
      });
    }

    return this.managerClient
      .send(MANAGER_SERVICE_DATABASE_OPERATION, {
        data: {
          databaseName,
          operation,
        },
        userId: 'sysadmin',
      })
      .pipe(
        map((response: { message: string }) => response),
        catchError((error) => {
          console.error('An error occurred:', error);
          return throwError(
            () => new Error('An error occurred. Please try again later.'),
          );
        }),
      );
  }
}
