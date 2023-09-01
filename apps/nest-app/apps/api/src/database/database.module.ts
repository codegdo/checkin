import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService, MANAGER_SERVICE } from '@app/common';

import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MANAGER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configSerivce: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configSerivce.get<string>('MANAGER_HOST'),
            port: configSerivce.get<number>('MANAGER_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule { }
