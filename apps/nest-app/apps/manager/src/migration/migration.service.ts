import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationService {
  private schemaNames = ['main_dbo', 'main_log', 'main_sec', 'main_com', 'main_sys', 'synonyms', 'views'];
  constructor(private dataSource: DataSource) {}

  async seedSchemas(): Promise<{message: string}> {
    
    let rollbackRequired = false;

    try {
      await this.createSchemas(this.schemaNames);
      return { message: 'Schemas created successfully.'};
    } catch (error) {
      console.error('Schemas failed:', error);
      rollbackRequired = true;
    } finally {
      if (rollbackRequired) {
        await this.rollback();
        console.log('Schemas created failed.');
      }
    }
  }

  async dropSchemas(): Promise<{message: string}> {
    let rollbackRequired = false;

    try {
      await this.dropExistingSchemas();
      return { message: 'Schemas dropped successfully.'};
    } catch (error) {
      console.error('Schema drop failed:', error);
      rollbackRequired = true;
    } finally {
      if (rollbackRequired) {
        await this.rollback();
        console.log('Schema drop rolled back successfully.') ;
      }
    }
  }

  async runMigration(): Promise<void> {
    let rollbackRequired = false;

    try {
      await this.createTables();
      await this.insertData();
      console.log('Migration completed successfully.');
    } catch (error) {
      console.error('Migration failed:', error);
      rollbackRequired = true;
    } finally {
      if (rollbackRequired) {
        await this.rollback();
        console.log('Migration rolled back successfully.');
      }
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
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createSchema(queryRunner, schemaName: string): Promise<void> {
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
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async dropSchema(queryRunner, schemaName: string): Promise<void> {
    const sql = `DROP SCHEMA IF EXISTS ${schemaName} CASCADE;`;
    await queryRunner.query(sql);
    console.log(`Schema "${schemaName}" dropped successfully.`);
  }

  private async schemaExists(queryRunner, schemaName: string): Promise<boolean> {
    const schemaExistsQuery = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}';`;
    const schemaExistsResult = await queryRunner.query(schemaExistsQuery);
    return schemaExistsResult.length > 0;
  }

  private async createTables(): Promise<void> {
    let rollbackData = null;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Create the migration_script table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS main_dbo.migration_script (
          id SERIAL PRIMARY KEY,
          script_name VARCHAR(255) NOT NULL
        );
      `);

      // Create the migration_rollback table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS main_dbo.migration_rollback (
          id SERIAL PRIMARY KEY,
          rollback_name VARCHAR(255) NOT NULL
        );
      `);

      // Create the migration_dependency table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS main_dbo.migration_dependency (
          id SERIAL PRIMARY KEY,
          script_id INT,
          rollback_id INT,
          FOREIGN KEY (script_id) REFERENCES main_dbo.migration_script (id),
          FOREIGN KEY (rollback_id) REFERENCES main_dbo.migration_rollback (id)
        );
      `);

      await queryRunner.commitTransaction();
      console.log('Tables created successfully.');
    } catch (error) {
      console.error('Error creating tables:', error);
      rollbackData = error;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();

      if (rollbackData) {
        await this.rollback();
        console.log('Tables creation rolled back successfully.');
      }
    }
  }

  private async insertData(): Promise<void> {
    let rollbackData = null;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Implement data insertion logic here
      // If an error occurs during data insertion, set rollbackData and throw an error

      await queryRunner.commitTransaction();
      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('Error inserting data:', error);
      rollbackData = error;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();

      if (rollbackData) {
        await this.rollback();
        console.log('Data insertion rolled back successfully.');
      }
    }
  }

  private async rollback(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Reverse the changes made during migration, including dropping tables or schemas

      await queryRunner.commitTransaction();
      console.log('Rollback completed successfully.');
    } catch (error) {
      console.error('Error during rollback:', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
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
