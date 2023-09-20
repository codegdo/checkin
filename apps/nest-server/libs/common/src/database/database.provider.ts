import { Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { DatabaseService } from './database.service';

export const dataSourceFactory: { [key: string]: Provider } = {
  [Scope.DEFAULT]: {
    provide: 'data_source',
    useFactory: (): null => null,
  },
  [Scope.REQUEST]: {
    provide: 'data_source',
    inject: [REQUEST, ConfigService, DatabaseService],
    scope: Scope.REQUEST,
    async useFactory(
      req,
      configService: ConfigService,
      databaseService: DatabaseService,
    ): Promise<DataSource | null> {
      const subdomain = req.hostname; // Get the subdomain from the request
      if (!subdomain) {
        return null; // No subdomain found, return null
      }

      const databaseName = await databaseService.getDatabaseName(subdomain);
      const connectionConfig =
        await databaseService.getConnectionConfig(subdomain);
      return databaseService.getDBDataSource(databaseName, connectionConfig);
    },
  },
};
