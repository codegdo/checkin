import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { MigrationRepository } from '@app/common';
import { MigrationScriptModule } from './migration-script/migration-script.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([MigrationRepository]),
    MigrationScriptModule,
    // RouterModule.register([
    //   {
    //     path: 'scripts',
    //     module: MigrationScriptModule,
    //     children: [
    //       {
    //         path: 'scripts',
    //         module: MigrationScriptModule,
    //       },
    //     ],
    //   },
    // ])
  ],
  controllers: [MigrationController],
  providers: [MigrationService, MigrationRepository],
})
export class MigrationModule { }
