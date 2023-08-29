import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MigrationService {
  constructor(private dataSource: DataSource) { }

  async executeSqlFiles(files: any[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const file of files) {
        const migrationFilePath = path.join(__dirname, '../../', file.path);
        const sql = await this.readFile(migrationFilePath);
        await queryRunner.query(sql);
      }
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async readFile(filePath: string): Promise<string> {
    return fs.promises.readFile(filePath, 'utf8');
  }
}
