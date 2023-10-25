import { Global, Module } from '@nestjs/common';
import {
  ClientsModule as NestClientModule,
  Transport,
} from '@nestjs/microservices';

import { MANAGER_CLIENT, WORKER_CLIENT } from '../../constants';
import { ConfigModule } from '../config/config.module';
import { ClientService } from './client.service';
import { WinstonTransport } from '../logger/winston-transport';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestClientModule.registerAsync([
      {
        name: WORKER_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('WORKER_HOST'),
            port: configService.get<number>('WORKER_PORT'),
          },
        }),
      },
      {
        name: MANAGER_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('MANAGER_HOST'),
            port: configService.get<number>('MANAGER_PORT'),
          },
        }),
      },
    ]),
  ],
  providers: [ClientService, WinstonTransport],
  exports: [NestClientModule, ClientService, WinstonTransport],
})
export class ClientModule { }
