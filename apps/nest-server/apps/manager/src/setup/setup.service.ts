import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { initializationData } from './setup.data';

interface Payload {
  data?: { [key: string]: any };
  userId: string;
}

interface Script {
  id: number;
  databaseName: string;
  schemaName: string;
  objectType: string;
  name: string;
  scriptType: string;
  scriptOrder: string;
  scriptPath: string;
}

@Injectable()
export class SetupService {
  constructor(private dataSource: DataSource) { }

  async seedInitialFunctions(): Promise<{ message: string }> {
    const { initialFunctions } = initializationData;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const runningScript of initialFunctions) {
        await this.executeScript(queryRunner, runningScript.scripts);
      }

      return { message: 'Global functions have been successfully seeded.' };
    } catch (error) {
      console.error('Failed to seed global functions:', error);
      throw new Error('Failed to seed global functions.');
    } finally {
      await queryRunner.release(); // Release the query runner regardless of success or failure
    }
  }

  async dropInitialFunctions(): Promise<{ message: string }> {
    const { initialFunctions } = initializationData;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const runningScript of initialFunctions) {
        await this.executeScript(queryRunner, runningScript.rollbackScripts);
      }

      return { message: 'Initial functions have been successfully dropped.' };
    } catch (error) {
      console.error('Failed to drop initial functions:', error);
      throw new Error('Failed to drop initial functions.');
    } finally {
      await queryRunner.release(); // Release the query runner regardless of success or failure
    }
  }

  async seedInitialSchemas(): Promise<{ message: string }> {
    const { initialSchemas } = initializationData;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.manager.query(`CALL pr_create_schemas($1)`, [
        initialSchemas.main,
      ]);

      return { message: 'Schemas created successfully.' };
    } catch (error) {
      console.error('Error creating schemas:', error);
      throw new Error('Schema creation failed.');
    } finally {
      await queryRunner.release();
    }
  }

  async dropInitialSchemas(): Promise<{ message: string }> {
    const { initialSchemas } = initializationData;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.manager.query(`CALL pr_drop_schemas($1)`, [
        initialSchemas.main,
      ]);

      return { message: 'Schemas dropped successfully.' };
    } catch (error) {
      console.error('Error dropping schemas:', error);
      throw new Error('Schema drop failed.');
    } finally {
      await queryRunner.release();
    }
  }

  async seedInitialSetup(): Promise<{ message: string }> {
    const { migrations } = initializationData;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const migration of migrations) {
        await this.executeScript(queryRunner, migration.scripts);
      }

      return { message: 'Initial setup have been successfully seeded.' };
    } catch (error) {
      console.error('Failed to seed initial setup:', error);
      throw new Error('Failed to seed initial setup.');
    } finally {
      await queryRunner.release(); // Release the query runner regardless of success or failure
    }
  }

  async dropInitialSetup(): Promise<{ message: string }> {
    const { migrations } = initializationData;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const migration of migrations) {
        await this.executeScript(queryRunner, migration.rollbackScripts);
      }

      return { message: 'Initial setup have been successfully dropped.' };
    } catch (error) {
      console.error('Failed to drop initial setup:', error);
      throw new Error('Failed to drop initial setup.');
    } finally {
      await queryRunner.release(); // Release the query runner regardless of success or failure
    }
  }

  private async schemaExists(
    queryRunner: QueryRunner,
    schemaName: string,
  ): Promise<boolean> {
    //const schemaExistsQuery = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}';`;
    //const schemaExistsResult = await queryRunner.query(schemaExistsQuery);
    //return schemaExistsResult.length > 0;
    const schemaExistsResult = await queryRunner.query(
      `SELECT fn_get_schema_by_name($1) AS schema_name_exists`,
      [schemaName],
    );

    // Check if the result contains a row with 'schema_name_exists' as true
    return schemaExistsResult[0]?.schema_name_exists === true;
  }

  private async executeScript(
    queryRunner: QueryRunner,
    scripts: Script[],
  ): Promise<void> {
    try {
      // Start a database transaction
      await queryRunner.startTransaction();

      for (const script of scripts) {
        const scriptFilePath = path.join(
          __dirname,
          '../../',
          script.scriptPath,
        );
        const scriptContent = await this.readFile(scriptFilePath);

        // Execute the script
        //await queryRunner.query(scriptContent);
        await queryRunner.manager.query(`CALL pr_required_run_script($1)`, [
          scriptContent,
        ]);

        // Log the successful execution of the script
        console.log(`Executed script: ${script.name}`);
      }

      // Commit the transaction if all scripts executed successfully
      await queryRunner.commitTransaction();
      console.log('Script execution completed successfully.');
    } catch (error) {
      // Rollback the transaction if any script fails
      await queryRunner.rollbackTransaction();
      console.error('Script execution failed:', error);
      throw new Error('Script execution failed.');
    }
  }

  private async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }
}
