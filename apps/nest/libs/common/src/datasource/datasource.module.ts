import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { ConfigModule } from '../config/config.module';
import * as appEntities from '../models/db_app';
import { TypeOrmLogger } from '../logger/typeorm.logger';
import { InstanceNameEnum } from '../enums';

@Module({})
export class DataSourceModule {
  static register(instanceName?: string): DynamicModule {
    return {
      module: DataSourceModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService, TypeOrmLogger],
          useFactory: (
            configService: ConfigService,
            typeOrmLogger: TypeOrmLogger,
          ) => {
            let username = null;
            let password = null;
            let database = null;

            switch (instanceName) {
              case InstanceNameEnum.Api:
                username = configService.get('POSTGRES_API_USERNAME');
                password = configService.get('POSTGRES_API_PASSWORD');
                database = configService.get('POSTGRES_DB_APP');
                break;
              case InstanceNameEnum.Manager:
                username = configService.get('POSTGRES_MANAGER_USERNAME');
                password = configService.get('POSTGRES_MANAGER_PASSWORD');
                database = configService.get('POSTGRES_DB_APP');
                break;
              case InstanceNameEnum.Worker:
                username = configService.get('POSTGRES_WORKER_USERNAME');
                password = configService.get('POSTGRES_WORKER_PASSWORD');
                database = configService.get('POSTGRES_DB_APP');
                break;
              default:
                username = configService.get('POSTGRES_USERNAME');
                password = configService.get('POSTGRES_PASSWORD');
                database = configService.get('POSTGRES_DB');
            }

            const databaseConfig: TypeOrmModuleOptions = {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: configService.get('POSTGRES_PORT'),
              username,
              password,
              database,
              synchronize: false,
              //logging: true,
              logger: typeOrmLogger,
              entities: [...Object.values(appEntities)],
            };
            return databaseConfig;
          },
          dataSourceFactory: async (options) =>
            new DataSource(options).initialize(),
        }),
      ],
      providers: [TypeOrmLogger]
    };
  }
}
