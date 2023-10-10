import { DynamicModule, Global, Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';

import { TypeOrmLogger } from './typeorm.logger';
import { ClientService } from '../client/client.service';
import { ClientModule } from '../client/client.module';

import { WinstonLogger } from './winston.logger';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({})
export class LoggerModule {
  static register(instanceName?: string): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        WinstonModule.forRootAsync({
          imports: [ClientModule, ConfigModule],
          useFactory: async (
            configService: ConfigService,
            clientService: ClientService,
          ): Promise<WinstonModuleOptions> => {
            return new WinstonLogger({
              instanceName,
              configService,
              clientService,
            });
          },
          inject: [ConfigService, ClientService],
        }),
      ],
      providers: [TypeOrmLogger],
      exports: [TypeOrmLogger, WinstonModule],
    }
  }
}
