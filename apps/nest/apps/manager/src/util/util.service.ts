import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

interface Script {
  id: number;
  databaseName: string;
  schemaName: string;
  objectType: string;
  category: string;
  migration: string;
  scriptName: string;
  scriptType: string;
  scriptOrder: string;
  scriptPath: string;
}

@Injectable()
export class UtilService {
  constructor() { }

  async executeScript(
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
        await queryRunner.manager.query(`CALL pr_system_run_script($1)`, [
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
      throw error;
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
