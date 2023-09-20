import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService, MANAGER_SERVICE } from '@app/common';

import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule,
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
    DatabaseModule,
  ],
  controllers: [SetupController],
  providers: [SetupService],
})
export class SetupModule { }
