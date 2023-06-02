import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';

import { WORKER_SERVICE } from 'src/constants';

@Injectable()
export class MigrationService {
  constructor(
    @Inject(WORKER_SERVICE)
    private readonly migrationService: ClientProxy,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache

  ) { }

  async migrationUp() {
    // obserable
    await this.migrationService.send('migration_up', { type: 'migration' }).subscribe(async (response) => {

      await this.cacheManager.set('cached_item', response);
      const cachedItem = await this.cacheManager.get('cached_item');
      console.log(cachedItem);

      const all = await this.cacheManager.store.keys('sess*');

      console.log('ALL', all);

      return response;
    });
  }

  async migrationDown() {
    // obserable
    await this.migrationService.send('migration_up', { type: 'migration' }).subscribe(async (response) => {

      await this.cacheManager.del('cached_item');
      const cachedItem = await this.cacheManager.get('cached_item');
      console.log(cachedItem);

      return response;
    });
  }
}
