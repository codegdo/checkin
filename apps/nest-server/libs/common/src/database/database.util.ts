import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

// Define a custom enum for the supported database types
export enum SupportedDatabaseTypes {
  MySQL = 'mysql',
  Postgres = 'postgres',
  // Add other supported types as needed
}

// Define a custom interface for the connection config
export interface ConnectionConfig {
  type: SupportedDatabaseTypes; // Use the custom enum
  host: string;
  username: string;
  password: string;
  port: number;
  database: string;
  name?: string;
  entities?: any[];
  autoLoadEntities?: boolean;
  synchronize?: boolean;
  logging?: boolean;
  max?: number;
  min?: number;
  // Add other connection options as needed
}

@Injectable()
export class DataSourceManager {
  private static instance: DataSourceManager;

  private dataSources: { [key: string]: DataSource };

  private constructor() {
    this.dataSources = {};
  }

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }

    return DataSourceManager.instance;
  }

  async getDBDataSource(
    dataSourceName: string,
    connectionConfig: ConnectionConfig,
  ): Promise<DataSource> {
    if (this.dataSources[dataSourceName]) {
      const dataSource = this.dataSources[dataSourceName];
      // Use EntityManager to check if it's connected
      const entityManager = new EntityManager(dataSource);
      if (entityManager.connection) {
        return Promise.resolve(dataSource);
      }
      // Otherwise, connect it
      await dataSource.initialize();
      return Promise.resolve(dataSource);
    }

    const dataSourceOptions: DataSourceOptions = {
      type: connectionConfig.type, // Use the custom enum
      host: connectionConfig.host,
      port: connectionConfig.port,
      username: connectionConfig.username,
      password: connectionConfig.password,
      database: connectionConfig.database,
      // Add other connection options as needed
    };

    const newDataSource = new DataSource(dataSourceOptions);

    await newDataSource.initialize();

    this.dataSources[dataSourceName] = newDataSource;

    return Promise.resolve(newDataSource);
  }
}
