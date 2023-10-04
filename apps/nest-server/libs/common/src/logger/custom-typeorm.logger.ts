import { Injectable, Inject } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';
import { LoggerService } from './logger.service';

@Injectable()
export class CustomTypeOrmLogger implements Logger {
  constructor(@Inject(LoggerService) private readonly logger: LoggerService) { }

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
    this.logger.error(`Query Error: ${error}`);
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
    this.logger.debug(`Schema Build: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.debug(`Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        this.logger.log(message);
        break;
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}
