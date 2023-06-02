import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule as NestClientsModule, Transport } from '@nestjs/microservices';
import { SENDER_SERVICE, WORKER_SERVICE } from 'src/constants';

@Module({
  // imports: [
  //   NestClientsModule.registerAsync([
  //     {
  //       name: SENDER_SERVICE,
  //       useFactory: (configSerivce: ConfigService) => ({
  //         transport: Transport.TCP,
  //         options: {
  //           host: configSerivce.get('SENDER_HOST'),
  //           port: configSerivce.get('SENDER_PORT')
  //         }
  //       }),
  //       inject: [ConfigService]
  //     },
  //     {
  //       name: WORKER_SERVICE,
  //       useFactory: (configSerivce: ConfigService) => ({
  //         transport: Transport.TCP,
  //         options: {
  //           host: configSerivce.get('WORKER_HOST'),
  //           port: configSerivce.get('WORKER_PORT')
  //         }
  //       }),
  //       inject: [ConfigService]
  //     }
  //   ])
  // ],
})
export class ClientModule {
  static async forRootAsync(options: any): Promise<DynamicModule> {
    return {
      module: ClientModule,
      imports: [
        NestClientsModule.registerAsync([
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
      global: true,
    }
  }
}
