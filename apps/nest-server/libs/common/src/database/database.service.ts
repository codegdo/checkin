import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import {
  ConnectionConfig,
  DataSourceManager,
  SupportedDatabaseTypes,
} from './database.util';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly dataSourceManager: DataSourceManager,
    private readonly configService: ConfigService,
  ) { }

  async getDBDataSource(
    dataSourceName: string,
    connectionConfig: ConnectionConfig,
  ): Promise<DataSource> {
    return this.dataSourceManager.getDBDataSource(
      dataSourceName,
      connectionConfig,
    );
  }

  // Get database name by subdomain
  async getDatabaseName(subdomain: string): Promise<string> {
    console.log(subdomain);
    // Logic to get the database name based on the subdomain
    const databaseName = this.configService.get<string>('POSTGRES_DB_CHECKIN'); // Replace with your logic
    return databaseName;
  }

  // Get database name by subdomain
  async getConnectionConfig(subdomain: string): Promise<ConnectionConfig> {
    console.log(subdomain);
    // Logic to get the database name based on the subdomain
    const connectionConfig = {
      type: SupportedDatabaseTypes.Postgres,
      host: this.configService.get<string>('POSTGRES_HOST'),
      username: this.configService.get<string>('POSTGRES_USERNAME'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      database: this.configService.get<string>('POSTGRES_DB_CHECKIN'),
      name: 'default',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      max: 10,
      min: 2,
    };

    return connectionConfig;
  }
}
