import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Module({})
export class DatabaseModule {
  static register(serviceName?: string): DynamicModule {
    return {
      module: DatabaseModule,
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

/* import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSerivce: ConfigService) => ({
        type: 'postgres',
        host: configSerivce.get('POSTGRES_HOST'),
        username: configSerivce.get('POSTGRES_USERNAME'),
        password: configSerivce.get('POSTGRES_PASSWORD'),
        port: configSerivce.get('POSTGRES_PORT'),
        database: configSerivce.get('POSTGRES_DB_CHECKIN'),
        name: 'default',
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        max: 10,
        min: 2,
      }),
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
  ],
})
export class DatabaseModule { } */

/*
import { DynamicModule, Module, Scope } from '@nestjs/common';
import { dataSourceFactory } from './database.provider';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { DataSourceManager } from './database.util'; // Import the DataSourceManager

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: DataSourceManager, // Provide DataSourceManager
          useValue: DataSourceManager.getInstance(), // Use the instance
        },
        DatabaseService,
        ...Object.values(dataSourceFactory),
      ],
      exports: ['data_source', DatabaseService],
    };
  }
}
*/
