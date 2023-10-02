import { Inject, Injectable } from '@nestjs/common';
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

  async getMigrationById(id: number): Promise<void> {
   
   //const test = await this.migrationRepository.findOne({where: {id}});

  /*  const [result] = await this.migrationRepository.manager.query(
    `CALL pr_migration_get_scripts_by_id($1, $2)`,
    [id, null],
  ); */

  //const [found]= await this.migrationRepository.manager.query(`CALL pr_get_migration_data(null);`); 
  const [found]= await this.migrationRepository.manager.query(`SELECT * FROM get_my_table_data();`); 
  //const [found]= await this.migrationRepository.manager.query(`SELECT * FROM migration;`);

   console.log(found);
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
