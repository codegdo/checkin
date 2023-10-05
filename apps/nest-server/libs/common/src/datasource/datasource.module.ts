import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config/config.module';
import { DataSource } from 'typeorm';
import * as appEntities from '../models/db_app';

import { LoggerModule } from '../logger/logger.module';
//import { CustomTypeOrmLogger } from '../logger/custom-typeorm.logger';

@Module({})
export class DataSourceModule {
  static register(serviceName?: string): DynamicModule {
    return {
      module: DataSourceModule,
      imports: [
        ConfigModule,
        LoggerModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule, LoggerModule],
          inject: [ConfigService],
          //inject: [ConfigService, CustomTypeOrmLogger],
          useFactory: (
            configService: ConfigService,
            //customTypeOrmLogger: CustomTypeOrmLogger,
          ) => {
            let username = null;
            let password = null;

            switch (serviceName) {
              case 'manager':
                username = configService.get('POSTGRES_MANAGER_USERNAME');
                password = configService.get('POSTGRES_MANAGER_PASSWORD');
                break;
              case 'worker':
                username = configService.get('POSTGRES_WORKER_USERNAME');
                password = configService.get('POSTGRES_WORKER_PASSWORD');
                break;
              default:
                username = configService.get('POSTGRES_APP_USERNAME');
                password = configService.get('POSTGRES_APP_PASSWORD');
            }

            const databaseConfig: TypeOrmModuleOptions = {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              username,
              password,
              port: configService.get('POSTGRES_PORT'),
              database: configService.get('POSTGRES_DB_APP'),
              name: 'default',
              entities: [...Object.values(appEntities)],
              autoLoadEntities: true,
              synchronize: false,
              //logger: customTypeOrmLogger,
              logging: true,
              //max: 10,
              //min: 2,
            };

            console.log(serviceName);

            return databaseConfig;
          },
          dataSourceFactory: async (options) =>
            new DataSource(options).initialize(),
        }),
      ],
    };
  }
}
