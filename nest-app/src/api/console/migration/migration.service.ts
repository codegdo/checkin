import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { WORKER_SERVICE } from 'src/constants';

@Injectable()
export class MigrationService {
  constructor(
    @Inject(WORKER_SERVICE)
    private readonly migrationService: ClientProxy
  ) { }

  async migrationUp() {
    // obserable
    await this.migrationService.send('migration_up', { type: 'migration' }).subscribe(async (response) => {
      console.log(response);
      return response;
    });
  }
}
