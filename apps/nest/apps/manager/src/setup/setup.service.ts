import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { databases } from './setup.data';
import { UtilService } from '../util/util.service';

interface DatabaseOperationPayload {
  data: {
    databaseName: string;
    operation: string;
  };
  userId: string;
}

enum DatabaseOperation {
  SEED_INITIAL_FUNCTIONS = 'seed-initial-functions',
  DROP_INITIAL_FUNCTIONS = 'drop-initial-functions',
  SEED_INITIAL_SCHEMAS = 'seed-initial-schemas',
  DROP_INITIAL_SCHEMAS = 'drop-initial-schemas',
  SEED_INITIAL_SETUP = 'seed-initial-setup',
  DROP_INITIAL_SETUP = 'drop-initial-setup',
}

// Define the common return object type
type OperationResult = {
  success: boolean;
  message: string;
  errorCode?: string;
};

@Injectable()
export class SetupService {
  constructor(
    private dataSource: DataSource,
    private utilService: UtilService,
  ) { }

  async performDatabaseOperation({
    data,
    userId,
  }: DatabaseOperationPayload): Promise<OperationResult> {
    const { databaseName, operation } = data;

    try {
      switch (operation) {
        case DatabaseOperation.SEED_INITIAL_FUNCTIONS:
          return await this.seedInitialFunctions(databaseName);
        case DatabaseOperation.DROP_INITIAL_FUNCTIONS:
          return await this.dropInitialFunctions(databaseName);
        case DatabaseOperation.SEED_INITIAL_SCHEMAS:
          return await this.seedInitialSchemas(databaseName);
        case DatabaseOperation.DROP_INITIAL_SCHEMAS:
          return await this.dropInitialSchemas(databaseName);
        case DatabaseOperation.SEED_INITIAL_SETUP:
          return await this.seedInitialSetup(databaseName);
        case DatabaseOperation.DROP_INITIAL_SETUP:
          return await this.dropInitialSetup(databaseName);
        default:
          return {
            success: false,
            message: 'Not found perform database operation.',
          };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        errorCode: error.code,
      };
    }
  }

  private async seedInitialFunctions(
    databaseName: string,
  ): Promise<OperationResult> {
    const { initialFunctions } = databases[databaseName];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const runningScript of initialFunctions) {
        await this.utilService.executeScript(
          queryRunner,
          runningScript.scripts,
        );
      }

      return {
        success: true,
        message: 'Global functions have been successfully seeded.',
      };
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async dropInitialFunctions(
    databaseName: string,
  ): Promise<OperationResult> {
    const { initialFunctions } = databases[databaseName];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const runningScript of initialFunctions) {
        await this.utilService.executeScript(
          queryRunner,
          runningScript.rollbackScripts,
        );
      }

      return {
        success: true,
        message: 'Initial functions have been successfully dropped.',
      };
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async seedInitialSchemas(
    databaseName: string,
  ): Promise<OperationResult> {
    const { initialSchemas } = databases[databaseName];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.manager.query(`CALL pr_create_schemas($1)`, [
        initialSchemas.main,
      ]);

      return { success: true, message: 'Schemas created successfully.' };
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async dropInitialSchemas(
    databaseName: string,
  ): Promise<OperationResult> {
    const { initialSchemas } = databases[databaseName];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.manager.query(`CALL pr_drop_schemas($1)`, [
        initialSchemas.main,
      ]);

      return { success: true, message: 'Schemas dropped successfully.' };
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async seedInitialSetup(
    databaseName: string,
  ): Promise<OperationResult> {
    const { migrations } = databases[databaseName];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const migration of migrations) {
        await this.utilService.executeScript(queryRunner, migration.scripts);
      }

      return {
        success: true,
        message: 'Initial setup have been successfully seeded.',
      };
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async dropInitialSetup(
    databaseName: string,
  ): Promise<OperationResult> {
    const { migrations } = databases[databaseName];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      for (const migration of migrations) {
        await this.utilService.executeScript(
          queryRunner,
          migration.rollbackScripts,
        );
      }

      return {
        success: true,
        message: 'Initial setup have been successfully dropped.',
      };
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

/* private async schemaExists(
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
      console.log(`Executed script: ${script.scriptName}`);
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
} */
