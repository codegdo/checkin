import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { SENDER_SERVICE, WORKER_SERVICE } from 'src/constants';
import { ConfigService } from '@nestjs/config';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SENDER_SERVICE,
        useFactory: (configSerivce: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configSerivce.get('SENDER_HOST'),
            port: configSerivce.get('SENDER_PORT')
          }
        }),
        inject: [ConfigService]
      },
      {
        name: WORKER_SERVICE,
        useFactory: (configSerivce: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configSerivce.get('WORKER_HOST'),
            port: configSerivce.get('WORKER_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [MigrationController],
  providers: [MigrationService]
})
export class MigrationModule { }
