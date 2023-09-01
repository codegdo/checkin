import { MANAGER_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(MANAGER_SERVICE)
    private readonly migrationService: ClientProxy,
  ) { }

  async runSeeding(): Promise<void> {
    // obserable
    await this.migrationService
      .send('db_seeding', null)
      .subscribe(async (response) => {
        return response;
      });
  }
}
