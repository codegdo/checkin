import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

import { initialSetup } from './initial-setup';

@Injectable()
export class MigrationService {
  private schemaNames = [
    'main_dbo',
    'main_log',
    'main_sec',
    'main_com',
    'main_syn',
    'main_sys',
    'main_vw',
  ];

  private initialMigrations = initialSetup;

  constructor(private dataSource: DataSource) { }

  async seedSchemas(): Promise<{ message: string }> {
    try {
      await this.createSchemas(this.schemaNames);
      return { message: 'Schemas created successfully.' };
    } catch (error) {
      console.error('Schemas failed:', error);
      throw new Error('Schemas creation failed.');
    }
  }

  async dropSchemas(): Promise<{ message: string }> {
    try {
      await this.dropExistingSchemas();
      return { message: 'Schemas dropped successfully.' };
    } catch (error) {
      console.error('Schema drop failed:', error);
      throw new Error('Schemas drop failed.');
    }
  }

  async seedMigrations(): Promise<{ message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const migration of this.initialMigrations) {
        await this.runMigration(queryRunner, migration.migrationFiles);
      }
      return { message: 'Migrations created successfully.' };
    } catch (error) {
      console.error('Error creating migrations:', error);
      throw new Error('Migrations creation failed.');
    } finally {
      await queryRunner.release();
    }
  }

  async dropMigrations(): Promise<{ message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const migration of this.initialMigrations) {
        await this.rollbackMigration(queryRunner, migration.rollbackFiles);
      }

      return { message: 'Migrations drop successfully.' };
    } catch (error) {
      console.error('Error drop migrations:', error);
      throw new Error('Migrations drop failed.');
    } finally {
      await queryRunner.release();
    }
  }

  async runMigrations(migrationId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Implement your logic here
    } catch (error) {
      console.error('Error getting migration:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async rollbackMigrations(migrationId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Implement your logic here
    } catch (error) {
      console.error('Error getting migration:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createSchemas(schemaNames: string[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const schemaName of schemaNames) {
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

  private async dropExistingSchemas(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const schemaName of this.schemaNames) {
        if (await this.schemaExists(queryRunner, schemaName)) {
          await this.dropSchema(queryRunner, schemaName);
        } else {
          console.log(`Schema "${schemaName}" does not exist.`);
        }
      }
    } catch (error) {
      console.error('Error dropping schemas:', error);
      throw new Error('Schema drop failed.');
    } finally {
      await queryRunner.release();
    }
  }

  private async dropSchema(
    queryRunner: QueryRunner,
    schemaName: string,
  ): Promise<void> {
    const sql = `DROP SCHEMA IF EXISTS ${schemaName} CASCADE;`;
    await queryRunner.query(sql);
    console.log(`Schema "${schemaName}" dropped successfully.`);
  }

  private async schemaExists(
    queryRunner: QueryRunner,
    schemaName: string,
  ): Promise<boolean> {
    const schemaExistsQuery = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}';`;
    const schemaExistsResult = await queryRunner.query(schemaExistsQuery);
    return schemaExistsResult.length > 0;
  }

  private async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  private async runMigration(
    queryRunner: QueryRunner,
    files: any[],
  ): Promise<void> {
    try {
      await queryRunner.startTransaction();

      for (const file of files) {
        const filePath = path.join(__dirname, '../../', file.scriptPath);
        const script = await this.readFile(filePath);
        await queryRunner.query(script);
        console.log(`Executed script: ${file.name}`);
      }

      await queryRunner.commitTransaction();
      console.log('Migration completed successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Migration failed:', error);
      throw new Error('Migration failed.');
    }
  }

  private async rollbackMigration(
    queryRunner: QueryRunner,
    files: any[],
  ): Promise<void> {
    try {
      await queryRunner.startTransaction();

      for (const file of files) {
        const filePath = path.join(__dirname, '../../', file.scriptPath);
        const script = await this.readFile(filePath);
        await queryRunner.query(script);
        console.log(`Executed script: ${file.name}`);
      }

      await queryRunner.commitTransaction();
      console.log('Rollback completed successfully.');
    } catch (error) {
      console.error('Error during rollback:', error);
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}

/*
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema } from 'typeorm';

@Injectable()
export class MigrationService {
  constructor(private dataSource: DataSource) {}
  
  async runSeeding(): Promise<void> {
    const schemaNames = ['main_dbo', 'main_log', 'main_sec', 'main_com', 'main_sys', 'synonyms', 'views'];

    for (const schemaName of schemaNames) {
      if (!(await this.schemaExists(schemaName))) {
        await this.createSchema(schemaName);
      } else {
        console.log(`Schema "${schemaName}" already exists.`);
      }
    }
  }

  private async schemaExists(schemaName: string): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const schemaExistsQuery = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}';`;
      const schemaExistsResult = await queryRunner.query(schemaExistsQuery);

      return schemaExistsResult.length > 0;
    } catch (error) {
      console.error(`Error checking existence of schema "${schemaName}":`, error);
      throw error; // Optionally, rethrow the error for handling elsewhere
    } finally {
      await queryRunner.release();
    }
  }

  private async createSchema(schemaName: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const sql = `CREATE SCHEMA ${schemaName};`;
      await queryRunner.query(sql);

      console.log(`Schema "${schemaName}" created successfully.`);
    } catch (error) {
      console.error(`Error creating schema "${schemaName}":`, error);
      throw error; // Optionally, rethrow the error for handling elsewhere
    } finally {
      await queryRunner.release();
    }
  }
}
*/
