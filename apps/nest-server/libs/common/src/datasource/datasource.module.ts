import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config/config.module';
import { DataSource } from 'typeorm';

@Module({})
export class DataSourceModule {
  static register(serviceName?: string): DynamicModule {
    return {
      module: DataSourceModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            let username = null;
            let password = null;

            switch (serviceName) {
              case 'manager':
                username = configService.get('POSTGRES_USERNAME');
                password = configService.get('POSTGRES_PASSWORD');
                break;
              case 'worker':
                username = configService.get('POSTGRES_USERNAME');
                password = configService.get('POSTGRES_PASSWORD');
                break;
              default:
                username = configService.get('POSTGRES_USERNAME');
                password = configService.get('POSTGRES_PASSWORD');
            }

            const databaseConfig: TypeOrmModuleOptions = {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              username,
              password,
              port: configService.get('POSTGRES_PORT'),
              database: configService.get('POSTGRES_DB_CHECKIN'),
              name: 'default',
              entities: [],
              autoLoadEntities: true,
              synchronize: false,
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
