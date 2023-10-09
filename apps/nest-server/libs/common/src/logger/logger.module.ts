import { Global, Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';

import { TypeOrmLogger } from './typeorm.logger';
import { ClientService } from '../client/client.service';
import { ClientModule } from '../client/client.module';

import { WinstonLogger } from './winston.logger';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import { PrefixModule } from '../prefix/prefix.module';
import { PrefixService } from '../prefix/prefix.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ClientModule, ConfigModule, PrefixModule],
      useFactory: async (
        configService: ConfigService,
        clientService: ClientService,
        prefixService: PrefixService,
      ): Promise<WinstonModuleOptions> => {
        console.log('AAAAAA', prefixService.getGlobalPrefix());
        return new WinstonLogger(configService, clientService);
      },
      inject: [ConfigService, ClientService, PrefixService],
    }),
  ],
  providers: [TypeOrmLogger],
  exports: [TypeOrmLogger, WinstonModule],
})
export class LoggerModule { }
