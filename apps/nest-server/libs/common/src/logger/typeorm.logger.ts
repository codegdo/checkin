import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class TypeOrmLogger implements Logger {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) 
    private readonly logger: LoggerService
  ) { }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.log(`Query: ${query}`);
    if (parameters) {
      this.logger.log(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.error(`Query Error: ${error}`, error);
    this.logger.log(`Query: ${query}`);
    if (parameters) {
      this.logger.log(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.warn(`Slow Query (${time} ms): ${query}`);
    if (parameters) {
      this.logger.log(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.log(`Schema Build: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.log(`Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        this.logger.log(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}
