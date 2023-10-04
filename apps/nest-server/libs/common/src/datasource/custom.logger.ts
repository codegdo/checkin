import { Logger, QueryRunner } from 'typeorm';

export class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    // Capture the query and log it wherever you want
    console.log('Query:', query);
    console.log('Parameters:', parameters);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    // Handle query errors and log them
    console.error('Query Error:', error);
    console.log('Query:', query);
    console.log('Parameters:', parameters);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    // Handle slow queries and log them
    console.warn(`Slow Query (${time} ms):`, query);
    console.log('Parameters:', parameters);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    // Handle schema build log messages
    console.log('Schema Build:', message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    // Handle migration log messages
    console.log('Migration:', message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    // Handle custom log messages
    console.log(`${level}:`, message);
  }
}
