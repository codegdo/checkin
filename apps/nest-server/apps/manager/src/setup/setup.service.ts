import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { initializationData } from './setup.data';

interface Payload {
  data?: { [key: string]: any };
  userId: string;
}

@Injectable()
export class SetupService {
  constructor(private dataSource: DataSource) { }

  async seedSchemas(): Promise<{ message: string }> {
    try {
      const { schemas } = initializationData;

      await this.createSchemas(schemas);

      return { message: 'Schemas created successfully.' };
    } catch (error) {
      console.error('Schemas failed:', error);
      throw new Error('Schemas creation failed.');
    }
  }

  private async createSchemas(schemas: string[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const schemaName of schemas) {
        if (!(await this.schemaExists(queryRunner, schemaName))) {
          await this.createSchema(queryRunner, schemaName);
        } else {
          console.log(`Schema "${schemaName}" already exists.`);
        }
      }
    } catch (error) {
      console.error('Error creating schemas:', error);
      throw new Error('Schema creation failed.');
    } finally {
      await queryRunner.release();
    }
  }

  private async createSchema(
    queryRunner: QueryRunner,
    schemaName: string,
  ): Promise<void> {
    const sql = `CREATE SCHEMA ${schemaName};`;
    await queryRunner.query(sql);
    console.log(`Schema "${schemaName}" created successfully.`);
  }

  private async schemaExists(
    queryRunner: QueryRunner,
    schemaName: string,
  ): Promise<boolean> {
    const schemaExistsQuery = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}';`;
    const schemaExistsResult = await queryRunner.query(schemaExistsQuery);
    return schemaExistsResult.length > 0;
  }
}
